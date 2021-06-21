function loadUser() {
    var studentDto = BaseRequest.getCurrentUser();
    document.getElementById('student-avatar').src = connecter.baseUrlAPI + studentDto.picture + '?option=getFile';
    document.getElementById('student-id').innerText = studentDto.id;
    document.getElementById('student-edit-id').value = studentDto.id;
    document.getElementById('student-username').innerText = studentDto.username;
    document.getElementById('student-edit-username').value = studentDto.username;
    document.getElementById('student-fullname-1').innerText = studentDto.fullname;
    document.getElementById('student-fullname-2').innerText = studentDto.fullname;
    document.getElementById('student-edit-firstname').value = studentDto.firstName;
    document.getElementById('student-edit-lastname').value = studentDto.lastName;
    document.getElementById('student-edit-password').value = studentDto.password;
    var d = new Date(studentDto.birthday);
    document.getElementById('student-birthday').innerText = d.toLocaleDateString();
    document.getElementById('student-start-year').innerText = studentDto.startYear;
    document.getElementById('student-edit-start-year').value = studentDto.startYear;
    document.getElementById('student-phone').innerText = studentDto.phoneNumber;
    document.getElementById('student-edit-phone').value = studentDto.phoneNumber;
    document.getElementById('student-address').innerText = studentDto.address;
    document.getElementById('student-edit-address').value = studentDto.address;
}

function main() {
    loadUser();
}
main();

function saveUser() {
    var studentDto = StudentRequest.findOne(document.getElementById('student-edit-id').value);
    studentDto.username = document.getElementById('student-edit-username').value;
    studentDto.firstName = document.getElementById('student-edit-firstname').value;
    studentDto.lastName = document.getElementById('student-edit-lastname').value;
    studentDto.fullname = studentDto.firstName.trim() + " " + studentDto.lastName.trim();
    studentDto.password = document.getElementById('student-edit-password').value;
    studentDto.startYear = document.getElementById('student-edit-start-year').value;
    studentDto.phoneNumber = document.getElementById('student-edit-phone').value;
    studentDto.address = document.getElementById('student-edit-address').value;
    studentDto = StudentRequest.update(studentDto);
    alert(studentDto.message);
    if (studentDto.httpStatus == 'OK')
        location.reload();
}