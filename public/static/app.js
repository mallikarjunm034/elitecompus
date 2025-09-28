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
    try {
        // Method 1: Try to fetch PDF from server endpoint
        fetch('/api/syllabus-pdf')
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error('PDF not available from server');
            })
            .then(blob => {
                // Create download link for server PDF
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Elite-Campus-Training-Syllabus.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                
                // Track download
                trackConversion('syllabus_download');
                showSuccessMessage('Syllabus downloaded successfully!');
            })
            .catch(() => {
                // Fallback: Open syllabus page in new tab
                openSyllabusPage();
            });
    } catch (error) {
        console.error('Download error:', error);
        // Fallback: Open syllabus page
        openSyllabusPage();
    }
}

// Fallback: Open syllabus information in new tab
function openSyllabusPage() {
    const syllabusContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elite Campus Training - Syllabus</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-blue-600 mb-2">Elite Campus Training</h1>
            <h2 class="text-xl font-semibold text-gray-700">Comprehensive Placement Training Syllabus</h2>
            <p class="text-gray-600 mt-2">Get Placed in 90 Days - From Mock to Offer</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div class="border-l-4 border-blue-500 pl-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-3">
                        <i class="fas fa-calculator text-blue-500 mr-2"></i>
                        Quantitative Aptitude
                    </h3>
                    <ul class="space-y-1 text-sm text-gray-600">
                        <li>• Arithmetic & Number Systems</li>
                        <li>• Profit & Loss, Discounts</li>
                        <li>• Time, Speed & Work</li>
                        <li>• Probability & Permutations</li>
                        <li>• Combinations (P&C)</li>
                        <li>• Ratios & Proportions</li>
                        <li>• Averages & Mixtures</li>
                        <li>• Simple & Compound Interest</li>
                        <li>• Geometry & Mensuration</li>
                    </ul>
                </div>
                
                <div class="border-l-4 border-purple-500 pl-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-3">
                        <i class="fas fa-brain text-purple-500 mr-2"></i>
                        Logical Reasoning
                    </h3>
                    <ul class="space-y-1 text-sm text-gray-600">
                        <li>• Puzzles & Seating Arrangements</li>
                        <li>• Blood Relations</li>
                        <li>• Coding-Decoding</li>
                        <li>• Syllogisms & Logic</li>
                        <li>• Series & Patterns</li>
                        <li>• Logical Deductions</li>
                        <li>• Statements & Assumptions</li>
                        <li>• Arguments & Conclusions</li>
                        <li>• Direction & Distance</li>
                    </ul>
                </div>
            </div>
            
            <div class="space-y-6">
                <div class="border-l-4 border-green-500 pl-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-3">
                        <i class="fas fa-chart-bar text-green-500 mr-2"></i>
                        Data Interpretation
                    </h3>
                    <ul class="space-y-1 text-sm text-gray-600">
                        <li>• Bar Charts & Graphs</li>
                        <li>• Line Charts & Trends</li>
                        <li>• Pie Charts & Analysis</li>
                        <li>• Tables & Data Sets</li>
                        <li>• Data Sufficiency</li>
                        <li>• Comparative Analysis</li>
                        <li>• Statistical Measures</li>
                        <li>• Advanced Analytics</li>
                    </ul>
                </div>
                
                <div class="border-l-4 border-orange-500 pl-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-3">
                        <i class="fas fa-comments text-orange-500 mr-2"></i>
                        Soft Skills & Interview Prep
                    </h3>
                    <ul class="space-y-1 text-sm text-gray-600">
                        <li>• Communication Skills</li>
                        <li>• Confidence Building</li>
                        <li>• Interview Etiquette</li>
                        <li>• Professional Presentation</li>
                        <li>• Group Discussion</li>
                        <li>• Technical Interview Prep</li>
                        <li>• HR Interview Skills</li>
                        <li>• Body Language & Grooming</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 class="text-lg font-bold text-gray-800 mb-4">4-Step Placement Journey</h3>
            <div class="grid md:grid-cols-4 gap-4">
                <div class="text-center">
                    <div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
                    <h4 class="font-semibold text-sm">Resume Overhaul</h4>
                    <p class="text-xs text-gray-600">ATS-ready resume + LinkedIn</p>
                </div>
                <div class="text-center">
                    <div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
                    <h4 class="font-semibold text-sm">Mock Interviews</h4>
                    <p class="text-xs text-gray-600">IIT/IIM trainer practice</p>
                </div>
                <div class="text-center">
                    <div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
                    <h4 class="font-semibold text-sm">Capstone Projects</h4>
                    <p class="text-xs text-gray-600">Real-world exposure</p>
                </div>
                <div class="text-center">
                    <div class="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">4</div>
                    <h4 class="font-semibold text-sm">Final Placement</h4>
                    <p class="text-xs text-gray-600">Company-specific prep</p>
                </div>
            </div>
        </div>
        
        <div class="mt-8 bg-gray-900 text-white p-6 rounded-lg text-center">
            <h3 class="text-xl font-bold mb-2">Ready to Start Your Journey?</h3>
            <p class="text-gray-300 mb-4">Join 2000+ students who got placed with our proven methodology</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+918438554420" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                    <i class="fas fa-phone mr-2"></i>Call Now: +91 8438554420
                </a>
                <a href="mailto:harishpro24@gmail.com" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                    <i class="fas fa-envelope mr-2"></i>Email Us
                </a>
            </div>
        </div>
        
        <div class="mt-6 text-center">
            <button onclick="window.print()" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg mr-4">
                <i class="fas fa-print mr-2"></i>Print This Page
            </button>
            <button onclick="window.close()" class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg">
                Close
            </button>
        </div>
    </div>
    
    <style>
        @media print {
            body { background: white !important; }
            .no-print { display: none !important; }
        }
    </style>
</body>
</html>`;

    // Open in new tab
    const newWindow = window.open('', '_blank');
    newWindow.document.write(syllabusContent);
    newWindow.document.close();
    
    // Track download attempt
    trackConversion('syllabus_view');
    showSuccessMessage('Syllabus opened in new tab. You can print or save it from there.');
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