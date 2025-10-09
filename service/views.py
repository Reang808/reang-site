from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from .models import Service


def service_list_view(request):
    # データベースから、全てのServiceオブジェクトを取得
    services_data = Service.objects.all()
    
    # テンプレートに渡すためのコンテキスト（辞書）を作成
    context = {
        'services': services_data,
    }
    
    # contextをテンプレートに渡して、レンダリング（HTML生成）した結果を返す
    return render(request, 'service/service_list.html', context)

def service_detail_view(request, slug):
    # URLのslugに一致するサービスをデータベースから取得
    # もし存在しなければ404エラー（ページが見つかりません）を返す
    service = get_object_or_404(Service, slug=slug)
    
    context = {
        'service': service,
    }
    
    # service_detail.htmlという新しいテンプレートを呼び出す
    return render(request, 'service/service_detail.html', context)
