class ConstrCanvas extends HTMLElement {
  constructor () {
      super ()
      this.wrapper = this.createElem ('div')
      this.wrapper.className = "wrapper"
      let shadow = this.attachShadow ( { mode: 'open' })
      shadow.appendChild ( this.wrapper )
      let style = document.createElement ( 'style' )
      style.textContent =
          `
            .wrapper {
               max-width: 800px;
               box-shadow: 0 4px 10px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22);
               display:flex;
            }
            canvas {
               border-radius: 100%;
               background-image: url('img/constructorPizza/pastry.jpg');
            }
            button {
                display : inline-block;
                min-width: 250px;
                padding: 12px 12px;
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
                border-radius: 5px;
                transition: all 0.7s ease;
            }

            button:hover:before {
                width: 100%;
            }

            input[type="text"]{
              width: 80%;
              border:1px solid #9E9E9E;
              color: #000000;
              padding: 3px;
              margin-top: 2px;
              margin-bottom: 2px;
              font-size: 14px;
              background: #FFF;
              ouline:none;
            }

          `
      shadow.appendChild ( style )
      this.angle =  [0,360]
      this.ang = Math.PI/180
      this.numIndex = []
      this.choiseAngle

// Ингредиенты для чекбоксов
      this.ingredients = [
        ["img/constructorPizza/salami.jpg","салями"],
        ["img/constructorPizza/chiken.jpg","курица"],
        ["img/constructorPizza/pineapple.jpg","ананас"],
        ["img/constructorPizza/cheese.jpg","сыр"],
        ["img/constructorPizza/tomato.jpg","помидор"],
        ["img/constructorPizza/pepper.jpg","перец"],
        ["img/constructorPizza/herb.jpg","зелень"],
        ["img/constructorPizza/olives.jpg","оливки"]
      ]

      this.pictures = this.createPicture ()

      this.containerCanvas = this.createElem ('div', this.wrapper)
      this.contCanvas = this.createElem ('canvas', this.containerCanvas)
      this.contCanvas.setAttribute("width", "400")
      this.contCanvas.setAttribute("height", "400")
      this.area = this.contCanvas.getContext ("2d")

     // Текст для основы пиццы
      this.containerContent = this.createElem ('div',this.wrapper)
      this.containerContent.className = "container-content"

      this.contText = this.createElem ('p', this.containerContent)
      this.contText.innerText =
      `Вы можете добавить свои ингредиенты.Используйте кнопку 'Добавить ингредиенты'`

      this.namePizza = document.createElement ('input')
    //  this.containerContent.appendChild(this.namePizza)
      this.namePizza.placeholder = "Дайте название пицце"
      this.namePizza.type = "text"

      this.contCheck = this.createElem ('div',this.containerContent)
      this.btnAdd = this.createElem ('button', this.containerContent)
      this.btnAdd.innerText = "Добавить ингредиенты"
      this.btnAdd.onclick = this.createCheckbox.bind(this)
      this.showInput()

      //
      // this.btnReady = this.createElem ('button',this.containerContent)
      // this.btnReady.innerText = "В КОРЗИНУ"
    //  this.btnReady.onclick = this.drawParts.bind(this)

 }

  createElem ( tagName, container ) {
      return  ( !container ? document.body : container )
              .appendChild (
                        document.createElement ( tagName )
                         )
   }

  createPicture () {
     let pict = this.ingredients.map (item => {
          let elem = document.createElement ('img')
          elem.src = item[0]
          return elem
     })
    return pict
  }

showInput () {
  this.btnAdd.addEventListener ('click',function (event) {
      this.containerContent.appendChild(this.namePizza)
  }.bind(this))
}

// Функция для создания массива углов в зависимости от кол-ва ингредиентов
  getArrAngle (num) {
       let del = 360/num
       let ang = 0
       let res = []
       let i = 0
       while(i++ < num){
         res.push(ang)
         ang += Math.fround(del)
       }
       res.push(360)
       return res
  }
// Отрисовка окружности
createallPizza (space) {
  this.area.beginPath()
  this.area.arc(this.contCanvas.width/2,this.contCanvas.height/2,
                this.contCanvas.width/2-space,0,2*Math.PI)
  this.area.stroke()
  this.fillPart2 (this.numIndex[0])
}
// Отрисовка двух частей пиццы
createtwoParts (counter,space) {
  this.area.beginPath()
  console.log(counter)
  this.area.arc(this.contCanvas.width/2,this.contCanvas.height/2,
            this.contCanvas.width/2-space,this.choiseAngle[counter]*this.ang,
            this.choiseAngle[++counter]*this.ang)
  this.area.closePath()
  this.area.stroke()
  this.fillPart2 (this.numIndex[--counter])
}
// Отрисовка сектора пиццы
creteArcPart (counter,space) {
  this.area.beginPath()
  this.area.lineTo (this.contCanvas.width/2,this.contCanvas.height/2)
  this.area.arc(this.contCanvas.width/2,this.contCanvas.height/2,
            this.contCanvas.width/2-space,this.choiseAngle[counter]*this.ang,
            this.choiseAngle[++counter]*this.ang)
  this.area.closePath()
  this.area.stroke()
  this.fillPart2 (this.numIndex[--counter])
}
 // Универсальная отрисовка одной секции пиццы
drawPath (counter,space) {
    this.numIndex.length === 1 ? this.createallPizza (space) :
          this.numIndex.length === 2 ? this.createtwoParts (counter,space) :
             this.creteArcPart (counter,space)
  }
//Отрисовка общая секций пиццы
drawParts (event) {
  console.log(this.numIndex)
  let i = 0
  while (i<this.numIndex.length){
      this.area.strokeStyle = "white"
      this.area.lineWidth = 3
      this.drawPath (i++,10)
    }
 }
// вариант через createPattern
fillPart2 (counter) {
  let pat = this.area.createPattern(this.pictures[counter], "repeat");
  this.area.fillStyle = pat
  this.area.fill()
}

// Создание чекбоксов
 createCheckbox (event){
//  let numIndex = []
  this.ingredients.forEach ((item,index) => {
      let check = this.createElem ( 'input', this.contCheck )
      check.type = "checkbox"
      check.id = index
      check.style.display = "inline-block"
      let label = this.createElem ( 'label', this.contCheck )
      label.innerText = this.ingredients [index][1]
      check.onchange = function (event) {
        // чистим область канваса
          this.area.clearRect(0,0,this.contCanvas.width,this.contCanvas.height)
          event.target.checked ? this.numIndex.push(event.target.id) :
                this.numIndex.splice(this.numIndex.indexOf(event.target.id),1)
          this.choiseAngle = this.getArrAngle (this.numIndex.length)
          console.log(event.target.checked)
          console.log(this.choiseAngle)
          this.drawParts()
    }.bind(this)
   
    event.target [`on${event.type}`] = null
 })
}



}
customElements.define ( 'constructor-canvas', ConstrCanvas )
 const constructor = document.body.appendChild (
   document.createElement ( 'constructor-canvas' ))
