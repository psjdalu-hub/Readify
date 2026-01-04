// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate name
function validateName(name) {
    return name.trim().length >= 2;
}

// Validate email
function validateEmail(email) {
    return emailRegex.test(email.trim());
}

// Validate message
function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error on field
function showError(input) {
    input.classList.add('error');
}

// Clear error from field
function clearError(input) {
    input.classList.remove('error');
}

// Update character count
function updateCharCount() {
    const message = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const count = message.value.length;
    charCount.textContent = count;
    
    if (count > 450) {
        charCount.style.color = 'var(--error)';
    } else {
        charCount.style.color = 'var(--gray)';
    }
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    let isValid = true;
    
    // Validate name
    if (!validateName(name)) {
        showError(nameInput);
        isValid = false;
    } else {
        clearError(nameInput);
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showError(emailInput);
        isValid = false;
    } else {
        clearError(emailInput);
    }
    
    // Validate message
    if (!validateMessage(message)) {
        showError(messageInput);
        isValid = false;
    } else {
        clearError(messageInput);
    }
    
    if (!isValid) {
        return;
    }
    
    // Create feedback object
    const feedback = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    saveFeedback(feedback);
    
    // Show success message
    showSuccessMessage();
    
    // Clear form
    document.getElementById('feedbackForm').reset();
    updateCharCount();
    
    // Display updated feedback list
    displayFeedback();
}

// Save feedback to localStorage
function saveFeedback(feedback) {
    let feedbackList = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
    feedbackList.push(feedback);
    localStorage.setItem('feedbackSubmissions', JSON.stringify(feedbackList));
}

// Show success message
function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.add('show');
    
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

// Display all submitted feedback
function displayFeedback() {
    const feedbackList = document.getElementById('feedbackList');
    const submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
    
    if (submissions.length === 0) {
        feedbackList.innerHTML = `
            <div class="empty-feedback">
                <p>No feedback submitted yet. Use the form above to send us your thoughts!</p>
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    submissions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    feedbackList.innerHTML = '';
    
    submissions.forEach((item, index) => {
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        feedbackItem.innerHTML = `
            <div class="feedback-header">
                <div>
                    <div class="feedback-name">${item.name}</div>
                    <div class="feedback-email">${item.email}</div>
                </div>
                <div class="feedback-date">${formattedDate}</div>
            </div>
            <div class="feedback-message">${item.message}</div>
            <button class="btn-delete-feedback" onclick="deleteFeedback(${item.id})">
                Delete
            </button>
        `;
        
        feedbackList.appendChild(feedbackItem);
    });
}

// Delete feedback
function deleteFeedback(id) {
    if (!confirm('Are you sure you want to delete this feedback?')) {
        return;
    }
    
    let submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
    submissions = submissions.filter(item => item.id !== id);
    localStorage.setItem('feedbackSubmissions', JSON.stringify(submissions));
    
    displayFeedback();
}

// Toggle FAQ item
function toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Toggle mobile menu
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('navMenu');
    
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
}

// Initialize page
function init() {
    // Setup form submission
    const form = document.getElementById('feedbackForm');
    form.addEventListener('submit', handleSubmit);
    
    // Setup real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
            if (validateName(nameInput.value)) {
                clearError(nameInput);
            } else {
                showError(nameInput);
            }
        }
    });
    
    nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('error')) {
            if (validateName(nameInput.value)) {
                clearError(nameInput);
            }
        }
    });
    
    emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim()) {
            if (validateEmail(emailInput.value)) {
                clearError(emailInput);
            } else {
                showError(emailInput);
            }
        }
    });
    
    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('error')) {
            if (validateEmail(emailInput.value)) {
                clearError(emailInput);
            }
        }
    });
    
    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim()) {
            if (validateMessage(messageInput.value)) {
                clearError(messageInput);
            } else {
                showError(messageInput);
            }
        }
    });
    
    messageInput.addEventListener('input', () => {
        updateCharCount();
        if (messageInput.classList.contains('error')) {
            if (validateMessage(messageInput.value)) {
                clearError(messageInput);
            }
        }
    });
    
    // Setup FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            toggleFAQ(item);
        });
    });
    
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
    
    // Display existing feedback
    displayFeedback();
    
    // Initialize character count
    updateCharCount();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}