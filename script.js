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