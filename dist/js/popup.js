var popup     = document.getElementById('myPopup'),
    btn       = document.getElementById('MyBtn'),
    crosshair = document.getElementsByClassName('break')[0],
    vline     = document.getElementsByTagName('body')[0],
    up        = document.getElementById('toTop');

btn.onclick = function () {
    popup.style.display = 'block';
    vline.style.overflow = 'hidden';
}

crosshair.onclick = function () {
    popup.style.display = 'none';
    vline.style.overflow = 'auto';
}

document.onclick = function () {
    if (event.target == popup) {
        popup.style.display = 'none';
        vline.style.overflow = 'auto';
    }
}

window.onscroll = function() {    
    if( document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        up.style.display = 'block';
    } else {
        up.style.display = 'none';
    }
}

function topFunction() {     
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);  
    if(top > 0) {  
        window.scrollBy(0,((top+100)/-10));  
        t = setTimeout('topFunction()',20);  
    } else clearTimeout(t);  
    return false;      
}
