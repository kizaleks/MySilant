Проэкт Мой Силант 
Для удобства работы в проекте реализована модель контрагенты и расширена базовая модель пользователя
Каждый пользователь относится к определенной категории пользователей и привязан к контрагенту такой подход позволяет легко определять какие данные должны быть доступны пользователю.
Справочник сервисных компаний как и клиенты строится на основе справочника контрагентов.
В проэте реализовано не зарегестрированный пользователь может найти базовую информацию по номеру машины.
Для зарегистрированных пользователей есть два режима просмотра с учетом полномочий пользователя:
МЕНЕДЖЕР
1
 Может просматривать и редактировать все машиы
 Может просматривать и редактировать  все ТО
 Может просматривать и редактировать  все Рекламации
2
Может войти в машину и там просматривать и редактировать данные машины видеть и редактировать ТО и рекламации по данной машине.

ПРЕДСТАВИТЕЛЬ СЕРВИСНОЙ ОРГАНИЗАЦИИ
 Может просматривать машины которые обслуживает организация
 Может просматривать и редактировать   ТО своей организации
 Может просматривать и редактировать   Рекламации своей организации
2
Может войти в машину и там просматривать и редактировать данные машины видеть и редактировать ТО и рекламации по данной машине сошластно уровня доступа.

 КЛИЕНТ 
 Может просматривать свои машины 
 Может просматривать и редактировать   ТО своих машин
 Может просматривать    Рекламации по своим машинам
2
Может войти в машину и там просматривать и редактировать данные машины видеть и редактировать ТО и рекламации по данной машине сошластно уровня доступа.

ВСЕМ доступен просмотр справочников а менеджеру их редактирование.


Запуск проекта
backend
pip install -r requirements.txt
cd mysilant
python manage.py runserver
Frontend
1.Выполнить команду npm install 
2.Выполнить npm start

Для авторизации можно использовать 
{
  МЕНЕДЖЕР
  "login": "manager",
  "password": "1qazXSW@"

  ПРЕДСТАВИТЕЛЬ СЕРВИСНОЙ ОРГАНИЗАЦИИ
  "ООО Промышленная техника"
   "login": "service",
  "password": "1qazXSW@"
  КЛИЕНТ 
  "ИП Трудников С.В."
   "login": "client1",
  "password": "1qazXSW@"

  Для входа в админ панель Джанго
   "login": "admin",
  "password": "admin"
}
json Опиние API сформированно с помощью пакета Свагер.

