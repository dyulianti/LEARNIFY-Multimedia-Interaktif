const API_PATH = "/api/state";
const APP = {
  currentPage: "splash",
  user: null,
  currentUserId: localStorage.getItem("learnify_current_user") || null,
  loginError: "",
  users: JSON.parse(localStorage.getItem("learnify_users") || "[]"),
  scores: JSON.parse(localStorage.getItem("learnify_scores") || "{}"),
  progress: JSON.parse(localStorage.getItem("learnify_progress") || "{}"),
  badges: JSON.parse(localStorage.getItem("learnify_badges") || "{}"),
  qa: JSON.parse(localStorage.getItem("learnify_qa") || "[]"),
  feedback: JSON.parse(localStorage.getItem("learnify_feedback") || "[]"),
  config: {
    app_title: "Learnify",
    welcome_text: "Selamat Datang di Learnify",
  },
};
const MATERIALS = {
  hardware: {
    title: "Hardware Komputer",
    icon: "cpu",
    color: "#00e5ff",
    lessons: [
      {
        title: "Apa itu Hardware?",
        content:
          "Hardware adalah komponen fisik komputer yang dapat dilihat dan disentuh. Hardware mencakup semua perangkat keras yang membangun sebuah sistem komputer.",
        terms: {
          CPU: "Central Processing Unit - otak komputer yang memproses instruksi",
          RAM: "Random Access Memory - memori sementara untuk data aktif",
          GPU: "Graphics Processing Unit - prosesor khusus grafis",
        },
      },
      {
        title: "Komponen Utama PC",
        content:
          "Sebuah PC terdiri dari motherboard, CPU, RAM, storage, PSU, dan casing. Setiap komponen bekerja bersama untuk menjalankan sistem.",
        terms: {
          Motherboard: "Papan sirkuit utama tempat semua komponen terhubung",
          SSD: "Solid State Drive - penyimpanan cepat tanpa piringan berputar",
          PSU: "Power Supply Unit - menyuplai listrik ke komputer",
        },
      },
      {
        title: "Perangkat Input & Output",
        content:
          "Input device seperti keyboard dan mouse memasukkan data. Output device seperti monitor dan printer menampilkan hasil.",
        terms: {
          Peripheral: "Perangkat tambahan yang terhubung ke komputer",
          Touchscreen:
            "Layar sentuh yang berfungsi sebagai input sekaligus output",
        },
      },
    ],
  },
  software: {
    title: "Software & Sistem Operasi",
    icon: "layers",
    color: "#7c3aed",
    lessons: [
      {
        title: "Jenis-Jenis Software",
        content:
          "Software dibagi menjadi sistem, aplikasi, dan programming. Sistem operasi mengelola hardware, aplikasi membantu pengguna, programming software membantu membuat kode.",
        terms: {
          OS: "Operating System - software yang mengelola semua sumber daya komputer",
          Driver: "Software penghubung antara hardware dan sistem operasi",
          IDE: "Integrated Development Environment - alat pengembangan kode",
        },
      },
      {
        title: "Sistem Operasi Populer",
        content:
          "Windows, macOS, dan Linux adalah OS populer. Setiap OS memiliki keunggulan pada user interface, keamanan, dan dukungan perangkat lunak.",
        terms: {
          OpenSource: "Software dengan kode sumber terbuka untuk umum",
          Kernel: "Inti sistem operasi yang mengelola hardware",
        },
      },
    ],
  },
  network: {
    title: "Jaringan Komputer",
    icon: "wifi",
    color: "#f59e0b",
    lessons: [
      {
        title: "Dasar Jaringan",
        content:
          "Jaringan menghubungkan perangkat untuk bertukar data. Jenis jaringan: LAN, MAN, WAN. Komponen penting: router, switch, modem.",
        terms: {
          LAN: "Local Area Network - jaringan area lokal",
          IPAddress: "Alamat unik setiap perangkat di jaringan",
          Router: "Perangkat untuk mengarahkan lalu lintas jaringan",
        },
      },
      {
        title: "Internet & Protokol",
        content:
          "Internet menggunakan protokol TCP/IP. HTTP untuk web, FTP untuk transfer file, DNS untuk menerjemahkan nama domain.",
        terms: {
          TCPIP: "Transmission Control Protocol/Internet Protocol",
          DNS: "Domain Name System - penerjemah nama domain menjadi IP",
          HTTPS: "HTTP Secure - protokol web terenkripsi",
        },
      },
    ],
  },
  coding: {
    title: "Coding Dasar",
    icon: "code",
    color: "#10b981",
    lessons: [
      {
        title: "Pengenalan Programming",
        content:
          "Programming adalah menulis instruksi untuk komputer. Konsep utama: variabel, kondisi, perulangan, fungsi.",
        terms: {
          Variabel: "Wadah untuk menyimpan data dalam program",
          Fungsi: "Blok kode yang dapat dipanggil berulang kali",
          Loop: "Perulangan untuk menjalankan kode beberapa kali",
        },
      },
      {
        title: "HTML & CSS Dasar",
        content:
          "HTML membuat struktur halaman, CSS mengatur tampilannya. Keduanya merupakan dasar web development bersama JavaScript.",
        terms: {
          Tag: "Elemen dalam HTML seperti <p>, <div>, <h1>",
          Selector: "Aturan CSS yang memilih elemen untuk diberi style",
          Responsive: "Desain yang menyesuaikan ukuran layar",
        },
      },
    ],
  },
};
const FAQ_DATA = [
  {
    q: "Apa itu CPU?",
    a: "CPU adalah otak komputer yang memproses semua instruksi.",
  },
  {
    q: "Perbedaan RAM dan ROM?",
    a: "RAM bersifat sementara, ROM bersifat permanen.",
  },
  {
    q: "Apa itu HTML?",
    a: "HTML adalah bahasa markup untuk membuat struktur halaman web.",
  },
  {
    q: "Apa fungsi router?",
    a: "Router mengarahkan lalu lintas data antar jaringan.",
  },
  {
    q: "Apa itu open source?",
    a: "Open source adalah software dengan kode sumber terbuka.",
  },
  {
    q: "Apa perbedaan HDD dan SSD?",
    a: "SSD lebih cepat karena menggunakan flash memory.",
  },
  { q: "Apa itu IP Address?", a: "Alamat unik setiap perangkat di jaringan." },
  {
    q: "Bahasa pemrograman apa yang paling mudah?",
    a: "Python sering dianggap mudah untuk pemula.",
  },
  {
    q: "Apa itu firewall?",
    a: "Firewall memantau dan mengontrol lalu lintas jaringan.",
  },
  {
    q: "Apa itu cloud computing?",
    a: "Penyediaan layanan komputasi melalui internet.",
  },
];
const BADGES = [
  {
    id: "novice",
    name: "IT Novice",
    desc: "Selesaikan 1 modul",
    icon: "🌱",
    req: (p, s) => Object.values(p).some((v) => v >= 100),
  },
  {
    id: "explorer",
    name: "Tech Explorer",
    desc: "Selesaikan 2 modul",
    icon: "🔍",
    req: (p, s) => Object.values(p).filter((v) => v >= 100).length >= 2,
  },
  {
    id: "architect",
    name: "System Architect",
    desc: "Selesaikan semua modul",
    icon: "🏗️",
    req: (p, s) => Object.values(p).filter((v) => v >= 100).length >= 4,
  },
  {
    id: "quizmaster",
    name: "Quiz Master",
    desc: "Skor kuis 100%",
    icon: "🧠",
    req: (p, s) => Object.values(s).some((v) => v >= 100),
  },
  {
    id: "gamer",
    name: "Game Champion",
    desc: "Skor game ≥ 80",
    icon: "🎮",
    req: (p, s) => (s.dragdrop || 0) >= 80,
  },
];
const QUIZ_QUESTIONS = {
  hardware: [
    {
      q: "CPU adalah singkatan dari?",
      opts: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Program Utility",
        "Core Processing Unit",
      ],
      ans: 0,
    },
    {
      q: "Manakah yang termasuk perangkat output?",
      opts: ["Keyboard", "Mouse", "Monitor", "Scanner"],
      ans: 2,
    },
    {
      q: "SSD lebih cepat dari HDD karena?",
      opts: [
        "Lebih besar",
        "Menggunakan flash memory",
        "Lebih murah",
        "Punya kipas",
      ],
      ans: 1,
    },
  ],
  software: [
    {
      q: "Sistem operasi termasuk jenis software?",
      opts: ["Application", "System", "Programming", "Utility"],
      ans: 1,
    },
    {
      q: "Linux bersifat?",
      opts: ["Closed Source", "Freeware", "Open Source", "Shareware"],
      ans: 2,
    },
    {
      q: "IDE digunakan untuk?",
      opts: [
        "Mengedit foto",
        "Menulis kode program",
        "Browsing internet",
        "Mengelola file",
      ],
      ans: 1,
    },
  ],
  network: [
    {
      q: "LAN adalah jaringan?",
      opts: ["Luas", "Metropolitan", "Lokal", "Global"],
      ans: 2,
    },
    {
      q: "DNS berfungsi untuk?",
      opts: [
        "Menyimpan file",
        "Mengubah domain ke IP",
        "Mengirim email",
        "Mencetak dokumen",
      ],
      ans: 1,
    },
    {
      q: "HTTPS lebih aman karena?",
      opts: ["Lebih cepat", "Terenkripsi", "Gratis", "Terbaru"],
      ans: 1,
    },
  ],
  coding: [
    {
      q: "Bahasa yang paling mudah untuk pemula?",
      opts: ["C++", "Assembly", "Python", "Rust"],
      ans: 2,
    },
    {
      q: "HTML digunakan untuk?",
      opts: ["Styling", "Struktur halaman web", "Database", "Animasi"],
      ans: 1,
    },
    {
      q: "Apa itu variabel?",
      opts: [
        "Tipe font",
        "Wadah penyimpan data",
        "Jenis warna",
        "Ukuran layar",
      ],
      ans: 1,
    },
  ],
};
let quizState = {
  active: false,
  subject: "hardware",
  current: 0,
  score: 0,
  timer: 10,
  answered: false,
  done: false,
  selected: -1,
};
async function loadServerState() {
  try {
    const response = await fetch(API_PATH);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}
async function saveStateToServer() {
  try {
    await fetch(API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        users: APP.users,
        scores: APP.scores,
        progress: APP.progress,
        badges: APP.badges,
        config: APP.config,
        qa: APP.qa,
        feedback: APP.feedback,
      }),
    });
  } catch (error) {}
}
function save() {
  localStorage.setItem("learnify_users", JSON.stringify(APP.users));
  localStorage.setItem("learnify_scores", JSON.stringify(APP.scores));
  localStorage.setItem("learnify_progress", JSON.stringify(APP.progress));
  localStorage.setItem("learnify_badges", JSON.stringify(APP.badges));
  localStorage.setItem("learnify_qa", JSON.stringify(APP.qa));
  localStorage.setItem("learnify_feedback", JSON.stringify(APP.feedback));
  localStorage.setItem("learnify_current_user", APP.currentUserId || "");
  saveStateToServer();
}
function nav(page, data) {
  APP.currentPage = page;
  APP.pageData = data;
  if (page === "login" || page === "register") {
    APP.loginError = "";
  }
  render();
}
function init() {
  loadServerState().then((serverState) => {
    if (serverState) {
      APP.users = serverState.users || APP.users;
      APP.scores = serverState.scores || APP.scores;
      APP.progress = serverState.progress || APP.progress;
      APP.badges = serverState.badges || APP.badges;
      APP.qa = serverState.qa || APP.qa;
      APP.feedback = serverState.feedback || APP.feedback;
      APP.config = Object.assign(APP.config, serverState.config || {});
      save();
    }
    if (APP.currentUserId) {
      APP.user =
        APP.users.find((user) => user.id === APP.currentUserId) || null;
      if (!APP.user) APP.currentUserId = null;
    }
    render();
  });
}
function render() {
  const app = document.getElementById("app");
  const pages = {
    splash: renderSplash,
    login: renderLogin,
    register: renderRegister,
    dashboard: renderDashboard,
    material: renderMaterial,
    lesson: renderLesson,
    quiz: renderQuiz,
    qa: renderQA,
    game: renderGame,
    leaderboard: renderLeaderboard,
    feedback: renderFeedback,
    badges: renderBadges,
    flowchart: renderFlowchart,
  };
  app.innerHTML = (pages[APP.currentPage] || renderDashboard)();
  if (window.lucide && typeof lucide.createIcons === "function")
    lucide.createIcons();
  if (
    APP.currentPage === "quiz" &&
    quizState.active &&
    !quizState.done &&
    !quizState.answered
  )
    startQuizTimer();
  if (APP.currentPage === "game") setTimeout(initDragDrop, 50);
  if (APP.currentPage === "splash")
    setTimeout(() => {
      if (APP.currentPage === "splash")
        nav(APP.user ? "dashboard" : APP.users.length ? "login" : "register");
    }, 3000);
}
function renderSplash() {
  return `<div class="h-full flex items-center justify-center p-4"><div class="w-full max-w-xl rounded-[2rem] bg-surface/90 border border-white/10 p-10 text-center backdrop-blur-xl"><div class="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-accent to-action glow-box"><i data-lucide="terminal" class="w-12 h-12 text-bg"></i></div><h1 class="text-5xl font-heading font-bold gradient-text mb-3">Learnify</h1><p class="text-text/60 text-lg">Platform Belajar IT Interaktif</p></div></div>`;
}
function renderRegister() {
  return `<div class="h-full flex items-center justify-center p-4"><div class="w-full max-w-md rounded-[2rem] bg-surface border border-white/10 p-8"><h2 class="text-3xl font-bold text-accent mb-4">Buat Akun Baru</h2><p class="text-text/60 mb-6">Mulai perjalanan belajar IT-mu sekarang</p><form id="regForm" onsubmit="handleRegister(event)"><label class="block text-sm text-text/70 mb-2">Nama Lengkap</label><input id="regName" type="text" required placeholder="Masukkan namamu" class="w-full mb-4 px-4 py-3 rounded-2xl bg-bg border border-white/10 text-text focus:border-accent outline-none"/><label class="block text-sm text-text/70 mb-2">Email</label><input id="regEmail" type="email" required placeholder="email@sekolah.id" class="w-full mb-4 px-4 py-3 rounded-2xl bg-bg border border-white/10 text-text focus:border-accent outline-none"/><label class="block text-sm text-text/70 mb-2">Kelas</label><select id="regClass" required class="w-full mb-6 px-4 py-3 rounded-2xl bg-bg border border-white/10 text-text focus:border-accent outline-none"><option value="">Pilih Kelas</option><option>X (Sepuluh)</option><option>XI (Sebelas)</option><option>XII (Dua Belas)</option></select><button type="submit" class="w-full rounded-2xl bg-gradient-to-r from-accent to-action py-3 text-bg font-bold">Daftar & Mulai Belajar</button></form><div class="mt-6 text-center text-sm text-text/50">Sudah punya akun? <button type="button" onclick="nav('login')" class="text-accent font-semibold hover:text-action">Masuk di sini</button></div></div></div>`;
}
function renderLogin() {
  return `<div class="h-full flex items-center justify-center p-4"><div class="w-full max-w-md rounded-[2rem] bg-surface border border-white/10 p-8"><h2 class="text-3xl font-bold text-accent mb-4">Masuk ke Learnify</h2><p class="text-text/60 mb-6">Gunakan email yang sudah terdaftar untuk masuk.</p><form id="loginForm" onsubmit="handleLogin(event)"><label class="block text-sm text-text/70 mb-2">Email</label><input id="loginEmail" type="email" required placeholder="email@sekolah.id" class="w-full mb-4 px-4 py-3 rounded-2xl bg-bg border border-white/10 text-text focus:border-accent outline-none"/><button type="submit" class="w-full rounded-2xl bg-gradient-to-r from-accent to-action py-3 text-bg font-bold">Masuk</button></form>${APP.loginError ? `<p class="mt-4 text-sm text-red-400">${APP.loginError}</p>` : ""}${APP.users.length ? `<div class="mt-6"><p class="text-sm text-text/50 mb-3">Atau pilih akun:</p><div class="space-y-3">${APP.users.map((user) => `<button type="button" onclick="loginWithEmail('${user.email}')" class="w-full text-left rounded-2xl bg-surface border border-white/10 px-4 py-3 hover:border-accent transition"><div class="flex items-center gap-3"><span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold">${user.avatar}</span><div><p class="font-semibold">${user.name}</p><p class="text-xs text-text/50">${user.email}</p></div></div></button>`).join("")}</div></div>` : ""}<div class="mt-6 text-center text-sm text-text/50">Belum punya akun? <button type="button" onclick="nav('register')" class="text-accent font-semibold hover:text-action">Daftar sekarang</button></div></div></div>`;
}
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  if (!email) return;
  const user = APP.users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) {
    APP.loginError = "Email belum terdaftar. Silakan daftar terlebih dahulu.";
    render();
    return;
  }
  APP.user = user;
  APP.currentUserId = user.id;
  APP.loginError = "";
  save();
  nav("dashboard");
}
function loginWithEmail(email) {
  const user = APP.users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) {
    APP.loginError = "Akun tidak ditemukan.";
    render();
    return;
  }
  APP.user = user;
  APP.currentUserId = user.id;
  APP.loginError = "";
  save();
  nav("dashboard");
}
function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const kelas = document.getElementById("regClass").value;
  if (!name || !email || !kelas) return;
  const existing = APP.users.find((user) => user.email === email);
  if (existing) {
    APP.user = existing;
    APP.currentUserId = existing.id;
    save();
    nav("dashboard");
    return;
  }
  const user = {
    id: Date.now().toString(),
    name,
    email,
    kelas,
    avatar: name.charAt(0).toUpperCase(),
    joined: new Date().toISOString(),
  };
  APP.users.push(user);
  APP.user = user;
  APP.currentUserId = user.id;
  APP.scores[user.id] = APP.scores[user.id] || {};
  APP.progress[user.id] = APP.progress[user.id] || {};
  APP.badges[user.id] = APP.badges[user.id] || [];
  save();
  nav("dashboard");
}
function getTotalScore(uid) {
  const scores = APP.scores[uid] || {};
  return Object.values(scores).reduce(
    (sum, value) => sum + (Number(value) || 0),
    0,
  );
}
function getTotalProgress(uid) {
  const progress = APP.progress[uid] || {};
  const moduleCount = Object.keys(MATERIALS).length;
  if (!moduleCount) return 0;
  const total = Object.values(progress).reduce(
    (sum, value) => sum + (Number(value) || 0),
    0,
  );
  return Math.round(total / moduleCount) || 0;
}
function renderDashboard() {
  if (!APP.user) return renderRegister();
  const uid = APP.user.id;
  const score = getTotalScore(uid);
  const progress = getTotalProgress(uid);
  const earnedBadges = APP.badges[uid] || [];
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-6xl mx-auto"><div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-accent to-action flex items-center justify-center text-bg font-bold text-xl">${APP.user.avatar}</div><div><h1 class="text-3xl font-heading font-bold text-accent">Learnify</h1><p class="text-sm text-text/40">${APP.user.kelas}</p></div></div><div class="flex flex-wrap gap-3"><button onclick="nav('flowchart')" class="px-4 py-3 rounded-2xl bg-surface border border-white/10 hover:border-accent transition">Flowchart</button><button onclick="nav('badges')" class="px-4 py-3 rounded-2xl bg-surface border border-white/10 hover:border-accent transition">Badge</button><button onclick="APP.user=null;APP.currentUserId=null;save();nav('login')" class="px-4 py-3 rounded-2xl bg-surface border border-white/10 text-red-400 hover:border-red-300 transition">Keluar</button></div></div><div class="rounded-[2rem] bg-gradient-to-r from-action/20 via-accent/10 to-action/20 border border-white/10 p-6 mb-8"><p class="text-text/50 uppercase tracking-[0.25em] text-xs mb-2">${APP.config.welcome_text}</p><h2 class="text-3xl font-bold mb-4">Halo, ${APP.user.name}!</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div class="rounded-2xl bg-bg/80 p-4 border border-white/10"><p class="text-xs text-text/50 uppercase mb-2">Total XP</p><p class="text-2xl font-bold text-accent">${score}</p></div><div class="rounded-2xl bg-bg/80 p-4 border border-white/10"><p class="text-xs text-text/50 uppercase mb-2">Badge</p><p class="text-2xl font-bold text-action">${earnedBadges.length}</p></div><div class="rounded-2xl bg-bg/80 p-4 border border-white/10"><p class="text-xs text-text/50 uppercase mb-2">Progress</p><p class="text-2xl font-bold text-accent">${progress}%</p></div></div><div class="h-2.5 rounded-full bg-bg/60 overflow-hidden border border-white/10"><div class="h-full rounded-full bg-gradient-to-r from-accent to-action" style="width:${progress}%"></div></div></div><h3 class="text-xs uppercase tracking-[0.3em] text-text/40 mb-4">Materi Pembelajaran</h3><div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">${Object.entries(
    MATERIALS,
  )
    .map(([key, material]) => {
      const moduleProg = APP.progress[uid]?.[key] || 0;
      return `<button onclick="nav('material','${key}')" class="group rounded-2xl bg-surface border border-white/10 p-5 text-left hover:border-accent transition"><div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style="background:${material.color}20"><i data-lucide="${material.icon}" class="w-5 h-5" style="color:${material.color}"></i></div><p class="font-semibold mb-2">${material.title}</p><div class="h-2 rounded-full bg-bg/60 overflow-hidden mb-2"><div class="h-full rounded-full" style="width:${moduleProg}%;background:linear-gradient(90deg, ${material.color}, ${material.color}cc)"></div></div><p class="text-xs text-text/40">${Math.round(moduleProg)}%</p></button>`;
    })
    .join(
      "",
    )}</div><h3 class="text-xs uppercase tracking-[0.3em] text-text/40 mb-4">Fitur Lainnya</h3><div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">${[
    { label: "Quick Quiz", icon: "zap", color: "#f59e0b", page: "quiz" },
    {
      label: "Drag & Drop Game",
      icon: "gamepad-2",
      color: "#10b981",
      page: "game",
    },
    {
      label: "Tanya Jawab",
      icon: "message-circle",
      color: "#7c3aed",
      page: "qa",
    },
    {
      label: "Leaderboard",
      icon: "trophy",
      color: "#00e5ff",
      page: "leaderboard",
    },
  ]
    .map(
      (item) =>
        `<button onclick="nav('${item.page}')" class="rounded-2xl bg-surface border border-white/10 p-5 text-left hover:border-accent transition flex gap-4"><div class="w-12 h-12 rounded-2xl flex items-center justify-center" style="background:${item.color}20"><i data-lucide="${item.icon}" class="w-5 h-5" style="color:${item.color}"></i></div><div><p class="font-semibold">${item.label}</p><p class="text-xs text-text/40">Klik untuk buka</p></div></button>`,
    )
    .join(
      "",
    )}</div><button onclick="nav('feedback')" class="w-full rounded-2xl bg-gradient-to-r from-accent to-action py-4 text-bg font-bold">Kirim Feedback</button></div>`;
}
function renderMaterial() {
  const key = String(APP.pageData || "hardware");
  const material = MATERIALS[key];
  if (!material) return renderDashboard();
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-4xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Kembali</button><div class="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8"><div class="w-16 h-16 rounded-[1.5rem] flex items-center justify-center" style="background:${material.color}20"><i data-lucide="${material.icon}" class="w-8 h-8" style="color:${material.color}"></i></div><div><h1 class="text-3xl font-bold mb-2">${material.title}</h1><p class="text-text/40">${material.lessons.length} pelajaran tersedia</p></div></div><div class="space-y-3">${material.lessons.map((lesson, idx) => `<button onclick="nav('lesson','${key}:${idx}')" class="w-full rounded-2xl bg-surface border border-white/10 p-5 text-left hover:border-accent transition"><p class="font-semibold mb-1">${idx + 1}. ${lesson.title}</p><p class="text-xs text-text/50">${lesson.content.slice(0, 70)}...</p></button>`).join("")}</div></div>`;
}
function renderLesson() {
  const raw = String(APP.pageData || "hardware:0");
  const [key, idxText] = raw.split(":");
  const material = MATERIALS[key];
  const idx = Number(idxText) || 0;
  if (!material || !material.lessons[idx]) return nav("material", key);
  const lesson = material.lessons[idx];
  const uid = APP.user?.id;
  if (!uid) return nav("register");
  if (!APP.progress[uid]) APP.progress[uid] = {};
  const step = 100 / material.lessons.length;
  const viewKey = `${key}:${idx}`;
  if (!APP._viewedLessons) APP._viewedLessons = new Set();
  if (!APP._viewedLessons.has(viewKey)) {
    APP._viewedLessons.add(viewKey);
    APP.progress[uid][key] = Math.min(
      100,
      (APP.progress[uid][key] || 0) + step,
    );
    save();
    checkBadges();
  }
  const termsHtml = Object.entries(lesson.terms || {})
    .map(
      ([term, def]) =>
        `<details class="bg-surface border border-white/10 rounded-2xl"><summary class="px-4 py-3 cursor-pointer text-sm font-medium">💡 ${term}</summary><div class="px-4 pb-4 text-text/60 text-sm">${def}</div></details>`,
    )
    .join("");
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-3xl mx-auto"><button onclick="nav('material','${key}')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Kembali ke ${material.title}</button><h1 class="text-3xl font-bold mb-4">${lesson.title}</h1><div class="rounded-2xl bg-surface border border-white/10 p-6 mb-6"><p class="text-text/70 leading-relaxed">${lesson.content}</p></div>${termsHtml ? `<div class="space-y-3 mb-6">${termsHtml}</div>` : ""}<div class="flex gap-3 flex-wrap">${idx > 0 ? `<button onclick="nav('lesson','${key}:${idx - 1}')" class="rounded-2xl bg-surface border border-white/10 px-4 py-3 hover:border-accent transition">← Sebelumnya</button>` : ""}${idx < material.lessons.length - 1 ? `<button onclick="nav('lesson','${key}:${idx + 1}')" class="rounded-2xl bg-gradient-to-r from-accent to-action px-4 py-3 text-bg font-bold hover:opacity-90 transition">Selanjutnya →</button>` : `<button onclick="nav('quiz',{subject:'${key}'})" class="rounded-2xl bg-gradient-to-r from-accent to-action px-4 py-3 text-bg font-bold hover:opacity-90 transition">Mulai Quiz</button>`}</div></div>`;
}
function renderQuiz() {
  const subject = APP.pageData?.subject || "hardware";
  const questions = QUIZ_QUESTIONS[subject] || QUIZ_QUESTIONS.hardware;
  if (!quizState.active || quizState.subject !== subject) {
    quizState = {
      active: true,
      subject,
      current: 0,
      score: 0,
      timer: 10,
      answered: false,
      done: false,
      selected: -1,
    };
  }
  if (quizState.done) return renderQuizResult(subject);
  const currentQuestion = questions[quizState.current];
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-3xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Dashboard</button><div class="rounded-2xl bg-surface border border-white/10 p-6"><div class="flex items-center justify-between mb-4"><span class="text-xs uppercase tracking-[0.3em] text-text/40">Quick Quiz</span><span id="quizTimer" class="font-heading font-bold ${quizState.timer <= 3 ? "text-red-400" : "text-accent"}">${quizState.timer}s</span></div><div class="mb-6"><p class="text-xs text-text/50 mb-2">Pertanyaan ${quizState.current + 1}/${questions.length}</p><h2 class="text-xl font-bold">${currentQuestion.q}</h2></div><div class="space-y-3">${currentQuestion.opts
    .map((opt, index) => {
      let classes =
        "w-full rounded-2xl border border-white/10 bg-bg p-4 text-left text-sm transition";
      if (quizState.answered) {
        if (index === currentQuestion.ans)
          classes =
            "w-full rounded-2xl border border-emerald-400 bg-emerald-500/10 p-4 text-left text-sm";
        else if (index === quizState.selected)
          classes =
            "w-full rounded-2xl border border-red-400 bg-red-500/10 p-4 text-left text-sm";
      }
      return `<button type="button" onclick="answerQuiz(${index})" class="${classes}" ${quizState.answered ? "disabled" : ""}>${String.fromCharCode(65 + index)}. ${opt}</button>`;
    })
    .join("")}</div></div></div>`;
}
function answerQuiz(index) {
  if (quizState.answered || quizState.done) return;
  quizState.answered = true;
  quizState.selected = index;
  const questions = QUIZ_QUESTIONS[quizState.subject];
  if (questions[index] && index === questions[quizState.current].ans)
    quizState.score += Math.round(100 / questions.length);
  clearInterval(window._quizTimer);
  render();
  setTimeout(() => {
    quizState.current += 1;
    if (quizState.current >= questions.length) quizState.done = true;
    else {
      quizState.answered = false;
      quizState.selected = -1;
      quizState.timer = 10;
    }
    render();
  }, 1200);
}
function startQuizTimer() {
  clearInterval(window._quizTimer);
  if (!quizState.active || quizState.done || quizState.answered) return;
  window._quizTimer = setInterval(() => {
    quizState.timer -= 1;
    const timerEl = document.getElementById("quizTimer");
    if (timerEl) timerEl.textContent = `${quizState.timer}s`;
    if (quizState.timer <= 0) {
      clearInterval(window._quizTimer);
      answerQuiz(-1);
    }
  }, 1000);
}
function renderQuizResult(subject) {
  const uid = APP.user?.id;
  if (uid) {
    APP.scores[uid] = APP.scores[uid] || {};
    APP.scores[uid][subject] = Math.max(
      APP.scores[uid][subject] || 0,
      quizState.score,
    );
    save();
    checkBadges();
  }
  return `<div class="h-full flex items-center justify-center p-4"><div class="w-full max-w-md rounded-[2rem] bg-surface border border-white/10 p-8 text-center"><div class="text-6xl mb-4">${quizState.score >= 70 ? "🎉" : "💪"}</div><h2 class="text-3xl font-bold mb-2">Quiz Selesai!</h2><p class="text-5xl font-heading font-bold text-accent mb-2">${quizState.score}</p><p class="text-text/50 mb-6">dari 100 poin</p><div class="flex gap-3 flex-col sm:flex-row"><button onclick="quizState={};nav('quiz',{subject:'${subject}'})" class="rounded-2xl border border-white/10 px-4 py-3">Ulangi</button><button onclick="quizState={};nav('dashboard')" class="rounded-2xl bg-gradient-to-r from-accent to-action px-4 py-3 text-bg font-bold">Dashboard</button></div></div></div>`;
}
function renderQA() {
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-3xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Dashboard</button><h1 class="text-3xl font-bold mb-2">Tanya Jawab</h1><p class="text-text/50 mb-6">Cari jawaban cepat atau kirim pertanyaan baru.</p><div class="mb-6 relative"><input id="qaSearch" type="text" placeholder="Ketik pertanyaan..." oninput="filterQA()" class="w-full rounded-2xl bg-surface border border-white/10 px-4 py-3 text-text focus:border-accent outline-none"/></div><div id="qaResults" class="space-y-2">${FAQ_DATA.map((item) => `<details class="bg-surface border border-white/10 rounded-2xl" data-q="${item.q.toLowerCase()}"><summary class="px-4 py-3 cursor-pointer text-sm font-medium">${item.q}</summary><div class="px-4 pb-4 text-text/60 text-sm">${item.a}</div></details>`).join("")}</div><div class="rounded-2xl bg-surface border border-white/10 p-6 mt-6"><h2 class="text-lg font-bold mb-3">Kirim Pertanyaan</h2><form onsubmit="submitQuestion(event)"><textarea id="qaQ" rows="3" placeholder="Tulis pertanyaanmu..." class="w-full rounded-2xl bg-bg border border-white/10 px-4 py-3 text-text focus:border-accent outline-none mb-4"></textarea><button type="submit" class="rounded-2xl bg-gradient-to-r from-accent to-action px-5 py-3 text-bg font-bold">Kirim</button></form><p id="qaSent" class="text-sm text-emerald-400 mt-3 hidden">Pertanyaan terkirim!</p></div></div>`;
}
function filterQA() {
  const value = document.getElementById("qaSearch")?.value.toLowerCase() || "";
  document.querySelectorAll("[data-q]").forEach((el) => {
    const match = el.getAttribute("data-q")?.includes(value);
    el.style.display = match ? "" : "none";
  });
}
function submitQuestion(event) {
  event.preventDefault();
  const text = document.getElementById("qaQ")?.value.trim();
  if (!text) return;
  APP.qa.push({
    q: text,
    by: APP.user?.id || null,
    at: new Date().toISOString(),
  });
  save();
  document.getElementById("qaQ").value = "";
  const sent = document.getElementById("qaSent");
  if (sent) sent.classList.remove("hidden");
}
function renderGame() {
  const items = [
    { name: "Keyboard", cat: "input" },
    { name: "Mouse", cat: "input" },
    { name: "Webcam", cat: "input" },
    { name: "Monitor", cat: "output" },
    { name: "Speaker", cat: "output" },
    { name: "Printer", cat: "output" },
    { name: "SSD", cat: "storage" },
    { name: "Flash Drive", cat: "storage" },
    { name: "Hard Disk", cat: "storage" },
  ].sort(() => Math.random() - 0.5);
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-4xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Dashboard</button><h1 class="text-3xl font-bold mb-2">Drag & Drop Game</h1><p class="text-text/50 mb-6">Seret perangkat ke kategori yang benar.</p><div id="gameScore" class="text-accent font-heading mb-4">Skor: 0 / 9</div><div id="dragItems" class="flex flex-wrap gap-3 mb-6">${items.map((item) => `<div class="drag-item rounded-2xl bg-surface border border-white/10 px-4 py-3 text-sm cursor-grab" draggable="true" data-cat="${item.cat}" data-name="${item.name}">${item.name}</div>`).join("")}</div><div class="grid grid-cols-1 md:grid-cols-3 gap-3">${[
    { id: "input", label: "Input", color: "#00e5ff" },
    { id: "output", label: "Output", color: "#7c3aed" },
    { id: "storage", label: "Storage", color: "#f59e0b" },
  ]
    .map(
      (zone) =>
        `<div class="drop-zone rounded-2xl bg-surface border border-dashed border-white/10 p-4 min-h-[130px]" data-zone="${zone.id}"><p class="mb-3 font-semibold" style="color:${zone.color}">${zone.label}</p><div class="dropped-items space-y-2"></div></div>`,
    )
    .join(
      "",
    )}</div><div id="gameResult" class="hidden rounded-2xl bg-surface border border-white/10 p-6 mt-6 text-center"><p id="gameResultText" class="text-xl font-bold"></p><button onclick="nav('game')" class="mt-4 rounded-2xl bg-gradient-to-r from-accent to-action px-5 py-3 text-bg font-bold">Main Lagi</button></div></div>`;
}
function initDragDrop() {
  let dragged = null;
  const total = document.querySelectorAll(".drag-item").length;
  let correct = 0;
  document.querySelectorAll(".drag-item").forEach((item) => {
    item.addEventListener("dragstart", () => {
      dragged = item;
      item.style.opacity = "0.5";
    });
    item.addEventListener("dragend", () => {
      item.style.opacity = "1";
    });
  });
  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () =>
      zone.classList.remove("drag-over"),
    );
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("drag-over");
      if (!dragged) return;
      const category = dragged.dataset.cat;
      const target = zone.dataset.zone;
      if (category === target) {
        const node = document.createElement("div");
        node.className =
          "rounded-xl bg-emerald-500/10 border border-emerald-400/40 px-3 py-2 text-sm text-emerald-200";
        node.textContent = `✓ ${dragged.dataset.name}`;
        zone.querySelector(".dropped-items").appendChild(node);
        dragged.remove();
        correct += 1;
      } else {
        dragged.classList.add("shake");
        setTimeout(() => dragged.classList.remove("shake"), 400);
      }
      dragged = null;
      document.getElementById("gameScore").textContent =
        `Skor: ${correct} / ${total}`;
      if (correct === total) {
        const percentage = Math.round((correct / total) * 100);
        const uid = APP.user?.id;
        if (uid) {
          APP.scores[uid] = APP.scores[uid] || {};
          APP.scores[uid].dragdrop = Math.max(
            APP.scores[uid].dragdrop || 0,
            percentage,
          );
          save();
          checkBadges();
        }
        document.getElementById("gameResultText").textContent =
          `🎉 Selesai! Skor: ${percentage}`;
        document.getElementById("gameResult").classList.remove("hidden");
      }
    });
  });
}
function renderLeaderboard() {
  const list = (APP.users || [])
    .map((user) => ({
      user,
      score: getTotalScore(user.id),
      prog: getTotalProgress(user.id),
    }))
    .sort((a, b) => b.score - a.score);
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-4xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Dashboard</button><h1 class="text-3xl font-bold mb-3">Leaderboard</h1><div class="space-y-3">${list.length ? list.map((item, index) => `<div class="rounded-2xl bg-surface border border-white/10 p-4 flex items-center gap-4 ${item.user.id === APP.user?.id ? "border-accent/40 bg-accent/5" : ""}"><div class="w-12 text-center font-heading font-bold">${index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`}</div><div class="flex-1 min-w-0"><p class="font-semibold ${item.user.id === APP.user?.id ? "text-accent" : ""}">${item.user.name}</p><p class="text-xs text-text/40">${item.user.kelas}</p></div><div class="text-right"><p class="font-bold text-accent">${item.score} XP</p><p class="text-xs text-text/40">${item.prog}%</p></div></div>`).join("") : '<p class="text-text/50 text-center py-12">Belum ada data</p>'}</div></div>`;
}
function renderFeedback() {
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-3xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Dashboard</button><h1 class="text-3xl font-bold mb-2">Feedback</h1><p class="text-text/50 mb-6">Bantu kami memperbaiki Learnify.</p><form id="feedbackForm" onsubmit="submitFeedback(event)" class="space-y-4"><div><label class="block text-sm text-text/60 mb-2">Rating</label><div class="flex gap-2">${[1, 2, 3, 4, 5].map((value) => `<button type="button" onclick="setRating(${value})" class="rating-btn rounded-2xl bg-surface border border-white/10 px-4 py-3">${["😞", "😐", "🙂", "😊", "🤩"][value - 1]}</button>`).join("")}</div><input id="fbRating" type="hidden" value=""></div><div><label class="block text-sm text-text/60 mb-2">Apa yang kamu suka?</label><select id="fbWhat" class="w-full rounded-2xl bg-surface border border-white/10 px-4 py-3 text-text outline-none"><option>Materi yang lengkap</option><option>Game edukatif</option><option>Tampilan modern</option><option>Quiz interaktif</option><option>Lainnya</option></select></div><div><label class="block text-sm text-text/60 mb-2">Masukan</label><textarea id="fbMsg" rows="3" class="w-full rounded-2xl bg-surface border border-white/10 px-4 py-3 text-text outline-none" placeholder="Tulis masukan kamu..."></textarea></div><button type="submit" class="w-full rounded-2xl bg-gradient-to-r from-accent to-action px-5 py-3 text-bg font-bold">Kirim Feedback</button></form><div id="fbStatus" class="hidden rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-4 mt-6 text-emerald-200">Terima kasih, feedback kamu sudah tersimpan.</div></div>`;
}
function setRating(value) {
  document.getElementById("fbRating").value = value;
  document.querySelectorAll(".rating-btn").forEach((button, index) => {
    button.classList.toggle("border-accent", index < value);
  });
}
function submitFeedback(event) {
  event.preventDefault();
  const rating = document.getElementById("fbRating").value || "0";
  const detail = document.getElementById("fbMsg").value.trim();
  const category = document.getElementById("fbWhat").value;
  APP.feedback.push({
    rating,
    category,
    detail,
    by: APP.user?.id || null,
    at: new Date().toISOString(),
  });
  save();
  document.getElementById("fbStatus").classList.remove("hidden");
  event.target.reset();
}
function checkBadges() {
  if (!APP.user) return;
  const uid = APP.user.id;
  APP.badges[uid] = APP.badges[uid] || [];
  const progress = APP.progress[uid] || {};
  const scores = APP.scores[uid] || {};
  BADGES.forEach((badge) => {
    if (!APP.badges[uid].includes(badge.id) && badge.req(progress, scores))
      APP.badges[uid].push(badge.id);
  });
  save();
}
function renderBadges() {
  const uid = APP.user?.id;
  if (!uid) return nav("register");
  const earned = APP.badges[uid] || [];
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-5xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Dashboard</button><h1 class="text-3xl font-bold mb-2">Badge Collection</h1><p class="text-text/50 mb-6">Lihat badge yang sudah kamu dapatkan.</p><div class="grid grid-cols-2 md:grid-cols-3 gap-4">${BADGES.map(
    (badge) => {
      const has = earned.includes(badge.id);
      return `<div class="rounded-2xl p-5 border ${has ? "border-accent/40 bg-accent/5" : "border-white/10"}"><div class="text-4xl mb-3">${badge.icon}</div><p class="font-bold mb-1">${badge.name}</p><p class="text-xs text-text/40 mb-3">${badge.desc}</p><p class="text-xs ${has ? "text-accent" : "text-text/50"}">${has ? "Terbuka" : "Terkunci"}</p></div>`;
    },
  ).join("")}</div></div>`;
}
function renderFlowchart() {
  return `<div class="h-full overflow-auto p-4 md:p-6 max-w-3xl mx-auto"><button onclick="nav('dashboard')" class="text-text/50 hover:text-accent transition mb-6 text-sm">← Dashboard</button><h1 class="text-3xl font-bold mb-2">Flowchart</h1><p class="text-text/50 mb-6">Alur navigasi dan logika aplikasi.</p><div class="space-y-4">${[
    {
      title: "Splash Screen",
      description: "Animasi awal sebelum masuk aplikasi",
    },
    { title: "Register", description: "Pendaftaran akun siswa" },
    { title: "Dashboard", description: "Ringkasan skor, progress, dan fitur" },
    {
      title: "Materi",
      description: "Buka materi, baca pelajaran, tanda selesai",
    },
    { title: "Quiz", description: "Quiz singkat untuk menguji pemahaman" },
    { title: "Game", description: "Latihan drag & drop interaktif" },
    { title: "Leaderboard", description: "Peringkat berbasis skor" },
    { title: "Feedback", description: "Kirim masukan untuk aplikasi" },
  ]
    .map(
      (item) =>
        `<div class="rounded-2xl bg-surface border border-white/10 p-5"><p class="font-semibold mb-2">${item.title}</p><p class="text-text/50 text-sm">${item.description}</p></div>`,
    )
    .join("")}</div></div>`;
}
function applyConfig(config) {
  if (!config) return;
  APP.config.app_title = config.app_title || APP.config.app_title;
  APP.config.welcome_text = config.welcome_text || APP.config.welcome_text;
  document.documentElement.style.setProperty(
    "--bg",
    config.background_color || "#0a0e1a",
  );
  document.documentElement.style.setProperty(
    "--surface",
    config.surface_color || "#131829",
  );
  document.documentElement.style.setProperty(
    "--text",
    config.text_color || "#e0e7ff",
  );
  document.body.style.backgroundColor = config.background_color || "#0a0e1a";
  document.body.style.color = config.text_color || "#e0e7ff";
  const font = config.font_family || "Space Grotesk";
  document.body.style.fontFamily = `${font}, Space Grotesk, sans-serif`;
  const splashTitle = document.getElementById("splash-title");
  if (splashTitle) splashTitle.textContent = APP.config.app_title;
  const dashTitle = document.getElementById("dash-title");
  if (dashTitle) dashTitle.textContent = APP.config.app_title;
  const welcomeEl = document.getElementById("welcome-msg");
  if (welcomeEl) welcomeEl.textContent = APP.config.welcome_text;
}
if (window.elementSdk && typeof window.elementSdk.init === "function") {
  window.elementSdk.init({
    defaultConfig: {
      app_title: "Learnify",
      welcome_text: "Selamat Datang di Learnify",
      background_color: "#0a0e1a",
      surface_color: "#131829",
      text_color: "#e0e7ff",
      accent_color: "#00e5ff",
      action_color: "#7c3aed",
      font_family: "Space Grotesk",
      font_size: 16,
    },
    onConfigChange: (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color,
          set: (v) => window.elementSdk.setConfig({ background_color: v }),
        },
        {
          get: () => config.surface_color,
          set: (v) => window.elementSdk.setConfig({ surface_color: v }),
        },
        {
          get: () => config.text_color,
          set: (v) => window.elementSdk.setConfig({ text_color: v }),
        },
        {
          get: () => config.accent_color,
          set: (v) => window.elementSdk.setConfig({ accent_color: v }),
        },
        {
          get: () => config.action_color,
          set: (v) => window.elementSdk.setConfig({ action_color: v }),
        },
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family,
        set: (v) => window.elementSdk.setConfig({ font_family: v }),
      },
      fontSizeable: {
        get: () => config.font_size,
        set: (v) => window.elementSdk.setConfig({ font_size: v }),
      },
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        ["app_title", config.app_title],
        ["welcome_text", config.welcome_text],
      ]),
  });
}
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", init);
else init();
