function loadNotification() {

    var notiCard =
        `<div class="feature col">
            <div class="feature-icon bg-primary bg-gradient">
                <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"/></svg>
            </div>
            <h2 class="col">TITLE</h2>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Choose
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="edit_noti.html?id=ID">Edit</a></li>
                    <li><a class="dropdown-item" href="#" onclick="removeNoti(ID);">Remove</a></li>
                </ul>
            </div>
            <p>SHORT_DESCRIPTION</p>
            <a href="HREF_SEE_FULL" class="icon-link">
            See full notification
            <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"/></svg>
            </a>
        </div>`;

    var notificationDtos = NotificationRequest.findAll();
    for (var i = notificationDtos.length - 1; i >= 0; i--) {
        var notiCardTmp = notiCard;
        notiCardTmp = notiCardTmp.replace('ID', notificationDtos[i].id);
        notiCardTmp = notiCardTmp.replace('ID', notificationDtos[i].id);
        notiCardTmp = notiCardTmp.replace('TITLE', notificationDtos[i].title);
        notiCardTmp = notiCardTmp.replace('SHORT_DESCRIPTION', notificationDtos[i].shortDescription);
        notiCardTmp = notiCardTmp.replace('HREF_SEE_FULL', 'seefullNoti.html?id=' + notificationDtos[i].id);
        document.getElementById('noti-card').innerHTML += notiCardTmp;
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

function removeNoti(notiId) {
    if (!confirm("Are you sure to delete this notification?"))
        return;

    var notiDto = NotificationRequest.delete(notiId);
    if (notiDto.httpStatus != "OK") {
        alert(notiDto.message);
        return;
    }
    location.reload();
}