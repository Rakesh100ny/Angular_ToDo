app.factory('userService',function($http)
{
    var userService={};

        userService.postAPI=function(url,data)
        {
            var request =
                {
                    method: "POST",
                    url: url,
                    data: angular.toJson(data)
                };

           return $http(request);
        };

    userService.postAPIWithHeader = function(url,data)
    {
        var request =
            {
                method: "POST",
                url: url,
                headers: {
                    'tokenLogin':localStorage.getItem("tokenLogin"),
                    'tokenForgotPassword': localStorage.getItem("tokenForgotPassword")
                },
                data: angular.toJson(data)
            };

        return $http(request);
    };

    userService.putAPIWithHeader = function(url,data)
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


     return userService;

});

