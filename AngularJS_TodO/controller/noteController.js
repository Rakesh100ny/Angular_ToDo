app.controller('noteController', function($scope,$mdDialog,$mdSidenav,noteService,$state,$window,$location)
{

    var baseUrl="http://localhost:8081/Fundo_Note/";

    $scope.noteModel = {
        title : "",
        description : "",
        color:"white",
        isPined : "false",
        isTrashed:"false",
        isArchived:"false"

    };



    initializeNote=function()
    {
        $scope.noteModel = {
            title : "",
            description : "",
            color:"white",
            isPined : "false",
            isTrashed:"false",
            isArchived:"false"

        };
    }
    $scope.myDate = new Date();

    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 2,
        $scope.myDate.getDate()
    );

    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 2,
        $scope.myDate.getDate()
    );

    $scope.isTrashedNote=function(note)
    {
        var url=baseUrl+"updatenote";
        console.log("Before pin: ",note.trashed);
        if(note.trashed===false)
        {
            note.trashed=true;
            note.pined=false;
            console.log("After pin: ",note.trashed);
        }
        else
        {
            note.trashed=false;
            note.pined=false;
        }

        noteService.putAPIWithHeader(url,note).then(function successCallback(response) {
            $scope.getAllNotes();
            console.log("Update Successfully",response);
        }, function errorCallback(response) {
            console.log(" Update failed",response);
        });
    }

    $scope.performAction=function(task,note)
    {
        switch (task) {
            case 'Delete note':
                console.log("r1");
                $scope.isTrashedNote(note);
                break;
            case 'Add label':

                break;
            case 'Make a copy':

                break;
            case 'Show checkboxes':

                break;

            case 'Copy to Google Docs':

                break;
        }
    }

    $scope.isDeleteNote=function(task,note)
    {
       console.log("task",task);
        switch (task) {
            case 'Delete forever':

                 var url=baseUrl+"deletenote/";
                 noteService.deleteAPIWithHeader(url,note.id)  .then(function successCallback(response)
                 {
                     console.log("Delete Successfully",response);
                     $scope.getAllNotes();

                 }, function errorCallback(response) {
                     console.log("Delete Failed",response);
                 })

                break;
            case 'Restore': $scope.isTrashedNote(note);


                break;
        }
    }

    $scope.showArchiveNote;
    $scope.isArchivedNote=function(note)
    {
        var url=baseUrl+"updatenote";
        console.log("Before pin: ",note.archived);
        if(note.archived===false)
        {
            $scope.showArchiveNote=true;
            note.archived=true;
            note.pined=false;
            console.log("After pin: ",note.archived);
        }
        else
        {
            $scope.showArchiveNote=false;
            note.archived=false;
            note.pined=false;
        }

        noteService.putAPIWithHeader(url,note).then(function successCallback(response) {
            $scope.getAllNotes();
            console.log("Update Successfully",response);
        }, function errorCallback(response) {
            console.log(" Update failed",response);
        });
    }

    $scope.changeSvg1=true;
    $scope.changeSvg2=false;
    $scope.changeInitialPined=function(value)
    {

        if(value===false)
        {
            console.log("T");
            value=true;
            $scope.changeSvg1=false;
            $scope.changeSvg2=true;
        }
        else
        {
            console.log("F");
            value=false;
            $scope.changeSvg1=true;
            $scope.changeSvg2=false;
        }

        $scope.noteModel.isPined=value;

    }

    $scope.showPinedNote;

    $scope.simaplePin=true;
    $scope.bluePin=false;
    $scope.isPinnedNote=function(note)
    {
        var url=baseUrl+"updatenote";
        console.log("Before pin: ",note.pined);
        if(note.pined===false)
        {
            $scope.showPinedNote=true;
            $scope.simaplePin=false;
            $scope.bluePin=true;
            note.pined=true;
            note.archived=false;
            console.log("After pin: ",note.pined);
        }
        else
        {
            $scope.showPinedNote=false;
            $scope.simaplePin=false;
            $scope.bluePin=true;
            note.pined=false;
        }

        noteService.putAPIWithHeader(url,note).then(function successCallback(response) {
            $scope.getAllNotes();
            console.log("Update Successfully",response);
        }, function errorCallback(response) {
            console.log(" Update failed",response);
        });
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

    $scope.addNote = function(noteModel)
    {
      console.log("pin1",noteModel.isPined)
       noteModel.pined= noteModel.isPined;
        console.log("pin2",noteModel.isPined)
       var url=baseUrl+"addnote";
       console.log("Note Details", angular.toJson(noteModel));

       if(noteModel.title!="" && noteModel.description!="")
       {
               noteService.postAPIWithHeader(url,noteModel).then(function successCallback(response)
               {
                   $scope.showLogo=false;
                   $scope.showNote=true;

                   console.log("Add Note Successfully",response.data);
                   $scope.getAllNotes();
                   initializeNote();
               },function errorCallback(response){
                   console.log("Add Note failed",response.data);
               })
           }

    };



    $scope.note_info=[];


    $scope.getAllNotes = function()
    {
      var url=baseUrl+"note";


        noteService.getAPIWithHeader(url).then(function successCallback(response)
        {
            console.log("Get Note Successfully",response.data);

            $scope.note_info=response.data;



            if($scope.note_info=="")
            {

              $scope.showNote=false;
                $scope.showLogo=true;
            }
            else
                {

                    $scope.showNote=true;
                    $scope.showLogo=false;


                    checkOtherNote($scope.note_info);


                    checkPinedNote($scope.note_info);

                }

        },function errorCallback(response){
            console.log("Get Note failed",response.data);
        })
    }


    checkOtherNote=function(notes)
    {
        angular.forEach(notes,function(value){



            if(!value.pined && !value.archived && !value.trashed)
            {
                $scope.showOtherNote=true;

            }


        })

    }

    checkPinedNote=function(notes)
    {

        var keepGoing = true;

        angular.forEach(notes,function(value){


            if(keepGoing)
            {
                if(value.pined)
                {


                    $scope.showPinedNote=true;
                    keepGoing=false;

                }

            }


        })
    }


    $scope.enableEdit = function (item) {
        item.editable = true;
    };

    $scope.disableEdit = function (item) {
        item.editable = false;
    };





    $scope.changeNoteColor=function(value,note)
    {
     var url=baseUrl+"updatenote";

     if(note==undefined)
     {
         $scope.noteModel.color=value;
     }
     else
     {
         note.color=value;

         noteService.putAPIWithHeader(url,note).then(function successCallback(response) {
             $scope.getAllNotes();
             console.log("Update Successfully",response);
         }, function errorCallback(response) {
             console.log("Update Failed",response);
         });
     }

    }

    $scope.more=['Delete note','Add label','Make a copy','Show checkboxes','Copy to Google Docs'];

    $scope.takenotemore=['Add label','Show checkboxes'];

    $scope.addTime=[
        [{'name':'Morning','value':'8:00 AM'}],
        [{'name':'Afternoon','value':'1:00 PM'}],
        [{'name':'Evening','value':'Mon,6:00 PM'}],
        [{'name':'Night','value':'8:00 PM'}]
    ];


    $scope.trashmore=['Delete forever','Restore'];

    $scope.reminders=[
        [{'name':'Later today','value':'8:00 PM'}],
        [{'name':'Tomorrow','value':'8:00 AM'}],
        [{'name':'Next Week','value':'Mon,8:00 AM'}],
        [{'name':'Home','value':'Jaitaran'}]
     ];
});

