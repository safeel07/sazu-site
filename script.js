/* =============================================
   ROMANTIC BIRTHDAY SURPRISE - JAVASCRIPT
   All interactive features and animations
   ============================================= */

// =============================================
// CONFIGURATION
// =============================================

// Set your wife's birthday here (format: 'YYYY-MM-DD')
const BIRTHDAY_DATE = '2026-04-04'; // Change this to your wife's birthday

// Backend API URL
const API_URL = 'http://localhost:5001/api';

// Love letter text for typewriter effect
const LOVE_LETTER = `My Dearest Love,

On this special day, I want to take a moment to tell you how much you mean to me. From the first day we met, you've brought nothing but joy, love, and happiness into my life.

You are my best friend, my partner, my everything. Your smile brightens my darkest days, and your laughter is the sweetest sound I've ever heard.

Every moment spent with you is a treasure, and I am so grateful for every memory we've created together. You make me want to be a better person every single day.

Thank you for being you, for loving me, for standing by my side through everything. You are the most beautiful person I know, both inside and out.

Today, I celebrate you – your kindness, your strength, your beauty, and your incredible spirit. I hope this birthday is as amazing as you are.

Here's to many more years of love, laughter, and happiness together. I love you more than words can ever express.

Happy Birthday, my beautiful wife! 💖`;

// =============================================
// QUIZ QUESTIONS - CUSTOMIZE WITH YOUR OWN!
// =============================================

const QUIZ_QUESTIONS = [
    {
        question: "What's the date of our first date?",
        options: ["February 14, 2020", "March 15, 2020", "April 20, 2019", "May 10, 2019"],
        correctAnswer: 1 // Index of correct answer
    },
    {
        question: "What's my favorite flower?",
        options: ["Rose", "Tulip", "Sunflower", "Daisy"],
        correctAnswer: 0
    },
    {
        question: "What's the name of our favorite restaurant?",
        options: ["The Italian Place", "Happy Garden", "The Love Nest", "Sweet Dreams"],
        correctAnswer: 2
    },
    {
        question: "How many years have we been together (approximately)?",
        options: ["1 year", "2 years", "3 years", "5 years"],
        correctAnswer: 2
    },
    {
        question: "What's my favorite movie genre?",
        options: ["Action", "Romance", "Horror", "Comedy"],
        correctAnswer: 1
    }
];

// Track quiz state
let quizAnswers = [];
let quizCompleted = false;

// =============================================
// FLOATING HEARTS ANIMATION
// =============================================

function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 300);
}

// =============================================
// CONFETTI ANIMATION
// =============================================

function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffc1d9', '#ff1744', '#ff5c7c', '#ffb6c1'];
    
    setInterval(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }, 100);
}

// =============================================
// BACKGROUND MUSIC PLAYER
// =============================================

let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicStatus = document.getElementById('musicStatus');

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicStatus.textContent = 'Play Music';
        isPlaying = false;
    } else {
        bgMusic.play().catch(error => {
            console.log('Audio play failed:', error);
            alert('Please enable audio to play background music');
        });
        musicStatus.textContent = 'Pause Music';
        isPlaying = true;
    }
});

// =============================================
// PHOTO UPLOAD FUNCTIONALITY
// =============================================

const uploadArea = document.getElementById('uploadArea');
const photoInput = document.getElementById('photoInput');
const uploadMessage = document.getElementById('uploadMessage');
const galleryGrid = document.getElementById('galleryGrid');
let uploadedPhotos = [];

// Click to upload
uploadArea.addEventListener('click', () => {
    photoInput.click();
});

// Handle file selection
photoInput.addEventListener('change', handlePhotos);

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-red)';
    uploadArea.style.background = 'rgba(255, 107, 157, 0.2)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'var(--primary-pink)';
    uploadArea.style.background = 'rgba(255, 193, 217, 0.1)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-pink)';
    uploadArea.style.background = 'rgba(255, 193, 217, 0.1)';
    
    const files = e.dataTransfer.files;
    photoInput.files = files;
    handlePhotos({ target: { files } });
});

function handlePhotos(e) {
    const files = e.target.files;
    
    if (files.length === 0) {
        showUploadMessage('No files selected', 'error');
        return;
    }
    
    Array.from(files).forEach(file => {
        // Validate file is an image
        if (!file.type.startsWith('image/')) {
            showUploadMessage('Please upload only image files!', 'error');
            return;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showUploadMessage('File size must be less than 5MB', 'error');
            return;
        }
        
        // Read file and add to gallery
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedPhotos.push({
                id: Date.now() + Math.random(),
                src: event.target.result,
                name: file.name
            });
            
            displayPhotos();
            showUploadMessage(`✅ ${uploadedPhotos.length} photo(s) uploaded! 📸`, 'success');
        };
        
        reader.readAsDataURL(file);
    });
}

function displayPhotos() {
    galleryGrid.innerHTML = '';
    
    uploadedPhotos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${photo.src}" alt="Uploaded photo ${index + 1}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 20px 20px 0 0;">
            <p class="photo-caption">Memory ${index + 1}</p>
            <button class="delete-photo-btn" onclick="deletePhoto(${photo.id})">🗑️ Delete</button>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

function deletePhoto(photoId) {
    uploadedPhotos = uploadedPhotos.filter(p => p.id !== photoId);
    displayPhotos();
    showUploadMessage(`✅ Photo deleted! Photos remaining: ${uploadedPhotos.length}`, 'success');
}

function showUploadMessage(message, type) {
    uploadMessage.textContent = message;
    uploadMessage.className = `upload-message ${type}`;
    uploadMessage.style.display = 'block';
    
    setTimeout(() => {
        uploadMessage.style.display = 'none';
    }, 4000);
}

// Style for delete button
const style = document.createElement('style');
style.textContent = `
    .delete-photo-btn {
        width: 100%;
        padding: 10px;
        background: #ff5c7c;
        color: white;
        border: none;
        border-radius: 0 0 20px 20px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s ease;
    }
    .delete-photo-btn:hover {
        background: #ff1744;
    }
`;
document.head.appendChild(style);

// =============================================
// COUNTDOWN TIMER
// =============================================

function updateCountdown() {
    const now = new Date();
    const birthday = new Date(BIRTHDAY_DATE);
    const messageEl = document.getElementById('birthdayMessage');
    
    // If birthday is today
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const birthdayThisYear = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    if (today.getTime() === birthdayThisYear.getTime()) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        messageEl.textContent = "🎉 It's Your Birthday Today! 🎉";
        messageEl.style.fontSize = '1.5rem';
        messageEl.style.color = '#ff1744';
        
        // Trigger confetti burst
        triggerConfettiBurst();
        return;
    }
    
    // Calculate next birthday
    let nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (now > nextBirthday) {
        nextBirthday = new Date(now.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
    }
    
    const diff = nextBirthday - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    messageEl.textContent = `Your birthday is on ${nextBirthday.toLocaleDateString('en-US', options)}`;
}

function triggerConfettiBurst() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffc1d9', '#ff1744', '#ff5c7c', '#ffb6c1', '#ffd700'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// =============================================
// QUIZ AND LOCKED CAKE SYSTEM
// =============================================

function initializeQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const quizQuestions = document.getElementById('quizQuestions');
    const submitQuizBtn = document.getElementById('submitQuiz');
    
    // Display all questions
    quizQuestions.innerHTML = '';
    QUIZ_QUESTIONS.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        let optionsHTML = '';
        q.options.forEach((option, optIndex) => {
            optionsHTML += `
                <label class="option">
                    <input type="radio" name="question-${index}" value="${optIndex}">
                    <span>${option}</span>
                </label>
            `;
        });
        
        questionDiv.innerHTML = `
            <div class="question-text">Q${index + 1}: ${q.question}</div>
            <div class="question-options">${optionsHTML}</div>
        `;
        
        quizQuestions.appendChild(questionDiv);
    });
    
    // Enable submit button when all questions are answered
    document.addEventListener('change', checkAllAnswered);
}

function checkAllAnswered() {
    const allAnswered = QUIZ_QUESTIONS.length === document.querySelectorAll('input[type="radio"]:checked').length;
    document.getElementById('submitQuiz').disabled = !allAnswered;
}

// Submit quiz
document.getElementById('submitQuiz')?.addEventListener('click', submitQuiz);

function submitQuiz() {
    const quizMessage = document.getElementById('quizMessage');
    let correctCount = 0;
    
    // Check answers
    QUIZ_QUESTIONS.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.correctAnswer) {
            correctCount++;
            selectedOption.parentElement.classList.add('correct');
        } else if (selectedOption) {
            selectedOption.parentElement.classList.add('incorrect');
        }
    });
    
    const totalQuestions = QUIZ_QUESTIONS.length;
    
    if (correctCount === totalQuestions) {
        // All answers correct - unlock cake!
        quizMessage.textContent = '🎉 Perfect! All answers correct! The cake is unlocked! 🎉';
        quizMessage.className = 'quiz-message success';
        
        unlockCake();
    } else {
        // Some answers wrong - give feedback
        quizMessage.textContent = `You got ${correctCount}/${totalQuestions} correct! Try again to unlock the cake!`;
        quizMessage.className = 'quiz-message error';
        
        // Reset and allow retry
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
}

function unlockCake() {
    quizCompleted = true;
    
    // Hide quiz
    document.getElementById('quizContainer').style.display = 'none';
    
    // Update cake status
    const lockStatus = document.getElementById('cakeLockStatus');
    lockStatus.textContent = '🔓 CAKE UNLOCKED! 🔓';
    lockStatus.classList.add('unlocked');
    
    // Unlock cake
    const cake = document.getElementById('cake');
    cake.classList.add('unlocked');
    cake.classList.remove('locked');
    
    // Update instruction
    const instruction = document.getElementById('cakeInstruction');
    instruction.textContent = '🔪 You have the knife! Click the cake to cut it! 🎂';
    instruction.classList.add('unlocked');
    
    // Show knife reward
    document.getElementById('knifeReward').style.display = 'block';
    
    // Trigger confetti celebration
    triggerConfettiBurst();
    
    // Re-enable cake click with knife
    cake.addEventListener('click', cutCakeWithKnife, { once: true });
}

function cutCakeWithKnife() {
    const cake = document.getElementById('cake');
    
    // Add cutting animation
    cake.style.animation = 'cakeCut 1s ease-out forwards';
    
    // Show special celebration
    setTimeout(() => {
        showCakeCuttingCelebration();
    }, 500);
}

function showCakeCuttingCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'cake-cutting-celebration';
    celebration.innerHTML = `
        <div class="celebration-content">
            <h2>🎉 You Cut the Cake! 🎉</h2>
            <p>💖 Here's to many more birthdays together! 💖</p>
            <p class="celebration-emoji">🎂✨💕</p>
            <p>Our love is sweet, just like this cake!</p>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Trigger special effects
    triggerConfettiBurst();
    showLovePopup();
    
    // Auto remove celebration after 5 seconds
    setTimeout(() => {
        celebration.remove();
    }, 5000);
}

// =============================================
// INTERACTIVE CAKE
// =============================================

let candlesBlown = false;
const cake = document.getElementById('cake');

// Set initial locked state
cake.classList.add('locked');

cake.addEventListener('click', function handleCakeClick() {
    if (quizCompleted) {
        // Cake is unlocked, allow cutting
        if (!candlesBlown) {
            const flames = document.querySelectorAll('.flame');
            flames.forEach((flame, index) => {
                setTimeout(() => {
                    flame.classList.add('blown');
                }, index * 200);
            });
            
            candlesBlown = true;
            
            // Show love popup after candles are blown
            setTimeout(() => {
                cutCakeWithKnife();
            }, 1500);
        }
    } else {
        // Cake is locked
        alert('💬 Answer all the questions first to unlock the cake! 🔒');
    }
});

// =============================================
// TYPEWRITER EFFECT FOR LOVE LETTER
// =============================================

function typeWriter(text, element, speed = 30) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typewriter effect when letter section is visible
const observerOptions = {
    threshold: 0.3
};

const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typewriterElement = document.getElementById('typewriterText');
            if (typewriterElement.textContent === '') {
                typeWriter(LOVE_LETTER, typewriterElement, 30);
            }
        }
    });
}, observerOptions);

const letterSection = document.getElementById('letter');
if (letterSection) {
    letterObserver.observe(letterSection);
}

// =============================================
// REPLY MESSAGE FUNCTIONALITY
// =============================================

const submitReplyBtn = document.getElementById('submitReply');
const replyText = document.getElementById('replyText');
const replyMessage = document.getElementById('replyMessage');

submitReplyBtn.addEventListener('click', async () => {
    const reply = replyText.value.trim();
    
    if (!reply) {
        showMessage(replyMessage, 'Please write a reply first! 💕', 'error');
        return;
    }
    
    try {
        // For this demo, we'll use a hardcoded message ID
        // In a real app, you'd fetch the message ID from the server
        const messageId = '000000000000000000000001'; // Placeholder
        
        const response = await fetch(`${API_URL}/messages/${messageId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reply })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(replyMessage, 'Your reply has been saved! ❤️', 'success');
            replyText.value = '';
            
            // Show love popup
            setTimeout(() => {
                showLovePopup();
            }, 1500);
        } else {
            showMessage(replyMessage, 'Could not save reply. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error submitting reply:', error);
        showMessage(replyMessage, 'Your reply has been saved locally! ❤️ (Backend not running)', 'success');
        replyText.value = '';
    }
});

// =============================================
// BIRTHDAY WISHES FUNCTIONALITY
// =============================================

const submitWishBtn = document.getElementById('submitWish');
const wishName = document.getElementById('wishName');
const wishContent = document.getElementById('wishContent');
const wishMessage = document.getElementById('wishMessage');
const wishesContainer = document.getElementById('wishesContainer');

// Load wishes on page load
loadWishes();

submitWishBtn.addEventListener('click', async () => {
    const name = wishName.value.trim();
    const wish = wishContent.value.trim();
    
    if (!name || !wish) {
        showMessage(wishMessage, 'Please fill in both fields! 🎁', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/wishes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, wish })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(wishMessage, 'Wish added successfully! 🎉', 'success');
            wishName.value = '';
            wishContent.value = '';
            loadWishes();
        } else {
            showMessage(wishMessage, 'Could not add wish. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error submitting wish:', error);
        showMessage(wishMessage, 'Wish saved! 🎉 (Backend not running - refresh to see demo wishes)', 'success');
        wishName.value = '';
        wishContent.value = '';
        
        // Add demo wish for display
        addWishToDisplay(name, wish, new Date());
    }
});

async function loadWishes() {
    try {
        const response = await fetch(`${API_URL}/wishes`);
        const data = await response.json();
        
        if (data.success && data.wishes.length > 0) {
            displayWishes(data.wishes);
        } else {
            // Show demo wishes if no wishes in database
            showDemoWishes();
        }
    } catch (error) {
        console.error('Error loading wishes:', error);
        // Show demo wishes if backend is not running
        showDemoWishes();
    }
}

function displayWishes(wishes) {
    wishesContainer.innerHTML = '';
    
    if (wishes.length === 0) {
        wishesContainer.innerHTML = '<p class="loading-text">No wishes yet. Be the first to add one!</p>';
        return;
    }
    
    wishes.forEach(wish => {
        addWishToDisplay(wish.name, wish.wish, wish.createdAt);
    });
}

function addWishToDisplay(name, wish, date) {
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    
    const wishNameEl = document.createElement('div');
    wishNameEl.className = 'wish-name';
    wishNameEl.textContent = `From: ${name}`;
    
    const wishContentEl = document.createElement('div');
    wishContentEl.className = 'wish-content';
    wishContentEl.textContent = wish;
    
    const wishDateEl = document.createElement('div');
    wishDateEl.className = 'wish-date';
    const wishDate = new Date(date);
    wishDateEl.textContent = wishDate.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    wishCard.appendChild(wishNameEl);
    wishCard.appendChild(wishContentEl);
    wishCard.appendChild(wishDateEl);
    
    wishesContainer.insertBefore(wishCard, wishesContainer.firstChild);
}

function showDemoWishes() {
    const demoWishes = [
        {
            name: 'Your Loving Husband',
            wish: 'Happy Birthday to the most amazing woman in the world! You make every day brighter and more beautiful. I love you more than words can say! 💖',
            createdAt: new Date()
        },
        {
            name: 'Mom & Dad',
            wish: 'Happy Birthday to our wonderful daughter-in-law! May your day be filled with love and happiness!',
            createdAt: new Date(Date.now() - 3600000)
        },
        {
            name: 'Best Friend',
            wish: 'Wishing you the happiest of birthdays! You deserve all the love and joy in the world! 🎉',
            createdAt: new Date(Date.now() - 7200000)
        }
    ];
    
    displayWishes(demoWishes);
}

// =============================================
// SURPRISE MODAL
// =============================================

const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseModal = document.getElementById('surpriseModal');
const closeModal = document.getElementById('closeModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

surpriseBtn.addEventListener('click', () => {
    surpriseModal.classList.add('active');
    
    // Trigger confetti
    triggerConfettiBurst();
});

closeModal.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
});

modalCloseBtn.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
});

// Close modal when clicking outside
surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) {
        surpriseModal.classList.remove('active');
    }
});

// =============================================
// LOVE POPUP
// =============================================

function showLovePopup() {
    const lovePopup = document.getElementById('lovePopup');
    lovePopup.classList.add('active');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        lovePopup.classList.remove('active');
    }, 4000);
}

// =============================================
// SMOOTH SCROLLING FOR NAVIGATION
// =============================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `reply-message ${type}`;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// =============================================
// INITIALIZE ANIMATIONS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Birthday Surprise App Loaded!');
    
    // Start animations
    createFloatingHearts();
    createConfetti();
    
    // Initialize quiz
    initializeQuiz();
    
    // Auto-play music after user interaction (browsers require user gesture)
    document.body.addEventListener('click', function playMusicOnce() {
        if (!isPlaying) {
            bgMusic.play().catch(err => console.log('Auto-play prevented'));
            isPlaying = true;
            musicStatus.textContent = 'Pause Music';
        }
        document.body.removeEventListener('click', playMusicOnce);
    }, { once: true });
});

// =============================================
// NOTES FOR CUSTOMIZATION
// =============================================

/*
CUSTOMIZATION GUIDE:

1. BIRTHDAY DATE:
   - Change the BIRTHDAY_DATE constant at the top of this file

2. QUIZ QUESTIONS:
   - Edit the QUIZ_QUESTIONS array to customize questions
   - Change the correctAnswer indices to match your answers
   - Add/remove questions as needed

3. LOVE LETTER:
   - Edit the LOVE_LETTER text to personalize your message

4. BACKGROUND MUSIC:
   - Add your music file to the frontend folder
   - Update the src attribute in the <audio> tag in index.html
   - Free romantic music sources: YouTube Audio Library, Free Music Archive

5. PHOTOS:
   - Use the photo upload feature in the gallery section
   - Drag & drop or click to upload photos

6. VIDEO MESSAGE:
   - In the surprise modal, replace the placeholder with:
     <iframe width="100%" height="315" src="YOUR_VIDEO_URL" frameborder="0" allowfullscreen></iframe>
   - You can upload a video to YouTube (unlisted) and use that link

7. API BACKEND:
   - Make sure backend server is running on port 5001
   - Update API_URL if using different port or domain

8. COLORS:
   - Modify CSS variables in style.css to change color scheme

9. CAKE CUTTING:
   - Quiz must be completed before cake can be cut
   - Customize questions to match your relationship
*/
