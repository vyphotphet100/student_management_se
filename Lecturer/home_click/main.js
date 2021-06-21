function loadNotification() {
    var notiStr =
        '<div class="feature col">' +
        '  <div class="feature-icon bg-primary bg-gradient">' +
        '    <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"/></svg>' +
        '  </div>' +
        '  <h2>TITLE</h2>' +
        '  <p>SHORT_DESCRIPTION</p>' +
        '  <a href="HREF" class="icon-link"> See full notification' +
        '    <svg class="bi" width="1em" height="1em">' +
        '      <use xlink:href="#chevron-right"/>' +
        '    </svg>' +
        '  </a>' +
        '</div>';

    var notiCard = document.getElementById('noti-card');
    var notificationDtos = NotificationRequest.findAll();
    for (var i = notificationDtos.length - 1; i >= 0; i--) {
        var notiStrTmp = notiStr;
        notiStrTmp = notiStrTmp.replace('TITLE', notificationDtos[i].title);
        notiStrTmp = notiStrTmp.replace('SHORT_DESCRIPTION', notificationDtos[i].shortDescription);
        notiStrTmp = notiStrTmp.replace('HREF', 'seefullNoti.html?id=' + notificationDtos[i].id);
        notiCard.innerHTML += notiStrTmp;
    }

}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[0].className += ' active';
    }, 1000);
}

function main() {
    loadNotification();
    activeSidebar();
}
main();