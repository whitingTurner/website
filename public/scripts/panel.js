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

    $("#editbtn").click(function(){

        make_editable();
    });


    
    $.get('/online',function(data){
    var del='DELETE'
            var results=document.getElementById('response');
           
        for(var i=0;i<data.length;i++){
            results.innerHTML += "<tr><td>"+data[i].username+"</td><td>"+data[i].last_logged_in+"</td><td>"+data[i].logged_in+"</td><td>"+data[i].admin+"</td><td><button class='btn btn-danger'>"+del+"</button> </td><td><button class='editbtn btn btn-warning'>Edit</td></tr>";

        }//end of for loop
        //Loading the users form the databse
        // add the new options for models
        var sel = $("#user_select");
        // alert(_lmvModelOptions[0].label);
        $.each(data, function(i, item) {
            sel.append($("<option>", {
                value: i,
                text : data[i].email
            }));
        });

    });//end of get function

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
        })

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
        alert(strUser);
        var values = $('#models').val();
        alert(values[0]);
        console.log(values);
        $('#models :selected').each(function(i, selected){
            foo[i] = $(selected).text();
            per_table1.push({email:strUser, label: foo[i], urn: values[i]});

        });for(var i=1;i<=per_table1.length;i++){
            var  email_=per_table1[i].email;
            var label_=per_table1[i].label;
            var urn_=per_table1[i].urn
            $.post('/per_table_del',{e:email_,l:label_,u:urn_},function(data){
                if(data=='success'){
                    console.log('success');
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
        alert(strUser);
        var values = $('#models').val();
        alert(values[0]);
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
        alert(email_id);
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


});//end of ready function
