const STORAGE_KEY = "enem2026_calendar_progress_v1";
const THEME_KEY = "enem2026_calendar_theme_v1";

// ------------------------
// Tema
// ------------------------
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
}
function loadTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
}

// ------------------------
// Progresso
// ------------------------
function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
}
function saveProgress(p) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

let progress = loadProgress();

// ------------------------
// Meses e progressão
// ------------------------
const MONTHS = [
    { name: "Janeiro", phase: "Base/Adaptação", tag: "base", daysPerWeek: 3 },
    { name: "Fevereiro", phase: "Base/Adaptação", tag: "base", daysPerWeek: 3 },
    { name: "Março", phase: "Consolidação", tag: "consolidacao", daysPerWeek: 4 },
    { name: "Abril", phase: "Consolidação", tag: "consolidacao", daysPerWeek: 4 },
    { name: "Maio", phase: "Consolidação", tag: "consolidacao", daysPerWeek: 4 },
    { name: "Junho", phase: "Aprofundamento", tag: "aprofundamento", daysPerWeek: 5 },
    { name: "Julho", phase: "Aprofundamento", tag: "aprofundamento", daysPerWeek: 5 },
    { name: "Agosto", phase: "Aprofundamento", tag: "aprofundamento", daysPerWeek: 5 },
    { name: "Setembro", phase: "Reta Final", tag: "retafinal", daysPerWeek: 6 },
    { name: "Outubro", phase: "Reta Final", tag: "retafinal", daysPerWeek: 6 },
    { name: "Novembro", phase: "Reta Final", tag: "retafinal", daysPerWeek: 6 }
];

const SESSION_TEMPLATE = "2h: 70min teoria + 40min questões + 10min revisão/erros.";

const TIPS = {
    "Matemática": "Faça questões com calma e depois acelere. ENEM cobra interpretação + modelagem. Anote a 'ideia' por trás do erro.",
    "Natureza": "Natureza é leitura + raciocínio. Foque em gráficos, unidades, interpretação e relações (causa/efeito).",
    "Linguagens": "Não é decorar: é entender texto. Treine identificar intenção, ironia, tese, e relações entre parágrafos.",
    "Humanas": "Aprenda por contexto e consequência. ENEM cobra interpretação histórica e social, não datas soltas.",
    "Redação": "Treine tese + repertório + proposta detalhada. Sempre revise C1–C5 e reescreva 1 parte melhor.",
    "Simulado": "Simulado sem correção não vale. Corrija, entenda o motivo e anote padrões de erro.",
};

const CONTENT_BY_MONTH = {
    Janeiro: [
        { area: "Matemática", title: "Porcentagem + Regra de 3", details: SESSION_TEMPLATE },
        { area: "Linguagens", title: "Interpretação de texto (técnicas)", details: "Leitura ativa + 10 questões ENEM." },
        { area: "Matemática", title: "Razão e proporção", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Física: Cinemática básica + gráficos", details: "Velocidade média, gráficos, leitura." },
        { area: "Redação", title: "Redação (tema social)", details: "Escrever + corrigir (C1–C5)." },
        { area: "Matemática", title: "Equações do 1º grau + problemas", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Química: Matéria + separação de misturas", details: "Teoria + 10 questões + revisão 7 dias." },
        { area: "Matemática", title: "Função do 1º grau + gráficos", details: SESSION_TEMPLATE },
        { area: "Humanas", title: "Geografia: Globalização e impactos", details: "Teoria + 10 questões." },
        { area: "Simulado", title: "Mini simulado (30) + correção", details: "Cronometrar + analisar erros." }
    ],
    Fevereiro: [
        { area: "Matemática", title: "Frações + problemas", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Biologia: Ecologia", details: "Teoria + 10 questões." },
        { area: "Linguagens", title: "Gramática essencial + interpretação", details: "Questões ENEM + análise." },
        { area: "Matemática", title: "Potência e raiz (aplicada)", details: SESSION_TEMPLATE },
        { area: "Redação", title: "Redação (cidadania/tecnologia)", details: "Escrever + corrigir." },
        { area: "Simulado", title: "Mini simulado (45) + correção", details: "Separar erros por assunto." }
    ],
    Março: [
        { area: "Matemática", title: "Função do 2º grau (intro)", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Física: Dinâmica (Newton)", details: "Teoria + questões." },
        { area: "Natureza", title: "Química: Ligações químicas", details: "Teoria + questões." },
        { area: "Humanas", title: "Urbanização e problemas urbanos", details: "Teoria + questões." },
        { area: "Redação", title: "Redação semanal + correção", details: "Foco em tese + repertório." },
        { area: "Simulado", title: "Simulado mensal + correção", details: "90 questões parcial ou 2 dias." }
    ],
    Abril: [
        { area: "Matemática", title: "Geometria plana (áreas)", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Química: Soluções e concentração", details: "Teoria + questões." },
        { area: "Linguagens", title: "Funções da linguagem + interpretação", details: "Questões ENEM." },
        { area: "Redação", title: "Redação semanal + correção", details: "Melhorar introdução/conclusão." },
        { area: "Simulado", title: "Simulado mensal + correção", details: "Anotar padrões de erro." }
    ],
    Maio: [
        { area: "Matemática", title: "Estatística + gráficos", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Biologia: Genética (básico)", details: "Teoria + questões." },
        { area: "Humanas", title: "Brasil República (linha do tempo)", details: "Teoria + questões." },
        { area: "Redação", title: "Redação semanal + correção", details: "Argumentação + proposta." },
        { area: "Simulado", title: "Simulado mensal + correção", details: "Refazer erradas." }
    ],
    Junho: [
        { area: "Matemática", title: "Probabilidade + combinatória", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Estequiometria (ENEM)", details: "Teoria + questões." },
        { area: "Natureza", title: "Física: Eletrostática (intro)", details: "Teoria + questões." },
        { area: "Redação", title: "Redação semanal + correção", details: "C1–C5." },
        { area: "Simulado", title: "Simulado quinzenal + correção", details: "Separar erros." }
    ],
    Julho: [
        { area: "Matemática", title: "Geometria espacial (volumes)", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Física: Trabalho e energia", details: "Questões + revisão." },
        { area: "Natureza", title: "Orgânica (funções orgânicas)", details: "Teoria + questões." },
        { area: "Redação", title: "Redação semanal + correção", details: "Repertório e proposta." },
        { area: "Simulado", title: "Simulado quinzenal + correção", details: "Cronometrar." }
    ],
    Agosto: [
        { area: "Matemática", title: "Trigonometria aplicada", details: SESSION_TEMPLATE },
        { area: "Natureza", title: "Ondulatória", details: "Teoria + questões." },
        { area: "Natureza", title: "Fisiologia humana", details: "Sistemas + questões." },
        { area: "Redação", title: "Redação semanal + correção", details: "Treino de tempo." },
        { area: "Simulado", title: "Simulado quinzenal + correção", details: "Análise de erros." }
    ],
    Setembro: [
        { area: "Simulado", title: "Simulado semanal + correção", details: "Prova real. Corrigir é obrigatório." },
        { area: "Redação", title: "Redação 2x/semana", details: "Tema + repertório + correção pesada." },
        { area: "Matemática", title: "Listas difíceis + erros", details: "Só questões e correção." },
        { area: "Natureza", title: "Listas difíceis + erros", details: "Só questões e correção." },
        { area: "Linguagens", title: "Questões cronometradas", details: "Treino de tempo." },
        { area: "Humanas", title: "Revisão rápida + questões", details: "Mapas mentais." }
    ],
    Outubro: [
        { area: "Simulado", title: "Simulado semanal + correção", details: "Refazer erradas." },
        { area: "Redação", title: "Redação 2x/semana", details: "Proposta detalhada." },
        { area: "Matemática", title: "Revisão total (pontos fracos)", details: "Refazer erros." },
        { area: "Natureza", title: "Revisão total (pontos fracos)", details: "Refazer erros." },
        { area: "Linguagens", title: "Interpretação + treino", details: "Manter ritmo." },
        { area: "Humanas", title: "Questões + revisão", details: "Foco em acerto." }
    ],
    Novembro: [
        { area: "Simulado", title: "Simulado semanal + revisão final", details: "Sem conteúdo novo pesado." },
        { area: "Redação", title: "Redação 2x/semana", details: "Manter consistência." },
        { area: "Revisão", title: "Revisão geral (24h/7d/30d)", details: "Refazer erros." },
        { area: "Matemática", title: "Questões selecionadas", details: "Alta incidência." },
        { area: "Natureza", title: "Questões selecionadas", details: "Alta incidência." },
        { area: "Linguagens", title: "Leitura e interpretação", details: "Manter ritmo." }
    ]
};

function makeTaskId(monthIndex, week, day) {
    return `m${monthIndex}-w${week}-d${day}`;
}

function buildTasks() {
    const tasks = [];
    MONTHS.forEach((m, idx) => {
        const list = CONTENT_BY_MONTH[m.name] || [];
        const weeks = 4;
        let cursor = 0;

        for (let w = 1; w <= weeks; w++) {
            for (let d = 1; d <= m.daysPerWeek; d++) {
                const item = list[cursor % list.length];
                cursor++;

                tasks.push({
                    id: makeTaskId(idx + 1, w, d),
                    month: m.name,
                    monthIndex: idx + 1,
                    phase: m.phase,
                    tag: m.tag,
                    daysPerWeek: m.daysPerWeek,
                    week: w,
                    day: d,
                    area: item.area,
                    title: item.title,
                    details: item.details
                });
            }
        }
    });
    return tasks;
}

const TASKS = buildTasks();

// ------------------------
// UI
// ------------------------
const monthSelect = document.getElementById("monthSelect");
const phaseSelect = document.getElementById("phaseSelect");
const searchInput = document.getElementById("searchInput");

const calendar = document.getElementById("calendar");
const monthInfo = document.getElementById("monthInfo");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const totalTasksEl = document.getElementById("totalTasks");
const doneTasksEl = document.getElementById("doneTasks");
const pendingTasksEl = document.getElementById("pendingTasks");

// Modal
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDetails = document.getElementById("modalDetails");
const modalTips = document.getElementById("modalTips");

const tagMonth = document.getElementById("tagMonth");
const tagPhase = document.getElementById("tagPhase");
const tagArea = document.getElementById("tagArea");

const modalClose = document.getElementById("modalClose");
const modalToggleDone = document.getElementById("modalToggleDone");

let activeTask = null;

// ------------------------
// Helpers
// ------------------------
function isDone(id) {
    return Boolean(progress[id]);
}

function setDone(id, value) {
    progress[id] = value;
    saveProgress(progress);
}

function fillMonthSelect() {
    monthSelect.innerHTML = "";
    MONTHS.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.name;
        opt.textContent = `${m.name} • ${m.phase} • ${m.daysPerWeek}x/sem`;
        monthSelect.appendChild(opt);
    });
}

function calcProgress(list) {
    const total = list.length;
    const done = list.filter(t => isDone(t.id)).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, percent };
}

function matchesFilters(task) {
    const month = monthSelect.value;
    const phase = phaseSelect.value;
    const query = searchInput.value.trim().toLowerCase();

    if (task.month !== month) return false;
    if (phase !== "todos" && task.tag !== phase) return false;

    if (query) {
        const text = `${task.title} ${task.details} ${task.area}`.toLowerCase();
        if (!text.includes(query)) return false;
    }

    return true;
}

// ------------------------
// Modal
// ------------------------
function openModal(task) {
    activeTask = task;

    modalTitle.textContent = `Semana ${task.week} • Dia ${task.day} — ${task.title}`;
    modalMeta.textContent = `Sessão de 2h • ${task.area}`;
    modalDetails.textContent = task.details;

    tagMonth.textContent = task.month;
    tagPhase.textContent = task.phase;
    tagArea.textContent = task.area;

    modalTips.textContent = TIPS[task.area] || "Mantenha consistência, corrija erros e revise em 7 dias.";

    const done = isDone(task.id);
    modalToggleDone.textContent = done ? "↩️ Marcar como pendente" : "✅ Marcar como concluída";

    modalOverlay.classList.remove("hidden");
}

function closeModal() {
    modalOverlay.classList.add("hidden");
    activeTask = null;
}

// ------------------------
// Render calendário
// ------------------------
function renderStats() {
    const global = calcProgress(TASKS);
    const monthTasks = TASKS.filter(t => t.month === monthSelect.value);
    const monthStats = calcProgress(monthTasks);

    totalTasksEl.textContent = monthStats.total;
    doneTasksEl.textContent = monthStats.done;
    pendingTasksEl.textContent = monthStats.total - monthStats.done;

    progressText.textContent = `${monthStats.percent}%`;
    progressFill.style.width = `${monthStats.percent}%`;

    const monthConfig = MONTHS.find(m => m.name === monthSelect.value);
    monthInfo.textContent = `${monthConfig.phase} • ${monthConfig.daysPerWeek}x/sem • 4 semanas`;
}

function renderCalendar() {
    calendar.innerHTML = "";

    const monthTasks = TASKS.filter(matchesFilters);

    const weeks = [1, 2, 3, 4];
    weeks.forEach(w => {
        const weekWrap = document.createElement("div");
        weekWrap.className = "week";

        const header = document.createElement("div");
        header.className = "week-header";
        header.innerHTML = `
      <h3>Semana ${w}</h3>
      <span class="badge">${monthTasks.filter(t => t.week === w).length} tarefas</span>
    `;

        const grid = document.createElement("div");
        grid.className = "week-grid";

        const tasksWeek = monthTasks.filter(t => t.week === w);

        tasksWeek.forEach(task => {
            const card = document.createElement("div");
            card.className = "task-card";
            if (isDone(task.id)) card.classList.add("done");

            card.addEventListener("click", () => openModal(task));

            const top = document.createElement("div");
            top.className = "task-top";

            const title = document.createElement("h4");
            title.textContent = `Dia ${task.day}: ${task.title}`;

            const badge = document.createElement("span");
            badge.className = "badge area";
            badge.textContent = task.area;

            top.appendChild(title);
            top.appendChild(badge);

            const bottom = document.createElement("div");
            bottom.className = "task-bottom";

            const small = document.createElement("span");
            small.className = "small";
            small.textContent = isDone(task.id) ? "✔ Concluída" : "⏳ Pendente";

            const phase = document.createElement("span");
            phase.className = "badge phase";
            phase.textContent = task.phase;

            bottom.appendChild(small);
            bottom.appendChild(phase);

            card.appendChild(top);
            card.appendChild(bottom);

            grid.appendChild(card);
        });

        weekWrap.appendChild(header);
        weekWrap.appendChild(grid);
        calendar.appendChild(weekWrap);
    });
}

function render() {
    renderStats();
    renderCalendar();
}

// ------------------------
// Eventos
// ------------------------
monthSelect.addEventListener("change", render);
phaseSelect.addEventListener("change", render);
searchInput.addEventListener("input", render);

document.getElementById("btnTheme").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
});

document.getElementById("btnPrint").addEventListener("click", () => window.print());

document.getElementById("btnReset").addEventListener("click", () => {
    const ok = confirm("Tem certeza que deseja resetar o progresso do mês selecionado?");
    if (!ok) return;

    const month = monthSelect.value;
    TASKS.filter(t => t.month === month).forEach(t => {
        delete progress[t.id];
    });

    saveProgress(progress);
    render();
});

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

modalToggleDone.addEventListener("click", () => {
    if (!activeTask) return;
    const done = isDone(activeTask.id);
    setDone(activeTask.id, !done);
    saveProgress(progress);
    openModal(activeTask); // atualiza texto do botão
    render();
});

// ESC fecha modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// ------------------------
// Init
// ------------------------
fillMonthSelect();
setTheme(loadTheme());
monthSelect.value = "Janeiro";
render();
