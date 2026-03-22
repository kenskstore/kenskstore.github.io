let tempoRestante = 10 * 60 * 1000; // 10 minutos em milissegundos
let msVisual = 0; // contador de 0 a 30 para efeito visual

const timer = setInterval(() => {
    if (tempoRestante <= 0) {
        clearInterval(timer);
        document.getElementById('tempo').textContent = "Oferta encerrada!";
        return;
    }

    let minutos = Math.floor(tempoRestante / 60000);
    let segundos = Math.floor((tempoRestante % 60000) / 1000);

    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    // Milissegundos visuais de 0 a 30
    msVisual = (msVisual + 1) % 31; 
    let msText = msVisual < 10 ? '0'+msVisual : msVisual;

    document.getElementById('tempo').textContent = `${minutos}:${segundos}:${msText}`;

    tempoRestante -= 33; // decrementa 33ms (~30 steps por segundo)
}, 33);