import {
    ChevronLeft,
    ChevronRight,
    Pause,
    Play,
    Radio,
    Search,
    Waves,
    X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { changeNumbersToArabic } from './../utils/changeNumbersToArabic';
import { useRadios } from "./../api/radio/radio.queries";
import { RadioChannel } from './../types/radio.types';
import { useAudio } from './../components/audioPlayer/audioContext';

const RADIO_PAGE_SIZE = 15;

function getRadioPageCount(total: number, pageSize = RADIO_PAGE_SIZE) {
    return Math.ceil(total / pageSize);
}

function paginateRadios<T>(items: T[], page: number, pageSize = RADIO_PAGE_SIZE) {
    const start = (page - 1) * pageSize;
    return items?.slice(start, start + pageSize);
}

export const RadioPage = ()=>{
    const { data : stations } = useRadios();
    const { setAudioDetails } = useAudio();

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [current, setCurrent] = useState<RadioChannel | null>(null);
    const [playing, setPlaying] = useState(false);

    const filtered = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي");
    return stations?.filter((station: RadioChannel) => {
      const normalizedName = station.name
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي");
      return (
        !normalizedQuery || normalizedName.includes(normalizedQuery)
      );
    });
  }, [query, stations]);

  const pageCount = getRadioPageCount(filtered?.length || 0, RADIO_PAGE_SIZE);
  const visibleStations = paginateRadios(filtered || [], page, RADIO_PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) setPage(pageCount);
  }, [page, pageCount]);


  const playStation = (station: RadioChannel) => {
    station.name = ` إذاعة ${station.name}`;
    setAudioDetails(station);
    setPlaying(true);
    setCurrent(station);
  };

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 border-b border-gold/60 pb-2 text-sm font-bold text-gold-foreground">
                <Radio className="size-4 text-gold" aria-hidden="true" />
                بث قرآني مباشر
              </span>
              <h1 className="mt-4 font-quran text-4xl font-bold text-ink md:text-5xl">
                إذاعات القرآن الكريم
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                تلاوات متواصلة، إذاعات للتفسير، ومحطات لمختلف ترجمات معاني
                القرآن.
              </p>
            </div>
            <div className="flex items-center gap-4 border-r-2 border-gold px-4 py-2">
              <Waves className="size-7 text-primary" aria-hidden="true" />
              <div>
                <p className="font-bold text-ink">
                  {changeNumbersToArabic(stations?.length || 0)} إذاعة
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  من مكتبة البث القرآني
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-40 pt-6 md:pb-44 md:pt-8">
        <div className="sticky top-16.25 z-40 border-y border-border bg-background/95 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <Search
                  className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ابحث عن إذاعة أو قارئ"
                  aria-label="ابحث عن إذاعة أو قارئ"
                  className="h-11 rounded-md bg-card pr-12 pl-10"
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuery("")}
                    aria-label="مسح البحث"
                    className="absolute left-1 top-1/2 size-9 -translate-y-1/2"
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
              <p
                className="text-sm font-semibold text-muted-foreground"
                aria-live="polite"
              >
                {changeNumbersToArabic(filtered?.length || 0)} إذاعة
              </p>
            </div>
          </div>
        </div>

        {visibleStations?.length === 0 ? (
          <div className="py-24 text-center">
            <Radio
              className="mx-auto size-9 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-4 font-semibold text-ink">لا توجد إذاعات مطابقة</p>
            <p className="mt-1 text-sm text-muted-foreground">
              جرّب البحث باسم قارئ آخر.
            </p>
          </div>
        ) : (
          <>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visibleStations?.map((station, index) => {
                const active = current?.id === station?.id;
                return (
                    <li key={station.id}>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => playStation(station)}
                        aria-pressed={active && playing}
                        aria-label={`${active && playing ? "إيقاف" : "تشغيل"} إذاعة ${station.name}`}
                        className={`cursor-pointer group h-auto min-h-24 w-full justify-start gap-3 whitespace-normal border p-3 text-right shadow-none transition hover:-translate-y-0.5 hover:shadow-(--shadow-soft) ${active ? "border-primary bg-accent" : "bg-card"}`}
                    >
                        <span
                            className={`grid size-12 shrink-0 place-items-center rounded-md ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"}`}
                        >
                        {active && playing ? (
                            <Pause className="size-5" aria-hidden="true" />
                        ) : (
                            <Play className="size-5" aria-hidden="true" />
                        )}
                        </span>
                        <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-ink">
                            {station.name}
                        </span>
                        </span>
                        <span
                            className="shrink-0 font-mono text-[0.65rem] tabular-nums text-muted-foreground"
                            dir="ltr"
                        >
                        {String(
                          (page - 1) * RADIO_PAGE_SIZE + index + 1,
                        ).padStart(2, "0")}
                        </span>
                    </Button>
                    </li>
                );
                })}
            </ul>

            {pageCount > 1 && (
              <nav
                className="mt-8 flex flex-col items-center gap-3"
                aria-label="صفحات الإذاعات"
              >
                <div className="flex items-center gap-1.5" dir="rtl">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                    disabled={page === 1}
                    aria-label="الصفحة السابقة"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                  {Array.from(
                    { length: pageCount },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      type="button"
                      variant={pageNumber === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setPage(pageNumber)}
                      aria-label={`الصفحة ${changeNumbersToArabic(pageNumber)}`}
                      aria-current={pageNumber === page ? "page" : undefined}
                    >
                      {changeNumbersToArabic(pageNumber)}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setPage((value) => Math.min(pageCount, value + 1))
                    }
                    disabled={page === pageCount}
                    aria-label="الصفحة التالية"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  الصفحة {changeNumbersToArabic(page)} من {changeNumbersToArabic(pageCount)}
                </p>
              </nav>
            )}
          </>
        )}
      </section>
    </>
  );
}
