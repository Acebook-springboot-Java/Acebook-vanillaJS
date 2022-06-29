window.onload = function(){
    var form = document.getElementById("loginForm");
    form.addEventListener("submit", loginSubmit,true);
};

function loginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const url ="https://rocky-forest-99036.herokuapp.com/login"
    let response = postData(url, { "username": username, "password": password }).then(data => { console.log(data) });
    if(response.status === 409){
        Swal.fire({
          icon: 'error',
          title: 'too bad!',
          text: `Username ${username} is allready in use!`
        })
       } else {
         window.location.href = "../../Views/Feed/Feed.html"
       }
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
    return response.json();
}