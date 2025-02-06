let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirTextoNaTela('h1', 'Jogo Numero Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * 10 + 1);
    let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeNumerosNaLista == 10){
        listaDeNumerosSorteados= [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou o número secreto');
        let mensagemTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `O número secreto era ${numeroSecreto} e você acertou com apenas ${tentativas} ${mensagemTentativas}`);
        document.querySelector('input').disabled = true;
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('p', chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior');
        tentativas++;
        limparCampo();
    }

}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirTextoNaTela('h1', 'Jogo do Numero Secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
    document.querySelector('input').disabled = false; // Habilita o campo de chute
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Adiciona o evento de clique ao botão "Reiniciar Jogo"
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);


