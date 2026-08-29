import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, Headphones, Home, Menu, Radio, Sparkles, X } from "lucide-react";

const links = [
  { label: "الرئيسية", to: "/", icon: Home },
  { label: "المصحف", to: "/", icon: BookOpen },
  { label: "التلاوات", to: "/", icon: Headphones },
  { label: "الراديو", to: "/", icon: Radio },
  { label: "اسلاميات", to: "/", icon: Sparkles },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 md:flex md:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen className="size-4" />
          </span>
          <span className="truncate text-lg font-extrabold tracking-tight text-ink">
            أهل القرآن
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
          className="grid size-9 place-items-center rounded-lg border border-border text-ink md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 px-5 py-2 md:hidden">
          {links.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-semibold text-muted-foreground hover:text-ink"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
