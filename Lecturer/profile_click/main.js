function loadUser() {
    var lecturerDto = BaseRequest.getCurrentUser();
    document.getElementById('lecturer-avatar').src = connecter.baseUrlAPI + lecturerDto.picture + '?option=getFile';
    document.getElementById('lecturer-id').innerText = lecturerDto.id;
    document.getElementById('lecturer-edit-id').value = lecturerDto.id;
    document.getElementById('lecturer-username').innerText = lecturerDto.username;
    document.getElementById('lecturer-edit-username').value = lecturerDto.username;
    document.getElementById('lecturer-fullname-1').innerText = lecturerDto.fullname;
    document.getElementById('lecturer-fullname-2').innerText = lecturerDto.fullname;
    document.getElementById('lecturer-edit-fullname').value = lecturerDto.fullname;
    document.getElementById('lecturer-edit-password').value = lecturerDto.password;
    var d = new Date(lecturerDto.birthday);
    document.getElementById('lecturer-birthday').innerText = d.toLocaleDateString();
    document.getElementById('lecturer-phone').innerText = lecturerDto.phoneNumber;
    document.getElementById('lecturer-edit-phone').value = lecturerDto.phoneNumber;
    document.getElementById('lecturer-address').innerText = lecturerDto.address;
    document.getElementById('lecturer-edit-address').value = lecturerDto.address;
}

function main() {
    loadUser();
}
main();

function saveUser() {
    var lecturerDto = LecturerRequest.findOne(document.getElementById('lecturer-edit-id').value);
    lecturerDto.username = document.getElementById('lecturer-edit-username').value;
    lecturerDto.fullname = document.getElementById('lecturer-edit-fullname').value;
    lecturerDto.password = document.getElementById('lecturer-edit-password').value;
    lecturerDto.phoneNumber = document.getElementById('lecturer-edit-phone').value;
    lecturerDto.address = document.getElementById('lecturer-edit-address').value;
    lecturerDto = LecturerRequest.update(lecturerDto);
    alert(lecturerDto.message);
    if (lecturerDto.httpStatus == 'OK')
        location.reload();
}