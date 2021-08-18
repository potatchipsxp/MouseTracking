/*

            <button onclick=" event.preventDefault(); return saveform(this.form);">Submit</button>
*/

function saveform(form) {
    console.log('insaveform');
    var radios = form.elements["input_device"];
    var env = null;
    for(var i=0;i<radios.length;i++) {
        if(radios[i].checked == true) {
            env = radios[i].value;
        }
    }
    console.log("getting form id");
    console.log(form.id);
    console.log("got form id");
    console.log(env);
	console.log(form.elements["input_device"].checked);
    console.log(form.consent.checked);
    if ((form.consent.checked == true) && (env != null)) {
        console.log("consented");
        var dataString;
        dataString += form.id + "!";
        for (i = 0; i < form.length; i++) {
          	dataString += form.elements[i].value + " " + form.elements[i].checked + ", ";
        }
        var worked = false;
        var fname = makeid();
        dataString = JSON.stringify(dataString);
        $.ajax({
            type: 'POST',
            url: 'savedemographicQs.php',
            data: { 'dataString': dataString, 'fname': fname },
            success: function(){
                window.location.href = "./click.html?fname=" + fname;
            },
            error: function(){
                alert("ajax failed");
            }
        }).done(function () {
            console.log("it ran");
        });
        //console.log('it worked ' + worked);
        //console.log(fname);
        //window.location.href = "./click.html?fname=" + fname;
        return false;    
    } else {
        console.log(form.input_device.value);
        console.log("didnt consent");
        location.reload(true);
        alert("To continue you must select a device and check the consent box");
    }
}


/*
$("prelim").submit(function(e) {

    console.log('insaveform');
    console.log(form.input_device.value);
    if ((form.consent.checked == true) && ((form.input_device.value == "mouse") || (form.input_device.value == "trackpad") || (form.input_device.value == "other"))) {
        console.log("consented");
        var dataString;
        for (i = 0; i < form.length; i++) {
            dataString += form.elements[i].value + " " + form.elements[i].checked + ", ";
        }
        var worked = false;
        var fname = makeid();
        dataString = JSON.stringify(dataString);
        jQuery.ajax({
            type: 'POST',
            url: 'savedemographicQs.php',
            data: { 'dataString': dataString, 'fname': fname }
        }).done(function () {
            console.log("it ran");
        });
        console.log('it worked ' + worked);
        console.log(fname);
        window.location.href = "./click.html?fname=" + fname;
        return false;    
    } else {
        console.log(form.input_device.value);
        console.log("didnt consent");
        location.reload(true);
        alert("To continue you must select a device and check the consent box");
    }
    return false;
});
*/
function update(value, slider) {
    document.getElementById(slider).innerHTML=value;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}