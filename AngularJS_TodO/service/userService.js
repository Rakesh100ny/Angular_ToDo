app.factory('userService',function($http)
{
    var registerUser=function(registerModel)
    {
        var request =
            {
                method: "POST",
                url: "http://localhost:8081/Fundo_Note/register",
                data: angular.toJson(registerModel)
            };

        return $http(request);
    };

    var loginUser=function(loginModel)
    {
        var request=
            {
                method:"POST",
                url:"http://localhost:8081/Fundo_Note/login",
                headers: {
                    'tokenLogin':localStorage.getItem("tokenLogin")
                },
                data:angular.toJson(loginModel)
            };
        return $http(request);
    };

    var forgotPasswordUser=function(forgotPasswordModel)
    {
        var request=
            {
                method : "POST",
                url:"http://localhost:8081/Fundo_Note/forgotpassword",
                data:angular.toJson(forgotPasswordModel)
            };

        return $http(request);
    }


    var resetPasswordUser=function(passwordModel)
    {
        var request=
            {
                method : "POST",
                url:"http://localhost:8081/Fundo_Note/resetpassword",
                headers: {
                    'tokenForgotPassword': localStorage.getItem("tokenForgotPassword"),
                },
                data:angular.toJson(passwordModel)
            };

        return $http(request);
    }

    return {
        registerUser: registerUser,
        loginUser:loginUser,
        forgotPasswordUser:forgotPasswordUser,
        resetPasswordUser:resetPasswordUser
    };
});