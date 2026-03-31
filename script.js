// ─── Último Pixel — script.js ─────────────────────────────────────────────

// Ponto de integração com o Construct 3
// Substitua pela URL do seu export quando estiver pronto
const GAME_URL = "";

// Injeta a URL no iframe da página de jogo (se existir)
const gameFrame = document.getElementById("game-frame");
if (gameFrame && GAME_URL) {
  gameFrame.src = GAME_URL;
}

// ─── Espaço para lógica futura ────────────────────────────────────────────
// Ex: receber mensagens do jogo via postMessage
// window.addEventListener("message", (event) => { ... });