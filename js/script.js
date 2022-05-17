//Document Selectors
//Overview Div selection
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


//github username
const username = "Beagles-Designs";
//Fetch github profile info
const ghProfile = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    displayUser(data);
};

ghProfile();

const displayUser = function(userData) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${userData.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Bio:</strong> ${userData.bio}</p>
            <p><strong>Location:</strong> ${userData.location}</p>
            <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
         </div> `;
         overview.append(div);
    getRepos();     

};

const getRepos = async function () {
    const response = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await response.json();
    //console.log(repos);
    displayRepos(repos);
};


const displayRepos = function(repos){
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

//Adding Click event for the UL list of Repos
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoSpecifics(repoName);
    };

});

//Get specific repo information
const repoSpecifics = async function (repoName){
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
    const languageData = await fetchLanguages.json();
    
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        };
    //console.log(repoInfo.name);
    displaySpecificRepo(repoInfo, languages);
};

//Display the specific repo information 
const displaySpecificRepo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");
};

//event listener for Back to Repos Button
backButton.addEventListener("click", function(){
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
    const searchInput = e.target.value;
    const search = searchInput.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    
    for (const repo of repos){
        const lowercaseRepo = repo.innerText.toLowerCase();
        if (lowercaseRepo.includes(search)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});