var mysql= require('mysql');
var favicon = require('serve-favicon');
var api = require('./routes/api');
var express = require('express');
var connect = require('connect');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var app = express();
//var app=connect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


function setName(){

}
//app.use is to define the pages and folder and basic usage
app.use('/public', express.static(__dirname + '/public'))
app.use('/view', express.static(__dirname + 'views/viewer'));
app.use('/', express.static(__dirname + '/views/models/'));
app.use(favicon(__dirname + '/public/images/favicon1.ico'));
app.use('/api', api);



app.set('port', process.env.PORT); 

   //to retrive the urn and label from lmvmodeloption

//Mysql Connection
var connection = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password :'',
    database: 'whiting_turner',
    port: '3307',
});

//Get Function to check
app.get('/data', function(req, res){
    res.send('hello world'); //replace with your data here
});

//Send data from lmvmodels to populate the Drop down list in index1.html
app.get( '/lmvmodels',function(req,res){
    var query="select label,urn from lmvmodeloption";
    connection.query(query,function(err,rows,fields){
        if(!err)
            res.send(rows);
        else 
            console.log(err.stack);
    });
});

//Logout function
app.post( '/logout',function(req,res){
    console.log('Im logging out ');
    req.session.destroy();
    res.send("logout");
});

function isUserLoggedIn(req,res){
    console.log('checking if user is logged in');
    if(req.session.user_wt=="")
    {
        res.send('null');
    }

}

//to check if the user is logged in
app.get('/check',isUserLoggedIn);
//function to insert uploaded model into lmvmodeloption
app.post('/endpoint',function(req,res){
    var user_name=req.body.user1;
    var password=req.body.password;

    console.log("User name = "+user_name+", password is "+password);
    var post = {label:password, urn:user_name};


   // var s='INSERT INTO lmvmodeloption(label,urn) '+
  //  'VALUES("'+password+'","'+user_name+'")';
  //  console.log(s);
    var query9=connection.query('INSERT into lmvmodeloption SET ?',post,function(err,res){
        if(err)
            console.log(err);
    });
    console.log(query9.sql);
    res.end("yes");
});
//endpoint for login
app.post('/login',function(req,res){
    var p_wt=req.body.pass_w;
    var u_wt=req.body.user_w; var sess;
    console.log(u_wt);
    var q='Select email,password from user_login where email =?;'
    var p={x:u_wt,y:p_wt};
    console.log(q);
    connection.query(q,[u_wt],function(err,rows,fields){
        //console.log(rows[0].email);
        console.log(rows);

        if(rows.length>=1)
        {
            if(bcrypt.compareSync(p_wt,rows[0].password)){
                req.session.user_wt=u_wt;
                //console.log(rows);
                console.log("success sent");
                console.log(rows[0].email);
                res.redirect("/admin.html");



            }
            else{
                res.send("bad data");
            }

        }
        
        else{
            console.log("bad data");
           res.send("bad data");
        }
    });

});
fs=require('fs');
process.on('uncaughtException',function(err){
    fs.writeFileSync("test.txt",err,"utf8")
});


//Server is Starting on port 3000
var server = app.listen(app.get('port'), function() {

    connection.connect(function(err){
        if(err) {
            console.log('error connecting to the database' + err.stack);
            return;
        }else{console.log('connected to database');}
    });
    connection.query("select email,password from user_login where email='j'",function(err,rows,fields){
        if(err){
            console.log(err.stack);
        }else{
            console.log(rows);
        }
    });
    console.log('Server listening on port ' +
        server.address().port);
});




