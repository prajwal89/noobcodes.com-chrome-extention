window.onload = function () {
    // const api = "http://127.0.0.1:8000/api/api2.php?";
    // const host = "http://127.0.0.1:8000/";

    const api = "https://www.noobcodes.com/api/api2.php?";
    const host = "https://www.noobcodes.com/";

    render_dash();

    document.getElementById("refresh").addEventListener("click", render_dash);


    function render_dash() {

        var url = api + "type=auth";
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);

                //debug
                // document.getElementById('content_holder').innerHTML = this.responseText;
                if (response.status == true) {

                    //local storage 
                    chrome.storage.sync.set({
                        user_id: response.user_data.id,
                        token: response.user_data.token,
                        user_name: response.user_data.user_name,
                        email: response.user_data.email,
                        image: response.user_data.image
                    }, function () {
                        // console.log('Value is set to ' + user_id);
                    });

                    if (response.answers['0'].image) {
                        document.getElementById('user_image').src = host + "img/user-thumbnail/" + response.user_data.image;
                    } else {
                        document.getElementById('user_image').src = "img/user.png";
                    }

                    document.getElementById('user_name').innerText = response.user_data.user_name;

                    document.getElementById('page_views').innerText = response.stats.page_views;

                    document.getElementById('total_answers_submitted').innerText = response.stats.total_answers_submitted;



                    for (var i = 0; i < response.answers.length; i++) {
                        var data = response.answers[i];
                        //document.getElementById('ans_list').innerText = data.id;

                        var list_item = document.createElement("a");
                        list_item.className = "p-0 li_answer_links";
                        list_item.id = "pre_id_" + i;
                        list_item.href = host + data.code_language + "/" + data.question_id + "/" + data.page_name;
                        list_item.target = "_blank";
                        // list_item.innerText =;
                        list_item.style = "text-decoration: none;";
                        list_item.innerHTML = data.query + "</br>";
                        document.getElementById("answers_links").appendChild(list_item);

                    }
                    if (typeof response.answers.length == "undefined") {
                        document.getElementById("answers_links").innerHTML = `no answers submitted yet`;
                    }


                    // buttons linking
                    document.getElementById('dash_link').href = host + "user/" + response.user_data.id + "/dashboard";
                    document.getElementById('settings_link').href = host + "user/" + response.user_data.id + "/settings";


                } else {

                    document.getElementById('content_holder').innerHTML = `

                <div class="btn_holder text-center">
                <h2 class="mt-5 pt-5"> Login to continue </h2>

                <a class="button login_btn" id="login_btn" target="_blank" href="` + host + `login">Login</a>
                <a class="button register_btn" id="register_btn" target="_blank" href="` + host + `register">Register</a>
                 </div>
                
                `;

                }
            }
        };
        xhttp.send();
    }


}