document.addEventListener('DOMContentLoaded'), function() {
    // Menu mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const navUl = document.querySelector('nav ul');
   
    menuMobile.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
   
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('show');
            }
        });
    });
   
    // Equipe de fisioterapeutas
    const fisioterapeutas = [
        {
            nome: 'Ana Carrara',
            especialidade: ['uroginecologia', 'gravidez'],
            foto: 'ana.jpg',
            descricao: 'Especialista em uroginecologia e cuidados no pós-parto.'
        },
        {
            nome: 'Fernando',
            especialidade: ['saude-mental'],
            foto: 'fernando.jpg',
            descricao: 'Especialista em saúde mental e terapias integrativas.'
        },
        {
            nome: 'Isadora',
            especialidade: ['gravidez', 'uroginecologia'],
            foto: 'isadora.jpg',
            descricao: 'Especialista em preparação para o parto e recuperação pós-parto.'
        },
        {
            nome: 'Larissa',
            especialidade: ['uroginecologia'],
            foto: 'larissa.jpg',
            descricao: 'Especialista em disfunções do assoalho pélvico.'
        },
        {
            nome: 'Isa',
            especialidade: ['gravidez'],
            foto: 'isa.jpg',
            descricao: 'Especialista em cuidados durante a gravidez.'
        },
        {
            nome: 'Julia',
            especialidade: ['uroginecologia', 'saude-mental'],
            foto: 'julia.jpg',
            descricao: 'Especialista em uroginecologia e saúde mental feminina.'
        },
        {
            nome: 'Malu',
            especialidade: ['gravidez', 'saude-mental'],
            foto: 'malu.jpg',
            descricao: 'Especialista em saúde mental na gestação e puerpério.'
        },
        {
            nome: 'Naiara',
            especialidade: ['uroginecologia', 'gravidez'],
            foto: 'naiara.jpg',
            descricao: 'Especialista em cuidados uroginecológicos e gestacionais.'
        }
    ];
   
    // Gerar cards da equipe
    const equipeGrid = document.querySelector('.equipe-grid');
   
    fisioterapeutas.forEach(fisio => {
        const card = document.createElement('div');
        card.className = 'fisioterapeuta-card';
       
        let especialidadesHTML = '';
        fisio.especialidade.forEach(esp => {
            let espNome = '';
            if (esp === 'uroginecologia') espNome = 'Uroginecologia';
            if (esp === 'gravidez') espNome = 'Gravidez/Pós-Parto';
            if (esp === 'saude-mental') espNome = 'Saúde Mental';
           
            especialidadesHTML += `<span class="especialidade-badge">${espNome}</span>`;
        });
       
        card.innerHTML = `
            <div class="fisioterapeuta-img">
                <img src="images/fisioterapeutas/${fisio.foto || 'default.jpg'}" alt="${fisio.nome}">
            </div>
            <div class="fisioterapeuta-info">
                <h3>${fisio.nome}</h3>
                <p>${fisio.descricao}</p>
                <div class="especialidades">${especialidadesHTML}</div>
            </div>
        `;
       
        equipeGrid.appendChild(card);
    });
   
    // Formulário de agendamento
    const formAgendamento = document.getElementById('form-agendamento');
    const especialidadeSelect = document.getElementById('especialidade');
    const fisioterapeutaSelect = document.getElementById('fisioterapeuta');
    const dataInput = document.getElementById('data');
    const horarioSelect = document.getElementById('horario');
    const modal = document.getElementById('modal-agendamento');
    const resumoAgendamento = document.getElementById('resumo-agendamento');
    const closeModal = document.querySelector('.close-modal');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
   
    // Atualizar fisioterapeutas com base na especialidade selecionada
    especialidadeSelect.addEventListener('change', function() {
        const especialidade = this.value;
       
        fisioterapeutaSelect.innerHTML = '<option value="">Selecione</option>';
       
        if (!especialidade) return;
       
        const fisiosFiltrados = fisioterapeutas.filter(fisio =>
            fisio.especialidade.includes(especialidade)
        );
       
        fisiosFiltrados.forEach(fisio => {
            const option = document.createElement('option');
            option.value = fisio.nome;
            option.textContent = fisio.nome;
            fisioterapeutaSelect.appendChild(option);
        });
    });
   
    // Configurar campo de data
    const hoje = new Date();
    const dd = String(hoje.getDate()).padStart(2, '0');
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const yyyy = hoje.getFullYear();
   
    dataInput.min = `${yyyy}-${mm}-${dd}`;
   
    // Gerar horários disponíveis
    function gerarHorarios() {
        horarioSelect.innerHTML = '<option value="">Selecione</option>';
       
        const horarios = [];
        const inicioManha = 8;
        const fimManha = 12;
        const inicioTarde = 13;
        const fimTarde = 19;
       
        // Adicionar horários da manhã
        for (let h = inicioManha; h <= fimManha; h++) {
            horarios.push(`${h}:00`);
            if (h !== fimManha) {
                horarios.push(`${h}:30`);
            }
        }
       
        // Adicionar horários da tarde
        for (let h = inicioTarde; h <= fimTarde; h++) {
            horarios.push(`${h}:00`);
            if (h !== fimTarde) {
                horarios.push(`${h}:30`);
            }
        }
       
        // Adicionar opções ao select
        horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });
    }
   
    // Verificar se é sábado e ajustar horários
    dataInput.addEventListener('change', function() {
        const dataSelecionada = new Date(this.value);
        const diaSemana = dataSelecionada.getDay(); // 0=Domingo, 6=Sábado
       
        horarioSelect.innerHTML = '<option value="">Selecione</option>';
       
        const horarios = [];
        const inicioManha = 8;
        const fimManha = 12;
        const inicioTarde = 13;
        const fimTarde = diaSemana === 6 ? 13 : 19; // Sábado só até 13h
       
        // Adicionar horários da manhã
        for (let h = inicioManha; h <= fimManha; h++) {
            horarios.push(`${h}:00`);
            if (h !== fimManha) {
                horarios.push(`${h}:30`);
            }
        }
       
        // Adicionar horários da tarde se não for sábado
        if (diaSemana !== 6) {
            for (let h = inicioTarde; h <= fimTarde; h++) {
                horarios.push(`${h}:00`);
                if (h !== fimTarde) {
                    horarios.push(`${h}:30`);
                }
            }
        }
       
        // Adicionar opções ao select
        horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });
    });
   
    // Gerar horários iniciais
    gerarHorarios();
   
    // Enviar formulário
    formAgendamento.addEventListener('submit', function(e) {
        e.preventDefault();
       
        // Obter valores do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const especialidade = especialidadeSelect.value;
        const fisioterapeuta = fisioterapeutaSelect.value;
        const data = dataInput.value;
        const horario = horarioSelect.value;
       
        // Formatar data
        const dataObj = new Date(data);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
       
        // Formatar especialidade
        let especialidadeFormatada = '';
        if (especialidade === 'uroginecologia') especialidadeFormatada = 'Uroginecologia';
        if (especialidade === 'gravidez') especialidadeFormatada = 'Gravidez e Pós-Parto';
        if (especialidade === 'saude-mental') especialidadeFormatada = 'Saúde Mental';
       
        // Criar resumo do agendamento
        resumoAgendamento.innerHTML = `
            <p><strong>Paciente:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Especialidade:</strong> ${especialidadeFormatada}</p>
            <p><strong>Fisioterapeuta:</strong> ${fisioterapeuta}</p>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Horário:</strong> ${horario}</p>
            <p class="confirmacao">Seu agendamento foi confirmado! Entraremos em contato para confirmar os detalhes.</p>
        `;
       
        // Mostrar modal
        modal.style.display = 'block';
       
        // Limpar formulário
        formAgendamento.reset();
        fisioterapeutaSelect.innerHTML = '<option value="">Selecione a especialidade primeiro</option>';
        gerarHorarios();
    });
   
    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
   
    btnFecharModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
   
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
  {
// Suavizar rolagem para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor)
    anchor.addEventListener('click')
}
}
