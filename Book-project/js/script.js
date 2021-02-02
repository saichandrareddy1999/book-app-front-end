const app_main = document.getElementById("sec_main");
const link_signup = document.getElementById("link_signup");
const link_home = document.getElementById("link_home");
const link_favourite = document.getElementById("link_favourite");
const link_logout = document.getElementById("link_logout");
let booksList=[];
let favList = [];
setSignInView();
link_home.addEventListener('click', async () => {
  let login = sessionStorage.getItem("login");
  if (login == "true") {
  await fetchBooks();
  setMainView(createDashBoard(booksList))
  createDashBoard(booksList);
} else {
  alert("User Not Logged-In");
}
})
link_signup.addEventListener('click', () => {
  setMainView(getSignUpPage());
})

function setSignInView() {
  setMainView(getSignInPage());
}
link_favourite.addEventListener('click', async () => {
  
  let login = sessionStorage.getItem("login");
  if (login == "true") {
    await fetchFavourites();
    setMainView(getFavView(favList));
  } else {
    alert("User Not Logged-In");
  }
  
})
    function setMainView(view){
        app_main.innerHTML=view;
    }
    function setMainView(view) {
      app_main.innerHTML = view;
    }
    
    
    
    function getSignInPage() {
      return `
        <div class="signin-page text-center">
        <div class="form-signin">
          <form onsubmit="signIn()">
            <img class="mb-4" src="./images/download.png" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <label for="signinEmail" class="visually-hidden">Email address</label>
            <input type="email" id="signinEmail" class="form-control" placeholder="Email address" required autofocus>
            <label for="signinPassword" class="visually-hidden">Password</label>
            <input type="password" id="signinPassword" class="form-control" placeholder="Password" required>
            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me"> Remember me
              </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
          </form>
        </div>
      </div>`
    }
    
    function getSignUpPage() {
      return `
        <div class="signup-page text-center">
        <div class="form-signup">
          <form onsubmit="signUp()">
            <img class="mb-4" src="./images/download.png" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
            <label for="inputFname" class="visually-hidden">First Name</label>
            <input type="text" id="inputFname" class="form-control" placeholder="First Name" required autofocus>
            <label for="inputLname" class="visually-hidden">Last Name</label>
            <input type="text" id="inputLname" class="form-control" placeholder="Last Name" required autofocus>
            <label for="inputEmail" class="visually-hidden">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="visually-hidden">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <label for="inputPasswordConfirm" class="visually-hidden">Confirm Password</label>
            <input type="password" id="inputPasswordConfirm" class="form-control" placeholder="Confirm Password" required>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
            
          </form>
        </div>
      </div>`
    }
    
    function createDashBoard(books){
      console.log("Create books called");
      console.log(books);
  
       return getBooksView(books);
  }
  
  function getBooksView(books){

    const before_content = `
   <div class="album py-5 bg-light">
   <div class="container">
     <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`;
   const after_content = `
   </div>
   </div>
   </div>
   `;
 
     let content="";
     for(i=0;i<books.length;i++){
        let id=books[i].id;
        console.log(id);
         let title=books[i];
         let info=title.volumeInfo.title;
         console.log(info);
         let iauthor=books[i];
         let author = iauthor.volumeInfo.authors;
         console.log(author);
         let etag=books[i].volumeInfo.description;
         console.log(etag);
         content = content + `
             <div class="card test-center" >
             
   <div class="card-header">
   <b>Book Title : </b>${info}
   </div>
   <div class="card-body">
     <h5 class="card-title"></h5>
     <p class="card-text"><b>Author : </b> ${author}</p>
    
     <p class="card-text"><b>Description: </b></p>
     <div style="height:80px;overflow:auto">
     <p class="card-text">${etag}</p></div>
     <div class="btn-group">
              <button type="button" onclick="addfav('${id}')" class="btn btn-sm btn-primary">Add to Favourite</button>
            </div>
     
   </div>
 </div>
     `;
             
                 
             }
             return before_content + content + after_content;
     
 
 }
 async function addfav(code) {
 
  let books = booksList.find((tmp) => {
    console.log(tmp);
    return tmp.id == code;
  });
  let author=books['authors'];
   console.log(books);
  let obj = {};
  obj.id =books.id;
  let info=books.volumeInfo.title;
  obj.title=info;
  console.log(obj.title);
 // let author = books.volumeInfo.authors;
  obj.author =author;
  let etag=books.volumeInfo.description;
  obj.etag = etag;
  //alert(JSON.stringify(obj));
  console.log("Add to fav called");
  console.log(code);
  console.log(obj);

  let res = await fetch("http://localhost:8081/spring-hibernate-mysql-rest/api/v1/favourite", {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (res.status == 200 || res.status == 201) {
    alert("Book successfully added to your Favourite List");
  } else {
    alert("Book already marked as Favourite");
  }
}


  async function fetchBooks(){
    let res = await fetch("https://www.googleapis.com/books/v1/volumes?q=Business");
    console.log(res);
    if(res.status == 200){
        let book=await res.json();
        console.log(book);
        booksList=book.items;
        console.log(booksList);
        console.log(book.items);
    }
    else{
        console.log("failed to fetch ");
    }
}

async function searchBook() {
  let search_country = document.getElementById('search_country').value;
  let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search_country}`);
  if (res.status == 200) {
    console.log("Search book is called");
    let book=await res.json();
    books=book.items;
      console.log(books);
     
    setMainView(getSearchView(books));
  } else {
    let error_msg = `<h2>No books found</h2>`;
    setMainView(error_msg);
  }
}

function getFavView(match) {
  const before_content = `
<div class="album py-5 bg-light">
<div class="container">
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`;
const after_content = `
</div>
</div>
</div>
`;
let content = "";
  console.log(match);
match.forEach((matches) => {
let unique_id=matches.id;
  console.log("unique id is"+unique_id);
  let title=matches.title;
  console.log(title);
  
  
  content = content + `
  <div class="card text-center">
  <h5 class="card-header">Book Id:-${unique_id}</h5>
  <div class="card-body">
  <h5 class="card-title">Book Title:${title}</h5>
  
  
 
  </div>
</div>`;
})
return before_content + content + after_content;
  
}


        

      async function signUp() {
        event.preventDefault();
        console.log("signup function called");
        let fname = document.getElementById('inputFname').value;
        let lname = document.getElementById('inputLname').value;
        let email = document.getElementById('inputEmail').value;
        let pass = document.getElementById('inputPassword').value;
        let pass_confirm = document.getElementById('inputPasswordConfirm').value;
        if (pass == pass_confirm) {
          let obj = {};
          obj.fName = fname;
          obj.lName = lname;
          obj.email = email;
          obj.password = pass;
      
          let res = await fetch("http://localhost:8081/spring-hibernate-mysql-rest/api/v1/user", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
              'Content-Type': 'application/json'
            }
          })
      
          if (res.status == 200 || res.status == 201) {
            alert("User added");
            setSignInView();
          } else {
            alert("User with the email Already Exist");
          }
        } else {
          alert("Password doesn't match");
        }
      }
      
      async function signIn() {
        event.preventDefault();
        console.log("sign-in function called");
        let email = document.getElementById('signinEmail').value;
        let pass = document.getElementById('signinPassword').value;
        let obj = {};
        obj.email = email;
        obj.password = pass;
      
        let res = await fetch("http://localhost:8081/spring-hibernate-mysql-rest/api/v1/login", {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      
        if (res.status == 200) {
          sessionStorage.setItem("login", "true");
          alert("Login Successfull");
          console.log("error here")
          await fetchBooks();
          console.log("fetching error");
          setMainView(getBooksView(booksList));
          link_signup.className = "hide-element";
          link_logout.className = "nav-item show-element button-style";
          
          
        } else {
          alert("Login Failed. Enter the Valid Credentials");
        }
      }
      
      async function logout() {
        console.log("logout called");
        let res = await fetch("http://localhost:8081/spring-hibernate-mysql-rest/api/v1/logout")
        if (res.status == 200) {
          sessionStorage.removeItem("login");
          setSignInView();
          link_signup.className = "show-element nav-link";
          link_logout.className = "hide-element";
        }
      }

      async function fetchFavourites() {
        let res = await fetch("http://localhost:8081/spring-hibernate-mysql-rest/api/v1/favourite");
        console.log(res);
        if (res.status == 200) {
          let books = await res.json();
          favList = books;
          return books;
        } else {
          console.log("failed to fetch the books")
        }
      }
      function getSearchView(books){

        const before_content = `
       <div class="album py-5 bg-light">
       <div class="container">
         <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`;
       const after_content = `
       </div>
       </div>
       </div>
       `;
     
         let content="";
         for(i=0;i<books.length;i++){
            let id=books[i].id;
            console.log(id);
             let title=books[i];
             let info=title.volumeInfo.title;
             console.log(info);
             let iauthor=books[i];
             let author = iauthor.volumeInfo.authors;
             console.log(author);
             let etag=books[i].volumeInfo.description;
             console.log(etag);
             content = content + `
                 <div class="card test-center" >
                 
       <div class="card-header">
       <b>Book Title : </b>${info}
       </div>
       <div class="card-body">
         <h5 class="card-title"></h5>
         <p class="card-text"><b>Author : </b> ${author}</p>
        
         <p class="card-text"><b>Description: </b></p>
         <div style="height:80px;overflow:auto">
         <p class="card-text">${etag}</p></div>
         <div class="btn-group">
                  <button type="button" onclick="addfav('${id}')" class="btn btn-sm btn-primary">Add to Favourite</button>
                </div>
         
       </div>
     </div>
         `;
                 
                     
                 }
                 return before_content + content + after_content;
         
     
     }
