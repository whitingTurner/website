/**
 * Created by Jeevjyot on 7/13/16.
 */




//Adding User to the Database

//Ready function
$(document).ready(function(){

    $.get('/online',function(data){

            var results=document.getElementById('response');
        for(var i=0;i<data.length;i++){
            results.innerHTML += "<tr><td>"+data[i].username+"</td><td>"+data[i].last_logged_in+"</td><td>"+data[i].logged_in+"</td><td>"+data[i].admin+"</td></tr>";

        }//end of for loop

    });//end of get function


    //adding user to the database
    $('#register').click(function(event){
        event.preventDefault();
        var admin;
        var user= document.getElementById('username').value;
        var pass= document.getElementById('password').value;
        var id= document.getElementById('email').value;
        var x=$('input[name=optradio]:checked').val();
        alert(x);
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

});//end of ready function
