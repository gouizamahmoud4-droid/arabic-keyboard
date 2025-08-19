const out = document.getElementById('out');
const keyboard = document.getElementById('keyboard');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const rtlBtn = document.getElementById('rtlBtn');
const ltrBtn = document.getElementById('ltrBtn');
const tashkeelToggle = document.getElementById('tashkeelToggle');
const tashkeelRow = document.getElementById('tashkeelRow');

const rows = [
  ['ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج','د'],
  ['ش','س','ي','ب','ل','ا','ت','ن','م','ك','ط'],
  ['ئ','ء','ؤ','ر','لا','ى','ة','و','ز','ظ'],
  ['،','؟','؛','ـ','⌫','␣']
];
const tashkeel = ['َ','ِ','ُ','ّ','ً','ٍ','ٌ','ْ','ٰ'];

function makeRow(chars){
  const div = document.createElement('div');
  div.className = 'row';
  chars.forEach(ch=>{
    const b = document.createElement('button');
    b.className = 'key'; b.textContent = ch;
    b.addEventListener('click', ()=> insertChar(ch));
    div.appendChild(b);
  });
  return div;
}
function renderKeyboard(){ rows.forEach(r=>keyboard.appendChild(makeRow(r))); }
function renderTashkeel(){
  tashkeel.forEach(ch=>{
    const b = document.createElement('button');
    b.className = 'key'; b.textContent = ch;
    b.addEventListener('click', ()=> insertChar(ch));
    tashkeelRow.appendChild(b);
  });
}
function insertChar(ch){
  if(ch==='⌫'){ backspaceAtCursor(); return; }
  if(ch==='␣') ch=' ';
  const start = out.selectionStart; const end = out.selectionEnd;
  out.value = out.value.slice(0,start) + ch + out.value.slice(end);
  out.setSelectionRange(start+ch.length,start+ch.length);
  out.focus();
}
function backspaceAtCursor(){
  const start = out.selectionStart; const end = out.selectionEnd;
  if(start===end && start>0){
    out.value = out.value.slice(0,start-1)+out.value.slice(end);
    out.setSelectionRange(start-1,start-1);
  } else {
    out.value = out.value.slice(0,start)+out.value.slice(end);
    out.setSelectionRange(start,start);
  }
}
copyBtn.addEventListener('click', async ()=>{
  await navigator.clipboard.writeText(out.value);
  copyBtn.textContent='✔ Copié'; setTimeout(()=>copyBtn.textContent='Copier',1200);
});
clearBtn.addEventListener('click', ()=> out.value='');
downloadBtn.addEventListener('click', ()=>{
  const blob = new Blob([out.value], {type:'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'texte-arabe.txt'; a.click();
  URL.revokeObjectURL(a.href);
});
rtlBtn.addEventListener('click', ()=> out.style.direction='rtl');
ltrBtn.addEventListener('click', ()=> out.style.direction='ltr');
tashkeelToggle.addEventListener('click', ()=>{
  tashkeelRow.style.display = tashkeelRow.style.display==='none' ? 'flex' : 'none';
});
renderKeyboard(); renderTashkeel();
