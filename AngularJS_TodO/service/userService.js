app.factory('userService',function($http)
{
    var postService={};

        postService.postAPI=function(url,data)
        {
            var request =
                {
                    method: "POST",
                    url: url,
                    data: angular.toJson(data)
                }

           return $http(request);
        }

    postService.postAPIWithHeader = function(url,data)
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
            }

        return $http(request);
    };

     return postService;

});

