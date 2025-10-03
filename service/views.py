from django.shortcuts import render
from django.views.generic import TemplateView

class ServiceView(TemplateView):
    """サービスページのビュー"""
    template_name = 'service/service.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'サービス内容 - ITサポート・システム開発'
        return context

class ECSiteView(TemplateView):
    """ECサイトサービスページのビュー"""
    template_name = 'service/ecsite.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'ECサイト構築サービス - Reang'
        return context

class DXView(TemplateView):
    """業務効率化・DX支援サービスページのビュー"""
    template_name = 'service/dx.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = '業務効率化・DX支援サービス - Reang'
        return context

class ReserveView(TemplateView):
    """予約システム導入サービスページのビュー"""
    template_name = 'service/reserve.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = '予約システム導入サービス - Reang'
        return context

class WebsiteView(TemplateView):
    """Webサイト・LP制作サービスページのビュー"""
    template_name = 'service/website.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'Webサイト・LP制作サービス - Reang'
        return context

class ITSupportView(TemplateView):
    """IT伴走サポートサービスページのビュー"""
    template_name = 'service/it_support.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'IT伴走サポートサービス - Reang'
        return context