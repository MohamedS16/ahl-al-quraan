import { Link } from "react-router-dom";
import { Headphones, Mic2, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { singleReciter } from "./../types/reciters.types";
import { useGetReciters } from "@/api/reciters/reciters.queries";
import { useReciterContext } from "@/context/reciterContext/reciterContext";

const normalize = (s: string) => s.replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");

export const QuraaPage = () => {
  const { data: reciters } = useGetReciters();
 
  const [query, setQuery] = useState("");

    const groups = useMemo(() => {
    const q = normalize(query.trim());
    const map = new Map<string, singleReciter[]>();
    if (!reciters) return [];  
    for (const r of reciters) {
      if (q && !normalize(r.name).includes(q)) continue;
      const key = r.letter || r.name[0];
      map.set(key, [...(map.get(key) ?? []), r]);
    }
    return [...map.entries()];
  }, [query, reciters]);

  const count = reciters?.length || 0;

  const { setValue } = useReciterContext();

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center md:py-16">
          <span className="mx-auto grid size-12 place-items-center rounded-md border border-primary/15 bg-background text-primary shadow-(--shadow-soft)">
            <Headphones className="size-6" />
          </span>
          <p className="mt-5 text-xs font-bold text-gold">التلاوات</p>
          <h1 className="mt-2 font-quran text-4xl font-bold text-ink md:text-5xl">القرّاء</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            اختر قارئًا لتستمع إلى سور القرآن الكريم بصوته وبالرواية التي تفضّلها.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 md:py-10">
        <div className="sticky top-16.25 z-40 border-y border-border bg-background/95 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xl">
              <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                placeholder="ابحث عن قارئ"
                aria-label="ابحث عن قارئ"
                className="h-12 rounded-md bg-card pr-12 pl-10 text-base"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="مسح البحث"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {new Intl.NumberFormat("ar-EG").format(count)} قارئ
            </p>
          </div>
        </div>

        {groups.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">لا يوجد قارئ بهذا الاسم.</p>
        ) : (
          <div className="mt-8 space-y-10">
            {groups.map(([letter, list]) => (
              <div key={letter} className="grid gap-4 md:grid-cols-[4rem_1fr]">
                <div className="flex items-center gap-3 md:block">
                  <span className="grid size-12 place-items-center rounded-md bg-primary font-quran text-2xl text-primary-foreground md:sticky md:top-40">
                    {letter}
                  </span>
                  <div className="h-px flex-1 bg-border md:hidden" />
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((r) => (
                    <li key={r.id} onClick={()=>setValue(r)}>
                      <Link
                        to={`/quraa/${r.id}`}
                        className="group flex items-center gap-3 rounded-md border border-border bg-card p-3 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-(--shadow-soft)"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                          <Mic2 className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-bold text-ink">{r.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {r.moshaf.length > 1
                              ? `${new Intl.NumberFormat("ar-EG").format(r.moshaf.length)} روايات`
                              : r.moshaf[0]?.name}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
  </>
  );
}
