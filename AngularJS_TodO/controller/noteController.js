app.controller('noteController', function($scope,$mdDialog,$timeout,$mdSidenav,noteService,labelService,$state,$window,$location,$filter)
{

    var path=$location.path();
    $scope.pathParam=path.split('/')[3];

    var baseUrl="http://localhost:8081/Fundo_Note/";

    $scope.removable=true;

    $scope.noteModel = {
        title : "",
        description : "",
        color:"white",
        isPined : "false",
        isTrashed:"false",
        isArchived:"false",
        tempdate:'',
        remindertime:''

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
    $scope.label_note_info=[];

    $scope.sendToReminders = function() {
        $state.go('home.reminders');
    };

    $scope.showCancelIcon=false;

    $scope.showCancel=function()
    {
     $state.go('home.search');

        $scope.showCancelIcon=true;

    };

    //createEditableSelect(document.forms[0].myText);

   $scope.sendToHome=function()
   {
       $state.go('home.dashboard');
   };

    $scope.sendToNotes = function() {
        $state.go('home.dashboard');
    };

    $scope.sendToArchive = function() {
        $state.go('home.archive');

    };

    $scope.sendToTrash = function()
    {
        $state.go('home.trash');
    };

    $scope.openMenu=function($mdMenu,event)
    {
     $mdMenu.open(event);
     event.preventDefault();
     event.stopPropagation();
    };

    $scope.closeMenu=function($mdMenu,event)
    {
        $mdMenu.close(event);
    };

    $scope.sendToLogin = function() {
        $window.localStorage.clear();
        $location.path('login');
    };

    $scope.sendToLabel=function(label,event)
    {
        if(event!==undefined)
        {
         event.stopPropagation();
        }

        labelId=label.labelName;
        $state.go('home.label',{labelId:labelId});
    };


    $scope.more=['Delete note','Add label','Make a copy','Show checkboxes','Copy to Google Docs'];

    $scope.takenotemore=['Add label','Show checkboxes'];

    $scope.addTime= [
        {'name':'Morning   8:00 AM','value':'8:00 AM'},
        {'name':'Afternoon 1:00 PM','value':'1:00 PM'},
        {'name':'Evening   6:00 PM','value':'6:00 PM'},
        {'name':'Night     8:00 PM','value':'8:00 PM'},
        {'name':'custom','value':''}

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

   $scope.today=new Date();

    $scope.ReminderDate=function(note)
    {

      var myDate = new Date(note.tempdate);

        if(note.remindertime.split(':')[1].split(' ')[1]==='PM')
        {
            var a=note.remindertime.split(':')[0];
            var b=12;
            var time24=addTime(a,b);
            myDate.setHours(time24);
            myDate.setMinutes(note.remindertime.split(':')[1].split(' ')[0]);

        }
        else {
            myDate.setHours(note.remindertime.split(':')[0]);
            myDate.setMinutes(note.remindertime.split(':')[1].split(' ')[0]);

        }
      note.reminderDate=myDate;

      updateNote(note)

    };


    function addTime(a,b)
    {
        var count=0;
        while (count<a)
        {
            b++;
            count++;

        }
        return b;
    }

    function todayDate(note)
    {
       $scope.today.setHours('20');
       $scope.today.setMinutes('00');
       note.reminderDate=$scope.today;
       updateNote(note);
    };

    function tomorrowDate(note)
    {
        var DAYDATE= 24 * 60 * 60 * 1000;
        var tomorrowDate=new Date($scope.today.getTime()+DAYDATE);
        tomorrowDate.setHours(8);
        tomorrowDate.setMinutes('00');
        note.reminderDate=tomorrowDate;
        updateNote(note);
    };


    function nextWeekDate(note)
    {
     var NEXTWEEKDATE=7* 24 * 60 * 60 * 1000;

     var nextDate=new Date($scope.today.getTime()+NEXTWEEKDATE);
     nextDate.setHours('08');
     nextDate.setMinutes('00');
     note.reminderDate=nextDate;
        updateNote(note);
    };


    $scope.reminderAction=function(note,task)
    {
        switch (task) {
            case 'Later today': todayDate(note);
                break;
            case 'Tomorrow':  tomorrowDate(note);
                break;
            case 'Next Week': nextWeekDate(note);
                break;
           }
    };

    $scope.isVisible = false;

     $scope.clickProfile = function() {
        $scope.isVisible = !$scope.isVisible;
    };

    $scope.isReminderVisible=false;
    $scope.clickReminder = function(note) {
        $scope.isReminderVisible = !$scope.isReminderVisible;
        note.editable=$scope.isReminderVisible;
    };

    $scope.profileInfo=function()
    {
        $scope.value=noteService.getUserFromToken();
        console.log("profile information",$scope.value);
    };

    $scope.isChangedView=false;

    $scope.changeView=function()
    {
        $scope.isChangedView = !$scope.isChangedView;

        var notes = document.getElementsByClassName("card");

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


    };


    function changeColor()
    {
        $scope.colorValue={};
        $scope.current = $state.current;

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
    };

    changeColor();


    $scope.showCollaboatorsDialog = function(event)
    {
        if(event!=undefined)
        {
         event.stopPropagation();
        }
        $mdDialog.show({
            controller: DialogCollaboatorCtrl,
            templateUrl: 'template/collabotorDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
    };

    function DialogCollaboatorCtrl($scope, $mdDialog)
    {

    }


    $scope.showProfileDialog = function(event)
    {
        $mdDialog.show({
            controller: DialogProfileImageCtrl,
            templateUrl: 'template/profileImageDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
    };

    function DialogProfileImageCtrl($scope)
    {
        $scope.myCroppedImage = '';
        $scope.myImage = '';

        $scope.rectangleWidth = 100;
        $scope.rectangleHeight = 100;

        $scope.cropper = {
            cropWidth: $scope.rectangleWidth,
            cropHeight: $scope.rectangleHeight
        };

        var handleFileSelect = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);

        };

        $timeout(function()
        {
         angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
        },1000, false);


       function dataURItoBlob(dataURI)
       {
        var byteString = atob(dataURI.toString().split(',')[1]);

        //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: 'image/png'}); //or mimeString if you want
        return blob;
    }


        $scope.ok = function(img)
        {
          console.log("crop image",img);

          var count=0;
          localStorage.setItem("count",count);

          console.log("counter",localStorage.getItem("count"))


            var form = new FormData();
            var imagefile=dataURItoBlob(img);
            console.log("blob",imagefile);
            var image = new File([imagefile],'profile'+  +'.png');
            console.log("original image",image);

            form.append("file",image);

            var url=baseUrl+"uploadFile";
            noteService.postImage(url,form).then(function successCallback(response) {
                console.log("message",response.data.message);
               // note.imageUrl=response.data.message;

                //updateNote(note);
            }, function errorCallback(response) {
                console.log(" Update failed",response);
            });
        };

        $scope.cancel = function() {
            console.log("hello cancel");
        };
    }

    $scope.imageSelect=function(event,note)
     {
        if(event!=undefined)
        {
            event.stopPropagation();
        }

        document.addEventListener('change',function (event)
        {
            var form = new FormData();
            form.append("file",event.target.files[0]);

            var url=baseUrl+"uploadFile";
            noteService.postImage(url,form).then(function successCallback(response) {
                console.log("message",response.data.message);
                note.imageUrl=response.data.message;

                updateNote(note);
         }, function errorCallback(response) {
                console.log(" Update failed",response);
            });
        });

    };

    $scope.showDialog = function(event,note) {
        $mdDialog.show({
            locals : {
                       noteInfo : note,
                      },
            controller: DialogCtrl,
            templateUrl: 'template/noteDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
    };

    function DialogCtrl($scope, $mdDialog,noteInfo)
    {
        $scope.noteInfo= noteInfo;
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.removeImage=function(note)
        {
            note.imageUrl=null;
            updateNote(note);

        };

        $scope.updateNote=function(note)
        {
          updateNote(note);
        };

        $scope.showImageDialog = function(event,note) {
            $mdDialog.show({
                locals : {
                    noteInfo : note,
                },
                controller: DialogImageCtrl,
                templateUrl: 'template/noteImageDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
        };

        function DialogImageCtrl($scope, $mdDialog,noteInfo)
        {
          $scope.noteInfo=noteInfo;
        }


    }

    getAllLabels();

    $scope.label_info=[];

    function getAllLabels()
    {
        var url=baseUrl+"labels";

        labelService.getAPIWithHeader(url).then(function successCallback(response)
        {
            console.log("Get Label Successfully in Home",response);
            $scope.label_info=response.data;
        },function errorCallback(response){
            console.log("Get Label failed in Home",response.data);
        });
    };

    $scope.showLabelDialog = function(event) {

        $mdDialog.show({
            locals : {labelInfo : $scope.label_info},
            controller: labelDialogCtrl,
            templateUrl: 'template/createLabel.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
    };

    function labelDialogCtrl($scope, $mdDialog,labelInfo)
    {
        $scope.labelInfo=labelInfo;


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
        };

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
            if(labelModel.labelName !== "")
            {
                labelService.postAPIWithHeader(url,labelModel).then(function successCallback(response)
                {
                    console.log("Add Label Successfully in Dialog",response);
                    $scope.labelModel.labelName="";
                    getAllLabelsInDialog();
                    getAllLabels();
                },function errorCallback(response){
                    console.log("Add Label failed in Dialog",response.data);
                })
            }
        };


        function getAllLabelsInDialog()
        {
            var url=baseUrl+"labels";

            labelService.getAPIWithHeader(url).then(function successCallback(response)
            {
                console.log("Get Label Successfully in Dialog",response);
                $scope.labelInfo=response.data;

                $scope.labelDisplay=true;
            },function errorCallback(response){
                console.log("Get Label failed in Dialog",response.data);
            });
        };

        $scope.updateLabel=function(label)
        {
          var url=baseUrl+"updatelabel";
            labelService.putAPIWithHeader(url,label).then(function successCallback(response) {
                getAllLabels();
                console.log("Update Label Successfully in Note Controller",response);
            }, function errorCallback(response) {
                console.log("Update Label Failed In Note Controller",response);

            });
        };

        $scope.deleteDialog = function(event,label) {

            $mdDialog.show({
                locals : {labelData : label},
                controller: daleteDialogCtrl,
                templateUrl: 'template/deleteLabel.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            }).then(function successCallback(response)
            {
                console.log("Successfully in Delete Dialog",response);
                getAllLabelsInDialog();
                getAllLabels();
            },function errorCallback(response){
                console.log("failed in Delete Dialog",response);
            });
        };


        function daleteDialogCtrl($scope, $mdDialog,labelData)
        {

            $scope.labelInfo=labelData;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };


            $scope.deleteLabel=function(labelInfo)
            {
                var url=baseUrl+"deletelabel/";
                labelService.deleteAPIWithHeader(url,labelInfo.id).then(function successCallback(response)
                {
                    $mdDialog.hide(response.data);
                    console.log("Delete Label Successfully",response);

                },function errorCallback(response){
                    console.log("Delete Label failed in Delete Dialog",response);
                })
            }

        }
    }

    $scope.toggleLeft = buildToggler('left');


    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
            var isOpen = $mdSidenav(componentId).isOpen();
            if (isOpen) {

                if ($state.current.url === '/dashboard') {
                    document.getElementById('take-note-card').style.marginTop = '35px';

                    document.getElementById('dashboard').style.marginLeft = '100px';

                }
                else if ($state.current.url === '/trash' || $state.current.url === '/archive') {
                    document.getElementById('archiveTrash').style.marginLeft = '100px';
                }
            }
            else {

                if ($state.current.url === '/dashboard') {
                    document.getElementById('take-note-card').style.marginTop = '30px';
                    document.getElementById('dashboard').style.marginLeft = '0px';

                }
                else if ($state.current.url === '/trash' || $state.current.url === '/archive') {
                    document.getElementById('archiveTrash').style.marginLeft = '0px';
                }
            }

        };
    }




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
            case 'Add label': openDialogLabel(event,note);


                break;
            case 'Make a copy':

                break;
            case 'Show checkboxes':

                break;

            case 'Copy to Google Docs':

                break;
        }
    };

    $scope.removeLabel=function(label,note,event)
    {
      addRemoveLabel(label,note,event);
    };

    $scope.removeReminder=function(note,event)
    {

        if(event!==undefined)
        {
            event.stopPropagation();
        }
        note.reminderDate="";

        updateNote(note);

    };

    function addRemoveLabel (label, note,event)
    {
        $scope.showLabel=true;
        if(event!==undefined)
        {
            event.stopPropagation();
        }

        var idx=note.listOfLabels.findIndex(x => x.labelName===label.labelName);

        if (idx > -1) {
            note.listOfLabels.splice(idx, 1);
        }
        else {
            note.listOfLabels.push(label);
        }

        var url=baseUrl+"relationNoteLabel/";
        noteService.putRelationNoteLabel(url, note.id,label.id).then(function successCallback(response)
        {
            console.log("Add Label On Note Successfully in Note",response);
        },function errorCallback(response){
            console.log("Add Label On Note failed in Note",response);

        });


    };


    function openDialogLabel(event,note)
    {

            $mdDialog.show({
                locals : {labelInfo : $scope.label_info,noteInfo:note},
                controller: DialogNoteLabelCtrl,
                templateUrl: 'template/labelDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });

        function DialogNoteLabelCtrl($scope, $mdDialog,labelInfo,noteInfo) {

            $scope.labelInfo= labelInfo;
            $scope.noteInfo=noteInfo;

            $scope.labelModel=
                {
                    labelName:""
                };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };



            $scope.exists = function (item, note) {
                for(var i=0;i<note.listOfLabels.length;i++){
                    if(note.listOfLabels[i].labelName === item.labelName){
                        return true;
                    }
                }
                return false;

            };


            $scope.addRemove=function(label,note)
            {
             addRemoveLabel(label,note);
            };


            $scope.addLabel=function(label)
            {

                var url=baseUrl+"addlabel";
                if(label.labelName !== "")
                {
                    labelService.postAPIWithHeader(url,label).then(function successCallback(response)
                    {
                        console.log("Add Label Successfully in Note Dialog",response);
                        $scope.labelModel.labelName="";
                        getAllLabels();
                        getAllLabelsInDialogNote();
                    },function errorCallback(response){
                        console.log("Add Label failed in Note Dialog",response.data);
                        $scope.error=response.data.errorMessage;
                    })
                }
            };

            function getAllLabelsInDialogNote()
            {
                var url=baseUrl+"labels";

                labelService.getAPIWithHeader(url).then(function successCallback(response)
                {
                    console.log("Get Label Successfully in Dialog Note",response);
                    $scope.labelInfo=response.data;
                    $scope.labelDisplay=true;
                },function errorCallback(response){
                    console.log("Get Label failed in Dialog Note",response.data);
                });
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
            $scope.showArchivedNote=true;
            note.archived=true;
            note.pined=false;
        }
        else
        {
            $scope.showArchivedNote=false;

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
        item.reminder=true;
    };

    $scope.disableEdit = function (item) {
        item.editable = false;
        item.reminder=false;
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

    function updateNote(note)
    {
        var url=baseUrl+"updatenote";
        noteService.putAPIWithHeader(url,note).then(function successCallback(response) {

            console.log("Update Successfully in Note Controller",response.data);
            $scope.getAllNotes();
        }, function errorCallback(response) {
            console.log("Update Failed In Note Controller",angular.fromJson(angular.toJson(response)));

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

    $scope.note_info=[];
    $scope.getAllNotes = function()
    {
        var url=baseUrl+"note";
        noteService.getAPIWithHeader(url).then(function successCallback(response)
        {
            console.log("Get Note Successfully",response);

            $scope.note_info=response.data;



            for(var i=0;i<$scope.note_info.length;i++)
            {
                if($scope.note_info[i].reminderDate !==null)
                {
                    var myDate=new Date();
                    var backendDate=new Date($scope.note_info[i].reminderDate);


                    var min=backendDate.getMinutes().toString().length;

                    var difference=backendDate.getDate()-myDate.getDate();

                    switch (difference)
                    {
                    case 0 : if(min===1)
                    {
                        if(backendDate.getHours()>12)
                        {
                            $scope.note_info[i].reminderDate="Today,"+backendDate.getHours()+":"+backendDate.getMinutes()+"0 PM";
                        }
                        else
                        {
                            $scope.note_info[i].reminderDate="Today,"+backendDate.getHours()+":"+backendDate.getMinutes()+"0 AM";
                        }

                    }
                    else
                    {
                        if(backendDate.getHours()>12)
                        {
                            $scope.note_info[i].reminderDate="Today,"+backendDate.getHours()+":"+backendDate.getMinutes()+" PM";
                        }
                        else
                        {
                            $scope.note_info[i].reminderDate="Today,"+backendDate.getHours()+":"+backendDate.getMinutes()+" AM";
                        }

                    }


                        break;
                    case 1 :

                        if(min===1)
                        {
                            if(backendDate.getHours()>12)
                            {
                                $scope.note_info[i].reminderDate="Tomorrow,"+backendDate.getHours()+":"+backendDate.getMinutes()+"0 PM";
                            }
                            else
                            {
                                $scope.note_info[i].reminderDate="Tomorrow,"+backendDate.getHours()+":"+backendDate.getMinutes()+"0 AM";
                            }

                        }
                        else
                        {
                            if(backendDate.getHours()>12)
                            {
                                $scope.note_info[i].reminderDate="Tomorrow,"+backendDate.getHours()+":"+backendDate.getMinutes()+" PM";
                            }
                            else
                            {
                                $scope.note_info[i].reminderDate="Tomorrow,"+backendDate.getHours()+":"+backendDate.getMinutes()+" AM";
                            }

                        }

                        break;

                    }
                }
            }


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
                checkLabelNote($scope.note_info);
                checkArchivedNote($scope.note_info);


            }

        },function errorCallback(response){
            console.log("Get Note failed",response);
        })
    };

    function checkOtherNote(notes)
    {
        var keepGoing = true;
        angular.forEach(notes,function(value){
           console.log("check other note value",value);
            if(keepGoing) {
                if (!value.pined && !value.archived && !value.trashed) {
                    console.log("r1");
                    $scope.showOtherNote = true;
                    keepGoing=false;
                }
            }
        })
        console.log("showOtherNote",$scope.showOtherNote);
    };

    $scope.showLabel = true;
    function checkLabelNote(notes)
    {
        var keepGoing = true;


        angular.forEach(notes,function(value)
        {
                if (value.listOfLabels !== null) {
                       for (var i = 0; i < value.listOfLabels.length; i++) {

                           if (keepGoing)
                           {
                            if (value.listOfLabels[i].labelName === $scope.pathParam) {
                                $scope.showLabel = false;
                                keepGoing = false;
                            }
                            else {
                                $scope.showLabel = true;
                            }
                        }
                    }
                }
              });


    };

    function checkPinedNote(notes)
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
    };


    function checkArchivedNote(notes)
    {
        var keepGoing = true;
        angular.forEach(notes,function(value)
        {
            if(keepGoing)
            {
                if(value.archived)
                {
                    $scope.showArchivedNote=true;
                    keepGoing=false;
                }
            }
        })
    };
});


/*function checkLabelNote(notes,labelName)
 {
     console.log("in check label in note",notes);
     console.log("label Name in check label",labelName);

     for(var i=0;i<notes.length;i++)
     {
         console.log("i",i);
         console.log("label length",notes[i].listOfLabels.length);
         for(var j=0;j<notes[i].listOfLabels.length;j++)
         {
             console.log("ranu");
             console.log("label Name",notes[i].listOfLabels[j].labelName);
             if(notes[i].listOfLabels[j].labelName === labelName)
             {
               $scope.showNoteLabel=true;
             }
         }

     }

 }*/

/*
for(var i=0;i<$scope.note_info.length;i++)
{
    if($scope.note_info[i].reminderDate !==null)
    {
        var myDate=new Date();
        var backendDate=new Date($scope.note_info[i].reminderDate);

        console.log("backend se date",backendDate);
        console.log("getHour",backendDate.getHours());
        console.log("getMinutes",backendDate.getMinutes());

        if(backendDate.getHours()>12)
        {
            var hour=backendDate.getHours().toString().length;
            var min=backendDate.getMinutes().toString().length;

            console.log("hour",hour);
            console.log("min",min);

            var convertTime=backendDate.getHours()+":"+backendDate.getMinutes();

            console.log("timmming today",convertTime);
            var time=tConvert(convertTime);

            console.log("time",time);

            new Date($scope.note_info[i].reminderDate).setHours(time.split(':')[0]);
            new Date($scope.note_info[i].reminderDate).setMinutes(time.split(':')[1]);


            var newDate=new Date($scope.note_info[i].reminderDate);


        }

        $scope.exactDate=backendDate;

        var difference=backendDate.getDay()-myDate.getDay();
        console.log("diff",difference);

        /!*switch (difference)
        {
            case 0 : if(hour===1 && min===1)
                     {
                      $scope.note_info[i].reminderDate="Today,"+backendDate.getHours()+":"+backendDate.getMinutes()+"0";
                     }
                     else
                     {
                      $scope.note_info[i].reminderDate="Today,"+backendDate.getHours()+":"+backendDate.getMinutes();
                     }


                break;
            case 1 : $scope.note_info[i].reminderDate="tomorrow";
                break;

        }*!/
    }
}

function tConvert(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};
*/
