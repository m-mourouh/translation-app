
function readText(text: string, lang: string) {
  if (text.trim().length > 0 && lang) {
    let utterance;
    utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
}

export { readText };
