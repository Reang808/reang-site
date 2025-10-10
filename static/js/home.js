// FAQ Accordion Functionality
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = faqItem.querySelector('.faq-icon');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
    
    // Add smooth transition effect
    if (faqItem.classList.contains('active')) {
        faqAnswer.style.display = 'block';
        // Force reflow for smooth animation
        faqAnswer.offsetHeight;
    } else {
        setTimeout(() => {
            if (!faqItem.classList.contains('active')) {
                faqAnswer.style.display = 'none';
            }
        }, 300);
    }
}

// Initialize homepage functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    console.log('Found anchor links:', links.length);
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            console.log('Clicked:', targetId, 'Element found:', !!targetElement);
            
            if (targetElement) {
                // より確実なスクロール方法
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // クリックした要素にアクティブ効果を追加
                if (link.classList.contains('badge-link')) {
                    link.style.background = 'rgba(255, 255, 255, 0.3)';
                    setTimeout(() => {
                        link.style.background = '';
                    }, 1500);
                }
            } else {
                console.warn('Target element not found:', targetId);
            }
        });
    });
    
    // バッジリンク専用の処理とフォールバック
    const badgeLinks = document.querySelectorAll('.badge-link');
    console.log('Found badge links:', badgeLinks.length);
    
    badgeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            console.log('Badge link clicked:', targetId);
            
            // より確実な要素選択
            let targetElement = document.querySelector(targetId);
            
            if (!targetElement && targetId) {
                // IDが見つからない場合の代替処理
                const sectionName = targetId.replace('#', '').replace('-section', '');
                targetElement = document.querySelector(`[id*="${sectionName}"]`);
            }
            
            if (targetElement) {
                console.log('Scrolling to:', targetElement);
                setTimeout(() => {
                    // セクションに応じてスクロール位置を調整
                    let scrollBehavior = { behavior: 'smooth', block: 'start' };
                    
                    if (targetId === '#faq-section') {
                        // FAQセクションはタイトルが見えるように調整
                        const rect = targetElement.getBoundingClientRect();
                        const currentY = window.pageYOffset;
                        console.log('FAQ section - Current Y:', currentY, 'Element top:', rect.top);
                        
                        const yOffset = -100; // ヘッダー分を考慮
                        const y = rect.top + currentY + yOffset;
                        
                        console.log('Scrolling to Y:', y);
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    } else if (targetId === '#contact-section') {
                        // コンタクトセクションも少し上にマージン
                        const yOffset = -60;
                        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    } else {
                        // その他のセクション（About, Service, Price）
                        targetElement.scrollIntoView(scrollBehavior);
                    }
                }, 100);
            }
        });
    });
    
    // Intersection Observer for scroll animations
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
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animateElements = [
        ...document.querySelectorAll('.faq-item'),
        ...document.querySelectorAll('.feature-card'),
        ...document.querySelectorAll('.section-content')
    ];
    
    animateElements.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    });
    
    // Hero section parallax effect
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const heroFeatures = document.querySelector('.hero-features');
    
    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                if (heroFeatures) {
                    heroFeatures.style.transform = `translateY(${scrolled * parallaxSpeed * 0.3}px)`;
                }
            }
        });
    }
    
    // Video optimization for performance
    const videos = document.querySelectorAll('.hero-video-bg, .hero-video-bg2');
    videos.forEach(video => {
        video.addEventListener('loadeddata', () => {
            video.style.opacity = video.classList.contains('hero-video-bg') ? '0.7' : '0.3';
        });
        
        // Pause video when not in view for better performance
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        });
        
        videoObserver.observe(video);
    });
    
    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Keyboard navigation for FAQ
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(this);
            }
        });
        
        // Make focusable for accessibility
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });
    
    console.log('🎉 Reang Homepage initialized successfully!');
});