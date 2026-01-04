// Books database
const books = [
    {
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        genre: "fantasy",
        image: "images/the name of the wind.jpeg",
        length: "long",
        pages: 662,
        rating: 4.5,
        description: "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen.",
        tags: ["Magic", "Adventure", "Coming of Age"]
    },
    {
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "sci-fi",
        image: "images/project hail mary.jpeg",
        length: "medium",
        pages: 476,
        rating: 4.7,
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity itself will perish.",
        tags: ["Space", "Science", "Survival"]
    },
    {
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "fiction",
        image: "images/the midnight library.jpeg",
        length: "medium",
        pages: 304,
        rating: 4.2,
        description: "Between life and death there is a library where every book offers a chance to live another life.",
        tags: ["Philosophical", "Life Choices", "Hope"]
    },
    {
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        genre: "mystery",
        image: "images/the thursday murder club.jpeg",
        length: "medium",
        pages: 368,
        rating: 4.3,
        description: "Four unlikely friends in a peaceful retirement village find themselves solving a real murder.",
        tags: ["Cozy Mystery", "Humor", "Friendship"]
    },
    {
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        genre: "fantasy",
        image: "images/the invisible life of addie larue.jpeg",
        length: "long",
        pages: 444,
        rating: 4.3,
        description: "A young woman makes a Faustian bargain to live forever—and is cursed to be forgotten by everyone.",
        tags: ["Time Travel", "Romance", "Immortality"]
    },
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "thriller",
        image: "images/the silent patient.jpeg",
        length: "short",
        pages: 336,
        rating: 4.1,
        description: "A famous painter murders her husband and then stops speaking entirely.",
        tags: ["Psychological", "Twist", "Suspense"]
    },
    {
        title: "Beach Read",
        author: "Emily Henry",
        genre: "romance",
        image: "images/beach read.jpeg",
        length: "medium",
        pages: 368,
        rating: 4.1,
        description: "Two rival writers challenge each other over one unforgettable summer.",
        tags: ["Contemporary", "Humor", "Writers"]
    },
    {
        title: "Mexican Gothic",
        author: "Silvia Moreno-Garcia",
        genre: "horror",
        image: "images/mexican gothic.jpeg",
        length: "medium",
        pages: 301,
        rating: 3.9,
        description: "A woman investigates her cousin’s terrifying new home in the Mexican countryside.",
        tags: ["Gothic", "Atmospheric", "Mexico"]
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        genre: "sci-fi",
        image: "images/dune.jpeg",
        length: "long",
        pages: 688,
        rating: 4.3,
        description: "A young nobleman becomes embroiled in a deadly struggle for control of a desert planet.",
        tags: ["Epic", "Politics", "Desert"]
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "fantasy",
        image: "images/the hobbit.jpeg",
        length: "medium",
        pages: 310,
        rating: 4.3,
        description: "Bilbo Baggins is swept into an epic adventure with dwarves and a wizard.",
        tags: ["Classic", "Adventure", "Dragons"]
    },
    {
        title: "Educated",
        author: "Tara Westover",
        genre: "non-fiction",
        image: "images/educated.jpeg",
        length: "medium",
        pages: 334,
        rating: 4.5,
        description: "A memoir about a woman who escapes an isolated upbringing through education.",
        tags: ["Memoir", "Education", "Inspiring"]
    },
    {
        title: "And Then There Were None",
        author: "Agatha Christie",
        genre: "mystery",
        image: "images/and then there were none.jpeg",
        length: "short",
        pages: 272,
        rating: 4.3,
        description: "Ten strangers are invited to an island where they are killed one by one.",
        tags: ["Classic", "Isolated", "Whodunit"]
    }
];

// Current recommendation
let currentRecommendation = null;

// Get random recommendation
function getRecommendation() {
    const genre = document.getElementById("genreSelect").value;
    const length = document.getElementById("lengthSelect").value;

    const filtered = books.filter(book =>
        (!genre || book.genre === genre) &&
        (!length || book.length === length)
    );

    if (filtered.length === 0) {
        alert("No books found. Try different filters!");
        return;
    }

    currentRecommendation = filtered[Math.floor(Math.random() * filtered.length)];
    displayRecommendation(currentRecommendation);
}

// Display recommendation
function displayRecommendation(book) {
    document.getElementById("noRecommendation").style.display = "none";
    const recDisplay = document.getElementById("bookRecommendation");
    recDisplay.style.display = "block";

    const tagsHTML = book.tags.map(tag => `<span class="meta-tag">${tag}</span>`).join("");

    recDisplay.innerHTML = `
        <div class="book-recommendation">
            <img src="${book.image}" alt="${book.title}" class="book-cover">

            <h2>${book.title}</h2>
            <p>by ${book.author}</p>

            <div class="book-meta">
                <span class="meta-tag">${book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}</span>
                <span class="meta-tag">${book.pages} pages</span>
                <span class="meta-tag">${book.length}</span>
                <span class="meta-tag">⭐ ${book.rating}</span>
            </div>

            <p>${book.description}</p>

            <div class="book-meta">${tagsHTML}</div>

            <button onclick="saveToReadingList()">❤️ Save to Reading List</button>
            <button onclick="getRecommendation()">🔄 Pick Another</button>
        </div>
    `;
}

// Save book
function saveToReadingList() {
    if (!currentRecommendation) return;

    const list = JSON.parse(localStorage.getItem("readingList") || "[]");
    if (list.some(b => b.title === currentRecommendation.title)) {
        alert("Book already in list!");
        return;
    }

    list.push(currentRecommendation);
    localStorage.setItem("readingList", JSON.stringify(list));
    displayReadingList();
}

// Display reading list
function displayReadingList() {
    const container = document.getElementById("readingList");
    const list = JSON.parse(localStorage.getItem("readingList") || "[]");

    if (!list.length) {
        container.innerHTML = "<p>Your reading list is empty.</p>";
        return;
    }

    container.innerHTML = "";
    list.forEach((book, i) => {
        container.innerHTML += `
            <div class="list-item">
                <strong>${book.title}</strong> by ${book.author}
                <button onclick="removeFromList(${i})">Remove</button>
            </div>
        `;
    });
}

// Remove book
function removeFromList(index) {
    const list = JSON.parse(localStorage.getItem("readingList") || "[]");
    list.splice(index, 1);
    localStorage.setItem("readingList", JSON.stringify(list));
    displayReadingList();
}

// Reset filters
function resetFilters() {
    document.getElementById("genreSelect").value = "";
    document.getElementById("lengthSelect").value = "";
    document.getElementById("noRecommendation").style.display = "block";
    document.getElementById("bookRecommendation").style.display = "none";
    currentRecommendation = null;
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("recommendBtn").addEventListener("click", getRecommendation);
    document.getElementById("resetFiltersBtn").addEventListener("click", resetFilters);
    displayReadingList();
});
