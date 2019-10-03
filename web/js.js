function httpGet(address)
{
    var address = document.getElementById('address').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:3000/transfer?dest="+address, false);
    xhr.send()
    response = JSON.parse(xhr.responseText)['response'];
    if (response == 'success'){
        alert("Succesful Transaction!");
    } 
    else if (response == 'invalid address'){
        alert("Invalid Address");
    }
}