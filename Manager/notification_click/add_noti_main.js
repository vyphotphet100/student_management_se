function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[4].className += ' active';
    }, 1000);
}

function main() {
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

    var notiDto = {
        title: document.getElementById('noti-title').value,
        shortDescription: document.getElementById('noti-short-description').value,
        content: document.getElementById('noti-content').value
    };

    notiDto = NotificationRequest.save(notiDto);
    alert(notiDto.message);
    if (notiDto.httpStatus == 'OK')
        location.href = 'index.html';
}