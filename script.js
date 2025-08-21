const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");
const tashkeelRow = document.getElementById("tashkeelRow");

/* Alphabet arabe */
const rows = [
  ["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز"],
  ["س","ش","ص","ض","ط","ظ","ع","غ","ف","ق"],
  ["ك","ل","م","ن","ه","و","ي","ء"]
];

/* Nombres arabes */
const numbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];

/* Ponctuation */
const punctuation = ["،","؛","؟",".",",","!","-","(",")"];

/* Voyelles courtes */
const tashkeel = ["َ","ً","ُ","ٌ","ِ","ٍ","ْ","ّ"];

function createKeyboard() {
  keyboard.innerHTML = "";

  [...rows, numbers, punctuation].forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.gap = "6px";

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
  tashkeelRow.innerHTML = "";
  tashkeel.forEach(mark => {
    const btn = document.createElement("button");
    btn.className = "key";
    btn.textContent = mark;
    btn.onclick = () => output.value += mark;
    tashkeelRow.appendChild(btn);
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
function toggleTashkeel() {
  tashkeelRow.style.display = tashkeelRow.style.display === "none" ? "flex" : "none";
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
tashkeelRow.style.display = "none";
