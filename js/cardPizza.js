class CardPizza extends HTMLElement {
    constructor () {
        super ()
        let wrapper = document.createElement ('div')
        wrapper.className = "wrapper"
        let shadow = this.attachShadow ( { mode: 'open' })
        shadow.appendChild ( wrapper)
        let shadowStyles = this.createElem ( "style",shadow )
        shadow.appendChild ( document.createTextNode ( `` ) )
        let container = this.createElem ('div', wrapper)
        container.className = "container"
        let picture = this.createElem ('img', container)
        let containerText = this.createElem ('div', container)
        containerText.className = "container-text"
        let recipe = this.createElem ('span',containerText)
      //  this.recipe = ""
        let name = this.createElem ('p',wrapper)
      //  this.text = ""
        let orderButton = this.createElem ('button', wrapper)
        orderButton.innerText = "ЗАКАЗАТЬ"
        let result = []
        //orderButton.onclick = this.showColor.bind(this)
    orderButton.onclick = function (event) {
        let el =  document.getElementsByTagName('main-pizza')[0]
        //result.push(event.target.id)
        fetch (`http://localhost:3000/cards/${event.target.id}`)
           .then(res => res.json()
             .then(res => {
        el.setAttribute ('basket',res.name)

      var local = Object.assign ({}, {name : res.name , startTime: new Date().getTime()})
      result.push(local)
      localStorage.setItem ( "history",JSON.stringify(result))
    }))
      //let el =  document.getElementsByTagName('main-pizza')[0]
}

        this.addPicture = function () {
            picture.src = `${this.getAttribute("src")}`
        }
        this.addText = function () {
           name.innerText = `${this.getAttribute("text")}`

        }
        this.addRecipe = function () {
           recipe.innerText = `${this.getAttribute("recipe")}`
        }

        this.addId = function () {
           orderButton.id = this.getAttribute("id")
        }

        this.getShadow = () => {
             return shadowStyles
        }


      //  function getShadow
        //
        // let shoto;
        // this._setShoto = (value) => {
        //   shoto = value
        // }
        //
        // this._getShoto = () => {
        //   return shoto;
        // }

  }

  // get shoto() {
  //   return this._getShoto()
  // }
  //
  // set shoto(value){
  //   this._setShoto(value)
  // }

  createElem ( tagName, container ) {
      return  ( !container ? document.body : container )
                .appendChild (
                          document.createElement ( tagName )
                           )
            }

  connectedCallback() {
    //  this.createStyle ()
        this.setStyle()
    }

  static get observedAttributes() {
      return ['src','maxWidth','color','background','text','recipe','id','content']
  }
  //
  attributeChangedCallback( attrName, oldVal, newVal ) {
   if (oldVal!==newVal) {
        this.addPicture()
        this.addText()
        this.addRecipe()
    // дает динамически изменяться стилям
        this.setStyle()
        this.addId()
    }
    //  this.shoto = this.getAttribute('shoto')
  }

  // createStyle () {
  //    let shadowStyles = document.createElement ('style')
  //    let shadow = this.getShadow()
  //    shadow.appendChild (shadowStyles)
  //    shadow.appendChild ( document.createTextNode ( `` ) )
  //   }

  setStyle () {
        this.getShadow().textContent =
    `
       .wrapper {
             max-width : ${this.getAttribute("maxWidth")};
             display : inline-block;
             padding : 0px 0px 10px 0px;
             background-image: linear-gradient(rgba(245, 157, 69, 1), rgba(255,245,215,.5));
             margin-left: 10px;
             box-shadow: 0 4px 10px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22);
         }
         .wrapper:hover {
             transition: all 0.5s ease;
             box-shadow:
                 1px 1px  #ff8000,
                 2px 2px  #ff8000,
                 3px 3px  #ff8000;
             -webkit-transform: translateX(-3px);
             transform: translateX(-3px);
         }
         .container {
             position: relative;
             overflow: hidden;
             display: inline-block;
          }
         .container-text {
             position: absolute;
             top: 0;
             bottom: 4px;
             right: 0;
             left : 0;
             opacity : 0;
             transition: 1s ease;
             transform: scale(0) rotate(90deg);
             padding: 40px 20px 0 20px;
             text-align: center;
         }
         .container:hover .container-text {
             background: rgba(21,51,68,0.45);
             opacity: 1;
             top: 0;
             transform: scale(1) rotate(0deg);

         }
          span {
             color:orange;
         }
          button {
              display : block;
              min-width: 200px;
              margin: 0 auto;
              padding: 12px 20px;
              background: ${this.getAttribute("background")};
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
             background: rgba(21,51,68,0.2);
             border-radius: 5px;
             transition: all .7s ease;
        }

       button:hover:before {
             height: 100%;
       }
       p {
            text-align : center;
            color : ${this.getAttribute("color")};
       }
      img {
       width:100%;
      }
  `
}




//rgba(21,51,68,0.2);
 //rgba(255,255,255,0.3);
 showColor (event) {
//   document.getElementsByTagName('main-pizza')[0].setAttribute ('flag',"1")
   // document.getElementsByTagName('main-pizza')[0]
   //               .dispatchEvent(new Event('counter'))

  console.log(event.target.id)
  let el =  document.getElementsByTagName('main-pizza')[0]
    el.setAttribute ('basket',event.target.id)
    // console.log(el.getAttribute ('basket'))
  //let result = []

  // делаем атрибут content в карточке и добавляем туда айди карточки
  // потом фетчем тянем инфу в p в корзине
  // для удаления можно использовать массив айди если удаляем карточку
  //  то реагирует массив удаляется айди

   // Записываю в атрибут basket данные по данной карточке
    fetch (`http://localhost:3000/cards/${event.target.id}`)
       .then(res => res.json()
         .then(res => {
            el.setAttribute ('basket',res.name)
            //result.push(res.name)
            console.log(res)
            //console.log(result)
         })
      )


 }

}
customElements.define ( 'card-pizza', CardPizza )
