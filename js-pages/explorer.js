// Books data
const books = [
    {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "fantasy",
        image: "images/Harry Potter and the Sorcerer's Stone.jpeg",
        synopsis: "Harry Potter has never been the star of a Quidditch team, scoring points while riding a broom far above the ground. He knows no spells, has never helped to hatch a dragon, and has never worn a cloak of invisibility. All he knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley. Harry's room is a tiny closet at the foot of the stairs, and he hasn't had a birthday party in eleven years.",
        sequels: ["Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Goblet of Fire"],
        ratings: [
            { source: "Goodreads", rating: "4.47/5", reviews: "9.2M" },
            { source: "Amazon", rating: "4.8/5", reviews: "156K" },
            { source: "Barnes & Noble", rating: "4.9/5", reviews: "42K" }
        ]
    },
    {
        id: 2,
        title: "A Game of Thrones",
        author: "George R.R. Martin",
        genre: "fantasy",
        image: "images/A Game of Thrones.jpeg",
        synopsis: "Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister forces are massing beyond the kingdom's protective Wall.",
        sequels: ["A Clash of Kings", "A Storm of Swords", "A Feast for Crows", "A Dance with Dragons"],
        ratings: [
            { source: "Goodreads", rating: "4.44/5", reviews: "2.5M" },
            { source: "Amazon", rating: "4.6/5", reviews: "78K" },
            { source: "Barnes & Noble", rating: "4.7/5", reviews: "23K" }
        ]
    },
    {
        id: 3,
        title: "The Shining",
        author: "Stephen King",
        genre: "horror",
        image: "images/The Shining.jpeg",
        synopsis: "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister.",
        sequels: ["Doctor Sleep"],
        ratings: [
            { source: "Goodreads", rating: "4.23/5", reviews: "1.2M" },
            { source: "Amazon", rating: "4.6/5", reviews: "45K" },
            { source: "Barnes & Noble", rating: "4.7/5", reviews: "18K" }
        ]
    },
    {
        id: 4,
        title: "Murder on the Orient Express",
        author: "Agatha Christie",
        genre: "mystery",
        image: "images/Murder on the Orient Express.jpeg", 
        synopsis: "Just after midnight, a snowdrift stops the Orient Express in its tracks. The luxurious train is surprisingly full for the time of the year, but by the morning it is one passenger fewer. An American tycoon lies dead in his compartment, stabbed a dozen times, his door locked from the inside.",
        sequels: [],
        ratings: [
            { source: "Goodreads", rating: "4.20/5", reviews: "856K" },
            { source: "Amazon", rating: "4.5/5", reviews: "32K" },
            { source: "Barnes & Noble", rating: "4.6/5", reviews: "12K" }
        ]
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "fantasy",
        image: "images/The Hobbit.jpeg",
        synopsis: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.",
        sequels: ["The Fellowship of the Ring", "The Two Towers", "The Return of the King"],
        ratings: [
            { source: "Goodreads", rating: "4.28/5", reviews: "3.5M" },
            { source: "Amazon", rating: "4.7/5", reviews: "89K" },
            { source: "Barnes & Noble", rating: "4.8/5", reviews: "34K" }
        ]
    },
    {
        id: 6,
        title: "1984",
        author: "George Orwell",
        genre: "fiction",
        image: "images/1984.jpeg",
        synopsis: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmare vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality.",
        sequels: [],
        ratings: [
            { source: "Goodreads", rating: "4.19/5", reviews: "4.2M" },
            { source: "Amazon", rating: "4.6/5", reviews: "98K" },
            { source: "Barnes & Noble", rating: "4.7/5", reviews: "41K" }
        ]
    },
    {
        id: 7,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "romance",
        image: "images/Pride and Prejudice.jpeg",
        synopsis: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child' and its vivacious heroine, Elizabeth Bennet, 'as delightful a creature as ever appeared in print.'",
        sequels: [],
        ratings: [
            { source: "Goodreads", rating: "4.28/5", reviews: "3.8M" },
            { source: "Amazon", rating: "4.6/5", reviews: "76K" },
            { source: "Barnes & Noble", rating: "4.7/5", reviews: "29K" }
        ]
    },
    {
        id: 8,
        title: "Dune",
        author: "Frank Herbert",
        genre: "sci-fi",
        image: "images/Dune.jpeg",
        synopsis: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.",
        sequels: ["Dune Messiah", "Children of Dune", "God Emperor of Dune"],
        ratings: [
            { source: "Goodreads", rating: "4.25/5", reviews: "1.1M" },
            { source: "Amazon", rating: "4.5/5", reviews: "52K" },
            { source: "Barnes & Noble", rating: "4.6/5", reviews: "19K" }
        ]
    },
    {
        id: 9,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "thriller",
        image: "images/The Da Vinci Code.jpeg",
        synopsis: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci.",
        sequels: ["Angels & Demons", "The Lost Symbol", "Inferno"],
        ratings: [
            { source: "Goodreads", rating: "3.89/5", reviews: "2.1M" },
            { source: "Amazon", rating: "4.4/5", reviews: "67K" },
            { source: "Barnes & Noble", rating: "4.5/5", reviews: "24K" }
        ]
    },
    {
        id: 10,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "fiction",
        image: "images/The Great Gatsby.jpeg",
        synopsis: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan is an exquisitely crafted tale of America in the 1920s.",
        sequels: [],
        ratings: [
            { source: "Goodreads", rating: "3.93/5", reviews: "4.9M" },
            { source: "Amazon", rating: "4.4/5", reviews: "89K" },
            { source: "Barnes & Noble", rating: "4.5/5", reviews: "38K" }
        ]
    },
    {
        id: 11,
        title: "It",
        author: "Stephen King",
        genre: "horror",
        image: "images/it.jpeg",
        synopsis: "Welcome to Derry, Maine. It's a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real. They were seven teenagers when they first stumbled upon the horror. Now they are grown-up men and women who have gone out into the big world to gain success and happiness. But the promise they made twenty-eight years ago calls them reunite in the same place where, as teenagers, they battled an evil creature that preyed on the city's children.",
        sequels: [],
        ratings: [
            { source: "Goodreads", rating: "4.24/5", reviews: "1.4M" },
            { source: "Amazon", rating: "4.7/5", reviews: "72K" },
            { source: "Barnes & Noble", rating: "4.8/5", reviews: "31K" }
        ]
    },
    {
        id: 12,
        title: "The Hunger Games",
        author: "Suzanne Collins",
        genre: "sci-fi",
        image: "images/The Hunger Games.jpeg",
        synopsis: "In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.",
        sequels: ["Catching Fire", "Mockingjay"],
        ratings: [
            { source: "Goodreads", rating: "4.32/5", reviews: "7.6M" },
            { source: "Amazon", rating: "4.7/5", reviews: "142K" },
            { source: "Barnes & Noble", rating: "4.8/5", reviews: "58K" }
        ]
    }
];

// Display books
function displayBooks(bookList) {
    const grid = document.getElementById("booksGrid");
    const noResults = document.getElementById("noResults");

    grid.innerHTML = "";

    if (bookList.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    bookList.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.onclick = () => showModal(book);

        card.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <span class="book-genre">${book.genre}</span>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Modal
function showModal(book) {
    document.getElementById("modalTitle").textContent = book.title;
    document.getElementById("modalAuthor").textContent = `by ${book.author}`;
    document.getElementById("modalSynopsis").textContent = book.synopsis;

    const sequelsSection = document.getElementById("sequelsSection");
    const sequelsList = document.getElementById("modalSequels");
    sequelsList.innerHTML = "";

    if (book.sequels.length > 0) {
        sequelsSection.style.display = "block";
        book.sequels.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            sequelsList.appendChild(li);
        });
    } else {
        sequelsSection.style.display = "none";
    }

    const ratingsBody = document.getElementById("modalRatings");
    ratingsBody.innerHTML = "";
    book.ratings.forEach(r => {
        ratingsBody.innerHTML += `
            <tr>
                <td>${r.source}</td>
                <td>${r.rating}</td>
                <td>${r.reviews}</td>
            </tr>
        `;
    });

    document.getElementById("bookModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("bookModal").classList.remove("active");
    document.body.style.overflow = "auto";
}

// Filters
function filterBooks() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const genre = document.getElementById("genreFilter").value;

    const filtered = books.filter(book =>
        (book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search)) &&
        (genre === "all" || book.genre === genre)
    );

    displayBooks(filtered);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    displayBooks(books);
    document.getElementById("searchInput").addEventListener("input", filterBooks);
    document.getElementById("genreFilter").addEventListener("change", filterBooks);
    document.getElementById("closeModal").addEventListener("click", closeModal);
});
