/* Shared helpers for the ARCADE word-deduction games.
   Requires words.js (window.WORDS = { ANSWERS:[], VALID:Set }) loaded first. */
(function(){
  "use strict";
  const ANSWERS = window.WORDS.ANSWERS;
  const VALID   = window.WORDS.VALID;

  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  function randomAnswer(){ return ANSWERS[(Math.random()*ANSWERS.length)|0]; }
  function isValidGuess(w){ w=(w||'').toLowerCase(); return w.length===5 && VALID.has(w); }

  // Bulls & cows style analysis (handles duplicate letters correctly)
  function analyze(secret, guess){
    let exact=0; const sf={}, gf={};
    for(let i=0;i<secret.length;i++){
      if(secret[i]===guess[i]) exact++;
      sf[secret[i]]=(sf[secret[i]]||0)+1;
      gf[guess[i]]=(gf[guess[i]]||0)+1;
    }
    let common=0;
    for(const l in gf){ if(sf[l]) common+=Math.min(sf[l],gf[l]); }
    return { exact, common, loose: common-exact };
  }

  // ---- Toast ----
  let toastEl=null, toastTimer=null;
  function toast(msg, ms=1400){
    if(!toastEl){ toastEl=document.createElement('div'); toastEl.id='toast'; document.body.appendChild(toastEl); }
    toastEl.textContent=msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>toastEl.classList.remove('show'), ms);
  }

  // ---- On-screen keyboard (Backspace left, Enter right) ----
  // opts: { onKey(letter), onEnter(), onBack() }  -> returns { mark(letter,state), resetMarks() }
  function buildKeyboard(container, opts){
    container.innerHTML='';
    const rows=['qwertyuiop','asdfghjkl','zxcvbnm'];
    const keyEls={};
    rows.forEach((row,ri)=>{
      const r=document.createElement('div'); r.className='krow';
      if(ri===2 && opts.onBack){ r.appendChild(special('back','⌫',()=>opts.onBack())); }
      for(const ch of row){
        const b=document.createElement('button'); b.className='key'; b.textContent=ch;
        b.addEventListener('click',()=>{ opts.onKey&&opts.onKey(ch); });
        keyEls[ch]=b; r.appendChild(b);
      }
      if(ri===2 && opts.onEnter){ r.appendChild(special('enter','⏎',()=>opts.onEnter())); }
      container.appendChild(r);
    });
    function special(cls,label,fn){
      const b=document.createElement('button'); b.className='key wide '+cls; b.textContent=label;
      b.addEventListener('click',()=>{ fn(); }); return b;
    }
    return {
      mark(letter,state){ const k=keyEls[letter]; if(!k)return; k.classList.remove('no','maybe','yes'); if(state) k.classList.add(state); },
      resetMarks(){ for(const k in keyEls) keyEls[k].classList.remove('no','maybe','yes'); }
    };
  }

  // ---- A-Z tracker chips ----
  // opts: { clickable:bool, onChange(letter,state) }
  function buildTracker(container, opts={}){
    container.innerHTML='';
    const order='abcdefghijklmnopqrstuvwxyz';
    const states={}, els={};
    const cycle=['','no','maybe','yes'];
    for(const ch of order){
      const c=document.createElement('div'); c.className='chip'; c.textContent=ch; states[ch]='';
      if(opts.clickable){
        c.addEventListener('click',()=>{
          const ni=(cycle.indexOf(states[ch])+1)%cycle.length;
          set(ch, cycle[ni]); opts.onChange&&opts.onChange(ch,states[ch]);
        });
      }
      els[ch]=c; container.appendChild(c);
    }
    function set(ch,state){ states[ch]=state; els[ch].className='chip'+(state?(' '+state):''); }
    return { set, get:ch=>states[ch], reset(){ for(const ch of order) set(ch,''); } };
  }

  // ---- Streak / best persistence ----
  function store(key){
    return {
      get(def=0){ return parseInt(localStorage.getItem(key)||def,10)||0; },
      set(v){ localStorage.setItem(key,String(v)); }
    };
  }

  window.ARCADE = { ANSWERS, VALID, $, $$, randomAnswer, isValidGuess, analyze, toast, buildKeyboard, buildTracker, store };
})();
