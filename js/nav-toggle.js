const menuToggler = document.querySelector( '.menu-toggler' );
const nav = document.querySelector( '.navbar' );

menuToggler.onclick = function() {
nav.classList.toggle( 'd-sm-none' );
};