//Document Selectors
//Overview Div selection
const overview = document.querySelector(".overview");

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

};