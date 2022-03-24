let form = document.getElementsByTagName('form')[0];
let input =document.getElementById('inputText');

function showAlert(){
    let alert = document.querySelector('.alert');
    alert.classList.add('show');
    setTimeout(function(){
        alert.classList.remove('show');
    },1500);
}

function synthesize(sentense){
    //To do : Connect to Server and parse request
    let URL ='';
    fetch(URL,{
        method: 'GET'

    })
}

document.addEventListener('DOMContentLoaded', () => {
    //register add submit event
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if( input.value == "")
        showAlert();
        else 
        console.log('hi');
        input.value="";
    });

});