function obterSigno(dataNascimento) {
    // Extrai o mês e o dia da data de nascimento
    const [ano, mes, dia] = dataNascimento.split('-').map(Number);

    // Define as datas de início e fim de cada signo
    const datasSignos = {
        'Áries': { inicio: '03-21', fim: '04-19' },
        'Touro': { inicio: '04-20', fim: '05-20' },
        'Gêmeos': { inicio: '05-21', fim: '06-20' },
        'Câncer': { inicio: '06-21', fim: '07-22' },
        'Leão': { inicio: '07-23', fim: '08-22' },
        'Virgem': { inicio: '08-23', fim: '09-22' },
        'Libra': { inicio: '09-23', fim: '10-22' },
        'Escorpião': { inicio: '10-23', fim: '11-21' },
        'Sagitário': { inicio: '11-22', fim: '12-21' },
        'Capricórnio': { inicio: '12-22', fim: '01-19' },
        'Aquário': { inicio: '01-20', fim: '02-18' },
        'Peixes': { inicio: '02-19', fim: '03-20' }
    };

    // Formata o mês e o dia da data de nascimento para o mesmo formato das datas de início e fim dos signos
    const mesDiaFormatado = `${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

    // Encontra o signo correspondente à data de nascimento
    for (const signo in datasSignos) {
        const { inicio, fim } = datasSignos[signo];
        if ((inicio <= fim && inicio <= mesDiaFormatado && mesDiaFormatado <= fim) ||
            (inicio > fim && (inicio <= mesDiaFormatado || mesDiaFormatado <= fim))) {
            return signo;
        }
    }

    // Se a data de nascimento não corresponder a nenhum signo conhecido, retorna 'Desconhecido'
    return 'Desconhecido';
}

function hoscopo() {
    const nome = document.getElementById('campo_nome').value;
    const dataInput = document.getElementById('campo_data').value;
    const partes = dataInput.split('-').map(Number);
    const dataFormatada = `${partes[1]}-${partes[2]}`; // Formata a data para o formato MM-DD
    const signo = obterSigno(dataFormatada);

    fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=${dataInput}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter os dados da API');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Aqui você pode manipular os dados recebidos da API
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
