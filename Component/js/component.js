$(document).ready(function() {

    $("#header").before(`
		<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
			<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Student MS</a>
			<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
			</button>
			<div class="dropdown" style="margin-left: 1100px;">
			<button class="dropbtn">
				<span data-feather="user"></span>			
			</button>
			<div class="dropdown-content">
			<a href="#">View profile</a>
			<a href="#">Setting</a>
			<a href="#">Sign out</a>
			</div>
			</div>
			<a class="navbar-brand col col me-0 px-3" href="#">Group 06</a>
		</header>`);

    if (window.location.href.includes('/student/'))
        $("#sidebarMenu").load('../../Component/sidebar-student.html', load);
    else if (window.location.href.includes('/manager/'))
        $("#sidebarMenu").load('../../Component/sidebar-manager.html', load);
    else if (window.location.href.includes('/lecturer/'))
        $("#sidebarMenu").load('../../Component/sidebar-lecturer.html', load);

})

var userDto = null;

function load() {
    (function() {
        'use strict'
        feather.replace();
    })();
}
userDto = BaseRequest.getCurrentUser();