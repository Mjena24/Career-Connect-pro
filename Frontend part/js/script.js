const API_BASE = "http://localhost:5001/api";





// Job Listings Data
const jobs = [
    {title: "Software Engineer", company: "TCS", location: "Bangalore", type: "Full-time", experience: "1-3 years"},
    {title: "Data Analyst", company: "Infosys", location: "Pune", type: "Full-time", experience: "Fresher"},
    {title: "Web Developer", company: "Wipro", location: "Hyderabad", type: "Remote", experience: "2-5 years"},
    // ...add 50+ more jobs
];


let displayedJobs = 0;
const jobsPerPage = 6;

function loadJobs() {
    const container = document.getElementById('jobsContainer');
    for(let i = displayedJobs; i < displayedJobs + jobsPerPage && i < jobs.length; i++){
        const job = jobs[i];
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Experience:</strong> ${job.experience}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <a href="job-details.html">View Details</a>
        `;
        container.appendChild(jobCard);
    }
    displayedJobs += jobsPerPage;
    if(displayedJobs >= jobs.length) document.getElementById('showMoreBtn').style.display = 'none';
}

document.getElementById('showMoreBtn').addEventListener('click', loadJobs);
window.onload = loadJobs;

// Company Logos Carousel
const companies = ["TCS","Infosys","Wipro","HCL","Tech Mahindra","IBM","Capgemini","L&T","Cognizant"];
const carousel = document.getElementById('companyCarousel');
companies.forEach(c => {
    const img = document.createElement('img');
    img.src = `images/${c}.png`; // Placeholder image names
    img.alt = c;
    carousel.appendChild(img);
});

// Testimonials Carousel
const testimonialCarousel = document.getElementById('testimonialCarousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let scrollAmount = 0;
const scrollStep = 270; // width of one card + gap
const maxScroll = testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth;

// Next Button
nextBtn.addEventListener('click', () => {
    if(scrollAmount < maxScroll){
        scrollAmount += scrollStep;
        testimonialCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
});

// Prev Button
prevBtn.addEventListener('click', () => {
    if(scrollAmount > 0){
        scrollAmount -= scrollStep;
        testimonialCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
});

// Auto-scroll every 5 seconds
setInterval(() => {
    if(scrollAmount >= maxScroll){
        scrollAmount = 0;
    } else {
        scrollAmount += scrollStep;
    }
    testimonialCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}, 5000);


// Search function (basic)
function searchJobs() {
    const input = document.querySelector('.search-bar input').value.toLowerCase();
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(input) || 
        job.company.toLowerCase().includes(input) ||
        job.location.toLowerCase().includes(input)
    );
    const container = document.getElementById('jobsContainer');
    container.innerHTML = '';
    displayedJobs = 0;
    filteredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Experience:</strong> ${job.experience}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <a href="job-details.html">View Details</a>
        `;
        container.appendChild(jobCard);
    });
}
// ---------- Save user after registration ----------
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  const userData = { name, email, password };

  // Save to localStorage
  localStorage.setItem('jobFinderUser', JSON.stringify(userData));

  registerMsg.innerText = "✅ Registration Successful!";
  registerMsg.style.color = "#ffce00";

  setTimeout(() => {
    registerModal.style.display = "none";
    loginModal.style.display = "flex";
    registerMsg.innerText = "";
  }, 1200);
});

// ---------- Login check ----------
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const storedUser = JSON.parse(localStorage.getItem('jobFinderUser'));

  if (storedUser && email === storedUser.email && password === storedUser.password) {
    loginMsg.innerText = "✅ Login Successful!";
    loginMsg.style.color = "#00ff88";
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1000);
  } else {
    loginMsg.innerText = "❌ Invalid email or password!";
    loginMsg.style.color = "red";
  }
});
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    // Save to Local Storage
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    // Show success message
    document.getElementById('registerMsg').innerText = "✅ Registration Successful!";
    document.getElementById('registerMsg').style.color = "#00ff88";

    // Redirect to profile after 1 second
    setTimeout(() => {
        window.location.href = "profile.html";
    }, 1000);
});


