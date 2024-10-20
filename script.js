

document.getElementById("languageSelect").addEventListener("change", fetchRandomRepo);
document.getElementById("refreshButton").addEventListener("click", fetchRandomRepo);

function fetchRandomRepo() {
    const language = document.getElementById("languageSelect").value;
    if (!language) {
        showMessage("Please select a language");
        return;
    }

    showMessage("Loading, please wait...");

    fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars`)
        .then(response => response.json())
        .then(data => {
            if (data.total_count === 0) {
                showMessage("No repositories found.");
                return;
            }
            const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
            displayRepoInfo(randomRepo);
        })
        .catch(() => {
            showMessage("Error fetching repositories", true);
        });
}

function displayRepoInfo(repo) {
    document.getElementById("repoName").textContent = repo.name;
    document.getElementById("repoDescription").textContent = repo.description || "No description available";
    document.getElementById("repoStars").textContent = repo.stargazers_count;
    document.getElementById("repoForks").textContent = repo.forks_count;
    document.getElementById("repoIssues").textContent = repo.open_issues_count;

    document.getElementById("statusMessage").classList.add("hidden");
    document.getElementById("repoInfo").classList.remove("hidden");
    document.getElementById("refreshButton").classList.remove("hidden");
}

function showMessage(message, isError = false) {
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? "red" : "#333";
    statusMessage.classList.remove("hidden");

    document.getElementById("repoInfo").classList.add("hidden");
    document.getElementById("refreshButton").classList.add("hidden");
}
