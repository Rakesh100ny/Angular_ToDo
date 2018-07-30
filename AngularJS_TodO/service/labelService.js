app.factory('labelService', function($http)
{
    var factory= {};

    factory.postAPIWithHeader = function(url,data)
    {
        var request =
            {
                method: "POST",
                url: url,
                headers: {
                    'userLoginToken': localStorage.getItem('tokenLogin'),
                },
                data: angular.toJson(data)
            };

        return $http(request);
    };


    factory.deleteAPIWithHeader = function(url,labelId)
    {

        console.log("label ki id",labelId);
        var request =
            {
                method: "DELETE",
                url: url+labelId,
                headers: {
                    'userLoginToken': localStorage.getItem('tokenLogin')
                },
                data: angular.toJson(labelId)
            };

        return $http(request);
    };


    factory.putAPIWithHeader = function(url,data)
    {
        var request =
            {
                method: "PUT",
                url: url,
                headers: {
                    'userLoginToken': localStorage.getItem('tokenLogin')
                },
                data: angular.toJson(data)
            };
        return $http(request);
    };

    factory.getAPIWithHeader = function(url)
    {
        var request =
            {
                method: "GET",
                url: url,
                headers: {
                    'userLoginToken': localStorage.getItem('tokenLogin')
                }
            };

        return $http(request);
    };

    factory.getAllLabelNotes = function(url,labelId)
    {
        var request =
            {
                method: "GET",
                url: url+labelId,
                headers: {
                    'userLoginToken': localStorage.getItem('tokenLogin')
                },
                data: angular.toJson(labelId)
            };

        return $http(request);
    };

    return factory;







});

