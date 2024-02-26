#!/usr/bin/env sh

set -e

npm run dev

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:Mustafaisaev3/Vue2-form-with-Vuelidate-Scss.git master:gh-pages

cd -