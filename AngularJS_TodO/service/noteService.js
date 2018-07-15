app.factory('noteService', function($http)
{
    var addNote= function addNote(note) {
        var req = {
            method: "POST",
            url: "http://localhost:8081/Fundo_Note/addnote",
            headers: {
                'Content-Type': "application/json",
                'userLoginToken': localStorage.getItem('tokenLogin')
            },
            data: angular.toJson(note)
        };
        return $http(req);
    };

    var updateNote= function updateNote(note)
    {
        var request =
            {
                method: "PUT",
                url: "http://localhost:8081/Fundo_Note/updatenote",
                headers:
                    {
                        'userLoginToken': localStorage.getItem('tokenLogin')
                    },
                data: angular.toJson(note)
            };

        console.log(angular.toJson(note));

        return $http(req).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        })
    };


    var deleteNote= function deleteNote(note,noteId) {
        var req = {
            method: "DELETE",
            url: "http://localhost:8081/Fundo_Note/deletenote"+noteId,
            headers: {
                'Content-Type': "application/json",
                'userLoginToken': localStorage.getItem('tokenLogin')
            },
            data: angular.toJson(userData)
        };
        $http(req).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        })
    };

    var getlistAllNotes=  function getlistAllNotes() {
        var req = {
            method: "GET",
            url: "http://localhost:8081/Fundo_Note/note",
            headers: {
                'Content-Type': "application/json",
                'userLoginToken': localStorage.getItem('tokenLogin')
            }
        };
        console.log(req);
        var data = $http(req).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        return data;
    };




    return {
        addNote: addNote,
        updateNote: updateNote,
        deleteNote: deleteNote,
        getlistAllNotes: getlistAllNotes
    };
});