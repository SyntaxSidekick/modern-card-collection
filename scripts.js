// Card Components Collection JavaScript
// Basic interactive functionality for card components

document.addEventListener('DOMContentLoaded', function() {
    
    // Add click handlers for interactive buttons
    initializeCardButtons();
    
    // Add keyboard navigation support
    initializeKeyboardNavigation();
    
    // Add intersection observer for scroll animations
    initializeScrollAnimations();
    
    // Initialize animated card interactions
    initializeAnimatedCards();
    
    // Initialize code modal functionality
    initializeCodeModal();
    
    // Initialize dynamic tooltips
    initializeDynamicTooltips();
    
    // Initialize social authentication
    initializeSocialAuth();
    
    console.log('Card Components loaded successfully! 🎴');
});

function initializeCardButtons() {
    // Handle primary button clicks
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = button.textContent.trim();
            
            switch(buttonText) {
                case 'Continue':
                case 'Read More':
                    showToast('Button clicked! Ready for your custom action.');
                    break;
                case 'Follow':
                    toggleFollow(button);
                    break;
                case 'Add to Cart':
                    addToCart(button);
                    break;
                case 'Start Free Trial':
                    showToast('Free trial started! Welcome aboard! 🎉');
                    break;
                case 'Read Article':
                    showToast('Opening article... 📖');
                    break;
                default:
                    showToast(`${buttonText} clicked!`);
            }
        });
    });
    
    // Handle icon button clicks
    const iconButtons = document.querySelectorAll('.btn-icon');
    iconButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = button.querySelector('.material-icons');
            
            if (icon.textContent === 'bookmark_border') {
                // Toggle bookmark
                icon.textContent = icon.textContent === 'bookmark_border' ? 'bookmark' : 'bookmark_border';
                showToast(icon.textContent === 'bookmark' ? 'Bookmarked!' : 'Bookmark removed');
            } else if (icon.textContent === 'share') {
                // Share functionality
                if (navigator.share) {
                    navigator.share({
                        title: 'Card Component',
                        text: 'Check out this card component design',
                        url: window.location.href
                    });
                } else {
                    showToast('Sharing functionality would go here');
                }
            } else if (icon.textContent === 'shopping_cart') {
                showToast('Quick add to cart! 🛒');
            } else if (icon.textContent === 'more_vert') {
                showToast('Menu options would appear here');
            }
        });
    });
    
    // Handle wishlist buttons
    const wishlistButtons = document.querySelectorAll('.product-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = button.querySelector('.material-icons');
            const isLiked = icon.textContent === 'favorite';
            
            icon.textContent = isLiked ? 'favorite_border' : 'favorite';
            button.style.color = isLiked ? '#e74c3c' : '#ff6b6b';
            
            showToast(isLiked ? 'Removed from wishlist' : 'Added to wishlist! ❤️');
        });
    });
    
    // Handle social action buttons
    const socialActions = document.querySelectorAll('.social-action');
    socialActions.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = button.querySelector('.material-icons');
            const countSpan = button.querySelector('span:last-child');
            
            if (icon.textContent === 'favorite_border') {
                // Toggle like
                icon.textContent = 'favorite';
                icon.style.color = '#e74c3c';
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount + 1;
                showToast('Post liked! ❤️');
            } else if (icon.textContent === 'chat_bubble_outline') {
                showToast('Comments would open here 💬');
            } else if (icon.textContent === 'share') {
                showToast('Share options would appear here');
            }
        });
    });
    
    // Handle cancel buttons
    const cancelButtons = document.querySelectorAll('.btn-text');
    cancelButtons.forEach(button => {
        if (button.textContent.includes('Cancel')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Action cancelled');
            });
        } else if (button.textContent.includes('Message')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Opening message composer... 💬');
            });
        } else if (button.textContent.includes('Save')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = button.querySelector('.material-icons');
                if (icon) {
                    icon.textContent = icon.textContent === 'bookmark_border' ? 'bookmark' : 'bookmark_border';
                }
                showToast('Article saved for later! 📖');
            });
        }
    });
}

function toggleFollow(button) {
    const isFollowing = button.textContent.trim() === 'Following';
    
    button.textContent = isFollowing ? 'Follow' : 'Following';
    button.style.background = isFollowing ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#27ae60';
    
    showToast(isFollowing ? 'Unfollowed user' : 'Now following! 👥');
}

function addToCart(button) {
    const originalText = button.textContent;
    button.textContent = 'Adding...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Added ✓';
        button.style.background = '#27ae60';
        showToast('Product added to cart! 🛒');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
    }, 1000);
}

function initializeKeyboardNavigation() {
    // Add keyboard support for cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Skip AI assistant card - it has its own keyboard handling
        if (card.classList.contains('ai-assistant-card')) {
            return;
        }
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            // Only handle Enter/Space if the target is the card itself, not an input inside it
            if ((e.key === 'Enter' || e.key === ' ') && 
                e.target === this && 
                !e.target.closest('.chat-input, input, textarea, select')) {
                e.preventDefault();
                const primaryButton = card.querySelector('.btn-primary');
                if (primaryButton) {
                    primaryButton.click();
                }
            }
        });
    });
}

function initializeScrollAnimations() {
    // Create intersection observer for scroll-triggered animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Initially hide cards for animation
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(44, 62, 80, 0.95)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '24px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Card interaction utilities
const CardUtils = {
    // Add a new card dynamically
    addCard: function(cardData) {
        const grid = document.querySelector('.cards-grid');
        const cardElement = this.createCardElement(cardData);
        grid.appendChild(cardElement);
    },
    
    // Create card element from data
    createCardElement: function(data) {
        const card = document.createElement('div');
        card.className = 'card card-basic';
        
        card.innerHTML = `
            ${data.image ? `
                <div class="card-image">
                    <img src="${data.image}" alt="${data.title}" />
                    ${data.badge ? `<div class="card-badge">${data.badge}</div>` : ''}
                </div>
            ` : ''}
            <div class="card-header">
                ${data.icon ? `
                    <div class="card-icon">
                        <span class="material-icons">${data.icon}</span>
                    </div>
                ` : ''}
                <h3 class="card-title">${data.title}</h3>
            </div>
            <div class="card-content">
                <p class="card-text">${data.content}</p>
            </div>
            ${data.actions ? `
                <div class="card-actions">
                    ${data.actions.map(action => `
                        <button class="btn btn-${action.type}">${action.label}</button>
                    `).join('')}
                </div>
            ` : ''}
        `;
        
        return card;
    },
    
    // Remove a card
    removeCard: function(cardElement) {
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (cardElement.parentNode) {
                cardElement.parentNode.removeChild(cardElement);
            }
        }, 300);
    }
};

// Export for use in other scripts
window.CardUtils = CardUtils;

function initializeAnimatedCards() {
    // Handle 3D tilt effect
    initializeTiltEffect();
    
    // Handle reveal card click
    initializeRevealCard();
    
    // Handle particle animations
    initializeParticleCards();
    
    // Add touch support for mobile
    initializeMobileAnimations();
}

function initializeTiltEffect() {
    const tiltCards = document.querySelectorAll('.card-tilt');
    
    console.log('Initializing tilt effect for', tiltCards.length, 'cards'); // Debug log
    
    tiltCards.forEach((card, index) => {
        console.log(`Setting up tilt for card ${index + 1}:`, card); // Debug log
        
        const tiltIcon = card.querySelector('.tilt-icon');
        
        // Set initial styles
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'none'; // Remove any CSS transitions
        
        if (tiltIcon) {
            tiltIcon.style.transformStyle = 'preserve-3d';
            tiltIcon.style.transition = 'none';
        }
        
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation with more visible effect for testing
            const rotateX = (y - centerY) / 5; // More sensitive for testing
            const rotateY = (centerX - x) / 5;
            
            console.log(`Mouse move - X: ${rotateX.toFixed(2)}, Y: ${rotateY.toFixed(2)}`); // Debug log
            
            // Apply transform
            const transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transform = transform;
            
            // Add 3D effect to icon
            if (tiltIcon) {
                const iconTransform = `translateZ(30px) rotateX(${rotateX * 0.3}deg) rotateY(${rotateY * 0.3}deg)`;
                tiltIcon.style.transform = iconTransform;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            console.log('Mouse leave - resetting transform'); // Debug log
            
            // Smooth return with temporary transition
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            
            if (tiltIcon) {
                tiltIcon.style.transition = 'transform 0.3s ease';
                tiltIcon.style.transform = 'translateZ(0px) rotateX(0deg) rotateY(0deg)';
            }
            
            // Remove transition after animation completes
            setTimeout(() => {
                card.style.transition = 'none';
                if (tiltIcon) {
                    tiltIcon.style.transition = 'none';
                }
            }, 300);
        });
        
        card.addEventListener('mouseenter', function() {
            console.log('Mouse enter - preparing for tilt'); // Debug log
        });
    });
}

function initializeRevealCard() {
    const revealCards = document.querySelectorAll('.card-reveal');
    
    revealCards.forEach(card => {
        const closeBtn = card.querySelector('.reveal-close');
        
        // Click to reveal
        card.addEventListener('click', function(e) {
            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
                showToast('Card revealed! Click close to return.');
            }
        });
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('revealed');
                showToast('Card closed');
            });
        }
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && card.classList.contains('revealed')) {
                card.classList.remove('revealed');
                showToast('Card closed');
            }
        });
    });
}

function initializeParticleCards() {
    const particleCards = document.querySelectorAll('.card-particles');
    
    particleCards.forEach(card => {
        // Add more particles on hover
        card.addEventListener('mouseenter', function() {
            const particles = card.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '2s';
                particle.style.opacity = '1';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const particles = card.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '3s';
                particle.style.opacity = '0.6';
            });
        });
    });
}

function initializeMobileAnimations() {
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
        const hoverCards = document.querySelectorAll('.card-flip, .card-hover-lift, .card-glow, .card-slide, .card-morph');
        
        hoverCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                card.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    card.classList.remove('touch-active');
                }, 300);
            });
        });
        
        // Add touch-specific styles
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) {
                .card-flip.touch-active .card-flip-inner { transform: rotateY(180deg); }
                .card-hover-lift.touch-active { transform: translateY(-12px); }
                .card-glow.touch-active::before { opacity: 1; }
                .card-slide.touch-active .slide-main-content { transform: translateX(-100%); }
                .card-slide.touch-active .slide-overlay { transform: translateX(-100%); }
                .card-morph.touch-active .morph-expanded { transform: translateY(-100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize code modal functionality
function initializeCodeModal() {
    const modal = document.getElementById('codeModal');
    const closeModal = document.getElementById('closeModal');
    const tabButtons = document.querySelectorAll('.tab-button');
    const copyButtons = document.querySelectorAll('.copy-button');
    
    // Use event delegation for code view buttons (works for dynamically added buttons)
    document.body.addEventListener('click', function(e) {
        // Don't interfere with input elements or AI assistant
        if (e.target.matches('input, textarea, select') || 
            e.target.closest('.chat-input, .ai-assistant-card')) {
            return; // Let the event proceed normally
        }
        
        // Check if the clicked element or its parent is a code view button
        const codeBtn = e.target.closest('.code-view-btn');
        if (codeBtn) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('Code button clicked:', codeBtn); // Debug log
            
            const cardType = codeBtn.getAttribute('data-card');
            const cardElement = codeBtn.closest('.card');
            
            console.log('Card type:', cardType, 'Card element:', cardElement); // Debug log
            
            if (cardType && cardElement) {
                openCodeModal(cardElement, cardType);
            }
            return false;
        }
    }, true); // Use capture phase
    
    // Also add direct event listeners as backup
    setTimeout(() => {
        const allCodeBtns = document.querySelectorAll('.code-view-btn');
        allCodeBtns.forEach((btn, index) => {
            // Remove any existing listeners
            btn.removeEventListener('click', handleCodeButtonClick);
            // Add new listener
            btn.addEventListener('click', handleCodeButtonClick);
            
            console.log(`Added listener to button ${index + 1}:`, btn); // Debug log
        });
    }, 100);
    
    // Modal close handlers
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Tab switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Copy functionality
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeType = this.getAttribute('data-code');
            copyCode(codeType, this);
        });
    });
}

// Separate function for handling code button clicks
function handleCodeButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    console.log('Direct handler - Code button clicked:', this); // Debug log
    
    const cardType = this.getAttribute('data-card');
    const cardElement = this.closest('.card');
    
    console.log('Direct handler - Card type:', cardType, 'Card element:', cardElement); // Debug log
    
    if (cardType && cardElement) {
        openCodeModal(cardElement, cardType);
    }
    return false;
}

function openCodeModal(cardElement, cardType) {
    const modal = document.getElementById('codeModal');
    const modalTitle = document.querySelector('.modal-title');
    
    // Update modal title
    modalTitle.textContent = `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} Card Code`;
    
    // Generate and display code
    const codes = generateCardCode(cardElement, cardType);
    
    // Set the code content
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    
    htmlCode.textContent = codes.html;
    cssCode.textContent = codes.css;
    jsCode.textContent = codes.js;
    
    // Remove any existing Prism classes to reset highlighting
    [htmlCode, cssCode, jsCode].forEach(element => {
        element.className = element.className.replace(/language-\w+/, '');
    });
    
    // Re-add language classes
    htmlCode.className += ' language-html';
    cssCode.className += ' language-css';
    jsCode.className += ' language-javascript';
    
    // Show modal first
    modal.classList.add('active');
    
    // Highlight syntax after a small delay to ensure modal is visible
    setTimeout(() => {
        if (window.Prism) {
            Prism.highlightAllUnder(modal);
        }
    }, 100);
    
    // Set focus to first tab
    document.querySelector('.tab-button').focus();
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

async function copyCode(codeType, button) {
    const codeElement = document.getElementById(`${codeType}-code`);
    const code = codeElement.textContent;
    
    try {
        await navigator.clipboard.writeText(code);
        
        // Update button state
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="material-icons">check</span>Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy code');
    }
}

function generateCardCode(cardElement, cardType) {
    // Extract HTML (clean version without code button)
    const cardClone = cardElement.cloneNode(true);
    const codeBtn = cardClone.querySelector('.code-view-btn');
    if (codeBtn) codeBtn.remove();
    
    // Remove data attributes
    cardClone.removeAttribute('data-card-type');
    
    const html = formatHTML(cardClone.outerHTML);
    
    // Generate relevant CSS based on card type
    const css = generateCardCSS(cardType);
    
    // Generate relevant JavaScript
    const js = generateCardJS(cardType);
    
    return { html, css, js };
}

function formatHTML(html) {
    // Use a completely different approach - parse and rebuild
    try {
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Function to recursively format elements
        function formatElement(element, indentLevel = 0) {
            const indent = '  '.repeat(indentLevel);
            const tagName = element.tagName.toLowerCase();
            
            // Get attributes
            let attributes = '';
            if (element.attributes.length > 0) {
                const attrs = Array.from(element.attributes).map(attr => 
                    `${attr.name}="${attr.value}"`
                ).join(' ');
                attributes = ' ' + attrs;
            }
            
            // Handle self-closing tags
            if (element.childNodes.length === 0 && ['img', 'br', 'hr', 'input'].includes(tagName)) {
                return indent + `<${tagName}${attributes} />`;
            }
            
            // Check if element has only text content
            const hasOnlyText = element.childNodes.length === 1 && 
                                element.childNodes[0].nodeType === Node.TEXT_NODE;
            
            if (hasOnlyText) {
                const textContent = element.textContent.trim();
                return indent + `<${tagName}${attributes}>${textContent}</${tagName}>`;
            }
            
            // Element has child elements
            let result = indent + `<${tagName}${attributes}>`;
            
            for (const child of element.childNodes) {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    result += '\n' + formatElement(child, indentLevel + 1);
                } else if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent.trim();
                    if (text) {
                        result += '\n' + '  '.repeat(indentLevel + 1) + text;
                    }
                }
            }
            
            result += '\n' + indent + `</${tagName}>`;
            return result;
        }
        
        // Format the first child element
        const firstChild = tempDiv.firstElementChild;
        if (firstChild) {
            const formatted = formatElement(firstChild);
            return formatted;
        }
    } catch (error) {
        console.error('Error formatting HTML:', error);
    }
    
    // Fallback to original if parsing fails
    return html;
}

function generateCardCSS(cardType) {
    const baseCSS = `/* Base Card Styles */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 24px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 1.5rem 1.5rem 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.card-content {
  padding: 1rem 1.5rem 1.5rem;
}

.card-text {
  color: #5a6c7d;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
}`;

    const typeSpecificCSS = {
        basic: '',
        image: `
/* Card with Image */
.card-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}`,
        flip: `
/* Flip Card Animation */
.card-flip {
  background: transparent;
  border: none;
  perspective: 1000px;
  transform-style: preserve-3d;
  padding: 20px;
}

.card-flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  border-radius: 16px;
  margin: auto;
}

.card-flip:hover .card-flip-inner {
  transform: rotateY(180deg);
}

.card-flip-front,
.card-flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card-flip-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}`,
        'login-form': 
`/* Google Material Design 3.0 Form Styles */
.google-form {
  width: 100%;
  padding: 8px 0;
  font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.form-group {
  margin-bottom: 28px;
  position: relative;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #5f6368;
  margin-bottom: 8px;
  font-family: 'Google Sans', 'Roboto', sans-serif;
}

.form-input {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  color: #3c4043;
  background: #fff;
  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Google Sans', 'Roboto', sans-serif;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  background: #fff;
}

.form-input::placeholder {
  color: #9aa0a6;
  font-weight: 400;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;
  flex-wrap: wrap;
  gap: 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #3c4043;
  gap: 8px;
  font-family: 'Google Sans', 'Roboto', sans-serif;
}

.form-checkbox {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #5f6368;
  border-radius: 2px;
  position: relative;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.form-checkbox:checked + .checkbox-custom {
  background: #1a73e8;
  border-color: #1a73e8;
}

.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
}

.btn-primary {
  background: #1a73e8;
  border: none;
  color: white;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Google Sans', 'Roboto', sans-serif;
  height: 40px;
  min-width: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover {
  background: #1557b0;
  box-shadow: 0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15);
  transform: translateY(-1px);
}

.btn-text {
  background: transparent;
  border: none;
  color: #1a73e8;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Google Sans', 'Roboto', sans-serif;
  height: 40px;
  min-width: 64px;
}

.btn-text:hover {
  background: rgba(26, 115, 232, 0.04);
  color: #1557b0;
}

/* Google Header Styles */
.google-signin-header {
  text-align: center;
  padding: 3rem 2rem 1.5rem;
  background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
  border-bottom: 1px solid #e8eaed;
  border-radius: 16px 16px 0 0;
}

.google-g-logo {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.signin-text h3 {
  font-size: 1.75rem;
  font-weight: 400;
  color: #202124;
  font-family: 'Google Sans', sans-serif;
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
}

.signin-text p {
  color: #5f6368;
  font-family: 'Roboto', sans-serif;
  margin: 0;
}`,
        'contact-form': 
`/* Google Contact Form Styles */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-select {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  color: #3c4043;
  background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235f6368'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e") no-repeat;
  background-position: calc(100% - 12px) center;
  background-size: 20px;
  padding-right: 44px;
  cursor: pointer;
  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Google Sans', 'Roboto', sans-serif;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-select:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231a73e8'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e") no-repeat;
  background-position: calc(100% - 12px) center;
  background-size: 20px;
}

.form-textarea {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  color: #3c4043;
  background: #fff;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Google Sans', 'Roboto', sans-serif;
  box-sizing: border-box;
}

.form-textarea:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
}

.form-textarea::placeholder {
  color: #9aa0a6;
  font-weight: 400;
}

/* Service Icon Wrapper */
.service-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4285F4 0%, #34A853 25%, #FBBC04 50%, #EA4335 100%);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.25);
  position: relative;
  overflow: hidden;
}

.google-contacts-icon {
  color: white;
  font-size: 28px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
}`,
        'settings-form': `
/* Settings Form Styles */
.settings-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e8eaed;
}

.settings-title {
  font-size: 16px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 16px;
}

.toggle-setting {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
}

.toggle-slider {
  width: 44px;
  height: 24px;
  background: #dadce0;
  border-radius: 12px;
  position: relative;
  transition: all 0.2s ease;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.toggle-input:checked + .toggle-slider {
  background: #1a73e8;
}

.toggle-input:checked + .toggle-slider::before {
  transform: translateX(20px);
}`,
        'stats-card': `
/* Statistics Card Styles */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 24px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e8eaed;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #202124;
  margin-bottom: 4px;
  font-family: 'Google Sans', sans-serif;
}

.stat-change {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
}

.stat-change.positive {
  color: #137333;
}

.stat-change.negative {
  color: #d93025;
}`,
        'data-table': `
/* Data Table Styles */
.data-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 2px solid #e8eaed;
  margin-bottom: 8px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f4;
  align-items: center;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e8eaed;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #1a73e8;
  border-radius: 4px;
  transition: width 0.3s ease;
}`,
        'metrics-card': `
/* Metrics Card Styles */
.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}`,
        'donut-chart': `
/* Donut Chart Styles */
.donut-chart {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}`,
        'bar-chart': `
/* Bar Chart Styles */
.bar-chart {
  width: 100%;
}

.chart-axis {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.axis-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-container {
  flex: 1;
  height: 24px;
  background: #f1f3f4;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #1a73e8, #4285f4);
  border-radius: 12px;
  position: relative;
  transition: width 0.3s ease;
}`,
        'line-chart': `
/* Line Chart Styles */
.line-chart {
  width: 100%;
}

.line-svg {
  width: 100%;
  height: 150px;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e8eaed;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 0 20px;
}

.chart-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e8eaed;
}`
    };

    return baseCSS + (typeSpecificCSS[cardType] || '');
}

function generateCardJS(cardType) {
    const baseJS = `// Basic Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeCards();
});

function initializeCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add click handler
        card.addEventListener('click', function() {
            console.log('Card clicked:', this);
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}`;

    const typeSpecificJS = {
        flip: `
// Flip Card Specific Interactions
function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.card-flip');
    
    flipCards.forEach(card => {
        // Add click to flip on mobile
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });
}

// Call initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeFlipCards();
});`,
        reveal: `
// Reveal Card Interactions
function initializeRevealCards() {
    const revealCards = document.querySelectorAll('.card-reveal');
    
    revealCards.forEach(card => {
        const closeBtn = card.querySelector('.reveal-close');
        
        card.addEventListener('click', function() {
            if (!this.classList.contains('revealed')) {
                this.classList.add('revealed');
            }
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('revealed');
            });
        }
    });
}

// Call initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeRevealCards();
});`,
        'login-form': `
// Login Form Interactions - Enhanced Google Style
function initializeLoginForm() {
    const form = document.querySelector('.google-form');
    if (form) {
        // Enhanced form submission with Google-style feedback
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = form.querySelector('#email')?.value;
            const password = form.querySelector('#password')?.value;
            
            // Google-style validation
            if (!email || !isValidEmail(email)) {
                showFormError('Please enter a valid email address');
                return;
            }
            
            if (!password || password.length < 8) {
                showFormError('Password must be at least 8 characters');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoadingState(submitBtn, 'Signing in...');
            
            // Simulate authentication (replace with real auth in production)
            setTimeout(() => {
                hideLoadingState(submitBtn, 'Sign in');
                showToast('✓ Successfully signed in! (Demo)', 3000);
                
                // In a real app, redirect to dashboard
                console.log('Login successful:', { email, timestamp: new Date().toISOString() });
            }, 2000);
        });
    }
    
    // Enhanced input interactions with Google Material Design patterns
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        // Add visual feedback on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.setAttribute('aria-describedby', 'input-help-' + this.id);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            this.removeAttribute('aria-describedby');
            
            // Real-time validation for better UX
            validateInput(this);
        });
        
        // Enhanced keyboard navigation
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.type !== 'textarea') {
                const nextInput = getNextInput(this);
                if (nextInput) {
                    nextInput.focus();
                } else {
                    // Submit form if on last input
                    const submitBtn = this.closest('form')?.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.click();
                }
            }
        });
        
        // Auto-save for better UX (Google style)
        input.addEventListener('input', function() {
            clearInputError(this);
            debounce(() => autoSaveFormData(this.closest('form')), 1000)();
        });
    });
    
    // Enhanced social authentication buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const provider = this.querySelector('span:last-child')?.textContent || 'Social';
            
            // Google-style loading animation
            const originalContent = this.innerHTML;
            this.innerHTML = '<div class="loading-spinner"></div><span>Connecting...</span>';
            this.disabled = true;
            
            // Simulate OAuth flow
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.disabled = false;
                showToast('✓ ' + provider + ' authentication successful! (Demo)', 3000);
            }, 2000);
        });
    });
}

// Google-style form validation
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const isRequired = input.hasAttribute('required');
    
    clearInputError(input);
    
    if (isRequired && !value) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    if (type === 'email' && value && !isValidEmail(value)) {
        showInputError(input, 'Please enter a valid email address');
        return false;
    }
    
    if (type === 'password' && value && value.length < 8) {
        showInputError(input, 'Password must be at least 8 characters');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showInputError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    
    group.classList.add('error');
    
    // Remove existing error message
    const existingError = group.querySelector('.form-error');
    if (existingError) existingError.remove();
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = '<span class="material-icons" style="font-size: 16px;">error</span>' + message;
    
    group.appendChild(errorDiv);
    
    // Add accessibility
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', 'error-' + input.id);
    errorDiv.id = 'error-' + input.id;
}

function clearInputError(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    
    group.classList.remove('error');
    const errorDiv = group.querySelector('.form-error');
    if (errorDiv) errorDiv.remove();
    
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
}

function showFormError(message) {
    showToast('⚠ ' + message, 4000);
}

function showLoadingState(button, text) {
    if (!button) return;
    
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.innerHTML = '<div class="loading-spinner"></div>' + text;
}

function hideLoadingState(button, text) {
    if (!button) return;
    
    button.disabled = false;
    button.textContent = text || button.dataset.originalText || 'Submit';
    delete button.dataset.originalText;
}

function getNextInput(currentInput) {
    const form = currentInput.closest('form');
    if (!form) return null;
    
    const inputs = Array.from(form.querySelectorAll('.form-input, .form-select, .form-textarea'));
    const currentIndex = inputs.indexOf(currentInput);
    return inputs[currentIndex + 1] || null;
}

function autoSaveFormData(form) {
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Save to localStorage for demo (in production, save to server)
    const formName = form.closest('.card')?.querySelector('h3')?.textContent || 'form';
    localStorage.setItem('autosave_' + formName, JSON.stringify({
        data,
        timestamp: Date.now()
    }));
    
    console.log('Auto-saved form data:', data);
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', initializeLoginForm);`,
        'contact-form': 
`// Contact Form Interactions - Enhanced Google Style
function initializeContactForm() {
    const form = document.querySelector('.google-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = form.querySelector('#firstName')?.value;
            const lastName = form.querySelector('#lastName')?.value;
            const email = form.querySelector('#contactEmail')?.value;
            const subject = form.querySelector('#subject')?.value;
            const message = form.querySelector('#message')?.value;
            
            // Validation
            if (!firstName || !lastName) {
                showFormError('Please enter your full name');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showFormError('Please enter a valid email address');
                return;
            }
            
            if (!message) {
                showFormError('Please enter your message');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoadingState(submitBtn, 'Sending...');
            
            // Simulate sending
            setTimeout(() => {
                hideLoadingState(submitBtn, 'Send message');
                showToast('Message sent successfully!', 3000);
                form.reset();
            }, 2000);
        });
    }
    
    // Enhanced input interactions
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#ea4335;color:white;padding:12px 16px;border-radius:8px;z-index:10000';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showLoadingState(button, text) {
    if (!button) return;
    button.disabled = true;
    button.textContent = text;
}

function hideLoadingState(button, text) {
    if (!button) return;
    button.disabled = false;
    button.textContent = text;
}

function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#34a853;color:white;padding:12px 24px;border-radius:8px;z-index:10000';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

document.addEventListener('DOMContentLoaded', initializeContactForm);`,
        'settings-form': `
// Settings Form Interactions
function initializeSettingsForm() {
    const toggles = document.querySelectorAll('.toggle-input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            console.log('Setting toggled:', this.checked);
            // Add your settings update logic here
        });
    });
    
    const form = document.querySelector('.google-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Settings saved');
            // Add your settings save logic here
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeSettingsForm);`,
        'stats-card': `
// Statistics Card Interactions
function initializeStatsCard() {
    // Animate stat values on load
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const targetValue = stat.textContent;
        const isNumber = !isNaN(parseInt(targetValue));
        
        if (isNumber) {
            animateValue(stat, 0, parseInt(targetValue.replace(/,/g, '')), 2000);
        }
    });
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

document.addEventListener('DOMContentLoaded', initializeStatsCard);`,
        'data-table': `
// Data Table Interactions
function initializeDataTable() {
    // Add sorting functionality
    const headers = document.querySelectorAll('.table-header .table-cell');
    
    headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            console.log('Sort by:', this.textContent);
            // Add your sorting logic here
        });
    });
    
    // Add row click handlers
    const rows = document.querySelectorAll('.table-row');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            console.log('Row clicked:', this);
            // Add your row action logic here
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeDataTable);`,
        'metrics-card': `
// Metrics Card Interactions
function initializeMetricsCard() {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'width 1.5s ease-out';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
}

document.addEventListener('DOMContentLoaded', initializeMetricsCard);`,
        'donut-chart': `
// Donut Chart Interactions
function initializeDonutChart() {
    // Animate the donut chart
    const circle = document.querySelector('.donut-svg circle:last-child');
    if (circle) {
        circle.style.animation = 'donutProgress 2s ease-out';
    }
}

document.addEventListener('DOMContentLoaded', initializeDonutChart);`,
        'bar-chart': `
// Bar Chart Interactions
function initializeBarChart() {
    // Animate bars
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease-out';
        
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200 + 500);
    });
}

document.addEventListener('DOMContentLoaded', initializeBarChart);`,
        'line-chart': `
// Line Chart Interactions
function initializeLineChart() {
    // Add hover effects to data points
    const circles = document.querySelectorAll('.line-svg circle');
    
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            this.setAttribute('r', '6');
            this.style.cursor = 'pointer';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.setAttribute('r', '4');
        });
        
        circle.addEventListener('click', function() {
            console.log('Data point clicked');
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeLineChart);`
    };

    return typeSpecificJS[cardType] || baseJS;
}

// Dynamic Tooltip System
function initializeDynamicTooltips() {
    const codeButtons = document.querySelectorAll('.code-view-btn[title]');
    let currentTooltip = null;
    let tooltipTimeout = null;
    
    codeButtons.forEach(button => {
        // Remove the title attribute to prevent browser default tooltips
        const tooltipText = button.getAttribute('title');
        button.removeAttribute('title');
        button.setAttribute('data-tooltip', tooltipText);
        
        button.addEventListener('mouseenter', function(e) {
            clearTimeout(tooltipTimeout);
            showTooltip(e.target, tooltipText);
        });
        
        button.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        // Also handle focus for keyboard navigation
        button.addEventListener('focus', function(e) {
            clearTimeout(tooltipTimeout);
            showTooltip(e.target, tooltipText);
        });
        
        button.addEventListener('blur', function() {
            hideTooltip();
        });
        
        // Additional cleanup on button click
        button.addEventListener('click', function() {
            hideTooltip();
        });
    });
    
    function showTooltip(element, text) {
        // Clear any existing timeout
        clearTimeout(tooltipTimeout);
        
        // Remove any existing tooltip immediately
        hideTooltip(true);
        
        // Create new tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'dynamic-tooltip';
        tooltip.textContent = text;
        
        // Add to body first (but keep it invisible)
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        document.body.appendChild(tooltip);
        currentTooltip = tooltip;
        
        // Wait for next frame to ensure tooltip is rendered and has dimensions
        requestAnimationFrame(() => {
            if (currentTooltip === tooltip) {
                // Position the tooltip
                positionTooltip(element, tooltip);
                
                // Make visible and show
                tooltip.style.visibility = 'visible';
                
                // Small delay for smooth animation
                requestAnimationFrame(() => {
                    if (currentTooltip === tooltip) {
                        tooltip.classList.add('show');
                    }
                });
            }
        });
    }
    
    function hideTooltip(immediate = false) {
        clearTimeout(tooltipTimeout);
        
        if (currentTooltip) {
            const tooltip = currentTooltip;
            currentTooltip = null;
            
            if (immediate) {
                // Remove immediately
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            } else {
                // Animate out
                tooltip.classList.remove('show');
                tooltipTimeout = setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300); // Wait for animation to complete
            }
        }
    }
    
    function positionTooltip(element, tooltip) {
        // Ensure element is still in DOM
        if (!element || !element.getBoundingClientRect) {
            return;
        }
        
        const rect = element.getBoundingClientRect();
        
        // Check if element is visible
        if (rect.width === 0 && rect.height === 0) {
            return;
        }
        
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Reset any previous positioning classes
        tooltip.classList.remove('below');
        
        // Position above the button, centered
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 12; // 12px gap
        
        // Adjust if tooltip would go off screen
        const padding = 10;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Horizontal positioning
        if (left < padding) {
            left = padding;
        } else if (left + tooltipRect.width > viewportWidth - padding) {
            left = viewportWidth - tooltipRect.width - padding;
        }
        
        // Vertical positioning
        if (top < padding) {
            // If no room above, show below
            top = rect.bottom + 12;
            tooltip.classList.add('below');
        }
        
        // Final check - if still off screen, try to fit it
        if (top + tooltipRect.height > viewportHeight - padding) {
            top = viewportHeight - tooltipRect.height - padding;
        }
        
        // Apply positioning
        tooltip.style.left = Math.round(left) + 'px';
        tooltip.style.top = Math.round(top) + 'px';
    }
    
    // Handle window resize to reposition tooltips
    window.addEventListener('resize', function() {
        hideTooltip(true);
    });
    
    // Handle scroll to hide tooltips
    window.addEventListener('scroll', function() {
        hideTooltip();
    }, { passive: true });
    
    // Global mousemove handler to hide tooltip if mouse leaves button area quickly
    document.addEventListener('mousemove', function(e) {
        if (currentTooltip) {
            const buttons = document.querySelectorAll('.code-view-btn');
            let isOverButton = false;
            
            buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    isOverButton = true;
                }
            });
            
            if (!isOverButton) {
                hideTooltip();
            }
        }
    });
    
    // Handle visibility change (tab switching, etc.)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            hideTooltip(true);
        }
    });
}

// Dark Mode Toggle Functionality
function initDarkModeToggle() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check if toggle exists
    if (!toggle) {
        console.warn('Dark mode toggle not found');
        return;
    }
    
    // Get saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Toggle event listener
    toggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        console.log(`Theme switched to: ${newTheme}`);
    });
    
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        toggle.checked = theme === 'dark';
        
        // Add smooth transition class
        body.classList.add('theme-transition');
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
        
        console.log(`Theme set to: ${theme}`);
    }
}

// Enhanced DOMContentLoaded with Dark Mode
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode toggle first
    initDarkModeToggle();
    
    // Initialize demo cards if they exist
    if (document.querySelector('.ai-assistant-card')) {
        initAIAssistant();
    }
    
    if (document.querySelector('.github-integration-demo')) {
        initGitHubDemo();
    }
    
    console.log('All components initialized! 🌙☀️ 🤖 👥 🐙');
});

/* ==============================
   Live Demo Cards - Advanced Interactive Features
   ============================== */

// AI Assistant Demo Functionality
function initAIAssistant() {
    const voiceBtn = document.querySelector('.voice-btn');
    const chatInput = document.querySelector('#chatInput');
    const sendBtn = document.querySelector('#sendBtn');
    const chatContainer = document.querySelector('.chat-container');
    const quickBtns = document.querySelectorAll('.quick-btn');
    const statusDot = document.querySelector('.status-dot');
    const aiStatus = document.querySelector('.ai-status span:last-child');
    
    let isListening = false;
    let messageCount = 1;

    // Voice control toggle
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            isListening = !isListening;
            this.classList.toggle('active', isListening);
            
            if (isListening) {
                aiStatus.textContent = 'Listening...';
                statusDot.classList.add('active');
                // Simulate voice recognition
                setTimeout(() => {
                    if (isListening) {
                        addMessage('user', 'Hello, can you help me with my project?');
                        setTimeout(() => respondToMessage(), 1000);
                    }
                    isListening = false;
                    voiceBtn.classList.remove('active');
                    aiStatus.textContent = 'Online - Ready to help';
                }, 3000);
            } else {
                aiStatus.textContent = 'Online - Ready to help';
                statusDot.classList.remove('active');
            }
        });
    }

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            setTimeout(() => respondToMessage(message), 1500); // Pass the actual message
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        // Ensure input is properly enabled and focusable
        chatInput.removeAttribute('disabled');
        chatInput.setAttribute('tabindex', '0');
        
        // Fix: Use keydown instead of keypress for better key handling
        chatInput.addEventListener('keydown', function(e) {
            // Allow normal typing (don't prevent default for regular keys)
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent default only for Enter
                sendMessage();
            }
            // Space, letters, numbers, backspace, etc. will work normally
        });
        
        // Additional input event to ensure typing works
        chatInput.addEventListener('input', function(e) {
            // This ensures the input value updates properly
            console.log('Input value:', this.value); // Debug log
        });
        
        // Ensure input can receive focus and handle typing
        chatInput.addEventListener('focus', function() {
            this.setAttribute('aria-expanded', 'true');
            console.log('Chat input focused'); // Debug log
        });
        
        chatInput.addEventListener('blur', function() {
            this.setAttribute('aria-expanded', 'false');
        });
        
        // Ensure click focuses the input properly
        chatInput.addEventListener('click', function() {
            this.focus();
        });
    }

    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            addMessage('user', action);
            setTimeout(() => respondToMessage(action), 1000);
        });
    });

    // Add message to chat
    function addMessage(sender, text) {
        const message = document.createElement('div');
        message.className = `chat-message ${sender}`;
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        message.innerHTML = `
            <div class="message-avatar ${sender === 'ai' ? 'ai-avatar-small' : ''}">
                <i class="material-icons">${sender === 'ai' ? 'smart_toy' : 'person'}</i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatContainer.appendChild(message);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const typingMessage = document.createElement('div');
        typingMessage.className = 'chat-message ai typing-message';
        typingMessage.innerHTML = `
            <div class="message-avatar ai-avatar-small">
                <i class="material-icons">smart_toy</i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatContainer.appendChild(typingMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        return typingMessage;
    }

    // AI response logic
    function respondToMessage(userMessage = '') {
        console.log('respondToMessage called with:', userMessage); // Debug log
        const typingMessage = showTyping();
        
        setTimeout(() => {
            typingMessage.remove();
            
            const responses = {
                'Explain Code': getCodeExplanation(),
                'Debug Issue': getDebugHelp(),
                'Optimize Performance': getPerformanceAdvice(),
                'Generate Tests': getTestingGuidance(),
                default: getContextualResponse(userMessage)
            };
            
            const response = responses[userMessage] || responses.default;
            console.log('Final response:', response); // Debug log
            addMessage('ai', response);
        }, 2000);
    }

    function getCodeExplanation() {
        const cardCount = document.querySelectorAll('.card').length;
        return `This Modern Cards collection contains ${cardCount} responsive UI components built with:
        
🎨 **CSS Grid & Flexbox** for responsive layouts
🌙 **CSS Custom Properties** for dark mode theming  
⚡ **CSS Transforms** for smooth animations
📱 **Mobile-first** responsive design
♿ **ARIA labels** for accessibility

Each card includes copy-paste HTML, CSS, and JavaScript code. The components use Google Material Design principles with modern gradients and micro-interactions.`;
    }

    function getDebugHelp() {
        return `Common issues I can help debug:

🔧 **Dark Mode**: Check if CSS custom properties are defined in :root
🎯 **Animations**: Ensure transform-origin and transition properties are set
📱 **Responsive**: Use CSS Grid's auto-fit and minmax() for flexible layouts
🖱️ **Interactions**: Verify event listeners are attached after DOM loads
🎨 **Styling**: Check CSS specificity - use more specific selectors if needed

What specific issue are you experiencing?`;
    }

    function getPerformanceAdvice() {
        return `Performance optimization tips for this card collection:

⚡ **CSS**: Use transform instead of changing position properties
🖼️ **Images**: Implement lazy loading with intersection observer  
📦 **JavaScript**: Debounce scroll/resize events for smooth performance
🎨 **Animations**: Use will-change property sparingly, only during animations
🔄 **Reflows**: Batch DOM reads and writes to minimize layout thrashing
💾 **Caching**: Leverage browser cache for repeated API calls

The current implementation already uses CSS transforms for animations and efficient event handling!`;
    }

    function getTestingGuidance() {
        return `Testing strategy for UI components:

🧪 **Unit Tests**: Test individual card interactions and state changes
🎭 **Visual Tests**: Screenshot testing for responsive breakpoints
♿ **Accessibility**: Use axe-core for ARIA compliance testing
📱 **Device Tests**: Test touch interactions on mobile devices
🌙 **Theme Tests**: Verify dark/light mode transitions
⚡ **Performance**: Measure animation frame rates with Lighthouse

Would you like help writing specific tests for any card component?`;
    }

    function getContextualResponse(userMessage) {
        const message = userMessage.toLowerCase();
        console.log('User message:', userMessage, 'Processed:', message); // Debug log
        
        // Check for smart suggestions first
        const smartResponse = getSmartSuggestions(userMessage);
        if (smartResponse) {
            console.log('Returning smart response'); // Debug log
            return smartResponse;
        }
        
        // Check for specific topics
        if (message.includes('dark mode') || message.includes('theme')) {
            console.log('Dark mode response triggered'); // Debug log
            return `The dark mode system uses CSS custom properties for seamless theming:

🌙 **Implementation**: Toggle switches data-theme attribute on body
🎨 **Variables**: All colors use CSS custom properties (--bg-primary, --text-primary, etc.)
🔄 **Persistence**: Theme preference saved to localStorage
✨ **Smooth**: CSS transitions create fluid color changes

Try the toggle in the header - it affects the demo interface while preserving card component styles for clean copy-paste!`;
        }
        
        if (message.includes('responsive') || message.includes('mobile')) {
            return `The responsive design uses modern CSS techniques:

📱 **Mobile-first**: Base styles for mobile, media queries for larger screens
🔀 **CSS Grid**: auto-fit and minmax() for flexible card layouts
📏 **Breakpoints**: 768px (tablet) and 480px (mobile) breakpoints
🖼️ **Images**: object-fit: cover for consistent aspect ratios
👆 **Touch**: Proper touch targets (min 44px) for mobile interactions

All ${document.querySelectorAll('.card').length} cards are fully responsive!`;
        }
        
        if (message.includes('github') || message.includes('repository')) {
            return `The GitHub integration demo showcases real API integration:

🔗 **Live Data**: Fetches actual repository stats from GitHub API
📊 **Real-time**: Shows current stars, forks, issues, and recent commits
🚀 **Fallback**: Graceful degradation with mock data if API unavailable
🎨 **Visual**: Language breakdown with GitHub's official color scheme
⭐ **Interactive**: Star/watch buttons with local state management

This demonstrates professional API integration patterns!`;
        }
        
        if (message.includes('copy') || message.includes('code') || message.includes('paste')) {
            return `Each card includes clean, production-ready code:

📋 **HTML**: Semantic markup with proper ARIA attributes
🎨 **CSS**: Modular styles with CSS custom properties
⚡ **JavaScript**: Modern ES6+ with proper event handling
🔧 **Self-contained**: No external dependencies except Material Icons
📚 **Documented**: Clear comments explaining functionality

Click the code button (</>) on any card to see the implementation!`;
        }
        
        if (message.includes('help') || message.includes('how to') || message.includes('tutorial')) {
            return `Here's how to use this collection:

🔍 **Browse Cards**: Scroll through ${document.querySelectorAll('.card').length} different components
👁️ **Preview**: Hover and click to see interactions
📋 **Get Code**: Click the </> button on any card for HTML/CSS/JS
🌙 **Try Dark Mode**: Toggle the theme switcher in the header
📱 **Test Responsive**: Resize your browser to see mobile layouts
🔗 **Live Demo**: Check out the GitHub integration demo

What specific component would you like help with?`;
        }
        
        if (message.includes('which card') || message.includes('recommend') || message.includes('best')) {
            const recommendations = [
                '🎭 **Flip Card**: Great for revealing additional content',
                '📊 **Analytics Cards**: Perfect for dashboards and data display',
                '📝 **Form Cards**: Ideal for user input and authentication',
                '🔗 **GitHub Demo**: Shows real API integration',
                '🎨 **Animated Cards**: Eye-catching hover effects'
            ];
            
            return `Based on your needs, here are my top recommendations:

${recommendations.join('\n')}

What type of project are you building? I can suggest the most suitable components!`;
        }
        
        if (message.includes('animation') || message.includes('micro-interaction')) {
            return `The animations use performant CSS techniques:

🎭 **CSS Transforms**: translateY(), scale(), and rotate() for GPU acceleration
⏱️ **Cubic-bezier**: Custom easing curves for natural motion
🎨 **Hover States**: Subtle elevation and color changes
🔄 **Transitions**: Smooth state changes with proper timing
⚡ **Performance**: will-change used only during active animations

Try hovering over cards to see the micro-interactions in action!`;
        }
        
        // Check for action requests
        if (message.includes('show me code') || message.includes('open code')) {
            const cardTypes = ['analytics', 'login', 'github', 'form', 'chart'];
            const foundType = cardTypes.find(type => message.includes(type));
            if (foundType) {
                return showCodeExample(foundType);
            }
        }
        
        if (message.includes('highlight') || message.includes('show me the')) {
            if (message.includes('dark mode') || message.includes('toggle')) {
                return demonstrateDarkMode();
            }
        }
        
        // Default contextual response
        const features = [
            `📚 **${document.querySelectorAll('.card').length} Components**: From basic cards to advanced data visualizations`,
            `🎨 **Google Material Design**: Following official design principles`,
            `🌙 **Dark Mode**: Comprehensive theming system`,
            `📱 **Responsive**: Mobile-first design for all devices`,
            `♿ **Accessible**: ARIA compliant with keyboard navigation`,
            `🔗 **GitHub Integration**: Live API demo with real data`,
            `🤖 **AI Assistant**: Context-aware help system (that's me!)`,
            `⚡ **Performance**: Optimized animations and interactions`
        ];
        
        return `I'm your AI assistant for the Modern Cards collection! Here's what I can help with:

${features.join('\n')}

Ask me about specific components, implementation details, or how to customize any part of the system. What would you like to explore?`;
    }

    // Initialize with a welcome message
    setTimeout(() => {
        const cardCount = document.querySelectorAll('.card').length;
        const hasGitHubDemo = document.querySelector('.github-integration-demo') ? 'including live GitHub integration' : '';
        addMessage('ai', `Welcome to the Modern Cards collection! 👋

I'm your AI assistant and I can help you with:
• Understanding the ${cardCount} card components ${hasGitHubDemo}
• Explaining code implementation details
• Debugging styling or interaction issues  
• Performance optimization tips
• Responsive design guidance

Try asking me about dark mode, animations, or any specific card component. I have context about everything on this page!`);
    }, 1000);

    // Add functionality to analyze and interact with the current page
    function analyzeCurrentPage() {
        const cards = document.querySelectorAll('.card');
        const cardTypes = [...cards].map(card => {
            const title = card.querySelector('h3')?.textContent || 'Unknown';
            const hasAnimation = card.classList.toString().includes('flip') || card.classList.toString().includes('hover');
            const hasForm = card.querySelector('form, .form-group') ? 'form' : '';
            const hasChart = card.querySelector('.chart, .donut-chart, .bar-chart') ? 'chart' : '';
            const hasData = card.querySelector('.stats-grid, .data-table') ? 'data' : '';
            return { title, hasAnimation, hasForm, hasChart, hasData };
        });
        
        return {
            totalCards: cards.length,
            animatedCards: cardTypes.filter(c => c.hasAnimation).length,
            formCards: cardTypes.filter(c => c.hasForm).length,
            chartCards: cardTypes.filter(c => c.hasChart).length,
            dataCards: cardTypes.filter(c => c.hasData).length,
            cardTypes
        };
    }

    // Add smart suggestions based on current page
    function getSmartSuggestions(userMessage) {
        const analysis = analyzeCurrentPage();
        const message = userMessage.toLowerCase();
        
        if (message.includes('how many') || message.includes('count')) {
            return `This collection contains:
📦 **${analysis.totalCards} total cards**
🎭 **${analysis.animatedCards} animated cards** (flip, hover effects)
📝 **${analysis.formCards} form cards** (login, contact, settings)
📊 **${analysis.chartCards} chart cards** (donut, bar, line charts)
📈 **${analysis.dataCards} data cards** (analytics, tables, metrics)

Each card includes complete HTML, CSS, and JavaScript code!`;
        }
        
        if (message.includes('show me') || message.includes('find')) {
            const suggestions = [];
            if (analysis.formCards > 0) suggestions.push('📝 Form components for user input');
            if (analysis.chartCards > 0) suggestions.push('📊 Data visualization charts');
            if (analysis.animatedCards > 0) suggestions.push('🎭 Animated card interactions');
            
            return `I can help you explore:

${suggestions.join('\n')}
🌙 Dark mode theming system
🔗 GitHub API integration demo
📱 Responsive design implementation

What specific component interests you?`;
        }
        
        return null; // Let other response logic handle it
    }

    // Add interactive page features
    function highlightCard(cardSelector) {
        // Remove existing highlights
        document.querySelectorAll('.card.ai-highlighted').forEach(card => {
            card.classList.remove('ai-highlighted');
        });
        
        // Add highlight to specific card
        const card = document.querySelector(cardSelector);
        if (card) {
            card.classList.add('ai-highlighted');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                card.classList.remove('ai-highlighted');
            }, 3000);
            
            return true;
        }
        return false;
    }

    function demonstrateDarkMode() {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            // Flash the toggle to show where it is
            toggle.parentElement.style.animation = 'pulse 1s ease-in-out 3';
            
            setTimeout(() => {
                toggle.parentElement.style.animation = '';
            }, 3000);
            
            return 'I\'ve highlighted the dark mode toggle in the header! Try clicking it to see the theme change.';
        }
        return 'Dark mode toggle not found.';
    }

    function showCodeExample(cardType) {
        const cards = document.querySelectorAll('.card');
        let targetCard = null;
        
        // Find a card that matches the type
        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
            if (title.includes(cardType.toLowerCase())) {
                targetCard = card;
            }
        });
        
        if (targetCard) {
            const codeBtn = targetCard.querySelector('.code-view-btn');
            if (codeBtn) {
                highlightCard('.card h3[textContent*="' + cardType + '"]');
                // Simulate clicking the code button
                setTimeout(() => {
                    codeBtn.click();
                }, 1500);
                return `I've highlighted the ${cardType} card and will open its code in a moment!`;
            }
        }
        
        return `I couldn't find a ${cardType} card to show you. Try asking about: Analytics, Login Form, or GitHub Demo.`;
    }
}

// Live Collaboration Demo Functionality
function initCollaboration() {
    const userAvatars = document.querySelectorAll('.user-avatar');
    const activityFeed = document.querySelector('.activity-feed');
    const stats = {
        activeUsers: document.querySelector('.stat-number'),
        edits: document.querySelectorAll('.stat-number')[1],
        comments: document.querySelectorAll('.stat-number')[2]
    };

    let editCount = 5;
    let commentCount = 12;
    let activityTimer;

    // User data
    const users = [
        { name: 'Alex Chen', action: 'editing main.js', avatar: 'person', time: 'now', status: 'editing' },
        { name: 'Sarah Kim', action: 'reviewed design docs', avatar: 'person', time: '2m ago', status: 'online' },
        { name: 'Mike Johnson', action: 'added new component', avatar: 'person', time: '5m ago', status: 'online' },
        { name: 'Emma Davis', action: 'updated styles.css', avatar: 'person', time: '8m ago', status: 'online' }
    ];

    // Simulate user interactions
    userAvatars.forEach((avatar, index) => {
        if (index < users.length) {
            const user = users[index];
            avatar.classList.add(user.status);
            
            if (user.status === 'editing') {
                avatar.classList.add('editing-pulse');
                const indicator = avatar.querySelector('.status-indicator');
                if (indicator) {
                    indicator.classList.add('editing-pulse');
                }
            }

            // Add hover tooltip
            avatar.title = `${user.name} - ${user.action}`;
        }
    });

    // Simulate live activity
    function addActivity(user, action, icon = 'edit', isLive = false) {
        const activity = document.createElement('div');
        activity.className = 'activity-item';
        
        const time = isLive ? 'now' : `${Math.floor(Math.random() * 30) + 1}m ago`;
        
        activity.innerHTML = `
            <div class="activity-avatar">
                <img src="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}'/><text x='16' y='22' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'>${user.charAt(0)}</text></svg>`)}" alt="${user}">
            </div>
            <div class="activity-content">
                <p><strong>${user}</strong> ${action}</p>
                <span class="activity-time">${time}</span>
            </div>
            <div class="activity-action ${isLive ? 'live-edit' : ''}">
                <i class="material-icons">${icon}</i>
            </div>
        `;
        
        // Add to top of feed
        if (activityFeed.children.length > 0) {
            activityFeed.insertBefore(activity, activityFeed.firstChild);
        } else {
            activityFeed.appendChild(activity);
        }
        
        // Remove oldest if too many
        if (activityFeed.children.length > 5) {
            activityFeed.removeChild(activityFeed.lastChild);
        }
        
        // Update stats
        if (icon === 'edit') {
            editCount++;
            if (stats.edits) stats.edits.textContent = editCount;
        } else if (icon === 'comment') {
            commentCount++;
            if (stats.comments) stats.comments.textContent = commentCount;
        }
    }

    // Start with initial activities
    users.forEach((user, index) => {
        setTimeout(() => {
            addActivity(user.name, user.action);
        }, index * 500);
    });

    // Simulate ongoing activity
    function simulateActivity() {
        const actions = [
            { user: 'Alex Chen', action: 'modified component state', icon: 'edit' },
            { user: 'Sarah Kim', action: 'added a comment', icon: 'comment' },
            { user: 'Mike Johnson', action: 'pushed to main branch', icon: 'sync' },
            { user: 'Emma Davis', action: 'updated documentation', icon: 'description' },
            { user: 'Alex Chen', action: 'fixed responsive layout', icon: 'edit' },
            { user: 'Sarah Kim', action: 'approved design changes', icon: 'check_circle' }
        ];
        
        let currentIndex = 0;
        
        activityTimer = setInterval(() => {
            const activity = actions[currentIndex % actions.length];
            const isLive = Math.random() > 0.7; // 30% chance of live edit
            addActivity(activity.user, activity.action, activity.icon, isLive);
            currentIndex++;
        }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
    }

    // Start simulation after initial load
    setTimeout(simulateActivity, 2000);

    // Cleanup function (in case needed)
    window.addEventListener('beforeunload', () => {
        if (activityTimer) clearInterval(activityTimer);
    });
}

function initThemeToggle() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    toggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        toggle.checked = theme === 'dark';
    }
}

/* ==============================
   GitHub Integration Demo - Real API Integration
   ============================== */

// GitHub API configuration
const GITHUB_CONFIG = {
    owner: 'SyntaxSidekick',
    repo: 'modern-card-collection',
    apiBase: 'https://api.github.com'
};

// Language colors from GitHub
const LANGUAGE_COLORS = {
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572a5',
    'Java': '#b07219',
    'PHP': '#4f5d95',
    'C++': '#f34b7d',
    'C': '#555555',
    'Shell': '#89e051',
    'Vue': '#2c3e50',
    'React': '#61dafb'
};

function initGitHubDemo() {
    console.log('Initializing GitHub Demo...');
    
    // Elements
    const refreshBtn = document.getElementById('refreshRepo');
    const starButton = document.getElementById('starButton');
    const watchButton = document.getElementById('watchButton');
    
    // Event listeners
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('loading');
            loadRepositoryData().finally(() => {
                refreshBtn.classList.remove('loading');
            });
        });
    }
    
    if (starButton) {
        starButton.addEventListener('click', () => {
            toggleStar();
        });
    }
    
    if (watchButton) {
        watchButton.addEventListener('click', () => {
            toggleWatch();
        });
    }
    
    // Load initial data
    loadRepositoryData();
}

async function loadRepositoryData() {
    try {
        console.log('Loading repository data...');
        
        // Load repository info, commits, and languages in parallel
        const [repoData, commitsData, languagesData] = await Promise.all([
            fetchRepositoryInfo(),
            fetchRecentCommits(),
            fetchRepositoryLanguages()
        ]);
        
        // Update UI with data
        updateRepositoryInfo(repoData);
        updateCommitsList(commitsData);
        updateLanguagesChart(languagesData);
        
        // Enable interaction buttons
        enableInteractionButtons();
        
        console.log('Repository data loaded successfully');
        
    } catch (error) {
        console.error('Error loading repository data:', error);
        showErrorMessage('Failed to load repository data. Please try again.');
    }
}

async function fetchRepositoryInfo() {
    const url = `${GITHUB_CONFIG.apiBase}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching repository info:', error);
        // Return mock data as fallback
        return {
            description: 'A modern collection of responsive card UI components',
            stargazers_count: 42,
            forks_count: 8,
            open_issues_count: 3,
            updated_at: new Date().toISOString(),
            language: 'HTML'
        };
    }
}

async function fetchRecentCommits() {
    const url = `${GITHUB_CONFIG.apiBase}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/commits?per_page=5`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching commits:', error);
        // Return mock data as fallback
        return [
            {
                commit: {
                    message: 'Add GitHub integration demo functionality',
                    author: { name: 'SyntaxSidekick', date: new Date().toISOString() }
                },
                author: { login: 'SyntaxSidekick', avatar_url: 'https://github.com/SyntaxSidekick.png' },
                sha: 'abc1234'
            },
            {
                commit: {
                    message: 'Implement live demo cards with advanced features',
                    author: { name: 'SyntaxSidekick', date: new Date(Date.now() - 3600000).toISOString() }
                },
                author: { login: 'SyntaxSidekick', avatar_url: 'https://github.com/SyntaxSidekick.png' },
                sha: 'def5678'
            },
            {
                commit: {
                    message: 'Add comprehensive dark mode support',
                    author: { name: 'SyntaxSidekick', date: new Date(Date.now() - 7200000).toISOString() }
                },
                author: { login: 'SyntaxSidekick', avatar_url: 'https://github.com/SyntaxSidekick.png' },
                sha: 'ghi9012'
            }
        ];
    }
}

async function fetchRepositoryLanguages() {
    const url = `${GITHUB_CONFIG.apiBase}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/languages`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching languages:', error);
        // Return mock data as fallback
        return {
            'HTML': 65000,
            'CSS': 45000,
            'JavaScript': 25000
        };
    }
}

function updateRepositoryInfo(repoData) {
    // Update description
    const descElement = document.getElementById('repoDescription');
    if (descElement) {
        descElement.textContent = repoData.description || 'A modern collection of responsive card UI components';
    }
    
    // Update stats
    const starsElement = document.getElementById('repoStars');
    const forksElement = document.getElementById('repoForks');
    const issuesElement = document.getElementById('repoIssues');
    const updatedElement = document.getElementById('lastUpdated');
    
    if (starsElement) {
        animateNumber(starsElement, repoData.stargazers_count || 0);
    }
    
    if (forksElement) {
        animateNumber(forksElement, repoData.forks_count || 0);
    }
    
    if (issuesElement) {
        animateNumber(issuesElement, repoData.open_issues_count || 0);
    }
    
    if (updatedElement) {
        const lastUpdate = new Date(repoData.updated_at);
        const timeAgo = getTimeAgo(lastUpdate);
        updatedElement.textContent = timeAgo;
    }
}

function updateCommitsList(commitsData) {
    const commitsList = document.getElementById('commitsList');
    if (!commitsList) return;
    
    commitsList.innerHTML = '';
    
    commitsData.slice(0, 3).forEach(commit => {
        const commitItem = document.createElement('div');
        commitItem.className = 'commit-item';
        
        const authorAvatar = commit.author?.avatar_url || 'https://github.com/SyntaxSidekick.png';
        const authorName = commit.commit.author.name;
        const commitMessage = commit.commit.message.split('\n')[0]; // First line only
        const commitDate = new Date(commit.commit.author.date);
        const timeAgo = getTimeAgo(commitDate);
        const shortSha = commit.sha.substring(0, 7);
        
        commitItem.innerHTML = `
            <div class="commit-avatar">
                <img src="${authorAvatar}" alt="${authorName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span class="material-icons" style="display: none;">person</span>
            </div>
            <div class="commit-content">
                <p>${commitMessage} <span class="commit-sha">${shortSha}</span></p>
                <span class="commit-time">${timeAgo} by ${authorName}</span>
            </div>
        `;
        
        commitsList.appendChild(commitItem);
    });
}

function updateLanguagesChart(languagesData) {
    const languagesChart = document.getElementById('languagesChart');
    if (!languagesChart) return;
    
    languagesChart.innerHTML = '';
    
    // Calculate total bytes
    const totalBytes = Object.values(languagesData).reduce((sum, bytes) => sum + bytes, 0);
    
    // Create language items
    Object.entries(languagesData)
        .sort(([,a], [,b]) => b - a) // Sort by bytes descending
        .slice(0, 5) // Show top 5 languages
        .forEach(([language, bytes]) => {
            const percentage = ((bytes / totalBytes) * 100).toFixed(1);
            const color = LANGUAGE_COLORS[language] || '#8e8e93';
            
            const languageItem = document.createElement('div');
            languageItem.className = 'language-item';
            
            languageItem.innerHTML = `
                <div class="language-color" style="background: ${color};"></div>
                <span class="language-name">${language}</span>
                <span class="language-percentage">${percentage}%</span>
                <div class="language-bar">
                    <div class="language-bar-fill" style="background: ${color}; width: 0%;"></div>
                </div>
            `;
            
            languagesChart.appendChild(languageItem);
            
            // Animate the bar
            setTimeout(() => {
                const barFill = languageItem.querySelector('.language-bar-fill');
                if (barFill) {
                    barFill.style.width = `${percentage}%`;
                }
            }, 100);
        });
}

function enableInteractionButtons() {
    const starButton = document.getElementById('starButton');
    const watchButton = document.getElementById('watchButton');
    
    if (starButton) {
        starButton.disabled = false;
    }
    
    if (watchButton) {
        watchButton.disabled = false;
    }
}

function toggleStar() {
    const starButton = document.getElementById('starButton');
    if (!starButton) return;
    
    const isStarred = starButton.classList.contains('starred');
    const icon = starButton.querySelector('.material-icons');
    const text = starButton.querySelector('span:last-child');
    
    if (isStarred) {
        // Unstar
        starButton.classList.remove('starred');
        icon.textContent = 'star_border';
        text.textContent = 'Star Repository';
        showSuccessMessage('Repository unstarred!');
        
        // Update star count
        const starsElement = document.getElementById('repoStars');
        if (starsElement) {
            const currentCount = parseInt(starsElement.textContent) || 0;
            animateNumber(starsElement, Math.max(0, currentCount - 1));
        }
    } else {
        // Star
        starButton.classList.add('starred');
        icon.textContent = 'star';
        text.textContent = 'Starred!';
        showSuccessMessage('Repository starred! ⭐');
        
        // Update star count
        const starsElement = document.getElementById('repoStars');
        if (starsElement) {
            const currentCount = parseInt(starsElement.textContent) || 0;
            animateNumber(starsElement, currentCount + 1);
        }
    }
}

function toggleWatch() {
    const watchButton = document.getElementById('watchButton');
    if (!watchButton) return;
    
    const isWatching = watchButton.classList.contains('watching');
    const icon = watchButton.querySelector('.material-icons');
    const text = watchButton.querySelector('span:last-child');
    
    if (isWatching) {
        // Unwatch
        watchButton.classList.remove('watching');
        icon.textContent = 'visibility';
        text.textContent = 'Watch Repository';
        showSuccessMessage('Repository unwatched');
    } else {
        // Watch
        watchButton.classList.add('watching');
        icon.textContent = 'visibility_off';
        text.textContent = 'Watching';
        showSuccessMessage('Now watching repository! 👀');
    }
}

// Utility functions
function animateNumber(element, targetNumber) {
    const startNumber = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.round(startNumber + (targetNumber - startNumber) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
}

function showErrorMessage(message) {
    const demo = document.querySelector('.github-integration-demo .card-content');
    if (!demo) return;
    
    // Remove existing messages
    const existingMessages = demo.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    demo.insertBefore(errorDiv, demo.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function showSuccessMessage(message) {
    const demo = document.querySelector('.github-integration-demo .card-content');
    if (!demo) return;
    
    // Remove existing messages
    const existingMessages = demo.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    demo.insertBefore(successDiv, demo.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Social Authentication Functionality
function initializeSocialAuth() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const provider = this.classList.contains('google-btn') ? 'Google' :
                           this.classList.contains('linkedin-btn') ? 'LinkedIn' :
                           this.classList.contains('github-btn') ? 'GitHub' : 'Unknown';
            
            // Simple visual feedback for display purposes
            showSimpleToast(`${provider} sign-in clicked (demo only)`);
            
            // Add brief visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Simple toast for display purposes
function showSimpleToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.simple-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'simple-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #202124;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        animation: fadeInOut 2s ease;
    `;
    
    // Add animation if not exists
    if (!document.querySelector('#simple-toast-animation')) {
        const style = document.createElement('style');
        style.id = 'simple-toast-animation';
        style.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translateY(-10px); }
                10%, 90% { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto-remove
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 2000);
}
