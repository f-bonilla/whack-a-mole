function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function canVibrate() {
  return "vibrate" in navigator && isMobileDevice();
}

function vibrateDevice(duration = 200) {
  navigator.vibrate(duration);
}

function canBeep() {
  return !!(window.AudioContext || window.webkitAudioContext);
}

function beep(duration = 200, frequency = 440, volume = 1) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine"; // tipo de onda
    oscillator.frequency.value = frequency; // frecuencia en Hz (440Hz es A4)
    gainNode.gain.value = volume;

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      audioCtx.close();
    }, duration);
  } catch (event) {
    console.warn("No se pudo reproducir el beep:", event);
  }
}

let moleHitSignal = () => {};

if (canVibrate()) {
  moleHitSignal = vibrateDevice;
} else if (canBeep()) {
  moleHitSignal = beep;
}

export default moleHitSignal;
