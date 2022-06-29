window.onload = function(){
    var form = document.getElementById("signInForm");
    form.addEventListener("submit", loginSubmit,true);
};

function loginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const url ="https://rocky-forest-99036.herokuapp.com/login"
    let response = postData(url, { "username": username, "password": password })
        .then(data => { data });
    // console.log(response);
}
 
async function postData(url = '', data = {}) { 
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        credentials: 'include',
        mode: "cors",
        body: JSON.stringify(data)
    });
    console.log("response" + response);
    console.log("response header" + response.headers);
    return response.json();
}