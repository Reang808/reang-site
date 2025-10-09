// サービス詳細ページの機能
document.addEventListener('DOMContentLoaded', function() {
  console.log('Service Detail JS loaded');
  
  // アコーディオン機能
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  console.log('Found accordion triggers:', accordionTriggers.length);
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      console.log('Accordion trigger clicked');
      const content = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // すべてのアコーディオンを閉じる
      accordionTriggers.forEach(otherTrigger => {
        const otherContent = otherTrigger.nextElementSibling;
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherTrigger.classList.remove('active');
        otherContent.style.maxHeight = null;
      });
      
      // クリックされたアコーディオンを開く（既に開いていなければ）
      if (!isExpanded) {
        this.setAttribute('aria-expanded', 'true');
        this.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // サムネイル画像切り替え機能
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  
  console.log('Main image element:', mainImage);
  console.log('Found thumbnails:', thumbnails.length);

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        console.log('Thumbnail clicked:', this.src);
        
        // メイン画像を更新
        mainImage.src = this.src;
        mainImage.alt = this.alt;

        // アクティブなサムネイルのスタイルを更新
        thumbnails.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // スムーズスクロール機能（パンくずリストなどのリンク用）
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
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
});