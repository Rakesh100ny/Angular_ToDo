app.controller('noteController', function($scope,$timeout,$mdDialog,$mdSidenav,noteService,$state,$window)
{
    $scope.noteModel = {
        title : "",
        description : "",
        color:"white",
        isPined : "false",
        isTrashed:"false",
        isArchived:"false"

    };

    $scope.isNotePined

   $scope.showDialog = function(event,note) {

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
        $scope.noteInfo= noteInfo;
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }


    $scope.toggleLeft = buildToggler('left');


     function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
            var isOpen = $mdSidenav(componentId).isOpen();
            if (isOpen) {
                document.getElementById('take-note-card').style.marginTop='45px';
                document.getElementById('dashboard').style.marginLeft = '280px';


            } else {
                document.getElementById('take-note-card').style.marginTop='30px';
                document.getElementById('dashboard').style.marginLeft = '0px';
            }

        };
    }

     $scope.isVisible = false;



     $scope.clickProfile = function() {
        $scope.isVisible = $scope.isVisible ? false : true;
    }

   $scope.colors=
       [

           [
               {'name': 'White','value': 'white'},
               {'name': 'Red','value': '#ff8a80'},
               {'name': 'Orange','value': '#ffd180'},
               {'name': 'Yellow','value': '#ffff8d'}
               ]
       ,
               [
                   {'name': 'Green','value': '#ccff90'},
                   {'name': 'Teal','value': '#a7ffeb'},
                   {'name': 'Blue','value': '#80d8ff'},
                   {'name': 'Dark Blue','value': '#82b1ff'}
                   ]
       ,
               [
                   {'name': 'Purple','value': '#b388ff'},
                   {'name': 'Pink','value': '#f8bbd0'},
                   {'name': 'Brown','value': '#d7ccc8'},
                   {'name': 'Gray','value': '#cfd8dc'}
               ]
   ];



    $scope.loadPage = function() {
        $window.location.reload();

    };

    $scope.note_info;



    $scope.addNote = function(noteModel)
    {
       console.log("Note Details", angular.toJson(noteModel));

       if(noteModel.title==="" && noteModel.description==="")
       {
        console.log("ranu");
       }
       else
           {
               noteService.addNote(noteModel).then(function successCallback(response)
               {
                   $scope.showLogo=false;
                   $scope.showNote=true;
                   console.log("successfully",response.data);
                   $scope.getAllNotes();
                   noteModel.title="";
                   noteModel.description="";
               },function errorCallback(response){
                   console.log("failed",response.data);
               })
           }

    };



    $scope.getAllNotes = function()
    {
        noteService.getlistAllNotes().then(function successCallback(response)
        {
            $scope.note_info=response;

            console.log("successfully from database",response);


            if($scope.note_info=="")
            {

              $scope.showNote=false;
                $scope.showLogo=true;
            }
            else
                {

                    $scope.showNote=true;
                    $scope.showLogo=false;


                    return $scope.note_info;
                }



        },function errorCallback(response){
            console.log("failed",response.data);
        })
    }

    $scope.enableEdit = function (item) {
        item.editable = true;
    };

    $scope.disableEdit = function (item) {
        item.editable = false;
    };

    $scope.disableCart = function (item)
    {
        item.editable = false;
        console.log("r1");
    };


    $scope.changeInitialColor=function(value)
    {
      console.log("value",value );
      $scope.noteModel.color=value;
    }

    $scope.changeColor=function(value,note)
    {
     console.log("color1",note.color);
     console.log("value",value);
     note.color=value;
     console.log("color2",note.color);
     noteService.updateNote(note).then(function successCallback(response) {
         console.log("successfully",response);
     }, function errorCallback(response) {
         console.log("failed",response);
     });

    }

    $scope.more=['Delete note','Add label','Make a copy','Show checkboxes','Copy to Google Docs'];
    $scope.takenotemore=['Add label','Show checkboxes'];

    $scope.performAction=function(task,id)
    {
      console.log("task",task);

        switch (task) {
            case 'Delete note':
                noteService.deleteNote(id)  .then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                })

                break;
            case 'Add label':

                break;
            case 'Make a copy':

                break;
            case 'Show checkboxes':
                unqiueFunction(cameraItem, value);
                break;

            case 'Copy to Google Docs':

                break;
        }
    }
});
