function loadStudent() {
    var studentCard =
        `<tr>
            <th scope="row">ID</th>
            <td>FIRST_NAME</td>
            <td>LAST_NAME</td>
            <td>BIRTHDAY</td>
            <td>START_YEAR</td>
            <td>PHONE</td>
            <td>ADDRESS</td>
            <td>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#profileModal" onclick="viewProfileStudent(ID);">
                    View profile
                </button>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="viewEditStudent(ID);">
                    Edit
                </button>
                <button type="button" class="btn btn-secondary" onclick="removeStudent(ID);">Remove</button>
            </td>
        </tr>`;

    var studentDtos = StudentRequest.findAll();
    for (var i = 0; i < studentDtos.length; i++) {
        var studentCardTmp = studentCard;
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('FIRST_NAME', studentDtos[i].firstName);
        studentCardTmp = studentCardTmp.replace('LAST_NAME', studentDtos[i].lastName);
        var d = new Date(studentDtos[i].birthday);
        studentCardTmp = studentCardTmp.replace('BIRTHDAY', d.toLocaleDateString());
        studentCardTmp = studentCardTmp.replace('START_YEAR', studentDtos[i].startYear);
        studentCardTmp = studentCardTmp.replace('PHONE', studentDtos[i].phoneNumber);
        studentCardTmp = studentCardTmp.replace('ADDRESS', studentDtos[i].address);
        document.getElementById('student-card').innerHTML += studentCardTmp;
    }
}

function loadSectionClass() {
    var sectionClassCard = `<li><a class="dropdown-item" href="#" onclick="chooseSectionClass('SECTION_CLASS_ID');">SECTION_CLASS_ID</a></li>`;
    var sectionClassDtos = SectionClassRequest.findAll();
    for (var i = 0; i < sectionClassDtos.length; i++) {
        var sectionClassCardTmp = sectionClassCard;
        sectionClassCardTmp = sectionClassCardTmp.replace('SECTION_CLASS_ID', sectionClassDtos[i].id);
        sectionClassCardTmp = sectionClassCardTmp.replace('SECTION_CLASS_ID', sectionClassDtos[i].id);
        document.getElementById('section-class-card').innerHTML += sectionClassCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[2].className += ' active';
    }, 1000);
}

function main() {
    loadStudent();
    loadSectionClass();
    activeSidebar();
}
main();

function viewProfileStudent(studentId) {
    var studentDto = StudentRequest.findOne(studentId);
    document.getElementById('student-fullname').innerText = studentDto.fullname;
    document.getElementById('student-id').innerText = studentDto.id;
    document.getElementById('student-firstname').innerText = studentDto.firstName;
    document.getElementById('student-lastname').innerText = studentDto.lastName;
    var d = new Date(studentDto.birthday);
    document.getElementById('student-birthday').innerText = d.toLocaleDateString();
    document.getElementById('student-start-year').innerText = studentDto.startYear;
    document.getElementById('student-gender').innerText = studentDto.gender;
    document.getElementById('student-address').innerText = studentDto.address;
    document.getElementById('student-phone').innerText = studentDto.phoneNumber;
    document.getElementById('student-avatar').src = connecter.baseUrlAPI + studentDto.picture + '?option=getFile';
}

function viewEditStudent(studentId) {
    var studentDto = StudentRequest.findOne(studentId);
    document.getElementById('student-edit-id').value = studentDto.id;
    document.getElementById('student-edit-username').value = studentDto.username;
    document.getElementById('student-edit-password').value = studentDto.password;
    document.getElementById('student-edit-firstname').value = studentDto.firstName;
    document.getElementById('student-edit-lastname').value = studentDto.lastName;
    var d = new Date(studentDto.birthday);
    document.getElementById('student-edit-birthday').value = d.toLocaleDateString();
    document.getElementById('student-edit-start-year').value = studentDto.startYear;
    document.getElementById('student-edit-gender').value = studentDto.gender;
    document.getElementById('student-edit-address').value = studentDto.address;
    document.getElementById('student-edit-phone').value = studentDto.phoneNumber;
    document.getElementById('student-edit-save').onclick = function onclick(event) { editStudent(studentId); };
}

function editStudent(studentId) {
    var studentDto = StudentRequest.findOne(studentId);
    studentDto.password = document.getElementById('student-edit-password').value;
    studentDto.firstName = document.getElementById('student-edit-firstname').value;
    studentDto.lastName = document.getElementById('student-edit-lastname').value;
    studentDto.fullname = studentDto.firstName.trim() + " " + studentDto.lastName.trim();
    studentDto.startYear = document.getElementById('student-edit-start-year').value;
    studentDto.gender = document.getElementById('student-edit-gender').value;
    studentDto.address = document.getElementById('student-edit-address').value;
    studentDto.phoneNumber = document.getElementById('student-edit-phone').value;
    studentDto = StudentRequest.update(studentDto);

    alert(studentDto.message);
    if (studentDto.httpStatus == 'OK')
        location.reload();
}

// get base64 string of uploaded add student avatar
var avatarAddStudentFile = document.getElementById('student-add-avatar-file');
var base64AddStudentAvatar = document.createElement("INPUT");
base64AddStudentAvatar.setAttribute("type", "hidden");

avatarAddStudentFile.onchange = evt => {
    const [file] = avatarAddStudentFile.files
    if (file) {
        document.getElementById('student-add-avatar').src = URL.createObjectURL(file);

        // get base64 
        let data = avatarAddStudentFile.files[0];

        const readerAsBase64 = new FileReader();
        readerAsBase64.onloadend = () => {
            // use a regex to remove data url part
            base64AddStudentAvatar.value = readerAsBase64.result
                .replace("data:", "")
                .replace(/^.+,/, "");
        };
        readerAsBase64.readAsDataURL(data);
    }
}

function addStudent() {
    var studentId = document.getElementById('student-add-id').value;
    // up avatar
    var fileDto = {
        fileName: studentId + '/avatar',
        fileType: 'png',
        base64String: base64AddStudentAvatar.value
    }
    var studentAvaDto = StudentRequest.upFile(fileDto);
    if (studentAvaDto.httpStatus != 'OK') {
        alert('This student exists already.');
        return;
    }

    var studentDto = {
        id: document.getElementById('student-add-id').value,
        username: document.getElementById('student-add-username').value,
        password: document.getElementById('student-add-password').value,
        firstName: document.getElementById('student-add-firstname').value,
        lastName: document.getElementById('student-add-lastname').value,
        fullname: document.getElementById('student-add-firstname').value.trim() + " " + document.getElementById('student-add-lastname').value.trim(),
        birthday: document.getElementById('student-add-birthday').value,
        gender: document.getElementById('student-add-gender').value,
        startYear: document.getElementById('student-add-start-year').value,
        phoneNumber: document.getElementById('student-add-phone').value,
        address: document.getElementById('student-add-address').value,
        birthday: document.getElementById('student-add-birthday').value,
        picture: studentAvaDto.listResult[0]
    };

    studentDto = StudentRequest.save(studentDto);
    alert(studentDto.message);
    if (studentDto.httpStatus == 'OK')
        location.reload();
}

function removeStudent(studentId) {
    if (!confirm("Are you sure to delete this student?"))
        return;

    var studentDto = StudentRequest.delete(studentId);
    if (studentDto.httpStatus != "OK") {
        alert(studentDto.message);
        return;
    }
    location.reload();
}

function chooseSectionClass(sectionClassId) {
    document.getElementById('choose-section-class-button').innerText = sectionClassId;
    document.getElementById('student-card').innerHTML = '';
    var studentCard =
        `<tr>
            <th scope="row">ID</th>
            <td>FIRST_NAME</td>
            <td>LAST_NAME</td>
            <td>BIRTHDAY</td>
            <td>START_YEAR</td>
            <td>PHONE</td>
            <td>ADDRESS</td>
            <td>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#profileModal" onclick="viewProfileStudent(ID);">
                    View profile
                </button>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="viewEditStudent(ID);">
                    Edit
                </button>
                <button type="button" class="btn btn-secondary" onclick="removeStudent(ID);">Remove</button>
            </td>
        </tr>`;

    var studentDtos = StudentRequest.findAllBySectionClassId(sectionClassId);
    for (var i = 0; i < studentDtos.length; i++) {
        var studentCardTmp = studentCard;
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
        studentCardTmp = studentCardTmp.replace('FIRST_NAME', studentDtos[i].firstName);
        studentCardTmp = studentCardTmp.replace('LAST_NAME', studentDtos[i].lastName);
        var d = new Date(studentDtos[i].birthday);
        studentCardTmp = studentCardTmp.replace('BIRTHDAY', d.toLocaleDateString());
        studentCardTmp = studentCardTmp.replace('START_YEAR', studentDtos[i].startYear);
        studentCardTmp = studentCardTmp.replace('PHONE', studentDtos[i].phoneNumber);
        studentCardTmp = studentCardTmp.replace('ADDRESS', studentDtos[i].address);
        document.getElementById('student-card').innerHTML += studentCardTmp;
    }
}

function searchByLastName() {
    document.getElementById('student-card').innerHTML = '';
    var studentCard =
        `<tr>
            <th scope="row">ID</th>
            <td>FIRST_NAME</td>
            <td>LAST_NAME</td>
            <td>BIRTHDAY</td>
            <td>START_YEAR</td>
            <td>PHONE</td>
            <td>ADDRESS</td>
            <td>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#profileModal" onclick="viewProfileStudent(ID);">
                    View profile
                </button>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="viewEditStudent(ID);">
                    Edit
                </button>
                <button type="button" class="btn btn-secondary" onclick="removeStudent(ID);">Remove</button>
            </td>
        </tr>`;

    var studentDtos = StudentRequest.findAll();
    for (var i = 0; i < studentDtos.length; i++) {
        if (studentDtos[i].lastName == document.getElementById('search-input').value) {
            var studentCardTmp = studentCard;
            studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
            studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
            studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
            studentCardTmp = studentCardTmp.replace('ID', studentDtos[i].id);
            studentCardTmp = studentCardTmp.replace('FIRST_NAME', studentDtos[i].firstName);
            studentCardTmp = studentCardTmp.replace('LAST_NAME', studentDtos[i].lastName);
            var d = new Date(studentDtos[i].birthday);
            studentCardTmp = studentCardTmp.replace('BIRTHDAY', d.toLocaleDateString());
            studentCardTmp = studentCardTmp.replace('START_YEAR', studentDtos[i].startYear);
            studentCardTmp = studentCardTmp.replace('PHONE', studentDtos[i].phoneNumber);
            studentCardTmp = studentCardTmp.replace('ADDRESS', studentDtos[i].address);
            document.getElementById('student-card').innerHTML += studentCardTmp;
        }

    }
}