let tempoRestante = 7 * 60 * 1000; // 10 minutos
let msVisual = 0;

const timer = setInterval(() => {
    if (tempoRestante <= 0) {
        clearInterval(timer);

        // Remove o título antigo
        const titulo = document.querySelector("#cronometro .titulo");
        if (titulo) titulo.remove();

        // Atualiza o contador para a mensagem final
        const tempo = document.getElementById('tempo');
        tempo.textContent = "OFERTA QUASE ESGOTADA!";
        tempo.classList.add("piscar"); // adiciona a classe que faz piscar
        return;
    }

    let minutos = Math.floor(tempoRestante / 60000);
    let segundos = Math.floor((tempoRestante % 60000) / 1000);

    minutos = minutos < 10 ? '0'+minutos : minutos;
    segundos = segundos < 10 ? '0'+segundos : segundos;

    msVisual = (msVisual + 1) % 31;
    let msText = msVisual < 10 ? '0'+msVisual : msVisual;

    document.getElementById('tempo').textContent = `${minutos}:${segundos}:${msText}`;

    tempoRestante -= 33;
}, 33);

function copiarID(codigo, botao) {
    navigator.clipboard.writeText(codigo)
        .then(() => {
            botao.innerText = "Copiado!";
            setTimeout(() => {
                botao.innerText = "Copiar";
            }, 1500);
        });
}

// Detecta TikTok
const isTikTok = /TikTok/i.test(navigator.userAgent);

window.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".produto");

    links.forEach(link => {
        link.addEventListener("click", function(e) {

            if (isTikTok) {
                e.preventDefault();

                const url = this.href;
                mostrarOverlay(url);
            }
        });
    });

});

let linkDestino = "";

function mostrarOverlay(url) {
    linkDestino = url;
    document.getElementById("overlay-tiktok").style.display = "flex";

    if (/Android/i.test(navigator.userAgent)) {
        setTimeout(() => {
            abrirFora();
        }, 1200);
    }
}

function abrirFora() {
    const url = linkDestino;

    if (/Android/i.test(navigator.userAgent)) {
        let clean = url.replace(/^https?:\/\//, '');
        window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
    } else {
        alert("Toque nos 3 pontos e selecione 'Abrir no navegador'");
    }
}