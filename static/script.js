function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
  }
  
 // Background image slideshow
 let currentImageIndex = 0;
 const images = document.querySelectorAll('.bg-image');
 const changeInterval = 3000; //yha 3 sec ka timr lgaye hu
 
 function changeBackgroundImage() {
   images.forEach((image, index) => {
     image.style.opacity = index === currentImageIndex ? '1' : '0';
   });
   currentImageIndex = (currentImageIndex + 1) % images.length;
 }
 
 setInterval(changeBackgroundImage, changeInterval);
 changeBackgroundImage(); 


// Adding hover effects for more interactivity
document.querySelectorAll('.iot-card').forEach(card => {
  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.1)';
  });
  card.addEventListener('mouseout', () => {
    card.style.transform = 'scale(1)';
  });
});


  // Simple AOS-like animation function
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        const animationType = el.getAttribute('data-aos');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.classList.add('aos-init');
                    observer.unobserve(el);
                }
            });
        });
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initAOS);
  

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-init');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
  
    document.querySelectorAll('.preview-card').forEach(card => {
      observer.observe(card);
    });
  });

  
  document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '5';
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    document.querySelectorAll('.preview-card').forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  
    document.querySelectorAll('.feature-card').forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  });

  

  AOS.init({
    duration: 600, 
    easing: 'ease-in-out', 
    once: true, 
  });



 // Services section animation on scroll
const serviceCards = document.querySelectorAll('.service-card');
window.addEventListener('scroll', revealServiceCards);

function revealServiceCards() {
  const triggerBottom = window.innerHeight * 0.85;

  serviceCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 200);
    }
  });
}




// Smooth scroll for footer links
const footerLinks = document.querySelectorAll('.footer-links a');

footerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
