# deploy.sh

# 删除dist, 否则第二次会提示fatal: A branch named 'main' already exists.
rm -rf dist

# 错误时停止
set -e

# 1、打包
npm run build

# 2、进入目标文件夹，这里跟项目打包输出的文件夹相同（如果项目中不修改默认为：dist）
cd dist

# 3、将打包输出的所有文件提交到本地仓库
git init
git add -A
git commit -m 'deploy'

# 4、将打包出的所有文件push到远程仓库的gh-pages 分支，如果远程没有这个分支，会自动创建
git push -f git@github.com:CherikoM/hospital.git master:gh-pages
cd -