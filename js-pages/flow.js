// =====================
// SOUND SYSTEM (WORKING)
// =====================

const activeSounds = {};
let currentVolume = 0.5;

const soundFiles = {
    rain: "audio/rain.mp3",
    ocean: "audio/ocean.mp3",
    forest: "audio/forest.mp3",
    fire: "audio/fire.mp3",
    cafe: "audio/cafe.mp3",
    night: "audio/night.mp3"
};

function toggleSound(soundName) {
    const button = document.querySelector(`[data-sound="${soundName}"]`);
    if (!button) return;

    if (activeSounds[soundName]) {
        stopSound(soundName);
        button.classList.remove("active");
    } else {
        startSound(soundName);
        button.classList.add("active");
    }
}

function startSound(soundName) {
    if (!soundFiles[soundName]) return;

    const audio = new Audio(soundFiles[soundName]);
    audio.loop = true;
    audio.volume = currentVolume;

    audio.play().catch(err => console.log("Audio error:", err));
    activeSounds[soundName] = audio;
}

function stopSound(soundName) {
    const audio = activeSounds[soundName];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    delete activeSounds[soundName];
}

function stopAllSounds() {
    Object.keys(activeSounds).forEach(stopSound);
    document.querySelectorAll(".sound-button").forEach(btn =>
        btn.classList.remove("active")
    );
}

function updateVolume(value) {
    currentVolume = value / 100;

    Object.values(activeSounds).forEach(audio => {
        audio.volume = currentVolume;
    });

    const volumeDisplay = document.getElementById("volumeValue");
    if (volumeDisplay) volumeDisplay.textContent = value;
}

// =====================
// BOOK TRACKER
// =====================

function addBook(e) {
    e.preventDefault();

    const titleInput = document.getElementById("bookTitle");
    const authorInput = document.getElementById("bookAuthor");
    if (!titleInput || !authorInput) return;

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    if (!title || !author) return;

    const books = JSON.parse(localStorage.getItem("trackedBooks") || "[]");

    books.push({
        id: Date.now(),
        title,
        author,
        completed: false,
        addedDate: new Date().toISOString()
    });

    localStorage.setItem("trackedBooks", JSON.stringify(books));
    titleInput.value = "";
    authorInput.value = "";

    displayBooks();
    updateStats();
}

function displayBooks() {
    const booksList = document.getElementById("booksList");
    if (!booksList) return;

    const books = JSON.parse(localStorage.getItem("trackedBooks") || "[]");

    if (!books.length) {
        booksList.innerHTML = `<p>No books tracked yet.</p>`;
        return;
    }

    books.sort((a, b) => a.completed - b.completed);
    booksList.innerHTML = "";

    books.forEach(book => {
        const item = document.createElement("div");
        item.className = "book-item";

        item.innerHTML = `
            <div>
                <h4>${book.title}</h4>
                <p>by ${book.author}</p>
            </div>
            <div>
                ${
                    book.completed
                        ? `<span>✓ Completed</span>`
                        : `<button onclick="markComplete(${book.id})">Mark Complete</button>`
                }
                <button onclick="deleteBook(${book.id})">Delete</button>
            </div>
        `;
        booksList.appendChild(item);
    });
}

function markComplete(bookId) {
    const books = JSON.parse(localStorage.getItem("trackedBooks") || "[]");
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    book.completed = true;
    book.completedDate = new Date().toISOString();
    localStorage.setItem("trackedBooks", JSON.stringify(books));

    displayBooks();
    updateStats();
}

function deleteBook(bookId) {
    if (!confirm("Delete this book?")) return;

    let books = JSON.parse(localStorage.getItem("trackedBooks") || "[]");
    books = books.filter(b => b.id !== bookId);
    localStorage.setItem("trackedBooks", JSON.stringify(books));

    displayBooks();
    updateStats();
}

function updateStats() {
    const books = JSON.parse(localStorage.getItem("trackedBooks") || "[]");

    const total = books.length;
    const completed = books.filter(b => b.completed).length;
    const reading = total - completed;

    document.getElementById("totalBooks").textContent = total;
    document.getElementById("completedBooks").textContent = completed;
    document.getElementById("readingBooks").textContent = reading;
}

// =====================
// INIT
// =====================

function init() {
    document.querySelectorAll(".sound-button").forEach(btn =>
        btn.addEventListener("click", () => toggleSound(btn.dataset.sound))
    );

    const volumeSlider = document.getElementById("volumeSlider");
    if (volumeSlider) {
        volumeSlider.addEventListener("input", e => updateVolume(e.target.value));
        updateVolume(volumeSlider.value);
    }

    const stopAllBtn = document.getElementById("stopAllBtn");
    if (stopAllBtn) stopAllBtn.addEventListener("click", stopAllSounds);

    const addBookForm = document.getElementById("addBookForm");
    if (addBookForm) addBookForm.addEventListener("submit", addBook);

    displayBooks();
    updateStats();
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("beforeunload", stopAllSounds);
