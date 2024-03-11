
        const signUpForm = document.getElementById('signUpForm');
        const loginForm = document.getElementById('loginForm');

        const signUpButton = document.getElementById('signupbtn');
        const signInButton = document.getElementById('signinbtn');
       

        //frontend functionality to switch login and signup 
    
        signUpButton.addEventListener('click', function (event) {
            event.preventDefault();
            signUpButton.classList.remove('disable');
            signInButton.classList.add('disable');
            loginForm.classList.add('notactive');
            signUpForm.classList.remove('notactive');
        });

    
        signInButton.addEventListener('click', function (event) {
            event.preventDefault();
            loginForm.classList.remove('notactive');
            signUpForm.classList.add('notactive');
            signInButton.classList.remove('disable');
            signUpButton.classList.add('disable'); 
        });


        //functionality to fetch data from the form and signing up a new user
         signUpForm.addEventListener("submit", function (event) {
                event.preventDefault();
                 
                console.log("hy");
                const userName = document.getElementById('namefield').value;
                const email = document.getElementById('SignEmail').value;
                const password = document.getElementById('SignPass').value;
             
                fetch('http://localhost:8000/api/v1/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userName,email,password}),
                })
                .then(response => {
                    if (response.status==200) {
                        console.log("success");
                        alert('Sign up successful!'); 
                    } else {
                        console.log("failed");
                        alert('Sign up failed. Please try again.');
                    }
                })
                .catch(error => {
                    console.log("error");
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
                
          });
   
//logging in existing user
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
      //  console.log(emailInput);
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

        
            fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password})
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'library.html';
                    document.querySelector('input[type="email"]').value ="";
                   document.querySelector('input[type="password"]').value="";
                    alert('Log In successful!');    
                } else {
                    alert('Log In failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
            
        });

