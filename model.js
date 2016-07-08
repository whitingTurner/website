/**
 * Created by Jeevjyot on 7/6/16.
 */

var DB = require('./db').DB;

var User = DB.Model.extend({
    tableName: 'tblUsers',
    idAttribute: 'userId',
});

module.exports = {
    User: User
};