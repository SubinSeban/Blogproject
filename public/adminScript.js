// to show uploaded files in image preview div
function showImages(){
    
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");

// returs as an array of images/files
const selectedImage = imageInput.files;

imagePreview.innerHTML = null;

for(let i=0; i<selectedImage.length; i++){
    const image = document.createElement("img");
    image.src = URL.createObjectURL(selectedImage[i]);
    image.style.width = "150px";
    image.style.margin = "3PX";
    imagePreview.appendChild(image)
}

};

// Admin signup 
function doSignUp(){
    
     let signupData = {};
     signupData.name =  document.getElementById('name').value;
     signupData.email =  document.getElementById('email').value;
     signupData.password =  document.getElementById('password').value

    fetch('/register',{
        method:"post",
        headers:{
           "content-type":"application/json",
        },
        body:JSON.stringify(signupData)
     })
     .then((response) => response.json())
     .then((data) => {
        
        if(data.signup){
           window.location.href = '/admin'
        }
        else{
           alert("invalid credentials!! please try again");
        }
     });
};

function doLogin(){
    let loginData = {};
    loginData.email = document.getElementById('email').value;
    loginData.password = document.getElementById('password').value;

    fetch('admin/login',{
        method:"post",
        headers:{
           "content-type":"application/json",
        },
        body:JSON.stringify(loginData)
     })
     .then((response) => response.json())
     .then((data) =>{
        if(data.login){
           window.location.href = 'admin/uploads'
        }else{
           alert('something went wrong signup again');
        window.location.href = 'admin/signup'
           
        }
     })
}


// when evoking deletepost the blog in db and uploads in server has to deleted,
// the id passed as argument recieved as parameter in function
// function deletePost(postId){
   
function deletePost(postId) {
   fetch('/admin/deletepost', {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ postId: postId }),
   })
   .then(response => response.json())
   .then(data => {
     // Assuming the server returns an object with a "success" property
     if (data.delete) {
       // Page reload
       location.reload();
     } else {
       // Show an alert if something went wrong
       alert('Something went wrong');
     }
   })
   .catch(error => {
     // Handle errors
     console.error('Error:', error);
   });
 }
 