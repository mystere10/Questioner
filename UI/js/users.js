/* eslint-disable linebreak-style */
const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-type', 'application/json');
function login() {
  const formcontent = document.getElementById('loginForm');
  formcontent.addEventListener('submit', (event) => {
    event.preventDefault();
    const { email, password } = formcontent;
    const userInfo = { email: email.value, password: password.value };

    const submitInfo = {
      method: 'POST',
      headers,
      body: JSON.stringify(userInfo),
    };
    fetch('../../api/v1/auth/login', submitInfo)
      .then(response => response.json())
      .then((returnUser) => {
        if (returnUser.token && returnUser.user.isadmin) {
          window.localStorage.setItem('userInfo', JSON.stringify(returnUser));
          window.location.replace('meetups.html');
        } else if (returnUser.token && !returnUser.user.isadmin) {
          window.localStorage.setItem('userInfo', JSON.stringify(returnUser));
          window.location.replace('userhome.html');
        } else if (returnUser.error) {
          document.getElementById('login-error').innerHTML = returnUser.error;

          // alert(JSON.stringify(returnUser));
        } else if (returnUser.message) {
          document.getElementById('login-error').innerHTML = returnUser.message;

          // alert(JSON.stringify(returnUser));
        }
      });
  });
}

function registration() {
  const signupform = document.getElementById('signup');
  signupform.addEventListener('submit', (event) => {
    event.preventDefault();

    const {
      firstname, lastname, othername, email, phoneNumber, username, password,
    } = signupform;
    const signupData = {
      firstname: firstname.value,
      lastname: lastname.value,
      othername: othername.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      username: username.value,
      password: password.value,
    };

    const submitRegistration = {
      method: 'POST',
      headers,
      body: JSON.stringify(signupData),
    };
    fetch('../../api/v1/auth/signup', submitRegistration)
      .then(response => response.json())
      .then((registereduser) => {
        if (registereduser.token && registereduser.user) {
          window.localStorage.setItem('registeredUser', JSON.stringify(registereduser));
          document.getElementById('registered').innerHTML = registereduser.message;
          //   window.location.replace('login.html');
        } else if (registereduser.error) {
          document.getElementById('registration-error').innerHTML = registereduser.error;
        }
      });
  });
}
