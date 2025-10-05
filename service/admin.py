from django.contrib import admin
from .models import Service, Category

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'campaign_price', 'is_campaign_target')
    list_filter = ('category', 'is_campaign_target')
    search_fields = ('title',) # descriptionは削除したのでtitleのみに

    fieldsets = (
        ('基本情報（一覧ページ用）', {
            'fields': ('title', 'category', 'image', 'slug')
        }),
        ('価格とキャンペーン設定', {
            'fields': ('price', 'campaign_price', 'monthly_info', 'is_campaign_target')
        }),
        ('詳細ページコンテンツ設定', {
            'description': 'このセクションの内容が、サービスの詳細ページに表示されます。',
            'fields': ('main_image', 'description_rich', 'flow_rich'),
        }),
    )
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Service, ServiceAdmin)
admin.site.register(Category)