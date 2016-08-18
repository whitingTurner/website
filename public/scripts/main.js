var urn_x='';
var file_name_x='';
var flag=0;
/*function insert_db1(){
 alert(urn_x);
 alert(file_name_x);
 //event.preventDefault();
 urn_x='hello';file_name_x='jj';
 // data.username = $('#usernameinput').val();
 // data.password = $('#passwordinput').val();
 // JSON.stringify(data);
 // console.log(data);

 $.ajax({
 type: 'POST',
 url: '/endpoint',
 data: {u: urn_x, p: file_name_x},
 dataType: 'application/json',
 success: function(data) {
 console.log('success');
 console.log(data);
 }
 });
 };
 */
$('#c_p').click(function(event){
    event.preventDefault();
    var old_pass=document.getElementById('o_wt').value;
    var new_pass=document.getElementById('n_wt').value;
    post={o:old_pass,n:new_pass};

    $.post('/change_pass',post,function(data){
        if(data=='success'){
            alert('Password Changed');
            location.reload();
        }else{
            alert('Please try after sometime');
        }
    })
});



$('#register').click(function(e){
    e.preventDefault();
        if($('#val_val').valid()){
            alert('Form Valid');
            var pass=document.getElementById('password').value;
            var emailid=document.getElementById('email').value;
            var user=document.getElementById('username').value;
            post={p:pass,e:emailid,u:user};
            $.post('/sign_up',post,function(data){
                if(data=='success'){
                    alert('Registration Succesfull. PLease contact Tyler Davis at tyer.davis@whiting-turner.com to approve you login credentials');
                    location.reload();
                }
                else{
                    alert(data);
                }


            });


        }else{
            return;
        }



});

$('#out_out').click(function(event){
    event.preventDefault();
    var txt;

    var r =  confirm("Are you Sure, you want to Log out?");
    if(r == true){
        $.get( "/logout1", function( data ){
            if(data=='log_out')
            {
                //alert('hi this is main.js')
                window.location="/";
            }

        });
    }

});

//logout button on index page
$('#out_index').click(function(event){
    console.log('out indeex is being called randomly');
    var r =  confirm("Are you Sure, you want to Log out?");
    if(r == true){
        $.get("/logout1",function(data){
            if(data=='log_out')
            {
                //alert('hi this is main.js')
                window.location="/"
            }

        });
    }


});
//for handling the carousel function in the bootstrap
$("#carousel").carousel();


$('#w_login').click(function(event){
    event.preventDefault();
    if($('#login_form').valid()){

        //alert('You wanna login?')
        var user_name_wt=document.getElementById("u_wt").value;
        var password_wt=document.getElementById("p_wt").value;
        //console.log(user_name_wt);
        // console.log(password_wt);
        //alert(user_name_wt);
        $.post("/login",{user_w: user_name_wt, pass_w: password_wt}, function (data) {
            //  alert(data);
            //  alert(data.result + "" + "" +data.ad);
            var d= data.result;
            // alert(d);
            if(data.ad==1){
                $("#admin").show();
            }
            console.log(d);
            if(d=="success") {
                // alert(data);
                window.location="/admin.html"
            }
            else if(data== d){
                //alert(data);
                alert('You are already logged in other device or PC');
                window.location='/';
            }
            else if(d=='bad data'){
                // alert(data);
                //  alert(data);
                alert('Invalids details, Either Email or Password is incorrect');
                window.location="/";
            }
            else{
                // alert(data);
                alert('Please try again in sometime');
                window.location="/";
            }
        });

    }else{
        return;
    }

})
function insert_db(){

    console.log("flag="+ flag)
    if(flag==1) {
        alert('New Model Added')
        var user, pass;
        user = urn_x;
        pass = file_name_x;
        $.post("/endpoint", {user1: user, password: pass}, function (data) {
            if (data === 'yes') {
                alert("Model Uploaded");
            }
        });


    }
    flag=0;
}


jQuery(document).ready(function($) {



    var viewDataClient = new Autodesk.ADN.Toolkit.ViewData.AdnViewDataClient(
        'https://developer.api.autodesk.com',
        'https://whiting-turner-auth.herokuapp.com/auth');

    ////////////////////
    //private const

    var files= [];

    var bucket = Config.BucketName;

    //////////////////

    $('#inputModellist').change(function(event) {
        /* Show the screen-shot */
        var urn = $('#inputModellist').val();

        if(urn === '')
        {
            //hide the screen shot
            $('#screenshot').hide();
            //clear the urn text box
            $('#inputSelectedUrn').val('');

            return;
        }

        $('#inputSelectedUrn').val(urn);

        console.log('selected urn:' + urn);


        // generating the screen-shot
        getThumbnail(urn, setScreenshot);


    });

    var getThumbnail = function(urn, callback)
    {

        viewDataClient.getThumbnailAsync (
            viewDataClient.fromBase64(urn),
            callback, //callback
            onError,
            150,//width,
            150,//height,
            null//guid
        );
    }

    var setScreenshot = function(base64){

        $('#screenshot').show();
        $('#screenshot').attr('src','data:image/png;base64,' + base64);
    };

    var onError = function(err){
        console.error(err);
    };



    $('#btnGetEmbededingcode').click(function(event) {

        //replace with the selected urn

        var urn = $('#inputModellist').val();

        if (urn) {
            var code = $('#codecontent').text();
            code = code.replace('dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLTE3LjA3LjIwMTQtMTAuNTYuMTYvRW5naW5lLmR3Zg==',urn);
            $('#codecontent').text(code);
        };

        selectText('codecontent');


    });


    var selectText = function(elementId) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(elementId));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(elementId));
            window.getSelection().addRange(range);
        }
    }

    var addToCombo = function(urn, filename){
        var newOption = new  Option(filename, urn);
        $('#inputModellist').append(newOption);

        //select the item by default
        $('#inputModellist').val(urn);

        $('#inputSelectedUrn').val(urn);

        // generating the screen-shot
        getThumbnail(urn, setScreenshot);


    }

    var createAutoClosingAlert = function(message) {
        $('#alert_placeholder').html('<div id="alertDiv" class="alert alert-success"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + message + '</div>');
        var alert = $('#alertDiv');
        window.setTimeout(function () { alert.alert('close'); }, 500000);
    }

    $('#btnFullscreen').click(function()
    {
        var urn = $('#inputSelectedUrn').val();
        var viewerUrl = 'TestViewerApiLive.html?urn='+urn;

        window.open(viewerUrl);
    })



    ///////////////////////////////////////////////////////////////////////////
    // 
    //
    ///////////////////////////////////////////////////////////////////////////
    function createBucket(bucket) {
        var bucketCreationData = {
            bucketKey: bucket,
            servicesAllowed: {},
            policy: 'temporary'
        }
        viewDataClient.createBucketAsync(
            bucketCreationData,
            //onSuccess
            function (response) {
                console.log('Bucket creation successful:');
                console.log(response);
                uploadFiles(response.key, files);
            },
            //onError
            function (error) {
                console.log('Bucket creation failed:');
                console.log(error);
                console.log('Exiting ...');
                return;
            });
    }
    ///////////////////////////////////////////////////////////////////////////
    // 
    //
    ///////////////////////////////////////////////////////////////////////////
    function uploadFiles(bucket, files) {
        for (var i = 0; i < files.length; ++i) {
            var file = files[i];
            console.log('Uploading file: ' + file.name + ' ...');
            createAutoClosingAlert('Uploading file: ' + file.name + ' ...');
            viewDataClient.uploadFileAsync(
                file,
                bucket,
                file.name,
                //onSuccess
                function (response) {
                    console.log('File is uploaded successfully:');
                    console.log(response);
                    var fileId = response.objects[0].id;
                    var registerResponse =
                        viewDataClient.register(fileId);
                    if (registerResponse.Result === "Success" ||
                        registerResponse.Result === "Created") {
                        console.log("Registration result: " +
                            registerResponse.Result);
                        createAutoClosingAlert("You model is uploaded successfully. Translation starting...");
                        console.log('Starting translation: ' +
                            fileId);
                        checkTranslationStatus(
                            fileId,
                            1000 * 60 * 10, //5 mins timeout
                            //onSuccess
                            function (viewable) {
                                console.log("Translation is successful: " +
                                    response.file.name);
                                createAutoClosingAlert("Translation is successful: " +
                                    response.file.name + ".");

                                console.log("Viewable: ");
                                console.log(viewable);
                                //var fileId = viewDataClient.fromBase64(
                                //    viewable.urn);
                                addToCombo(viewable.urn, response.file.name);
                                // alert(viewable.urn);
                                // alert(response.file.name);
                                urn_x=viewable.urn;
                                file_name_x=response.file.name;
                                localStorage.setItem('urn',urn_x);
                                localStorage.setItem('label',file_name_x);
                                flag=1;
                                //insert_db(viewable.urn,response.file.name);
                            });
                    }
                },
                //onError
                function (error) {
                    console.log('File uploading is failed:');
                    console.log(error);
                });
        }
        files = [];
    }
    ///////////////////////////////////////////////////////////////////////////
    // 
    //
    ///////////////////////////////////////////////////////////////////////////
    function checkTranslationStatus(fileId, timeout, onSuccess) {
        var startTime = new Date().getTime();
        var timer = setInterval(function () {
            var dt = (new Date().getTime() - startTime) / timeout;
            if (dt >= 1.0) {
                clearInterval(timer);
            }
            else {
                viewDataClient.getViewableAsync(
                    fileId,
                    function (response) {
                        var msg = 'Translation Progess ' +
                            fileId + ': '
                            + response.progress;
                        console.log(msg);
                        createAutoClosingAlert(msg);

                        if (response.progress === 'complete') {
                            clearInterval(timer);
                            onSuccess(response);
                        }
                    },
                    function (error) {
                    });
            }
        }, 2000);
    };





    ///////////jQuery(document).ready() running from here//////////////////////


    // Tell FileDrop we can deal with iframe uploads using this URL:
    var options = {
        //iframe: {url: 'upload.php'}
    };
    // Attach FileDrop to an area ('zone' is an ID but you can also give a DOM node):
    var zone = new FileDrop('zone', options);

    // Do something when a user chooses or drops a file:
    zone.event('send', function (selectedFiles) {
        // // Depending on browser support files (FileList) might contain multiple items.
        selectedFiles.each(function (file) {
            // // React on successful AJAX upload:
            // file.event('done', function (xhr) {
            //   // 'this' here points to fd.File instance that has triggered the event.
            //   alert('Done uploading ' + this.name + ', response:\n\n' + xhr.responseText);
            // });

            //add the native file to the array
            files.push(file.nativeFile);
            //console.log(file.name);

            viewDataClient.getBucketDetailsAsync(
                bucket,
                //onSuccess
                function (bucketResponse) {
                    console.log('Bucket details successful:');
                    console.log(bucketResponse);
                    uploadFiles(bucket, files);
                },
                //onError
                function (error) {
                    console.log("Bucket doesn't exist");
                    console.log("Attempting to create...");
                    createBucket(bucket);
                });

        });

        // // Send the file:
        // file.sendTo('upload.php');
    });



    // React on successful iframe fallback upload (this is separate mechanism
    // from proper AJAX upload hence another handler):
    zone.event('iframeDone', function (xhr) {
        alert('Done uploading via <iframe>, response:\n\n' + xhr.responseText);
    });

    // A bit of sugar - toggling multiple selection:
    fd.addEvent(fd.byID('multiple'), 'change', function (e) {
        zone.multiple(e.currentTarget || e.srcElement.checked);
    });


});