class SectionClassRequest {
    static findAll() {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/section_class',
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
            url: connecter.baseUrlAPI + '/api/section_class/' + id,
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

    static save(sectionClassDto) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/section_class',
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(sectionClassDto),
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

    static update(sectionClassDto) {
        return $.ajax({
            url: connecter.baseUrlAPI + '/api/section_class',
            type: 'PUT',
            async: false,
            headers: { 'Authorization': 'Token ' + connecter.getCookie('tokenCode') },
            contentType: 'application/json',
            data: JSON.stringify(sectionClassDto),
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
            url: connecter.baseUrlAPI + '/api/section_class/' + id,
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