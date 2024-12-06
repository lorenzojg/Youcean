function showDetails(name, description, image, github, linkedin) {
    const overlay = document.getElementById('detailsOverlay');
    document.getElementById('detailsName').innerText = name;
    document.getElementById('detailsDescription').innerText = description;
    document.getElementById('detailsImage').src = image;
    document.getElementById('githubLink').href = github;
    document.getElementById('linkedinLink').href = linkedin;

    overlay.classList.add('visible');
}

function closeDetails() {
    const overlay = document.getElementById('detailsOverlay');
    overlay.classList.remove('visible');
}
