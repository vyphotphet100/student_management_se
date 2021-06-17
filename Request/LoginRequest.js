class LoginRequest {
    static login(Username, Password) {
        var userDto = {
            username: Username,
            password: Password
        };
        return $.ajax({
            url: connecter.baseUrlAPI + '/login',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(userDto),
            dataType: 'json',
            success: function(result) {
                connecter.setCookie("tokenCode", result.tokenCode, 24 * 60);
                //alert(result.message);
                return result;
            },
            error: function(error) {
                connecter.setCookie("tokenCode", null, 1);
                //alert(error.message);
                BaseRequest.authorization(error);
                return error;
            }
        }).responseJSON;
    }
}