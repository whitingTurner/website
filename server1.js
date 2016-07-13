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
var app=express();

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
    password :'',
    database: 'whiting_turner',
    port: '3307',
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

function logout(req, res) {
    req.session = null;
    res.send('log_out');
}
//logout function
app.get('/logout', logout);

//function to check whether is logged or not, Middleware function
function isUserLoggedIn(req,res){
    console.log('checking if user is logged in');
    console.log("session="+req.session.user_wt)
    if(req.session.user_wt=="undefined" || !req.session.user_wt)
    {
        console.log('no session set');
        res.send('null');
    }

}

//to check if the user is logged in
app.get('/check',isUserLoggedIn);

//endpoint for login and authentication
app.post('/login',function(req,res){
    var p_wt=req.body.pass_w;
    var u_wt=req.body.user_w;
    console.log(u_wt);
    var q='Select email,password from user_login where email =?;'
    var p={x:u_wt,y:p_wt};
    connection.query(q,[u_wt],function(err,rows,fields){
        //console.log(rows);
        //if email is present in database
        if(rows.length>=1)
        {
            //if the hash password and password entered by user matches
            if(bcrypt.compareSync(p_wt,rows[0].password)){
                //req.session.user_wt=u_wt;
                console.log(rows);
                req.session.user_wt = req.body.user_w;
                console.log("success sent");
                res.send("success")
            }
            else{
                res.send("bad data");
            }

        }//if ends
        else{
            console.log("bad data");
            res.send("bad data");
        }//else ends
    });

});

//for catching uncaught operation
process.on('uncaughtException',function(err){
    fs.writeFileSync("test.txt",err,"utf8")
});

//Starting the server
var server = app.listen(app.get('port'), function() {

    connection.connect(function(err){
        if(err) {
            console.log('error connecting to the database' + err.stack);
            return;
        }else{console.log('connected to database');}
    });
    console.log("raymoriconi=",bcrypt.hashSync("raymoriconi"));
    console.log("chadclark=",bcrypt.hashSync("chadclark"));
    console.log("matthewbrady=",bcrypt.hashSync("matthewbrady"));
    console.log("zohairlateef=",bcrypt.hashSync("zohairlateef"));

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
