// import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useGetAllMoshafSwr } from "../api/MoshafAllSwr/moshafAllSwr.queries";

// export const Route = createFileRoute("/mushaf")({
//   head: () => ({
//     meta: [
//       { title },
//       { name: "description", content: description },
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: MushafPage,
// });

const filters: {visibleName: string; value: string}[] = [
  {
    visibleName:"الكل",
    value: "all"
  }, 
  {
    visibleName: "مكية",
    value: "makkah"
  },
  {
    visibleName: "مدنية",
    value: "madinah"
  }
];

function toArabicNumber(value: number) {
  return new Intl.NumberFormat("ar-EG", { useGrouping: false }).format(value);
}

export const MoshafAllSwr = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const navigate = useNavigate();

  const { data: surahsData, isLoading } = useGetAllMoshafSwr();
 
  const visibleSurahs = useMemo(() => {
    const normalizedQuery = query.trim().replace(/^سورة\s+/, "");
    return surahsData?.filter((surah) => {
      const matchesQuery =
        !normalizedQuery ||
        surah.name_arabic.includes(normalizedQuery) ||
        String(surah.number).includes(normalizedQuery) ||
        toArabicNumber(surah.number).includes(normalizedQuery);
      return matchesQuery && (filter === "all" || surah.revelation_place === filter);
    });
  }, [surahsData,filter, query]);

  return (
    <div className="min-h-screen bg-background">
      <main>
        {
          isLoading && surahsData ? <div className="flex h-96 items-center justify-center">
            <p className="text-lg font-semibold text-muted-foreground">جاري تحميل السور...</p>
          </div>
        :

        <section className="mx-auto max-w-6xl px-5 py-8 md:py-10">
          <div className=" z-40 border-y border-border bg-background/95 py-4 backdrop-blur-md">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-xl">
                <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ابحث عن سورة..."
                  aria-label="ابحث عن سورة"
                  className="h-12 rounded-md bg-card pr-12 pl-11 shadow-(--shadow-soft) focus-visible:ring-2"
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="مسح البحث"
                    onClick={() => setQuery("")}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <X />
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1" aria-label="تصفية السور">
                {filters.map((item) => (
                  <Button
                    key={item.value}
                    type="button"
                    size="sm"
                    variant={filter === item.value ? "default" : "ghost"}
                    onClick={() => setFilter(item.value)}
                    aria-pressed={filter === item.value}
                    className="min-w-16"
                  >
                    {item.visibleName}
                  </Button>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
              {visibleSurahs?.length === 114
                ? "جميع السور — ١١٤ سورة"
                : `${toArabicNumber(visibleSurahs?.length)} سورة`}
            </p>
          </div>
          {visibleSurahs?.length > 0 ? (
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visibleSurahs.map((surah) => (
                <article
                  key={surah.number}
                  onClick={()=>navigate(`/moshaf/${surah.number}`)}
                  className="group flex min-h-24 items-center justify-between gap-4 rounded-md border border-border bg-card p-4 shadow-(--shadow-soft) transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[var(--shadow-lift)] motion-reduce:transform-none"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-md border border-primary/15 bg-accent text-sm font-extrabold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {toArabicNumber(surah.number)}
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate font-quran text-2xl font-bold text-ink">
                        {surah.name_arabic}
                      </h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {toArabicNumber(surah.verses_count)} {surah.verses_count > 10 ? "آية" : "آيات"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-md border px-2.5 py-1 text-[11px] font-bold",
                      surah.revelation_place === "makkah"
                        ? "border-gold/25 bg-gold/10 text-gold-foreground"
                        : "border-primary/15 bg-accent text-accent-foreground",
                    )}
                  >
                    {surah.revelation_place === "makkah" ? "مكية" : "مدنية"}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-quran text-2xl font-bold text-ink">لا توجد سورة بهذا الاسم</p>
              <Button variant="link" className="mt-2" onClick={() => setQuery("")}>
                عرض جميع السور
              </Button>
            </div>
          )}

          {visibleSurahs?.length > 0 && (
            <div className="flex items-center justify-center gap-3 py-12 text-xs text-muted-foreground">
              <span className="h-px w-12 bg-border" />
              نهاية الفهرس
              <span className="h-px w-12 bg-border" />
            </div>
          )}
        </section>}
      </main>
    </div>
  );
}