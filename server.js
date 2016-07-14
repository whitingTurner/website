/**
 * Created by Jeevjyot on 7/8/16.
 */
var mysql= require('mysql');
fs=require('fs');
var favicon = require('serve-favicon');
var api = require('./routes/api');
var connect = require('connect');
var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var uuid=require('uuid');
var app=express();
var unique_id;
app.use(bodyParser.urlencoded({ extended: false })); //for retrieving the data from the javascript file.

// Cookie parsing needed for sessions
app.use(cookieParser('notsosecretkey'));

// Session framework
app.use(session({secret: 'notsosecretkey123'}));

//function to set the session.
function setName(req, res) {
    //if(!req.body.hasOwnProperty('user_w')) {
    //  res.statusCode = 400;
    //return res.json({ error: 'Invalid message' });
    //}
    //else {
    console.log('i am setting session');
    req.session.name = req.body.user_w;
    // }
}

//routing
//app.use is to define the pages and folder and basic usage
app.use('/public', express.static(__dirname + '/public'))
app.use('/view', express.static(__dirname + 'views/viewer'));
app.use('/', express.static(__dirname + '/views/models/'));
app.use(favicon(__dirname + '/public/images/favicon1.ico'));
app.use('/api', api);


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

//Send data from lmvmodels to populate the Drop down list in index1.html (label and urn)
app.get( '/lmvmodels',function(req,res){
    var query="select label,urn from lmvmodeloption";
    connection.query(query,function(err,rows,fields){
        if(!err)
            res.send(rows);
        else
            console.log(err.stack);
    });
});

//function to insert uploaded model into database(lmvmodeloption)
app.post('/endpoint',function(req,res){
    var user_name=req.body.user1;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    var post = {label:password, urn:user_name};

    // var s='INSERT INTO lmvmodeloption(label,urn) VALUES("'+password+'","'+user_name+'")';
    var query9=connection.query('INSERT into lmvmodeloption SET ?',post,function(err,res){
        if(err)
            console.log(err);
    });
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
        res.send('s');
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
//endpoint for login and authentication
app.post('/login',function(req,res){
    var p_wt=req.body.pass_w;
    var u_wt=req.body.user_w;
    console.log('UserName=',u_wt);
    console.log('Password=',p_wt);
    console.log(bcrypt.hashSync(p_wt));
    var q='Select email,password from user_login where email =?;'
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

                    req.session.user_wt=req.body.user_w;
                    console.log('Success');
                    res.send("success");

                }//inner if ends
                else
                {
                    console.log('Sending bad data');
                    res.send('bad data');
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
                res.send("bad data");
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
        }else{console.log('connected to database');}
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
