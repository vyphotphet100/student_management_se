function loadSectionClass() {
    document.getElementById('section-class-card').innerHTML = '';
    var sectionClassCard = `<option value="ID">ID</option>`;
    var sectionClassIds = LecturerRequest.findOne(userDto.id).sectionClassIds;
    for (var i = 0; i < sectionClassIds.length; i++) {
        var sectionClassCardTmp = sectionClassCard;
        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassIds[i]);
        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassIds[i]);
        document.getElementById('section-class-card').innerHTML += sectionClassCardTmp;
    }
}

function loadStudent() {
    var lastName = document.getElementById('student-input-lastname').value;
    document.getElementById('student-card').innerHTML = '';
    var studentCard =
        `<tr>
            <th scope="row">STUDENT_ID</th>
            <td>FIRST_NAME</td>
            <td>LAST_NAME</td>
            <td>BIRTHDAY</td>
            <td>MID_TERM</td>
            <td>END_TERM</td>
            <td>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="viewEdit('STUDENT_ID');">
                  Edit
                </button>
            </td>
        </tr>`;

    var studentDtos = StudentRequest.findAllBySectionClassId(document.getElementById('section-class-card').value);
    for (var i = 0; i < studentDtos.length; i++) {
        if (studentDtos[i].lastName.includes(lastName) || lastName == null) {
            var studentCardTmp = studentCard;
            studentCardTmp = studentCardTmp.replace('STUDENT_ID', studentDtos[i].id);
            studentCardTmp = studentCardTmp.replace('STUDENT_ID', studentDtos[i].id);
            studentCardTmp = studentCardTmp.replace('FIRST_NAME', studentDtos[i].firstName);
            studentCardTmp = studentCardTmp.replace('LAST_NAME', studentDtos[i].lastName);
            var d = new Date(studentDtos[i].birthday);
            studentCardTmp = studentCardTmp.replace('BIRTHDAY', d.toLocaleDateString());
            var registerDto = RegisterRequest.findOneByStudentIdAndSectionClassId(studentDtos[i].id, document.getElementById('section-class-card').value);
            studentCardTmp = studentCardTmp.replace('MID_TERM', registerDto.midTermMark);
            studentCardTmp = studentCardTmp.replace('END_TERM', registerDto.endTermMark);
            document.getElementById('student-card').innerHTML += studentCardTmp;
        }

    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[4].className += ' active';
    }, 1000);
}

function main() {
    loadSectionClass();
    loadStudent();
    activeSidebar();
}
main();

function viewEdit(studentId) {
    var studentDto = StudentRequest.findOne(studentId);
    document.getElementById('student-edit-id').value = studentDto.id;
    document.getElementById('student-edit-name').value = studentDto.fullname;

    var registerDto = RegisterRequest.findOneByStudentIdAndSectionClassId(studentDto.id, document.getElementById('section-class-card').value);
    document.getElementById('student-edit-mid-term').value = registerDto.midTermMark;
    document.getElementById('student-edit-end-term').value = registerDto.endTermMark;
}

function editStudent() {
    var registerDto = RegisterRequest.findOneByStudentIdAndSectionClassId(document.getElementById('student-edit-id').value, document.getElementById('section-class-card').value);
    registerDto.midTermMark = document.getElementById('student-edit-mid-term').value;
    registerDto.endTermMark = document.getElementById('student-edit-end-term').value;
    registerDto = RegisterRequest.update(registerDto);
    alert(registerDto.message);
    if (registerDto.httpStatus == 'OK')
        location.reload();
}

function exportBySectionClassId() {
    if (confirm('Are you sure to export transcript of this section class?')) {
        var registerDto = RegisterRequest.exportBySectionClassId(document.getElementById('section-class-card').value);
        alert(registerDto.message);
        if (registerDto.httpStatus == 'OK') {
            location.href = connecter.baseUrlAPI + registerDto.listResult[0] + '?option=getFile';
        }
    }

}