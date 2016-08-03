/**
 * Created by Jeevjyot on 8/2/16.
 */
$(document).ready(function() {

    $('#update').click(function () {

        var qc_num = document.getElementById('qc_number').value;
        var init = document.getElementById('ini').value;
        var project_b = document.getElementById('project').value;
        var contract = document.getElementById('cn').value;
        var location = document.getElementById('loc').value;
        var subcontractor = document.getElementById('subc').value;
        var sub_tier = document.getElementById('sub-tier').value;
        var inspection = document.getElementById('iDate').value;
        var design_date = document.getElementById('dpack').value;
        var _specification = document.getElementById('specification').value;
        var _drawing = document.getElementById('drawing').value;
        var submittal = $(this).val();

        //text_area

        var _material = document.getElementById('material').value;
        var _notes = document.getElementById('notes').value;

        //Picture radio box
        var x = $('input[name=optradio]:checked').val(); //picture JS
        var y =$('input[name=optradio1]:checked').val();// compliance
        var z=$('input[name=optradio2]:checked').val();//impact
        var rec=document.getElementById('recommend').value; //recommend text boxes;
        var date_performed=document.getElementById('date_p').value
        var _follow=document.getElementById('follow').value
        var _impact=document.getElementById('impact').value

        //date and signature

        var _sign=document.getElementById('sign').value;
        var _date_pic=document.getElementById('date_pic').value

        //alert(x);

        var superin=document.getElementById('superint').value;
        var _lead=document.getElementById('lead').value
        var vendor=document.getElementById('vender').value;
        var two_tier=document.getElementById('date_pic').value;
        var cnse=document.getElementById('lead_cnse').value;
        var cc=document.getElementById('cc').value;
        alert('Form Updated');
    });//function ends here

    //For pictures
    $("input[name='optradio']", $('.pictures')).change(
        function (e) {
            // your stuffs go here
           // alert('hi');
           // alert($(this).val());
            if($(this).val()=='yea'){
                alert('File Dialog Box');
            }
        });
    //for impact textarea
    $("input[name='optradio2']", $('#impact_')).change(
        function (e) {
            // your stuffs go here
            // alert('hi');
            // alert($(this).val());
            if($(this).val()=='cost'){
                cost=prompt('Please Enter the cost')
            }
        });


});//document ready function gets over here