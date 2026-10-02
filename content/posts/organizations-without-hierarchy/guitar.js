/*
 * Guitar: with sound switched on, every click on the sketch plucks the next
 * note of a melody, so whoever clicks sets its rhythm. From the second note a
 * ska rhythm guitar comes in, chopping chords on the offbeats; it changes
 * chord on given melody notes and stops when the clicking does.
 *
 * Sound always starts off. The switch sits at the right end of the caption
 * row; flipping it is the user gesture that unlocks Web Audio, iPhones
 * included. Strings are Karplus-Strong, synthesised on first use.
 */
(() => {
  'use strict';

  const script = document.currentScript;
  const fig = document.getElementById(script && script.dataset.figure);
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!fig || !AC) return;
  const canvas = fig.querySelector('canvas');
  const row = fig.querySelector('.sketch-caption-row') || fig;

  // An original tune in B minor; swap in any note names (e.g. 'F#4', 'Bb3').
  const MELODY = ['F#4', 'B4', 'D5', 'C#5', 'A4', 'E4', 'G4', 'B4', 'E5', 'D5'];
  // Rhythm chord changes, keyed by melody note counted from 1. A chord holds
  // until the next change, across the loop back to the first note.
  const CHANGES = { 2: 'Bm', 4: 'A', 7: 'Em' };
  // Voicings low to high, kept under the melody.
  const CHORDS = {
    Bm: ['B3', 'D4', 'F#4', 'B4'],
    A: ['A3', 'C#4', 'E4', 'A4'],
    Em: ['B3', 'E4', 'G4', 'B4'],
  };
  const BEAT = 0.5, IDLE = 4; // seconds: 120 bpm; quiet after this long without a click

  const pt = /^pt/i.test(document.documentElement.lang);
  const LABEL = pt ? ['Ligar o som', 'Desligar o som'] : ['Turn sound on', 'Turn sound off'];

  let audio = null, on = false, noteAt = 0, chord = null;
  let timer = 0, nextChop = 0, lastClick = 0;
  const plucks = new Map();

  const hz = name => {
    const [, l, acc, oct] = /^([A-G])(#|b)?(\d)$/.exec(name);
    const semis = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[l] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0);
    return 440 * Math.pow(2, (semis + (+oct + 1) * 12 - 69) / 12);
  };

  // A burst of softened noise circulating in a short delay line that averages
  // itself, which decays like a nylon string.
  function pluckBuffer(name) {
    if (plucks.has(name)) return plucks.get(name);
    const sr = audio.sampleRate, len = Math.floor(sr * 2.2), N = Math.max(2, Math.round(sr / hz(name)));
    const buf = audio.createBuffer(1, len, sr), out = buf.getChannelData(0), ring = new Float32Array(N);
    for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
    for (let k = 0; k < 2; k++) for (let i = 0; i < N; i++) ring[i] = (ring[i] + ring[(i + 1) % N]) / 2;
    for (let i = 0; i < len; i++) {
      const j = i % N;
      out[i] = ring[j];
      ring[j] = 0.997 * (ring[j] + ring[(j + 1) % N]) / 2;
    }
    const fade = Math.floor(sr * 0.08);
    for (let i = 0; i < fade; i++) out[len - 1 - i] *= i / fade;
    plucks.set(name, buf);
    return buf;
  }

  // Must run inside the switch's click: iOS only lets audio start from a
  // gesture, and plays a silent buffer to finish unlocking. 'playback' keeps
  // the sound on with the ring/silent switch set to silent (Safari 16.4+).
  function unlock() {
    if (navigator.audioSession) { try { navigator.audioSession.type = 'playback'; } catch (e) { /* older Safari */ } }
    if (!audio) audio = new AC();
    if (audio.state !== 'running') audio.resume();
    const src = audio.createBufferSource();
    src.buffer = audio.createBuffer(1, 1, audio.sampleRate);
    src.connect(audio.destination);
    src.start();
  }

  function pluck() {
    if (!on || !audio) return;
    if (audio.state !== 'running') audio.resume();
    const src = audio.createBufferSource(), gain = audio.createGain();
    src.buffer = pluckBuffer(MELODY[noteAt]);
    gain.gain.value = 0.45;
    src.connect(gain).connect(audio.destination);
    src.start();
    lastClick = audio.currentTime;
    chord = CHANGES[noteAt + 1] || chord;
    if (chord) startRhythm();
    noteAt = (noteAt + 1) % MELODY.length;
  }

  // One ska chop: an upstroke (high string first) of the chord's strings,
  // thinned and cut short so it sounds damped.
  function chop(when) {
    const hp = audio.createBiquadFilter(), gain = audio.createGain();
    hp.type = 'highpass';
    hp.frequency.value = 450;
    gain.gain.setValueAtTime(0.2, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.14);
    hp.connect(gain).connect(audio.destination);
    CHORDS[chord].slice().reverse().forEach((name, k) => {
      const src = audio.createBufferSource();
      src.buffer = pluckBuffer(name);
      src.connect(hp);
      src.start(when + k * 0.008);
      src.stop(when + 0.2);
    });
  }

  // Chops land on the offbeats, counted from the click that started them.
  // Scheduled a little ahead on the audio clock so timers can't make them drag.
  function startRhythm() {
    if (timer) return;
    nextChop = audio.currentTime + BEAT / 2;
    timer = setInterval(() => {
      if (!on || audio.currentTime - lastClick > IDLE) return stopRhythm();
      while (nextChop < audio.currentTime + 0.1) { chop(nextChop); nextChop += BEAT; }
    }, 25);
  }

  function stopRhythm() {
    clearInterval(timer);
    timer = 0;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sketch-sound';
  button.innerHTML =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"/>' +
    '<path class="sketch-sound-waves" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>' +
    '<path class="sketch-sound-mute" d="M15.5 9.5l5 5M20.5 9.5l-5 5"/></svg>' +
    '<span class="sketch-sound-track" aria-hidden="true"><span></span></span>';
  const sync = () => {
    button.setAttribute('aria-pressed', String(on));
    button.setAttribute('aria-label', LABEL[on ? 1 : 0]);
    button.title = LABEL[on ? 1 : 0];
  };
  button.addEventListener('click', () => {
    on = !on;
    if (on) { unlock(); noteAt = 0; chord = null; } else stopRhythm();
    sync();
  });
  sync();
  row.appendChild(button);

  canvas.addEventListener('pointerdown', pluck);
})();
