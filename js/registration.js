class Registration extends HTMLElement {
    constructor () {
      super ()
      this.container = this.createElem ('div')
      this.container.className = "wrapper"
      let shadow = this.attachShadow ( { mode: 'open' })
      shadow.appendChild ( this.container )
      let style = document.createElement ( 'style' )
      style.textContent =
            `
              .wrapper {
                box-sizing: border-box;
                max-width: 650px;
                margin: 100px auto 0;
                overflow: hidden;
                border-radius: 5px;
                background-color: #a7c6bb;
                padding: 20px;
                position:relative;

              }
              .container-button {
                display: flex;
                justify-content: center;
                margin-top: 10px;
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
             }
             button:nth-child(even) {
                 margin-left: 15px;
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
              input {
                    width: 100%;
                    padding: 12px 25px;
                    margin: 8px 0;
                    display: inline-block;
                    border-radius: 4px;
                    box-sizing: border-box;
                    background-color:#f2f2f2;
              }

              p {
                   text-align:center;
                   color: #f00c0c;
              }

            `
     shadow.appendChild ( style )

     this.formBlock = this.createElem ('form', this.container)

     this.userLabel = this.createElem ('label', this.formBlock)
     this.userLabel.innerText = "User name:"
     this.userLabel.htmlFor = "name_field"
     this.userName = this.createElem ('input', this.formBlock)
     this.userName.id = "name_field"
     this.userName.placeholder = "Введите имя"

     this.emailLabel = this.createElem ('label', this.formBlock)
     this.emailLabel.innerText = "E - mail:"
     this.emailLabel.htmlFor = "email_field"
     this.email = this.createElem ('input', this.formBlock)
     this.email.type = "email"
     this.email.id = "email_field"
     this.email.placeholder = "Введите e-mail"

     this.passwordLabel = this.createElem ('label', this.formBlock)
     this.passwordLabel.innerText = "Password:"
     this.passwordLabel.htmlFor = "pass_field"
     this.password = this.createElem ('input', this.formBlock)
     this.password.type = "password"
     this.password.id = "pass_field"
     this.password.placeholder = "Введите пароль"

     this.contButtons = this.createElem ('div',this.container)
     this.contButtons.className = "container-button"

     this.regButton = this.createElem ('button',this.contButtons)
     this.regButton.innerText = "ЗАРЕГИСТРИРОВАТЬСЯ"
     this.regButton.onclick = this.sendData.bind(this)

     this.LogInButton = this.createElem ('button',this.contButtons)
     this.LogInButton.innerText = "ВОЙТИ"
     this.LogInButton.onclick = this.showLogIn.bind(this)

     this.message = this.createElem ('p',this.container)

}

    createElem ( tagName, container ) {
          return  ( !container ? document.body : container )
                    .appendChild (
                            document.createElement ( tagName )
                     )
              }
// функция сброса инпутов
    resetForm () {
        let inputs = [
            this.userName,
            this.password,
            this.email
        ]

        inputs.forEach (input => {
            input.value = ""
            input.style.border = "1px solid #ccc"
            this.message.innerText = ""
        })
    }

 // Функция валидации ввода email
    validateEmail (email) {
        let re =  /\S+@\S+\.\S+/
        return re.test(email)
    }

    sendAnswer () {
        this.message.innerText = "Неккоректный e-mail"
        this.email.style.border = "1px solid red"
    }

    checkEmail () {
        if (!this.validateEmail (this.email.value)){
            this.sendAnswer ()
            return false
       }
    }

 // Скрыть / показать инпуты
    hideInputs (param) {
        let dspl = param ? "none" : "inline-block"
        this.userName.style.display = dspl
        this.userLabel.style.display = dspl
    }

    checkInputs () {
         let inputs = [
            this.userName,
            this.password,
            this.email
         ]
        let counter = 0
        inputs.forEach (input => {
             input.style.border = "1px solid #ccc"
            !input.value ? input.style.border = "1px solid red" :
                                    ++counter
        })
        return counter
    }

    showRegForm () {
        this.hideInputs (false)
        this.LogInButton.onclick = this.showLogIn.bind(this)
        this.regButton.onclick = this.sendData.bind(this)
    }

    async sendData (event) {
        if(!this.checkInputs()) {
            this.message.innerText = "Заполните все поля"
            return
        }
        let users = await fetch('http://localhost:3000/users')
                .then(response => response.json())
        let userkey = Sha256.hash ( this.password.value + this.email.value)
        let user = users.some (user => user.key === userkey)
        if (user) {
            this.message.innerText = "Пользователь зарегистрирован"
            return
        }
        fetch ('http://localhost:3000/users',
           {
             method: 'POST',
                 headers: {
                     'Content-Type': "application/json"
                 },
                 body: JSON.stringify({
                     name: this.userName.value,
                     email: this.email.value,
                     key : userkey
                 })
             }).then (
                 response => response.json()
                     .then (
                         response => console.log ( response )
                      )
                    )
        this.message.style.color = "green"
        this.message.innerText = "Вы успешно зарегистрировались"
        this.resetForm ()
        this.regButton.onclick = this.showRegForm.bind(this)
    }
  // Функция показывает форму для входа назначаем ее на клик кнопки входа
    showLogIn () {
        this.resetForm ()
        this.hideInputs (true)
        this.LogInButton.onclick = this.LogIn.bind(this)
 		    this.regButton.onclick = this.showRegForm.bind(this)
    }
// Функция для входа на сайт
   async LogIn () {
      if(!this.checkInputs()) return
      let user_Key = Sha256.hash(this.password.value + this.email.value)
      let users = await fetch('http://localhost:3000/users')
                 .then(response => response.json())
      let user = users.find(user => user.key === user_Key)
      if (user) {
          console.log ("Пользователь зарегистрирован")
          this.remove()
          let elem = document.getElementsByTagName('main-pizza')[0]
          elem.setAttribute ("flag","true")
          elem.setAttribute("id",user.id)
          document.cookie = `email=${user.email}`
      } else this.message.innerText = "Зарегистрируйтесь"
  }

}
customElements.define ( 'registration-form', Registration )
