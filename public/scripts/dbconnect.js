console.log('checking');
var mysql= require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    passowrd :'',
    database: 'whiting_turner'
});

connection.connect(function(err){

    console.log('error connecting to the database'+err.stack);
    return;
});

console.log("Connected as ID"+ connection.threadID);


