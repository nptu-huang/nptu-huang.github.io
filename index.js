let form = document.getElementsByTagName('form')[0];


function showAlert(){
    let alert = document.querySelector('.alert');
    alert.classList.add('show');
    setTimeout(function(){
        alert.classList.remove('show');
    },1500);
}

function synthesize(sentense){
    //To do : Connect to Server and parse request
}

document.addEventListener('DOMContentLoaded', () => {
    //register add submit event
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showAlert();
        console.log('hi');
    });

});