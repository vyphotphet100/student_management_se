class RegisterRequest {
    static findAll() {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/register',
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
            url: connecter.baseUrlAPI + '/api/register/' + id,
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

    static save(registerDto) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/register',
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(registerDto),
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

    static update(registerDto) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/register',
            type: 'PUT',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(registerDto),
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
            url: connecter.baseUrlAPI + '/api/register/' + id,
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

    static findAllByStudentId(studentId) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/register/student_id/' + studentId,
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

    static findOneByStudentIdAndSectionClassId(studentId, sectionClassId) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/register/student_id/' + studentId + "/section_class_id/" + sectionClassId,
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

    static exportBySectionClassId(sectionClassId) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/file/register/section_class_id/' + sectionClassId + '?option=print',
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