function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[2].className += ' active';
    }, 1000);
}

function main() {
    activeSidebar();
}
main();