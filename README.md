# Apartment - with Server Side Rendering(SSR) and Code Splitting!!!
## Режим разробника
### 1. Встановити залежності 
```
npm install
```
### 2. Запустити 
```
npm run start:dev:local
```

### 3. Форматування коду під правила лінтерів
```
npm run format
```

## Запуск DEVELOPER

### 1. Встановити залежності

```
npm install
```

### 2. Старт

```
npm run start:dev:server
```

### Чи:

### 1. Видалити папку build:

```
npm run clear
```
### 2. Виставити обов'язкові та доступні параметри:
```
NODE_ENV, BUILD_ENV, HOST, PORT_HTTP, PORT_HTTPS, SSL_KEY, SSL_CERT
```

### 3. Старт:
```
npm run start
```

### Обов'язкові параметри:
```
NODE_ENV, BUILD_ENV
```

### Доступні параметри :
```
HOST, PORT_HTTP, PORT_HTTPS, SSL_KEY, SSL_CERT
```

### Параметри за замовчуванням:
```
HOST = local ip, PORT_HTTP = 3021, PORT_HTTPS = PORT_HTTP + 1000, SSL_KEY = null, SSL_CERT = null
```

### Для роботи https вказати шлях до ключа та сертифіката:
```
SSL_KEY, SSL_CERT
```

### Сервер має слухати PORT_HTTP, переадресація на PORT_HTTPS відбувається автоматично.

## Запуск MASTER

### 1. Встановити залежності

```
npm install
```

### 2. Старт

```
npm run start:prod:server
```

### Чи:

### 1. Видалити папку build:

```
npm run clear
```
### 2. Виставити обов'язкові та доступні параметри:
```
NODE_ENV, BUILD_ENV, HOST, PORT_HTTP, PORT_HTTPS, SSL_KEY, SSL_CERT
```

### 3. Старт:
```
npm run start
```

### Обов'язкові параметри:
```
NODE_ENV, BUILD_ENV
```

### Доступні параметри :
```
HOST, PORT_HTTP, PORT_HTTPS, SSL_KEY, SSL_CERT
```

### Параметри за замовчуванням:
```
HOST = local ip, PORT_HTTP = 3021, PORT_HTTPS = PORT_HTTP + 1000, SSL_KEY = null, SSL_CERT = null
```

### Для роботи https вказати шлях до ключа та сертифіката:
```
SSL_KEY, SSL_CERT
```

### Сервер має слухати PORT_HTTP, переадресація на PORT_HTTPS відбувається автоматично.
