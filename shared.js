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

  // ---- Sound (WebAudio, no assets) ----
  const Sound = (()=>{
    let ac=null, muted = localStorage.getItem('arcade_mute')==='1';
    function init(){ if(!ac){ try{ ac=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } }
    function tone(f,d=0.08,type='sine',v=0.05,slide=null){
      if(muted||!ac) return;
      const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();
      o.type=type;o.frequency.setValueAtTime(f,t);
      if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+d);
      g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
      o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d);
    }
    return {
      init,
      click(){ tone(330,0.03,'sine',0.03); },
      key(){ tone(420,0.025,'sine',0.022); },
      good(){ tone(520,0.09,'triangle',0.05,720); },
      bad(){ tone(200,0.18,'sawtooth',0.05,120); },
      win(){ [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,0.16,'triangle',0.06),i*90)); },
      lose(){ [330,247,196].forEach((f,i)=>setTimeout(()=>tone(f,0.22,'sawtooth',0.05),i*120)); },
      toggle(){ muted=!muted; localStorage.setItem('arcade_mute',muted?'1':'0'); return muted; },
      get muted(){ return muted; }
    };
  })();

  // ---- Toast ----
  let toastEl=null, toastTimer=null;
  function toast(msg, ms=1400){
    if(!toastEl){ toastEl=document.createElement('div'); toastEl.id='toast'; document.body.appendChild(toastEl); }
    toastEl.textContent=msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>toastEl.classList.remove('show'), ms);
  }

  // ---- On-screen keyboard ----
  // opts: { onKey(letter), onEnter(), onBack() }  -> returns { mark(letter,state), resetMarks() }
  function buildKeyboard(container, opts){
    container.innerHTML='';
    const rows=['qwertyuiop','asdfghjkl','zxcvbnm'];
    const keyEls={};
    rows.forEach((row,ri)=>{
      const r=document.createElement('div'); r.className='krow';
      if(ri===2 && opts.onEnter){ r.appendChild(special('enter','⏎',()=>opts.onEnter())); }
      for(const ch of row){
        const b=document.createElement('button'); b.className='key'; b.textContent=ch;
        b.addEventListener('click',()=>{ Sound.key(); opts.onKey&&opts.onKey(ch); });
        keyEls[ch]=b; r.appendChild(b);
      }
      if(ri===2 && opts.onBack){ r.appendChild(special('back','⌫',()=>opts.onBack())); }
      container.appendChild(r);
    });
    function special(cls,label,fn){
      const b=document.createElement('button'); b.className='key wide '+cls; b.textContent=label;
      b.addEventListener('click',()=>{ Sound.click(); fn(); }); return b;
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
          set(ch, cycle[ni]); Sound.click(); opts.onChange&&opts.onChange(ch,states[ch]);
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

  // ---- Mute button wiring (expects element with id="mute") ----
  function wireMute(){
    const m=$('#mute'); if(!m) return;
    m.textContent = Sound.muted?'🔇':'🔊';
    m.addEventListener('click',()=>{ Sound.init(); m.textContent=Sound.toggle()?'🔇':'🔊'; });
  }

  window.ARCADE = { ANSWERS, VALID, $, $$, randomAnswer, isValidGuess, analyze, Sound, toast, buildKeyboard, buildTracker, store, wireMute };
})();
