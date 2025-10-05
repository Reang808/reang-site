// DOMが完全に読み込まれた後にスクリプトを実行
document.addEventListener('DOMContentLoaded', function() {
  
  // 全てのアコーディオンのトリガー（質問部分）を取得
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  // 取得した各トリガーに対して処理を設定
  accordionTriggers.forEach((trigger, index) => {
    
    // アクセシビリティのためのARIA属性を設定
    const content = trigger.nextElementSibling;
    const accordionId = `accordion-content-${index}`;
    
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', accordionId);
    content.setAttribute('id', accordionId);
    
    // トリガーがクリックされたときのイベントリスナーを追加
    trigger.addEventListener('click', function(e) {
      e.preventDefault(); // デフォルトのボタン動作を防ぐ
      
      // 現在開いているかどうかをチェック
      const isExpanded = this.classList.contains('active');
      
      // クリックされたトリガーに'active'クラスを付けたり消したりする
      this.classList.toggle('active');
      
      // ARIA属性を更新
      this.setAttribute('aria-expanded', !isExpanded);

      // 回答部分が開いているか（maxHeightが設定されているか）チェック
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // 開いていれば、高さを0に設定して閉じる
        content.style.maxHeight = '0px';
      } else {
        // 閉じていれば、コンテンツの実際の高さ分だけ広げる
        // scrollHeightはその要素が本来持つべき高さを取得するプロパティ
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });

    // キーボード操作対応（エンターキーとスペースキー）
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // モバイルデバイスでのタッチ操作改善
    let touchStartY = 0;
    
    trigger.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
      this.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
    }, { passive: true });

    trigger.addEventListener('touchend', function(e) {
      this.style.backgroundColor = '';
      
      // タッチ位置があまり動いていない場合のみクリック処理
      const touchEndY = e.changedTouches[0].clientY;
      if (Math.abs(touchEndY - touchStartY) < 10) {
        // タッチ操作での誤操作を防ぐため、少し遅延してからクリック処理
        setTimeout(() => {
          this.click();
        }, 50);
      }
    }, { passive: true });

    trigger.addEventListener('touchcancel', function() {
      this.style.backgroundColor = '';
    });
  });

  // ウィンドウリサイズ時にアコーディオンの高さを再計算
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      const activeContents = document.querySelectorAll('.accordion-trigger.active + .accordion-content');
      activeContents.forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
      });
    }, 150);
  });

});