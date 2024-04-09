let listaCarrinho = [];
let totalGeral;

limpar();
document.getElementById('lista-produtos').innerHTML = '';
document.getElementById('valor-total').textContent = 'R$ 0';

function limpar() {
    totalGeral = 0;
    listaCarrinho = [];
    document.getElementById('produto').value = '';
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0';
    document.getElementById('quantidade').value = '';
}

function adicionar() {
    //Recuperar valores do nome do produto, quantidade e valor
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split('-')[0];
    let valorProduto = produto.split('R$')[1];
    let quantidadeProduto = parseInt(document.getElementById('quantidade').value);
    //V1.2 Não adicionar produtos zerados e sem nome
    if (produto == '' || quantidadeProduto == '') {
        alert ("Preencher produto e quantidade");
    } else {
        //Calcular o preço do produto
        let valorTotalProduto = calcularProduto(quantidadeProduto,valorProduto);
        //Adicionar produto no carrinho
        adicionarCarrinho(quantidadeProduto,nomeProduto,valorTotalProduto);
        //Calcular total da compra
        calcularTotalCarinho(valorTotalProduto);
    }
    

}

function calcularProduto(qtd,val) {
    return qtd * val;
}

function adicionarCarrinho(qtd,nome,val) {
    //V1.3 Adicionado recalculo de quantidade e valor do produto caso ele ja esteja na lista do carrinho
    if (listaCarrinho.some(item => item.includes(nome))) {
        let posicaoArray = listaCarrinho.findIndex(item => item.includes(nome));
        let posicaoNomeQuantidade = listaCarrinho[posicaoArray].indexOf(`x</span> ${nome}`);
        let quantidadeProdutoAnterior = parseInt(listaCarrinho[posicaoArray].slice(posicaoNomeQuantidade-3,posicaoNomeQuantidade).match(/\d+/)[0]);
        let posicaoNomeValor = listaCarrinho[posicaoArray].indexOf('R$');
        let valorProdutoAnterior = parseInt(listaCarrinho[posicaoArray].slice(posicaoNomeValor,posicaoNomeValor+6).match(/\d+/)[0]);
        listaCarrinho[posicaoArray] = `<section class="carrinho__produtos__produto"><span class="texto-azul">${quantidadeProdutoAnterior+qtd}x</span> ${nome} <span class="texto-azul">R$${valorProdutoAnterior+val}</span></section>` 
        document.getElementById('quantidade').value = '';
        document.getElementById('produto').value = '';
        let listaCarrinhoFinal = document.getElementById('lista-produtos');
        listaCarrinhoFinal.innerHTML = listaCarrinho.join('');
        return listaCarrinhoFinal;
    } else {
        listaCarrinho.push(`<section class="carrinho__produtos__produto"><span class="texto-azul">${qtd}x</span> ${nome} <span class="texto-azul">R$${val}</span></section>`);
        document.getElementById('quantidade').value = '';
        document.getElementById('produto').value = '';
        let listaCarrinhoFinal = document.getElementById('lista-produtos');
        listaCarrinhoFinal.innerHTML = listaCarrinho.join('');
        return listaCarrinhoFinal;
    }

}

function calcularTotalCarinho(val) {
    totalGeral = totalGeral + val;
    let campoTotal = document.getElementById('valor-total');
    campoTotal.textContent = `R$ ${totalGeral}`;
    return campoTotal.textContent;
}


//Adicionar recalcular produtos qua ja existam no carrinho 