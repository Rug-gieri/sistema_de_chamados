// Dados de exemplo (em um sistema real, estes dados viriam de uma API)
const categorias = [
    { id: 1, nome: "Hardware", descricao: "Problemas relacionados a equipamentos físicos", icone: "🖥️" },
    { id: 2, nome: "Software", descricao: "Problemas relacionados a programas e aplicativos", icone: "💻" },
    { id: 3, nome: "Rede", descricao: "Problemas de conectividade e infraestrutura de rede", icone: "🌐" },
    { id: 4, nome: "Acesso", descricao: "Problemas com credenciais e permissões de acesso", icone: "🔑" }
];

const tiposChamado = [
    { id: 1, categoria_id: 1, nome: "Computador não liga", descricao: "Equipamento não está ligando", prioridade: "alta" },
    { id: 2, categoria_id: 1, nome: "Tela com defeito", descricao: "Problemas com monitor ou display", prioridade: "media" },
    { id: 3, categoria_id: 1, nome: "Teclado/Mouse com defeito", descricao: "Problemas com periféricos", prioridade: "baixa" },
    { id: 4, categoria_id: 2, nome: "Programa não abre", descricao: "Aplicativo não inicia corretamente", prioridade: "media" },
    { id: 5, categoria_id: 2, nome: "Sistema lento", descricao: "Programa ou sistema operacional com lentidão", prioridade: "media" },
    { id: 6, categoria_id: 2, nome: "Erro ao instalar software", descricao: "Dificuldade na instalação de aplicativos", prioridade: "baixa" },
    { id: 7, categoria_id: 3, nome: "Sem acesso à internet", descricao: "Não consegue conectar à internet", prioridade: "alta" },
    { id: 8, categoria_id: 3, nome: "Rede lenta", descricao: "Conexão com velocidade reduzida", prioridade: "media" },
    { id: 9, categoria_id: 4, nome: "Esqueci minha senha", descricao: "Não consigo acessar o sistema", prioridade: "alta" },
    { id: 10, categoria_id: 4, nome: "Acesso negado", descricao: "Não tenho permissão para acessar recurso", prioridade: "media" }
];

// Dados do usuário atual (em um sistema real, viria do login)
const usuarioAtual = {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@empresa.com",
    departamento: "Vendas"
};

// Chamados de exemplo
let chamados = [
    {
        id: 1,
        titulo: "Computador não liga",
        descricao: "O computador da minha mesa não está ligando quando aperto o botão power",
        categoria_id: 1,
        tipo_chamado_id: 1,
        usuario_id: 2,
        prioridade: "alta",
        status: "aberto",
        data_abertura: "2023-05-15 10:30:00"
    },
    {
        id: 2,
        titulo: "Programa não abre",
        descricao: "O Excel não está abrindo, aparece uma mensagem de erro",
        categoria_id: 2,
        tipo_chamado_id: 4,
        usuario_id: 2,
        prioridade: "media",
        status: "em_andamento",
        data_abertura: "2023-05-10 14:20:00"
    }
];

// Função para carregar categorias na página
function carregarCategorias() {
    const container = document.getElementById('categorias-container');
    container.innerHTML = '';
    
    categorias.forEach(categoria => {
        const card = document.createElement('div');
        card.className = 'categoria-card';
        card.setAttribute('data-id', categoria.id);
        card.innerHTML = `
            <div class="categoria-icon">${categoria.icone}</div>
            <h3>${categoria.nome}</h3>
            <p>${categoria.descricao}</p>
        `;
        card.addEventListener('click', () => selecionarCategoria(categoria.id));
        container.appendChild(card);
    });
}

// Função para selecionar uma categoria
function selecionarCategoria(categoriaId) {
    document.getElementById('selecao-categoria').style.display = 'none';
    document.getElementById('selecao-tipo').style.display = 'block';
    
    // Carregar tipos de chamado para a categoria selecionada
    carregarTiposChamado(categoriaId);
}

// Função para carregar tipos de chamado
function carregarTiposChamado(categoriaId) {
    const container = document.getElementById('tipos-container');
    container.innerHTML = '';
    
    const tiposFiltrados = tiposChamado.filter(tipo => tipo.categoria_id === categoriaId);
    
    tiposFiltrados.forEach(tipo => {
        const card = document.createElement('div');
        card.className = 'tipo-card';
        card.setAttribute('data-id', tipo.id);
        card.innerHTML = `
            <h3>${tipo.nome}</h3>
            <p>${tipo.descricao}</p>
            <span class="tipo-prioridade prioridade-${tipo.prioridade}">${tipo.prioridade.toUpperCase()}</span>
        `;
        card.addEventListener('click', () => selecionarTipoChamado(tipo.id, categoriaId));
        container.appendChild(card);
    });
}

// Função para selecionar um tipo de chamado
function selecionarTipoChamado(tipoId, categoriaId) {
    document.getElementById('selecao-tipo').style.display = 'none';
    document.getElementById('formulario-detalhes').style.display = 'block';
    
    // Preencher campos ocultos
    document.getElementById('categoria-id').value = categoriaId;
    document.getElementById('tipo-chamado-id').value = tipoId;
    
    // Preencher título automaticamente se possível
    const tipoSelecionado = tiposChamado.find(tipo => tipo.id === tipoId);
    if (tipoSelecionado) {
        document.getElementById('titulo').value = tipoSelecionado.nome;
    }
}

// Função para carregar chamados do usuário
function carregarMeusChamados() {
    const tbody = document.querySelector('#tabela-chamados tbody');
    tbody.innerHTML = '';
    
    const meusChamados = chamados.filter(chamado => chamado.usuario_id === usuarioAtual.id);
    
    meusChamados.forEach(chamado => {
        const categoria = categorias.find(cat => cat.id === chamado.categoria_id);
        const tipo = tiposChamado.find(tipo => tipo.id === chamado.tipo_chamado_id);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${chamado.id}</td>
            <td>${chamado.titulo}</td>
            <td>${categoria ? categoria.nome : 'N/A'}</td>
            <td>${tipo ? tipo.nome : 'N/A'}</td>
            <td><span class="tipo-prioridade prioridade-${chamado.prioridade}">${chamado.prioridade.toUpperCase()}</span></td>
            <td><span class="status-badge status-${chamado.status}">${chamado.status.replace('_', ' ').toUpperCase()}</span></td>
            <td>${new Date(chamado.data_abertura).toLocaleDateString('pt-BR')}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para abrir um novo chamado
function abrirChamado(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('form-chamado'));
    const novoChamado = {
        id: chamados.length + 1,
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        categoria_id: parseInt(formData.get('categoria_id')),
        tipo_chamado_id: parseInt(formData.get('tipo_chamado_id')),
        usuario_id: usuarioAtual.id,
        prioridade: formData.get('prioridade'),
        status: 'aberto',
        data_abertura: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    
    chamados.push(novoChamado);
    
    alert('Chamado aberto com sucesso! Número: ' + novoChamado.id);
    
    // Resetar formulário e voltar para a seleção de categoria
    document.getElementById('form-chamado').reset();
    document.getElementById('formulario-detalhes').style.display = 'none';
    document.getElementById('selecao-categoria').style.display = 'block';
    
    // Atualizar lista de chamados se estiver na página correta
    if (document.getElementById('meus-chamados-page').style.display !== 'none') {
        carregarMeusChamados();
    }
}

// Navegação entre páginas
function navegarPara(pagina) {
    // Esconder todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Mostrar a página selecionada
    document.getElementById(`${pagina}-page`).style.display = 'block';
    
    // Resetar o fluxo de novo chamado se necessário
    if (pagina === 'novo-chamado') {
        document.getElementById('selecao-categoria').style.display = 'block';
        document.getElementById('selecao-tipo').style.display = 'none';
        document.getElementById('formulario-detalhes').style.display = 'none';
        carregarCategorias();
    } else if (pagina === 'meus-chamados') {
        carregarMeusChamados();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Carregar categorias na inicialização
    carregarCategorias();
    
    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pagina = this.getAttribute('data-page');
            navegarPara(pagina);
        });
    });
    
    // Botões de voltar
    document.getElementById('voltar-categorias').addEventListener('click', function() {
        document.getElementById('selecao-tipo').style.display = 'none';
        document.getElementById('selecao-categoria').style.display = 'block';
    });
    
    document.getElementById('voltar-tipos').addEventListener('click', function() {
        document.getElementById('formulario-detalhes').style.display = 'none';
        document.getElementById('selecao-tipo').style.display = 'block';
    });
    
    // Formulário de chamado
    document.getElementById('form-chamado').addEventListener('submit', abrirChamado);
    
    // Iniciar na página inicial
    navegarPara('home');
});