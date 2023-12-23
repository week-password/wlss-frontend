# WLSS frontend

Frontend-приложение для [Wish List Sharing Service](https://github.com/week-password/wisher).

## Настройка окружения для разработки

Для запуска приложения требуется установленная Node.js, версия которой указана в `package.json` в поле `engines`.

> _Для установки и использования нескольких Node.js с различными версиями на одном устройстве рекомендуется использовать [Node Version Manager](https://github.com/nvm-sh/nvm)._

#### Установка Node.js с помощью nvm

- Установка Node.js версии 16.20.0 (_версия взята для примера, требуемую версию см. в `package.json`_):

```bash
nvm install 16.20.0
```

- Переключение Node.js на версию 16.20.0:

```bash
nvm use 16.20.0
```

#### Установка зависимостей приложения

- Установка с помощью npm-команды:

```bash
npm install
```

## Запуск приложения

#### Обычный запуск

- Запуск с помощью npm-команды:

```bash
npm run start
```

После запуска приложение будет доступно на [localhost:4201](http://localhost:4201/). Приложение будет автоматически обновляться после любого сохранения изменений в файлах из скоупа приложения.

#### Запуск с другим номером порта

- Передача номера порта через аргумент существующему скрипту с помощью npm-команды:

```bash
npm run start -- --port 4202
```

- Передача номера порта в качестве аргумента при запуске с помощью ng-команды - _команда доступна, если глобально установлен @angular/cli_:

```bash
ng serve port 4202
```

## Сборка приложения

- Сборка с помощью npm-команды:

```bash
npm run build
```

- Сборка с помощью ng-команды:

```bash
ng build
```

По окончании выполнения команды сборка появится в папке `/dist`.

## Запуск линтера

- Запуск линтера с помощью npm-команды:

```bash
npm run lint
```

- Запуск линтера с помощью ng-команды:

```bash
ng lint
```

## Деплой на тестовое окружение

> _Запускать деплой могут только пользователи с правом на запись в репозиторий._

1. Перейти на ветку/коммит, который нужно задеплоить

2. Создать и запушить новую версию тэга `deployed/qa`:

- Запуск деплоя с помощью git-команд:

```bash
git tag --annotate --force deployed/qa --message ''
```

```bash
git push origin deployed/qa --force
```

- Запуск деплоя с помощью npm-команды:

```bash
npm run deploy:qa
```

После того, как будет запушена новая версия тэга, запустится деплой, о прогрессе которого можно узнать в разделе [Actions](https://github.com/week-password/wlss-frontend/actions).

Чтобы посмотреть, от какого коммита сделан последний деплой, нужно обновиться до последней версии тэга `deployed/qa`.

- Актуализация тэга с помощью git-команды:

```bash
git fetch origin +refs/tags/deployed/qa:refs/tags/deployed/qa
```

- Актуализация тэга с помощью npm-команды:

```bash
npm run deploy:qa:fetch
```
