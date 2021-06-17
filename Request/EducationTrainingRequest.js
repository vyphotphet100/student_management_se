class EducationTrainingRequest {
    static findAll() {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/education_training',
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
        }).responseJSON.listResult;
    }

    static findOne(username) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/education_training/' + username,
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

    static save(educationTrainingDto) {
        educationTrainingDto.authorities = null;
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/education_training',
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(educationTrainingDto),
            dataType: 'json',
            success: function(result) {
                return result;
            },
            error: function(error) {
                BaseRequest.authorization(error);
                return error;
            }
        }).responseJSON;
    }

    static update(educationTrainingDto) {
        educationTrainingDto.authorities = null;
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/education_training',
            type: 'PUT',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(educationTrainingDto),
            dataType: 'json',
            success: function(result) {
                return result;
            },
            error: function(error) {
                BaseRequest.authorization(error);
                return error;
            }
        }).responseJSON;
    }

    static delete(username) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/education_training/' + username,
            type: 'DELETE',
            async: false,
            headers: {
                'Authorization': 'Token ' + connecter.getCookie('tokenCode')
            },
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