var inputCep = document.getElementById("cep");
var inputCpf = document.getElementById("cpf");

inputCep.onkeypress = (evt) => {
    var evento = evt || window.event;
    var key = evento.keyCode || evento.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
        evento.returnValue = false;
        if(evento.preventDefault) evento.preventDefault();
    }
    if(inputCep.value.length == 9){
        evento.returnValue = false;
        if(evento.preventDefault) evento.preventDefault();
    }
    if(inputCep.value.length == 5){
        inputCep.value += "-";
    }
}

inputCpf.onkeypress = (evt) => {
    var evento = evt || window.event;
    var key = evento.keyCode || evento.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
        evento.returnValue = false;
        if(evento.preventDefault) evento.preventDefault();
    }
    let tamanho = inputCpf.value.length;
    if(tamanho == 14){
        evento.returnValue = false;
        if(evento.preventDefault) evento.preventDefault();
    }
    if(tamanho == 3 || tamanho == 7){
        inputCpf.value += ".";
    }
    if(tamanho == 11){
        inputCpf.value += "-";
    }
}