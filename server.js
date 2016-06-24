var mysql= require('mysql');
var favicon = require('serve-favicon');
var api = require('./routes/api');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();



//app.use is to define the pages and folder and basic usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'))
app.use('/view', express.static(__dirname + 'views/viewer'));
app.use('/', express.static(__dirname + '/views/models/'));
app.use(favicon(__dirname + '/public/images/favicon1.ico'));
app.use('/api', api);

app.use(bodyParser.json());

app.set('port', process.env.PORT); 

var query="select label,urn from lmvmodeloption";   //to retrive the urn and label from lmvmodeloption

//Mysql Connection
var connection = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password :'root',
    database: 'whiting_turner',
    port: '3306',
});

//Get Function to check
app.get( '/data', function(req, res){
    res.send('hello world'); //replace with your data here
});

//Send data from lmvmodels to populate the Drop down list in index1.html
app.get( '/lmvmodels',function(req,res){
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
    req.session = null;
    res.send("logout");
});

//function to insert uploaded model into lmvmodeloption
app.post(  '/endpoint',function(req,res){
    var user_name=req.body.user1;
    var password=req.body.password;
    //var d={ux:user_name,dx:password};
    console.log("User name = "+user_name+", password is "+password);
    var s='INSERT INTO lmvmodeloption(label,urn) '+
    'VALUES("'+password+'","'+user_name+'")';
    console.log(s);
    connection.query(s,function(err,res){
        if(err)
            throw err;
    });
    res.end("yes");
});
app.use(cookieParser())
//app.use(session({secret: 'Keyboard car'}));
//this function takes care of the login, check if it returns the rows, if yes send success message, login success
app.post('/login',function(req,res){
    var p_wt=req.body.pass_w;
    var u_wt=req.body.user_w; var sess;
    //console.log(p_wt);
    //console.log(u_wt);
    var q= 'select email, password from user_login where email ="' +u_wt+ '" and password = "' +p_wt+ ' "';
    console.log(q);
    connection.query(q,function(err,rows,fields){
        //console.log(rows[0].email);
        console.log(rows);
        if(!err)
        {
            console.log('im in if');
            //sess=req.session;
            //sess.email_u=rows[0].email;
            //console.log("Session="+ sess.email_u);
            console.log(rows);
            console.log("success sent");
            console.log(rows[0].email);
           // res.redirect('10.1.24.78:81/admin.html');
            res.send("success");
        }
        
        else{
           console.log('im in else');
             //res.send("Bad Data");
            console.log("bad data")
            // console.log(rows);
           res.send("bad data");
        }
    });

});
fs=require('fs');
process.on('uncaughtException',function(err){
    fs.writeFileSync("test.txt",err,"utf8")
})
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
   /* connection.query('SELECT email as first from user_login where email="jeevjyot.chhabda@whiting-turne"', function(err, rows, fields) {
        if (!err)
            console.log(rows);
        else
            console.log('Error while performing Query., Empty it is, no rows'+ err.stack);
    });*/
    console.log('Server listening on port ' +
        server.address().port);
});

//this function checks if no session is set, redirect the user to the index page
function checkAuth(req,res,nect){
    if(!sess.email_u){
        res.redirect("/");
    }
}

