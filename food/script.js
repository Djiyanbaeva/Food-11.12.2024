// ДЗ (Таймер)
// При помощи рекурсии сделать анимированный логотип. Цифры меняются от 0 до 100. Когда значение больше 50 скороть изменения становится медленнее.

const timer = document.querySelector('.timer__count');

function counter(i = 0) {
   timer.innerHTML = i;
   i++;
   let speed = 0;
   if (i < 50) {
    speed = 20;
   } else if (i > 49 && i < 75) {
    speed = 50; 
   } else if (i > 74 && i < 85) {
    speed = 80; 
   } else if (i > 84 && i < 95) {
    speed = 100; 
   } else {
    speed = 130;
   }

   if (i <= 100){
    setTimeout(()=> {
        counter(i)
       }, speed);
    }
}

counter()


// ДЗ (Модальное окно)
// При двойном нажатии (dblclick) на .main__content появляется блок с классом "view". Для этого ему нужно добавить класс "active".
// У .main__img получаем данные из атрибута src и добавляем эти данные тегу img внутри блока .view при помощи функции setAttribute().
// И при нажатие на кнопку .view__close, блок .view закрывается.

const view = document.querySelector('.view');
const viewClose = document.querySelector('.view__close');
const viewImg = view.querySelector('img');
const mainContent = document.querySelectorAll('.main__content');

mainContent.forEach((val)=>{
    val.addEventListener("dblclick", function () {
        changeImg(this);
    })
})

function changeImg(elem) {
    view.classList.add('active')
    const img = elem.querySelector('img');
    let path = img.getAttribute('src');
    viewImg.setAttribute('src', path);
}

viewClose.addEventListener('click', function () {
    view.classList.remove('active');
})

// интернет магазин 

const product = {
    plainBurger: {
        name: 'Гамбургкр простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get totalSum(){
            return this.amount * this.price;
        },
        get totalKcall(){
            return this.amount * this.kcall;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get totalSum(){
            return this.amount * this.price;
        },
        get totalKcall(){
            return this.amount * this.kcall;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get totalSum(){
            return this.amount * this.price;
        },
        get totalKcall(){
            return this.amount * this.kcall;
        }
    },
};

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30
    },
}

const btn = document.querySelectorAll('.main__btn');
btn.forEach((val)=>{
    val.addEventListener('click', function () {
        plusOrMinus(this);
    })
})

function plusOrMinus(elem) {
    const parent = elem.closest('.main__product');
    let parentId = parent.getAttribute('id');
    let symbol = elem.getAttribute('data-symbol');
    if (symbol == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
        
    } else if (symbol == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }
    printInfo(parent, product[parentId])
}

function printInfo (section, burger) {
    const count = section.querySelector('.main__count');
    const price = section.querySelector('.main__price span');
    const kcall = section.querySelector('.main__kcall span');
    count.innerHTML = burger.amount;
    price.innerHTML = burger.totalSum;
    kcall.innerHTML = burger.totalKcall;
}

// Чек бокс
const checkbox = document.querySelectorAll('.main__input');

checkbox.forEach((val)=>{
    val.addEventListener('click', function () {
       addExtraProduct(this); 
    })
})

function addExtraProduct(elem) {
    const parent = elem.closest('.main__product');
    let parentId = parent.getAttribute('id');
    let extra = elem.getAttribute('data-extra');
    if (elem.checked) {
        product[parentId].price += extraProduct[extra].price;
        product[parentId].kcall += extraProduct[extra].kcall;
    } else {
        product[parentId].price -= extraProduct[extra].price;
        product[parentId].kcall -= extraProduct[extra].kcall;
    }
    product[parentId][extra] = elem.checked;
    printInfo(parent, product[parentId])
}

//Вывод заказа 
const addCard = document.querySelector('.addCart__btn');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptList = document.querySelector('.receipt__list');
const receiptBtn = document.querySelector('.receipt__btn');

addCard.addEventListener('click', function name() {
   let totalName = '';
   let totalSumProducts = 0;
   let totalKcallProducts = 0;
   for (let key in product) {
      const burger = product[key];
      if(burger.amount > 0) {
        totalSumProducts += burger.totalSum;
        totalKcallProducts += burger.totalKcall;
        for (let burgerKey in burger) {
            if (burger[burgerKey] === true){
                burger.name += `\n  ${extraProduct[burgerKey].name}`
            }
        }
        totalName += `\n ${burger.name} \n` 
      }  
    }

    receiptList.innerHTML = `Вы купили: \n${totalName} \nКолорийность - ${totalKcallProducts} \n Стоимость покупки - ${totalSumProducts} сум`;
    receipt.style.display = 'flex';
    setTimeout(() => {
        receipt.style.opacity = 1;
        receiptWindow.style.top = 0;
    }, 100); 
})

receiptBtn.addEventListener('click', function () {
    window.location.reload();
})
