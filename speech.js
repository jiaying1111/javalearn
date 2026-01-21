const textDisplay = document.getElementById('overlay');
const recordBtn = document.getElementById('recordBtn');
const counter = document.getElementById('counter');
//menu stuff
const menuBtn = document.getElementById('menuBtn');
const sideBar = document.getElementById('sideBar');
//word
const wordBtn = document.getElementById('wordBtn');
const wordBar = document.getElementById('wordBar');

//dark
const darkBtn = document.getElementById('darkBtn');

//about
const aboutBtn = document.getElementById('aboutBtn');
const aboutBar = document.getElementById('aboutBar');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

recognition.interimResults = true;
recognition.continuous = true;

let isRecording = false;
let finalText = '';
let lastFinalSentence = '';

//speech to text
recognition.onresult = function (event) {
    let interimText = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
            finalText += transcript + ' ';
        } else {
            interimText += transcript;
        }
    }

    textDisplay.textContent = finalText + interimText;
//counts words
    const words = (finalText + interimText).trim();
    const wordCount = words === '' ? 0 : words.split(/\s+/).length;
    counter.textContent = wordCount + ' words';
};

recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
};

recognition.onend = function () {
    if (isRecording) {
        recognition.start();
    }
};

// record button
recordBtn.addEventListener('click', () => {
    if (!isRecording) {
     //keep old text
      recognition.start();
      isRecording = true;
      recordBtn.textContent = 'Stop';
    } else {
      
      recognition.stop();
      isRecording = false;
      recordBtn.textContent = 'Record';
    }
  });

//menu button
function toggleMenu() {
    sideBar.classList.toggle('open');
  }
  
  function closeMenu() {
    sideBar.classList.remove('open');

  }
  
  menuBtn.addEventListener('click', toggleMenu);


  
  // menu actions
  darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
  
  aboutBtn.addEventListener('click', () => {
    aboutBar.classList.toggle('open'); 
                    
  });
  
  wordBtn.addEventListener('click', () => {
    wordBar.classList.toggle('open'); 
    
  });
