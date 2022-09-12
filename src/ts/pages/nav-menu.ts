const menuToggler = document.querySelector( '.menu-toggler' ) as HTMLElement;
const nav = document.querySelector( '.navbar' ) as HTMLElement;

menuToggler.onclick = function() {
nav.classList.toggle( 'd-sm-none' );
}; 
