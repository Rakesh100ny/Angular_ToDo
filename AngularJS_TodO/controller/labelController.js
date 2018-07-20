app.controller('labelcontroller',function($scope,$mdDialog,labelService)
{
    $scope.label=
        {
            name:""
        }

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.close=true;
    $scope.done=true;
    $scope.add=false;
    $scope.isClicked=false;
    $scope.changeIcon=function()
    {
        $scope.isClicked = $scope.isClicked ? false : true;

        if($scope.isClicked)
        {
            $scope.add=true;
            $scope.close=false;
            $scope.done=false;

        }
        else
        {
            $scope.add=false;
            $scope.close=true;
            $scope.done=true;
        }
    }

    $scope.addLabel=function(label)
    {
        var url=baseUrl+"addlabel";
        if(label.name="")
        {

        }
        else
        {
            console.log("label",label.name);
            labelService.postAPIWithHeader(url,label).then(function successCallback(response)
            {
                console.log("Add Label Successfully",response);
                $scope.label.name="";
            },function errorCallback(response){
                console.log("Add Note failed",response.data);
            })
        }
    }
});