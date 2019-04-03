class Basket extends HTMLElement {
    constructor () {
    super ()
    let container = document.createElement ('div')
    container.className = "container-basket"

    let shadow = this.attachShadow ( { mode: 'open' } )
    shadow.appendChild ( container )
    this.shadowStyles = document.createElement ( "style" )
    shadow.appendChild (this.shadowStyles)

    let containerPict = this.createElem ('div',container)
    let image = this.createElem ('img',containerPict)

    let textContainer = this.createElem ('div',container)
    textContainer.className = "text-container"
    image.src = "img/basket/basket.png"
    let header = this.createElem ('h1',textContainer)
    header.innerText = "Ваша корзина пуста!"
    let text = this.createElem ('p',textContainer)

    text.className = "defult-text"
    text.innerText = 'Добавляйте пиццу в корзину при помощи кнопки "Заказать"'

    function addInfo () {
          let info = JSON.parse (localStorage.getItem ( "history"))
          if (!info) {
             return
          }
          info.forEach ((item) => {
              text.style.display = "none"
              header.innerText = "Ваши товары : "
              let order =  document.createElement ('p')
              textContainer.appendChild (order)
              order.className = "order"
              containerPict.remove()
              textContainer.style.width = "80%"
              textContainer.style.margin = "0 auto 20px"
              order.innerText =`${item.name}    - ${item.price}`
              order.onclick = function (event) {
              info.splice (info.indexOf(
                    info.filter(pizza => pizza.name === item.name)[0]),1)
              this.remove()
              localStorage.setItem ( "history",JSON.stringify(info))
              if (!info.length ) {
                    localStorage.clear()
                    document.getElementsByTagName('main-pizza')[0].result = []
              }
        }

     })
   }

   addInfo()
      let buttonSend = textContainer.appendChild (
                    document.createElement ('button'))
      buttonSend.innerText = "ОФОРМИТЬ ЗАКАЗ"
      buttonSend.onclick = function (event) {
      let collection = textContainer.getElementsByClassName('order')
      let text = Array.from(collection).map(item => item.innerText.split("-")[0])
      let elem = document.getElementsByTagName('main-pizza')[0]
      let userID = elem.getAttribute ("id")
      text.push({userId: userID})
          fetch (`http://localhost:3000/orders`,
              {
                method: 'POST',
                headers: {
                   'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    order: text
                })
           }).then (
               response => response.json()
                   .then (
                       response => {console.log ( response )
                        localStorage.clear()
                      }
                    )
                  )
      localStorage.clear()
      document.getElementsByTagName('main-pizza')[0].result = []
}
    let id
    this.getId = function () {
        id = this.getAttribute ("content")
    }

}

  createElem ( tagName, container ){
            return  ( !container ? document.body : container )
                    .appendChild (
                      document.createElement ( tagName )
                    )
        }

  connectedCallback() {
        this.createStyle ()
        this.setStyle ()
   }
  static get observedAttributes() {
           return ['content','backgroundColor','maxWidth','color']
        }

  attributeChangedCallback( attrName, oldVal, newVal ) {
        this.setStyle ()
        this.getId ()
   }

  createStyle () {
     this.shadowStyles.appendChild ( document.createTextNode ( `` ) )
  }

  setStyle () {
        this.shadowStyles.textContent =
      `
          .container-basket {
              max-width:${this.getAttribute("maxWidth")};
              border-radius: 5px;
              position: relative;
              background-color: ${this.getAttribute("backgroundColor")};
              box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
              font-family: 'Roboto', sans-serif;
              display: flex;
              color: #404746;
         }
          .container-basket::before {
              content: '';
              border: 12px solid transparent;
              border-bottom: 12px solid #ff8000;
              position: absolute;
              left: 70%;
              margin-left: -12px;
              top: -27px;
              width: 0;
               }
           img {
              display: block;
              max-width: 100%;
              height: auto;
            }
            h1 {
              text-align: center;
              font-size: 20px;
            }
            p  {
              padding: 8px;
            }
            .container-basket div {
                width: 50%;
            }
            .order {
                border: 1px inset transparent;
                box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                width: 100%;
            }
            h1,p,order {
                color: rgba(21,51,68,0.6);
            }
            button {
                 display : block;
                 min-width: 200px;
                 margin: 0 auto;
                 padding: 12px 20px;
                 background: #ff8000;
                 border-radius: 44px;
                 border:none;
                 color: #ffffff;
                 outline : none;
                 position : relative;
            }
            button:before {
                content:'';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 0;
                background: rgba(255,255,255,0.3);
                border-radius: 44px;
                transition: all .7s ease;
            }
          button:hover:before {
                height: 100%;
          }
          .text-container {
                width: 50%;
          }
          `
   }

}

customElements.define ( 'basket-mag', Basket )
