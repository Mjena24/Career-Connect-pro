const API_BASE = "http://localhost:5001/api";



// Full Jobs Data (50+ sample jobs)
const jobs = [
    {title: "Software Engineer", company: "TCS", location: "Bangalore", type: "Full-time", experience: "1-3 years", workMode: "Onsite"},
    {title: "Data Analyst", company: "Infosys", location: "Pune", type: "Full-time", experience: "Fresher", workMode: "Remote"},
    {title: "Web Developer", company: "Wipro", location: "Hyderabad", type: "Remote", experience: "2-5 years", workMode: "Remote"},
    {title: "Project Manager", company: "HCL", location: "Delhi", type: "Full-time", experience: "5-10 years", workMode: "Onsite"},
    {title: "Intern - AI Research", company: "IBM", location: "Bangalore", type: "Internship", experience: "Fresher", workMode: "Remote"},
    {title: "UX Designer", company: "Capgemini", location: "Mumbai", type: "Full-time", experience: "3-5 years", workMode: "Onsite"},
    {title: "Cloud Engineer", company: "Tech Mahindra", location: "Pune", type: "Full-time", experience: "5-10 years", workMode: "Remote"},
    // Add more jobs until 50+ (can duplicate or modify titles for demo)
];

let displayedJobs = 0;
const jobsPerPage = 6;

function loadJobs(jobList = jobs) {
    const container = document.getElementById('jobsContainer');
    container.innerHTML = '';
    displayedJobs = 0;

    for(let i = 0; i < Math.min(jobsPerPage, jobList.length); i++){
        createJobCard(container, jobList[i]);
        displayedJobs++;
    }

    document.getElementById('showMoreBtn').style.display = displayedJobs < jobList.length ? 'block' : 'none';
}

// Create Job Card
function createJobCard(container, job) {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Experience:</strong> ${job.experience}</p>
        <p><strong>Type:</strong> ${job.type}</p>
        <p><strong>Work Mode:</strong> ${job.workMode}</p>
        <a href="job-details.html">View Details</a>
    `;
    container.appendChild(jobCard);
}

// Show More Jobs
document.getElementById('showMoreBtn').addEventListener('click', () => {
    const container = document.getElementById('jobsContainer');
    const remainingJobs = jobs.slice(displayedJobs, displayedJobs + jobsPerPage);
    remainingJobs.forEach(job => createJobCard(container, job));
    displayedJobs += remainingJobs.length;

    if(displayedJobs >= jobs.length) document.getElementById('showMoreBtn').style.display = 'none';
});

// Apply all filters
function applyAllFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const expFilter = document.getElementById('experienceFilter').value;
    const locFilter = document.getElementById('locationFilter').value;
    const remote = document.getElementById('remoteFilter').checked;
    const onsite = document.getElementById('onsiteFilter').checked;
    const jobType = document.getElementById('jobTypeFilter').value;

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchInput) || job.company.toLowerCase().includes(searchInput);
        const matchesExp = expFilter ? job.experience === expFilter : true;
        const matchesLoc = locFilter ? job.location === locFilter : true;
        const matchesRemote = remote ? job.workMode === "Remote" : true;
        const matchesOnsite = onsite ? job.workMode === "Onsite" : true;
        const matchesJobType = jobType ? job.type === jobType : true;

        return matchesSearch && matchesExp && matchesLoc && matchesRemote && matchesOnsite && matchesJobType;
    });

    loadFilteredJobs(filteredJobs);
}

// Load filtered jobs
function loadFilteredJobs(jobList) {
    const container = document.getElementById('jobsContainer');
    container.innerHTML = '';
    displayedJobs = 0;

    jobList.forEach(job => createJobCard(container, job));
    document.getElementById('showMoreBtn').style.display = 'none';
}

// Initial load
window.onload = () => loadJobs();
