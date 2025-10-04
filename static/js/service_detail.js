// DOMが完全に読み込まれた後にスクリプトを実行
document.addEventListener('DOMContentLoaded', function() {
  
  // 全てのアコーディオンのトリガー（質問部分）を取得
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  // 取得した各トリガーに対して処理を設定
  accordionTriggers.forEach(trigger => {
    // トリガーがクリックされたときのイベントリスナーを追加
    trigger.addEventListener('click', function() {
      // クリックされたトリガーに'active'クラスを付けたり消したりする
      this.classList.toggle('active');

      // クリックされたトリガーのすぐ隣の要素（回答部分）を取得
      const content = this.nextElementSibling;

      // 回答部分が開いているか（maxHeightが設定されているか）チェック
      if (content.style.maxHeight) {
        // 開いていれば、高さをnullに設定して閉じる
        content.style.maxHeight = null;
      } else {
        // 閉じていれば、コンテンツの実際の高さ分だけ広げる
        // scrollHeightはその要素が本来持つべき高さを取得するプロパティ
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

});