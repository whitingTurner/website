/**
 * Created by Jeevjyot on 7/13/16.
 */

$.('#logout').click(function(event){
    $.get('/logout',function(data){
        if(data=='log_out')
        {
            window.location="/"
        }
    })
});
