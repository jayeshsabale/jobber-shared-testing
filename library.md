npm i express

npm i -D @babel/cli @babel/preset-env @babel/preset-typescript @types/express @types/jsonwebtoken

npm i typescript

npm i -g typescript

tsc --init

npm i mongoose

npm i @elastic/elasticsearch

npm i cloudinary

npm i http-status-codes

npm i jsonwebtoken

npm i winston winston-elasticsearch

npm install --save-dev cross-env

npm link

npm token created at https://www.npmjs.com/settings/jayesh_sabale/tokens/ and then added that token as NPM_TOKEN in jobber-shared-testing git repos secrets

1️⃣ Public npm packages vs GitHub Packages

You created a public npm package and published it to npmjs.org, not to GitHub Packages.

GitHub Actions ran successfully, but since your workflow publishes to https://registry.npmjs.org (the public npm registry), GitHub will not show the package in the repo’s Packages tab.

Think of it like: GitHub Actions is just the CI/CD tool. Your package lives on npm, not GitHub.

https://www.npmjs.com/settings/jayesh_sabale/packages
