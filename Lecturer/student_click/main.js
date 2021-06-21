function loadStudent() {
    var lastName = document.getElementById('student-input-lastname').value;
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
          </td>
      </tr>`;

    var studentDtos = StudentRequest.findAllBySectionClassId(document.getElementById('section-class-card').value);
    for (var i = 0; i < studentDtos.length; i++) {
        if (studentDtos[i].lastName.includes(lastName) || lastName == null) {
            var studentCardTmp = studentCard;
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

function loadSectionClass() {
    var sectionClassCard = `<option value="ID">ID</option>`;
    var sectionClassIds = LecturerRequest.findOne(userDto.id).sectionClassIds;
    for (var i = 0; i < sectionClassIds.length; i++) {
        var sectionClassCardTmp = sectionClassCard;
        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassIds[i]);
        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassIds[i]);
        document.getElementById('section-class-card').innerHTML += sectionClassCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[1].className += ' active';
    }, 1000);
}

function main() {
    loadSectionClass();
    loadStudent();
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