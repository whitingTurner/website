/**
 * Created by Jeevjyot on 6/9/16.
 */

function foo() {
    var models = document.getElementById("inputModellist");
  //  var urn= document.getElementById("");
    for (var i = 1; i < models.options.length; i++) {
        console.log(models.options[i].value);
        console.log(models.options[i].text);
    }

};

