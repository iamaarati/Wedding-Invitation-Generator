document.addEventListener("DOMContentLoaded", async function () {
    // Get the unique number from URL if it exists
    const urlParams = new URLSearchParams(window.location.search);
    const uniqueNumber = urlParams.get('id');

    let weddingData = {
        bride_name: "Bride",
        groom_name: "Groom",
        wedding_date: "Wedding Date",
        wedding_time: "Wedding Time",
        venue: "Venue"
    };

    // If we have a unique number, try to fetch the wedding details
    if (uniqueNumber) {
        try {
            const response = await fetch('http://localhost:8000/core/wedding_detail/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unique_number: uniqueNumber
                })
            });

            if (response.ok) {
                const data = await response.json();
                weddingData = data;
            } else {
                console.error('Error fetching wedding details');
                // Continue with default data if there's an error
            }
        } catch (error) {
            console.error('Error:', error);
            // Continue with default data if there's an error
        }
    }

    // Update the page with either the API data or default values
    document.getElementById("bride-name").innerText = weddingData.bride_name;
    document.getElementById("groom-name").innerText = weddingData.groom_name;
    document.getElementById("wedding-details").innerText = 
        `ON ${weddingData.wedding_date} AT ${weddingData.wedding_time}, ${weddingData.venue}`;

    // Venue button functionality
    document.getElementById("venue-button").addEventListener("click", function () {
        if (weddingData.venue && weddingData.venue !== "Venue") {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(weddingData.venue)}`;
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