function speak(content) {
    document.getElementById('friday-voice').value = content;
    responsiveVoice.speak(content, 'US English Female', { rate: 1.25, onstart: responseSpeechOnStart, onend: responseSpeechOnEnd });
}

class SpeechRecognitionApi {
    constructor(options) {
        const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
        this.transcript = '';
        this.isStarted = false;
        this.isReady = false;
        this.speechApi = new SpeechToText();
        this.speechApi.continuous = true;
        this.speechApi.interimResults = false;
        this.speechApi.onresult = (event) => {
            console.log(event);
            var resultIndex = event.resultIndex;
            var transcript = event.results[resultIndex][0].transcript;

            console.log('transcript>>', transcript);
            decideSpeak(transcript);
        }
    }
    init() {
        this.speechApi.start();
        this.isStarted = true;
    }
    stop() {
        this.speechApi.stop();
        this.isStarted = false;
    }
}
var speech = new SpeechRecognitionApi();

function decideSpeak(transcript) {
    //document.getElementById('friday-voice').value = transcript;
    if (transcript.toLowerCase().includes('friday') && !speech.isReady) {
        speech.stop();
        speak('Yes sir?');
        speech.isReady = true;
    } else if (speech.isReady == true) {

        if (transcript.toLowerCase().includes("your name")) {
            speak("I'm Friday.");
            speech.isReady = false;
        }

        // home
        else if (transcript.toLowerCase().includes("home")) {
            responseSpeechOnEnd = function() { location.href = "../home_click/index.html"; }
            speak('Going home now.');
            speech.isReady = false;
        }

        // show list of student
        else if (transcript.toLowerCase().includes("student")) {
            responseSpeechOnEnd = function() { location.href = "../student_click/index.html"; }
            speak("I'm trying to taking list of student for you.");
            speech.isReady = false;
        }

        // show list of student
        else if (transcript.toLowerCase().includes("lecturer") ||
            transcript.toLowerCase().includes("lectura") ||
            transcript.toLowerCase().includes("electro") ||
            transcript.toLowerCase().includes("lateral") ||
            transcript.toLowerCase().includes("lector")
        ) {
            responseSpeechOnEnd = function() { location.href = "../lecturer_click/index.html"; }
            speak("I'm trying to taking list of lecturer for you.");
            speech.isReady = false;
        }

        // show list of course
        else if (transcript.toLowerCase().includes("course") ||
            transcript.toLowerCase().includes("cost") ||
            transcript.toLowerCase().includes("kush")
        ) {
            responseSpeechOnEnd = function() { location.href = "../course_click/index.html"; }
            speak("I'm trying to taking list of course for you.");
            speech.isReady = false;
        }

        // show list of section class
        else if (transcript.toLowerCase().includes("notification")) {
            responseSpeechOnEnd = function() { location.href = "../notification_click/index.html"; }
            speak("I'm trying to taking list of notification for you.");
            speech.isReady = false;
        }

        // show list of section class
        else if (transcript.toLowerCase().includes("section class") ||
            transcript.toLowerCase().includes("session class")
        ) {
            responseSpeechOnEnd = function() { location.href = "../sectionclass_click/index.html"; }
            speak("I'm trying to taking list of section class for you.");
            speech.isReady = false;
        }
    }
}

function responseSpeechOnEnd() {
    setTimeout(function() {
        speech.init();
    }, 1000);
}

function responseSpeechOnStart() {
    speech.stop();
}