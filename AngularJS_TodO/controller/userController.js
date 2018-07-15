app.controller('userController', function($scope, userService,$state) {

    $scope.registerModel = {
        firstName : "Enter First Name ie. Ronny",
        lastName : "Enter Last Name ie. Roy",
        email : "abc@gmail.com",
        password : "",
        mobileNo : "91+ "
    };

    $scope.loginModel = {
        email : "abc@gmail.com",
        password : ""
    };

    $scope.forgotPasswordModel = {
        email : "abc@gmail.com",

    };

    $scope.passwordModel = {
        newPassword : "",
        confirmPassword:""

    };

    $scope.error = new Array;
    $scope.errorMessage;

    $scope.status = new Array;
    $scope.message;

    $scope.serverError;

    $scope.register = function(registerModel) {
        console.log("User Details", angular.toJson(registerModel));
        localStorage.setItem("registerEmail",registerModel.email);

        userService.registerUser(registerModel)
            .then( function successCallback(response){
                    $state.go('signupSuccess')
                    console.log("successfully",response.data.message);
                },
                function errorCallback(response){
                    console.log("failed",response);
                        $scope.error=response.data;
                        $scope.errorMessage=$scope.error.errorMessage;

                        $scope.status=response.data;
                        $scope.message=$scope.status.message;

            });
    };


    $scope.registerEmail=localStorage.getItem("registerEmail");

    $scope.login = function(loginModel) {
        console.log("Login Details", angular.toJson(loginModel));
        userService.loginUser(loginModel).then(function successCallback(response)
        {
            $state.go('home.dashboard');
            localStorage.setItem("tokenLogin",response.data.message);
            console.log("successfully",response.data.message);
        },function errorCallback(response){
            console.log("failed",response.data);
            console.log("status",response.status);


                    $scope.error=response.data;
                    console.log("error",$scope.error);
                    $scope.errorMessage=$scope.error.errorMessage;
                    $scope.status=response.data;
                    $scope.message=$scope.status.message;

        })
    };

    $scope.forgotPassword = function(forgotPasswordModel) {
        console.log("ForgotPassword Details", angular.toJson(forgotPasswordModel));
        localStorage.setItem("forgotPasswordEmail",forgotPasswordModel.email);
        userService.forgotPasswordUser(forgotPasswordModel).then(function successCallback(response){
            localStorage.setItem("tokenForgotPassword",response.data.message);
            console.log("successfully",response.data.message);
            $state.go('forgotpasswordSuccess')
        },function errorCallback(response){
            console.log("failed",response.data);
            $scope.error=response.data;
            $scope.errorMessage=$scope.error.errorMessage;


            $scope.status=response.data;
            $scope.message=$scope.status.message;
        })
    };

    $scope.forgotPasswordEmail=localStorage.getItem("forgotPasswordEmail");

    $scope.resetPassword = function(passwordModel) {
        console.log("ResetPassword Details", angular.toJson(passwordModel));
        userService.resetPasswordUser(passwordModel).then(function successCallback(response){
            $state.go('login')
            console.log("successfully",response.data.message);

        },function errorCallback(response){
            console.log("failed",response.data);
            $scope.error=response.data;
            $scope.errorMessage=$scope.error.errorMessage;

            $scope.status=response.data;
            $scope.message=$scope.status.message;
        })
    };

});