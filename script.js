let counter = 0
if (localStorage.counter) {
    counter = Number(localStorage.getItem('counter'))
} else {
    localStorage.setItem('counter', counter)
}

function createProduct(card) {
    counter += 1
    localStorage.setItem('counter', counter)
    localStorage.setItem(`card${localStorage.counter}`, JSON.stringify(card))
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
            productsCard.innerHTML = `<div class="card__image-block">
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


createProduct({
    'image': 'img/2.webp',
    'rating': '4.98',
    'value': '5000ккал.',
    'name': 'Стейк из грудинки охлажденный',
    'cost': '7000',
})
appendProducts()