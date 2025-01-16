const URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAp9KcgJgyCUPAwaq0zzXejdqpLmWgO1PE" ;
 
async function getApiResponce(AiChatBox){
   let textElement= AiChatBox.querySelector(".text")
   try{
    if(!check){
      const response=await fetch(URL,{
        method:"post",
        Headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents": [
                {"role":"user",
                 "parts":[{"text": userMessage}]
    }]
        })
      });
      const data= await response.json();
     const  apiResponce=data?.candidates[0].content.parts[0].text;
     textElement.innerText=apiResponce;
    }
   }
   catch(error){
       console.log(error);
   }
   finally{
    AiChatBox.querySelector(".loading").style.display="none";
   }
}
// text response js
const prompt=document.querySelector(".input");
const sendBtn=document.querySelector(".sendBtn");
const chatContainer=document.querySelector(".chat-container")
let userMessage=null;

function userBox(html ,className){
  let div=document.createElement("div");
  div.classList.add(className);
  div.innerHTML=html;
  return div;
}
function aiChatBox(html,className){
  let div=document.createElement("div");
  div.classList.add(className);
  div.innerHTML=html;
  return div;
}
function showLoading(){
  let html=` <div class="ai-img">
               <div class="div1">
                 <img src="./image/chat-bot-image.png" class="img">
                 </div>
                 <div class="loading-container">
                  <img class="loading"src="./image/loading.gif" alt="loading" height="150px">
                </div>
                </div>
                <p class="text"></p>
               `
  let AiChatBox= aiChatBox(html,"ai-chat-box");     
  chatContainer.appendChild(AiChatBox); 
//   function which is return response 
  const AiReponse=getApiResponce(AiChatBox);    
//   AiChatBox.querySelector(".text").innerText=AiReponse;                   
}
 function handleSendMessage(){
  userMessage=prompt.value;
  if(!userMessage) return;
  let html=`<p class="text"> </p>`;
  let userChatBox= userBox(html,"user-chat-box");
      //  acessing the userchatbox inside class text
  userChatBox.querySelector(".text").innerText=userMessage;  
  chatContainer.appendChild(userChatBox); 
  prompt.value="";
  setTimeout(showLoading,400) 
}
sendBtn.addEventListener("click",()=>{
  handleSendMessage();
})

prompt.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter behavior (like form submission)
      handleSendMessage();
  }
});
