document.addEventListener("DOMContentLoaded", function () {
    // Get wedding data from URL parameters
    const params = new URLSearchParams(window.location.search);
    const bride = params.get('bride') || "Bride";
    const groom = params.get('groom') || "Groom";
    const date = params.get('date') || "Wedding Date";
    const time = params.get('time') || "Wedding Time";
    const venue = params.get('venue') || "Venue";
    const weddingId = params.get('id');
    const uniqueNumber = params.get('unique');

    document.getElementById("bride-name").innerText = bride;
    document.getElementById("groom-name").innerText = groom;
    document.getElementById("wedding-details").innerText = `ON ${date} AT ${time}, ${venue}`;

    document.getElementById("venue-button").addEventListener("click", function () {
        if (venue && venue !== "Venue") {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
            window.open(googleMapsUrl, "_blank");
        } else {
            alert("Venue location is not set.");
        }
    });

    createSakuraPetals();
});

function downloadCard() {
    alert("Downloading invitation card...");
    // Implement the download functionality here
}

function shareOnTwitter() {
    const brideElement = document.getElementById("bride-name");
    const groomElement = document.getElementById("groom-name");
    const bride = brideElement.innerText;
    const groom = groomElement.innerText;
    const text = encodeURIComponent(`Join us in celebrating ${bride} & ${groom}'s sakura-themed wedding!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
}

function createSakuraPetals() {
    const petalsContainer = document.body;
    const numberOfPetals = 30;

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.width = `${Math.random() * 10 + 5}px`;
        petal.style.height = `${Math.random() * 10 + 5}px`;
        petal.style.animationDelay = `${Math.random() * 10}s`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petalsContainer.appendChild(petal);
    }
}

// Play background music on screen click
document.body.addEventListener('click', () => {
    if (!document.getElementById('bg-music')) {
        const audio = document.createElement('audio');
        audio.id = 'bg-music';
        audio.src = 'assets/background.mp3';
        audio.loop = true;
        audio.play();
        document.body.appendChild(audio);
    }
});

// Show Share button for creator only, hide for guests using shared link
const params = new URLSearchParams(window.location.search);
const uniqueNumber = params.get('unique');
const isSharedLink = params.get('shared') === 'true';

if (!isSharedLink) {
    const shareBtn = document.createElement('button');
    shareBtn.textContent = 'Share';
    shareBtn.className = 'button primary';
    shareBtn.addEventListener('click', () => {
        // Create the invitation link with only the unique number
        const baseUrl2 = 'file:///C:/Users/aarat/OneDrive/Desktop/wedding/frontend/invite_you.html';
        const shareLink = `${baseUrl2}?id=${uniqueNumber}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareLink);
        alert('Invitation link copied to clipboard! Share it with your guests.');
    });
    document.querySelector('.buttons').appendChild(shareBtn);
}

// Handle guest back button behavior if using shared link
if (isSharedLink) {
    const backHandler = () => {
        alert('Create your own link');
        window.location.href = 'index.html';
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', backHandler);
}