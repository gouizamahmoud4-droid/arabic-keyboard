const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");
const tashkeelRow = document.getElementById("tashkeelRow");

const letters = [
  "ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س",
  "ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م",
  "ن","ه","و","ي"
];

const numbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
const punctuation = ["،","؛","؟","."];
const tashkeel = ["َ","ً","ُ","ٌ","ِ","ٍ","ْ","ّ"];

function createKeyboard() {
  const allKeys = [...letters, ...numbers, ...punctuation];
  let row = document.createElement("div");
  row.className = "row";
  allKeys.forEach((char, i) => {
    const key = document.createElement("div");
    key.className = "key";
    key.textContent = char;
    key.onclick = () => output.value += char;
    row.appendChild(key);
    if ((i+1) % 11 === 0) {
      keyboard.appendChild(row);
      row = document.createElement("div");
      row.className = "row";
    }
  });
  if (row.children.length > 0) keyboard.appendChild(row);
}

function createTashkeel() {
  tashkeel.forEach(char => {
    const key = document.createElement("div");
    key.className = "key";
    key.textContent = char;
    key.onclick = () => output.value += char;
    tashkeelRow.appendChild(key);
  });
}

function copyText() {
  output.select();
  document.execCommand("copy");
  alert("Texte copié !");
}

function clearText() {
  output.value = "";
}

function downloadText() {
  const blob = new Blob([output.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "arabiboard.txt";
  link.click();
}

function toggleDirection() {
  output.dir = (output.dir === "rtl") ? "ltr" : "rtl";
}

function toggleTashkeel() {
  tashkeelRow.style.display = (tashkeelRow.style.display === "flex") ? "none" : "flex";
}

/* Thèmes */
const themes = {
  light: { bg: "#ffffff", text: "#2c3e50", key: "#f9f9f9", accent: "#3498db" },
  dark: { bg: "#2c3e50", text: "#ecf0f1", key: "#34495e", accent: "#e67e22" },
  blue: { bg: "#eaf6ff", text: "#2c3e50", key: "#ffffff", accent: "#3498db" },
  green: { bg: "#eafaf1", text: "#2c3e50", key: "#ffffff", accent: "#2ecc71" },
  red: { bg: "#fdecea", text: "#2c3e50", key: "#ffffff", accent: "#e74c3c" },
  purple: { bg: "#f7eafc", text: "#2c3e50", key: "#ffffff", accent: "#9b59b6" },
  orange: { bg: "#fff4e6", text: "#2c3e50", key: "#ffffff", accent: "#f39c12" },
  yellow: { bg: "#fffde7", text: "#2c3e50", key: "#ffffff", accent: "#f1c40f" },
  brown: { bg: "#f3e6e1", text: "#2c3e50", key: "#ffffff", accent: "#8e5a3c" },
};

document.querySelectorAll(".color-swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    const theme = themes[swatch.dataset.color];
    if (theme) {
      document.documentElement.style.setProperty("--bg", theme.bg);
      document.documentElement.style.setProperty("--text", theme.text);
      document.documentElement.style.setProperty("--key-bg", theme.key);
      document.documentElement.style.setProperty("--accent", theme.accent);
    }
  });
});

/* Init */
createKeyboard();
createTashkeel();
