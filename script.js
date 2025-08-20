// Clavier arabe avec lettres en ordre alphabétique, inversé droite->gauche
const rows = [
  ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س'],
  ['ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م'],
  ['ن','هـ','و','ي','ء','ؤ','ئ','لا','ة','ى'],
  ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'],
  ['،','؛','؟','ـ','…','⌫','␣']
];

// Voyelles courtes
const tashkeel = ['َ','ً','ُ','ٌ','ِ','ٍ','ْ','ّ'];

function buildKeyboard() {
  const keyboard = document.getElementById('keyboard');
  keyboard.innerHTML = "";
  rows.forEach(row => {
    const div = document.createElement('div');
    div.className = "row";
    row.forEach(key => {
      const btn = document.createElement('div');
      btn.className = "key";
      btn.textContent = key;
      btn.onclick = () => handleKey(key);
      div.appendChild(btn);
    });
    keyboard.appendChild(div);
  });
}

function buildTashkeel() {
  const row = document.getElementById('tashkeelRow');
  row.innerHTML = "";
  tashkeel.forEach(k => {
    const btn = document.createElement('div');
    btn.className = "key";
    btn.textContent = k;
    btn.onclick = () => handleKey(k);
    row.appendChild(btn);
  });
}

// Gestion des touches spéciales
function handleKey(k) {
  const out = document.getElementById('out');
  if (k === '⌫') {
    out.value = out.value.slice(0, -1);
  } else if (k === '␣') {
    out.value += " ";
  } else {
    out.value += k;
  }
}

// Boutons de la toolbar
document.getElementById('copyBtn').onclick = () => {
  const out = document.getElementById('out');
  out.select();
  document.execCommand('copy');
};

document.getElementById('clearBtn').onclick = () => {
  document.getElementById('out').value = "";
};

document.getElementById('downloadBtn').onclick = () => {
  const text = document.getElementById('out').value;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "arabiboard.txt";
  a.click();
  URL.revokeObjectURL(url);
};

document.getElementById('rtlBtn').onclick = () => {
  document.getElementById('out').dir = "rtl";
};

document.getElementById('ltrBtn').onclick = () => {
  document.getElementById('out').dir = "ltr";
};

document.getElementById('tashkeelToggle').onclick = () => {
  const row = document.getElementById('tashkeelRow');
  row.style.display = row.style.display === "flex" ? "none" : "flex";
};

// Thèmes
const themes = {
  light: { "--bg": "#ffffff", "--text": "#2c3e50", "--key-bg": "#ecf0f1", "--key-hover": "#bdc3c7", "--accent": "#3498db" },
  dark: { "--bg": "#2c3e50", "--text": "#ecf0f1", "--key-bg": "#34495e", "--key-hover": "#3d566e", "--accent": "#e67e22" },
  blue: { "--bg": "#eaf6fb", "--text": "#2c3e50", "--key-bg": "#3498db", "--key-hover": "#2980b9", "--accent": "#2980b9" },
  green: { "--bg": "#eafaf1", "--text": "#145a32", "--key-bg": "#2ecc71", "--key-hover": "#27ae60", "--accent": "#1e8449" },
  red: { "--bg": "#fdecea", "--text": "#641e16", "--key-bg": "#e74c3c", "--key-hover": "#c0392b", "--accent": "#922b21" },
  violet: { "--bg": "#f5eafc", "--text": "#4a235a", "--key-bg": "#9b59b6", "--key-hover": "#8e44ad", "--accent": "#6c3483" },
  orange: { "--bg": "#fff5e6", "--text": "#7e5109", "--key-bg": "#f39c12", "--key-hover": "#d68910", "--accent": "#b9770e" },
  yellow: { "--bg": "#fffde7", "--text": "#7d6608", "--key-bg": "#f1c40f", "--key-hover": "#d4ac0d", "--accent": "#9a7d0a" },
};

document.querySelectorAll(".color-box").forEach(box => {
  box.addEventListener("click", () => {
    const theme = themes[box.dataset.theme];
    for (let key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
  });
});

// Init
buildKeyboard();
buildTashkeel();
