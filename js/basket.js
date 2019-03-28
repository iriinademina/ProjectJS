class Basket extends HTMLElement {
    constructor () {
    super ()
    let container = document.createElement ('div')
    container.className = "container-basket"
    // this.container = this.createElem('div')
    // this.container.className = "container"
  //  margin-top: 40px;
    let shadow = this.attachShadow ( { mode: 'open' } )
    shadow.appendChild ( container )
    this.shadowStyles = document.createElement ( "style" )
    shadow.appendChild (this.shadowStyles)

    let containerPict = this.createElem ('div',container)
    let image = this.createElem ('img',containerPict)

    let textContainer = this.createElem ('div',container)
    image.src = "img/basket/basket.png"
    let header = this.createElem ('h1',textContainer)
    header.innerText = "Ваша корзина пуста!"
    let text = this.createElem ('p',textContainer)
    text.onclick = function (event) {
      // name.innerText = document.getElementsByTagName('main-pizza')[0]
      //      .getAttribute('basket')
      let info = JSON.parse (localStorage.getItem ( "history"))
      info.forEach ((item) => name.innerText = item.name)
    }
    text.className = "defoltText"
    text.innerText = 'Добавляйте пиццу в корзину при помощи кнопки "Заказать"'
   // контейнер куда я сложу заказы
    let orderContaier = this.createElem ('div', textContainer)
    let name = this.createElem ('span', orderContaier)
    let price = this.createElem ('span', orderContaier)

  //  this.content = []
this.addName = function () {
    price.innerText = `${this.setAttribute('content',document.getElementsByTagName('main-pizza')[0]
             .getAttribute("basket"))}`
          console.log(this.getAttribute('content'))
    //  console.log  (document.getElementsByTagName('main-pizza')[0].getAttribute('basket'))
    //this.addName()
}
   //this.addName()
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
      ///  this.addName()
   }
  static get observedAttributes() {
           return ['content','backgroundColor','maxWidth','color']
        }
//'backgroundColor'
  attributeChangedCallback( attrName, oldVal, newVal ) {
        this.setStyle ()
      //  this.addName()
   }

  // setAttr () {
  //     this.text.innerText = `${this.getAttribute("content")}`
  // }

  createStyle () {
     this.shadowStyles.appendChild ( document.createTextNode ( `` ) )
  }
  //  ${this.getAttribute("backgroundColor")};
 //#cee5e0
 //420px
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
          `
  }

}


// max-height: 130px;
// padding: 10px;
customElements.define ( 'basket-mag', Basket )
//  height: auto;
// elem.setAttribute ("maxWidth","200px")
