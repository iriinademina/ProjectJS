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
        let name = this.createElem ('p',wrapper)
        let orderButton = this.createElem ('button', wrapper)
        orderButton.innerText = "ЗАКАЗАТЬ"
        orderButton.onclick = function (event) {
            let elem =  document.getElementsByTagName('main-pizza')[0]
            fetch (`http://localhost:3000/cards/${event.target.id}`)
                .then(res => res.json()
                    .then(res => {
                        let local = Object.assign ({},
                        {name : res.name , price : res.price, startTime: new Date().getTime()})
                        elem.result.push(local)
                        localStorage.setItem ( "history",
                                JSON.stringify(elem.result))
                        }
                    )
               )
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

  }


    createElem ( tagName, container ) {
        return  ( !container ? document.body : container )
                .appendChild (
                          document.createElement ( tagName )
                )
    }

    connectedCallback() {
        this.setStyle()
    }

    static get observedAttributes() {
        return ['src','maxWidth','color','background','text','recipe','id','content']
    }

   attributeChangedCallback( attrName, oldVal, newVal ) {
    // написать тернарку
   if (oldVal!==newVal) {
        this.addPicture()
        this.addText()
        this.addRecipe()
        this.setStyle()
        this.addId()
    }
  }

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
           background: rgba(21,51,68,0.2);
           opacity: 1;
           top: 0;
           transform: scale(1) rotate(0deg);
      }
      span {
           color: #ffffff;
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
           background: rgba(255,255,255,0.3);
           border-radius: 44px;
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


}
customElements.define ( 'card-pizza', CardPizza )
