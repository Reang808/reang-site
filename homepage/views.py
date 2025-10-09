from django.shortcuts import render
from django.views.generic import TemplateView


class HomeView(TemplateView):
    """ホームページのビュー"""
    template_name = 'homepage/home.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'ホーム'
        return context

class AboutView(TemplateView):
    """アバウトページのビュー"""
    template_name = 'homepage/about.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'アバウト'
        return context

class PrivacyView(TemplateView):
    """プライバシーポリシーページのビュー"""
    template_name = 'homepage/privacy.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'プライバシーポリシー'
        return context

class PriceView(TemplateView):
    """料金ページのビュー"""
    template_name = 'homepage/price.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = '料金'
        return context

