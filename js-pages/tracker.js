// Current calculation data
let currentProgress = null;

// Calculate reading progress
function calculateProgress(e) {
    e.preventDefault();
    
    const bookTitle = document.getElementById('bookTitle').value.trim();
    const totalPages = parseInt(document.getElementById('totalPages').value);
    const pagesRead = parseInt(document.getElementById('pagesRead').value);
    const readingSpeed = parseInt(document.getElementById('readingSpeed').value);
    
    // Validation
    if (pagesRead > totalPages) {
        alert('Pages read cannot be greater than total pages!');
        return;
    }
    
    if (readingSpeed <= 0) {
        alert('Reading speed must be greater than 0!');
        return;
    }
    
    // Calculate metrics
    const pagesRemaining = totalPages - pagesRead;
    const percentComplete = Math.round((pagesRead / totalPages) * 100);
    const daysToFinish = Math.ceil(pagesRemaining / readingSpeed);
    
    // Calculate finish date
    const today = new Date();
    const finishDate = new Date(today);
    finishDate.setDate(today.getDate() + daysToFinish);
    
    // Store current progress
    currentProgress = {
        bookTitle,
        totalPages,
        pagesRead,
        readingSpeed,
        pagesRemaining,
        percentComplete,
        daysToFinish,
        finishDate: finishDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        savedDate: new Date().toISOString()
    };
    
    // Display results
    displayResults(currentProgress);
}

// Display calculation results
function displayResults(data) {
    const resultsContent = document.getElementById('resultsContent');
    const resultsDisplay = document.getElementById('resultsDisplay');
    const pagesRemainingEl = document.getElementById('pagesRemaining');
    const daysToFinishEl = document.getElementById('daysToFinish');
    const progressPercentEl = document.getElementById('progressPercent');
    const progressBarEl = document.getElementById('progressBar');
    const progressBarTextEl = document.getElementById('progressBarText');
    const finishDateEl = document.getElementById('finishDate');
    
    // Hide placeholder, show results
    resultsContent.style.display = 'none';
    resultsDisplay.style.display = 'block';
    
    // Update values
    pagesRemainingEl.textContent = data.pagesRemaining;
    daysToFinishEl.textContent = data.daysToFinish;
    progressPercentEl.textContent = data.percentComplete + '%';
    
    // Animate progress bar
    setTimeout(() => {
        progressBarEl.style.width = data.percentComplete + '%';
        if (data.percentComplete > 10) {
            progressBarTextEl.textContent = data.percentComplete + '%';
        }
    }, 100);
    
    // Update finish date
    if (data.pagesRemaining === 0) {
        finishDateEl.textContent = '🎉 Congratulations! You\'ve finished this book!';
    } else {
        finishDateEl.textContent = `You'll finish by ${data.finishDate}`;
    }
}

// Save progress to localStorage
function saveProgress() {
    if (!currentProgress) {
        alert('Please calculate your progress first!');
        return;
    }
    
    // Get existing saved progress
    let savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    
    // Check if book already exists
    const existingIndex = savedProgress.findIndex(
        item => item.bookTitle.toLowerCase() === currentProgress.bookTitle.toLowerCase()
    );
    
    if (existingIndex !== -1) {
        // Update existing entry
        savedProgress[existingIndex] = currentProgress;
        alert('Progress updated successfully!');
    } else {
        // Add new entry
        savedProgress.push(currentProgress);
        alert('Progress saved successfully!');
    }
    
    // Save to localStorage
    localStorage.setItem('readingProgress', JSON.stringify(savedProgress));
    
    // Refresh saved list
    displaySavedProgress();
}

// Display saved progress
function displaySavedProgress() {
    const savedList = document.getElementById('savedList');
    const savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    
    if (savedProgress.length === 0) {
        savedList.innerHTML = `
            <div class="empty-state">
                <p>No saved progress yet. Calculate and save your reading progress above!</p>
            </div>
        `;
        return;
    }
    
    // Sort by saved date (newest first)
    savedProgress.sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate));
    
    savedList.innerHTML = '';
    
    savedProgress.forEach((item, index) => {
        const savedItem = document.createElement('div');
        savedItem.className = 'saved-item';
        
        savedItem.innerHTML = `
            <div class="saved-info">
                <h4>${item.bookTitle}</h4>
                <p>${item.pagesRead} / ${item.totalPages} pages (${item.percentComplete}%) • ${item.daysToFinish} days remaining</p>
            </div>
            <div class="saved-actions">
                <button class="btn-small btn-view" onclick="loadProgress(${index})">
                    View
                </button>
                <button class="btn-small btn-delete" onclick="deleteProgress(${index})">
                    Delete
                </button>
            </div>
        `;
        
        savedList.appendChild(savedItem);
    });
}

// Load saved progress into form
function loadProgress(index) {
    const savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    const item = savedProgress[index];
    
    if (!item) return;
    
    // Fill form
    document.getElementById('bookTitle').value = item.bookTitle;
    document.getElementById('totalPages').value = item.totalPages;
    document.getElementById('pagesRead').value = item.pagesRead;
    document.getElementById('readingSpeed').value = item.readingSpeed;
    
    // Set current progress and display
    currentProgress = item;
    displayResults(item);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete saved progress
function deleteProgress(index) {
    if (!confirm('Are you sure you want to delete this progress?')) {
        return;
    }
    
    let savedProgress = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    savedProgress.splice(index, 1);
    localStorage.setItem('readingProgress', JSON.stringify(savedProgress));
    
    displaySavedProgress();
}

// Reset form
function resetForm() {
    document.getElementById('trackerForm').reset();
    
    const resultsContent = document.getElementById('resultsContent');
    const resultsDisplay = document.getElementById('resultsDisplay');
    
    resultsContent.style.display = 'block';
    resultsDisplay.style.display = 'none';
    
    currentProgress = null;
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
    const form = document.getElementById('trackerForm');
    form.addEventListener('submit', calculateProgress);
    
    // Setup reset button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetForm);
    
    // Setup save progress button
    const saveBtn = document.getElementById('saveProgressBtn');
    saveBtn.addEventListener('click', saveProgress);
    
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
    
    // Display saved progress on load
    displaySavedProgress();
    
    // Add real-time validation
    const pagesReadInput = document.getElementById('pagesRead');
    const totalPagesInput = document.getElementById('totalPages');
    
    pagesReadInput.addEventListener('input', () => {
        const total = parseInt(totalPagesInput.value) || 0;
        const read = parseInt(pagesReadInput.value) || 0;
        
        if (read > total && total > 0) {
            pagesReadInput.setCustomValidity('Pages read cannot exceed total pages');
        } else {
            pagesReadInput.setCustomValidity('');
        }
    });
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}