require("dotenv").config();

const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists checklist;
        
        CREATE TABLE checklist (
            item_id SERIAL PRIMARY KEY,
            item_name VARCHAR(100) NOT NULL,
            item_price NUMERIC(6,2) NOT NULL,
            category VARCHAR NOT NULL);
        
        INSERT INTO checklist (item_name, item_price, category)
            VALUES ('Collar', 15.00, 'Basic Supplies'), ('Water Bowl', 7.50, 'Basic Supplies'), ('Puppy Food', 45.50, 'Basic Supplies'), ('Puzzle Toy', 24.99, 'Dog Toys'), ('Chew Toys', 9.75, 'Dog Toys'), ('Ball', 2.25, 'Dog Toys'), ('Toothbrush', 6.25, 'Grooming Supplies'), ('Shampoo', 12.50, 'Grooming Supplies'), ('Vacuum', 250.00, 'Cleaning Supplies'), ('Pooper Scooper', 22.00, 'Cleaning Supplies'), ('Pet Insurance', 1200.00, 'Wellness'), ('Dog Trainer', 325.00, 'Wellness');
    `).then(() => {
        console.log('DB seeded!')
        res.sendStatus(200)
    }).catch(err => console.log('error seeding DB', err))
    },
   getChecklist: (req, res) => {
    sequelize.query(`
    SELECT *
    FROM checklist;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
    },
    
    createItem: (req, res) => {
        const {item, price, category} = req.body
        console.log(typeof req.body.item)
        console.log(typeof req.body.price)
        console.log(typeof req.body.category)
        
        sequelize.query(`
            INSERT INTO checklist (item_name, item_price, category)
            VALUES ('${item}',
            '${price}', '${category}');
            `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    deleteItem: (req, res) => {
        const itemId = req.params.item_id;
        sequelize.query(`
            DELETE FROM checklist 
            WHERE item_id = ${itemId};
            `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }
}


