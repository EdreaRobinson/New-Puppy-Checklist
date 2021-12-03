const form = document.querySelector('form')
const itemInput = document.querySelector('#item-input')
const priceInput = document.querySelector('#price-input')
const itemList = document.querySelector('#item-list')
const categorySelect = document.querySelector('#category-select')






function handleSubmit(e) {
    e.preventDefault()

    if (itemInput.value < 1) {
        alert ('You must enter an item to add to the checklist')
        return
    }


    let body = {
        item: itemInput.value, 
        price: +priceInput.value, 
        category: categorySelect.value
    }

    axios.post('http://localhost:4004/checklist', body)
        .then(() => {
            categorySelect.value = ''
            itemInput.value = ''
            priceInput.value = ''
        })
    location.reload(true/false);
}

function deleteCard(item_id) {
    axios.delete(`http://localhost:4004/checklist/${item_id}`)
        .then(() => getChecklist())
        .catch(err => console.log(err))
}

function getChecklist() {
    itemList.innerHTML = ''

    axios.get('http://localhost:4004/checklist/')
        .then(res => {
            res.data.forEach(elem => {
                let itemCard = `<div class="item-card">
                    <h4>${elem.item_name}<h4>
                    <h3>Price: ${elem.item_price}</h3><br>
                    <h3>Category:</h3><h3>${elem.category}</h3><br>
                    <button id="delete-btn" onclick="deleteCard(${elem['item_id']})">Delete</button>
                    </div>
                `

                itemList.innerHTML += itemCard
            })
        })
}

getChecklist()
form.addEventListener('submit', handleSubmit)
