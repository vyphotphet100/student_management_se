function loadNotification() {
    var notiId = common.getParameterByName('id');
    if (notiId != null) {
        var notiDto = NotificationRequest.findOne(notiId);
        document.getElementById('noti-title').value = notiDto.title;
        document.getElementById('noti-short-description').value = notiDto.shortDescription;
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

function saveNoti() {
    if (document.getElementById('noti-title').value.trim() == '' ||
        document.getElementById('noti-short-description').value.trim() == '' ||
        document.getElementById('noti-content').value.trim() == '') {
        alert('Some field are empty. Please re-check.');
        return;
    }

    var notiId = common.getParameterByName('id');
    var notiDto = NotificationRequest.findOne(notiId);
    notiDto.title = document.getElementById('noti-title').value;
    notiDto.shortDescription = document.getElementById('noti-short-description').value;
    notiDto.content = document.getElementById('noti-content').value;
    notiDto = NotificationRequest.update(notiDto);
    alert(notiDto.message);
    if (notiDto.httpStatus == 'OK')
        location.href = 'index.html';
}