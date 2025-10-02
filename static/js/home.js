// DOM読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {

  // --- カードが横から出現するアニメーション ---
  
  // 1. アニメーションさせたいカード要素をすべて取得
  const animatedCards = document.querySelectorAll('.home-service-card, .home-pricing-card');

  // 2. Intersection Observer のオプション設定
  const observerOptions = {
    root: null, // ビューポートを基準
    rootMargin: '0px 0px -100px 0px', // 画面の下から100pxの位置で見え始めたら
    threshold: 0 // 少しでも見えたらトリガー
  };

  // 3. 要素が画面内に入ったときの処理を定義
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // 画面内に入ったら
      if (entry.isIntersecting) {
        // is-visibleクラスを追加してアニメーションを開始
        entry.target.classList.add('is-visible');
        // 一度アニメーションしたら、その要素の監視を解除
        observer.unobserve(entry.target);
      }
    });
  };

  // 4. オブザーバーのインスタンスを作成
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 5. 各カードに初期クラスを付与し、監視を開始
  animatedCards.forEach(card => {
    card.classList.add('slide-in');
    observer.observe(card);
  });


  // --- (追加提案) パララックス効果 ---
  
  // 6. data-speed属性を持つ要素をすべて取得
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  window.addEventListener('scroll', () => {
    const yOffset = window.pageYOffset; // 垂直方向のスクロール量を取得

    parallaxElements.forEach(el => {
      const speed = el.dataset.speed; // data-speedの値を取得
      // スクロール量とspeedを掛け合わせて、Y方向の位置をずらす
      el.style.transform = `translateY(${yOffset * speed}px)`;
    });
  });

});
document.addEventListener('DOMContentLoaded', function() {
    // 初期化関数群の実行
    initScrollAnimations();
    initParticleAnimations();
    initSmoothScrolling();
    initCardAnimations();
    initButtonAnimations();
    initVideoControls();
});

// スクロールアニメーションの初期化
function initScrollAnimations() {
    // Intersection Observer で要素の表示を監視
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // カウントアップアニメーション
                if (entry.target.classList.contains('count-up')) {
                    animateCountUp(entry.target);
                }
            }
        });
    }, observerOptions);

    // アニメーション対象要素の登録
    const animateElements = document.querySelectorAll([
        '.home-service-card',
        '.home-pricing-card', 
        '.home-container25',
        '.home-container26',
        '.home-container28',
        '.home-container30',
        '.profile-section'
    ].join(','));

    animateElements.forEach(el => {
        el.classList.add('animate-fade-in');
        observer.observe(el);
    });
}

// パーティクルアニメーションの強化
function initParticleAnimations() {
    const particlesContainer = document.querySelector('.particles-background');
    if (!particlesContainer) return;

    // 追加のパーティクルを動的に生成
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle dynamic-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particlesContainer.appendChild(particle);
    }

    // マウス追従パーティクル
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) { // 5%の確率でパーティクル生成
            createMouseParticle(e.clientX, e.clientY);
        }
    });
}

// マウス追従パーティクルの生成
function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    // アニメーション終了後に削除
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

// スムーズスクロールの実装
function initSmoothScrolling() {
    // サービス内容ボタンのスムーズスクロール
    const serviceButton = document.querySelector('.home-service-button');
    if (serviceButton) {
        serviceButton.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#service');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // スクロール進捗バーの追加
    createScrollProgressBar();
}

// スクロール進捗バーの作成
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// カードアニメーションの初期化
function initCardAnimations() {
    const cards = document.querySelectorAll('.home-service-card, .home-pricing-card');
    
    cards.forEach((card, index) => {
        // ホバー時の3D効果
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.boxShadow = '';
        });

        // カードの画像にパララックス効果
        const cardImage = card.querySelector('.home-service-image, .home-pricing-image');
        if (cardImage) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                cardImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                cardImage.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            });
        }
    });
}

// ボタンアニメーションの強化
function initButtonAnimations() {
    const buttons = document.querySelectorAll([
        '.home-contact-button',
        '.home-consultation-button',
        '.profile-cta-button'
    ].join(','));

    buttons.forEach(button => {
        // home-contact-buttonは除外（サイズ変更問題回避）
        if (button.classList.contains('home-contact-button')) {
            return;
        }
        
        // リップル効果の追加
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // ホバー時のパルス効果（home-contact-button以外）
        if (!button.classList.contains('home-contact-button')) {
            button.addEventListener('mouseenter', () => {
                button.classList.add('pulse-animation');
            });

            button.addEventListener('mouseleave', () => {
                button.classList.remove('pulse-animation');
            });
        }
    });
}

// 動画コントロールの最適化
function initVideoControls() {
    const heroVideo = document.querySelector('.hero-background-video');
    if (heroVideo) {
        // 動画の再生を最適化
        heroVideo.addEventListener('loadeddata', () => {
            heroVideo.play().catch(e => {
                console.log('動画の自動再生に失敗しました:', e);
            });
        });

        // スクロール時の動画の処理
        let videoTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(videoTimeout);
            
            const rect = heroVideo.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            
            if (!isVisible && !heroVideo.paused) {
                heroVideo.pause();
            } else if (isVisible && heroVideo.paused) {
                videoTimeout = setTimeout(() => {
                    heroVideo.play().catch(e => {
                        console.log('動画の再生に失敗しました:', e);
                    });
                }, 100);
            }
        });
    }
}

// カウントアップアニメーション
function animateCountUp(element) {
    const text = element.textContent;
    const numbers = text.match(/\d+/g);
    
    if (numbers) {
        numbers.forEach(num => {
            const targetNumber = parseInt(num);
            const duration = 2000;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentNumber = Math.floor(progress * targetNumber);
                
                element.textContent = text.replace(num, currentNumber);
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
}

// ページ読み込み時のローディングアニメーション
window.addEventListener('load', () => {
    // ローディング完了の処理
    document.body.classList.add('loaded');
    
    // ヒーローセクションのアニメーション開始
    const hero = document.querySelector('.home-hero');
    if (hero) {
        hero.classList.add('hero-loaded');
    }
    
    // テキストのタイピングアニメーション
    startTypingAnimation();
});

// タイピングアニメーション
function startTypingAnimation() {
    const typeText = document.querySelector('.home-text10');
    if (!typeText) return;
    
    const text = typeText.textContent;
    typeText.textContent = '';
    typeText.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typeText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// パフォーマンス最適化のためのリサイズハンドラ
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // リサイズ時の処理
        updateParticlePositions();
    }, 250);
});

// パーティクルの位置を更新
function updateParticlePositions() {
    const particles = document.querySelectorAll('.dynamic-particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
    });
}

// スクロールベースのパララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax-element');
    
    parallax.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.log('JavaScript エラーが発生しました:', e.error);
});

// モバイル対応の最適化
if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile-device');
    
    // モバイル用の最適化
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.animationDuration = '20s'; // アニメーション速度を下げる
    });
}

