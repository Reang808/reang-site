/**
 * スクロール連動アニメーション用スクリプト
 * ----------------------------------------
 * 概要：画面内に入った要素に 'is-visible' クラスを付与し、
 * CSSアニメーションを発火させる。Intersection Observer APIを使用。
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. アニメーションさせたい要素をすべて取得
  //    (画像、機能カード、導入フローの各ステップ、料金カードなど)
  const animatedElements = document.querySelectorAll(
    '.features-image-wrapper, .feature-card-new, .flow-step, .pricing-card'
  );

  // 2. アニメーションの初期設定を各要素に追加する
  //    - ここで左右どちらから出現させるかなどを振り分けています
  animatedElements.forEach((el, index) => {
    // 基本クラスを追加
    el.classList.add('scroll-reveal');

    // 要素の種類や位置に応じて、異なるアニメーションクラスを割り当てる
    if (el.classList.contains('features-image-wrapper')) {
      el.classList.add('from-left'); // 特徴画像は左から
    } else if (el.classList.contains('feature-card-new')) {
      el.classList.add('from-right'); // 機能カードは右から
    } else if (el.classList.contains('flow-step')) {
      el.classList.add('from-bottom'); // 導入フローは下から
      // 各ステップが少しずつ遅れて表示されるようにディレイを設定
      el.style.transitionDelay = `${index * 0.05}s`;
    } else if (el.classList.contains('pricing-card')) {
      el.classList.add('from-bottom'); // 料金カードも下から
    }
  });

  // 3. Intersection Observer の設定
  const observerOptions = {
    root: null, // ビューポートを基準とする
    rootMargin: '0px',
    threshold: 0.1 // 要素が10%見えたらトリガー
  };

  // 4. 要素が画面内に入ったときの処理
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // isIntersectingプロパティがtrueなら画面内に入ったと判断
      if (entry.isIntersecting) {
        // 'is-visible'クラスを付与して、CSSアニメーションを開始
        entry.target.classList.add('is-visible');
        
        // 一度表示されたら、監視を解除してパフォーマンスを向上
        observer.unobserve(entry.target);
      }
    });
  };

  // 5. Observerのインスタンスを作成し、監視を開始
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // scroll-revealクラスを持つすべての要素を監視対象にする
  const targets = document.querySelectorAll('.scroll-reveal');
  targets.forEach(target => {
    observer.observe(target);
  });

});

/**
 * ポートフォリオフィルター機能
 * ----------------------------------------
 * 概要：カテゴリーボタンをクリックすると、該当するポートフォリオアイテムのみを表示
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // カテゴリーボタンとポートフォリオアイテムを取得
  const categoryButtons = document.querySelectorAll('.category-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // カテゴリーボタンがクリックされた時の処理
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      
      // すべてのボタンからactiveクラスを削除
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // クリックされたボタンにactiveクラスを追加
      button.classList.add('active');
      
      // 選択されたカテゴリーを取得
      const selectedCategory = button.getAttribute('data-category');
      
      // ポートフォリオアイテムの表示・非表示を制御
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          // 該当するカテゴリーなら表示
          item.classList.remove('hidden');
          item.style.display = 'block';
        } else {
          // 該当しないカテゴリーなら非表示
          item.classList.add('hidden');
          setTimeout(() => {
            if (item.classList.contains('hidden')) {
              item.style.display = 'none';
            }
          }, 300); // CSSトランジションの時間に合わせて遅延
        }
      });
    });
  });
  
  // 初期状態では「すべて」を選択状態にする
  const allButton = document.querySelector('.category-btn[data-category="all"]');
  if (allButton) {
    allButton.classList.add('active');
  }
});

/**
 * 統計数字のカウントアップアニメーション
 * ----------------------------------------
 * 概要：統計セクションが見えた時に数字をカウントアップ
 */
document.addEventListener('DOMContentLoaded', () => {
  
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // 数字をアニメーションでカウントアップする関数
  function animateCount(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    // 数字以外の文字（%や年など）を分離
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    const suffix = target.replace(/[\d]/g, '');
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // イージング関数（最初は速く、だんだん遅く）
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.round(start + (numericValue - start) * easeOut);
      element.textContent = currentValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
  
  // 統計セクション用のIntersection Observer
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetText = entry.target.textContent;
        
        // カウントアニメーションを開始
        animateCount(entry.target, targetText, 1500);
        
        // 一度実行したら監視を停止
        statsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  // 各統計数字を監視対象に追加
  statNumbers.forEach(statNumber => {
    statsObserver.observe(statNumber);
  });
});