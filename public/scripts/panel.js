/**
 * Created by Jeevjyot on 7/13/16.
 */


function make_editable(){
    alert('you clicked me');
    console.log('hi');
}

//Adding User to the Database

//Ready function
$(document).ready(function(){

     fetch_user(); //fetches the row from the user_login


   /* $(".editbtn").click(function(){
        alert('you clicked me');
        make_editable();
    }); */
    $.get('/approve_list',function(data){
        var results=document.getElementById('response2');

        for(var i=0;i<data.length;i++){
            results.innerHTML +="<tr><td contenteditable='false'>"+data[i].username+"</td><td>"+data[i].email+"</td><td contenteditable='false'>"+data[i].password+"</td><td><button class='approve btn btn-warning'>Approve</td></tr>"

        }


    });
    //approve butting function
    $(document).on('click', '#response2 .approve',function(){

        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
        var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
        var data=col1+"\n"+col2+"\n"+col3+"\n";
        //alert(data);

        $.post('/transfer',{c1:col1,c2:col2,c3:col3},function(data){
            if(data=='success2'){
                alert('User updated');
                //$("#response1").find("tr:not(:first)").remove();
            }
            else{
                alert('Please try after sometime');
            }
        });
        $(this).closest('tr').remove();
        $("#response1").find("tr:not(:first)").remove();
        $("#response").find("tr:not(:first)").remove();
        fetch_user();

    });
    $(document).on('click', '#response1 .editbtn', function(){
        var currentTD = $(this).parents('tr').find('td');
        if ($(this).html() == 'Edit') {
            $.each(currentTD, function () {
                $(this).prop('contenteditable', true)
            });
            var currentRow1=$(this).closest("tr");
            default_email=currentRow1.find("td:eq(1)").text();
        } else {
            $.each(currentTD, function () {
                $(this).prop('contenteditable', false)
            });
        }


       if($(this).html() == 'Save') {
            var currentRow=$(this).closest("tr");
           var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
           var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
           var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
           var col4=currentRow.find("td:eq(3)").text();
           var data=col1+"\n"+col2+"\n"+col3+"\n"+col4;
           alert(data);
          // $(this).html($(this).html() == 'Edit' ? 'Save' : 'Edit')
           $.post('/update_table',{c1:col1,c2:col2,c3:col3,c4:col4,oe:default_email},function(data){
               if(data=='success'){
                   alert('User updated');
               }
               else{
                   alert('Please try after sometime');
               }
           });
        }
        $(this).html($(this).html() == 'Edit' ? 'Save' : 'Edit')
    });

    $(document).on('click','#response .editbtn1',function(){
        alert('Deleting the recording');
        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
        var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
        var col4=currentRow.find("td:eq(3)").text();
        var data=col1+"\n"+col2+"\n"+col3+"\n"+col4;
        //alert(data);
        $.post('/del_user',{u:col1},function(data){
            if(data=='success'){
                alert('Entry Deleted');
            }
        });
        $(this).closest('tr').remove();
        $("#response1").find("tr:not(:first)").remove();
        $("#response").find("tr:not(:first)").remove();
        fetch_user();
    })

    


    $.get('/getModels',function(data){
        var res= $('#models');
        $.each(data,function(i){
            console.log(data[i].label)
            res.append($("<option>",{
                value: data[i].urn,
                text : data[i].label
            }));
        });
    }); //end of the get function

    //adding user to the database
    $('#register').click(function(event){
        event.preventDefault();
        var admin;
        var user= document.getElementById('username').value;
        var pass= document.getElementById('password').value;
        var id= document.getElementById('email').value;
        var x=$('input[name=optradio]:checked').val();
       // alert(x);
        if(x=='admin'){
            admin=1;
        }else{
            admin=0;
        }

        $.post('/insert',{u:user,p:pass,i:id,a:admin},function(data){
          //  alert("Data "+data);
            if(data=='s'){
                alert('Data Added');
            }
            else{
                alert('Error, Please try again in sometime');
            }
        });
        $("#response1").find("tr:not(:first)").remove();
        $("#response").find("tr:not(:first)").remove();
        fetch_user();

    });//register function end

    //logout function, logs out the user
    $('#logout').click(function(event){
     event.preventDefault();
    // alert('hi');
     var r =confirm('Are you sure, you want to log out');
     if(r==true){
     $.get('/logout1',function(data){
        // alert(data);
     if(data=='log_out')
     {
     window.location="/"
     }
     });
     }
     });

    $('#del_model').click(function(){
        var per_table1=[{
            email: '',label: '',urn: ''
        }];

        var e = document.getElementById("user_select");
        var strUser = e.options[e.selectedIndex].text
       // alert(strUser);
        var values = $('#models').val();
       // alert(values[0]);
        console.log(values);
        foo=[];
        $('#models :selected').each(function(i, selected){
            foo[i] = $(selected).text();
            per_table1.push({email:strUser, label: foo[i], urn: values[i]});

        });for(var i=1;i<=per_table1.length;i++){
            var  email_=per_table1[i].email;
            var label_=per_table1[i].label;
            var urn_=per_table1[i].urn
            $.post('/del_models',{e:email_,l:label_,u:urn_},function(data){
              // alert(data);
                if(data=='success'){
                    console.log('success');
                    alert('Model Deleted');
                }
            })

        }

        console.log(per_table1);
        alert(foo[0]);
        console.log(foo);
    });
    //onclick of the add button
    $('#add_model').click(function(){


        var per_table=[
            {
                email: '',label: '',urn: ''
            }
        ]
        var e = document.getElementById("user_select");
        var strUser = e.options[e.selectedIndex].text
        //alert(strUser);
        var values = $('#models').val();
        //alert(values[0]);
        console.log(values);
        var foo=[];
        $('#models :selected').each(function(i, selected){
            foo[i] = $(selected).text();
            per_table.push({email:strUser, label: foo[i], urn: values[i]});
           
        });
        for(var i=1;i<=per_table.length;i++){
          var  email_=per_table[i].email;
           var label_=per_table[i].label;
            var urn_=per_table[i].urn
            $.post('/per_table',{e:email_,l:label_,u:urn_},function(data){
                if(data=='success'){
                    console.log('success');
                    alert('Model Added');
                }
            })
            
        }
      
        console.log(per_table);
       alert(foo[0]);
        console.log(foo);
    });

    $('#user_select').change(function(){
        //alert('you changed me');
      //  $('#models_assigned').empty();
        var email_id=$('#user_select option:selected').text();
        //alert(email);
        //alert(email_id);
        var post={email:email_id};
        console.log(post);
        var select_models=$('#models_assigned');
        $.post('/get_models',{e:email_id},function(data){
            $('#models_assigned').empty();
            $.each(data,function(i,item){
                select_models.append($("<option>",{
                    value:i,
                    text : data[i].label
                }));
            });
        })
    });


    $.get('/get_projects',function(data){

        var selector=document.getElementById('qc_form');
    //alert(data);
        for(var i=0;i<data.length;i++){
            //alert(data[i].ID);
            selector.innerHTML += "<tr><td>"+ data[i].ID +"</td><td>"+ data[i].project_name +"</td><td><button class='del_qc btn btn-danger'>Delete</button> </td></tr>";

        }//end of for loop


    });//function ends over here

    //delete button for removing the QC project from the table
    $(document).on('click', '#qc_form .del_qc',function(){

        var currentRow=$(this).closest("tr");
        var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD

        //var data=col1+"\n"+col2+"\n"+col3+"\n";
        alert(col1+col2);

        $.post('/delete_qc_entry',{c1:col1,c2:col2},function(data){
            if(data=='success'){

                alert('Project deleted from the Qc table');

            }
            else{
                alert('Please try after sometime');
            }
        });
        $(this).closest('tr').remove();
    });

});//end of ready function

function fetch_user(){
    $.get('/online',function(data){
        var del='DELETE'
        var results=document.getElementById('response');
        var result=document.getElementById('response1');
        for(var i=0;i<data.length;i++){
            results.innerHTML += "<tr><td>"+data[i].username+"</td><td>"+data[i].last_logged_in+"</td><td>"+data[i].logged_in+"</td><td>"+data[i].admin+"</td><td><button class='editbtn1 btn btn-danger'>"+del+"</button> </td></tr>";

            result.innerHTML +="<tr><td contenteditable='false'>"+data[i].username+"</td><td>"+data[i].email+"</td><td contenteditable='false'>"+data[i].d_password+"</td><td contenteditable='false'>"+data[i].admin+"</td><td><button class='editbtn btn btn-warning'>Edit</td></tr>"
        }//end of for loop
        //Loading the users form the databse
        // add the new options for models
        var sel = $("#user_select");
            sel.empty();
        $.each(data, function(i, item) {
            sel.append($("<option>", {
                value: i,
                text : data[i].email
            }));
        });

    });//end of get function
}
