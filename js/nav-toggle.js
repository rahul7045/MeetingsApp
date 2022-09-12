const menuToggler = document.querySelector( '.menu-toggler' );
const nav = document.querySelector( '.navbar' );
const logoutBtn = document.querySelector('#logout');

const displayUsername = document.getElementById('display-uname') ;
displayUsername.innerHTML = localStorage.getItem('email')

menuToggler.onclick = function() {
nav.classList.toggle( 'd-sm-none' );
};

logoutBtn.addEventListener( 'click', function() {
    logout();

    window.location = './login-and-registration-page/login.html';
});