const body = document.body;

const btnTheme = document.querySelector(".fa-moon");
const btnHamburger = document.querySelector(".fa-bars");

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

const getBodyTheme = localStorage.getItem("portfolio-theme");
const getBtnTheme = localStorage.getItem("portfolio-btn-theme");

addThemeClass(getBodyTheme, getBtnTheme);

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem("portfolio-theme"));
  btnTheme.classList.remove(localStorage.getItem("portfolio-btn-theme"));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem("portfolio-theme", bodyClass);
  localStorage.setItem("portfolio-btn-theme", btnClass);
};

const toggleTheme = () => {
  const isDarkMode = body.classList.contains("dark");

  if (isDarkMode) {
    setTheme("light", "fa-moon");
    removeSnowEffect();
  } else {
    setTheme("dark", "fa-sun");
    addSnowEffect();
  }
};

btnTheme.addEventListener("click", toggleTheme);

const displayList = () => {
  const navUl = document.querySelector(".nav__list");

  if (btnHamburger.classList.contains("fa-bars")) {
    btnHamburger.classList.remove("fa-bars");
    btnHamburger.classList.add("fa-times");
    navUl.classList.add("display-nav-list");
  } else {
    btnHamburger.classList.remove("fa-times");
    btnHamburger.classList.add("fa-bars");
    navUl.classList.remove("display-nav-list");
  }
};

btnHamburger.addEventListener("click", displayList);

document.addEventListener("scroll", () => {
  const btnScrollTop = document.querySelector(".scroll-top");
  btnScrollTop.style.display = body.scrollTop > 500 || document.documentElement.scrollTop > 500 ? "block" : "none";
});

// Snow effect for dark mode
function addSnowEffect() {
  const snowContainer = document.createElement("div");
  snowContainer.classList.add("snow-container");
  document.body.appendChild(snowContainer);

  for (let i = 0; i < 50; i++) {
    let snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.animationDelay = `${Math.random() * 2}s`;
    snowContainer.appendChild(snowflake);
  }
}

function removeSnowEffect() {
  document.querySelector(".snow-container")?.remove();
}

// Function to calculate experience dynamically
function calculateExperience(startYear, startMonth) {
  const startDate = new Date(startYear, startMonth - 1); // Convert month to zero-based index
  const currentDate = new Date();

  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();

  if (months < 0) {
      years--;
      months += 12;
  }

  return `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.3 });
  projectCards.forEach((card) => observer.observe(card));

  // Typewriter Animation
  const roles = ["AI Engineer 🧠", "Gen AI Developer ✨", "Machine Learning Engineer 🚀"];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  const typingSpeed = 100, erasingSpeed = 50, delayBetweenRoles = 1500;

  function typeText() {
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;
    if (!isDeleting && charIndex <= roles[roleIndex].length) {
      typingText.innerHTML = roles[roleIndex].substring(0, charIndex++);
      setTimeout(typeText, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      typingText.innerHTML = roles[roleIndex].substring(0, charIndex--);
      setTimeout(typeText, erasingSpeed);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeText, delayBetweenRoles);
    }
  }
  setTimeout(typeText, 1000);

  // Initialize correct theme on page load
  if (body.classList.contains("light")) {
    addDayEffect();
  } else {
    removeDayEffect();
  }

  // Update the experience text in the HTML dynamically
  const experienceElement = document.getElementById("experience-text");
    if (experienceElement) {
        // Set your joining date (YYYY, MM)
        experienceElement.textContent = calculateExperience(2023, 8);
    }
});