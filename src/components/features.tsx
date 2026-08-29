import { BookOpen, Headphones, Radio, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "المصحف",
    text: "تصفّح المصحف بصفحاته المرتّبة، مع التفسير عند كل آية.",
  },
  {
    icon: Headphones,
    title: "التلاوات",
    text: "تلاوات كاملة بصوت الحصري، المنشاوي، عبد الباسط وغيرهم.",
  },
  { icon: Radio, title: "الراديو", text: "إذاعات قرآنية تعمل مباشرة دون انتظار تحميل." },
  { icon: Sparkles, title: "اسلاميات", text: "أذكار الصباح والمساء، أدعية، وأحاديث مختارة." },
];

export function Features() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
          ما يقدّمه الموقع
        </h2>
        <div className="rule-gold mx-auto mt-5 w-40" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
