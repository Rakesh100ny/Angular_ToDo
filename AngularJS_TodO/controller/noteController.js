app.controller('noteController', function($scope,$mdDialog,$mdSidenav,noteService,$state,$window,$location)
{

    var baseUrl="http://localhost:8081/Fundo_Note/";

    $scope.noteModel = {
        title : "",
        description : "",
        color:"white",
        isPined : "false",
        isTrashed:"false",
        isArchived:"false",


    };

    $scope.initializeNote=function()
    {
        $scope.noteModel = {
            title : "",
            description : "",
            color:"white",
            isPined : "false",
            isTrashed:"false",
            isArchived:"false"

        };
    };



    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.more=['Delete note','Add label','Make a copy','Show checkboxes','Copy to Google Docs'];

    $scope.takenotemore=['Add label','Show checkboxes'];

    $scope.addTime=
        [
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
        if(note.trashed===false)
        {
            note.trashed=true;
            note.pined=false;
        }
        else
        {
            note.trashed=false;
            note.pined=false;
        }
        updateNote(note);
    };


    $scope.performAction=function(task,note)
    {
        switch (task) {
            case 'Delete note':
                $scope.isTrashedNote(note);
                break;
            case 'Add label': openDialogLabel();

                break;
            case 'Make a copy':

                break;
            case 'Show checkboxes':

                break;

            case 'Copy to Google Docs':

                break;
        }
    };

    function openDialogLabel()
    {
        console.log("label in note controller",$scope.label_info);

        $scope.showDialogNoteLabel = function(event) {
            $mdDialog.show({
                locals : {labelInfo : $scope.label_info},
                controller: DialogNoteLabelCtrl,
                templateUrl: 'template/labelDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
        };

        function DialogNoteLabelCtrl($scope, $mdDialog,labelInfo) {
            $scope.labelInfo= labelInfo;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };



        }


    }

    $scope.isDeleteNote=function(task,note)
    {
        switch (task) {
            case 'Delete forever':
                  deleteNote(note);
                break;
            case 'Restore': $scope.isTrashedNote(note);
                break;
        };
    };

    $scope.isArchivedNote=function(note)
    {
        if(note.archived===false)
        {
            $scope.showArchiveNote=true;
            note.archived=true;
            note.pined=false;
        }
        else
        {
            $scope.showArchiveNote=false;
            note.archived=false;
            note.pined=false;
        }

        updateNote(note);
    };

    $scope.changeSvg1=true;
    $scope.changeSvg2=false;
    $scope.changeInitialPined=function(value)
    {

        if(value===false)
        {
            value=true;
            $scope.changeSvg1=false;
            $scope.changeSvg2=true;
        }
        else
        {
            value=false;
            $scope.changeSvg1=true;
            $scope.changeSvg2=false;
        }

        $scope.noteModel.isPined=value;

    };

    $scope.enableEdit = function (item) {
        item.editable = true;
    };

    $scope.disableEdit = function (item) {
        item.editable = false;
    };

    $scope.changeNoteColor=function(value,note)
    {
        if(note===undefined)
        {
            $scope.noteModel.color=value;
        }
        else
        {
            note.color=value;

            updateNote(note);
        }

    };

    $scope.isPinnedNote=function(note)
    {
        if(note.pined===false)
        {
            $scope.showPinedNote=true;
            $scope.simaplePin=false;
            $scope.bluePin=true;
            note.pined=true;
            note.archived=false;
        }
        else
        {
            $scope.showPinedNote=false;
            $scope.simaplePin=false;
            $scope.bluePin=true;
            note.pined=false;
        }

       updateNote(note);
    };


    $scope.addNote = function(noteModel)
    {
       noteModel.pined= noteModel.isPined;
       var url=baseUrl+"addnote";

       if(noteModel.title!=="" && noteModel.description!=="")
       {
               noteService.postAPIWithHeader(url,noteModel).then(function successCallback(response)
               {
                   $scope.showLogo=false;
                   $scope.showNote=true;
                   console.log("Add Note Successfully",response.data);
                   $scope.getAllNotes();
                   $scope.initializeNote();
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
            if($scope.note_info==="")
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
    };

    function updateNote(note)
    {
        var url=baseUrl+"updatenote";
        noteService.putAPIWithHeader(url,note).then(function successCallback(response) {
            $scope.getAllNotes();
            console.log("Update Successfully in Note Controller",response);

        }, function errorCallback(response) {
            console.log("Update Failed In Note Controller",response);

        });
    };

    function deleteNote(note)
    {
        var url=baseUrl+"deletenote/";
        noteService.deleteAPIWithHeader(url,note.id)  .then(function successCallback(response)
        {
            console.log("Delete Successfully",response);
            $scope.getAllNotes();

        }, function errorCallback(response) {
            console.log("Delete Failed",response);
        });
    }

    checkOtherNote=function(notes)
    {
        angular.forEach(notes,function(value){
            if(!value.pined && !value.archived && !value.trashed)
            {
                $scope.showOtherNote=true;
                $scope.showPinedNote=false;
            }
        })
    };

    checkPinedNote=function(notes)
    {
        var keepGoing = true;
        angular.forEach(notes,function(value){
            if(keepGoing)
            {
                if(value.pined)
                {
                    $scope.simaplePin=false;
                    $scope.bluePin=true;
                    $scope.showPinedNote=true;
                    keepGoing=false;
                }
            }
        })
    };


});

