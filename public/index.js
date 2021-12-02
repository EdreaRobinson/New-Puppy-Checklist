const form = document.querySelector('form')
const itemInput = document.querySelector('#item-input')
const priceInput = document.querySelector('#price-input')
const itemList = document.querySelector('#item-list')
var catArray = {
    ValueA : 'Basic Supplies',
    ValueB : 'Grooming Supplies',
    ValueC : 'Wellness',
    ValueD : 'Dog Toys'
};
var categorySelect = document.getElementById('category-select');
for(index in catArray) {
    categorySelect.options[categorySelect.options.length] = new Option(catArray[index], index);
}

function handleSubmit(e) {
    e.preventDefault()

    if (itemInput.value < 1) {
        alert ('You must enter an item to add to the checklist')
        return
    }

    // let userRating = document.querySelector('input[name="rating"]:checked').value
    let body = {
        name: +itemInput.value, 
        price: +priceInput.value, 
        category: +categorySelect.value
    }

    axios.post('http://localhost:4004/checklist', body)
        .then(() => {
            categorySelect.value = ''
            itemInput.value = ''
            priceInput.value = ''
        })
}

function deleteCard(id) {
    axios.delete(`http://localhost:4004/checklist/${id}`)
        .then(() => getChecklist())
        .catch(err => console.log(err))
}

function getChecklist() {
    itemList.innerHTML = ''

    axios.get('http://localhost:4004/checklist/')
        .then(res => {
            res.data.forEach(elem => {
                let itemCard = `<div class="item-card">
                    <h2>${elem.item_name}<h2>
                    <h3>Price: ${elem.item_price}</h3>
                    <h3>Category: ${elem.category}</h3>
                    <button onclick="deleteItem(${elem['item_id']})">Delete</button>
                    </div>
                `

                itemList.innerHTML += itemCard
            })
        })
}

// function getChecklist() {
//     axios.get('http://localhost:4004/checklist')
//         .then(res => {
//             res.data.forEach(item => {
//                 const option = document.createElement('option')
//                 option.setAttribute('value', item['item_id'])
//                 option.textContent = item.name
//                 itemSelect.appendChild(option)
//             })
//         })
// }

getChecklist()
// getCities()
form.addEventListener('submit', handleSubmit)