function loadSectionClass() {
    var sectionClassCard =
        `<tr>
          <th scope="row">ID</th>
          <td>NAME</td>
          <td>CREDITS</td>
          <td>ATTENDED</td>
        </tr>`;

    var searchInputId = document.getElementById('section-class-input-search').value;
    document.getElementById('section-class-card').innerHTML = '';
    var sectionClassIds = userDto.sectionClassIds;
    for (var i = 0; i < sectionClassIds.length; i++) {
        if (sectionClassIds[i].includes(searchInputId) || searchInputId == null) {
            var sectionClassDto = SectionClassRequest.findOne(sectionClassIds[i]);
            var sectionClassCardTmp = sectionClassCard;
            var courseDto = CourseRequest.findOne(sectionClassDto.courseId);
            var attendedStudents = StudentRequest.findAllBySectionClassId(sectionClassDto.id);

            sectionClassCardTmp = sectionClassCardTmp.replace('ID', sectionClassDto.id);
            sectionClassCardTmp = sectionClassCardTmp.replace('NAME', sectionClassDto.name);
            sectionClassCardTmp = sectionClassCardTmp.replace('CREDITS', courseDto.numberOfCredit);
            sectionClassCardTmp = sectionClassCardTmp.replace('ATTENDED', attendedStudents.length);
            document.getElementById('section-class-card').innerHTML += sectionClassCardTmp;
        }
    }
}

function activeSidebar() {
    setTimeout(function() {
        document.getElementsByClassName('nav-link')[3].className += ' active';
    }, 1000);
}

function main() {
    loadSectionClass();
    activeSidebar();
}
main();