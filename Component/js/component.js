$(document).ready(function() {

    if (window.location.href.includes('/student/')) {
        if (window.location.href.includes('/timetable_click/')) {
            $("#sidebarMenu").load('../../../Component/sidebar-student.html', load);
            $("#header").load('../../../Component/topbar-student.html', load);
        } else {
            $("#header").load('../../Component/topbar-student.html', load);
            $("#sidebarMenu").load('../../Component/sidebar-student.html', load);
        }

    } else if (window.location.href.includes('/manager/')) {
        $("#sidebarMenu").load('../../Component/sidebar-manager.html', load);
        $("#header").load('../../Component/topbar-manager.html', load);
    } else if (window.location.href.includes('/lecturer/')) {
        $("#sidebarMenu").load('../../Component/sidebar-lecturer.html', load);
    }


})

function load() {
    (function() {
        'use strict'
        feather.replace();
    })();
}
var userDto = BaseRequest.getCurrentUser();