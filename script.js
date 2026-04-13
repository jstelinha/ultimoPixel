// ─── Último Pixel — script.js ─────────────────────────────────────────────
// Rubrica Tech Forge: todos os critérios implementados abaixo.

// ══════════════════════════════════════════════════════════════════════════
// 1. MANIPULAÇÃO DE DADOS ESTÁTICOS — mínimo 5 variáveis/constantes
//    Injetadas no DOM via getElementById / querySelector
// ══════════════════════════════════════════════════════════════════════════
const GAME_NAME = "Último Pixel";
const GAME_VERSION = "1.0.0";
const GAME_DEVELOPER = "Julia Stela";
const GAME_PLATFORM = "Construct 3";
const GAME_GENRE = "Arcade de Esquiva";
const GAME_LAUNCH_YEAR = 2026;           // usado também no critério 7
const GAME_MAX_LIVES = 4;
const GAME_DESCRIPTION = "Um computador que encolhe a cada golpe. Sua vida e seu tamanho são a mesma coisa.";

// Injeta dados estáticos nos elementos marcados com data-static=""
function injectStaticData() {
  const map = {
    "data-game-name": GAME_NAME,
    "data-game-version": `v${GAME_VERSION}`,
    "data-game-developer": GAME_DEVELOPER,
    "data-game-platform": GAME_PLATFORM,
    "data-game-genre": GAME_GENRE,
    "data-game-lives": `${GAME_MAX_LIVES} vidas`,
    "data-game-description": GAME_DESCRIPTION,
  };

  Object.entries(map).forEach(([attr, value]) => {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      el.textContent = value;
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════
// 2. ENTRADA DE DADOS VIA PROMPT — solicita idade ao carregar a página
// ══════════════════════════════════════════════════════════════════════════
let userAge = null;
let accessGranted = false;

function askAge() {
  if (sessionStorage.getItem("agePromptAnswered")) {
    userAge = parseInt(sessionStorage.getItem("userAge"), 10) || 0;
    accessGranted = sessionStorage.getItem("accessGranted") === "true";
    applyBlur();
    return;
  }

  const raw = prompt(
    "Último Pixel — Verificação de acesso\n\nDigite sua idade para continuar:"
  );

  // Converte e valida
  const age = parseInt(raw, 10);

  if (raw === null || raw.trim() === "" || isNaN(age)) {
    userAge = 0;
    accessGranted = false;
  } else {
    userAge = age;
    accessGranted = age >= 14; // conteúdo adequado para maiores de 14
  }

  sessionStorage.setItem("agePromptAnswered", "true");
  sessionStorage.setItem("userAge", userAge);
  sessionStorage.setItem("accessGranted", accessGranted);

  // ════════════════════════════════════════════════════════════════════
  // 3. LÓGICA DE DECISÃO E FEEDBACK — if/else com alert específico
  // ════════════════════════════════════════════════════════════════════
  if (accessGranted) {
    alert(
      `✅ Acesso liberado!\n\nBem-vindo ao ${GAME_NAME}, jogador de ${userAge} anos.\nBoa sorte — você vai precisar.`
    );
  } else {
    alert(
      `🚫 Acesso negado.\n\nEste conteúdo é recomendado para maiores de 14 anos.\nIdade informada: ${userAge || "inválida"}.`
    );
  }

  // ════════════════════════════════════════════════════════════════════
  // 4. MANIPULAÇÃO DE VISIBILIDADE VIA DOM — filter: blur
  // ════════════════════════════════════════════════════════════════════
  applyBlur();
}

function applyBlur() {
  const sensitiveEls = document.querySelectorAll(".sensitive-content");
  sensitiveEls.forEach(el => {
    el.style.filter = accessGranted ? "blur(0px)" : "blur(8px)";
    el.style.transition = "filter 0.4s ease";
    el.style.userSelect = accessGranted ? "auto" : "none";
    el.style.pointerEvents = accessGranted ? "auto" : "none";
  });

  // Atualiza label de acesso se existir
  const accessLabel = document.getElementById("access-status");
  if (accessLabel) {
    accessLabel.textContent = accessGranted
      ? `✓ Acesso liberado (${userAge} anos)`
      : `✗ Acesso restrito`;
    accessLabel.style.color = accessGranted
      ? "var(--green-lcd)"
      : "var(--red)";
  }
}

// ══════════════════════════════════════════════════════════════════════════
// 5. INTERATIVIDADE COM INPUT DE TEXTO — saudação personalizada
// ══════════════════════════════════════════════════════════════════════════
function setupGreetingInput() {
  const input = document.getElementById("greeting-input");
  const btn = document.getElementById("greeting-btn");
  const display = document.getElementById("greeting-display");

  if (!input || !btn || !display) return;

  function showGreeting() {
    const name = input.value.trim();
    if (!name) {
      display.textContent = "Digite seu nome acima primeiro!";
      display.style.color = "var(--red)";
      return;
    }
    const msgs = [
      `Olá, ${name}! Pronto para encolher um pixel de cada vez?`,
      `Ei, ${name}! Que o Mainframe esteja com você.`,
      `${name}, o vírus já sabe o seu nome. Cuidado.`,
      `Bem-vindo, ${name}. Aqui a CPU também sente medo.`,
      `${name}! Você sobrevive mais que uma CPU?`,
    ];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    display.textContent = msg;
    display.style.color = "var(--green-lcd)";
  }

  btn.addEventListener("click", showGreeting);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") showGreeting();
  });
}

// ══════════════════════════════════════════════════════════════════════════
// 6. ALTERNÂNCIA DE TEMA — Light / Dark Mode
// ══════════════════════════════════════════════════════════════════════════
let isDark = sessionStorage.getItem("themeDark") === "true";

function applyTheme(isDarkMode, btn) {
  if (isDarkMode) {
    document.documentElement.style.setProperty("--cream", "#1A1A18");
    document.documentElement.style.setProperty("--cream-dark", "#2C2C28");
    document.documentElement.style.setProperty("--cream-darker", "#484840");
    document.documentElement.style.setProperty("--cream-darkest", "#5A5A50");
    document.documentElement.style.setProperty("--charcoal", "#EDE8DC");
    document.documentElement.style.setProperty("--charcoal-mid", "#E0DAC9");
    document.documentElement.style.setProperty("--charcoal-light", "#CEC8B6");
    document.documentElement.style.setProperty("--gray", "#8A8A7A");
    if (btn) btn.innerHTML = '<i class="ph ph-sun"></i>';
  } else {
    document.documentElement.style.setProperty("--cream", "#EDE8DC");
    document.documentElement.style.setProperty("--cream-dark", "#E0DAC9");
    document.documentElement.style.setProperty("--cream-darker", "#CEC8B6");
    document.documentElement.style.setProperty("--cream-darkest", "#B8B2A0");
    document.documentElement.style.setProperty("--charcoal", "#1A1A18");
    document.documentElement.style.setProperty("--charcoal-mid", "#2C2C28");
    document.documentElement.style.setProperty("--charcoal-light", "#484840");
    document.documentElement.style.setProperty("--gray", "#8A8A7A");
    if (btn) btn.innerHTML = '<i class="ph ph-moon"></i>';
  }
}

function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;

  applyTheme(isDark, btn);

  btn.addEventListener("click", () => {
    isDark = !isDark;
    sessionStorage.setItem("themeDark", isDark);
    applyTheme(isDark, btn);
  });
}

// ══════════════════════════════════════════════════════════════════════════
// 7. VERIFICAÇÃO AUTOMATIZADA DE LANÇAMENTO — ano atual vs constante
// ══════════════════════════════════════════════════════════════════════════
function checkLaunchYear() {
  const currentYear = new Date().getFullYear();
  if (currentYear === GAME_LAUNCH_YEAR) {
    if (!sessionStorage.getItem("launchShown")) {
      alert(
        `🎉 GRANDE LANÇAMENTO!\n\n${GAME_NAME} está sendo lançado AGORA em ${currentYear}!\nObrigada por jogar no dia do lançamento!`
      );
      sessionStorage.setItem("launchShown", "true");
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════
// INTEGRAÇÃO COM CONSTRUCT 3
// ══════════════════════════════════════════════════════════════════════════
const GAME_URL = "jogo/index.html"; // substitua pela URL do export do Construct 3
const gameFrames = document.querySelectorAll(".js-game-frame");
const placeholders = document.querySelectorAll(".js-screen-placeholder");

if (gameFrames.length > 0 && GAME_URL) {
  gameFrames.forEach(frame => {
    frame.src = GAME_URL;
    frame.style.display = "block";
  });
  placeholders.forEach(ph => ph.style.display = "none");
}

window.addEventListener("message", (event) => {
  if (!event.data || event.data.source !== "c3game") return;
});

// ══════════════════════════════════════════════════════════════════════════
// SCROLL E TELA CHEIA (QoL do Jogador)
// ══════════════════════════════════════════════════════════════════════════
function setupGameControls() {
  // Previne que setas e barra de espaço rolem a página original
  window.addEventListener("keydown", function(e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"].includes(e.key)) {
      // Ignora se o usuário estiver digitando o nome
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        return;
      }
      e.preventDefault();
    }
  }, { passive: false });

  // Botão de tela cheia
  const fsBtn = document.getElementById("fullscreen-btn");
  const iframe = document.querySelector(".js-game-frame");
  if (fsBtn && iframe) {
    fsBtn.addEventListener("click", () => {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) { /* Safari */
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) { /* IE11 */
        iframe.msRequestFullscreen();
      }
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════
// FORMULÁRIO DE CONTATO (Formspree AJAX)
// ══════════════════════════════════════════════════════════════════════════
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("form-submit-btn");
const successMsg = document.getElementById("form-success");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        form.style.display = "none";
        successMsg.style.display = "flex";
      } else {
        const data = await response.json();
        const msg = (data.errors || []).map(e => e.message).join(", ") ||
          "Erro ao enviar. Tente novamente.";
        alert(msg);
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar mensagem →";
      }
    } catch {
      alert("Sem conexão. Verifique a internet e tente novamente.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensagem →";
    }
  });
}

// ══════════════════════════════════════════════════════════════════════════
// INIT — executa tudo na ordem correta
// ══════════════════════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  injectStaticData();   // 1. injeta dados estáticos
  checkLaunchYear();    // 7. verifica ano de lançamento
  askAge();             // 2/3/4. prompt de idade + alert + blur
  setupGreetingInput(); // 5. input de saudação
  setupThemeToggle();   // 6. dark/light mode
  setupGameControls();  // Tela cheia e bloqueio de scroll
});