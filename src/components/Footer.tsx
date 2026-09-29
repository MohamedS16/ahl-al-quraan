import { Mail } from "lucide-react";

const sources = [
  "التلاوات والمصحف عن طريق: MP3 Quran",
  "مواقيت الصلاة عن طريق: الأذان",
  "الصور عن طريق: Freepik",
  "تفسير الآيات عن طريق: Quran Tafseer",
];

const socials = [
  { icon: Mail, label: "GitHub", href: "#" },
  { icon: Mail, label: "البريد", href: "#" },
  { icon: Mail, label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-extrabold">عن الموقع</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
            {sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="md:text-left">
          <h2 className="text-lg font-extrabold">تواصل معي</h2>
          <div className="mt-4 flex gap-3 md:justify-start">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15 transition-colors hover:bg-primary-foreground/25"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 py-5 text-center text-xs text-primary-foreground/85">
        تم تطوير الموقع عن طريق محمد سامح
      </div>
    </footer>
  );
}
