// ================= CRONÔMETRO =================
let tempoRestante = 7 * 60 * 1000;
let msVisual = 0;

const timer = setInterval(() => {
    if (tempoRestante <= 0) {
        clearInterval(timer);

        const titulo = document.querySelector("#cronometro .titulo");
        if (titulo) titulo.remove();

        const tempo = document.getElementById('tempo');
        if (tempo) {
            tempo.textContent = "OFERTA QUASE ESGOTADA!";
            tempo.classList.add("piscar");
        }
        return;
    }

    let minutos = Math.floor(tempoRestante / 60000);
    let segundos = Math.floor((tempoRestante % 60000) / 1000);

    minutos = minutos < 10 ? '0'+minutos : minutos;
    segundos = segundos < 10 ? '0'+segundos : segundos;

    msVisual = (msVisual + 1) % 31;
    let msText = msVisual < 10 ? '0'+msText : msVisual;

    const tempo = document.getElementById('tempo');
    if (tempo) {
        tempo.textContent = `${minutos}:${segundos}:${msText}`;
    }

    tempoRestante -= 33;
}, 33);

// ================= COPIAR ID =================
function copiarID(codigo, botao) {
    navigator.clipboard.writeText(codigo)
        .then(() => {
            botao.innerText = "Copiado!";
            setTimeout(() => {
                botao.innerText = "Copiar";
            }, 1500);
        });
}

// ================= TIKTOK FIX =================

// ⚠️ deixa só UMA declaração
const isTikTok = /TikTok|TTWebView/i.test(navigator.userAgent);

let linkDestino = "";

window.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".produto");

    links.forEach(link => {
        link.addEventListener("click", function(e) {

            if (isTikTok) {
                e.preventDefault();
                mostrarOverlay(this.href);
            }
        });
    });

});

// ================= OVERLAY =================
function mostrarOverlay(url) {
    linkDestino = url;

    const overlay = document.getElementById("overlay-tiktok");

    if (overlay) {
        overlay.style.display = "flex";
    }

    if (/Android/i.test(navigator.userAgent)) {
        setTimeout(() => {
            abrirFora();
        }, 1200);
    }
}

// ================= ABRIR FORA =================
function abrirFora() {
    const url = linkDestino;

    if (/Android/i.test(navigator.userAgent)) {
        let clean = url.replace(/^https?:\/\//, '');
        window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
    } else {
        alert("Toque nos 3 pontos e selecione 'Abrir no navegador'");
    }
}