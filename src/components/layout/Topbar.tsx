import { useRef, useState } from "react";
import { Menu01, Bell01, BellRinging01, HelpCircle, SearchLg } from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { useClickOutside } from "../../lib/useClickOutside";

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

export function Topbar({
  onOpenMenu,
  title = "My performance",
  notifications = [],
  onMarkNotificationsRead,
}: {
  onOpenMenu: () => void;
  title?: string;
  notifications?: AppNotification[];
  onMarkNotificationsRead?: () => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const hasUnread = notifications.some((n) => !n.read);

  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen);

  const toggleNotifications = () => {
    setNotifOpen((open) => {
      const next = !open;
      if (next && hasUnread) onMarkNotificationsRead?.();
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu01 className="h-6 w-6" />
        </button>
        <h1 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <SearchLg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="h-11 w-[336px] rounded-lg border border-gray-300 bg-white pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <button
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
          aria-label="Search"
        >
          <SearchLg className="h-5 w-5" />
        </button>
        <button
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <div ref={notifRef} className="relative">
          <button
            onClick={toggleNotifications}
            className={cn(
              "relative rounded-lg p-2 hover:bg-gray-100",
              hasUnread ? "text-brand-600" : "text-gray-500 hover:text-gray-700"
            )}
            aria-label="Notifications"
            aria-expanded={notifOpen}
            aria-haspopup="true"
          >
            {hasUnread ? (
              <BellRinging01 className="h-5 w-5" />
            ) : (
              <Bell01 className="h-5 w-5" />
            )}
            {hasUnread ? (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white" />
            ) : null}
          </button>

          {notifOpen ? (
            <div className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">Notifications</p>
              </div>
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-gray-500">No notifications yet</p>
              ) : (
                <ul className="max-h-72 overflow-y-auto py-1">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={cn(
                        "border-b border-gray-100 px-4 py-3 last:border-b-0",
                        !n.read && "bg-brand-50/50"
                      )}
                    >
                      <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{n.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
