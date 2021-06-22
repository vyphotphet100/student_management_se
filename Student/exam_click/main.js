function loadRegisteredClass() {
    var registeredClassCard =
        '<tr>' +
        '  <th scope="row">COURSE_NAME</th>' +
        '  <td>EXAM_DAY</td>' +
        '  <td>EXAM_TIME</td>' +
        '  <td>ROOM</td>' +
        '</tr>';

    var registeredClassDtos = StudentRequest.getRegisteredSectionClass();
    for (var i = 0; i < registeredClassDtos.length; i++) {

        var courseDto = CourseRequest.findOne(registeredClassDtos[i].courseId);
        // get exam date
        var examDate = new Date(registeredClassDtos[i].examDate);
        var examDay = examDate.toLocaleDateString();
        var examTime = examDate.toLocaleTimeString();

        var registeredClassCardTmp = registeredClassCard;
        registeredClassCardTmp = registeredClassCardTmp.replace('COURSE_NAME', courseDto.name);
        registeredClassCardTmp = registeredClassCardTmp.replace('EXAM_DAY', examDay);
        registeredClassCardTmp = registeredClassCardTmp.replace('EXAM_TIME', examTime);
        registeredClassCardTmp = registeredClassCardTmp.replace('ROOM', registeredClassDtos[i].room);
        document.getElementById('registered-class-card').innerHTML += registeredClassCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[3].className += ' active';
    }, 1000);
}

function main() {
    loadRegisteredClass();
    activeSidebar();
}
main();

function printExamSchedule() {
    var studentDto = StudentRequest.printExamSchedule(userDto.id);
    alert(studentDto.message);
    if (studentDto.httpStatus == 'OK')
        location.href = connecter.baseUrlAPI + studentDto.listResult[0] + '?option=getFile';
}