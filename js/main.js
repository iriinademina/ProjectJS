class Main extends HTMLElement {
    constructor () {
      super ()
      let wrapper = this.createElem ('div')
      wrapper.className = "wrapper"
      let shadow = this.attachShadow ( { mode: 'open' })
      shadow.appendChild ( wrapper )
      let style = document.createElement ( 'style' )
      let counter = false
      style.textContent =
          `
              .wrapper {
                    max-width : 1300px;
                    position : relative;
                    margin : 0 auto;
              }
              .container-button {
                    display:flex;
                    justify-content: center;
                    padding : 15px;
                    flex-wrap: wrap;
              }
              .container-card {
                    display:flex;
                    flex-wrap: wrap;
                    justify-content: center;
              }
              .container-basket {
                    position : relative;
                    max-width : 420px;
              }
              basket-mag {
                    position :absolute;
                    top: 50px;
                    right: 0px;
                    min-width: 500px;
                    z-index:3;
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
                   margin-left: 20px;
           }
           constructor-canvas {
                   box-shadow: inset 0px 0px 0 2000px rgba(0,0,0,0.45);
                   position: fixed;
                   top: 65px;
                   left: 60px;
          }
           registration-form {
                  position: fixed;
                  right: 40px;
                  top: 60px;
          }

          @media screen and (min-width: 700px) and (max-width: 830px) {
              button {
                  margin-bottom : 20px;
              }
              .container-button {
                  justify-content: center;
              }
              card-pizza {
                  margin-right : 30px;
              }
         }

         @media screen and (max-width: 710px) {
            button {
                 margin-bottom : 20px;
            }

         }
            `
     shadow.appendChild ( style )

     let containerButtons = this.createElem ('div',wrapper)
     containerButtons.className = "container-button"

     let regButton = this.createElem ('button', containerButtons)
     regButton.innerText = "ЛИЧНЫЙ КАБИНЕТ"
     regButton.className = "registr"

     let overlay = document.createElement ( 'div')
     regButton.onclick = function (event) {
          addForm()
          this.onclick = goOut
    }

    function addForm(event) {
        let reg = wrapper.appendChild (
                    document.createElement ( 'registration-form'))
        wrapper.appendChild (overlay )
        overlay.style =
          `
                position: fixed;
                z-index: 100;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: #000;
                opacity: 0.55;
          `
          TweenMax.fromTo( reg, 0.7,
           {
             display: "none",
             left: `${window.innerWidth/2}`,
           },
           {
             display: "block",
             zIndex: 200,
             left: 0,
             ease: Back.easeOut
           } )
    }

     let constrButton = this.createElem ('button', containerButtons)
     constrButton.innerText = "КОНСТРУКТОР"
     constrButton.disabled = true
     constrButton.onclick = function (event) {
          let constructor = wrapper.appendChild (
                document.createElement ( 'constructor-canvas'))
          constructor.btnClose.onclick = function (event) {
              constructor.remove()
            }
    }
    let contBasket = this.createElem ('div',containerButtons)
    contBasket.className = "container-basket"

    let basketButton = this.createElem ('button',contBasket)
    basketButton.innerText = "КОРЗИНА"
     basketButton.onclick = this.addBasket.bind(this)

    let containerCards = this.createElem ('div', wrapper)
    containerCards.className = "container-card"

    this.result = []

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
      let basket = this.createElem ('basket-mag',contBasket)
      return basket
    }

    this.getCounter = function () {
       counter = this.getAttribute("flag")
       console.log(counter)
       return counter
    }

    this.deleteForm = function () {
       if(counter) {
           overlay.remove()
           constrButton.disabled = false
           regButton.innerText = "ВЫХОД"
       }
    }

    let numberID
    this.getnumberID = function () {
        numberID  = this.getAttribute("id")
        console.log(numberID )
        return numberID
    }

    function goOut (event) {
        regButton.innerText = "ЛИЧНЫЙ КАБИНЕТ"
        constrButton.disabled = true
        counter = false
        regButton.onclick = LogAcc
   }

   function LogAcc (event) {
        if(!counter) {
          addForm()
        }
  }

    this.showCards(8)
    this.getData()
}

    static get observedAttributes() {
           return ['flag','id']
    }

    attributeChangedCallback( attrName, oldVal, newVal ) {
    // Доделать тернарку
        this.getCounter()
        this.deleteForm ()
        this.getnumberID()
   }

   createElem ( tagName, container ) {
        return  ( !container ? document.body : container )
                  .appendChild (
                            document.createElement ( tagName )
                             )
   }

   addBasket (event) {
       let basket = this.getBasket()
       basket.setAttribute ("backgroundColor","#cee5e0")
       basket.setAttribute ("color","#cee5e0")
       basket.onmouseout = function (event) {
          this.remove()
       }
  }

  showCards (counter) {
      for (let i = 0; i < counter; i++) {
          let card = this.getCard()
          card.setAttribute ("src","img/pizza/Verona.jpg")
          card.setAttribute ("maxWidth",'265px')
          card.setAttribute ("color","rgba(21,51,68,0.6)")
          card.setAttribute ("background",'#ff8000')
          card.setAttribute ('text',"Карбонара")
      }
}

  getData () {
      fetch ("http://localhost:3000/cards")
          .then (response => response.json()
              .then (result => result.forEach((item,index) => {
                  let elem = this.getCards()[index]
                  elem.setAttribute ("src",item.ref)
                  elem.setAttribute ("text",`${item.name}    ${item.price}`)
                  elem.setAttribute ("recipe",item.recipe)
                  elem.setAttribute ("id",item.id)
                 })
               )
       )
  }

}
customElements.define ( 'main-pizza', Main )

  const main = document.body.appendChild (
              document.createElement ( 'main-pizza' ))
