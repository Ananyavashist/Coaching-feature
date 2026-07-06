import { ChevronSelectorVertical, XClose, Code01 } from "@untitledui/icons";
import { Icon } from "../Icon";
import { cn } from "../../lib/utils";
import { primaryNav, adminNav, currentUser, type NavItem } from "../../data/dashboard";

function NavLink({
  item,
  active,
  badge,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  badge?: number;
  collapsed?: boolean;
  onNavigate?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate?.(item.id)}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex w-full items-center rounded-md py-2 text-left text-sm font-semibold transition-colors",
        collapsed ? "justify-center px-2" : "gap-3 px-3",
        active
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon
        name={item.icon}
        className={cn(
          "h-5 w-5 shrink-0",
          active ? "text-gray-700" : "text-gray-400 group-hover:text-gray-500"
        )}
      />
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
      {!collapsed && badge && badge > 0 ? (
        <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#000000] px-1.5 text-xs font-semibold text-white">
          {badge}
        </span>
      ) : null}
      {collapsed && badge && badge > 0 ? (
        <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#000000] px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
        A
      </div>
    );
  }
  return (
    <img
      src="/aude-logo.png"
      alt="Aude Corp"
      className="h-12 w-auto max-w-[160px] object-contain"
    />
  );
}

type SidebarNavProps = {
  activeId: string;
  onNavigate: (id: string) => void;
  coachingCount: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export function SidebarContent({
  onClose,
  activeId,
  onNavigate,
  coachingCount,
  collapsed,
  onToggleCollapse,
}: { onClose?: () => void } & SidebarNavProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div
        className={cn(
          "flex items-center pt-5",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}
      >
        <Brand collapsed={collapsed} />
        {onClose ? (
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <XClose className="h-5 w-5" />
          </button>
        ) : onToggleCollapse ? (
          <button
            onClick={onToggleCollapse}
            className={cn(
              "hidden rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:block",
              collapsed && "mt-0"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Code01 className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {collapsed && onToggleCollapse ? (
        <button
          onClick={onToggleCollapse}
          className="mx-auto mt-3 hidden rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:block"
          aria-label="Expand sidebar"
        >
          <Code01 className="h-5 w-5" />
        </button>
      ) : null}

      <nav className="mt-6 flex-1 overflow-y-auto px-3 no-scrollbar">
        <ul className="space-y-1">
          {primaryNav.map((item) => (
            <li key={item.id} className="relative">
              <NavLink
                item={item}
                active={activeId === item.id}
                badge={item.id === "coaching" ? coachingCount : undefined}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>

        {!collapsed ? (
          <div className="mt-6">
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Administration
            </p>
            <ul className="space-y-1">
              {adminNav.map((item) => (
                <li key={item.id}>
                  <NavLink
                    item={item}
                    active={activeId === item.id}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="mt-4 space-y-1 border-t border-gray-200 pt-4">
            {adminNav.map((item) => (
              <li key={item.id} className="relative">
                <NavLink
                  item={item}
                  active={activeId === item.id}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className={cn("border-t border-gray-200 p-4", collapsed && "px-2")}>
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "gap-3"
          )}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium text-gray-900">
                  {currentUser.name}
                </p>
                <p className="truncate text-[14px] font-normal text-gray-500">
                  {currentUser.designation}
                </p>
              </div>
              <ChevronSelectorVertical className="h-4 w-4 shrink-0 text-gray-400" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  mobileOpen,
  onClose,
  activeId,
  onNavigate,
  coachingCount,
  collapsed = false,
  onToggleCollapse,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
} & SidebarNavProps) {
  const navProps = { activeId, onNavigate, coachingCount, collapsed, onToggleCollapse };
  const desktopWidth = collapsed ? "w-[72px]" : "w-64";

  return (
    <>
      <aside className={cn("hidden shrink-0 border-r border-gray-200 lg:block", desktopWidth)}>
        <div className={cn("fixed inset-y-0 left-0 border-r border-gray-200 transition-all duration-200", desktopWidth)}>
          <SidebarContent {...navProps} />
        </div>
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gray-900/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={onClose}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-gray-200 transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarContent onClose={onClose} {...navProps} collapsed={false} />
        </div>
      </div>
    </>
  );
}
