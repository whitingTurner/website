/**
 * Created by Jeevjyot on 7/8/16.
 */
var mysql= require('mysql');
var fs=require('fs');
var favicon = require('serve-favicon');
var api = require('./routes/api');
var connect = require('connect');
var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var uuid=require('uuid');
var formidable=require('formidable');
var path = require('path');
var app=express();

var unique_id;
var admin=0;
var per_email;
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
app.use(bodyParser.urlencoded({ extended: false })); //for retrieving the data from the javascript file.

// Cookie parsing needed for sessions
app.use(cookieParser('notsosecretkey'));

// Session framework
app.use(session({secret: 'notsosecretkey123'}));

//function to set the session.
function setName(req, res) {

    console.log('i am setting session');
    req.session.name = req.body.user_w;

}

//routing
//app.use is to define the pages and folder and basic usage
app.use('/public', express.static(__dirname + '/public'))
app.use('/view', express.static(__dirname + 'views/viewer'));
app.use('/', express.static(__dirname + '/views/models/'));
app.use(favicon(__dirname + '/public/images/favicon1.ico'));
app.use('/api', api);
app.use('/uploads',express.static(__dirname + '/uploads/'))
app.use('/scripts',express.static(__dirname + '/jquery-validation-1/'));
//setting the port
app.set('port', process.env.PORT);

//Mysql Connection
var connection = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password :'root',
    database: 'whiting_turner',
    port: '3306',
});


//registration and sign up function
app.post('/sign_up',function(req,res){

    var email_id=req.body.e;
    var user_name=req.body.u;
    var password=req.body.p;
    var hashed_pass=bcrypt.hashSync(password);
    var query="INSERT into register_user SET ?";
    var post={email:email_id,username:user_name,password:password,hash_p:hashed_pass};

    connection.query(query,post,function(err,rows,fields){
        if(!err){
            res.send('success')
        }
        else{
            res.send('error');
            console.log(err);
        }
    })

});
// moving the records from the register table into user_login and deleting the record from the approve list
app.post('/transfer',function(req,res){

    var u=req.body.c1;
    var e=req.body.c2;
    var p=req.body.c3;
    h_p=bcrypt.hashSync(p);

    var query='Insert into user_login set ?'
    var post={username:u,email:e,password:h_p,d_password:p,admin:0};

    //Cascading functions, insert into table and delete from the approve list
    connection.query(query,post,function(err,rows,fields){
        if(err){
            console.log(err);
            res.send('error');
        }
        else{
            connection.query('delete from register_user where email = ?',[e],function(err,rows,fields){
                if(err){
                    console.log(err+'Error deleting from approve list');
                    res.send('error2');
                }
                else{
                    res.send('success2');
                }
            })
        }
    });


});
//function send the list of users to be approved
app.get('/approve_list',function(req,res){

    var query='SELECT * from register_user';

    connection.query(query,function(err,rows,field){

        if(err){
            console.log(err);
        }
        else{
            res.send(rows);
        }
    });
})

//Send data from lmvmodels to populate the Drop down list in index1.html (label and urn)
app.get( '/lmvmodels',function(req,res){
    var query="select label,urn from per_table where email = ?";
    var p_email=localStorage.getItem('email_id');
    console.log('PER EMAIL in ='+p_email);
   var email=p_email;
    connection.query(query,[p_email],function(err,rows,fields){
        if(!err)
        {
            console.log(rows);
            console.log('success');
            res.send(rows);
        }
        
           
        else
            console.log("Error="+err.stack);
    });
});

//adding new user
app.post('/insert',function(req,res){
    var user_name=req.body.u;
    var email=req.body.i;
    var pass=req.body.p;
    var password=bcrypt.hashSync(pass);
    var ad=req.body.a;
    var r='';
    data={username:user_name,email:email,password:password,admin:ad,d_password:pass};
    console.log(user_name+email+password);
    connection.query("INSERT into user_login SET ?",data,function(err,rows,fields){
        if(err){
            console.log(err);
            res.send('f');
        }
        else{
             res.send('s');
        }
    });
   // console.log("R = " + r);
    //res.send(r);
});

//function to retrieve the form fields based on the project ID and its respective log
app.post('/get_form_fields',function(req,res){
    var project_id=req.body.p;
    var qc_number=req.body.q;

    var query='SELECT * from form_fields where ID = ? and qc_number = ?';
    connection.query(query,[project_id,qc_number],function(err,rows,fields){
        if(err){
            console.log(err);
            res.send(err);
        }
        else {
            console.log(rows);
            res.send(rows);
        }


    });

})



//Getting data from the form fields; Quality Control form
app.get('/get_qs',function(req,res){

    var project_name=req.body.p_n;
    var query="SELECT * from form_fields where project_name = ?";

    connection.query('query',function(err,rows,fields){

        if(!err){
            res.send(rows);
        }
        else{
            res.send('error');
        }

    });

});

//function to insert uploaded model into database(lmvmodeloption)
app.post('/endpoint',function(req,res){
    var user_name=req.body.user1;
    var password=req.body.password;
    var email_id=localStorage.getItem('email_id');
    console.log("User name = "+user_name+", password is "+password);
    var post = {label:password, urn:user_name};
    var post1={label:password,urn:user_name,email:email_id};
    // var s='INSERT INTO lmvmodeloption(label,urn) VALUES("'+password+'","'+user_name+'")';
    var query9=connection.query('INSERT into lmvmodeloption SET ?',post,function(err,res){
        if(err)
            console.log(err);
    });

    connection.query('INSERT into per_table SET ?',post1,function(err,rows,field){
        if(err){
            console.log(err)
        }
        else{
            console.log('Model added to your collection');
        }
    })
    console.log(query9.sql);
    res.end("yes");
});

//function to logs the user out and update the login in status
//if user is already logged in: logged_in : yes and uuid is set
//if user is not logged in. logged_in : no and uuid is null
function logout1(req, res,u_wt) {
    var user_name=req.session.user_wt;
    console.log('i am being called');
    console.log(user_name);
    req.session = null;
    console.log('Session deleted');
    console.log('Firefox is killing me');
    var NO='no'; var z='NULL';
    //var query_delete="update user_login set logged_in = ? and uuid = ? where email = ?";
    connection.query("update user_login set logged_in = ?,uuid = ? where email = ?",[NO,z,user_name],function(err){
        if(err)
        {
            console.log(err);
            console.log('Error deleting the entry')
        }else{
            localStorage.clear();
        }

    });
    //req.session = null;

    console.log('log_out sent');
    res.send('log_out');
}
//logout function
app.get('/logout1', logout1);

//function to check whether is logged or not, Middleware function
function isUserLoggedIn(req,res){
    console.log('checking if user is logged in');
    console.log("session="+req.session.user_wt)
    if(req.session.user_wt=="undefined" || !req.session.user_wt)
    {
        console.log('no session set');
        res.send('ns');
    }
    else{
        console.log('Session set = '+ req.session.user_wt);
        var ad=localStorage.getItem('admin');
        console.log('ADMIN Value='+ ad);
        if(ad==1){
            res.send('a');
        }
        else{
            res.send('s');
        }
    }

}

//to check if the user is logged in
app.get('/check',isUserLoggedIn);
var x;


//check whether user is logged in other system or not
function update(u_wt,callback){
    var flagY='no'
    console.log('I am in update');
    connection.query('select * from user_login where email= ? and logged_in= ?',[u_wt,flagY],function(err,rows){
        if(!err){

            if(rows.length>=1) {
                x=1;
                console.log(rows);
                var query_up = 'Update user_login set logged_in=?,uuid=? where email=?';
                var flagX = 'yes';
                var u_id = uuid.v1();
                connection.query(query_up, [flagX, u_id, u_wt], function (err) {
                    if (err) {
                        console.log(err);
                        console.log('Error was thrown above me ');
                    }
                });
            }
            else{
                console.log('im returning 0 value')
                 x=0;
            }
        callback(x);
        }
        else{
            console.log(err);
        }

    });
};

function online(req,res){


        var query="select * from user_login";
        connection.query(query,function(err,rows,fields){
            if(!err){
                res.send(rows);
            }
            else{
                console.log(err);
                res.send(err);
            }
        });

}
//seding the online data to panel
app.get('/online',online);

app.post('/update_table',update_table);

function update_table(req,res){
  var  username =req.body.c1;
    var email=req.body.c2;
    var d_password=req.body.c3;
    var password=bcrypt.hashSync(d_password);
    var admin=req.body.c4;
    var email_or=req.body.oe;
    connection.query('update user_login set username = ?,email=?,password=?,admin=?,d_password=? where email=?',[username,email,password,admin,d_password,email_or],function(err,rows,fields){
        if(err){
            console.log('Error');
            console.log(err);
        }
        else{
            res.send('success');
        }
    })
}
//*******************************************************
//*******************************************************

//application to delete the entry from the QC table
app.post('/delete_qc_entry',function(req,res){

    var id=req.body.c1;
    var project_name=req.body.c2;
    var query='delete from qc_form where ID = ?';

    connection.query(query,[id],function(err,rows,fields){

        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log('Entry deleted');
            res.send('success');
        }


    });

});
app.get('/get_projects',function(req,res){

    var query="select * from qc_form";
    console.log('In server');
    connection.query(query,function(err,rows,field){
        if(err){
            console.log(err);
            res.send('error');
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    })
});// get projects

app.post('/get_pictures',function(req,res){

    //we need of the project and qc number to get the path of the images and fiel name too
    var id=req.body.i;
    var qc=req.body.q;
    var query='SELECT * from qc_pictures where project_id = ? and qc_number = ?';
    connection.query(query,[id,qc],function(err,rows,field){

            if(err){
                console.log(err);
                res.send('error');
            }else{
                console.log(rows);
                res.send(rows);
            }
    });
});//get pictures depending upon the log

app.post('/insert_project',function(req,res){
    var project_name=req.body.name_p;
    var query="Insert into qc_form SET  ?";
    var post={project_name:project_name};
    connection.query(query,post,function(err,rows,fields){
        if(err){
            console.log(err);
        }else{
            res.send('success');
        }
    })

});

app.post('/get_logs',function(req,res){
    var id=req.body.i;
    var query="SELECT ID,qc_number from form_fields where ID =?";
    connection.query(query,id,function(err,rows,fields){
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            res.send(rows);
        }
    });

});

app.post('/get_current_log',function(req,res){

    var id=req.body.i;
    var qc_number=req.body.n;
    var path=req.body.p;
    var query =';'
    if(path == 0){
         query="Select * from form_fields where ID = ? and qc_number = ?";
        connection.query(query,[id,qc_number],function(err,rows,fields){

            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log(rows);
                res.send(rows);
            }

        });
    }else{
        query = 'Select * from form_fields where ID = ?';
        connection.query(query,[id],function(err,rows,fields){

            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log(rows);
                res.send(rows);
            }

        });

    }

    //var post={id:id,qc_number:qc_number};

});
app.post('/qc_form',function(req,res){
    var btn_text=req.body.btn;
    var query='';
    var log=req.body.log;
    var qc=req.body.qc; var init=req.body.ini; var p_b=req.body.p_b;
    var con=req.body.con;var lo=req.body.loc;var sub=req.body.sub;
    var s_t=req.body.s_t; var inspect=req.body.inspect;var d_d=req.body.d_d;
    var spec=req.body._spe; var draw=req.body._dr; var submit=req.body.submit;
    var mat=req.body.mat; var note=req.body.notes;
    var x=req.body.xr; var y=req.body.yr; var z=req.body.zr;
    var rec=req.body.re; var d_p=req.body.d_p; var follow=req.body.follow;
    var im=req.body.im; var sign=req.body.sign;
    var d=req.body.d; var s=req.body.super; var l=req.body.lead; var v=req.body.ven; var cn=req.body.cn;
    var c=req.body.c;
    var z1=req.body.sch;var z2=req.body.oth;var second_tier=req.body.tt;
    var project_qc=req.body.project_qc;var project_id=req.body.project_id;

    var basedate = new Date();
    var post1={ID:project_id,qc_number:qc,name_ini:init,building:p_b,c_n:con,location:lo,sub_contract:sub,
        sub_t_contract:s_t,inspection_date:inspect, design_package:d_d,specification:spec,
        drawing:draw,submittal:submit, material:mat,notes_comment:note, Picture:x,inspection_compliance:y,
        recommend:rec,perform_date:d_p,inspection_schdule:follow,impacts:im,
        cost:z,schedule:z1,other:z2,date:d,sign:sign,wt_superint:s,wt_contract_lead:l,vendor:v,cc:c,
        cnse_lead:cn,last_updated:basedate,other:z2,second_tier:second_tier};

        localStorage.setItem('project_d',project_id);
        localStorage.setItem('qc_number',qc);
console.log('QC NUMBER='+qc);
    if(btn_text=='UPDATE'){
        query='update form_fields SET ? where qc_number = ?';
        console.log('update-button'+btn_text);
        connection.query(query,[post1,log],function(err,rows,fields){
            if(err){
                console.log('update failed for'+qc);
                console.log(err);
                res.send('err'+'failed');

            }else{
                console.log(btn_text);
                console.log('update success for '+qc);
                res.send('success');

            }
        });
    }
    else{
        connection.query('Insert into form_fields SET ?',post1,function(err,rows,fields){
            if(err){
                res.send('err'+'failed');
            }else{
                console.log(btn_text);
                res.send('success');
                console.log('success');
            }
        });
    }



});

////////////////////////////////////////////
///Inserting image path in the table with qc number and project id
app.post('/upload', function(req, res){

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            var filename=file.name;
            var pic_path='/uploads/'+file.name
            console.log(__dirname+'/uploads/'+file.name);

                var id_picture=localStorage.getItem('project_d');
                var q= localStorage.getItem('qc_number');
                var query='INSERT into qc_pictures SET ?';
                var post={project_id:id_picture,qc_number:q,picture_path:pic_path,file_name:filename};
            connection.query(query,post,function(err,rows,fields){
                if(err){
                    console.log('Picture Error'+ err);
                }
                else{
                    console.log('Picture UPDATED');
                    res.send('success');
                }
        })
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});


app.post('/change_pass',function(req,res){
     var old=req.body.o;
     var new_p=req.body.n;
    var h_p=bcrypt.hashSync(new_p);
    var query='Update user_login set password = ? , d_password = ? where email =?'
    var email_id=localStorage.getItem('email_id');
    console.log(email_id);
    connection.query(query,[h_p,new_p,email_id],function(err,rows,fields){

        if(err) {
            console.log(err);
        }else{

            res.send('success');
        }

    })
})
//app get to get the models
app.post('/get_models',get_models);

function get_models(req,res){
    var  e=req.body.e;
    console.log('models of email to be fetched='+e);
    var query="Select * from per_table where email = ?";
    connection.query(query,[e],function(err,rows,field){

        if(err){
            console.log(err);
        }else{
            console.log('rows fetched');
            console.log(rows);
            res.send(rows);
        }

    });
}

//
function fetchmodels(req,res){
    connection.query('Select * from lmvmodeloption',function(err,rows,fields){
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send(err);
        }
    })

}
app.get('/getModels',fetchmodels);

function insert_permission(req,res){
    var _email=req.body.e;
    var _label=req.body.l;
    var _urn=req.body.u;

    var post={email:_email,label:_label,urn:_urn};
    connection.query('Insert into per_table SET ?',post,function(err,rows,fields){
        if(err){
            console.log(err);
        }
        else{
            res.send('success');
        }
    })
}

app.post('/per_table',insert_permission);

app.post('/del_models',delete_models);

app.post('/del_user',delete_user);

function delete_user(req,res){

    var user_name=req.body.u;
    var post={username:user_name};
    
    connection.query('Delete from user_login where username = ?',[user_name],function(err,rows,fields){
        if(err){
            console.log(err);
            res.send('error');
        }else{
            console.log('Entry Deleted');
            res.send('success');
        }
    })


}//function gets over
function delete_models(req,res){
    var _email=req.body.e;
    var _label=req.body.l;
    var _urn=req.body.u;

    var post={email:_email,label:_label,urn:_urn};
    console.log(post);
    connection.query('Delete from per_table where email = ? and label =?',[_email,_label],function(err,rows,fields){
        if(err){
            console.log(err)
        }
        else{
            res.send('success');
        }
    })

}
//endpoint for login and authentication
app.post('/login',function(req,res){
    var p_wt=req.body.pass_w;
    var u_wt=req.body.user_w;
    per_email=u_wt;
    console.log('PER EMAIL='+per_email);
    console.log('UserName=',u_wt);
    console.log('Password=',p_wt);
    console.log(bcrypt.hashSync('thomasbanach'));
    var q='Select email,password,admin from user_login where email =?;'
    connection.query(q,[u_wt],function(err,rows,fields){

        //if email is present in database
        if(!err){
            if(rows.length>=1)
            {
                console.log('Fetched this details=',rows);
                if(bcrypt.compareSync(p_wt,rows[0].password))
                {
                    console.log('hashed Password matched');
                       /* update(u_wt,function(data){
                           if(data==0){
                               res.send('Already');
                           }
                            else{
                               console.log('User is not logged in, lets log him now');
                                req.session.user_wt=req.body.user_w;
                               console.log("success sent");
                               res.send("success");
                           }

                        });*/
                     admin=rows[0].admin;
                    localStorage.setItem('email_id',u_wt);
                    localStorage.setItem('admin',admin);
                    req.session.user_wt=req.body.user_w;
                    console.log('Success');
                    res.send({result: "success", ad: admin});

                }//inner if ends
                else
                {
                    console.log('Sending bad data');
                    res.send({result:'bad data'});
                }//inner else ends
               /* update(u_wt,function(data){
                    if(data==0)
                    {
                        res.send('already');
                    }
                    else
                    {
                        if(bcrypt.compareSync(p_wt,rows[0].password)){
                            //req.session.user_wt=u_wt;
                            console.log(rows);
                            req.session.user_wt = req.body.user_w;
                            console.log("success sent");
                            res.send("success");

                        }
                        else{
                            res.send("bad data");
                        }
                    }

                });*/
            }//if ends
            else{
                console.log("bad data");
                res.send({result:'bad data'});
            }//else ends
        }
        else{
            console.log(err);
            res.send("Please");
        }


    });

});

//for catching uncaught operation
process.on('uncaughtException',function(err){
    fs.writeFileSync("test.txt",err,"utf8")
    console.log(err);
});

//Starting the server
var server = app.listen(app.get('port'), function() {

    connection.connect(function(err){
        if(err) {
            console.log('error connecting to the database' + err.stack);
            return;
        }else{console.log('connected to database');
           console.log(__dirname);
        }
    });

    //query Db to check the database
    /*connection.query("select email,password from user_login where email='j'",function(err,rows,fields){
     if(err){
     console.log(err.stack);
     }else{
     console.log(rows);
     }
     });*/
    console.log('Server listening on port ' +
        server.address().port);
});
