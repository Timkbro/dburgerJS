const products = {
  crazy: {
    name: 'crazy',
    amount: 0,
    price: 31000,
  },
  light: {
    name: 'light',
    amount: 0,
    price: 26000,
  },
  cheeseburger: {
    name: 'cheeseburger',
    amount: 0,
    price: 29000,
  },
  dburger: {
    name: 'dburger',
    amount: 0,
    price: 24000,
  },
}
function summ(){return this.amount * this.price}
for(const key in products){
  products[key]['summ'] = summ
}
const cardList = document.querySelectorAll('.card')
const arrProducts = []
const cartBtnOpen = document.querySelector('.cart-btn')
const cartBtnCount = document.querySelector('.cart-btn__count')
const cartDropdown = document.querySelector('.cart-dropdown')
const cartDropdownClose = document.querySelector('.cart-dropdown__close')
const cartDropdownContent = document.querySelector('.cart-dropdown__content')
const cartDropdownPrice = document.querySelector('.cart-dropdown__price')

cardList.forEach(function(card, cardKey){
  const cardBtn = card.querySelector('.card-content__btn')
  const cardId = card.getAttribute('id')
  const cardContentAmount = card.querySelector('.card-content__amount')
  const cardCount = card.querySelector('.card-count')
  const countItemAmount = card.querySelector('.count-item__amount')
  const symbolBtn = card.querySelectorAll('.symbol-item')
  const itemSymbol = card.querySelector('.cart-item__symbol')
  products[cardId]['srcImg'] = card.querySelector('.card-img').src
  
  
  cardBtn.addEventListener('click', function(event){
    let totalSumm = 0
    event.preventDefault()
    cardBtn.classList.add('active')
    cardContentAmount.classList.add('active')
    cardCount.classList.add('active')
    products[cardId].amount++
    arrProducts.push(products[cardId])
    cardContentAmount.innerHTML = products[cardId].amount
    countItemAmount.innerHTML = products[cardId].amount
    cartDropdownContent.innerHTML = ''
    arrProducts.forEach(function(obj, keyObj){
      const item = cartItemTemplate(obj)
      cartDropdownContent.append(item)
      totalSumm += obj.summ()
      cartDropdownPrice.innerHTML = totalSumm
    })
  })
  symbolBtn.forEach(function(btn, keyBtn){
    let totalSumm = 0
    btn.addEventListener('click', function(event){
      event.preventDefault()
      const symbol = btn.innerHTML
      if(products[cardId].amount <= 9 && symbol == '+'){
        products[cardId].amount++
      }
      else if(products[cardId].amount > 0 && symbol == '-'){
        products[cardId].amount--
      }
      cartDropdownContent.innerHTML = ''
      arrProducts.forEach(function(obj, keyObj){
        const item = cartItemTemplate(obj)
        cartDropdownContent.append(item)
      })
      cardContentAmount.innerHTML = products[cardId].amount
      countItemAmount.innerHTML = products[cardId].amount
      const cartItemList = document.querySelectorAll('.cart-item')
      if(products[cardId].amount == 0){
        cardBtn.classList.remove('active')
        cardContentAmount.classList.remove('active')
        cardCount.classList.remove('active')
        arrProducts.forEach(function(el, key){
          if(el.amount == 0){
            arrProducts.splice(key, 1)
          }
        })
        cartItemList.forEach(function(el, key){
          const elId = el.getAttribute('id')
          if(elId == cardId){
            el.remove()
          }
        })
        totalSumm += obj.summ()
        cartDropdownPrice.innerHTML = totalSumm
      }
    })
  })
})
cartBtnOpen.addEventListener('click', function(event){
  event.preventDefault()
  cartDropdown.style.display = 'flex'
  cartDropdown.style.transition = '0.5s'
  setTimeout(function(){
    cartDropdown.style.transform = 'translateY(0%)'
  },200)
  setTimeout(function(){
    cartDropdown.style.opacity = '1'
  },500)
})
cartDropdownClose.addEventListener('click', function(event){
  event.preventDefault()
  cartDropdown.style.opacity = '0'
  setTimeout(function(){
    cartDropdown.style.transform = 'translateY(-150%)'
  },300)
  setTimeout(function(){
    cartDropdown.style.display = 'none'
  },500)
  setTimeout(function(){
    cartDropdown.removeAttribute('style')
  },600)
})
function cartItemTemplate({name,amount,price,srcImg}){
  const cartItem = document.createElement('div')
  cartItem.classList.add('cart-item')
  cartItem.setAttribute('id', name)
  const img = document.createElement('img')
  img.src = srcImg
  
  const cartText = document.createElement('div')
  cartText.classList.add('cart-item__content--text')
  const cartCount = document.createElement('div')
  cartCount.classList.add('count-item') 
  const cartContent = document.createElement('div')
  cartContent.classList.add('cart-item__content')
  
  const h5 = document.createElement('h5')
  h5.innerHTML = name
  const p = document.createElement('p')
  p.innerHTML = `${price} сум`
  
  const btnPlus = document.createElement('button')
  btnPlus.classList.add('symbol-item','cart-item__symbol')
  btnPlus.innerHTML = '+'
  const btnMinus = document.createElement('button')
  btnMinus.classList.add('symbol-item','cart-item__symbol')
  btnMinus.innerHTML = '-'
  const count = document.createElement('span')
  count.classList.add('count-item__amount')
  count.innerHTML = amount
  
  cartCount.append(btnMinus,count,btnPlus)
  cartText.append(h5,p)
  cartContent.append(cartText,cartCount)
  cartItem.append(img,cartContent)
  return cartItem
}

document.addEventListener('click', function(event){
  if(event.target.classList.contains('cart-item__symbol')){
    let totalSumm = 0
    const btn = event.target
    const parent = btn.closest('.cart-item')
    const parentId = parent.getAttribute('id')
    const symbol = btn.innerHTML
    const countItemAmount = parent.querySelector('.count-item__amount')
    
    if(products[parentId].amount <= 9 && symbol == '+'){
      products[parentId].amount++
    }
    else if(products[parentId].amount > 0 && symbol == '-'){
      products[parentId].amount--
    }
    countItemAmount.innerHTML = products[parentId].amount
    cardList.forEach(function(card){
      const cardBtn = card.querySelector('.card-content__btn')
      const cardId = card.getAttribute('id')
      const cardContentAmount = card.querySelector('.card-content__amount')
      const cardCount = card.querySelector('.card-count')
      const countItemAmount = card.querySelector('.count-item__amount')
      if(parentId == cardId){
      cardContentAmount.innerHTML = products[parentId].amount
      countItemAmount.innerHTML = products[parentId].amount
      if(products[parentId].amount == 0){
        cardBtn.classList.remove('active')
        cardContentAmount.classList.remove('active')
        cardCount.classList.remove('active')
        cartDropdownPrice.innerHTML = 0
        parent.remove()
        arrProducts.forEach(function(el, key){
          if(el.amount == 0){
            arrProducts.splice(key, 1)
          }
        })
      }
      }
    })
    arrProducts.forEach(function(obj, keyObj){
      totalSumm += obj.summ()
      cartDropdownPrice.innerHTML = totalSumm
    })
  }
})
