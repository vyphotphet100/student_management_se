function loadFullNotification() {
    var id = common.getParameterByName('id');
    var notificationDto = NotificationRequest.findOne(id);

    if (notificationDto.httpStatus != 'OK') {
        alert(notificationDto.message);
        return;
    }

    document.getElementById('title').value = notificationDto.title;
    document.getElementById('content').value = notificationDto.content;
}

function main() {
    loadFullNotification();
}
main();