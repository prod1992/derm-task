import Scrollbar from 'smooth-scrollbar';



document.addEventListener('DOMContentLoaded', () => {
   
    let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let scrollBar = Scrollbar.initAll();
    console.log(scrollBar)
    if (deviceWidth >= 992) {
        Scrollbar.destroyAll();
    }
    window.addEventListener('resize', function () {
        deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        Scrollbar.initAll();
        if (deviceWidth >= 992) {
            Scrollbar.destroyAll();
        }
    });
    
}, false);

