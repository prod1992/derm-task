import Scrollbar from 'smooth-scrollbar';



document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('resize', function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        Scrollbar.initAll();
        if (deviceWidth >= 992) {
            Scrollbar.destroyAll();
        }
    });
    window.onresize = function() {
        // triggering window resize
    }
}, false);