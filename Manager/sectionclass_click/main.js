function loadSectionClass() {
    var sectionClassCard =
        `<tr>
          <th scope="row">ID</th>
          <td>NAME</td>
          <td>ROOM</td>
          <td>CREDITS</td>
          <td>LECTURER_NAME</td>
          <td>ATTENDED</td>
          <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ViewModal" onclick="viewDetails('ID');">
                Details
              </button>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="viewEdit('ID');">
                Edit
              </button>
              <button type="button" class="btn btn-secondary" onclick="removeSectionClass('ID');">Remove</button>
          </td>`;

    var sectionClassDtos = SectionClassRequest.findAll();
    for (var i = 0; i < sectionClassDtos.length; i++) {
        var sectionClassCardTmp = sectionClassCard;
        var courseDto = CourseRequest.findOne(sectionClassDtos[i].courseId);
        var lecturerDto = LecturerRequest.findOne(sectionClassDtos[i].lecturerId);
        var attendedStudents = StudentRequest.findAllBySectionClassId(sectionClassDtos[i].id);

        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
        sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
        sectionClassCardTmp = sectionClassCardTmp.replace('NAME', sectionClassDtos[i].name);
        sectionClassCardTmp = sectionClassCardTmp.replace('ROOM', sectionClassDtos[i].room);
        sectionClassCardTmp = sectionClassCardTmp.replace('CREDITS', courseDto.numberOfCredit);
        sectionClassCardTmp = sectionClassCardTmp.replace('LECTURER_NAME', lecturerDto.fullname);
        sectionClassCardTmp = sectionClassCardTmp.replace('ATTENDED', attendedStudents.length);
        document.getElementById('section-class-card').innerHTML += sectionClassCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[5].className += ' active';
    }, 1000);
}

function main() {
    loadSectionClass();
    activeSidebar();
}
main();

function viewDetails(sectionClassId) {
    var sectionClassDto = SectionClassRequest.findOne(sectionClassId);
    var courseDto = CourseRequest.findOne(sectionClassDto.courseId);
    var lecturerDto = LecturerRequest.findOne(sectionClassDto.lecturerId);
    var attendedStudents = StudentRequest.findAllBySectionClassId(sectionClassDto.id);

    document.getElementById('section-class-details-id').value = sectionClassDto.id;
    document.getElementById('section-class-details-name').value = sectionClassDto.name;
    document.getElementById('section-class-details-credits').value = courseDto.numberOfCredit;
    document.getElementById('section-class-details-start-time').value = sectionClassDto.startTime;
    document.getElementById('section-class-details-end-time').value = sectionClassDto.endTime;
    document.getElementById('section-class-details-weekday').value = sectionClassDto.weekday;
    document.getElementById('section-class-details-room').value = sectionClassDto.room;
    document.getElementById('section-class-details-attended').value = attendedStudents.length;
    document.getElementById('section-class-details-lecturer-name').value = lecturerDto.fullname;
    var d = new Date(sectionClassDto.examDate);
    document.getElementById('section-class-details-exam-date').value = d.toLocaleDateString();
}

function viewEdit(sectionClassId) {
    var sectionClassDto = SectionClassRequest.findOne(sectionClassId);
    var courseDto = CourseRequest.findOne(sectionClassDto.courseId);
    var lecturerDto = LecturerRequest.findOne(sectionClassDto.lecturerId);
    var attendedStudents = StudentRequest.findAllBySectionClassId(sectionClassDto.id);

    document.getElementById('section-class-edit-id').value = sectionClassDto.id;
    document.getElementById('section-class-edit-name').value = sectionClassDto.name;
    document.getElementById('section-class-edit-credits').value = courseDto.numberOfCredit;
    document.getElementById('section-class-edit-start-time').value = sectionClassDto.startTime;
    document.getElementById('section-class-edit-end-time').value = sectionClassDto.endTime;
    document.getElementById('section-class-edit-weekday').value = sectionClassDto.weekday;
    document.getElementById('section-class-edit-room').value = sectionClassDto.room;
    document.getElementById('section-class-edit-attended').value = attendedStudents.length;
    document.getElementById('section-class-edit-lecturer-name').value = lecturerDto.fullname;
    var d = new Date(sectionClassDto.examDate);
    document.getElementById('section-class-edit-exam-date').value = d.toISOString().substring(0, 10);
    document.getElementById('section-class-edit-save').onclick = function onclick() { editSectionClass(sectionClassId); };
}

function editSectionClass(sectionClassId) {
    var sectionClassDto = SectionClassRequest.findOne(sectionClassId);
    sectionClassDto.name = document.getElementById('section-class-edit-name').value;
    var today = new Date();
    var startTime = new Date(today.toDateString() + " " + document.getElementById('section-class-edit-start-time').value);
    var endTime = new Date(today.toDateString() + " " + document.getElementById('section-class-edit-end-time').value);
    sectionClassDto.startTime = startTime.toISOString();
    sectionClassDto.endTime = endTime.toISOString();
    sectionClassDto.weekday = document.getElementById('section-class-edit-weekday').value;
    sectionClassDto.room = document.getElementById('section-class-edit-room').value;
    sectionClassDto.examDate = document.getElementById('section-class-edit-exam-date').value;
    sectionClassDto = SectionClassRequest.update(sectionClassDto);

    alert(sectionClassDto.message);
    if (sectionClassDto.httpStatus == 'OK')
        location.reload();
}

function viewAddSectionClass() {
    // load course
    var courseCard = `<option value="COURSE_ID">COURSE_ID</option>`;
    var courseDtos = CourseRequest.findAll();
    for (var i = 0; i < courseDtos.length; i++) {
        var courseCardTmp = courseCard;
        courseCardTmp = courseCardTmp.replace('COURSE_ID', courseDtos[i].id);
        courseCardTmp = courseCardTmp.replace('COURSE_ID', courseDtos[i].id);
        document.getElementById('course-add-card').innerHTML += courseCardTmp;
    }

    // load lecturer
    var lecturerCard = `<option value="LECTURER_ID">LECTURER_NAME</option>`;
    var lecturerDtos = LecturerRequest.findAll();
    for (var i = 0; i < lecturerDtos.length; i++) {
        var lecturerCardTmp = lecturerCard;
        lecturerCardTmp = lecturerCardTmp.replace('LECTURER_ID', lecturerDtos[i].id);
        lecturerCardTmp = lecturerCardTmp.replace('LECTURER_NAME', lecturerDtos[i].fullname);
        document.getElementById('lecturer-add-card').innerHTML += lecturerCardTmp;
    }
}

function addSectionClass() {
    var today = new Date();
    var startTime = new Date(today.toDateString() + " " + document.getElementById('section-class-add-start-time').value);
    var endTime = new Date(today.toDateString() + " " + document.getElementById('section-class-add-end-time').value);

    var sectionClassDto = {
        id: document.getElementById('section-class-add-id').value,
        name: document.getElementById('section-class-add-name').value,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        weekday: document.getElementById('section-class-add-weekday').value,
        room: document.getElementById('section-class-add-room').value,
        courseId: document.getElementById('course-add-card').value,
        lecturerId: document.getElementById('lecturer-add-card').value,
        examDate: document.getElementById('section-class-add-exam-date').value
    };

    sectionClassDto = SectionClassRequest.save(sectionClassDto);
    alert(sectionClassDto.message);
    if (sectionClassDto.httpStatus == 'OK')
        location.reload();
}

function removeSectionClass(sectionClassId) {
    if (!confirm("Are you sure to delete this section class?"))
        return;

    var sectionClassDto = SectionClassRequest.delete(sectionClassId);
    if (sectionClassDto.httpStatus != "OK") {
        alert(sectionClassDto.message);
        return;
    }
    location.reload();
}

function searchBySectionClassId() {
    document.getElementById('section-class-card').innerHTML = '';
    var sectionClassCard =
        `<tr>
          <th scope="row">ID</th>
          <td>NAME</td>
          <td>ROOM</td>
          <td>CREDITS</td>
          <td>LECTURER_NAME</td>
          <td>ATTENDED</td>
          <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ViewModal" onclick="viewDetails('ID');">
                Details
              </button>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="viewEdit('ID');">
                Edit
              </button>
              <button type="button" class="btn btn-secondary" onclick="removeSectionClass('ID');">Remove</button>
          </td>`;

    var sectionClassDtos = SectionClassRequest.findAll();
    for (var i = 0; i < sectionClassDtos.length; i++) {
        if (sectionClassDtos[i].id.includes(document.getElementById('search-input').value)) {
            var sectionClassCardTmp = sectionClassCard;
            var courseDto = CourseRequest.findOne(sectionClassDtos[i].courseId);
            var lecturerDto = LecturerRequest.findOne(sectionClassDtos[i].lecturerId);
            var attendedStudents = StudentRequest.findAllBySectionClassId(sectionClassDtos[i].id);

            sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
            sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
            sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
            sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDtos[i].id);
            sectionClassCardTmp = sectionClassCardTmp.replace('NAME', sectionClassDtos[i].name);
            sectionClassCardTmp = sectionClassCardTmp.replace('ROOM', sectionClassDtos[i].room);
            sectionClassCardTmp = sectionClassCardTmp.replace('CREDITS', courseDto.numberOfCredit);
            sectionClassCardTmp = sectionClassCardTmp.replace('LECTURER_NAME', lecturerDto.fullname);
            sectionClassCardTmp = sectionClassCardTmp.replace('ATTENDED', attendedStudents.length);
            document.getElementById('section-class-card').innerHTML += sectionClassCardTmp;
        }
    }
}