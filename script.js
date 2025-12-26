// 1. Efeito de Neve
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let flocos = [];

function criarNeve() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flocos = [];
    for (let i = 0; i < 150; i++) {
        flocos.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * 1
        });
    }
}

function animarNeve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let f of flocos) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    
    for (let f of flocos) {
        f.y += Math.cos(f.d) + 1 + f.r / 2;
        if (f.y > canvas.height) {
            f.y = -10;
            f.x = Math.random() * canvas.width;
        }
    }
    requestAnimationFrame(animarNeve);
}

// 2. Filtros
function filtrar(tipo) {
    const itens = document.querySelectorAll('.item');
    const botoes = document.querySelectorAll('.filter-btn');

    botoes.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    itens.forEach(item => {
        if (tipo === 'todos') {
            item.style.display = 'block';
        } else {
            item.classList.contains(tipo) ? item.style.display = 'block' : item.style.display = 'none';
        }
    });
}

// 3. Modal (Abrir Foto/Vídeo)
function abrirModal(elemento) {
    const modal = document.getElementById('modal');
    const conteudo = document.getElementById('modalConteudo');
    const midiaOriginal = elemento.querySelector('img, video');
    
    modal.style.display = 'flex';
    
    if (midiaOriginal.tagName === 'IMG') {
        conteudo.innerHTML = `<img src="${midiaOriginal.src}">`;
    } else {
        conteudo.innerHTML = `<video src="${midiaOriginal.src}" controls autoplay></video>`;
    }
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modalConteudo').innerHTML = '';
}

// Iniciar
window.addEventListener('resize', criarNeve);
criarNeve();
animarNeve();