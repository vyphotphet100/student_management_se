class BaseRequest {
    static authorization(result) {
        if (result.responseJSON.exception != null &&
            result.responseJSON.exception.includes('AccessDeniedException')) {
            alert(result.responseJSON.message);
            window.location.href = connecter.basePathAfterUrl + "/LoginPage/index.html";
        }
    }

    static getCurrentUser() {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/current_user',
            type: 'GET',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            success: function(result) {
                return result;
            },
            error: function(error) {
                BaseRequest.authorization(error);
                return error;
            }
        }).responseJSON;
    }
}