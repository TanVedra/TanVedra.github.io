var popup     = document.getElementById('myPopup'),
    btn       = document.getElementById('MyBtn'),
    crosshair = document.getElementsByClassName('break')[0];

btn.onclick = function () {
    popup.style.display = 'block';    
}

crosshair.onclick = function () {
    popup.style.display = 'none';
}

document.onclick = function () {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}