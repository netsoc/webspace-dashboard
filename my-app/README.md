# my-app

## Project setup - npm
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Project setup - Docker

### Build image
```
docker build -t netsoc-webspace-frontend .
```

### Start container
```
docker run -p 8080:8080 -d --name nwf netsoc-webspace-frontend
```
You can then access the app at localhost:8080 in your browser.

### Stop container
```
docker stop nwf
```

### Delete container
```
docker rm nwf
