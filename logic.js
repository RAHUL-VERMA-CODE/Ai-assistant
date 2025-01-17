let button=document.querySelector(".btn");
let check=false;
// Declare transcript as a global variable
let transcript="";
// creating speak function to speak
function speak(text){
    // new SpeechSynthesisUtterance() is object 
    let text_speak=new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume=1;
    text_speak.lang="hi-GB";
    window.speechSynthesis.speak(text_speak);
}

// speak("hello rahul how are you i hope you are good. i know you are working to improve me")
function wishMe(){
  let day=new Date();
  let hours=day.getHours();
  if(hours>=0 && hours<12){
    speak("good morning sir");
  }else if(hours>=12 && hours<16){
    speak("good afternoon sir");
  }else if(hours>=16 && hours<19){
    speak("good evening sir");
  }else{
    speak("good night sir");
  }
}
// addEventlistener for wish on load the website
window.addEventListener("load",()=>{
    wishMe();
})

async function takeTranscript(transcript){
  if(check===true){
            const response=await fetch(URL,{
              method:"post",
              headers:{'Content-Type': 'application/json'},
              body:JSON.stringify({
                  "contents": [
                      {"role":"user",
                       "parts":[{"text": transcript}]
          }]
              })
            });
            const data= await response.json();
           let  apiResponce=data?.candidates[0].content.parts[0].text;
           let cleanedData = apiResponce.replace(/\*+/g, "");
           speak(cleanedData);
           }
  }


// SpeechRecognition is a general concept for APIs or libraries used to convert spoken words into text. It could refer to:
// -->  Web-based APIs like WebkitSpeechRecognition.
// --> It allows websites to listen to your voice using a microphone and convert it into text in real-time.

const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
// Create a new SpeechRecognition instance
if(speechRecognition){
const recognition= new speechRecognition();
recognition.onresult=(event)=>{
  //  console.log(event);
    transcript=event.results[0][0].transcript;
   console.log("You said:", transcript);
   takeCommand(transcript.toLowerCase());
  }
 // Handle errors
recognition.onerror = (event) => {
    console.error("Error occurred:", event.error);
};
   


button.addEventListener("click",()=>{
  //Start recognition
    recognition.start(); 
     button.style.display="none";
     document.querySelector(".stop-btn").style.display="block";
 
    //  add animation on click
  const style = document.createElement("style");
style.textContent = `
    .inner-div::before, 
    .inner-div::after {
        display: block;
    }
`;
document.head.appendChild(style);
   check=true;
  })
  
  const stopBtn=document.querySelector(".stop-btn");
  stopBtn.addEventListener("click",()=>{
    recognition.abort();
    console.log("Speech recognition aborted.");
    // remove animation on click stop
    const style = document.createElement("style");
    style.textContent = `
        .inner-div::before, 
        .inner-div::after {
            display: none;
        }
    `;
    document.head.appendChild(style);
  })    
recognition.onend=()=>{
  stopBtn.style.display="none";
  button.style.display="block";
  // onend the result remove animation
  const style = document.createElement("style");
    style.textContent = `
        .inner-div::before, 
        .inner-div::after {
            display: none;
        }
    `;
    document.head.appendChild(style);
}

// function for take coomand and response
function takeCommand(message){
    if(message.includes("hello nexa")||message.includes("hey nexa")||message.includes("hello alexa")){
      speak("hello sir,what can i help you ?");
    }
    else if(message.includes("who are you")|| message.includes("tum kaun ho")){
      speak("i am Nexa virtual assistant , created by Rahul verma");
    }
    else if(message.includes("open youtube")){
      speak("opening youtube...");
      window.open("https://www.youtube.com","blank");
    }
    else if(message.includes("open google")){
      speak("opening google...");
      window.open("https://www.google.com","blank");
    }
    else if(message.includes("open chat gpt")){
      speak("opening chatgpt...");
      window.open("https://chatgpt.com","blank");
    }
    else if(message.includes("open instagram")){
      speak("opening instagram...");
      window.open("https://www.instagram.com","blank");
    }
    else if(message.includes("open facebook")){
      speak("opening facebook...");
      window.open("https://www.facebook.com","blank");
    }
    else if(message.includes("open calculator")){
      speak("opening calculator...");
      window.open("calculator://");
    }
    else if(message.includes("open whatsapp")){
      speak("opening whatsapp...");
      window.open("whatsapp://");
    }
    else if(message.includes("what time is going on ") || message.includes("time kya ho raha hai")|| message.includes("which time is right now") || message.includes("time is going on")){
     let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
     speak(time);

    }
    else if(message.includes("today date ") || message.includes("aaj kya date hai")|| message.includes("what is the date today") || message.includes("aaj ka date kya hai")){
      let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
      speak(date);
 
     }
     else if(message.includes("which month is it ") || message.includes("kaun sa manth chal raha hai")|| message.includes(" month is going on")|| message.includes("kaun sa manth hai")){
      let month=new Date().toLocaleString(undefined,{month:"short"});
      speak(month);
    }
    else if(message.includes("who is digant")){
      speak("डिगंत गांधी ji हैं,अरे वही, जो बिना Wi-Fi के पूरे देश को जोड़ते थे,चरखे से स्वदेशी फैशन चलाते थे,और अंग्रेजों से बोले भाई, अब निकल लो!");
    }
    else if(message.includes("who is amit")||message.includes("do you konw amit")){
      speak("amit is brother of rahul verma");
    }
    else if(message.includes("open in google")||message.includes("search in google")||message.includes("find in google")){
       speak(`this is what i found on internet regarding ${message}`);
      window.open(`https://www.google.com/search?q=${message}`);
    }
    else{
      takeTranscript(message);
      
    }
  
 
}

}else{
    console.error("SpeechRecognition is not supported in this browser.");
    alert("SpeechRecognition is not supported in your browser.");
}
