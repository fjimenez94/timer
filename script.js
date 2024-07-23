function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    function updateClock() {
        const t = getTimeRemaining(endtime);
        clock.innerHTML = `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s`;
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

function loadRandomGif() {
    const apiKey = 'O1Kz0tkbECQsF25OgCCsX3IJtKqrDSoY';
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=love&rating=g`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const gifUrl = data.data.images.original.url;
            const gifContainer = document.getElementById('gif-container');
            const img = document.createElement('img');
            img.src = gifUrl;
            gifContainer.appendChild(img);
        })
        .catch(error => console.error('Error fetching GIF:', error));
}

const deadline = new Date(Date.parse('2024-07-24T19:00:00-06:00'));
initializeClock('countdown', deadline);
loadRandomGif();
