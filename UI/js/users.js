const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-type', 'application/json');
function login () {
    console.log('login is there!');
    const formcontent = document.getElementById('loginForm');
    formcontent.addEventListener('submit', (event) =>{
        event.preventDefault();
        
        const { email, password } = formcontent;
        const userInfo = { email: email.value, password: password.value };
        
        const submitInfo = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userInfo),
        };
        fetch ('../../api/v1/auth/login', submitInfo)
        .then(response => response.json())
        .then((returnUser) => {
            if (returnUser.token){
                window.localStorage.setItem('userInfo', JSON.stringify(returnUser));
                window.location.replace('meetups.html');
            }else if(returnUser.error){
                document.getElementById('login-error').innerHTML = returnUser.error;
                ;
                // alert(JSON.stringify(returnUser));
            }else if(returnUser.message){
                document.getElementById('login-error').innerHTML = returnUser.message;
            }
        });
    });
}