app.controller('homeController',function($scope,$state,$window,$mdDialog,$mdSidenav,noteService,labelService,$location){

    var baseUrl="http://localhost:8081/Fundo_Note/";

    $scope.sendToReminders = function() {
        $state.go('home.reminders');
    }

    $scope.sendToNotes = function() {
        $state.go('home.dashboard');
    }

    $scope.sendToArchive = function() {
        $state.go('home.archive');

    }

    $scope.sendToTrash = function()
    {
        $state.go('home.trash');
    }

    $scope.sendToLogin = function() {
        $window.localStorage.clear();
        $location.path('login');
    }

    $scope.showCancel=function()
    {
        if($state.is('home.dashboard'))
        {
            $scope.showCancelIcon=false;
        }
        else
        {
            $scope.showCancelIcon=true;
        }
    }

    $scope.changeColor = function()
    {
        $scope.colorValue={};
        $scope.current = $state.current;
        console.log("name",$scope.current.name);
        console.log("url",$scope.current.url);

        switch ($scope.current.name) {
            case 'home.dashboard':  $scope.title = "fundoo Notes";
                $scope.customColor = {
                    'background-color': '#fb0',
                    'color': 'black'
                };
                break;
            case 'home.reminders':  $scope.title = "Reminders";
                $scope.customColor = {
                    'background-color': '#607d8b',
                    'color': '#ffffff'
                };
                break;
            case 'home.archive':    $scope.title = "Archive";
                $scope.customColor = {
                    'background-color': '#607d8b',
                    'color': '#ffffff'
                };
                break;
            case 'home.trash'  :    $scope.title = "Trash";
                $scope.customColor = {
                    'background-color': '#636363',
                    'color': '#ffffff'
                };
                break;

        }

        $scope.colorValue=$scope.customColor;
        console.log("colorValue",angular.toJson($scope.colorValue));
    };


    $scope.changeColor();

    $scope.showDialog = function(event,note) {

        console.log("note Information",note);
        $mdDialog.show({
            locals : {noteInfo : note},
            controller: DialogCtrl,
            templateUrl: 'template/noteDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });

    };
    function DialogCtrl($scope, $mdDialog,noteInfo) {

        console.log("note details",noteInfo);
        $scope.noteInfo= noteInfo;
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.updateNote=function(note)
        {
            var url=baseUrl+"updatenote";

            noteService.putAPIWithHeader(url,note).then(function successCallback(response) {
                $scope.getAllNotes();
                console.log("Update Successfully",response);
            }, function errorCallback(response) {
                console.log(" Update failed",response);
            });
        }


    }
    $scope.label_info=[];

    $scope.showLabelDialog = function(event) {

        $mdDialog.show({
            controller: labelDialogCtrl,
            templateUrl: 'template/createLabel.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function successCallback()
        {
            /*console.log("Label Dialog Successfully",response);
            $scope.label_info=response;

            console.log("All Label Dialog In home controller",$scope.label_info);*/
            $scope.getAllLabels();
        },function errorCallback(response){
            console.log("Label Dialog failed",response);
        });

    };

/*    $scope.getAllLabels = function()
    {
        var url=baseUrl+"labels";

        labelService.getAPIWithHeader(url).then(function successCallback(response)
        {
            console.log("Get Label Successfully in home",response);

            $scope.label_info=response.data;

             $scope.label_info;
        },function errorCallback(response){
            console.log("Get Label failed",response.data);
        });
    };*/

    function labelDialogCtrl($scope, $mdDialog)
    {
        $scope.labelModel=
            {
                labelName:""
            };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.close=true;
        $scope.done=true;
        $scope.add=false;
        $scope.isClicked=false;
        $scope.changeIcon=function()
        {
            $scope.isClicked = !$scope.isClicked;

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




        $scope.enableEdit = function (item) {
            item.editable = true;
            item.labelIcon=false;

        };

        $scope.disableEdit = function (item) {
            item.editable = false;
            item.labelIcon=true;
            };


        $scope.addLabel=function(labelModel)
        {
            var url=baseUrl+"addlabel";
            if(labelModel.labelName === "")
            {
              console.log("Label is Empty...!")
            }
            else
            {
                console.log("Name",labelModel.labelName);
                labelService.postAPIWithHeader(url,labelModel).then(function successCallback(response)
                {
                    console.log("Add Label Successfully",response);
                    $scope.labelModel.labelName="";
                    $scope.getAllLabels();

                },function errorCallback(response){
                    console.log("Add Note failed",response.data);
                })
            }
        }




        $scope.label_info=[];
        $scope.getAllLabels = function()
        {
            var url=baseUrl+"labels";

            labelService.getAPIWithHeader(url).then(function successCallback(response)
            {
                console.log("Get Label Successfully",response);

                $scope.label_info=response.data;

                $scope.showLabelInfo=false;

                if($scope.label_info==="")
                {
                    $scope.showLabelInfo=false;
                }
                else
                {
                    $scope.showLabelInfo=true;
                    $scope.labelDisplay=true;
                }

                return $scope.label_info;
             },function errorCallback(response){
                console.log("Get Label failed",response.data);
            });
        };






/*

        $scope.returnInfo=function()
        {
            var url=baseUrl+"labels";

            labelService.getAPIWithHeader(url).then(function successCallback(response)
            {
                  $mdDialog.hide(response.data);

            },function errorCallback(response){
                console.log("Return Response failed",response.data);
            });

        };
*/




        $scope.deleteDialog = function(event,label) {
            $mdDialog.show({
                locals : {labelInfo : label},
                controller: daleteDialogCtrl,
                templateUrl: 'template/deleteLabel.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });

        };

        function daleteDialogCtrl($scope, $mdDialog,labelInfo) {

            $scope.labelInfo=labelInfo;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };


            $scope.deleteLabel=function(labelInfo)
            {
                var url=baseUrl+"deletelabel/";

                console.log("url",url);
                console.log("label ID",labelInfo.id);

                labelService.deleteAPIWithHeader(url,labelInfo.id).then(function successCallback(response)
                {
                    console.log("Delete Label Successfully",response);
                    $scope.getAllLabels();
                },function errorCallback(response){
                    console.log("Delete Note failed",response.data);
                })
            }

/*
            $scope.label_info=[];

            $scope.getAllLabels = function()
            {
                var url=baseUrl+"labels";


                labelService.getAPIWithHeader(url).then(function successCallback(response)
                {
                    console.log("Get Label Successfully",response);

                    $scope.label_info=response.data;
                    $scope.showLabelInfo=false;

                    if($scope.label_info==="")
                    {
                        $scope.showLabelInfo=false;


                    }
                    else
                    {
                        $scope.showLabelInfo=true;
                        $scope.labelDisplay=true;


                    }

                    console.log("show label",$scope.showLabelInfo);

                },function errorCallback(response){
                    console.log("Get Label failed",response.data);
                });
            };*/



        }
    }

    $scope.toggleLeft = buildToggler('left');


    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
            var isOpen = $mdSidenav(componentId).isOpen();
            if (isOpen) {
                console.log("first time")

                if($state.is('home.dashboard'))
                {
                    document.getElementById('take-note-card').style.marginTop='35px';

                    document.getElementById('dashboard').style.marginLeft = '100px';
                }
                else
                {
                    document.getElementById('archive').style.marginLeft = '100px';
                }
            } else {

                if($state.is('home.dashboard'))
                {
                    document.getElementById('take-note-card').style.marginTop='30px';
                    document.getElementById('dashboard').style.marginLeft = '0px';
                }
                else
                {
                    document.getElementById('archive').style.marginLeft = '0px';
                }
            }
        };
    }

    $scope.isVisible = false;

    $scope.clickProfile = function() {
        $scope.isVisible = $scope.isVisible ? false : true;
    }

    $scope.isChangedView=false;

    $scope.changeView=function()
    {
        $scope.isChangedView = $scope.isChangedView ? false : true;
        console.log("view",$scope.isChangedView);


        var notes = document.getElementsByClassName("card");

        console.log("notes",notes);
        if($scope.isChangedView)
        {
            for (i = 0; i < notes.length; i++) {
                notes[i].style.width = "79%";
                notes[i].style.marginLeft="10%";
            }
        }
        else
        {
            for (i = 0; i < notes.length; i++) {
                notes[i].style.width = "30%";
                notes[i].style.marginLeft="0%";
            }
        }


    }

    $scope.profileInfo=function()
    {
        $scope.value=noteService.getUserFromToken();
        console.log("value",$scope.value.iss)
        console.log("value",$scope.value.sub)
    }


});