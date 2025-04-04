let counter = 0
if (localStorage.counter) {
    counter = Number(localStorage.getItem('counter'))
} else {
    localStorage.setItem('counter', counter)
}

function createProduct(card) {
    counter += 1
    localStorage.setItem('counter', counter)
    localStorage.setItem(`card${localStorage.counter}`, JSON.stringify({
        'number': counter,
        'image': card.image,
        'rating': card.rating,
        'value': card.value,
        'name': card.name,
        'cost': card.cost,
    }))
}

function appendProducts() {
    let keys = Object.keys(localStorage)
    keys.sort().reverse()
    for (let card of keys) {
        if (card != 'counter') {
            let localCard = JSON.parse(localStorage.getItem(card))
            let products = document.querySelector('.products')
            let productsCard = document.createElement('div')
            productsCard.className = 'products__card'
            productsCard.innerHTML = `<img src="img/delete.svg" alt="Х" type="submit" data=${localCard.number} class="card__delete">
                        <div class="card__image-block">
                            <img src="${localCard.image}" alt="" class="card__image">
                        </div>
                        <div class="card__description">
                            <div class="card__meta">
                                <div class="card__rating">
                                    ${localCard.rating}
                                </div>
                                <div class="card__value">
                                    ${localCard.value}
                                </div>
                            </div>
                            <div class="card__name">
                                ${localCard.name}
                            </div>
                            <div class="card__cost">
                                ${localCard.cost}
                            </div>
                        </div>`
            products.append(productsCard)
        }
        
        
    }
    
}

let form = document.querySelector(".add__form")
let add_img = document.querySelector('.add_img')
let form__fields = document.querySelector('.form__fields')
let button = document.querySelector('.form__button')
let modal = document.querySelector('.modal')
add_img.addEventListener('click', function () {
    add_img.classList.add("hide")
    form__fields.classList.add('show')
})

button.addEventListener('click', function (event) {
    event.preventDefault()
    if (form.checkValidity()) {
        createProduct({
            'image': form.image_path.value,
            'rating': form.rating.value,
            'value': form.value.value,
            'name': form.name.value,
            'cost': form.cost.value,
        })
    }
})
appendProducts()
let delete_buttons = document.querySelectorAll('.card__delete')
for (delete_button of delete_buttons) {
    delete_button.addEventListener('click', function () {
        modal.classList.add("active")
        modal.classList.remove("closed")
        yesButton.addEventListener('click', function () {
            let numProduct = delete_button.getAttribute("data")
            localStorage.removeItem(`card${numProduct}`)
            modal.classList.add("closed")
            modal.classList.remove("active")
            setTimeout(function () {
                location.reload()
            }, 600)
        })
    })
}
let yesButton = document.querySelector("#yes")
let noButton = document.querySelector("#no")
noButton.addEventListener('click', function () {
    modal.classList.add("closed")
    modal.classList.remove("active")
})