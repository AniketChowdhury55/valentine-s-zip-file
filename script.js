// ===================================
// VALENTINE'S DAY WEBSITE - JAVASCRIPT
// Interactive features and animations
// ===================================

/**
 * REASONS I LOVE YOU - Array of special messages
 * Feel free to customize these messages!
 */
const reasons = [
    "Your smile brightens my darkest days ✨",
    "The way you laugh makes me feel alive 😄",
    "Your kindness inspires me every single day 💖",
    "You're my greatest adventure 🌟",
    "The way you care shows your beautiful heart 💕",
    "You make every moment feel special 🎀",
    "Your strength and courage amaze me 💪",
    "You're my safe place and my home 🏠",
    "The way you listen means everything 👂",
    "You bring color to my world 🎨",
    "Your presence calms my soul 🧘",
    "You're my biggest cheerleader 📣",
    "The way you see me makes me feel worthy 👑",
    "You're my favorite hello and hardest goodbye 💔",
    "The love in your eyes melts my heart 😍"
];

// ===== 1. FLOATING HEARTS BACKGROUND =====
/**
 * Creates and animates floating hearts in the background
 * Hearts float up with rotation and fade effects
 */
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💗', '💕', '💝', '💓', '💞'];
    
    // Create hearts at intervals
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomly select a heart emoji
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Set random horizontal position (0-100% of viewport width)
        const randomLeft = Math.random() * window.innerWidth;
        heart.style.left = randomLeft + 'px';
        
        // Set random animation duration (6-10 seconds)
        const duration = 6 + Math.random() * 4;
        heart.style.animationDuration = duration + 's';
        
        // Set random delay
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        // Remove heart from DOM after animation completes to save memory
        setTimeout(() => {
            heart.remove();
        }, (duration + 2) * 1000);
    }, 500);
}

// ===== 2. COUNTDOWN TIMER TO VALENTINE'S DAY =====
/**
 * Updates countdown timer every second
 * Displays time remaining until February 14, 2026
 */
function startCountdownTimer() {
    function updateTimer() {
        // Get current date and Valentine's Day date (Feb 14)
        const now = new Date();
        const currentYear = now.getFullYear();
        const valentineDay = new Date(currentYear, 1, 14); // Month is 0-indexed, so 1 = February
        
        // If Valentine's Day has passed this year, count to next year
        if (now > valentineDay) {
            valentineDay.setFullYear(currentYear + 1);
        }
        
        // Calculate time difference
        const diff = valentineDay - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update DOM with zero-padded numbers
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update timer immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ===== 3. LOVE LETTER REVEAL ANIMATION =====
/**
 * Toggles the reveal/hide of the love letter
 * Uses CSS animations for smooth transitions
 */
function setupLoveLetter() {
    const toggleBtn = document.getElementById('toggleLetterBtn');
    const envelope = document.getElementById('letterEnvelope');
    const letterContent = document.getElementById('letterContent');
    let isOpen = false;
    
    toggleBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Open the letter
            envelope.classList.add('hidden');
            letterContent.classList.add('visible');
            toggleBtn.textContent = 'Close Letter';
        } else {
            // Close the letter
            envelope.classList.remove('hidden');
            letterContent.classList.remove('visible');
            toggleBtn.textContent = 'Open Love Letter';
        }
    });
}

// ===== 4. REASONS I LOVE YOU - RANDOM MESSAGE =====
/**
 * Displays a random reason when button is clicked
 * Shows a new reason each time with animation
 */
function setupReasons() {
    const showReasonBtn = document.getElementById('showReasonBtn');
    const reasonsDisplay = document.getElementById('reasonsDisplay');
    let lastReason = -1;
    
    showReasonBtn.addEventListener('click', function() {
        // Get a random reason that's different from the last one
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * reasons.length);
        } while (randomIndex === lastReason && reasons.length > 1);
        
        lastReason = randomIndex;
        
        // Update display with animation
        reasonsDisplay.style.animation = 'none';
        setTimeout(() => {
            reasonsDisplay.innerHTML = `<p class="reason-text">${reasons[randomIndex]}</p>`;
            reasonsDisplay.style.animation = 'slide-in 0.6s ease-in-out';
        }, 10);
    });
}

// ===== 5. MUSIC TOGGLE FUNCTIONALITY =====
/**
 * Handles play/pause of background music
 * Updates button text and styling
 * Note: Music autoplay is restricted by most modern browsers
 */
function setupMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            // Try to play music (may be blocked by browser autoplay policy)
            bgMusic.play().catch(function(error) {
                console.log('Autoplay blocked. User interaction might be required.');
                isPlaying = false;
                musicToggle.classList.remove('playing');
                musicToggle.textContent = '🔊 Music On';
            });
            musicToggle.classList.add('playing');
            musicToggle.textContent = '🔉 Music Playing';
        } else {
            // Pause music
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.textContent = '🔊 Music On';
        }
    });
    
    // Update button when music ends
    bgMusic.addEventListener('ended', function() {
        if (isPlaying) {
            bgMusic.currentTime = 0;
            bgMusic.play();
        }
    });
}

// ===== 6. SMOOTH SCROLL BEHAVIOR =====
/**
 * Enhances user experience with smooth scrolling
 * Already handled by CSS, but ensures compatibility
 */
function enhanceSmoothScroll() {
    // This is already set in CSS with scroll-behavior: smooth
    // This function is here for any additional smooth scroll enhancements
    
    // Add event listeners to any internal links if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== 7. RESPONSIVE ADJUSTMENTS =====
/**
 * Handles responsive behavior for different screen sizes
 */
function handleResponsive() {
    // Adjust floating hearts frequency based on screen size
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 480) {
        // Mobile: reduce heart frequency
        console.log('Mobile view optimized');
    } else if (screenWidth < 768) {
        // Tablet: moderate heart frequency
        console.log('Tablet view optimized');
    }
}

// ===== INITIALIZATION =====
/**
 * Initialize all features when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('💕 Welcome to Valentine\'s Day! 💕');
    
    // Initialize all features
    createFloatingHearts();      // Start floating hearts animation
    startCountdownTimer();        // Start countdown timer
    setupLoveLetter();           // Setup love letter toggle
    setupReasons();              // Setup reasons display
    setupMusicToggle();          // Setup music toggle
    enhanceSmoothScroll();       // Enhance smooth scrolling
    handleResponsive();          // Handle responsive behavior
    
    console.log('✨ All features initialized! Happy Valentine\'s Day! ✨');
});

// ===== ADDITIONAL EVENT LISTENERS =====
/**
 * Handle window resize for responsive behavior
 */
window.addEventListener('resize', function() {
    handleResponsive();
});
