export function SlackLogo({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-6 w-6"} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        fill="#E01E5A"
        d="M5.042 15.165a2.144 2.144 0 0 1-2.142 2.141 2.144 2.144 0 0 1-2.143-2.141 2.144 2.144 0 0 1 2.143-2.143h2.142v2.143z"
      />
      <path
        fill="#36C5F0"
        d="M6.313 15.165a2.144 2.144 0 0 1 2.143-2.143 2.144 2.144 0 0 1 2.142 2.143v5.357a2.144 2.144 0 0 1-2.142 2.142 2.144 2.144 0 0 1-2.143-2.142v-5.357z"
      />
      <path
        fill="#2EB67D"
        d="M8.884 5.042a2.144 2.144 0 0 1 2.143-2.142 2.144 2.144 0 0 1 2.143 2.142 2.144 2.144 0 0 1-2.143 2.143H8.884V5.042z"
      />
      <path
        fill="#ECB22E"
        d="M8.884 6.313a2.144 2.144 0 0 1 2.143 2.143 2.144 2.144 0 0 1 2.142-2.143h5.357a2.144 2.144 0 0 1 2.142 2.143 2.144 2.144 0 0 1-2.142 2.142H8.884V6.313z"
      />
      <path
        fill="#E01E5A"
        d="M18.956 8.884a2.144 2.144 0 0 1 2.142-2.143 2.144 2.144 0 0 1 2.143 2.143 2.144 2.144 0 0 1-2.143 2.143h-2.142V8.884z"
      />
      <path
        fill="#36C5F0"
        d="M17.685 8.884a2.144 2.144 0 0 1-2.143 2.143 2.144 2.144 0 0 1-2.142-2.143V3.526a2.144 2.144 0 0 1 2.142-2.142 2.144 2.144 0 0 1 2.143 2.142v5.358z"
      />
      <path
        fill="#2EB67D"
        d="M15.116 18.956a2.144 2.144 0 0 1-2.143 2.142 2.144 2.144 0 0 1-2.143-2.142 2.144 2.144 0 0 1 2.143-2.143h2.143v2.143z"
      />
      <path
        fill="#ECB22E"
        d="M15.116 17.685a2.144 2.144 0 0 1-2.143-2.142 2.144 2.144 0 0 1 2.143-2.143H9.705a2.144 2.144 0 0 1-2.142 2.143 2.144 2.144 0 0 1 2.142 2.142h5.268v2.143z"
      />
    </svg>
  );
}

export function JiraLogo({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-6 w-6"} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path fill="#2684FF" d="M11.53 2 2 11.53V22h8.72L21 11.72 11.53 2Zm.47 7.47L16 13.47 13.47 16 8.47 11 11 8.47Z" />
      <path fill="#0052CC" d="m13.47 16 2.53-2.53L21 18.47 18.47 21 13.47 16Z" />
    </svg>
  );
}

export function GitHubLogo({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-6 w-6"} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        fill="#24292F"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.341-3.369-1.341-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function IntegrationLogo({
  source,
  className,
  title,
}: {
  source: "Slack" | "Jira" | "GitHub" | "Peer";
  className?: string;
  title?: string;
}) {
  switch (source) {
    case "Slack":
      return <SlackLogo className={className} title={title} />;
    case "Jira":
      return <JiraLogo className={className} title={title} />;
    case "GitHub":
      return <GitHubLogo className={className} title={title} />;
    default:
      return null;
  }
}