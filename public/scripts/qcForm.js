/**
 * Created by Jeevjyot on 8/2/16.
 */
$(document).ready(function() {

    $('#subc').attr('required','required');
    $('#iDate').attr('required','required');
    $('#update').click(function () {

        var qc_num = document.getElementById('qc_number').value;
        var init = document.getElementById('ini').value;
        var project_b = document.getElementById('project').value;
        var contract = document.getElementById('cn').value;
        var location = document.getElementById('loc').value;
        var subcontractor = document.getElementById('subc').value;
        var sub_tier = document.getElementById('sub-tier').value;
        var inspection = document.getElementById('iDate').value;
        var design_date = document.getElementById('dpack').value;
        var _specification = document.getElementById('specification').value;
        var _drawing = document.getElementById('drawing').value;
        var submittal = $(this).val();

        //text_area

        var _material = document.getElementById('material').value;
        var _notes = document.getElementById('notes').value;

        //Picture radio box
        var x = $('input[name=optradio]:checked').val(); //picture JS
        var y =$('input[name=optradio1]:checked').val();// compliance
        var z=$('input[name=optradio2]:checked').val();//impact
        var rec=document.getElementById('recommend').value; //recommend text boxes;
        var date_performed=document.getElementById('date_p').value
        var _follow=document.getElementById('follow').value
        var _impact=document.getElementById('impact').value

        //date and signature

        var _sign=document.getElementById('sign').value;
        var _date_pic=document.getElementById('date_pic').value

        //alert(x);

        var superin=document.getElementById('superint').value;
        var _lead=document.getElementById('lead').value
        var vendor=document.getElementById('vender').value;
      //  var two_tier=document.getElementById('date_pic').value;
        var cnse=document.getElementById('lead_cnse').value;
        var cc=document.getElementById('cc').value;

        //formData to be sent
        var formData={qc:qc_num,ini:init,p_b:project_b,con:contract,loc:location,sub:subcontractor,s_t:sub_tier,inspect:inspection,d_d:design_date,_spe:_specification,_dr:_drawing,submit:submittal,mat:_material,notes:_notes,xr:x,yr:y,zr:z,re:rec,d_p:date_performed,follow:_follow,im:_impact,sign:_sign,d:_date_pic,super:superin,lead:_lead,ven:vendor,cn:cnse,c:cc};
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
                console.log('upload successful!\n' + data);
                //alert('File Uploaded');
            }

        });
        $.post('/qc_form',formData,function(data){
            if(data=='success'){
                alert('Form Updated');
            }
        })


    });//function ends here

    //***********************************************************************
    //************************************************************************
    //LOADING of the logs based on the project
    $('#project_qc').change(function(){

       // var project ='';
        //var id ='';
        var project=$("#project_qc :selected").text(); // The text content of the selected option
       var id=$("#project_qc").val(); // The value of the selected option
    if(project=='Add new project')
    {
        var project_name=prompt('Enter the Project Name');
        if(project_name === null){
            return;
        }
        else
        {$.post('/insert_project',{name_p:project_name},function(data){
            if(data=='success'){
                alert('Project Added');
            }
        });}
        //alert(project_name);

    }
    else {

        //selector for logs drop down menu
        var select_log=$('#log');
        $.post('/get_logs',{i:id},function(data){
            $('#log').empty();
            $.each(data,function(i,item){
                select_log.append($("<option>",{
                    value:data[i].ID,
                    text : data[i].qc_number
                }));
            });
        });// get the respective logs of the project and populate into the table


    }


    });
    //when log changes, load the pictures
    $('#picture').change(function(){

        var id=$('#log').val(); //id of the QC number
        var qc_number=$('#log :selected').text(); //QC number

        var select_picture=$('#picture');
        $.post('/get_pictures',{i:id,q:qc_number},function(data){
            $('#picture').empty();
            $.each(data,function(i,item){
                select_picture.append($("<option>",{
                    value:data[i].picture_path,
                    text : data[i].file_name
                }));
            });
        });
    });
    //populating the project name in select menu
    $.get('/get_projects',function(data){
       // alert(data[0].ID);
        var pro=$('#project_qc');
        var p='Add new project'; var i=0;
        $.each(data,function(i){
           pro.append($("<option>",{
              value:data[i].ID,
               text:data[i].project_name
           }));
        });

        pro.append($("<option>",{
            value: i,
            text: p
        }));
    });

    //***********************************************************************
    //************************************************************************

    $("input[name='optradio']", $('.pictures')).change(
        function (e) {
            // your stuffs go here
           // alert('hi');
           // alert($(this).val());
            if($(this).val()=='yea'){
                $('#upload-input').click();

            }
        });

    //file uploading function
    $('.upload-btn').on('click', function (){
        $('#upload-input').click();
    });
    $('#upload-input').on('change', function(){
    var str='';
        var files = $(this).get(0).files;

        if (files.length > 0){
            // create a FormData object which will be sent as the data payload in the
            // AJAX request
             formData = new FormData();

            // loop through all the selected files and add them to the formData object
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
                str =str +file.name+", ";
            }
           // alert(str);
            $('#file_name').html(str);


        }
    });

    //for impact textarea
    $("input[name='optradio2']", $('#impact_')).change(
        function (e) {
            // your stuffs go here
            // alert('hi');
            // alert($(this).val());
            if($(this).val()=='cost'){
                cost=prompt('Please Enter the cost')
            }
        });


});//document ready function gets over here