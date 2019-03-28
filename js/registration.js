class Registration extends HTMLElement {
    constructor () {
      super ()
      this.container = this.createElem ('div')
      let shadow = this.attachShadow ( { mode: 'open' })
      shadow.appendChild ( this.container )
      let style = document.createElement ( 'style' )
      style.textContent =
            `
              div {
                box-sizing: border-box;
                max-width: 650px;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 5px;
                background-color: #a7c6bb;
                padding: 20px;
                position:relative;
                left : -9999px;
              }

              button {
                  display : inline-block;
                  min-width: 250px;
                  padding: 12px 60px;
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
              input {
                width: 100%;
                padding: 12px 25px;
                margin: 8px 0;
                display: inline-block;
                border-radius: 4px;
                box-sizing: border-box;
                background-color:#f2f2f2;
              }
              button:hover {
                background-color: #ff8533;
                transition: background-color 0.2s;
              }
            `
     shadow.appendChild ( style )
//  border: 1px solid #ccc;
// Кнопка регистрации (должна быть в общей странице)

     // this.testBtn = this.createElem ('button')
     // shadow.appendChild ( this.testBtn )
     // this.testBtn.innerText = "Зарегистрироваться"
     // this.testBtn.onclick = this.showForm.bind(this)
// кнопка войти  (должна быть в общей странице)
     // this.LogInBtn = this.createElem ('button')
     // shadow.appendChild ( this.LogInBtn )
     // this.LogInBtn.innerText = "Войти"
     // this.LogInBtn.onclick = this.showFormLogIn.bind(this)

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

     this.regButton = this.createElem ('button',this.container)
     this.regButton.innerText = "Зарегистрироваться"
     this.regButton.onclick = this.sendData.bind(this)

     this.LogInButton = this.createElem ('button',this.container)
     this.LogInButton.innerText = "Войти"
     this.LogInButton.onclick = this.showFormLogIn.bind(this)

     this.message = this.createElem ('p',this.container)
     this.showForm()
}
// Наследуемый метод
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

// валидация пароля

   sendAnswer () {
     this.message.innerText = "Email fail"
     this.email.style.border = "1px solid red"
   }

  checkEmail () {
    this.validateEmail (this.email.value) ?
    this.message.innerText = "Email not error":
            this.sendAnswer ()
  }

 // Скрыть / показать инпуты
  hideInputs (param) {
    let dspl = param ? "none" : "inline-block"
  //  let text = param ? "Войти" : "Зарегистрироваться"
    this.userName.style.display = dspl
    this.userLabel.style.display = dspl
    //this.regButton.innerText = text
  }

// Показываем форму регистрации
  showForm (event) {
      this.resetForm ()
      this.hideInputs (false)
      TweenMax.fromTo( this.container, 1,
  			{
  				display: "none",
  				left: `${window.innerWidth/2}`,
  			},
  			{
  				display: "block",
          zIndex: 1,
  				left: 0,
  				ease: Back.easeOut
  			} )
    /// this.regButton.onclick = this.sendData.bind(this)
   }
// Показываем форму для входа
showFormLogIn (event) {
    this.resetForm ()
    //this.hideInputs (true)
    this.LogInButton.onclick = this.LogIn.bind(this)

    //this.regButton.onclick = this.sendData.bind(this)
}

// Функция валидации на заполненные поля
  checkInputs () {
      let inputs = [
        this.userName,
        this.password,
        this.email
      ]

       inputs.forEach (input => {
           !input.value ? input.style.border = "1px solid red" :
                                    input.style.border = "1px solid #ccc"
         })
  }

 async sendData (event){
    this.hideInputs (false)
    let users = await fetch('http://localhost:3000/users')
              .then(response => response.json())
    if (!this.password.value || !this.email.value || !this.userName.value) {
      this.checkInputs ()
      this.message.innerText = "Заполните все поля"
      return
    }
    this.checkInputs ()
    this.message.innerText = ""
    this.checkEmail ()
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
        }

  // Функция входа LogIn + запись куков

  async LogIn () {
     //this.resetForm ()
       this.hideInputs (true)
       let users = await fetch('http://localhost:3000/users')
                 .then(response => response.json())
      let user_Key = Sha256.hash(this.password.value + this.email.value)
      let user = users.some (user => user.key === user_Key)
      if (user) {
          console.log ("Юзер есть")
          this.remove()
          let elem = document.body.appendChild (
                    document.createElement ( 'main-pizza' ))
          elem.basketButton.style.display = "inline-block"
      } else this.message.innerText = "Зарегистрируйтесь"
  }
}

customElements.define ( 'registration-form', Registration )
const reg = document.body.appendChild (
  document.createElement ( 'registration-form' ))
