const button= document.querySelector("button");
const btn = document.getElementById("btn")


// function to get the data to the server
button.addEventListener("click",() =>{
   let formdata = {};
   formdata.name = document.getElementById("name").value;
   formdata.email = document.getElementById("email").value;
   formdata.password = document.getElementById("password").value;

   // sending the form data to server as post req using fetch fuction
   fetch("/register",{
      method:"post",
      headers:{
         "content-type":"application/json",
      },
      body:JSON.stringify(formdata)
   })
   .then((response) => response.json())
   .then((data) => {
      
      if(data.signup){
         window.location.href = '/'
      }
      else{
         alert("invalid credentials!! please try again");
      }
   });
});

 btn.addEventListener("click",() =>{
  
   let loginData = {};
   loginData.email=document.getElementById("email").value;
   loginData.password = document.getElementById("password").value;


   // fetch is a promise ,fetch resolves if the res from server is true
   fetch('/login',{
      method:"post",
      headers:{
         "content-type":"application/json",
      },
      body:JSON.stringify(loginData)
   })
   .then((response) => response.json())
   .then((data) =>{
      if(data.login){
         window.location.href = '/home'
      }else{
         alert('something went wrong signup again');
      window.location.href = '/signup'
         
      }
   })
   
})
   
// LOGOUT
// 1) clear local storage
// 2) clear session storage
// 3) clear cookie storage
function logOut(){
   

   localStorage.clear()
   sessionStorage.clear()
///Call seperate route to clear cookies( check user.js)
location.assign('/logout') 
}

   




   
