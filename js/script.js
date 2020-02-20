var inputCep = document.getElementById("cep");
var inputCpf = document.getElementById("cpf");
var inputCpfTitular = document.getElementById("cpf-titular");
var inputTelefone = document.getElementById("telefone");
var inputSenha = document.getElementById("senha");
var inputSenhaValida = document.getElementById("conf-senha");
var inputCartao = document.getElementById("numero-cartao");
var inputCvv = document.getElementById("cod-cartao");
var inputEndereco = document.getElementById("endereco");
var inputBairro = document.getElementById("bairro");
var inputCidade = document.getElementById("cidade");
var selectEstado = document.getElementById("estado");
var btnFinalizar = document.getElementById("btn-finalizar");
var cpfInvalido = document.getElementById("text-cpf-inval");
var textCpfValido = document.getElementById("text-cpf-valido");
let config = {
    method: "GET"
}

estados = () =>{
    let text = "";
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', config).then((resposta) => {
        return resposta.json();
    }).then((valor) => {
        valor.forEach(estado => {
            text += "<option value='" + estado.sigla +"'>" + estado.sigla +"</option>"
        });
        selectEstado.insertAdjacentHTML("beforeend", text);
    })
}

estados();

cpfInvalido.style.display = "none";
textCpfValido.style.display = "none";

inputCep.onkeypress = (evt) => {
    var evento = evt || window.event;
    var key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if (inputCep.value.length == 9) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if (inputCep.value.length == 5) {
        inputCep.value += "-";
    }
}

const preencherCpf = (evt, input) => {
    var evento = evt || window.event;
    var key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    let tamanho = input.value.length;
    if (tamanho == 14) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if (tamanho == 3 || tamanho == 7) {
        input.value += ".";
    }
    if (tamanho == 11) {
        input.value += "-";
    }
}

const cpfValido = (cpf) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}

inputCpf.onkeypress = (evt) => {
    preencherCpf(evt, inputCpf);
}

inputCpf.onkeyup = () => {
    if(inputCpf.value.length == 14){
        if(!cpfValido(inputCpf.value.replace(/\.|-/g, ''))){
            cpfInvalido.style.display = "block";
        }else{
            cpfInvalido.style.display = "none";
            textCpfValido.style.display = "block";
        }
    }else{
        if(cpfInvalido.style.display == "block")
            cpfInvalido.style.display = "none";
            textCpfValido.style.display = "none";
    }
}

inputCep.onkeyup = () => {
    if(inputCep.value.length == 9){
        fetch('https://viacep.com.br/ws/'+inputCep.value.replace(/\-/g, '')+'/json/', config).then((resposta) =>{
            return resposta.json();
        }).then((valor) => {
            if(valor.erro){
                inputCep.classList.add("is-invalid");
            }else{
                inputBairro.value = valor.bairro;
                inputEndereco.value = valor.logradouro;
                inputCidade.value = valor.localidade;
                selectEstado.value = valor.uf;
                inputCep.classList.add("is-valid");
            }
        })
    }else{
        inputBairro.value = "";
        inputEndereco.value = "";
        inputCidade.value = "";
        selectEstado.value = "";
        inputCep.classList.remove("is-invalid");
        inputCep.classList.remove("is-valid");
    }
}

inputCpf.onpaste = () => {
    return false;
}

inputCpfTitular.onkeypress = (evt) => {
    preencherCpf(evt, inputCpfTitular);
}

inputSenhaValida.onkeyup = () => {
    if(inputSenha.value == inputSenhaValida.value){
        console.log(inputSenha.value);
        inputSenhaValida.classList.add("is-valid");
    }else{
        inputSenhaValida.classList.add("is-invalid");
    }
}

inputCartao.onkeypress = (evt) => {
    var evento = evt || window.event;
    var key = evento.keyCode || evento.which;
    let tamanho = inputCartao.value.length;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if (!regex.test(key) || tamanho == 19) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if(tamanho == 4 || tamanho == 9 || tamanho == 14){
        inputCartao.value += " ";
    }
}

inputCvv.onkeypress = (evt) => {
    var evento = evt || window.event;
    var key = evento.keyCode || evento.which;
    let tamanho = inputCvv.value.length;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if (!regex.test(key) || tamanho == 3) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
}