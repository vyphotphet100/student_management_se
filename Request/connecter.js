class connecter {

    static baseUrlAPI = "http://localhost:8081";
    static basePathAfterUrl = "/student_management_se";

    static logout() {
        connecter.setCookie('username', null, 1);
        connecter.setCookie('tokenCode', null, 1);
        window.location.href = connecter.basePathAfterUrl + '/LoginPage';
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