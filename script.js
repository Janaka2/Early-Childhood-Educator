// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // Initialize Animate on Scroll (AOS) library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Replace all feather-icon placeholders with SVG icons
    feather.replace();

    // --- WhatsApp Popup Logic ---
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const fabContainer = document.querySelector('.fab-container');

    // Functions are defined in the global scope so they can be called by onclick attributes
    window.openWhatsApp = function() {
        if (whatsappPopup) {
            whatsappPopup.classList.remove('hidden');
        }
    }

    window.closeWhatsApp = function() {
        if (whatsappPopup) {
            whatsappPopup.classList.add('hidden');
        }
    }

    // Auto-close popup if clicked outside of it
    document.addEventListener('click', function(event) {
        if (!whatsappPopup || !fabContainer) return;

        // Check if the click is outside the popup and the FAB button
        if (!whatsappPopup.contains(event.target) && !fabContainer.contains(event.target)) {
            whatsappPopup.classList.add('hidden');
        }
    });


    // --- Child-friendly floating bubble effect ---
    const colors = ['#56C5AB', '#FF9F89', '#FFD166'];
    const container = document.querySelector('.bubble-container') || createBubbleContainer();

    function createBubbleContainer() {
        const newContainer = document.createElement('div');
        newContainer.className = 'bubble-container';
        document.body.appendChild(newContainer);
        return newContainer;
    }

    function createBubble() {
        if (!window.anime) {
            console.warn('Anime.js not loaded. Bubbles will not be created.');
            return;
        }

        const bubble = document.createElement('div');
        const size = Math.random() * 60 + 20;
        bubble.style.position = 'absolute';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.borderRadius = '50%';
        bubble.style.opacity = '0.2';
        bubble.style.top = '100%';
        bubble.style.left = `${Math.random() * 100}%`;

        container.appendChild(bubble);

        // Animate the bubble using Anime.js
        anime({
            targets: bubble,
            translateY: -window.innerHeight - size,
            translateX: anime.random(-50, 50),
            duration: anime.random(8000, 12000),
            easing: 'linear',
            complete: function() {
                bubble.remove();
            }
        });
    }

    // Create a set of initial bubbles
    for (let i = 0; i < 10; i++) {
        createBubble();
    }

    // Create new bubbles periodically
    setInterval(createBubble, 2000);

});