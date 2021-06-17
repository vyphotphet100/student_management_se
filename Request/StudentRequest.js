class StudentRequest {
    static findAll() {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/student',
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

    static findOne(id) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/student/' + id,
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

    static save(studentDto) {
        studentDto.authorities = null;
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/student',
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(studentDto),
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

    static update(studentDto) {
        studentDto.authorities = null;
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/student',
            type: 'PUT',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(studentDto),
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

    static delete(id) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/student/' + id,
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

    static getRegisteredSectionClass() {
        var studentId = userDto.id;
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/student/' + studentId + '/registered_section_class',
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
}