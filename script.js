// Confetti Animation
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = ['#ff6f61', '#facc15', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}
setInterval(createConfetti, 150);

// Music Player
const audio = document.getElementById('birthdaySong');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play Song';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause Song';
    }
    isPlaying = !isPlaying;
});

// Surprise Button
document.getElementById('surpriseBtn').addEventListener('click', () => {
    document.getElementById('surpriseText').classList.remove('hidden');
    document.getElementById('surpriseImg').classList.remove('hidden');
    document.getElementById('surpriseBtn').classList.add('hidden');
});

// Favorite Dish Quiz
const dishButtons = document.querySelectorAll('.dish-btn');
const quizResult = document.getElementById('quizResult');

dishButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedDish = button.dataset.dish;
        quizResult.classList.remove('hidden');
        if (selectedDish === 'Dal Bati') {
            quizResult.textContent = 'Yay! You got it right! Dal Bati is Roshni’s favorite! 🎉';
            quizResult.classList.add('text-green-600');
            triggerFireworks();
        } else {
            quizResult.textContent = 'Yar, tujhe hamari birthday girl ki favorite dish nahi pata! 😜';
            quizResult.classList.add('text-red-600', 'animate-shake');
            setTimeout(() => quizResult.classList.remove('animate-shake'), 500);
        }
    });
});

// Fireworks Effect
function triggerFireworks() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const fireworks = [];

    for (let i = 0; i < 10; i++) {
        fireworks.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            targetY: Math.random() * canvas.height * 0.5,
            speed: Math.random() * 5 + 5,
            particles: [],
            exploded: false
        });
    }

    function createParticles(firework) {
        for (let i = 0; i < 50; i++) {
            firework.particles.push({
                x: firework.x,
                y: firework.y,
                radius: Math.random() * 3 + 1,
                color: ['#ff6f61', '#facc15', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)],
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 5 + 2,
                life: 100
            });
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach(firework => {
            if (!firework.exploded) {
                firework.y -= firework.speed;
                ctx.beginPath();
                ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
                if (firework.y <= firework.targetY) {
                    firework.exploded = true;
                    createParticles(firework);
                }
            } else {
                firework.particles.forEach(p => {
                    p.x += Math.cos(p.angle) * p.speed;
                    p.y += Math.sin(p.angle) * p.speed;
                    p.life -= 2;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                });
                firework.particles = firework.particles.filter(p => p.life > 0);
            }
        });
        if (fireworks.some(f => f.particles.length > 0)) {
            requestAnimationFrame(animateFireworks);
        }
    }

    animateFireworks();
}

// Background Canvas Animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 150; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 6 + 3,
        color: ['#ff6f61', '#facc15', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)],
        speed: Math.random() * 3 + 1
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Family Slider
const familyNodes = document.querySelectorAll('.family-node');
const familyTree = document.getElementById('familyTree');
const familyNextButtons = document.querySelectorAll('.family-next');
let currentFamilyIndex = 0;

familyNextButtons.forEach(button => {
    button.addEventListener('click', () => {
        familyNodes[currentFamilyIndex].classList.add('hidden');
        currentFamilyIndex++;
        if (currentFamilyIndex < familyNodes.length) {
            familyNodes[currentFamilyIndex].classList.remove('hidden');
        } else {
            familyTree.classList.remove('hidden');
        }
    });
});

// Friend Slider
const friendNodes = document.querySelectorAll('.friend-node');
const friendCircle = document.getElementById('friendCircle');
const friendNextButtons = document.querySelectorAll('.friend-next');
let currentFriendIndex = 0;

friendNextButtons.forEach(button => {
    button.addEventListener('click', () => {
        friendNodes[currentFriendIndex].classList.add('hidden');
        currentFriendIndex++;
        if (currentFriendIndex < friendNodes.length) {
            friendNodes[currentFriendIndex].classList.remove('hidden');
        } else {
            friendCircle.classList.remove('hidden');
        }
    });
});

// Memory Slider
const memorySlides = document.querySelectorAll('.memory-slide');
const prevMemoryBtn = document.getElementById('prevMemory');
const nextMemoryBtn = document.getElementById('nextMemory');
let currentMemoryIndex = 0;

function showMemorySlide(index) {
    memorySlides.forEach((slide, i) => {
        slide.classList.toggle('hidden', i !== index);
    });
}

nextMemoryBtn.addEventListener('click', () => {
    currentMemoryIndex = (currentMemoryIndex + 1) % memorySlides.length;
    showMemorySlide(currentMemoryIndex);
});

prevMemoryBtn.addEventListener('click', () => {
    currentMemoryIndex = (currentMemoryIndex - 1 + memorySlides.length) % memorySlides.length;
    showMemorySlide(currentMemoryIndex);
});

// Video Message
const videoBtn = document.getElementById('videoBtn');
const videoMessage = document.getElementById('videoMessage');

videoBtn.addEventListener('click', () => {
    videoMessage.classList.remove('hidden');
    videoMessage.play();
    videoBtn.classList.add('hidden');
});