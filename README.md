# URL Shortener

Простой сервис сокращения URL, созданный с помощью Node.js и Express.js.

## Возможности

- Сокращает длинные URL до уникальных коротких кодов
- Перенаправляет короткие коды на исходные URL
- Проверяет URL перед сокращением

## Предварительные условия

- Node.js (v14 или более поздняя версия)
- npm (Node Package Manager)

## Начало работы

Следуйте этим инструкциям, чтобы настроить и запустить проект на локальном компьютере.

### Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

2. Установите зависимости:

```bash
npm install
```

### Запуск сервера

Запустите сервер с помощью следующей команды:

```bash
node server.js
```

Вы должны увидеть сообщение: Server is running on http://localhost:3000.

### Использование

Для тестирования endpoint можно использовать такие инструменты, как Postman или cURL.

### Endpoints

#### POST /shorten

Сокращает длинный URL.

- URL: /shorten

- Метод: POST

- Заголовки: Content-Type: application/json

- Тело:

```json
{
  "url": "https://example.com"
}
```

- Ответ:

```json
{
  "code": "abc123",
  "redirect": "http://localhost:3000/abc123"
}
```

#### GET /

Перенаправляет на исходный URL.

- URL: /:shortcode

- Метод: GET

- Ответ: Перенаправляет на исходный URL или возвращает ошибку 404, если короткий код не найден.

### Структура проекта

- `server.js`: Основной файл сервера, содержащий логику сервиса сокращения URL-адресов.
- `urls.json`: Файл JSON, используемый для хранения сокращенных URL-адресов.
