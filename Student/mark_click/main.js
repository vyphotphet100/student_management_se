function loadRegister() {
    var registerCard =
        '<tr>' +
        '  <th scope="row">SECTION_CLASS_ID</th>' +
        '  <td>COURSE_NAME</td>' +
        '  <td>NUM_OF_CREDIT</td>' +
        '  <td>MID_TERM</td>' +
        '  <td>END_TERM</td>' +
        '</tr>';

    var registerDtos = RegisterRequest.findAllByStudentId(userDto.id);
    for (var i = 0; i < registerDtos.length; i++) {
        var registerCardTmp = registerCard;
        var sectionClassDto = SectionClassRequest.findOne(registerDtos[i].sectionClassId);
        var courseDto = CourseRequest.findOne(sectionClassDto.courseId);

        registerCardTmp = registerCardTmp.replace('SECTION_CLASS_ID', sectionClassDto.id);
        registerCardTmp = registerCardTmp.replace('COURSE_NAME', courseDto.name);
        registerCardTmp = registerCardTmp.replace('NUM_OF_CREDIT', courseDto.numberOfCredit);
        registerCardTmp = registerCardTmp.replace('MID_TERM', registerDtos[i].midTermMark);
        registerCardTmp = registerCardTmp.replace('END_TERM', registerDtos[i].endTermMark);
        document.getElementById('register-card').innerHTML += registerCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[4].className += ' active';
    }, 1000);
}

function main() {
    loadRegister();
    activeSidebar();
}
main();