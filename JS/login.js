window.onload = function(){
    var form = document.getElementById("loginForm");
    form.addEventListener("submit", loginSubmit);
};

function loginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("psw").value;
    const url ="https://rocky-forest-99036.herokuapp.com/login"
    let response = postData(url, { "username": username, "password": password })
        .then(data => {
            if (data.status == "OK") { 
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `You are logged in as ${username}!`,
                    showConfirmButton: false,
                    timer: 200
                })
                window.location.href = "../../Views/Feed/Feed.html";
                localStorage.setItem("currentUser",data.data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Credentials',
                    text: `Please check your username and password`
                  })
            }
        });
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