// 1. Ouvir o clique do botão "Salvar" (CADASTRO)
document.getElementById('form-despesa').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede a página de recarregar

    // Pega os valores
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const categoria = document.getElementById('categoria').value;

    const dados = {
        descricao: descricao,
        valor: valor,
        categoria: categoria
    };

    // Envia para o Python
    const resposta = await fetch('/api/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    if (resposta.ok) {
        alert("Despesa salva com sucesso!");
        carregarTabela(); // Atualiza a lista na hora
        document.getElementById('form-despesa').reset(); // Limpa o formulário
    } else {
        alert("Erro ao salvar despesa.");
    }
});

// 2. Função para mudar o status (ATUALIZAÇÃO)
// Essa função é chamada quando você clica nos botões da tabela
async function atualizarStatus(id, novoStatus) {
    await fetch(`/api/atualizar/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    });

    // Recarrega a tabela para mostrar o novo status
    carregarTabela();
}

// 3. Função para buscar os dados e desenhar a tabela (LEITURA)
async function carregarTabela() {
    const resposta = await fetch('/api/listar');
    const listaDespesas = await resposta.json();
    
    const corpoTabela = document.getElementById('tabela-corpo');
    corpoTabela.innerHTML = ''; // Limpa a tabela antes de preencher

    listaDespesas.forEach(despesa => {
        // Define a cor baseada no status (Visual extra)
        let corStatus = 'black';
        if (despesa.status === 'Aprovado') corStatus = 'green';
        if (despesa.status === 'Rejeitado') corStatus = 'red';

        const linha = `
            <tr>
                <td>${despesa.id}</td>
                <td>${despesa.descricao}</td>
                <td>${despesa.categoria}</td>
                <td>R$ ${despesa.valor.toFixed(2)}</td>
                <td style="color: ${corStatus}; font-weight: bold;">${despesa.status}</td>
                <td>
                    <button onclick="atualizarStatus(${despesa.id}, 'Aprovado')" style="color: green; cursor: pointer; margin-right: 5px;">Aprovar</button>
                    <button onclick="atualizarStatus(${despesa.id}, 'Rejeitado')" style="color: red; cursor: pointer;">Rejeitar</button>
                </td>
            </tr>
        `;
        corpoTabela.innerHTML += linha;
    });
}

// Carregar a tabela assim que a página abrir
carregarTabela();