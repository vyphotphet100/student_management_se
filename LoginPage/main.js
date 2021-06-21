$('.btn-sign-in').click(function() {
    if (document.getElementById('inputUsername').value.trim() == '' ||
        document.getElementById('inputPassword').value.trim() == '') {
        alert('Username or Password cannot be null.');
        return;
    }

    document.getElementById('loading-gif').style.cssText = 'display:inline-block;';

    var data = {
        username: document.getElementById('inputUsername').value.trim(),
        password: document.getElementById('inputPassword').value.trim(),
    };

    setTimeout(function() {
        var userDto = LoginRequest.login(data['username'], data['password']);

        if (userDto.httpStatus != 'OK') {
            alert(userDto.message);
            document.getElementsByClassName('loading-gif')[0].style.cssText = 'display:none;';
        }
        if (userDto.httpStatus == 'OK') {
            if (userDto.roleCode == 'ADMIN')
                window.location.href = connecter.basePathAfterUrl + '/Manager/home_click/index.html';
            else if (userDto.roleCode == 'STUDENT')
                window.location.href = connecter.basePathAfterUrl + '/Student/home_click/home.html';
            else if (userDto.roleCode == 'LECTURER')
                window.location.href = connecter.basePathAfterUrl + '/Lecturer/home_click/home.html';
        }
    }, 10);

});