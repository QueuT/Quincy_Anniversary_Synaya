const loader = document.getElementById("loader");
const app = document.getElementById("app");
const loadingText = document.getElementById("loadingText");
const startBtn = document.getElementById("startBtn");

const loadingLines = [
  "Finding cutest memories...",
  "Counting all the times I missed you...",
  "Adding sparkles...",
  "Loading love.exe..."
];

let line = 0;
const loadingInterval = setInterval(() => {
  loadingText.textContent = loadingLines[line % loadingLines.length];
  line++;
}, 650);

setTimeout(() => {
  clearInterval(loadingInterval);
  loader.classList.add("hidden");
  app.classList.remove("hidden");
}, 3100);

startBtn.addEventListener("click", () => {
  document.querySelector(".reveal").scrollIntoView({ behavior: "smooth" });
});


const photos = [
  "assets/photos/anniversary1.jpg",
  "assets/photos/anniversary2.jpg",
  "assets/photos/anniversary3.jpg",
  "assets/photos/anniversary4.jpg",
  "assets/photos/anniversary5.jpg",
  "assets/photos/anniversary6.jpg",
  "assets/photos/anniversary7.jpg",
  "assets/photos/anniversary8.jpg",
  "assets/photos/anniversary9.jpg"
];

let photoIndex = 0;
const slideImage = document.getElementById("slideImage");
const photoCount = document.getElementById("photoCount");

function updatePhoto() {
  slideImage.src = photos[photoIndex];
  photoCount.textContent = `${photoIndex + 1} / ${photos.length}`;
}

document.getElementById("prevPhoto").addEventListener("click", () => {
  photoIndex = (photoIndex - 1 + photos.length) % photos.length;
  updatePhoto();
});

document.getElementById("nextPhoto").addEventListener("click", () => {
  photoIndex = (photoIndex + 1) % photos.length;
  updatePhoto();
});

setInterval(() => {
  photoIndex = (photoIndex + 1) % photos.length;
  updatePhoto();
}, 4500);

const letters = {
  beautiful: "Hey beautiful, just wanted to remind you that you are stunning inside and out. I hope you see yourself the way I see you, because you're truly breathtaking. 💖  Song of Solomon 4:7 – \"You are altogether beautiful, my love; there is no flaw in you\"",
  reassurance: "Hey sweetie, I want you to know that you are strong and capable of overcoming anything that comes your way. I believe in you completely and will always be here to support you. 💕 Colossians 3:14 – \"And over all these virtues put on love, which binds them all together in perfect unity\" ",
  future: "Hey gorgeous, I can't wait to see what the future holds for us. I know it's going to be amazing because I'm going to be right there with you every step of the way. 🌟  1 Thessalonians 5:11 – \"Therefore encourage one another and build each other up, just as in fact you are doing\"",
  weak: "Hey baby, I know things have been tough lately, but please remember that you are not alone. I'm here for you, and we'll get through this together. 💗  Isaiah 40:31 – \"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary...\"",
  afraid: "Hey love, I know you're feeling scared right now, but I want you to know that I'm here to protect you and make sure you feel safe. You're braver than you think. 💪 1 John 4:18 – \"There is no fear in love; but perfect love casts out fear...\"",
  serve: "Hey mama, I see how much you care about others and how selfless you are. That's one of the things I love most about you! 🌟  Proverbs 31:25 – \"She is clothed with strength and dignity; she can laugh at the days to come\"",
  peace: "Hey sweetie, whenever life gets overwhelming, just remember that there's a safe place waiting for you, a place where all your worries can be put aside and where you can find true peace. 💖 Psalm 46:5 – \"God is within her, she will not fall; God will help her at break of day\""
};

const letterBox = document.getElementById("letterBox");
document.querySelectorAll(".envelope").forEach(btn => {
  btn.addEventListener("click", () => {
    letterBox.innerHTML = letters[btn.dataset.letter];
    sparkleBurst();
  });
});

// EDIT THESE TONIGHT. Add specific moments only you two understand.
const memories = [
  "Remember when we reviewed Crumbl Cookies together?",
  "Remember how you made me say 'I love you'?",
  "Remember when you first fell in love with me?",
  "Remember when you first met my dad?",
  "Remember how we spent Christmas together?",
  "Remember the aquarium date in Korea?",
  "Remember what this relationship is built on?",
  "Remember why we choose each other?"
];

const memoryBtn = document.getElementById("memoryBtn");
const memoryOutput = document.getElementById("memoryOutput");

memoryBtn.addEventListener("click", () => {
  const random = memories[Math.floor(Math.random() * memories.length)];
  memoryOutput.textContent = random;
  memoryOutput.style.animation = "none";
  void memoryOutput.offsetWidth;
  memoryOutput.style.animation = "pop .35s ease";
  sparkleBurst();
});

// Floating kawaii effects
const floatingLayer = document.getElementById("floatingLayer");
const floaties = ["💖", "🌸", "✨", "💕", "⭐", "🎀"];

function createFloating() {
  const el = document.createElement("div");
  el.className = "floating";
  el.textContent = floaties[Math.floor(Math.random() * floaties.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (Math.random() * 18 + 18) + "px";
  el.style.animationDuration = (Math.random() * 4 + 5) + "s";
  floatingLayer.appendChild(el);

  setTimeout(() => el.remove(), 9000);
}

setInterval(createFloating, 2000);

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Final surprise + confetti
const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");

finalBtn.addEventListener("click", () => {
  finalMessage.classList.remove("hidden");
  runConfetti();
  sparkleBurst();
  finalMessage.scrollIntoView({ behavior: "smooth", block: "center" });
});

function sparkleBurst() {
  for (let i = 0; i < 14; i++) {
    setTimeout(createFloating, i * 40);
  }
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function runConfetti() {
  confetti = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 3,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 3 + 2,
    emoji: ["💖", "🌸", "✨", "💕"][Math.floor(Math.random() * 4)]
  }));

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      ctx.font = `${p.r * 3}px serif`;
      ctx.fillText(p.emoji, p.x, p.y);
    });

    frames++;
    if (frames < 220) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  animate();
}
