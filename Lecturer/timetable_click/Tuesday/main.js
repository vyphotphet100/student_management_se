function loadTimetable() {
    var sectionClassCard =
        '  <div class="col-md-6">' +
        '    <div class="timetable-item">' +
        '      <div class="timetable-item-img">' +
        '        <img src="AVT_SRC">' +
        '      </div>' +
        '      <div class="timetable-item-main">' +
        '        <div class="timetable-item-time">START_TIME - END_TIME</div>' +
        '        <div class="timetable-item-name">COURSE_NAME</div>' +
        '        <div class="timetable-item-name" style="font-size: 20px;">Room: ROOM</div>' +
        '      </div>' +
        '    </div>' +
        '  </div>';

    document.getElementById('timetable-card').innerHTML = '';
    var sectionClassDtos = LecturerRequest.getRegisteredSectionClassByWeekday(3);
    for (var i = 0; i < sectionClassDtos.length; i++) {
        var sectionClassCardTmp = sectionClassCard;
        // get course
        var courseDto = CourseRequest.findOne(sectionClassDtos[i].courseId);

        sectionClassCardTmp = sectionClassCardTmp.replace('AVT_SRC', connecter.baseUrlAPI + userDto.picture + '?option=getFile');
        sectionClassCardTmp = sectionClassCardTmp.replace('START_TIME', sectionClassDtos[i].startTime);
        sectionClassCardTmp = sectionClassCardTmp.replace('END_TIME', sectionClassDtos[i].endTime);
        sectionClassCardTmp = sectionClassCardTmp.replace('COURSE_NAME', courseDto.name);
        sectionClassCardTmp = sectionClassCardTmp.replace('ROOM', sectionClassDtos[i].room);
        document.getElementById('timetable-card').innerHTML += sectionClassCardTmp;
    }

}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[2].className += ' active';
    }, 1000);
}

function main() {
    loadTimetable();
    activeSidebar();
}
main();