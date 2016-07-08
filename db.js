/**
 * Created by Jeevjyot on 7/6/16.
 */
var knex=require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'whiting_turner',
        charset  : 'utf8',
        port: '3307'
    }
});;
var Bookshelf = require('bookshelf')(knex);




module.exports.DB = Bookshelf;