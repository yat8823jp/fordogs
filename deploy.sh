# 前回のビルドを削除
rm -rf docs

# ビルド実行
bun run build 

# 個別に必要なファイルをコピー
cp docs/index.html docs/assets/*

# コミット & プッシュしてGitHubActionsをトリガー
git add .
git commit -m "deploy"
git pull
git push