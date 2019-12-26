# Worker Example

## How to run

```sh
npm i
npm run start
```

## What's done so far

```sh
ng new wt --style scss --prefix n5 --routing=false
cd wt
npm i ts-md5
ng g web-worker hashr
# Modify hash.worker.ts, app.component.ts and app.component.html
npm run start

# For the demo
# ng build --prod --base-href 'https://anandchakru.github.io/angular-worker-eg/'
# add GITHUB_PAT in https://github.com/anandchakru/rathnas/settings/secrets
# 

```

## Demo

Demo is [here](https://anandchakru.github.io/angular-worker-eg/)