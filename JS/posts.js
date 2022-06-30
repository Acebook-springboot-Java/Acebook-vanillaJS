
window.onload = async() => {
  var postForm = document.getElementById("newPostTextArea");
  postForm.addEventListener("submit", submit);

  var profileNav = document.getElementById("btn_profile");
  profileNav.addEventListener("click", profileNavigate);

  var homeNav = document.getElementById("home");
  homeNav.addEventListener("click", homeNavigate);

  var search = document.getElementById("search_btn");
  search.addEventListener("click", searchToggle);

  var logout = document.getElementById("logout");
  logout.addEventListener("click", logoutSubmit);

  await getPosts();
};

async function getPosts() { 
  let response = await fetchPosts();
  console.log(`status code: ${response.status}`);
  if (response.status == "403") { 
    Swal.fire({
      icon: 'error',
      title: 'Not Authorized',
      text: `Please log in`,
      showConfirmButton: false,
      timer: 1500
    });
    setTimeout(function() {
      window.location.href = "../../Views/login/login.html"
    }, 1500);
  }
  if (response.status == "200") {
    response.json().then(data => ({
          data: data,
          status: response.status
        })).then(res => {
              addPosts(res.data);
            });
  }
    // .then(response =>
    //   response.json().then(data => ({
    //     data: data,
    //     status: response.status
    //   }))
    // .then(res => {
    //     addPosts(res.data);
    //   }));
}
  
async function fetchPosts() {
  let response;
  try {
    response = await fetch('https://rocky-forest-99036.herokuapp.com/posts', {
      method: 'GET',
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer"
      }
    })
    return response;
  } catch (e) {
    console.log(e)
  }
}






 async function addPosts(data) {
  x = data['data'].forEach(
      (post) => {
       
        let postElement = document.createElement('div');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button')

        editButton.innerText = "Edit";
        editButton.setAttribute("class", "editBtn");

        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("class", "deleteBtn");
        deleteButton.setAttribute("id", post['id']);

        postElement.setAttribute("class", "posts");
        postElement.setAttribute("id",post['id']);
        //postElement.setAttribute("id", post['_links']['post']['href'].slice(-1));
        postElement.innerText = post.content
        let y = document.getElementById('postBox')
        y.append(editButton);
        y.append(deleteButton);
        y.append(postElement);
        
        var remove = document.getElementsByClassName("deleteBtn");
        for( var i = 0; i < remove.length; i++) {
          remove[i].addEventListener("click", removePost);
        }
        
        
      }
  )
}

function submit(e) {
  e.preventDefault();
  newPostSubmit();
}

async function newPostSubmit() {
  const content = document.getElementById("newPost").value
  data = {content: content};
  await fetch('https://rocky-forest-99036.herokuapp.com/posts', {
    method: 'POST',
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer"
    },
    body: JSON.stringify(data)
  })
    .then(res => { 
      if (res.status == 200) { 
        window.location.href = "../../Views/Feed/Feed.html"
      }
    } 
  )
}

async function removePost(){
  await fetch(`https://rocky-forest-99036.herokuapp.com/posts/${this.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
        'Authorization': 'Bearer'
      },
      credentials: 'include',
      mode: "cors",
  })
  .then(res => {
    if(res.status == 200) {
      window.location.href = "../../Views/Feed/Feed.html"
    }
  })
}

async function logoutSubmit() { 
  let response = await logout();
  localStorage.removeItem("currentUser");
  window.location.href = "../../Views/login/login.html"
}

async function logout() {
    let response = await fetch('https://rocky-forest-99036.herokuapp.com/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer'
      },
      credentials: 'include',
      mode: "cors",
    });
    
  console.log(response.status);
  if (response.status == 200) { 
    return response;
  }

  throw new Error(response.status);
}

function profileNavigate() {
  console.log("hit");
  window.location.href = "../../Views/Profile/profile.html"
}

function homeNavigate(){
  window.location.href = "../../Views/Feed/Feed.html"
}

function searchToggle(){
  if(document.getElementById("search_text").style.opacity == 0) {
    document.getElementById("search_text").style.opacity = 1;
  } else{
    document.getElementById("search_text").style.opacity = 0;
  }
  
}
