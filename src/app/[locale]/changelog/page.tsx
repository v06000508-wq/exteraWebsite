import {Metadata} from "next";
import {ClipboardText, Document} from "solar-icon-set";
import logo from "@/app/[locale]/_assets/logos/logo-new.jpg";
import Image from "next/image";

export default function Changelog() {
    return (
        <div className="w-full text-center max-w-xl px-2 mx-auto my-16 text-neutral-700 dark:text-neutral-300">
            <aside className="flex items-center justify-center gap-4 text-black dark:text-white mb-8">
                <Image src={logo} alt="VSMGram logo" width={64} height={64} className="rounded-full object-cover" />
                <ClipboardText iconStyle="Bold" color="inherit" size={64} />
                <Document iconStyle="Bold" color="inherit" size={64} />
            </aside>
            <div className="prose prose-neutral dark:prose-invert prose-headings:font-bold prose-headings:font-display prose-headings:text-black dark:prose-headings:text-white prose-a:text-primary-400 prose-a:underline marker:text-inherit prose-li:text-left">
                <h1>Ченджлог</h1>
                
                <div className="bg-amber-50 dark:bg-neutral-900/50 rounded-2xl p-6 my-8 text-left border border-transparent dark:border-amber-900/30 transition-colors">
                    <h2 className="text-amber-700 dark:text-amber-500 mb-4">Версия 0.2.0 — Закрытый тест</h2>
                    <p className="text-neutral-700 dark:text-neutral-400">
                        В настоящее время идёт закрытое тестирование версии 0.2.0.
                    </p>
                </div>

                <div className="bg-amber-100 dark:bg-neutral-900/80 rounded-2xl p-6 my-8 text-left border border-transparent dark:border-amber-800/30 transition-colors">
                    <h2 className="text-amber-800 dark:text-amber-400 mb-4">Версия 0.3.0 — Скоро</h2>
                    <p className="text-neutral-700 dark:text-neutral-400">
                        Публичный релиз версии 0.3.0 ожидается через <strong>1-2 месяца</strong>.<br/>
                        Будет доступен для всех пользователей.
                    </p>
                </div>

                <div className="bg-red-50 dark:bg-neutral-900/50 rounded-2xl p-6 my-8 text-left border-2 border-red-200 dark:border-red-900/30 transition-colors">
                    <h2 className="text-red-700 dark:text-red-500 mb-4">Известные проблемы (DevTools)</h2>
                    
                    <h3 className="text-red-600 dark:text-red-500/80 text-lg font-bold mt-4 mb-2">Функции без логики (10 шт)</h3>
                    <ul className="text-neutral-700 dark:text-neutral-400 text-sm space-y-1">
                        <li>• Цветовое кодирование чатов — сохраняется настройка, но не применяется</li>
                        <li>• Glassmorphism — меняет только прозрачность, без blur эффекта</li>
                        <li>• Иконка приложения — 21 вариант в UI, но не меняется в AndroidManifest</li>
                        <li>• Fake Online — не отправляет статус онлайн в фоне</li>
                        <li>• Live Typing — флаг сохраняется, но не читается в коде</li>
                        <li>• Скорость соединения — не ускоряет загрузку/отправку файлов</li>
                        <li>• Относительное время онлайна — не форматирует время</li>
                        <li>• Скрыть номер телефона — не скрывает номер в профиле</li>
                        <li>• Провайдер перевода — всегда использует Telegram вместо выбранного</li>
                    </ul>

                    <h3 className="text-red-600 dark:text-red-500/80 text-lg font-bold mt-4 mb-2">Частичная работа (5 шт)</h3>
                    <ul className="text-neutral-700 dark:text-neutral-400 text-sm space-y-1">
                        <li>• Chat Analytics — статистика пустая, не анализирует сообщения</li>
                        <li>• Свайп-действия — режим выделения вместо удаления, реакции не работают</li>
                        <li>• Fake Online расписание — время не обновляется в UI, нет fallback для API 23-</li>
                        <li>• 3D Параллакс — сенсоры работают, но непонятно применяется ли эффект</li>
                        <li>• Плотность сообщений — Reflection может сломаться, не влияет на отрисовку</li>
                    </ul>

                    <h3 className="text-red-600 dark:text-red-500/80 text-lg font-bold mt-4 mb-2">UI/UX проблемы (6 шт)</h3>
                    <ul className="text-neutral-700 dark:text-neutral-400 text-sm space-y-1">
                        <li>• Селекторы не обновляют значение без пересоздания фрагмента</li>
                        <li>• Glassmorphism slider — index out of range (0-9 вместо 0-3)</li>
                        <li>• Параллакс slider — может дать index=4 при 3 опциях (краш)</li>
                    </ul>

                    <h3 className="text-red-600 dark:text-red-500/80 text-lg font-bold mt-4 mb-2">Критические краши (3 шт)</h3>
                    <ul className="text-neutral-700 dark:text-neutral-400 text-sm space-y-1">
                        <li>• Параллакс slider — ArrayIndexOutOfBoundsException при strength > 1.0</li>
                        <li>• Blur slider — index=6 при blur=2, SlideChooseView принимает 0-3</li>
                        <li>• ChatAnalyticsActivity — null dialogId, пустые данные</li>
                    </ul>

                    <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-4 pt-4 border-t border-red-200 dark:border-red-900/20">Всего: 24 бага, из них 3 потенциальных краша</p>
                </div>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Changelog",
}
