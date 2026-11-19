const menuButton = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.textContent = open ? '×' : '☰' });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '☰' }));
const weddingDate = new Date('2027-02-10T12:30:00+05:30').getTime();
function updateCountdown() { const now = Date.now(); let diff = Math.max(0, weddingDate - now); const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 }; for (const [id, size] of Object.entries(units)) { const el = document.getElementById(id); el.textContent = String(Math.floor(diff / size)); diff %= size } }
updateCountdown(); setInterval(updateCountdown, 1000);
const gate = document.getElementById('opening-gate');
const openToken = document.getElementById('open-token');
const gateOpenVideo = document.getElementById('gate-video-open');
const courtyardVideo = document.getElementById('gate-video-courtyard');
const weddingAudio = document.getElementById('wedding-audio');
const musicToggle = document.getElementById('music-toggle');

if (gate) document.body.classList.add('gate-locked');

async function setMusicPlaying(playing) {
    if (playing) {
        try { await weddingAudio.play(); musicToggle.setAttribute('aria-pressed', 'true'); musicToggle.setAttribute('aria-label', 'Pause music') } catch (error) { musicToggle.setAttribute('aria-pressed', 'false') }
    } else {
        weddingAudio.pause(); musicToggle.setAttribute('aria-pressed', 'false'); musicToggle.setAttribute('aria-label', 'Play music')
    }
}

openToken?.addEventListener('click', async () => {
    setMusicPlaying(true);
    gate.classList.add('gate-playing-open');
    try { await gateOpenVideo.play() } catch (error) { setTimeout(() => gateOpenVideo.dispatchEvent(new Event('ended')), 600) }
});

gateOpenVideo?.addEventListener('ended', () => {
    gate.classList.remove('gate-playing-open');
    gate.classList.add('gate-playing-courtyard');
    courtyardVideo.currentTime = 0;
    courtyardVideo.play().catch(() => { });
    courtyardVideo.loop = true;
    window.setTimeout(() => {
        gate.classList.add('is-open');
        document.body.classList.remove('gate-locked');
    }, 5600);
});

musicToggle?.addEventListener('click', () => setMusicPlaying(weddingAudio.paused));

const scratchCard = document.querySelector('.scratch-card');
const scratchCanvas = document.querySelector('.scratch-canvas');

if (scratchCard && scratchCanvas) {
    const context = scratchCanvas.getContext('2d', { willReadFrequently: true });
    let drawing = false;

    function prepareScratchCard() {
        const bounds = scratchCard.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;
        scratchCanvas.width = Math.round(bounds.width * pixelRatio);
        scratchCanvas.height = Math.round(bounds.height * pixelRatio);
        scratchCanvas.style.width = `${bounds.width}px`;
        scratchCanvas.style.height = `${bounds.height}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const coating = context.createLinearGradient(0, 0, bounds.width, bounds.height);
        coating.addColorStop(0, '#cbb27d');
        coating.addColorStop(.48, '#f0dfb0');
        coating.addColorStop(1, '#b79a60');
        context.fillStyle = coating;
        context.fillRect(0, 0, bounds.width, bounds.height);

        context.globalAlpha = .55;
        context.fillStyle = '#76623d';
        context.font = '500 11px "DM Sans", sans-serif';
        context.textAlign = 'center';
        context.fillText('SCRATCH HERE', bounds.width / 2, bounds.height / 2);
        context.globalAlpha = 1;
    }

    function scratchAt(event) {
        const bounds = scratchCanvas.getBoundingClientRect();
        const point = event.touches ? event.touches[0] : event;
        const x = point.clientX - bounds.left;
        const y = point.clientY - bounds.top;
        context.save();
        context.globalCompositeOperation = 'destination-out';
        context.beginPath();
        context.arc(x, y, 20, 0, Math.PI * 2);
        context.fill();
        context.restore();
        checkScratchCompletion();
    }

    function checkScratchCompletion() {
        const pixels = context.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height).data;
        let cleared = 0;
        const step = 16;
        for (let index = 3; index < pixels.length; index += step) {
            if (pixels[index] === 0) cleared++;
        }
        if (cleared / (pixels.length / step) > .46) {
            scratchCanvas.style.transition = 'opacity .45s ease';
            scratchCanvas.style.opacity = '0';
            scratchCard.querySelector('.scratch-instruction')?.remove();
            drawing = false;
        }
    }

    prepareScratchCard();
    window.addEventListener('resize', prepareScratchCard);

    scratchCanvas.addEventListener('pointerdown', event => { drawing = true; scratchCanvas.setPointerCapture(event.pointerId); scratchAt(event); });
    scratchCanvas.addEventListener('pointermove', event => { if (drawing) scratchAt(event); });
    scratchCanvas.addEventListener('pointerup', () => { drawing = false; });
    scratchCanvas.addEventListener('pointercancel', () => { drawing = false; });
}