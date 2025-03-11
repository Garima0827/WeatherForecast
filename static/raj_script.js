function toggleChat() {
  const chatPopup = document.getElementById('chatPopup');
  girl_img2 = document.querySelector('.girl-img-container');
  const chatBtn = document.querySelector('.chat-btn');
  if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
    chatPopup.style.display = 'flex';
    chatBtn.style.display = 'none';
    girl_img2.classList.add('hide');
    
  } else {
    chatPopup.style.display = 'none';
    chatBtn.style.display = 'block';
    girl_img2.classList.remove('hide');
  }
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const chatBody = document.getElementById('chatBody');
  
  if (messageInput.value.trim() !== '') {
    const messageElement = document.createElement('p');
    messageElement.textContent = messageInput.value;
    messageElement.style.backgroundColor = '#e1ffc7';
    messageElement.style.padding = '5px 10px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.maxWidth = '80%';
    messageElement.style.alignSelf = 'flex-end';
    messageElement.style.margin = '5px 0';
    
    chatBody.appendChild(messageElement);
    messageInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

// Add event listener for Enter key in the message input
document.getElementById('messageInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

const girl_img = document.querySelector('.girl-img-container');
girl_img.addEventListener('click', toggleChat);

// onready remove class hide from girl_img

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
  girl_img.classList.remove('hide');
  }, 5000);
  const formContainer = document.getElementById('myform_container');
    
    formContainer.addEventListener('click', function(event) {
        if (event.target === this) {
            hideform();
        }
    });
});


  const bell = document.querySelector('.bell-button .shake-effect');
  
  // Function to start and stop the shaking animation
  function toggleShake() {
    bell.style.animationPlayState = 'running';
    
    // Reset the animation after it completes
    setTimeout(() => {
      bell.style.animationPlayState = 'paused';
    }, 820); // This should match the duration of your shake animation
  }

  // Initial shake
  toggleShake();

  // Set up interval to shake every 5 seconds
 
setInterval(toggleShake, 5000);


 // Animate function
function stepAnimateText(element, animation, delay){

  var text = $(element).text();
  var curr = '';

  for (var i=0; i < text.length; i++){
    var character = text.charAt(i);
    $(element).html(curr+'<span class="'+animation+'" style="-webkit-animation-delay: '+i*delay+'s; animation-delay: '+i*delay+'s">'+character +"</span>");
    curr = $(element).html();
  }
}

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");

const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

function loginclick(){
  document.getElementById("myform_container").classList.remove("hide");
  container.classList.remove("active");
}
function signupclink(){
  document.getElementById("myform_container").classList.remove("hide");
  container.classList.add("active");
}
function hideform(){
  document.getElementById("myform_container").classList.add("hide");
}


    // use ajex for login/signup on form submit
    $("#signup_form").on("submit", function(e){
        e.preventDefault();
        $.ajax({
          url: '/register',
          type: 'POST',
          data: $(this).serialize(),
          dataType: 'json',
          success: function(response) {
            if (response.status === "success") {
              // Registration and login successful, redirect to dashboard
              window.location.href = "/dashboard";
            } else {
              // Show error message
              alert(response.message);
            }
          },
          error: function(xhr, status, error) {
            // Handle any AJAX errors
            alert("An error occurred. Please try again.");
          }
        });
      });
  
  $("#login_form").on("submit", function(e){
    e.preventDefault();
    $.ajax({
      url: '/login',
      type: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function(response) {
        if (response.status === "success") {
          // Redirect to dashboard on successful login
          window.location.href = "/dashboard";
        } else {
          // Show error message
          alert(response.message);
        }
      },
      error: function(xhr, status, error) {
        // Handle any AJAX errors
        alert("An error occurred. Please try again.");
      }
    });
  });
  