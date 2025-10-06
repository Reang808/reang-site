// アコーディオン機能
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', function() {
    const content = this.nextElementSibling;
    this.classList.toggle('active');

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail-item');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // メイン画像を更新
      mainImage.src = this.src;

      // アクティブなサムネイルのスタイルを更新
      thumbnails.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });
});