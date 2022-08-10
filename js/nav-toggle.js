const menuToggler = document.getElementById( 'menu-toggler' );
const leftNav = document.querySelector( 'ul' );

menuToggler.onclick = function() {
    leftNav.classList.toggle( 'd-bg-block' );
};

