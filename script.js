// Alphabet arabe en ordre
const rows = [
  ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س'],
  ['ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م'],
  ['ن','هـ','و','ي','ء','ؤ','ئ','لا','ة','ى'],
  ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'],
  ['،','؛','؟','…','⌫','␣']
];

// Voyelles courtes
const tashkeel = ['َ','ً','ُ','ٌ','ِ','ٍ','ْ','ّ'];

// Générer clavier
const kb = document.getElementById("keyboard");
rows.forEach(row => {
  const div = document.createElement("div");
  div.className = "row";
  row.forEach(key => {
    const btn = document.createElement("div");
    btn.className = "key";
    btn.textContent = key;
    btn.addEventListener("click", () => {
      if(key === '⌫'){
        out.value = out.value.slice(0,-1);
      } else if(key === '␣'){
        out.value += " ";
      } else {
        out.value += key;
      }
    });
    div.appendChild(btn);
  });
  kb.appendChild(div);
});

// Voyelles
const tr = document.getElementById("tashkeelRow");
tashkeel.forEach(v => {
  const btn = document.createElement("div");
  btn.className = "key";
  btn.textContent = v;
  btn.addEventListener("click", () => out.value += v);
  tr.appendChild(btn);
});
document.getElementById("tashkeelToggle").onclick = () => {
  tr.style.display = tr.style.display === "none" ? "flex" : "none";
};

// Zone texte
const out = document.getElementById("out");
document.getElementById("copyBtn").onclick = () => {out.select(); document.execCommand("copy");};
document.getElementById("clearBtn").onclick = () => out.value = "";
document.getElementById("downloadBtn").onclick = () => {
  const blob = new Blob([out.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "arabiboard.txt";
  a.click();
};
document.getElementById("rtlBtn").onclick = () => out.dir = "rtl";
document.getElementById("ltrBtn").onclick = () => out.dir = "ltr";

// 🎨 Themes
const themes = {
  light: {bg:"#ffffff", text:"#2c3e50", key:"#ecf0f1", accent:"#3498db"},
  dark: {bg:"#2c3e50", text:"#ecf0f1", key:"#34495e", accent:"#e67e22"},
  blue: {bg:"#ecf6fc", text:"#2c3e50", key:"#ffffff", accent:"#3498db"},
  green: {bg:"#eafaf1", text:"#2c3e50", key:"#ffffff", accent:"#2ecc71"},
  red: {bg:"#fdecea", text:"#2c3e50", key:"#ffffff", accent:"#e74c3c"},
  violet: {bg:"#f6ecfc", text:"#2c3e50", key:"#ffffff", accent:"#9b59b6"},
  orange: {bg:"#fff5e6", text:"#2c3e50", key:"#ffffff", accent:"#f39c12"},
  yellow: {bg:"#fffde7", text:"#2c3e50", key:"#ffffff", accent:"#f1c40f"},
  brown: {bg:"#f9f3f0", text:"#2c3e50", key:"#ffffff", accent:"#8e5a3c"},
};

document.querySelectorAll(".color-swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    const t = themes[swatch.dataset.theme];
    document.documentElement.style.setProperty("--bg", t.bg);
    document.documentElement.style.setProperty("--text", t.text);
    document.documentElement.style.setProperty("--key-bg", t.key);
    document.documentElement.style.setProperty("--accent", t.accent);
  });
});
