window.onload = function () {
    // const api = "http://127.0.0.1:8000/api/api2.php?";
    // const host = "http://127.0.0.1:8000/";

    const api = "https://www.noobcodes.com/api/api2.php?";
    const host = "https://www.noobcodes.com/";




    var query = document.getElementsByName("q")[0].value;

    chrome.runtime.sendMessage({
        text: "Set tab_details",
        query: query + "this is query"
    }, tab_details => {
        console.log('My tabId is', tab_details);
        // alert('My tabId is', tabId);

    });






    //outer holder for forms
    var top_form_holder = document.createElement("div");
    top_form_holder.id = "top_form_holder";
    document.getElementById("topstuff").appendChild(top_form_holder);


    add_ans_link();



    chrome.storage.sync.get(['email', 'user_id', 'token', 'user_name'], function (result) {
        var email = result.email;
        var user_id = result.user_id;
        var token = result.token;
        var user_name = result.user_name;






        //form for code_submit_form
        var code_submit_form = document.createElement("div");
        code_submit_form.id = "code_submit_form";
        code_submit_form.className = "code_submit_form";
        code_submit_form.style.display = "none";
        code_submit_form.innerHTML = `

    <div class="form_container">
    <button class="close_button" id="close_button">&#10006</button>
    <!--<p class="queryLable">Your answer for <b>'` + query + `' </b> query  </p> -->


    <p class="queryLable">Your answer for <b><input type="text" id="query" name="query" class="query_input" value="` + query + `"> </b> </p> 
   
   
    <!--Your answer for <span contenteditable="true" style="border: solid 2px !important;">dummy text</span>
-->
    
    <form action="" id="code_submit_form">

    <!--
      <label for="lname">Short description</label>
      <input type="text" id="description" name="description" placeholder="description">
  -->

      
  
      <label for="answer">Answer <font color="red"><sup>*</sup></font><span id="ans_error" style="color: red;"></span></label>
      
      <textarea id="answer" class="input_textarea" name="answer" placeholder="Answer code/text.." required></textarea>


      <span class="left">
      <label for="Answer source">Answer source (if any)</label>
      <input type="text" id="source_url" name="source_url" placeholder="source url" required/ >
      </span>

      <span class="right">
      <label for="code_language">Code language</label>
      <select id="code_language" name="code_language" >

      <option value="javascript">javascript</option>
      <option value="python">python</option>
      <option value="shell">shell</option>
      <option value="python">python</option>
      <option value="php">php</option>
      <option value="java">java</option>
      <option value="csharp">csharp</option>
      <option value="sql">sql</option>
      <option value="html">html</option>
      <option value="css">css</option>
      <option value="cpp">cpp</option>
      <option value="typescript">typescript</option>
      <option value="c">c</option>
      <option value="vb">vb</option>
      <option value="go">go</option>
      <option value="ruby">ruby</option>
      <option value="dart">dart</option>
      <option value="lua">lua</option>
      <option value="kotlin">kotlin</option>
      <option value="r">r</option>
      <option value="assembly">assembly</option>
      <option value="basic">basic</option>
      <option value="rust">rust</option>

      </select>
     </span>

  
      <input type="submit" id="submit_button" value="Contribute">
    </form>
  </div>

    `;


        document.getElementById("top_form_holder").appendChild(code_submit_form); //append form 


        //code subbmition form show 
        document.getElementById("add_ans_link").addEventListener("click", function () {
            var status = document.getElementById('code_submit_form').style.display;
            if (status = "none") {
                document.getElementById('code_submit_form').style.display = "block";
            }

        });


        //code subbmition form hide 
        document.getElementById("close_button").addEventListener("click", function () {
            document.getElementById('code_submit_form').style.display = "none";
        });


        //form submmition
        document.getElementById("submit_button").addEventListener("click", function (event) {

            event.preventDefault()

            // var description = document.getElementById("description").value;

            var code_language = document.getElementById("code_language").value;
            var answer = document.getElementById("answer").value;
            var source_url = document.getElementById("source_url").value;


            if (!code_language) {
                var code_language = "other";
            }

            if (!source_url) {
                var source_url = "null";
            }


            if (!answer) {
                // alert("answer required");
                document.getElementById("ans_error").innerHTML = "answer required";
                return;
            }
            // console.log(answer);


            var url = api + "type=insert";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Response
                    var response = JSON.parse(this.responseText);

                    //if answer inserted successfully
                    if (response.status == true) {
                        // document.getElementById("answer").value = response.status;


                        code_submit_form.style.display = "none";


                        var success_msg_div = document.createElement("div");
                        success_msg_div.id = "success_msg_div";

                        success_msg_div.innerHTML = `
                        <div class="form_container success_msg_div" id="success_msg_div">
                        <button class="close_button" id="close_button_success_msg">&#10006</button>
                        <center>
                        <div class="check"></div>
        
                        <h2> Answer added successfully </h2>
                        thank you for your contribution </br></br>
                        <a href="` + host + `user/` + user_id + `/dashboard">view your answers</a>
                        </answer>
                        </div>
                        `;
                        document.getElementById("top_form_holder").appendChild(success_msg_div);




                        //hide success msg div
                        document.getElementById("close_button_success_msg").addEventListener("click", function () {
                            document.getElementById('success_msg_div').remove();
                        });

                        // alert("susscess");

                    }else{
                        alert(this.responseText);
                    }




                }
            };

            var data = {
                code_language: code_language,
                answer: answer,
                query: query,
                source_url: source_url,
                user_id: user_id,
                token: token
            };
            xhttp.send(JSON.stringify(data));



        });








        //load answers from query
        var url2 = api + "type=search";


        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url2, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Response
                // var response = this.responseText;
                var response = JSON.parse(this.responseText);

                if (response.status == true) {

                    //inject prism js
                    var script = document.createElement("script");
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js";
                    document.getElementsByTagName("head")[0].appendChild(script);





                    var link = document.createElement("link");
                    link.href = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css";
                    document.getElementsByTagName("head")[0].appendChild(link);


                    var fa = document.createElement("link");
                    fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css";
                    document.getElementsByTagName("head")[0].appendChild(fa);








                    //loop trough answers

                    for (var i = 0; i < response.data.length; i++) {
                        var answer = response.data[i];

                        //source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
                        function extractDomain(url) {
                            var domain;
                            //find & remove protocol (http, ftp, etc.) and get domain
                            if (url.indexOf("://") > -1) {
                                domain = url.split('/')[2];
                            } else {
                                domain = url.split('/')[0];
                            }

                            //find & remove www
                            if (domain.indexOf("www.") > -1) {
                                domain = domain.split('www.')[1];
                            }

                            domain = domain.split(':')[0]; //find & remove port number
                            domain = domain.split('?')[0]; //find & remove url params

                            return domain;
                        }






                        var div_pre = document.createElement("div");
                        div_pre.className = "container-fluid m-0 p-0";
                        div_pre.innerHTML = `
                        <div class="container-fluid m-0 p-0 answer_holder" style="width: 100% !important;">
                        <div class="row no-gutters  mb-0">
                            <div class="col-11  mb-0">
                                <div class="row">
                                    <div class="col-9  mb-0">
                                        <span class="text-muted mb-0"> <small>` + answer.query + `</small></span>
                                    </div>
                                    <div class="col-3  mb-0">
                                        <span class="float-right">
                                            <a href="" class="text-capitalize"
                                                style="text-decoration: none !important; color: #0f52ba;"><small>` + answer.user_name + `</small></a>
                                        </span>
                                    </div>
                                </div>
                
                
                
                                <pre class='language-css p-1' style="border-radius: 0%;"><code id="code_` + i + `"></code></pre>
                                <span class="float-right m-0 p-0 text-muted">
                                    <a href="" class="d-block m-0 p-0" id="source_` + i + `"
                                        style="margin-top: -12px !important; text-decoration: none; color: rgb(100, 81, 81);"></a>
                                </span>
                            </div>
                            <div class="col-1">
                                <div class="btn-group-vertical btn-group pl-0 ml-0" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn_reset upvote_btn p-0" id="up1" onclick="">&bigtriangleup;</button>
                                    <button type="button" class="btn btn_reset py-0 vote_count" id="" disabled>+5</button>
                                    <button type="button" class="btn btn_reset downvote_btn p-0" id="" onclick="return confirm('Are you sure, you want to delete it?')">&bigtriangledown;</button>
                                </div>
                                
                                <!-- <div class="float-left">Copy</div> -->

                            </div>
                        </div>
                    </div>
                
                        
                        `;




                        document.getElementById("topstuff").appendChild(div_pre);

                        //write answer innertext
                        document.getElementById("code_" + i).textContent = htmldecode(answer.answer);


                        if (answer.source_url !== "null") {
                            document.getElementById("source_" + i).innerHTML = `
                            <a href="` + answer.source_url + `"><small>` + extractDomain(answer.source_url) + `</small></a>
                            `;
                        }


                        // const upvt_btn = document.getElementById("up1");

                        // upvt_btn.addEventListener("click", vote);

                        // function vote() {
                        //     alert("sadas");
                        // }


                    }







                }
            }
        };
        var data = {
            query: query
        };
        xhttp.send(JSON.stringify(data));













    });















    // let xhr = new XMLHttpRequest();
    // xhr.open('get', api + "?type=search&query=" + query);
    // xhr.send();

    // xhr.onload = function () {
    //     var jsonData = JSON.parse(xhr.response);

    //     //for testing
    //     // var json_sample = [{ "id": "348", "code": "#!\/bin\/bash\n# declare an array called array and define 3 values\narray=( one two three )\nfor i in \"${array[@]}\"\ndo\n\techo $i\ndone", "c_name": "Tremendous Enceladus" }, { "id": "1777", "code": "# Error:\nawk: can't read value of a; it's an array name.\n\n# Solution:\n# This error usually comes up if you're trying to print the keys or \n# values from an awk array (i.e. dictionary) incorrectly. To do this \n# properly, you need to loop over the keys in your array.\n\n# Example usage for printing keys:\nawk '{ a[$1]=$2 } END { for (key in a) { print key } }' input_file\n# Where:\n#\t- The above statements prints all keys in the awk array\/dictionary\n#\t\tmade from the input_file\n#\t- a[$1] is an array\/dictionary in which the first column ($1) is \n#\t\tused as the key and the second column ($2) is used as the value\n#\t- END indicates what to do after the first statement has finished \n#\t\trunning. Here we start a loop that loops through the keys in the\n#\t\tarray and prints them. \n\n# Example usage for printing key values:\nawk '{ a[$1]=$2 } END { for (key in a) { print a[key] } }' input_file\n# Where:\n#\t- The above statements prints all key values in the awk \n#\t\tarray\/dictionary made from the input_file", "c_name": "Obsequious Octopus" }, { "id": "1778", "code": "# Example usage for printing keys:\nawk '{ a[$1]=$2 } END { for (key in a) { print key } }' input_file\n# Where:\n#\t- The above statement prints all keys in the awk array\/dictionary\n#\t\tmade from the input_file\n#\t- a[$1] is an array\/dictionary in which the first column ($1) is \n#\t\tused as the key and the second column ($2) is used as the value\n#\t- END indicates what to do after the first statement has finished \n#\t\trunning. Here we start a loop that loops through the keys in the\n#\t\tarray and prints them\n\n# Example usage for printing key values:\nawk '{ a[$1]=$2 } END { for (key in a) { print a[key] } }' input_file\n# Where:\n#\t- The above statement prints all key values in the awk \n#\t\tarray\/dictionary made from the input_file", "c_name": "Obsequious Octopus" }];
    //     // var jsonData = JSON.parse(JSON.stringify(json_sample));



    //     for (var i = 0; i < jsonData.length; i++) {
    //         var data = jsonData[i];

    //         //<pre><code class="language-<?php echo $code_type; ?>"><?php echo htmlentities($code0); ?></code></pre>


    //         // var div_pre = document.createElement("pre");
    //         // div_pre.innerHTML = data.code;
    //         // div_pre.id = "code_textarea";
    //         // document.getElementById("topstuff").appendChild(div_pre);

    //         var link = document.createElement("script");
    //         link.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js";
    //         document.getElementsByTagName("head")[0].appendChild(link);


    //         // var div_pre = document.createElement("textarea");
    //         // div_pre.id = "code_textarea";


    //         var div_pre = document.createElement("pre");
    //         div_pre.className = "code_holder_pre";
    //         div_pre.id = "pre_id_" + i;
    //         document.getElementById("topstuff").appendChild(div_pre);


    //         var code = document.createElement("code");
    //         code.className = "language-css";
    //         code.id = "el_code";
    //         code.textContent = data.answer;
    //         document.getElementById("pre_id_" + i).appendChild(code);


    //         var voter = document.createElement("div");
    //         voter.className = "voter_holder";
    //         voter.innerHTML = `
    //         <button> UP            </button></br>
    //         15
    //         <button>     down       </button>

    //         `;



    //         function insertAfter(referenceNode, newNode) {
    //             referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    //         }


    //         insertAfter(div_pre, voter);
    //         //console.log(data.code);
    //     }
    // }






    //add answer link to start of page
    function add_ans_link() {
        var btn = document.createElement("a");
        btn.innerHTML = "Add your answer";
        btn.id = "add_ans_link";
        document.getElementById("result-stats").appendChild(btn);
    }


    function htmldecode(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    //auto sizing for textarea
    var autoExpand = function (field) {

        // Reset field height
        field.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10) +
            parseInt(computed.getPropertyValue('padding-top'), 10) +
            field.scrollHeight +
            parseInt(computed.getPropertyValue('padding-bottom'), 10) +
            parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';

    };

    document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
    }, false);




}