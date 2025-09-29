# reang.jp Django Project

reang.jpのメインサイト用Djangoプロジェクトです。

## 🚀 プロジェクト概要

- **フレームワーク**: Django 5.2.6
- **Python バージョン**: 3.13+
- **デプロイ**: Gunicorn + Nginx

## 📁 プロジェクト構造

```
config/                 # Django設定ファイル
├── settings.py         # 開発用設定
├── production_settings.py  # 本番用設定
├── urls.py
└── wsgi.py

homepage/               # メインアプリケーション
├── models.py
├── views.py
├── urls.py
└── templates/

static/                 # 静的ファイル
├── css/
├── images/
├── js/
└── videos/

templates/              # テンプレートファイル
└── base.html
```

## 🛠️ 開発環境のセットアップ

### 1. リポジトリのクローン
```bash
git clone [repository-url]
cd IT
```

### 2. 仮想環境の作成と有効化
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# または
venv\Scripts\activate     # Windows
```

### 3. 依存関係のインストール
```bash
pip install -r requirements.txt
```

### 4. 環境変数の設定
```bash
cp .env.example .env
# .envファイルを編集して適切な値を設定
```

### 5. データベースのマイグレーション
```bash
python manage.py migrate
```

### 6. 開発サーバーの起動
```bash
python manage.py runserver
```

## 🚀 本番環境デプロイ

### 環境変数の設定
本番環境では以下の環境変数を設定してください：

```bash
# 必須設定
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=reang.jp,www.reang.jp

# セキュリティ設定（HTTPS使用時）
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

### Django設定
本番環境では `config.production_settings` を使用してください：

```bash
export DJANGO_SETTINGS_MODULE=config.production_settings
```

### 静的ファイルの収集
```bash
python manage.py collectstatic
```

## 📦 主要な依存関係

- **Django**: Webフレームワーク
- **Gunicorn**: WSGI HTTPサーバー
- **WhiteNoise**: 静的ファイル配信
- **Pillow**: 画像処理
- **django-crispy-forms**: フォーム改善
- **djangorestframework**: API開発

## 🔧 開発ツール

- **django-debug-toolbar**: デバッグ用ツールバー
- **django-extensions**: Django拡張機能
- **python-decouple**: 環境変数管理

## 📝 注意事項

1. **機密情報**: `.env`ファイルは絶対にGitにコミットしないでください
2. **本番環境**: `DEBUG=False`に設定し、適切な`SECRET_KEY`を使用してください
3. **HTTPS**: 本番環境では必ずHTTPSを使用してください

## 🤝 貢献方法

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 📞 サポート

質問や問題がある場合は、[Issues](../../issues) で報告してください。