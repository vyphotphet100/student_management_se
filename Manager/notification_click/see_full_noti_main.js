function loadNotification() {
    var notiId = common.getParameterByName('id');
    if (notiId != null) {
        var notiDto = NotificationRequest.findOne(notiId);
        document.getElementById('noti-title').value = notiDto.title;
        document.getElementById('noti-content').value = notiDto.content;
    }

}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[4].className += ' active';
    }, 1000);
}

function main() {
    loadNotification();
    activeSidebar();
}
main();