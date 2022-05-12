window.onload = function () {
    const api = "http://127.0.0.1:8000/api/api2.php?";
    const host = "";


    chrome.runtime.sendMessage({
        text: "what is my tab_id?",
        query: "this is query"
    }, tab_details => {
        console.log('My tabId is', tab_details);
        // alert('My tabId is', tabId);


        // chrome.storage.sync.set({
        //     tab_id: tabId
        // }, function () {
        //     chrome.storage.sync.get(['tab_id'], function (result) {
        //          console.log(result.tab_id.vehicles);
        //         alert(result.tab_id.tab);
        //     });
        // });

    });









    chrome.storage.sync.get(['email', 'user_id', 'token', 'user_name'], function (result) {
        var email = result.email;
        var user_id = result.user_id;
        var token = result.token;
        var user_name = result.user_name;


        // target div for stacks overflow, https://developer.mozilla.org/ , javascript.info, getbootstrap.com,https://www.digitalocean.com/



        targetDivs = document.querySelectorAll("pre code");

        if (targetDivs.length == 0) {
            // alert("no matches found");
        }

        for (i = 0; i < targetDivs.length; i++) {

            // targetDivs[i].style.backgroundColor = "red";

            // targetDivs[i].style.position = "relative";

            var code = targetDivs[i].innerText;


            var btn = document.createElement("a");
            btn.innerHTML = "Add to answers";
            btn.id = "code_ans_link" + i;
            btn.onclick = "addanswer()";
            targetDivs[i].after(btn);



            // document.getElementById("code_ans_link").addEventListener("click",addanswer);

            function addanswer() {
                alert("sdsdf");
            }

            // console.log(code);
        }




















        // Sending messages from Content Script
        // const msg = 'Hello from content Script ⚡'
        // chrome.runtime.sendMessage({ message: msg }, function (response) {
        //     console.log(response);
        // });


        // Listening to messages in Context Script
        // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        //     console.log(sender);
        //     console.log(request);
        //     // Callback
        //     sendResponse({ message: 'Content page  script has received that message ⚡' })
        // })








    });

}