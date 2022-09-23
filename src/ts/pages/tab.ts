function opentab( evt : Event, tab: string ) {
    let i;
    let tabcontent , tablinks;
  
    tabcontent = document.getElementsByClassName( "tabcontent" ) as HTMLCollectionOf<HTMLElement> ;
    for ( i = 0; i < tabcontent.length; i++ ) {
        tabcontent[i].style.setProperty( 'display','none' );
    }
    tablinks = document.getElementsByClassName( "tablinks" );
    for ( i = 0; i < tablinks.length; i++ ) {
        tablinks[i].className = tablinks[i].className.replace( " active", "" );
    }
    ( document.getElementById( tab ) as HTMLElement ).style.display = "block";
    ( document.getElementById( tab ) as HTMLElement ).style.borderBottom = "block";
    ( evt.currentTarget as HTMLElement ).className  += " active";
}
//(document.getElementById("default-open") as HTMLElement).click(); 

export default opentab;