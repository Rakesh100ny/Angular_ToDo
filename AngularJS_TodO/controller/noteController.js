app.controller('noteController', function($scope,  $timeout, $mdSidenav,noteService,$state)  {


    $scope.noteModel = {
        title : "",
        description : "",
        color:"white",
        isPined : "false",
        isTrashed:"false",
        isArchived:"false"

    };

    $scope.toggleLeft = buildToggler('left');

    $scope.note_array=[];

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

/*    $scope.isNoteVisible = function() {
         console.log("r1");
        $scope.showNote = $scope.showNote ? false : true;
        console.log("note",$scope.showNote);
    }

    $scope.isLogoVisible = function() {
        console.log("r2");
        $scope.showLogo = $scope.showLogo ? false : true;
    }

    $scope.loadPage = function() {
         if($scope.showNote==true)
         {
             console.log("r3");
           $scope.showLogo=false;
         }
        $state.reload();


    };*/


    $scope.colors = [
        ["white","#f88980","#f9d180","#fbff8d"],
        ["#ccff90","#a7ffeb","#7fd8ff","#81b1ff"],
        ["#b388ff","#f8bbd0","#d7ccc8","#d0d8dc"]
    ];

    $scope.colorName = [
        ["white","red","Orange","Yellow"],
        ["Green","Teal","Blue","Dark Blue"],
        ["Purple","Pink","Brown","Gray"]
    ];


    $scope.loadPage = function() {
        $window.location.reload();
        $scope.noteModel = {
            title : "",
            description : "",
            color:"white",
            isPined : "false",
            isTrashed:"false",
            isArchived:"false"

        };

    };
    $scope.note_info;



    $scope.addNote = function(noteModel) {
        console.log("Note Details", angular.toJson(noteModel));
        noteService.addNote(noteModel).then(function successCallback(response)
        {
            $scope.showLogo=false;
            $scope.showNote=true;
            console.log("Note",$scope.showNote);
            console.log("Logo",$scope.showLogo);
            console.log("successfully",response.data);
           $scope.getAllNotes();
        },function errorCallback(response){
            console.log("failed",response.data);
        })
    };


   var idArray=[];

    $scope.getAllNotes = function()
    {
        noteService.getlistAllNotes().then(function successCallback(response)
        {
            $scope.note_info=response;
            console.log("scope.note_info",$scope.note_info);
            console.log("successfully from database",response);


            if($scope.note_info=="")
            {
              console.log("r1");
              $scope.showNote=false;
                $scope.showLogo=true;
            }
            else
                {
                    console.log("r2");
                    $scope.showNote=true;
                    $scope.showLogo=false;


                    angular.forEach($scope.note_info, function(value, key) {
                         idArray.push(value.id);

                        });

                    console.log("idArray",idArray);

                    //$scope.getNoteId=idArray;

                    return $scope.note_info;
                }



        },function errorCallback(response){
            console.log("failed",response.data);
        })
    }


    $scope.bgColor;

    $scope.id;
    $scope.changeColor=function(value,id)
    {
        console.log("id",id);
         $scope.id=id;
        $scope.bgColor=value;
        console.log($scope.bgColor);
    }
});
