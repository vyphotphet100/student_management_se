function loadLecturer() {
    var lecturerCard =
        `<tr>
            <th scope="row">ID</th>
            <td>FULLNAME</td>
            <td>BIRTHDAY</td>
            <td>PHONE</td>
            <td>ADDRESS</td>
            <td>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#profileModal" onclick="viewProfile(ID);">
                  View profile
                </button>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="viewEdit(ID);">
                  Edit
                </button>
                <button type="button" class="btn btn-secondary" onclick="removeLecturer(ID);">Remove</button>
            </td>
        </tr>`;

    var lecturerDtos = LecturerRequest.findAll();
    for (var i = 0; i < lecturerDtos.length; i++) {
        var lecturerCardTmp = lecturerCard;

        lecturerCardTmp = lecturerCardTmp.replace('ID', lecturerDtos[i].id);
        lecturerCardTmp = lecturerCardTmp.replace('ID', lecturerDtos[i].id);
        lecturerCardTmp = lecturerCardTmp.replace('ID', lecturerDtos[i].id);
        lecturerCardTmp = lecturerCardTmp.replace('ID', lecturerDtos[i].id);
        lecturerCardTmp = lecturerCardTmp.replace('FULLNAME', lecturerDtos[i].fullname);
        var d = new Date(lecturerDtos[i].birthday);
        lecturerCardTmp = lecturerCardTmp.replace('BIRTHDAY', d.toLocaleDateString());
        lecturerCardTmp = lecturerCardTmp.replace('PHONE', lecturerDtos[i].phoneNumber);
        lecturerCardTmp = lecturerCardTmp.replace('ADDRESS', lecturerDtos[i].address);

        document.getElementById('lecturer-card').innerHTML += lecturerCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[1].className += ' active';
    }, 1000);
}

function main() {
    loadLecturer();
    activeSidebar();
}
main();

function viewProfile(lecturerId) {
    var lecturerDto = LecturerRequest.findOne(lecturerId);
    document.getElementById('lecturer-name-1').innerText = lecturerDto.fullname;
    document.getElementById('lecturer-name-2').innerText = lecturerDto.fullname;
    document.getElementById('lecturer-id').innerText = lecturerDto.id;
    var d = new Date(lecturerDto.birthday);
    document.getElementById('lecturer-birthday').innerText = d.toLocaleDateString();
    document.getElementById('lecturer-address').innerText = lecturerDto.address;
    document.getElementById('lecturer-phone').innerText = lecturerDto.phoneNumber;
    document.getElementById('lecturer-avatar').src = connecter.baseUrlAPI + lecturerDto.picture + '?option=getFile';
}

function viewEdit(lecturerId) {
    var lecturerDto = LecturerRequest.findOne(lecturerId);
    document.getElementById('lecturer-input-fullname').value = lecturerDto.fullname;
    document.getElementById('lecturer-input-id').value = lecturerDto.id;
    var d = new Date(lecturerDto.birthday);
    document.getElementById('lecturer-input-birthday').value = d.toLocaleDateString();
    document.getElementById('lecturer-input-address').value = lecturerDto.address;
    document.getElementById('lecturer-input-phone').value = lecturerDto.phoneNumber;
    document.getElementById('lecturer-edit-save').onclick = function onclick(event) { editLecturer(lecturerId); };
}

function editLecturer(lecturerId) {
    var lecturerDto = LecturerRequest.findOne(lecturerId);
    lecturerDto.fullname = document.getElementById('lecturer-input-fullname').value;
    lecturerDto.id = document.getElementById('lecturer-input-id').value;
    lecturerDto.address = document.getElementById('lecturer-input-address').value;
    lecturerDto.phoneNumber = document.getElementById('lecturer-input-phone').value;

    lecturerDto = LecturerRequest.update(lecturerDto);
    alert(lecturerDto.message);
    if (lecturerDto.httpStatus == "OK")
        location.reload();
}

function addNewLecturer() {
    var lecturerDto = {
        username: document.getElementById('lecturer-input-add-username').value,
        password: document.getElementById('lecturer-input-add-password').value,
        fullname: document.getElementById('lecturer-input-add-fullname').value,
        address: document.getElementById('lecturer-input-add-address').value,
        birthday: document.getElementById('lecturer-input-add-birthday').value,
        phoneNumber: document.getElementById('lecturer-input-add-phone').value
    };

    lecturerDto = LecturerRequest.save(lecturerDto);
    alert(lecturerDto.message);
    if (lecturerDto.httpStatus == "OK") {
        var lecturerId = lecturerDto.id;
        // up avatar
        var fileDto = {
            fileName: lecturerId + '/avatar',
            fileType: 'png',
            base64String: base64AddLecturerAvatar.value
        }
        var lecturerAvaDto = LecturerRequest.upFile(fileDto);
        lecturerDto = LecturerRequest.findOne(lecturerId);
        lecturerDto.picture = lecturerAvaDto.listResult[0];
        LecturerRequest.update(lecturerDto);

        location.reload();
    }

}

function removeLecturer(lecturerId) {
    if (!confirm("Are you sure to delete this lecturer?"))
        return;

    var lecturerDto = LecturerRequest.delete(lecturerId);
    if (lecturerDto.httpStatus != "OK") {
        alert(lecturerDto.message);
        return;
    }
    location.reload();
}

// get base64 string of uploaded add student avatar
var avatarAddLecturerFile = document.getElementById('lecturer-add-avatar-file');
var base64AddLecturerAvatar = document.createElement("INPUT");
base64AddLecturerAvatar.setAttribute("type", "hidden");

avatarAddLecturerFile.onchange = evt => {
    const [file] = avatarAddLecturerFile.files
    if (file) {
        document.getElementById('lecturer-add-avatar').src = URL.createObjectURL(file);

        // get base64 
        let data = avatarAddLecturerFile.files[0];

        const readerAsBase64 = new FileReader();
        readerAsBase64.onloadend = () => {
            // use a regex to remove data url part
            base64AddLecturerAvatar.value = readerAsBase64.result
                .replace("data:", "")
                .replace(/^.+,/, "");
        };
        readerAsBase64.readAsDataURL(data);
    }
}