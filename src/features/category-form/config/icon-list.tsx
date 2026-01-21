import { AdminSelectOption } from "@/shared/ui/admin/types/admin-select.props";
import * as Icons from "lucide-react";

// Вспомогательная функция для генерации опции
const createOption = (name: string, ruKeywords: string): AdminSelectOption => {
    // @ts-ignore
    const Icon = Icons[name] || Icons.HelpCircle;
    
    return {
        value: name,
        // Скрытое поле для поиска: ищем и по английскому названию, и по русским тегам
        keywords: `${name} ${ruKeywords}`.toLowerCase(),
        label: (
            <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{name}</span>
            </div>
        )
    };
};

export const getBigIconList = (): AdminSelectOption[] => [
    // --- ОСНОВНЫЕ И ИНТЕРФЕЙС ---
    createOption("Home", "дом главная хата"),
    createOption("Settings", "настройки шестеренка опции конфиг"),
    createOption("Menu", "меню гамбургер список"),
    createOption("X", "закрыть крестик удаление отмена"),
    createOption("Check", "галочка готово успех подтвердить"),
    createOption("CheckCircle", "галочка круг выполнено"),
    createOption("Plus", "плюс добавить создать"),
    createOption("PlusCircle", "плюс круг добавить"),
    createOption("Minus", "минус убрать удалить"),
    createOption("Search", "поиск лупа найти"),
    createOption("MoreHorizontal", "еще точки опции"),
    createOption("MoreVertical", "еще точки вертикально"),
    createOption("Filter", "фильтр воронка сортировка"),
    createOption("Sliders", "слайдеры параметры эквалайзер"),
    createOption("Loader2", "загрузка спиннер ожидание"),
    createOption("Power", "питание выключение выход"),
    createOption("LogOut", "выход логаут покинуть"),
    createOption("LogIn", "вход логин"),
    createOption("ExternalLink", "ссылка наружу переход"),
    createOption("Link", "ссылка связь цепь"),
    createOption("Unlink", "разорвать связь"),

    // --- СТРЕЛКИ И НАВИГАЦИЯ ---
    createOption("ArrowRight", "стрелка вправо"),
    createOption("ArrowLeft", "стрелка влево назад"),
    createOption("ArrowUp", "стрелка вверх"),
    createOption("ArrowDown", "стрелка вниз"),
    createOption("ChevronRight", "шеврон галочка вправо"),
    createOption("ChevronDown", "шеврон галочка вниз выпадающий"),
    createOption("ChevronsUp", "двойная стрелка вверх"),
    createOption("ChevronsDown", "двойная стрелка вниз"),
    createOption("RefreshCw", "обновить перезагрузка"),
    createOption("RefreshCcw", "обновить назад"),
    createOption("RotateCw", "повернуть"),
    createOption("CornerDownRight", "стрелка энтер"),
    createOption("Undo2", "отменить назад"),
    createOption("Redo2", "вернуть вперед"),

    // --- ПОЛЬЗОВАТЕЛИ ---
    createOption("User", "пользователь юзер профиль"),
    createOption("Users", "пользователи группа люди"),
    createOption("UserPlus", "добавить друга заявка"),
    createOption("UserMinus", "удалить друга"),
    createOption("UserCheck", "подтвержденный пользователь"),
    createOption("UserX", "заблокировать юзера бан"),
    createOption("Baby", "ребенок новичок"),

    // --- ИГРЫ, RPG И ПРЕДМЕТЫ ---
    createOption("Gamepad2", "игры геймпад джойстик приставка"),
    createOption("Sword", "меч оружие атака война пвп pvp"),
    createOption("Swords", "битва дуэль скрещенные мечи"),
    createOption("Shield", "щит защита танк броня резист"),
    createOption("ShieldAlert", "щит внимание тревога"),
    createOption("ShieldCheck", "щит защита безопасность"),
    createOption("Axe", "топор оружие"),
    createOption("Hammer", "молоток крафт строительство"),
    createOption("Pickaxe", "кирка шахта добыча"),
    createOption("Skull", "череп смерть босс опасность"),
    createOption("Ghost", "призрак дух невидимость"),
    createOption("Crosshair", "прицел снайпер шутер точность"),
    createOption("Target", "цель мишень дартс"),
    createOption("Trophy", "кубок трофей победа топ"),
    createOption("Crown", "корона лидер админ вип vip король"),
    createOption("Medal", "медаль награда достижение"),
    createOption("Award", "награда лента"),
    createOption("Dice5", "кости кубик удача казино рандом"),
    createOption("Puzzle", "пазл аддон плагин часть"),
    createOption("Zap", "молния энергия стамина быстро"),
    createOption("Flame", "огонь пожар урон маг"),
    createOption("Snowflake", "снег лед холод заморозка"),
    createOption("Droplet", "вода мана жидкость"),
    createOption("Heart", "сердце хп жизни лайк"),
    createOption("HeartCrack", "разбитое сердце урон"),
    createOption("Star", "звезда опыт рейтинг"),
    createOption("Sparkles", "блеск магия эффекты"),
    createOption("Bomb", "бомба взрыв тнт"),
    createOption("Rocket", "ракета полет космос"),

    // --- МАГАЗИН И ФИНАНСЫ ---
    createOption("ShoppingCart", "корзина магазин покупки"),
    createOption("ShoppingBag", "сумка пакет товар шоппинг"),
    createOption("CreditCard", "карта оплата кредитка"),
    createOption("Banknote", "деньги наличка банкнота купюра"),
    createOption("Coins", "монеты валюта голда"),
    createOption("DollarSign", "доллар бакс цена"),
    createOption("Euro", "евро валюта"),
    createOption("Wallet", "кошелек баланс"),
    createOption("Tag", "тег скидка цена ярлык"),
    createOption("Percent", "процент скидка акция"),
    createOption("Gift", "подарок бонус сюрприз донат"),
    createOption("Gem", "алмаз изумруд премиум донат"),
    createOption("Store", "магазин лавка киоск"),
    createOption("Receipt", "чек квитанция транзакция"),

    // --- КОММУНИКАЦИЯ И СОЦСЕТИ ---
    createOption("MessageCircle", "сообщение чат комментарий"),
    createOption("MessageSquare", "чат диалог"),
    createOption("Mail", "почта email письмо"),
    createOption("MailOpen", "открытое письмо прочитано"),
    createOption("Bell", "колокольчик уведомления"),
    createOption("BellOff", "без звука тишина"),
    createOption("Send", "отправить самолетик"),
    createOption("Share2", "поделиться репост"),
    createOption("Phone", "телефон звонок"),
    createOption("Mic", "микрофон голос войс"),
    createOption("MicOff", "микрофон выключен мут"),
    createOption("ThumbsUp", "лайк палец вверх класс"),
    createOption("ThumbsDown", "дизлайк палец вниз фу"),
    createOption("Smile", "улыбка смайл радость"),
    createOption("Frown", "грусть смайл"),
    createOption("Meh", "нейтрально смайл"),

    // --- КОНТЕНТ, МЕДИА И ФАЙЛЫ ---
    createOption("Image", "изображение картинка фото"),
    createOption("Camera", "камера фото"),
    createOption("Video", "видео камера стрим"),
    createOption("Music", "музыка нота аудио"),
    createOption("Headphones", "наушники звук слушать"),
    createOption("Play", "старт пуск играть"),
    createOption("Pause", "пауза стоп"),
    createOption("Film", "фильм кино лента"),
    createOption("File", "файл документ"),
    createOption("FileText", "документ текст ворд"),
    createOption("FilePlus", "создать файл"),
    createOption("Folder", "папка каталог"),
    createOption("FolderOpen", "открытая папка"),
    createOption("Book", "книга гайд правила"),
    createOption("BookOpen", "открытая книга чтение"),
    createOption("Newspaper", "новости газета статья"),
    createOption("Copy", "копировать клон"),
    createOption("Trash2", "мусор корзина удалить"),
    createOption("Edit", "карандаш редактировать"),
    createOption("Save", "сохранить дискета"),
    createOption("Download", "скачать загрузка"),
    createOption("Upload", "загрузить аплоад"),
    createOption("Paperclip", "скрепка вложение"),
    createOption("Scissors", "ножницы вырезать"),

    // --- РАЗРАБОТКА И АДМИНИСТРИРОВАНИЕ ---
    createOption("Code", "код теги разработка"),
    createOption("Code2", "код скрипт"),
    createOption("Terminal", "терминал консоль командная строка"),
    createOption("Database", "база данных сервер"),
    createOption("Server", "сервер стойка хостинг"),
    createOption("Cpu", "процессор чип железо"),
    createOption("Bug", "баг жук ошибка"),
    createOption("GitBranch", "гит ветка"),
    createOption("GitCommit", "коммит"),
    createOption("Lock", "замок закрыто приват"),
    createOption("Unlock", "открыто доступ анлок"),
    createOption("Key", "ключ доступ пароль"),
    createOption("Fingerprint", "отпечаток ид доступ"),
    createOption("Eye", "глаз просмотры видеть"),
    createOption("EyeOff", "скрыть невидимый"),
    createOption("AlertTriangle", "внимание треугольник предупреждение"),
    createOption("AlertCircle", "ошибка круг"),
    createOption("Info", "инфо информация"),
    createOption("HelpCircle", "помощь вопрос"),

    // --- СТАТИСТИКА И ГРАФИКИ ---
    createOption("BarChart", "график столбики статистика"),
    createOption("BarChart2", "график аналитика"),
    createOption("PieChart", "диаграмма круговая"),
    createOption("LineChart", "график линия рост"),
    createOption("TrendingUp", "тренд вверх рост успех"),
    createOption("TrendingDown", "тренд вниз падение"),
    createOption("Activity", "активность пульс кардио"),

    // --- ВРЕМЯ И КАЛЕНДАРЬ ---
    createOption("Calendar", "календарь дата расписание"),
    createOption("Clock", "часы время"),
    createOption("Timer", "таймер секундомер"),
    createOption("Hourglass", "песочные часы ожидание"),
    createOption("Watch", "наручные часы"),
    createOption("AlarmClock", "будильник"),

    // --- МЕСТОПОЛОЖЕНИЕ И МИР ---
    createOption("Map", "карта локация"),
    createOption("MapPin", "пина точка маркер"),
    createOption("Navigation", "навигация стрелка"),
    createOption("Compass", "компас стороны света"),
    createOption("Globe", "глобус мир интернет"),
    createOption("Flag", "флаг репорт жалоба клан"),
    createOption("Anchor", "якорь порт море"),

    // --- ТЕХНИКА И ИНСТРУМЕНТЫ ---
    createOption("Smartphone", "телефон смартфон мобильный"),
    createOption("Tablet", "планшет"),
    createOption("Laptop", "ноутбук"),
    createOption("Monitor", "монитор экран пк"),
    createOption("Tv", "телевизор тв"),
    createOption("Wifi", "вайфай сеть интернет"),
    createOption("Signal", "сигнал связь"),
    createOption("Battery", "батарея заряд"),
    createOption("BatteryCharging", "зарядка батарея"),
    createOption("Printer", "принтер печать"),
    createOption("Wrench", "гаечный ключ ремонт"),
    createOption("Construction", "стройка каска работы"),
    createOption("Flashlight", "фонарик свет"),

    // --- ПРИРОДА И ПОГОДА ---
    createOption("Sun", "солнце день светло"),
    createOption("Moon", "луна ночь темно"),
    createOption("Cloud", "облако пасмурно"),
    createOption("CloudRain", "дождь осадки"),
    createOption("CloudLightning", "гроза шторм"),
    createOption("Wind", "ветер воздух"),
    createOption("TreePine", "дерево лес елка"),
    createOption("Leaf", "лист природа эко"),
    createOption("Flower", "цветок"),

    // --- ЕДА И НАПИТКИ ---
    createOption("Coffee", "кофе чашка перерыв"),
    createOption("Beer", "пиво бар напиток"),
    createOption("Pizza", "пицца еда"),
    createOption("Utensils", "вилка нож ресторан еда"),
    createOption("Wine", "вино бокал"),
    createOption("Cookie", "печенье куки"),

    // --- ТРАНСПОРТ ---
    createOption("Car", "машина авто"),
    createOption("Bus", "автобус"),
    createOption("Truck", "грузовик доставка"),
    createOption("Bike", "велосипед"),
    createOption("Plane", "самолет полет аэропорт"),
    createOption("Ship", "корабль лодка"),

    // --- БРЕНДЫ (если нужны) ---
    createOption("Facebook", "фейсбук соцсеть"),
    createOption("Twitter", "твиттер соцсеть"),
    createOption("Instagram", "инстаграм фото"),
    createOption("Youtube", "ютуб видео"),
    createOption("Twitch", "твич стрим"),
    createOption("Github", "гитхаб код"),
    createOption("Discord", "дискорд чат"),
    createOption("Bitcoin", "биткоин крипта"),
    createOption("Chrome", "хром браузер"),
];