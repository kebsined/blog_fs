Области хранения данных:
-БД на json-server
-BFF
-redux-store

Сущности приложения:
-пользователь: (список пользователей), ВFF (сессия пользователя), store (отображение в бразуере)
-роль пользователя: БД (список ролей), ВFF (сессия пользователя с ролью), store (отображение на клиенте)
-статьи: БД (список статей), store (отображение в бразуере)
-комментарии: БД (список комментов), store (отображение в браузере)

Таблицы:
-пользователи - users: id/login/password/registered_at/role_id
-роли - roles: id/name
-статьи - posts: id/title/image_url/content/published_at
-комментарии - comments: id/author_id/post_id/content

Схема состояния на BFF:
-сессия текущего пользоателя: login/password/role

Схема для redux-store на клиенте:
-user: id/login/role_id
-posts: array posts: id/title/imageUrl/publishedAt/commentsCount
-post: id/title/imageUrl/content/publishedAt/comments: array comment: id/author/content/published_at
-users: array users: id/login/registered_at/role
