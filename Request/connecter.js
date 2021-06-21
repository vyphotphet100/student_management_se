class connecter {

    static baseUrlAPI = "https://8be0b7c8580a.ngrok.io";
    static basePathAfterUrl = "/student_management";

    static authorization() {
        var userDtoTmp = new UserDTOtmp();
        userDtoTmp.listRequest.push(document.URL);
        return $.ajax({
            url: connecter.baseUrlAPI + '/authorization',
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(userDtoTmp),
            dataType: 'json',
            success: function(result) {
                return result;
            },
            error: function(error) {
                connecter.logout();
                window.location.href = connecter.basePathAfterUrl + "/Login/index.html";
            }
        }).responseJSON;

    }

    static logout() {
        connecter.setCookie('username', null, 1);
        connecter.setCookie('tokenCode', null, 1);
        window.location.href = connecter.basePathAfterUrl + '/loginpage';
    }

    static setCookie(cname, cvalue, exMinutes) {
        var d = new Date();
        d.setTime(d.getTime() + (exMinutes * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

}