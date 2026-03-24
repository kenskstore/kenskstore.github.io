window.addEventListener("DOMContentLoaded", () => {

    // ================= CRONÔMETRO =================
    let tempoRestante = 7 * 60 * 1000;
    let msVisual = 0;

    setInterval(() => {

        if (tempoRestante <= 0) {

            const titulo = document.querySelector("#cronometro .titulo");
            if (titulo) titulo.remove();

            const tempoEl = document.getElementById("tempo");

            if (tempoEl) {
                tempoEl.textContent = "OFERTA QUASE ESGOTADA!";
                tempoEl.classList.add("piscar");
            }

            return;
        }

        let minutos = Math.floor(tempoRestante / 60000);
        let segundos = Math.floor((tempoRestante % 60000) / 1000);

        minutos = minutos < 10 ? '0'+minutos : minutos;
        segundos = segundos < 10 ? '0'+segundos : segundos;

        msVisual = (msVisual + 1) % 31;
        let msText = msVisual < 10 ? '0'+msVisual : msVisual;

        const tempoEl = document.getElementById("tempo");

        if (tempoEl) {
            tempoEl.textContent = `${minutos}:${segundos}:${msText}`;
        }

        tempoRestante -= 33;

    }, 33);


    // ================= TIKTOK FIX =================
    const isTikTok = /TikTok|TTWebView/i.test(navigator.userAgent);

    if (isTikTok) {
        const overlay = document.getElementById("overlay-tiktok");

        if (overlay) {
            overlay.style.display = "flex";
        }
    }

});


// ================= ABRIR FORA =================
function abrirFora() {

    const url = window.location.href;

    if (/Android/i.test(navigator.userAgent)) {
        let clean = url.replace(/^https?:\/\//, '');
        window.location.href = "intent://" + clean + "#Intent;scheme=https;end;";
    } else {
        alert("Toque nos 3 pontos e selecione 'Abrir no navegador'");
    }

}