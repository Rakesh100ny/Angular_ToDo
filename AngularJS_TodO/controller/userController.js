app.controller('userController', function($scope, userService,$state) {

    var baseUrl="http://localhost:8081/Fundo_Note/";

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

    $scope.error = [];
    $scope.errorMessage;

    $scope.status = [];
    $scope.message;

    $scope.serverError;

    $scope.register = function(registerModel) {
        localStorage.setItem("registerEmail",registerModel.email);
        var url= baseUrl+"register";
        console.log("url",url);
        userService.postAPI(url,registerModel).then( function successCallback(response){
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
        var url= baseUrl+"login";
        userService.postAPIWithHeader(url,loginModel).then(function successCallback(response)
        {
            $state.go('home.dashboard');
            localStorage.setItem("tokenLogin",response.data.message);
            console.log("successfully",response.data.message);
        },function errorCallback(response){
            console.log("failed",response.data);
                    $scope.error=response.data;
                    $scope.errorMessage=$scope.error.errorMessage;

                    $scope.status=response.data;
                    $scope.message=$scope.status.message;

        })
    };

    $scope.forgotPassword = function(forgotPasswordModel) {
        localStorage.setItem("forgotPasswordEmail",forgotPasswordModel.email);
        var url= baseUrl+"forgotpassword";
        userService.postAPI(url,forgotPasswordModel).then(function successCallback(response){
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
        var url= baseUrl+"resetpassword";
        userService.postAPIWithHeader(url,passwordModel).then(function successCallback(response){
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