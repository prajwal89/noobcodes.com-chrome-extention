chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text == "Set tab_details") {

    let tab_details = {
      "tab_details": {
        "tab_id": sender.tab.id,
        "query": msg.query
      }
    };


    chrome.storage.sync.set(tab_details, function () {
      console.log("details saved for tab id " + result.tab_details.tab_id);
      // chrome.storage.sync.get(['tab_details'], function (result) {
      //   console.log(result.tab_details.tab_id + "from local");
      // });
    });

    sendResponse(tab_details);
  }
});








// var person = {
//   "name":"Ram",
//   "age":27,
//   "vehicles": {
//      "car":"limousine",
//      "bike":"ktm-duke",
//      "plane":"lufthansa"
//   }
// }






// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete') {
//       chrome.tabs.query({ active: true }, function(tabs) {
//           const msg = "Hello from background 🔥";
//           chrome.tabs.sendMessage(tabs[0].id, { "message": msg });
//       })
//   }
// });

// // Listening to messages page
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(request);
//   // Callback for that request
//   sendResponse({ message: "Background has received that message 🔥" });
// });



// chrome.extension.onMessage.addListener(
//   function(message, sender, sendResponse) {
//       if ( message.type == 'getTabId' )
//       {
//           sendResponse({ tabId: sender.tab.id });
//       }
//   }
// );



// chrome.storage.sync.set({ 'foo': 'saved to local storage', 'bar': 'hi' }, function () {
//   console.log('Settings saved');
// });