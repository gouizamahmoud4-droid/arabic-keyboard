const out = document.getElementById('out');
const keyboard = document.getElementById('keyboard');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const rtlBtn = document.getElementById('rtlBtn');
const ltrBtn = document.getElementById('ltrBtn');
const tashkeelToggle = document.getElementById('tashkeelToggle');
const tashkeelRow = document.getElementById('tashkeelRow');
const themeToggle = document.getElementById('themeToggle');

// Lettres arabes en ordre alphabétique, chiffres et ponctuation
const rows = [
  ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س'],
  ['ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م'],
  ['ن','هـ','و','ي','ء','ؤ','ئ','لا','ة','ى'],
  ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'],
  ['،','؛','؟','ـ','…','⌫','␣']
];

const tashkeel = ['َ','ِ','ُ','ّ','ً','ٍ','ٌ','ْ','ٰ'];

function makeRow(chars){
  const div = document.createElement('div'); div.className='row';
  chars.forEach(ch=>{
    const b=document.createElement('button'); b.className='key'; b.textContent=ch;
    b.addEventListener('click', ()=> insertChar(ch));
    div.appendChild(b);
  });
  return div;
}

function renderKeyboard(){ rows.forEach(r=>keyboard.appendChild(makeRow(r))); }
function renderTashkeel(){ tashkeel.forEach(ch=>{
  const b=document.createElement('button'); b.className='key'; b.textContent=ch;
  b.addEventListener('click', ()=> insertChar(ch));
  tashkeelRow.appendChild(b);
}); }

function insertChar(ch){
  if(ch==='⌫'){ backspaceAtCursor(); return; }
  if(ch==='␣') ch=' ';
  const start=out.selectionStart; const end=out.selectionEnd;
  out.value=out.value.slice(0,start)+ch+out.value.slice(end);
  out.setSelectionRange(start+ch.length,start+ch.length); out.focus();
}

function backspaceAtCursor(){
  const start=out.selectionStart; const end=out.selectionEnd;
  if(start===end && start>0){ out.value=out.value.slice(0,start-1)+out.value.slice(end); out.setSelectionRange(start-1,start-1);}
  else{ out.value=out.value.slice(0,start)+out.value.slice(end); out.setSelectionRange(start,start);}
}

copyBtn.addEventListener('click', async ()=>{
  await navigator.clipboard.writeText(out.value);
  copyBtn.textContent='✔ Copied'; setTimeout(()=>copyBtn.textContent='Copy',1200);
});
clearBtn.addEventListener('click', ()=> out.value='');
downloadBtn.addEventListener('click', ()=>{
  const blob=new Blob([out.value],{type:'text/plain;charset=utf-8'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='arabic-text.txt'; a.click(); URL.revokeObjectURL(a.href);
});
rtlBtn.addEventListener('click', ()=> out.style.direction='rtl');
ltrBtn.addEventListener('click', ()=> out.style.direction='ltr');

tashkeelToggle.addEventListener('click', ()=>{
  tashkeelRow.style.display = tashkeelRow.style.display==='none' ? 'flex' : 'none';
});

themeToggle.addEventListener('click', ()=> document.body.classList.toggle('light'));

renderKeyboard(); renderTashkeel();
