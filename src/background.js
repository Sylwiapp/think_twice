'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

const today_counter = 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    // Send a response message
    sendResponse({
      message,
    });
  }
  if (request.type === "INCREMENTCOUNT_C"){
    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    chrome.runtime.sendMessage(
      {
        type: 'INCREMENTCOUNT_P',
        payload: {
          message: 'Please, increment counter',
        },
      },
      response => {
        console.log(response.message);
      }
    );
  
    console.log("Wyslane do popup i odp")
    // Send a response message
    sendResponse({
      message: 'Good',
    });
 }
  
});



chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "My sample menu",
    "contexts": ["selection"],
  });
});

