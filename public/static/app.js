// Elite Campus Training - Interactive JavaScript

// Global state
let isModalOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeCounterAnimations();
    attachEventListeners();
});

// Initialize animations
function initializeAnimations() {
    // Add fade-in animations to elements
    const animateElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Navigation background opacity
        if (currentScrollY > 50) {
            nav.classList.add('shadow-lg');
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.classList.remove('shadow-lg');
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Initialize counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    if (counters.length > 0) {
        observer.observe(counters[0].closest('section') || counters[0]);
    }
}

// Animate counters
function animateCounters() {
    const counters = [
        { element: document.querySelector('[data-counter="2000"]'), target: 2000, suffix: '+' },
        { element: document.querySelector('[data-counter="8"]'), target: 8, suffix: ' LPA' },
        { element: document.querySelector('[data-counter="90"]'), target: 90, suffix: '%' },
        { element: document.querySelector('[data-counter="2167"]'), target: 2167, suffix: '+' }
    ];
    
    counters.forEach(counter => {
        if (!counter.element) return;
        
        let current = 0;
        const increment = counter.target / 50; // 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                current = counter.target;
                clearInterval(timer);
            }
            counter.element.textContent = Math.floor(current) + counter.suffix;
        }, 40);
    });
}

// Attach event listeners
function attachEventListeners() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Modal close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });
    
    // Modal close on backdrop click
    document.getElementById('contactModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'contactModal') {
            closeModal();
        }
    });
}

// Handle smooth scroll
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Modal functions
function openModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('modal-enter');
        isModalOpen = true;
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('modal-enter');
        isModalOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

// Handle contact form submission
async function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.innerHTML = '<div class="spinner mr-2"></div>Submitting...';
    submitButton.disabled = true;
    
    try {
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            college: form.querySelector('#college').value || '',
            message: form.querySelector('#message').value || ''
        };
        
        // Validate form data
        if (!validateFormData(formData)) {
            throw new Error('Please fill in all required fields');
        }
        
        // Submit form data
        const response = await axios.post('/api/contact', formData);
        
        if (response.data.success) {
            showSuccessMessage(response.data.message);
            closeModal();
            
            // Track conversion (you can integrate with analytics)
            trackConversion('mock_interview_booking', formData);
        } else {
            throw new Error(response.data.message || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Validate form data
function validateFormData(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    
    if (!data.name || data.name.trim().length < 2) {
        showErrorMessage('Please enter a valid name');
        return false;
    }
    
    if (!data.email || !emailRegex.test(data.email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }
    
    if (!data.phone || !phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        showErrorMessage('Please enter a valid 10-digit phone number');
        return false;
    }
    
    return true;
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.querySelector('span').textContent = message;
        successDiv.classList.remove('hidden');
        
        setTimeout(() => {
            successDiv.classList.add('hidden');
        }, 5000);
    }
}

// Show error message
function showErrorMessage(message) {
    alert(message); // Simple alert for now, can be enhanced with custom modal
}

// FAQ toggle function
function toggleFAQ(index) {
    const answer = document.getElementById(`answer-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    
    if (answer && icon) {
        const isHidden = answer.classList.contains('hidden');
        
        if (isHidden) {
            answer.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
        } else {
            answer.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

// Download syllabus function
function downloadSyllabus() {
    // Create a sample PDF download link
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iagp7Cjw8IC9UeXBlIC9DYXRhbG9nIC9QYWdlcyAyIDAgUiA+Pgo+CmVuZG9iagoyIDAgb2JqCns8PCANVHlwZSAvUGFnZXMgL0tpZHMgWzMgMCBSXSAvQ291bnQgMSA+Pgo+CmVuZG9iagozIDAgb2JqCns8PCANVHlwZSAvUGFnZSAvUGFyZW50IDIgMCBSIC9SZXNvdXJjZXMgeyAvRm9udCB7IC9GMSA0IDAgUiB9IH0gL01lZGlhQm94IFswIDAgNTk1IDg0Ml0gL0NvbnRlbnRzIDUgMCBSID4+Cj5lbmRvYmoKNCAwIG9iago+PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKPj5ZCjUgMCBvYmoKPDwKL0xlbmd0aCAzMwg+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjMwMCA1MDAgVGQKKEVsaXRlIENhbXB1cyBUcmFpbmluZyBTeWxsYWJ1cykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowd00wMDAwNTYgNjU1MzUgZg0KMDAwMDAwMDE5IDAwMDAwIG4NCjAwMDAwMDA0NCAwMDAwMCBuDQowMDAwMDAwMDk0IDAwMDAwIG4NCjAwMDAwMDE5NCAwMDAwMCBuDQp0cmFpbGVyCnsgL1NpemUgNiAvUm9vdCAxIDAgUiB9CnN0YXJ0eHJlZgo2NDQKJSVFT0Y=';
    link.download = 'Elite-Campus-Training-Syllabus.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download
    trackConversion('syllabus_download');
    
    // Show confirmation
    showSuccessMessage('Syllabus downloaded successfully!');
}

// Play demo function
function playDemo() {
    // For now, show a placeholder message
    alert('Demo video will be available soon! Call us at +91 8438554420 for a live demo.');
    
    // Track demo request
    trackConversion('demo_request');
}

// Track conversion function
function trackConversion(eventName, data = {}) {
    // This function can be integrated with analytics platforms
    console.log('Conversion tracked:', eventName, data);
    
    // Example integrations:
    // Google Analytics: gtag('event', eventName, data);
    // Facebook Pixel: fbq('track', eventName, data);
    // Google Ads: gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'});
}

// Scroll to testimonials
function scrollToTestimonials() {
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = testimonialsSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// WhatsApp integration
function openWhatsApp() {
    const phone = '+918438554420';
    const message = encodeURIComponent('Hi! I am interested in Elite Campus Training programs. Please provide more details.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    
    trackConversion('whatsapp_contact');
}

// Phone call tracking
function trackPhoneCall() {
    trackConversion('phone_call');
}

// Email click tracking
function trackEmailClick() {
    trackConversion('email_click');
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
const debouncedScroll = debounce(initializeScrollEffects, 100);
window.addEventListener('resize', debouncedScroll);

// Preload important resources
function preloadResources() {
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadResources);

// Error handling for external resources
window.addEventListener('error', (e) => {
    console.error('Resource loading error:', e);
    // You can implement fallback strategies here
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}