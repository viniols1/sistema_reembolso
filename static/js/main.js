document.getElementById('form-despesa').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const categoria = document.getElementById('categoria').value;

    const dados = {
        descricao: descricao,
        valor: valor,
        categoria: categoria
    };

    const resposta = await fetch('/api/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    if (resposta.ok) {
        alert("Despesa salva com sucesso!");
        carregarTabela(); 
        document.getElementById('form-despesa').reset(); 
    } else {
        alert("Erro ao salvar despesa.");
    }
});

async function atualizarStatus(id, novoStatus) {
    await fetch(`/api/atualizar/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    });
    carregarTabela();
}

async function carregarTabela() {
    const resposta = await fetch('/api/listar');
    const listaDespesas = await resposta.json();
    
    const corpoTabela = document.getElementById('tabela-corpo');
    corpoTabela.innerHTML = ''; 

    let totalAcumulado = 0; 

    listaDespesas.forEach(despesa => {
    
        totalAcumulado += despesa.valor;

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

    const valorFormatado = totalAcumulado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('total-valor').innerText = valorFormatado;
}

carregarTabela();