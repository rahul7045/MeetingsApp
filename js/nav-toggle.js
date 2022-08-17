const menuToggler = document.querySelector( '.menu-toggler' );
const nav = document.querySelector( '.navbar' );
const logoutBtn = document.querySelector('#logout');

menuToggler.onclick = function() {
nav.classList.toggle( 'd-sm-none' );
};

logoutBtn.addEventListener( 'click', function() {
    logout();

    window.location = '../login-and-registration-page/login.html';
});