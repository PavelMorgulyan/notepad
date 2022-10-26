import React from 'react'
import { ReactComponent as AddIcon} from '../assets/info.svg'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

class Recognizer {
    constructor() {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = "ru-RU";
        this.isRecognizing = false;
        this.transcript = "";
    }

    onResult(event, handler) {
            var interim_transcript = "";
            this.transcript = "";
            var i = event.resultIndex;
            for (i; i < event.results.length; ++i) {
                var result = event.results[i];
                if (result.isFinal) {
                    
                    this.transcript += result[0].transcript;
                } else {
                    interim_transcript += result[0].transcript;
                }
            }
            handler(interim_transcript);
        }
        
    start(handler) {
        this.transcript = "";
        this.recognition.onresult = (event) => {
           this.onResult(event, handler);
        };
        //this.recognition.addEventListener ('result', event => {
        //    this.onResult(event, handler);
        //});
        this.recognition.start();
        this.isRecognizing = true;
    }

    stop() {
        this.recognition.abort();
        this.isRecognizing = false;
    }

    
}

const recognizer = new Recognizer();

class MicroButton extends React.Component {

    showText(text) {
        console.log("Текст голоса: ", text);
        // txtMessage.value = recognizer.transcript;
        console.log(recognizer.transcript);
      }

    handleClick = () => {
        if (!recognizer.isRecognizing) {
            this.start();
          } else {
            this.stop();
          }
      }

    start() {
        
        recognizer.start(this.showText);
        console.log("Остановить запись") ;
      }
      
    stop() {
        recognizer.stop();
        console.log("Начать запись");
      }

   
    render(){
        return (

                <button onClick={() => this.handleClick()}> <AddIcon /> </button>
    
            
        )
    }
}

export default MicroButton