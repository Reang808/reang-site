from django.db import models
from ckeditor.fields import RichTextField

class Category(models.Model):
    # (変更なし)
    name = models.CharField("カテゴリ名", max_length=100)
    def __str__(self):
        return self.name

class Service(models.Model):
    # --- 基本情報 (変更なし) ---
    title = models.CharField("サービス名", max_length=200)
    category = models.ForeignKey(Category, verbose_name="カテゴリ", on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField("（一覧用）商品画像", upload_to='services/thumbnails/') # 分かりやすいように名前を変更
    slug = models.SlugField("URLスラッグ", unique=True, help_text="このサービスのユニークURL（例: reserve-system）")

    # --- 価格とキャンペーン設定 (変更なし) ---
    price = models.CharField("価格表記", max_length=50, help_text="例: ¥50,000, ¥10,000~ など自由に入力できます")
    monthly_info = models.CharField("月額情報など", max_length=100, help_text="例: 運用保守費：月額１万円")
    is_campaign_target = models.BooleanField("キャンペーン対象", default=False, help_text="チェックを入れるとキャンペーン対象になります")

    # --- 詳細ページコンテンツ (ここからが新しい設定) ---
    main_image = models.ImageField("（詳細ページ用）メイン画像", upload_to='services/main_images/', blank=True, null=True)
    description_rich = RichTextField("詳しい説明（画像・テキスト）", blank=True, null=True)
    flow_rich = RichTextField("導入の流れ（画像・テキスト）", blank=True, null=True)
    
    # 以前のcontentフィールドは使わないので削除またはコメントアウトします
    # content = RichTextField("詳細ページ内容", blank=True, null=True)

    def __str__(self):
        return self.title