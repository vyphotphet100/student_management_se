function loadCourse() {
    var courseCard =
        `<tr>
          <th scope="row">ID</th>
          <td>NAME</td>
          <td>NUM_OF_CREDIT</td>
          <td>FEE</td>
          <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editCourse('ID')">
                Edit
              </button>
              <button type="button" class="btn btn-secondary" onclick="removeCourse('ID');">Remove</button>
          </td>
        </tr>`;

    var courseDtos = CourseRequest.findAll();
    for (var i = 0; i < courseDtos.length; i++) {
        var courseCardTmp = courseCard;
        courseCardTmp = courseCardTmp.replace('ID', courseDtos[i].id);
        courseCardTmp = courseCardTmp.replace('ID', courseDtos[i].id);
        courseCardTmp = courseCardTmp.replace('ID', courseDtos[i].id);
        courseCardTmp = courseCardTmp.replace('NAME', courseDtos[i].name);
        courseCardTmp = courseCardTmp.replace('NUM_OF_CREDIT', courseDtos[i].numberOfCredit);
        courseCardTmp = courseCardTmp.replace('FEE', courseDtos[i].fee + ' VND');
        document.getElementById('course-card').innerHTML += courseCardTmp;
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[3].className += ' active';
    }, 1000);
}

function main() {
    loadCourse();
    activeSidebar();
}
main();

function editCourse(courseId) {
    var courseDto = CourseRequest.findOne(courseId);
    document.getElementById('course-edit-id').value = courseDto.id;
    document.getElementById('course-edit-name').value = courseDto.name;
    document.getElementById('course-edit-num-of-credit').value = courseDto.numberOfCredit;
    document.getElementById('course-edit-fee-of-credit').value = courseDto.fee / courseDto.numberOfCredit;
    document.getElementById('course-edit-fee').value = courseDto.fee;
    document.getElementById('course-edit-save').onclick = function onclick() { saveEditCourse(courseId); };
}

function computeEditFee() {
    document.getElementById('course-edit-fee').value = document.getElementById('course-edit-fee-of-credit').value * document.getElementById('course-edit-num-of-credit').value;
}

function computeAddFee() {
    document.getElementById('course-add-fee').value = document.getElementById('course-add-fee-of-credit').value * document.getElementById('course-add-num-of-credit').value;
}

function saveEditCourse(courseId) {
    var courseDto = CourseRequest.findOne(courseId);
    courseDto.name = document.getElementById('course-edit-name').value;
    courseDto.numberOfCredit = document.getElementById('course-edit-num-of-credit').value;
    courseDto.fee = document.getElementById('course-edit-fee').value;

    courseDto = CourseRequest.update(courseDto);
    alert(courseDto.message);
    if (courseDto.httpStatus == 'OK')
        location.reload();
}

function removeCourse(courseId) {
    if (!confirm("Are you sure to delete this course?"))
        return;

    var courseDto = CourseRequest.delete(courseId);
    if (courseDto.httpStatus != "OK") {
        alert(courseDto.message);
        return;
    }
    location.reload();
}

function addCourse() {
    var courseDto = {
        id: document.getElementById('course-add-id').value,
        name: document.getElementById('course-add-name').value,
        numberOfCredit: document.getElementById('course-add-num-of-credit').value,
        fee: document.getElementById('course-add-fee').value
    }
    courseDto = CourseRequest.save(courseDto);
    alert(courseDto.message);
    if (courseDto.httpStatus == 'OK')
        location.reload();
}

function searchCourseByID() {
    document.getElementById('course-card').innerHTML = '';
    var courseCard =
        `<tr>
          <th scope="row">ID</th>
          <td>NAME</td>
          <td>NUM_OF_CREDIT</td>
          <td>FEE</td>
          <td>
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editCourse('ID')">
                Edit
              </button>
              <button type="button" class="btn btn-secondary" onclick="removeCourse('ID');">Remove</button>
          </td>
        </tr>`;

    var courseDtos = CourseRequest.findAll();
    for (var i = 0; i < courseDtos.length; i++) {
        if (courseDtos[i].id == document.getElementById('course-search-id').value) {
            var courseCardTmp = courseCard;
            courseCardTmp = courseCardTmp.replace('ID', courseDtos[i].id);
            courseCardTmp = courseCardTmp.replace('ID', courseDtos[i].id);
            courseCardTmp = courseCardTmp.replace('ID', courseDtos[i].id);
            courseCardTmp = courseCardTmp.replace('NAME', courseDtos[i].name);
            courseCardTmp = courseCardTmp.replace('NUM_OF_CREDIT', courseDtos[i].numberOfCredit);
            courseCardTmp = courseCardTmp.replace('FEE', courseDtos[i].fee + ' VND');
            document.getElementById('course-card').innerHTML += courseCardTmp;
        }
    }
}