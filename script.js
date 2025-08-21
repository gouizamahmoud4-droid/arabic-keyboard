const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");
const tashkeelBlock = document.getElementById("tashkeelBlock");

/* Alphabet arabe (ordre de droite à gauche) */
const rows = [
  ["ز","ر","ذ","د","خ","ح","ج","ث","ت","ب","ا"],
  ["ق","ف","غ","ع","ظ","ط","ض","ص","ش","س"],
  ["ء","ي","و","ه","ن","م","ل","ك"]
];

/* Nombres arabes */
const numbers = ["٩","٨","٧","٦","٥","٤","٣","٢","١","٠"];

/* Ponctuation */
const punctuation = ["؟","؛","،",".",",","!","-","(",")"];

/* Voyelles courtes */
const tashkeel = ["َ","ً","ُ","ٌ","ِ","ٍ","ْ","ّ"];

function createKeyboard() {
  keyboard.innerHTML = "";
  [...rows, numbers, punctuation].forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.gap = "6px";
    rowDiv.style.flexDirection = "row-reverse"; // RTL

    row.forEach(key => {
      const btn = document.createElement("button");
      btn.className = "key";
      btn.textContent = key;
      btn.onclick = () => output.value += key;
      rowDiv.appendChild(btn);
    });

    keyboard.appendChild(rowDiv);
  });
}

function createTashkeel() {
  tashkeelBlock.innerHTML = "";
  tashkeel.forEach(mark => {
    const btn = document.createElement("button");
    btn.className = "key";
    btn.textContent = mark;
    btn.onclick = () => output.value += mark;
    tashkeelBlock.appendChild(btn);
  });
}

/* Fonctions toolbar */
function copyText() {
  output.select();
  document.execCommand("copy");
  alert("Texte copié !");
}
function clearText() {
  output.value = "";
}
function downloadText() {
  const blob = new Blob([output.value], {type: "text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "text.txt";
  a.click();
}
function toggleDirection() {
  output.dir = output.dir === "rtl" ? "ltr" : "rtl";
}

/* Thèmes */
const themes = {
  light: { "--bg": "#ffffff", "--text": "#2c3e50", "--accent": "#3498db", "--key-bg": "#ecf0f1" },
  dark: { "--bg": "#2c3e50", "--text": "#ecf0f1", "--accent": "#e74c3c", "--key-bg": "#34495e" },
  blue: { "--bg": "#eaf6ff", "--text": "#2c3e50", "--accent": "#2980b9", "--key-bg": "#d6eaf8" },
  green: { "--bg": "#eafaf1", "--text": "#145a32", "--accent": "#27ae60", "--key-bg": "#d5f5e3" },
  red: { "--bg": "#fdecea", "--text": "#641e16", "--accent": "#c0392b", "--key-bg": "#fadbd8" },
  purple: { "--bg": "#f5eafc", "--text": "#4a235a", "--accent": "#8e44ad", "--key-bg": "#ebdef0" },
  orange: { "--bg": "#fff5e6", "--text": "#6e2c00", "--accent": "#e67e22", "--key-bg": "#fae5d3" },
  yellow: { "--bg": "#fffde7", "--text": "#7f6000", "--accent": "#f1c40f", "--key-bg": "#fcf3cf" },
  brown: { "--bg": "#fdf2e9", "--text": "#4e342e", "--accent": "#8e5a3c", "--key-bg": "#efebe9" }
};

document.querySelectorAll(".color-swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    const theme = themes[swatch.dataset.color];
    Object.keys(theme).forEach(varName => {
      document.documentElement.style.setProperty(varName, theme[varName]);
    });
  });
});

/* Init */
createKeyboard();
createTashkeel();
