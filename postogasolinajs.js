document.write('<b> ---- Exercicio Posto de Gasolina ------- </b> <br />');
//  Gera relatorio de vendas
function impRel (vendas) {
    if (vendas.length < 1) {
            alert("Não ha dados de vendas para gerar o relatorio");
    } else {
        var valC = 0;
        var valD = 0;
        document.write('Relatorio de vendas de combustivel<br /> <br />');
         for (a=0; a < vendas.length; a++) {
             var x =  vendas[a];
             if (x.fp == 'c' || x.fp == 'C')  {
                 valC = valC + (x.qtdLitros * precoLitro);
             } else {
                 valD = valD + (x.qtdLitros * precoLitro); 
             }
             document.write('Cliente : ' + x.nome + '  Telefone : ' + x.telefone 
                    + '  Tipo Pg : ' + x.fp + '  Qtd Litros : ' + x.qtdLitros 
                    + '  Valor pago : ' + parseFloat(x.qtdLitros * precoLitro).toFixed(2) 
                    + '<br />');
         }
    }
    document.write('<br />');
    // Total das vendas por tipo de pagamento
    document.write("VALOR  TOTAL  CARTÂO :  " + valC.toFixed(2) + ' reais <br />');
    document.write('VALOR  TOTAL  DINHEIRO :  ' + valD.toFixed(2) + ' reais <br />');
};

// processo verificar se ha combustivel e registrar informações de venda
function abastecer () {
    qtdL = parseInt(prompt('Informe a quantidade de litros desejada :'));
    if (litros < qtdL) {
        alert("No tanque so tem " + litros + ' litros');
        var x = prompt('Cliente aceita abastecer so ' + litros + ' litros, SIM ou NAO ?');
        if (x == 'nao'  ||   x == 'NAO' || x == 'Nao') {
            alert('Venda Cancelada');
        } else {
                 qtdL = litros;
                 registraVenda();
                }
    } else {
        registraVenda();
    }

};

// Armazena as informações da venda
function registraVenda() {
    var cliente = {};
    alert('Valor a Pagar = R$ ' + parseFloat(precoLitro * qtdL).toFixed(2) 
          + ' reais;  informar ao cliente,' 
          + ' e perguntar a forma de pagamento');
    var formaPg = prompt('Forma de pagamento => (C) Cartao  (D) Dinheiro');
    cliente.nome = prompt("Registrar o nome do cliente");
    cliente.telefone = prompt("Registrar o telefone do cliente");
    cliente.fp = formaPg;
    cliente.qtdLitros = qtdL;
    vendas.push(cliente);
    litros = litros - qtdL; // Calcula estoque combustivel
}

//  Inicio do Sistema
var vendas = [];
var litros = 500;
var precoLitro = 3.50;
var fim = 9;
while (fim < 10) {
    var opcao = parseInt(prompt('Opções => (1) Venda Combustivel  (3) Fim'));

    // Opção Vendas de Combustivel
    if (opcao == 1) {
        if (litros < 1) {
           alert('Venda Suspensa, não ha mais combustivel');
        } else {
            var qtdL = 0;
            abastecer();  // chamada da função
        };
    };
    
    // Opção Fim e gera o relatorio de vendas
    if (opcao == 3) {
        impRel(vendas); // (chamada da  função)
        document.write('F I M   <br /> <br />');
        fim = 99;
    };
};