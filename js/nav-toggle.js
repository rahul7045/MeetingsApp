const menuToggler = document.getElementById( 'menu-toggler' );
const leftNav = document.querySelector( '.left-nav' );

menuToggler.onclick = function() {
    leftNav.classList.toggle( 'd-sm-none' );
};