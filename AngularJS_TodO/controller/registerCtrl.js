app.controller('registerCtrl', function($scope,$rootScope,$localStorage)
{
    $scope.firstName="";
    $scope.lastName="";
    $scope.email = '';
    $scope.password = '';
    $scope.phone="";
    $scope.register=function(email,password)
    {
        console.log("Rakesh");
        $localStorage.email=email;
        $localStorage.password=password;
        // $rootScope.email=email;
        // $rootScope.password=password;
        $scope.result="Successfully Registered...!"
    }

});
