document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Breaking News Slider
    const newsSlider = document.querySelector('.news-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    newsSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - newsSlider.offsetLeft;
        scrollLeft = newsSlider.scrollLeft;
    });

    newsSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    newsSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    newsSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - newsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        newsSlider.scrollLeft = scrollLeft - walk;
    });

    // Category Tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Here you would typically filter articles based on category
            const category = tab.dataset.category;
            filterArticles(category);
        });
    });

    // Article Filter Function (Simulated)
    function filterArticles(category) {
        const articles = document.querySelectorAll('.article-card');
        articles.forEach(article => {
            if (category === 'all' || article.querySelector('.category').textContent.toLowerCase() === category) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Comments System
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.querySelector('.comments-list');

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = commentForm.querySelector('input[type="text"]').value;
            const email = commentForm.querySelector('input[type="email"]').value;
            const comment = commentForm.querySelector('textarea').value;
            
            // Create new comment
            addNewComment(name, comment);
            
            // Reset form
            commentForm.reset();
        });
    }

    function addNewComment(name, comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        
        const date = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        commentElement.innerHTML = `
            <div class="comment-header">
                <h4>${name}</h4>
                <span>${date}</span>
            </div>
            <p>${comment}</p>
        `;

        commentsList.prepend(commentElement);
    }

    // Lazy Loading Images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add CSS class for animation when elements come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.article-card, .opinion-card, .popular-card').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Mobile Menu Toggle (Add this if you want to implement a mobile menu)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.appendChild(mobileMenuButton);

    mobileMenuButton.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    // Tea Knowledge Section Animations
    const animateElements = document.querySelectorAll('.step, .benefit-card, .prep-step');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up', 'visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        element.classList.add('animate-fade-up');
        animationObserver.observe(element);
    });

    // Smooth Scroll for Process Steps
    document.querySelectorAll('.process-steps .step').forEach((step, index) => {
        step.addEventListener('click', () => {
            const nextStep = document.querySelectorAll('.process-steps .step')[index + 1];
            if (nextStep) {
                nextStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Interactive Benefits Cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Preparation Guide Timer
    const prepSteps = document.querySelectorAll('.prep-step');
    prepSteps.forEach(step => {
        if (step.querySelector('h5').textContent.includes('Steeping Time')) {
            const timeText = step.querySelector('p').textContent;
            const minutes = parseInt(timeText);
            if (!isNaN(minutes)) {
                const timerBtn = document.createElement('button');
                timerBtn.className = 'timer-button';
                timerBtn.innerHTML = '<i class="fas fa-clock"></i> Start Timer';
                step.appendChild(timerBtn);

                timerBtn.addEventListener('click', () => {
                    startSteepingTimer(minutes * 60, timerBtn);
                });
            }
        }
    });

    function startSteepingTimer(seconds, button) {
        let timeLeft = seconds;
        button.disabled = true;
        
        const interval = setInterval(() => {
            const minutesLeft = Math.floor(timeLeft / 60);
            const secondsLeft = timeLeft % 60;
            
            button.innerHTML = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;
            
            if (timeLeft === 0) {
                clearInterval(interval);
                button.innerHTML = 'Timer Complete!';
                button.disabled = false;
                
                // Optional: Show notification
                if (Notification.permission === 'granted') {
                    new Notification('Tea Timer', {
                        body: 'Your tea is ready!',
                        icon: '/path/to/tea-icon.png'
                    });
                }
            }
            timeLeft--;
        }, 1000);
    }

    // Request notification permission for timer
    if ('Notification' in window) {
        Notification.requestPermission();
    }

    // Image Parallax Effect
    const articleHeaders = document.querySelectorAll('.article-header');
    
    window.addEventListener('scroll', () => {
        articleHeaders.forEach(header => {
            const img = header.querySelector('img');
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (img) {
                img.style.transform = `translate3d(0px, ${rate}px, 0px)`;
            }
        });
    });

    // Add CSS class for staggered animations
    document.querySelectorAll('.process-steps .step').forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
    });

    // FAQ Section Enhancements
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Add fade-in animation when FAQ items come into view
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                faqObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        faqObserver.observe(item);
    });

    // Add hover effect for variety cards
    const varietyCards = document.querySelectorAll('.variety-card');
    varietyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add price update animation
    const priceItems = document.querySelectorAll('.price-info li');
    priceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'rgba(52, 92, 0, 0.05)';
            item.style.transform = 'scale(1.02)';
            item.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
            item.style.transform = 'scale(1)';
        });
    });

    // Add smooth scroll for FAQ navigation
    document.querySelectorAll('a[href^="#faq-"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                // Add highlight effect
                targetElement.style.backgroundColor = 'rgba(52, 92, 0, 0.1)';
                setTimeout(() => {
                    targetElement.style.backgroundColor = 'transparent';
                    targetElement.style.transition = 'background-color 0.5s ease';
                }, 1000);
            }
        });
    });

    // Excellence Showcase Animations
    const excellenceElements = document.querySelectorAll('.achievement-card, .quality-item, .leadership-card, .benefit-item');
    excellenceElements.forEach(element => {
        element.classList.add('fade-up');
    });

    const scaleElements = document.querySelectorAll('.achievement-icon, .leadership-icon, .benefit-icon');
    scaleElements.forEach(element => {
        element.classList.add('scale-in');
    });

    // Intersection Observer for excellence section animations
    const excellenceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                excellenceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.fade-up, .scale-in').forEach(element => {
        excellenceObserver.observe(element);
    });

    // Achievement Cards Counter Animation
    const achievementStats = document.querySelectorAll('.achievement-card [data-count]');
    achievementStats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50; // Adjust speed of counting
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        stat.classList.add('counting');
        updateCount();
    });

    // Quality Process Steps Animation
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
        step.classList.add('fade-up');
        excellenceObserver.observe(step);
    });

    // Leadership Cards Hover Effect
    const leadershipCards = document.querySelectorAll('.leadership-card');
    leadershipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Benefits Icons Rotation
    const benefitIcons = document.querySelectorAll('.benefit-icon');
    benefitIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.6s ease';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0deg)';
        });
    });

    // CTA Buttons Hover Effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });

    // Parallax Effect for Excellence Section
    const excellenceSection = document.querySelector('.excellence-showcase');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (excellenceSection) {
            excellenceSection.style.backgroundPosition = `center ${rate}px`;
        }
    });

    // About Page Animations
    if (document.querySelector('.about-hero')) {
        // Timeline Animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Brewing Steps Animation
        const brewingSteps = document.querySelectorAll('.step-card');
        const brewingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    brewingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        brewingSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            brewingObserver.observe(step);
        });

        // Process Timeline Animation
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                step.style.transition = 'all 0.6s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, index * 300);
        });

        // Stats Counter Animation
        const stats = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-value'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps

                    function updateCount() {
                        count += increment;
                        if (count < target) {
                            entry.target.textContent = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            entry.target.textContent = target;
                        }
                    }

                    updateCount();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => statsObserver.observe(stat));

        // Terroir Factors Animation
        const terroirFactors = document.querySelectorAll('.terroir-factors li');
        terroirFactors.forEach((factor, index) => {
            factor.style.opacity = '0';
            factor.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                factor.style.transition = 'all 0.6s ease';
                factor.style.opacity = '1';
                factor.style.transform = 'translateX(0)';
            }, index * 200);
        });

        // Award Cards Animation
        const awardCards = document.querySelectorAll('.award-card');
        const awardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                    awardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        awardCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            awardObserver.observe(card);
        });

        // Quality Cards Rotation
        const qualityCards = document.querySelectorAll('.quality-card');
        qualityCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(10deg)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
            });
        });

        // Price Cards Highlight
        const priceCards = document.querySelectorAll('.price-card');
        priceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                priceCards.forEach(c => c.style.opacity = '0.7');
                card.style.opacity = '1';
                card.style.transform = 'translateY(-10px) scale(1.05)';
            });

            card.addEventListener('mouseleave', () => {
                priceCards.forEach(c => c.style.opacity = '1');
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax Effect for Hero Section
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.about-hero');
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });

        // Smooth Scroll for Process Steps
        document.querySelectorAll('.process-step').forEach((step, index, steps) => {
            step.addEventListener('click', () => {
                if (index < steps.length - 1) {
                    steps[index + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }
}); 