
// processo verificar se ha combustivel e registrar as informações de venda
function abastecer () {
    qtdL = document.getElementById("productId").value;
    if (tanque < qtdL) {
        document.getElementById("divId2").style.display='inline';
        document.getElementById("btnNao").onclick = function () {
            alert('Venda Cancelada !!!');
            document.getElementById("divId2").style.display='none';
            document.getElementById("divId1").style.display='none';
        };
        document.getElementById("btnSim").onclick = function () {
            qtdL = tanque;
           mostrarDadosVenda();
        };       
    } else {
        if (qtdL == 0  || qtdL == 00) {
            alert("Quantidade de Litros,\n é obrigatorio o seu preenchimento !!!!");
        } else {
                mostrarDadosVenda();        
            };
        };
};
// Processo para montar tela Dados de Venda
function mostrarDadosVenda () {
    document.getElementById("divId3").style.display='inline';
    alert('Valor a Pagar = R$ ' + parseFloat(precoLitro * qtdL).toFixed(2) 
    + ' reais.\n Informar ao cliente,' 
    + '\n e solicite a forma de pagamento (C)artão / (D)inheiro'
    + '\n e Registre as unformações');
    var val = parseFloat(precoLitro * qtdL).toFixed(2);
    document.getElementById("txtValor").value= val;
};

// Verifica Preenchimento dos ddos de Venda
function verificaDados () {
    var X = 1;
    var nome = document.getElementById("txtNome").value;
    var telefone = document.getElementById("txtTel").value;
    formPgC = document.getElementById("rdCartao").checked;
    formPgD = document.getElementById("rdDinheiro").checked;
  
    if (nome.length < 1 || telefone.length < 1 ||
        nome ==""  || telefone == "" || 
        ((!formPgC) && (!formPgD)))  {
        x = 5;
    } else {
            x = 0;
        };
    return x;
};
// Processo de Registro das Vendas
function registraVendas () {

    var cliente = {};
    cliente.nome = document.getElementById("txtNome").value;
    cliente.telefone = document.getElementById("txtTel").value;
    if (formPgC) {
        cliente.fp = "C";
    } else {
        cliente.fp = "D";
    }
    cliente.qtdLitros = qtdL;
    cliente.valPg = parseFloat(precoLitro * qtdL).toFixed(2);
 
    vendas.push(cliente);
    alert("Registro das Informações com Sucesso !!!!");

    tanque = tanque - qtdL; // Calcula estoque combustivel

    limpezaTela(); // Limpr a tela para ficar so tela opções
    
};

// Limpar Tela
function limpezaTela() {
    document.getElementById("productId").value= "0";
    document.getElementById("txtNome").value= "";
    document.getElementById("txtTel").value= "";
    document.getElementById("rdDinheiro").checked= "";
    document.getElementById("rdCartao").checked= "";
    document.getElementById("divId3").style.display='none';
    document.getElementById("divId2").style.display='none';
    document.getElementById("divId1").style.display='none';
};


var tanque = 500;
var precoLitro = 3.50;
var vendas = [];
// Botão Venda de Combustivel
document.getElementById("btnVC").onclick = function () {
    document.getElementById("myRel").style.display='none';
    document.getElementById("divId3").style.display='none';
    document.getElementById("divId2").style.display='none';
    document.getElementById("qtdT").innerHTML= tanque;

    if (tanque < 1) {
        alert('Venda Suspensa, não ha mais combustivel !!!');
    } else {
              document.getElementById("divId1").style.display='inline';
              document.getElementById("productId").value= "0";
          };
};

// Botão Registrar Venda (armazena dados da venda para gerar relatorio)
document.getElementById("btnRegistrar").onclick = function () {
    var dadosOk = verificaDados();
    if (dadosOk > 0) {
        alert("Falta Dados a serem Preenchidos !!"
        + "\n Informe ou Cancelar  !!!!");
    }  else {
            registraVendas();
        };
    
};
// Cancela Registro de Venda durante informações de venda
document.getElementById("btnCancel").onclick = function () {
    alert("Venda Cancelada !!!!");
    limpezaTela();
};

// Botão Relatorio de Vendas
document.getElementById("btnRV").onclick = function () {
    if (vendas.length < 1) {
        alert("Não ha dados de vendas para gerar o relatorio !!!");
    } else {
        var valC = 0;
        var valD = 0;
        // Fazer tabela
        html = "<fieldset style='width:380px'> <legend>" 
                + "<strong>  Relatorio de Vendas  </strong> </legend>";
        html += "<table><tr>";
        html += "<td> Cliente </td>";
        html += "<td> Telefone </td>";
        html += "<td>Forma Pg</td>";
        html += "<td>Litros</td>";
        html += "<td>Valor Pg</td>";
        html += "</tr><tr>";
        // Loop preencher tabela
        for (var i=0; i<vendas.length; i++) {
          var x =  vendas[i];
          html += "<td>" + x.nome + "</td>";
          html += "<td>" + x.telefone + "</td>";
          html += "<td>" + x.fp + "</td>";
          html += "<td>" + x.qtdLitros + "</td>";
          html += "<td>" + x.valPg + "</td>";
          html += "</tr><tr>";
          if (x.fp == 'c' || x.fp == 'C')  {
            valC = valC + (x.qtdLitros * precoLitro);
        } else {
            valD = valD + (x.qtdLitros * precoLitro); 
               }
        }
        html += "</tr></table>";
        var totalV = ("VALOR  TOTAL (C)ARTÂO   : " + valC.toFixed(2) + " reais <br />");
        var totalD = ("VALOR  TOTAL (D)INHEIRO : " + valD.toFixed(2) + " reais <br />");
        html += "<p>" + totalV + "</p>";
        html += "<p>" + totalD + "</p>";
        
        html += "</fieldset>";
        // Imprimir Tabela e Total
        document.getElementById("myRel").style.display='inline';
        document.getElementById("container").innerHTML = html;
            
    };

};

// Botão Fechar Relatorio
document.getElementById("btnClose").onclick = function () {
    var modal = document.getElementById("myRel");
    modal.style.display = "none";
};

// Botão  FIM
document.getElementById("btnFim").onclick = function() {
    alert('Sistema sera Encerrado !!!');
    window.close();
};

// Botão Abastecer
document.getElementById("abast").onclick = function() {
    var qtdL = 0;
    abastecer();
};