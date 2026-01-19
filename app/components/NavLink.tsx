import { Link } from "react-router";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  openInNewTab?: boolean;
}

export function NavLink({
  href,
  children,
  isActive = false,
  openInNewTab = false,
}: NavLinkProps) {
  const activeClass = isActive ? "underline text-blue-300" : "hover:underline";

  if (openInNewTab) {
    return (
      <a
        href={href}
        className={`${activeClass} inline-flex items-center gap-2`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={activeClass}>
      {children}
    </Link>
  );
}
