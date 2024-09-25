const canvas = document.getElementById('transitionCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 1000;

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: 0,
            y: Math.random() * canvas.height,
            vx: Math.random() * 5,
            vy: (Math.random() - 0.5) * 2,
            life: Math.random() * 100 + 50
        });
    }
}

function updateParticles() {
    particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        if (particle.life <= 0 || particle.x > canvas.width) {
            particles.splice(index, 1);
        }
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fill();
    });
}

function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

function startTransition() {
    const page = document.getElementById('currentPage');
    createParticles();
    page.style.opacity = 0;

    setTimeout(() => {
        page.textContent = 'Nuova Pagina';
        page.style.opacity = 1;
    }, 1000);
}

animate();
