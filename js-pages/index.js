// Authors data for daily rotation
const authors = [
    {
        name: "J.K. Rowling",
        bio: "British author best known for the Harry Potter series, which has sold over 500 million copies worldwide and been translated into 80 languages.",
        books: ["Harry Potter and the Sorcerer's Stone", "Harry Potter and the Chamber of Secrets", "The Casual Vacancy"]
    },
    {
        name: "George R.R. Martin",
        bio: "American novelist known for A Song of Ice and Fire series, adapted into the HBO series Game of Thrones.",
        books: ["A Game of Thrones", "A Clash of Kings", "Fire & Blood"]
    },
    {
        name: "Stephen King",
        bio: "The master of horror fiction with over 60 novels and 200 short stories, many adapted into films and TV series.",
        books: ["The Shining", "It", "The Stand", "Carrie"]
    },
    {
        name: "Agatha Christie",
        bio: "English mystery writer known for detective novels featuring Hercule Poirot and Miss Marple.",
        books: ["Murder on the Orient Express", "And Then There Were None", "Death on the Nile"]
    },
    {
        name: "J.R.R. Tolkien",
        bio: "English writer and philologist, creator of Middle-earth and author of The Lord of the Rings.",
        books: ["The Hobbit", "The Fellowship of the Ring", "The Silmarillion"]
    },
    {
        name: "Neil Gaiman",
        bio: "English author of fantasy, horror and science fiction, known for American Gods and Coraline.",
        books: ["American Gods", "Coraline", "The Graveyard Book"]
    },
    {
        name: "Margaret Atwood",
        bio: "Canadian poet and novelist, known for dystopian fiction including The Handmaid's Tale.",
        books: ["The Handmaid's Tale", "Oryx and Crake", "The Testaments"]
    }
];

// Book quotes
const quotes = [
    {
        text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
        author: "George R.R. Martin"
    },
    {
        text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        author: "Dr. Seuss"
    },
    {
        text: "There is no friend as loyal as a book.",
        author: "Ernest Hemingway"
    },
    {
        text: "Books are a uniquely portable magic.",
        author: "Stephen King"
    },
    {
        text: "A room without books is like a body without a soul.",
        author: "Cicero"
    },
    {
        text: "Reading is dreaming with open eyes.",
        author: "Anonymous"
    }
];

let quoteIndex = 0;

// Toggle mobile menu
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('navMenu');
    
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
}

// Rotate quotes every 5 seconds
function rotateQuotes() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (!quoteText || !quoteAuthor) return;
    
    quoteIndex = (quoteIndex + 1) % quotes.length;
    
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quotes[quoteIndex].text;
        quoteAuthor.textContent = `- ${quotes[quoteIndex].author}`;
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 300);
}

// Get author based on current date
function getAuthorOfDay() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = day % authors.length;
    return authors[index];
}

// Display author of the day
function showAuthor() {
    const author = getAuthorOfDay();
    const nameEl = document.getElementById('authorName');
    const bioEl = document.getElementById('authorBio');
    const booksEl = document.getElementById('authorBooks');
    
    if (!nameEl || !bioEl || !booksEl) return;
    
    nameEl.textContent = author.name;
    bioEl.textContent = author.bio;
    
    booksEl.innerHTML = '';
    author.books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book;
        booksEl.appendChild(li);
    });
}

// Newsletter subscription
function handleNewsletter(e) {
    e.preventDefault();
    
    const input = document.getElementById('newsletterEmail');
    const msg = document.getElementById('newsletterMessage');
    const email = input.value.trim();
    
    if (!email) return;
    
    let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    
    if (subscribers.includes(email)) {
        msg.textContent = 'Already subscribed!';
        msg.style.color = '#f59e0b';
    } else {
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        msg.textContent = 'Thanks for subscribing! 🎉';
        msg.style.color = '#10b981';
        input.value = '';
    }
    
    setTimeout(() => {
        msg.textContent = '';
    }, 3000);
}

// Initialize everything
function init() {
    // Setup hamburger menu
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking links
    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.getElementById('hamburger');
            const menu = document.getElementById('navMenu');
            if (hamburger && menu) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    });
    
    // Setup quote rotation
    const quoteText = document.getElementById('quoteText');
    if (quoteText) {
        quoteText.style.transition = 'opacity 0.3s';
        document.getElementById('quoteAuthor').style.transition = 'opacity 0.3s';
        setInterval(rotateQuotes, 5000);
    }
    
    // Show author of the day
    showAuthor();
    
    // Setup newsletter form
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', handleNewsletter);
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Reusable localStorage functions
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Save error:', e);
        return false;
    }
}

function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Load error:', e);
        return null;
    }
}