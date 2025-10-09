// FAQ Accordion Functionality
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = faqItem.querySelector('.faq-icon');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            otherAnswer.style.maxHeight = '0px';
        }
    });
    
    // Toggle current FAQ item
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        faqAnswer.style.maxHeight = '0px';
    } else {
        faqItem.classList.add('active');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
    }
}

// Initialize FAQ functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // FAQ items animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});