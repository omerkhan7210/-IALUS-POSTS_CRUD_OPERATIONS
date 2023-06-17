'use strict'

const loginForm = document.querySelector('form.login')
const signupForm = document.querySelector('form.signup')
const loginBtn = document.querySelector('label.text-login')
const signupBtn = document.querySelector('label.text-signup')
const loginText = document.querySelector('.title-text .login')
const signupText = document.querySelector('.title-text .signup')

signupForm.style.display = 'none'

signupBtn.onclick = () => {
  signupForm.style.display = 'block'
  loginForm.style.marginLeft = '-50%'
  loginText.style.marginLeft = '-50%'
}

loginBtn.onclick = () => {
  loginForm.style.display = 'block'
  loginForm.style.marginLeft = '0%'
  loginText.style.marginLeft = '0%'
  delysignup()
}

function delysignup() {
  setTimeout(()=>{
    signupForm.style.display = 'none'
  },300)
}

const blur = ()=> {
  if (pass.value.length != 8 ) {
    alertpass.style.display = 'block'
  }
  if (pass.value == '') {
    alertpass.style.display = 'none'
  }
}

const keydown = ()=> {
  if (pass.value.length == 8 ) {
    alertpass.style.display = 'none'
    }
}

pass.addEventListener('blur', blur)
pass.addEventListener('keydown', keydown)

cpass.addEventListener('blur',()=>{
  if (cpass.value != pass.value) {
    alertcpass.style.display = 'block'
  }
  if (cpass.value == '') {
    alertcpass.style.display = 'none'
  }
})

cpass.addEventListener('keyup',()=>{
  if (cpass.value == pass.value) {
    alertcpass.style.display = 'none'
  }
})

email.addEventListener('blur',()=>{
  if (email.value == ''){
    lemail.style.top = '50%'
  }
})

email.addEventListener('keydown',()=>{
  if (email.value != '') {
    lemail.style.top = '0%'
  }
})


let betUsername = true

username.addEventListener('keyup',()=>{
  let formData = {
    "name": username.value
  }
  fetch('http://127.0.0.1:5000/data/signup/username', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response=>{
    return response.json()
  })
  .then(response => {
    console.log(response.data.length);
    if (response.data.length != 0) {
      alertuname.style.display = 'block'
      betUsername = false
    }else{
      alertuname.style.display = 'none'
      betUsername = true
    }
  })
  .catch(error => {
    console.log(error);
  })
})

window.addEventListener("DOMContentLoaded",() => {
  const btnSignup = document.querySelector('.btn-signup');
  var doneTimeout = null,
    resetTimeout = null;
    btnSignup.addEventListener("click",function(e) {
      if (username.value != '' && email.value != '' &&
          pass.value != '' && cpass.value != '' && pass.value.length == 8 && cpass.value.length == 8 && cpass.value == pass.value && betUsername == true) {
        e.preventDefault()
        const currentdate = new Date();
        const datetime = currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds()

        let formData = {
        "name": username.value,
        "email": email.value,
        "password": pass.value,
        "time": datetime
      };
      console.log(formData)
      fetch('http://127.0.0.1:5000/data/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then( response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      const runClass = "btn--running";
      const doneClass = "btn--done";
      const submitDuration = 2000;
      const resetDuration = 1500;
      
      // fake the submission
      this.disabled = true;
      this.classList.add(runClass);
      
      clearTimeout(doneTimeout);
      clearTimeout(resetTimeout);
      
      doneTimeout = setTimeout(() => {
        this.classList.remove(runClass);
        this.classList.add(doneClass);
        
        // reset the button
        resetTimeout = setTimeout(() => {
          this.disabled = false;
          this.classList.remove(doneClass);
        }, resetDuration);
        
      }, 600 + submitDuration);
      setTimeout(()=>{
        username.value = ''
        email.value = ''
        lemail.style.top = '50%'
        pass.value = ''
        cpass.value = ''
      },3000)
    }
    });
});




const password = document.querySelectorAll('.password')
const iconPassword = document.querySelectorAll('.icon-password')


for (let i = 0; i < password.length; i++) {
  iconPassword[i].addEventListener('click',()=>{
    if(iconPassword[i].className == 'icon-password  bi-eye-slash-fill'){
      iconPassword[i].className = 'icon-password bi-eye-fill'
      password[i].setAttribute('type','text')
    }else{
      iconPassword[i].className = 'icon-password  bi-eye-slash-fill'
      password[i].setAttribute('type','password')
    }
  })
}

lpass.addEventListener('blur',()=>{
  if (lpass.value.length != 8 ) {
    alertlpass.style.display = 'block'
  }
  if (lpass.value == '') {
    alertlpass.style.display = 'none'
  }
})

lpass.addEventListener('keydown',()=>{
  if (lpass.value.length == 8 ) {
    alertlpass.style.display = 'none'
    }
})


const btnLogin = document.querySelector('.btn-login')
const modalContainer = document.querySelector('#modalContainer')


btnLogin.addEventListener('click',()=>{
  let formData = {
    "name": uname.value,
    "password": lpass.value,
  }
  fetch('http://127.0.0.1:5000/data/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response=>{
    return response.json()
  })
  .then( response => {
    console.log(response);
    if (response.data.length != 0) {
    uname.value = ''
    lpass.value = ''
    }else{
      if(uname.value != '' && lpass.value != '' &&     alertlpass.style.display == 'none')
      modalContainer.style.display = 'block'
      setTimeout(()=>{
        modalContainer.style.display = 'none'
      },4000)
    }
    
    setTimeout(()=>{
      if (response.data.length != 0) {
        window.location.href = '/user account/onlineShop.html';
      }
    },1000)
    let dataUsers = Object.entries(response)
    let users = null
    dataUsers.forEach(user =>{
      users = user[1]
    })
    users.forEach(user =>{
      console.log(user)
    })
  })
  .catch(error => {
    console.log(error);
    if(uname.value != '' && lpass.value != '' &&     alertlpass.style.display == 'none')
    modalContainer.style.display = 'block'
    setTimeout(()=>{
      modalContainer.style.display = 'none'
    },4000)
  })
})
