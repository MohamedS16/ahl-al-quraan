import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { surahs } from "./../data/surahs";
import { cn } from "./../lib/utils";
import { useReciterContext } from "../context/reciterContext/reciterContext";
import { toArabicNumber } from './../utils/changeNumbersToArabic';
import { Surah } from './../types/moshafSora.types';

export const QuraaSwr = () => {
  const { value: reciter } = useReciterContext();
  const [rewaya, setRewaya] = useState<number>(0);
  const [query, setQuery] = useState("");

  const surahList = useMemo(()=>(surahs.filter((s) => (reciter?.moshaf[rewaya].surah_list.split(",").map(Number) ?? []).includes(s.number))), [reciter, rewaya]);

    const visible = useMemo(() => {
    const q = query.trim().replace(/^سورة\s+/, "");
    return surahs.filter(
      (s : Surah) =>
        surahList.some((surah : Surah) => surah.number === s.number) &&
        (!q || s.name.includes(q) || String(s.number) === q || toArabicNumber(s.number) === q),
    );
  }, [surahList, query]);
  
  useEffect(()=>{
    console.log("surahList", surahList);
    console.log("reciter", reciter);
  },[surahList])

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <Link
            to="/quraa"
            className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="size-4" />
            جميع القرّاء
          </Link>
          <p className="mt-6 text-xs font-bold text-gold">القارئ</p>
          <h1 className="mt-2 font-quran text-4xl font-bold text-ink md:text-5xl leading-loose">
            {reciter?.name}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {toArabicNumber(surahList.length)} سورة متاحة · {toArabicNumber(reciter?.moshaf.length || 0)}{" "}
            {(reciter?.moshaf.length || 0) > 1 ? "روايات" : "رواية"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 pb-32 md:py-10 md:pb-32">
        <div className="sticky top-16.25 z-40 border-y border-border bg-background/95 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-sm font-bold text-ink">الرواية</span>
              <Select value={reciter?.moshaf[rewaya].name} onValueChange={(value) => setRewaya(Number(value))}>
                <SelectTrigger
                  aria-label="اختر الرواية"
                  className="h-12 w-full min-w-64 rounded-md bg-card md:w-80"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {reciter?.moshaf.map((m,idx) => (
                    <SelectItem key={idx} value={idx}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                placeholder="ابحث عن سورة"
                aria-label="ابحث عن سورة"
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
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">لا توجد سورة مطابقة.</p>
        ) : (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((s : Surah) => {
              return (
                <li key={s.number}>
                  <div className={
                      "cursor-pointer group flex w-full items-center gap-3 rounded-md border bg-card p-3 text-right transition hover:border-primary/40 hover:shadow-(--shadow-soft) border-border"
                    }
                  >
                    <span
                      className={
                        "grid size-10 shrink-0 place-items-center rounded-full transition bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      }
                    >
                        <Play className="size-4 -scale-x-100" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-quran text-xl text-ink">
                        <span className="text-sm text-muted-foreground">{toArabicNumber(s.number)} · </span>
                        {s.name}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-bold",
                        s.revelation === "مكية"
                          ? "bg-gold/15 text-gold-foreground"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      {s.revelation}
                    </span>
                    </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

    </>
  );
}
