function loadUser() {
    var educationDto = BaseRequest.getCurrentUser();
    document.getElementById('manager-avatar').src = connecter.baseUrlAPI + educationDto.picture + '?option=getFile';
    document.getElementById('manager-username').innerText = educationDto.username;
    document.getElementById('manager-edit-username').value = educationDto.username;
    document.getElementById('manager-edit-password').value = educationDto.password;
    document.getElementById('manager-email').innerText = educationDto.email;
    document.getElementById('manager-edit-email').value = educationDto.email;
    document.getElementById('manager-phone').innerText = educationDto.phoneNumber;
    document.getElementById('manager-edit-phone').value = educationDto.phoneNumber;
    document.getElementById('manager-address').innerText = educationDto.address;
    document.getElementById('manager-edit-address').value = educationDto.address;
}

function main() {
    loadUser();
}
main();

function saveUser() {
    var educationDto = EducationTrainingRequest.findOne(document.getElementById('manager-edit-username').value);
    educationDto.email = document.getElementById('manager-edit-email').value;
    educationDto.password = document.getElementById('manager-edit-password').value;
    educationDto.phoneNumber = document.getElementById('manager-edit-phone').value;
    educationDto.address = document.getElementById('manager-edit-address').value;
    educationDto = EducationTrainingRequest.update(educationDto);
    alert(educationDto.message);
    if (educationDto.httpStatus == 'OK')
        location.reload();
}