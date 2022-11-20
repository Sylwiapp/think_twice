'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);



// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  response => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});


document.addEventListener("click", function(e){
  e = e || window.event;
  var target = e.target; 

  var value = target.nodeName.includes("BUTTON") &&( target.textContent.includes("DODAJ") || target.textContent.includes("dodaj") || target.textContent.includes("Dodaj"));
  value = target.nodeName.includes("BUTTON") &&( value || target.textContent.includes("KUP") || target.textContent.includes("kup") || target.textContent.includes("Kup"));
  
  
  
 
  
  if(value){
    chrome.runtime.sendMessage(
      {
        type: 'INCREMENTCOUNT_C',
        payload: {
          message: 'Increment current count',
        },
      },
      response => {
        console.log(response.message);
      }
    );
    console.log(target.textContent);
    var qArray = [
      "What do you gain by buying this?",
      "How long will it make you happy?",
      "What do you gain by buying this",
      "Is there something else that can bring you joy instead?"
    ];
    var text2 = qArray[Math.floor(Math.random()*qArray.length)];
    var alert_start = "that maybe you should consider idea of buying it.                                  ";
    var alert_text = alert_start + text2 ;
    
    window.alert(alert_text);

    var is_smart = document.body.textContent.includes("Smartphone") || document.body.textContent.includes("Smartfon") || document.body.textContent.includes("smartphone") || document.body.textContent.includes("telefon") || target.textContent.includes("Telefon");
    
    if(is_smart){
    window.alert("Are you sure that you need new phone? If yes remember that you can give second life to your old one: https://www.orange.com/en/give-your-phone-second-life-orange ");
    };

  };



}, false);
