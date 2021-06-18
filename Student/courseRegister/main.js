function loadRegisteredClass() {
    var registeredClassCard =
        '<tr>' +
        '  <th scope="row">ID</th>' +
        '  <td>NAME</td>' +
        '  <td>NUM_OF_CREDIT</td>' +
        '  <td>LECTURER_NAME</td>' +
        '</tr>';
    var registeredClassDtos = StudentRequest.getRegisteredSectionClass();
    for (var i = 0; i < registeredClassDtos.length; i++) {
        var registeredClassCardTmp = registeredClassCard;
        var courseDto = CourseRequest.findOne(registeredClassDtos[i].courseId);
        var lecturerDto = LecturerRequest.findOne(registeredClassDtos[i].lecturerId);

        registeredClassCardTmp = registeredClassCardTmp.replace('ID', registeredClassDtos[i].id);
        registeredClassCardTmp = registeredClassCardTmp.replace('NAME', registeredClassDtos[i].name);
        registeredClassCardTmp = registeredClassCardTmp.replace('NUM_OF_CREDIT', courseDto.numberOfCredit);
        registeredClassCardTmp = registeredClassCardTmp.replace('LECTURER_NAME', lecturerDto.fullname);
        document.getElementById('registered-class-card').innerHTML += registeredClassCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[1].className += ' active';
    }, 1000);
}

function main() {
    loadRegisteredClass();
    activeSidebar();
}
main();