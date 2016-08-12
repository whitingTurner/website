    /**
     * Created by Jeevjyot on 8/2/16.
     */
    $(document).ready(function() {

        load_projects();
        $('#qc_number').attr('required','required');
        $('#subc').attr('required','required');
        $('#iDate').attr('required','required');
        $('#update').click(function (event) {
            event.preventDefault();
            var project=$("#project_qc :selected").text(); // The text content of the selected option
            var id=$("#project_qc").val();
            //alert(project + id);
            var qc_num = document.getElementById('qc_number').value == ''? 'no value' : document.getElementById('qc_number').value;
            var init = document.getElementById('ini').value == ''? 'no value' : document.getElementById('ini').value;;
            var project_b = document.getElementById('project').value == ''? 'no value' : document.getElementById('project').value;;
            var contract = document.getElementById('cn').value == ''? 'no value' : document.getElementById('cn').value;;
            var location = document.getElementById('loc').value == ''? 'no value' : document.getElementById('loc').value;;
            var subcontractor = document.getElementById('subc').value == ''? 'no value' : document.getElementById('subc').value;;
            var sub_tier = document.getElementById('sub-tier').value == ''? 'no value' : document.getElementById('sub-tier').value;;
            var inspection = document.getElementById('iDate').value == ''? 'no value' : document.getElementById('iDate').value;;
            var design_date = document.getElementById('dpack').value == ''? 'no value' : document.getElementById('dpack').value;;
            var _specification = document.getElementById('specification').value == ''? 'no value' : document.getElementById('specification').value; ;
            var _drawing = document.getElementById('drawing').value== ''? 'no value' : document.getElementById('drawing').value;;
            var submittal = document.getElementById('submital').value == ''? 'no value' : document.getElementById('submital').value;

            //text_area

            var _material = document.getElementById('material').value == ''? 'no value' : document.getElementById('material').value;;
            var _notes = document.getElementById('notes').value == ''? 'no value' : document.getElementById('notes').value;;

            //Picture radio box
            var x = $('input[name=optradio]:checked').val(); //picture JS
            alert(x);
            var y =$('input[name=optradio1]:checked').val();// compliance
            alert(y);
            //write the code for the checkboxes here
        var cost_;
            if($("#i1").prop('checked') == true){

                if(cost == null){
                    cost_=0;
                }else{
                    cost_=cost;
                }
            }
            //alert(cost);

            var schedule;
            if($("#i2").prop('checked') == true){
                schedule='yes';
            }else{schedule='no'}
           // alert(schedule);

            var other;
            if($("#i3").prop('checked') == true){
                other='yes';

            }else{
                other='no';
            }
          //  alert(other);

            var rec=document.getElementById('recommend').value == '' ? 'no value' : document.getElementById('recommend').value;; //recommend text boxes;
            var date_performed=document.getElementById('date_p').value == ''? 'no value' : document.getElementById('date_p').value;
            var _follow=document.getElementById('follow').value == ''? 'no value' : document.getElementById('follow').value;
            var _impact=document.getElementById('impact').value == ''? 'no value' : document.getElementById('impact').value;

            //date and signature

            var _sign=document.getElementById('sign').value == ''? 'no value' : document.getElementById('sign').value;;
            var _date_pic=document.getElementById('date_pic').value == ''? 'no value' : document.getElementById('date_pic').value;

            //alert(x);

            var superin=document.getElementById('superint').value == ''? 'no value' : document.getElementById('superint').value;;
            var _lead=document.getElementById('lead').value == ''? 'no value' : document.getElementById('lead').value;
            var vendor=document.getElementById('vender').value == ''? 'no value' : document.getElementById('vender').value;;
          //  var two_tier=document.getElementById('date_pic').value;
            var cnse=document.getElementById('lead_cnse').value == ''? 'no value' : document.getElementById('lead_cnse').value;;
            var cc=document.getElementById('cc').value == ''? 'no value' : document.getElementById('cc').value;;

            //formData to be sent
            var form_data={project_qc:project,project_id:id,qc:qc_num,ini:init,p_b:project_b,con:contract,loc:location,sub:subcontractor,s_t:sub_tier,inspect:inspection,d_d:design_date,_spe:_specification,_dr:_drawing,submit:submittal,mat:_material,notes:_notes,xr:x,yr:y,zr:cost_,re:rec,d_p:date_performed,follow:_follow,im:_impact,sign:_sign,d:_date_pic,super:superin,lead:_lead,ven:vendor,cn:cnse,c:cc,sch:schedule,oth:other};

           $.post('/qc_form',form_data,function(data){

                if(data=='success'){
                    //call the ajax function to uplaod the pictures
                    //insert_path();
                   // alert(data);
                    $.ajax({ 
                        url: '/upload', 
                        type: 'POST', 
                        data: formData, 
                        processData: false, 
                        contentType: false, 
                        success: function(data){ 
                            if(data=='success') 
                        console.log('upload successful!\n'); 
                        alert('Log Added for, Project :' + project +"QC Number:"+ qc_num); 
                        }  
                    });

                }
                else{
                    alert(data);
                }

            });

            //alert('Form Updated');

        });//function ends here


        //***********************************************************************
        //************************************************************************
        $('#log').click(function(){

            var project=$("#project_qc :selected").text(); // The text content of the selected option
            var id_=$("#log").val();
            var log_=$('#log :selected').text(); var pic,com,y,z,c;
            //alert(id_+log_);
            $.post('/get_form_fields',{p:id_,q:log_},function(data){
                console.log('testing')
                $('#qc_number').val(data[0].qc_number);
                $('#ini').val(data[0].name_ini);
                $('#iDate').val(data[0].inspection_date);
                $('#project').val(data[0].building);
                $('#cn').val(data[0].c_n);
                $('#subc').val(data[0].sub);
                $('#dpack').val(data[0].design_package);
                $('#sub-tier').val(data[0].sub_t_contract);
                $('#specification').val(data[0].specification);
                $('#drawing').val(data[0].drawing);
                $('#submital').val(data[0].submittal);
                $('#material').val(data[0].material);
                $('#notes').val(data[0].notes_comment);
                $('#recommend').val(data[0].recommend);
                $('#date_p').val(data[0].perform_date);
                $('#follow').val(data[0].inspection_schdule);
                $('#sign').val(data[0].sign);
                $('#date_pic').val(data[0].date);
                $('#superint').val(data[0].wt_superint);
                $('#lead').val(data[0].wt_contract_lead);
                $('#vender').val(data[0].vendor);
                $('#two_tier').val(data[0].second_tier);
                $('#impact').val(data[0].impacts);
                $('#cc').val(data[0].cc);
                $('#loc').val(data[0].location);
                $('#lead_cnse').val(data[0].cnse_lead);//alert(data[0].Picture);
                console.log(data[0].Picture);
                console.log(data[0].inspection_compliance);
                console.log(data[0].schedule);
                console.log(data[0].cost);
                console.log(data[0].other);
                 pic=data[0].Picture;
                if(pic=='yea'){
                    alert('hi from pic');
                    $('#c1').prop('checked',true);
                }
                else{
                    $('#c2').prop('checked',true);
                }
    //alert(pic);
                com=data[0].inspection_compliance;
                if(com=='yes'){
                    $('#r1').prop('checked',true);
                }else{
                    $('#r2').prop('checked',true);
                }

                 y=data[0].schedule;
                if(y=='yes'){
                    $('#i1').prop('checked', true);
                }else{
                    $('#i1').prop('checked', false);
                }
                 z=data[0].other;
                if(z=='yes'){
                    $('#i2').prop('checked', true);
                }
                else{
                    $('#i2').prop('checked', false);
                }

                 c=data[0].cost;
                if(c != 0){
                    $('#i3').prop('checked', true);
                    var x=document.getElementById('c');
                    x.innerHTML=c;
                }else{$('#i3').prop('checked', false);}

            });
         /*   alert("picture="+pic+com);
            $("input[name=optradio][value=" + pic + "]").attr('checked', 'checked');
            $("input[name=optradio1][value=" + com + "]").attr('checked', 'checked');
            alert(y);
            if(y=='yes'){
                //check the schedule button
                alert('hi');
                $('#i2').checked = true
            };
            alert('z'+z);
            if(z=='yes'){
                //check the other button
                 alert('hi');
                $('#i3').checked =true
            };
            alert('cost'+c);
            if(c!=0){
                //display cost here somewhere in the label or div
                alert('hi');
                var x=document.getElementById(c);
                x.innerHTML=c;
            };*/

        }); //loading of the logs when selected
        //LOADING of the logs based on the project



    $('#project_qc').change(function(event){
       // event.preventDefault();
           // var project ='';
            //var id ='';
             project_name='';
            var project=$("#project_qc :selected").text(); // The text content of the selected option
           var id=$("#project_qc").val(); // The value of the selected option
           // alert(id);
            if(project=='Add new project')
            {
                 project_name=prompt('Enter the Project Name');
                if(project_name === null){
                    return;
                }
                else
                {
                        $.post('/insert_project',{name_p:project_name},function(data){
                        if(data=='success'){

                            $('#project_qc').empty();
                            load_projects();
                            alert('Project Added');





                        }
                    });

                }
        }
        else {
            $('#qc_form').trigger("reset");
            //selector for logs drop down menu
            var select_log=$('#log');
            $('#log').empty();
            $.post('/get_logs',{i:id},function(data){
              //  alert(data);

                $.each(data,function(i){
                    select_log.append($("<option>",{
                        value:data[i].ID,
                        text : data[i].qc_number
                    }));
                });
            });// get the respective logs of the project and populate into the table


        }
           // $('#qc_number option:contains(" + project_name +")').attr('selected','selected');

        set_name();
        });
    var new_pro=$('#project_qc');

        //when log changes, load the pictures
        $('#log').click(function(){

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
                    c=prompt('Please Enter the cost')
                    if(c == null){
                        return;
                    }else{
                        cost=c;
                    }
                   // alert('cost'+cost);
                }
            });

        //exporting the current log into excel sheet
        $('.export').click(function(){
             alert($(this).text())
            var link=$(this).text(); var path='';
            if(link == 'Export Current Log'){
                path=0
            }else{
                path=1;
            }
            var project_name=$('#project_qc :selected').text();
            var log_id=$('#project_qc').val();
            var log_name=$('#log :selected').text();
            var seq=generate_sequence();
            var ex= new ExcelPlus();
            ex.createFile("book_1")
            $.post('/get_current_log',{i:log_id,n:log_name,p:path},function(data){

                var file_name=prompt('Enter the name of the file');
                var j=1;
                if(file_name === null){
                    return;
                }//if ends
                else{

                    for(var k=0;k<data.length; k++){
                  //  alert( data[k].cost);
                        var str= seq[1]+j; var val=data[k].ID;
                        ex.write({"cell": str,"content": val});
                        var str= seq[2]+j; var val=data[k].qc_number;
                        ex.write({"cell": (seq[2]+j),"content": val});
                        var str= seq[3]+j; var val=data[k].name_ini;
                        ex.write({"cell": (seq[3]+j),"content": val});
                        var str= seq[4]+j; var val=data[k].building;
                        ex.write({"cell": (seq[4]+j),"content": val});
                        var str= seq[5]+j; var val=data[k].qc_number;
                        ex.write({"cell": (seq[5]+j),"content": val});
                        var str= seq[6]+j; var val=data[k].location;
                        ex.write({"cell": (seq[6]+j),"content": val});
                        var str= seq[7]+j; var val=data[k].sub_contract;
                        ex.write({"cell": (seq[7]+j),"content": val});
                        var str= seq[8]+j; var val=data[k].sub_t_contract;
                        ex.write({"cell": (seq[8]+j),"content": val});
                        var str= seq[9]+j; var val=data[k].inspection_date;
                        ex.write({"cell": (seq[9]+j),"content": val});
                        var str= seq[10]+j; var val=data[k].design_package;
                        ex.write({"cell": (seq[10]+j),"content": val});
                        var str= seq[11]+j; var val=data[k].drawing;
                        ex.write({"cell": (seq[11]+j),"content": val});
                        var str= seq[12]+j; var val=data[k].submittal;
                        ex.write({"cell": (seq[12]+j),"content": val});
                        var str= seq[13]+j; var val=data[k].material;
                        ex.write({"cell": (seq[13]+j),"content": val});
                        var str= seq[14]+j; var val=data[k].notes_comment;
                        ex.write({"cell": (seq[14]+j),"content": val});
                        var str= seq[15]+j; var val=data[k].Picture;
                        ex.write({"cell": (seq[15]+j),"content": val});
                        var str= seq[16]+j; var val=data[k].inspection_compliance;
                        ex.write({"cell": (seq[16]+j),"content": val});
                        var str= seq[17]+j; var val=data[k].recommend;
                        ex.write({"cell": (seq[17]+j),"content": val});
                        var str= seq[18]+j; var val=data[k].perform_date;
                        ex.write({"cell": (seq[18]+j),"content": val});
                        var str= seq[20]+j; var val=data[k].inspection_schdule;
                        ex.write({"cell": (seq[19]+j),"content": val});
                        var str= seq[21]+j; var val=data[k].impacts
                        ex.write({"cell": (seq[20]+j),"content": val});
                        var str= seq[22]+j; var val=data[k].cost == 0 ? "no value" : data[k].cost;
                        ex.write({"cell": (seq[21]+j),"content": val});
                        var str= seq[23]+j; var val=data[k].schedule == 'null' ? "no value" :data[k].schedule;
                       // ex.write({"cell": (seq[22]+j),"content": val});
                        var str= seq[24]+j; var val=data[k].sign
                        ex.write({"cell": (seq[23]+j),"content": val});
                        var str= seq[25]+j; var val=data[k].date
                        ex.write({"cell": (seq[24]+j),"content": val});
                        var str= seq[26]+j; var val=data[k].wt_superint
                        ex.write({"cell": (seq[25]+j),"content": val});
                        var str= seq[27]+j; var val=data[k].wt_contract_lead
                        ex.write({"cell": (seq[26]+j),"content": val});
                        var str= seq[28]+j; var val=data[k].vendor
                        ex.write({"cell": (seq[27]+j),"content": data[k].vendor});
                        var str= seq[29]+j; var val=data[k].cc
                        ex.write({"cell": (seq[28]+j),"content": val});
                        var str= seq[30]+j; var val=data[k].wt_contract_lead
                        ex.write({"cell": (seq[29]+j),"content": val});
                        var str= seq[31]+j; var val=data[k].last_updated
                        ex.write({"cell": (seq[30]+j),"content": val});
                        var str= seq[32]+j; var val=data[k].other == 'null' ? 'no value' : data[k].other;
                       // alert("i am"+val);
                        //ex.write({"cell": (seq[31]+j),"content": val});
                        //var str= seq[33]+j; var val=data[k].second_tier =='null' ? 'no value' : data[k].second_tier;
                        //ex.write({"cell": (seq[32]+j),"content": val});
                        //console.log((seq[32]+j) + data[k].qc_number);

                        j++;

                    }//outer for ends
                    ex.saveAs(file_name);
                }



            });//will write to the Excel Sheet

        });

        //Exporting All the logs to the Excel Sheet


    });//document ready function gets over here




    //Function outside the document ready function


    window.onerror = function (msg, url, line) {
        console.log("Caught[via window.onerror]: '" + msg + "' from " + url + ":" + line);
        return true; // same as preventDefault
    };



    function generate_sequence (){
        var sequence=[]
        for(var i=1;i<=33;i++){
            var baseChar =("A").charCodeAt(0);
            var alpha="";
            var number =i;

            do{
                number -= 1;
                alpha =String.fromCharCode(baseChar + (number %26)) +alpha;
                sequence[i]=alpha;
                number =(number /26) >> 0;
            }while(number>0);

            //console.log(alpha);
        }
        return sequence;

    };


    function load_projects(){

       // alert('populating the projects from the database');
        $.get('/get_projects',function(data){
            // alert(data[0].ID);
            //alert('populating the projects from the database' + data);
           // $('#project_qc').clear();
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



    };

    function set_name()
    {
        $("#project_qc option").each(function() {
            if($(this).text() == project_name) {
                $(this).attr('selected', 'selected');
            }
           // alert($(this).text());
        });
    }
