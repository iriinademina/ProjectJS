class Main extends HTMLElement {
    constructor () {
      super ()
    //  background: rgba(21,51,68,0.1);
    //  this.wrapper = this.createElem ('div')
    //  this.wrapper.className = "wrapper"

      let wrapper = this.createElem ('div')
      wrapper.className = "wrapper"
      let shadow = this.attachShadow ( { mode: 'open' })
      shadow.appendChild ( wrapper )
      let style = document.createElement ( 'style' )
      style.textContent =
            `
        .wrapper {
             max-width : 1300px;
             position : relative;
             margin : 0 auto;
           }
        .container-button {
             display:flex;
             justify-content: flex-end;
             padding : 15px;
             flex-wrap: wrap;
          }
        .container-card {
             display:flex;
             flex-wrap: wrap;
             justify-content: space-around;
          }
        basket-mag {
             position :absolute;
             top: 70px;
             right: 0px;
        }
        button {
             display : inline-block;
             min-width: 250px;
             padding: 12px 20px;
             background: #ff8000;
             border-radius: 44px;
             border:none;
             color: #ffffff;
             outline : none;
             position : relative;
             margin-left: 10px;
       }
       button:before {
	           content:'';
	           position: absolute;
	           top: 0;
	           left: 0;
	           width: 0;
	           height: 42px;
	           background: rgba(255,255,255,0.3);
	           border-radius: 44px;
             transition: all 0.7s ease;
        }
           button:hover:before {
	           width: 100%;
          }
          card-pizza {
             margin-bottom : 20px;
          }

            `
     shadow.appendChild ( style )

     let containerButtons = this.createElem ('div',wrapper)
     containerButtons.className = "container-button"

     let regButton = this.createElem ('button', containerButtons)
     regButton.innerText = "Личный Кабинет"
     regButton.className = "registr"
     regButton.onclick = this.addForm.bind(this)

    //  this.signButton = this.createElem ('button',this.containerButtons)
    //  this.signButton.innerText = "Войти"
    // // this.signButton.onclick = this.showText.bind(this)
     let constrButton = this.createElem ('button', containerButtons)
     constrButton.innerText = "Конструктор"

     let basketButton = this.createElem ('button',containerButtons)
     basketButton.innerText = "Корзина"
     //basketButton.style.display = "none"
     basketButton.onclick = this.addBasket.bind(this)

     let containerCards = this.createElem ('div', wrapper)
     containerCards.className = "container-card"

     let counter
     this.result = []

     // function getCounter = function (value) {
     //    counter = value
     // }
     //
     // this.showCounter = function () {
     //   return counter
     // }
     // this._counter = (value) => {
     //      counter = value
     //  }
     //
     // this._getCounter = () => {
     //   return counter
     // }

// метод для получения карточки
    this.getCard = function () {
        let card = this.createElem ('card-pizza', containerCards)
        return card
    }
// Метод для получения коллекции карточек
    this.getCards = function () {
      let collection = wrapper.getElementsByTagName('card-pizza')
      return collection
    }

    this.getBasket = function () {
      let basket = this.createElem ('basket-mag',wrapper)
      return basket
    }

    this.getCounter = function () {
       counter = this.getAttribute("basket")
    }

    this.showCards(8)
    this.getData()

  //  this.checkFlag ()
}


  //   static get observedAttributes() {
  //       return ['flag']
  //   }
  //   //
  //   attributeChangedCallback( attrName, oldVal, newVal ) {
  //    if (oldVal!==newVal) {
  //       // this.getCounter()
  //     }
  // }
  static get observedAttributes() {
           return ['basket']
        }
  //'backgroundColor'
  attributeChangedCallback( attrName, oldVal, newVal ) {
        this.getCounter()
   }

// Наследуемый метод
createElem ( tagName, container ) {
        return  ( !container ? document.body : container )
                  .appendChild (
                            document.createElement ( tagName )
                             )
              }
addBasket () {
      let basket = this.getBasket()
      basket.setAttribute ("maxWidth","420px")
      basket.setAttribute ("backgroundColor","#cee5e0")
      basket.setAttribute ("color","#cee5e0")
      ///document.getElementsByTagName('main-pizza')[0].getAttribute('basket')
   }

showCards (counter) {
  for (let i = 0; i < counter; i++) {
      let card = this.getCard()
      card.setAttribute ("src","img/pizza/Verona.jpg")
      card.setAttribute ("maxWidth",'265px')
      card.setAttribute ("color","rgba(21,51,68,0.6)")
      card.setAttribute ("background",'#ff8000')
      card.setAttribute ('text',"Карбонара")
//console.log(document.getElementsByTagName('main-pizza')[0])

  //.getAttribute('basket')
  }

}
getData () {
  fetch ("http://localhost:3000/cards")
         .then (response => response.json()
            .then (result => result.forEach((item,index) => {
              let elem = this.getCards()[index]
              elem.setAttribute ("src",item.ref)
              elem.setAttribute ("text",item.name)
              elem.setAttribute ("recipe",item.recipe)
              elem.setAttribute ("id",item.id)
            //  console.log(document.getElementsByTagName('main-pizza')[0].getAttribute('basket'))
            })
         )
       )
  }


 addForm (event) {
   this.remove()
    document.body.appendChild (
            document.createElement ( 'registration-form'))
  // Таким образом можно вытащить инфу которую нужно передать в корзину
  //Нужно передать айдишник нажатой кнопки
  // тут я должна получить свой counter
    // console.log(this.wrapper.getElementsByTagName ('card-pizza')[1]
    //    .getAttribute('text'))
  //  this.setAttribute('flag',"2")
  //  console.log(this.getAttribute('flag'))
    event.target [`on${event.type}`] = null
 }

 //
 // checkFlag () {
 //    this.addEventListener ('counter',function (event) {
 //      //this.getCounter(true)
 //        //  event.target.id = this.wrapper.querySelector('')
 //  // беру из базы
 //    //  fetch ("http://localhost:3000/cards")
 //          var el = event.target
 //
 //        //  console.log(el)
 //    })


//}

//}

// Функция для записи в корзину данных в свойство контент

}
customElements.define ( 'main-pizza', Main )

 const main = document.body.appendChild (
   document.createElement ( 'main-pizza' ))

   // let el = main.showWrapper()
   // console.log(el)
   // el.remove()
  ///main.showCards(8)
