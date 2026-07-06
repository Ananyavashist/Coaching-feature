import { Menu01, Bell01, HelpCircle, SearchLg } from "@untitledui/icons";

export function Topbar({ onOpenMenu, title = "My performance" }: { onOpenMenu: () => void; title?: string }) {
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
            className="h-11 w-[336px] rounded-lg border border-gray-300 bg-white pl-11 pr-3.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100"
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
        <button
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Notifications"
        >
          <Bell01 className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
