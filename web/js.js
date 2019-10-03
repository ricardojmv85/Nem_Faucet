function transfer()
{

    var address = document.getElementById('uname').value;
    if (address!=""){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:3000/transfer?dest="+address, false);
        xhr.send()
        response = JSON.parse(xhr.responseText)['response'];
        if (response == 'success'){
            document.getElementById('button').innerHTML='<span class="spinner-border spinner-border-sm"></span>Loading.'
            sleep(1500).then(() => {
            document.getElementById('uname').style.borderColor="green";
            document.getElementById('invalidmessage').style.display="none";
            document.getElementById('validmessage').innerText="Successful transaction";
            document.getElementById('validmessage').style.display="inline";
            document.getElementById('uname').value = "";
            document.getElementById('button').innerHTML='Send Nems';
            });
            
        } 
        else if (response == 'invalid address'){
            // alert("Invalid Address");
            document.getElementById('button').innerHTML='<span class="spinner-border spinner-border-sm"></span>Loading.';
            sleep(1500).then(() => {
            document.getElementById('validmessage').style.display="none";
            document.getElementById('uname').style.borderColor="red";
            document.getElementById("invalidmessage").innerText="Invalid Adress"
            document.getElementById("invalidmessage").style.display="inline";
            document.getElementById('uname').value="";
            document.getElementById('button').innerHTML='Send Nems';
            });
        }
        else if (response == 'wait'){
            // alert("The time lapsed between requests must be at leat 1 hour.")
            document.getElementById('button').innerHTML='<span class="spinner-border spinner-border-sm"></span>Loading.';
            sleep(1500).then(() => {
            document.getElementById('validmessage').style.display="none";
            document.getElementById('uname').style.borderColor="red";
            document.getElementById("invalidmessage").innerText="Try at least 1 hour later."
            document.getElementById("invalidmessage").style.display="inline";
            document.getElementById('uname').value="";
            document.getElementById('button').innerHTML='Send Nems';
            });
        }
        else{
            alert("An error occurred!")
        }
        
    }else{
        document.getElementById('button').innerHTML='<span class="spinner-border spinner-border-sm"></span>Loading.';
        sleep(500).then(() => {
        document.getElementById('validmessage').style.display="none";
        document.getElementById('uname').style.borderColor="red";
        document.getElementById("invalidmessage").innerText="Please fill out the field."
        document.getElementById("invalidmessage").style.display="inline";
        document.getElementById('button').innerHTML='Send Nems';
        });
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }