import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMoshafSora } from "./../api/MoshafSurah/moshafSora.queries";
import {
  MoshafSora,
  MoshafSoraDetails,
  MoshafSorafVerses,
} from "./../types/moshafSora.types";
import { surahs } from "./../data/surahs";
import { toArabicNumber } from "../utils/changeNumbersToArabic";
import { TafsirDialog } from "./TafseerDialog";

const basmala = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

export function SurahPage() {
  const { id: surahNumber } = useParams();
  const { data: surah, isLoading, isFetching, isError, refetch } = useMoshafSora(surahNumber || "1");
  const [fontSize, setFontSize] = useState(32);
  const [selectedAyah, setSelectedAyah] = useState<QuranAyah | null>(null);

  useEffect(() => {
    console.log(surah);
  }, [surah]);

  if (!isLoading && !surah) {
    return <MissingSurah />;
  }

  if (isError) {
    return <ReadingError refetch={refetch} />;
  }

  if (isLoading) {
    return <ReadingLoading />;
  }

  const previous = Number(surahNumber) - 1;
  const next = Number(surahNumber) + 1;

  return (
    <div dir="rtl" className="min-h-screen bg-page-paper">
      <main>
        <header className="border-b border-border bg-secondary/45">
          <div className="mx-auto max-w-5xl px-5 py-7 md:py-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/moshaf"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-ink"
              >
                <ArrowRight className="size-4" />
                فهرس السور
              </Link>
              <div
                className="flex items-center gap-1 rounded-md border border-border bg-background p-1 shadow-(--shadow-soft)"
                aria-label="حجم خط الآيات"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="تصغير الخط"
                  disabled={fontSize <= 24}
                  onClick={() =>
                    setFontSize((value) => Math.max(24, value - 4))
                  }
                >
                  <Minus />
                </Button>
                <span
                  className="w-12 text-center text-xs font-bold text-muted-foreground"
                  aria-live="polite"
                >
                  {toArabicNumber(fontSize)}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="تكبير الخط"
                  disabled={fontSize >= 48}
                  onClick={() =>
                    setFontSize((value) => Math.min(48, value + 4))
                  }
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-md border border-primary/15 bg-background text-primary shadow-(--shadow-soft)">
                <BookOpenText className="size-6" />
              </span>
              <p className="mt-4 text-xs font-extrabold text-gold">
                السورة رقم {toArabicNumber(Number(surahNumber))}
              </p>
              <h1 className="mt-1 mb-6 font-quran text-4xl font-bold text-ink md:text-5xl">
                سورة {surah?.surah.name_arabic}
              </h1>
              <div className="mt-3 flex items-center justify-center gap-3 text-xs font-semibold text-muted-foreground">
                <span>
                  {surah?.surah.revelation_place == "makkah" ? "مكية" : "مدنية"}
                </span>
                <span className="size-1 rounded-full bg-gold" />
                <span>{toArabicNumber(surah?.surah.verses_count)} آيات</span>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 py-7 md:px-5 md:py-10">
          <article className="border-y border-border bg-background px-5 py-9 shadow-(--shadow-soft) sm:rounded-md sm:border md:px-12 md:py-14">
            {surah?.surah.bismillah_pre && (
              <p className="mb-8 text-center font-quran text-2xl text-ink md:text-3xl">
                {basmala}
              </p>
            )}
            <div
              className="quran text-ink text-justify"
              style={{ fontSize: `${fontSize}px` }}
            >
              {surah?.verses.map((ayah: MoshafSorafVerses) => (
                <span
                  key={ayah.ayah}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedAyah(ayah?.ayah)}
                  aria-label={`عرض تفسير الآية ${ayah.ayah}`}
                  className="cursor-pointer rounded-md px-1.5 py-1 text-inherit transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {ayah.arabic}{" "}
                  <span
                    className="mx-1 inline-grid size-[2.9em]  place-items-center rounded-full border border-gold/45 bg-gold/10 font-body text-[0.38em] font-extrabold text-gold-foreground"
                    aria-label={`الآية ${ayah.ayah}`}
                  >
                    {toArabicNumber(ayah.ayah)}
                  </span>
                </span>
              ))}
            </div>
          </article>

          <nav
            className="grid grid-cols-2 gap-3 py-8"
            aria-label="التنقل بين السور"
          >
            {previous ? (
              <Link
                to={`/moshaf/${previous}`}
                className="inline-flex h-auto min-h-16 w-full items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground sm:px-5"
              >
                <ChevronRight />

                <span className="min-w-0 text-right">
                  <span className="block text-[10px] text-muted-foreground">
                    السورة السابقة
                  </span>
                  <span className="block truncate font-quran text-lg leading-loose">
                    {surahs[previous - 1]?.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next != 115 && (
              <Link
                to={`/moshaf/${next}`}
                className="inline-flex h-auto min-h-16 w-full items-center justify-end gap-2 rounded-md border border-input bg-background px-3 py-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground sm:px-5"
              >
                <span className="min-w-0 text-left">
                  <span className="block text-[10px] text-muted-foreground">
                    السورة التالية
                  </span>
                  <span className="block truncate font-quran text-lg leading-loose">
                    {surahs[next - 1]?.name}
                  </span>
                </span>

                <ChevronLeft />
              </Link>
            )}
          </nav>
        </section>
      </main>

    { selectedAyah && 
      <TafsirDialog
      surahNumber={surahNumber ? Number(surahNumber) : 1}
      surahName={surah.name_arabic}
      ayahNumber={selectedAyah}
        ayahText={surah?.verses.find((ayah) => ayah.ayah === selectedAyah)?.arabic || ""}
      open={selectedAyah !== null}
      onOpenChange={(open) => {
          if (!open) setSelectedAyah(null);
        }}
        />
    }
    </div>
  );
}


function ReadingLoading() {
  return (
    <div className="space-y-4 py-6" aria-label="جار تحميل السورة">
      {["w-full", "w-11/12", "w-full", "w-4/5"].map((width, index) => (
        <div
          key={`${width}-${index}`}
          className={`mx-auto h-5 animate-pulse rounded-md bg-muted ${width}`}
        />
      ))}
    </div>
  );
}

function MissingSurah() {
  return (
    <div
      dir="rtl"
      className="grid min-h-screen place-items-center bg-page-paper px-5"
    >
      <div className="text-center">
        <BookOpenText className="mx-auto size-10 text-primary" />
        <h1 className="mt-5 font-quran text-3xl font-bold text-ink">
          السورة غير موجودة
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          اختر سورة صحيحة من فهرس المصحف.
        </p>
        <Button asChild className="mt-6">
          <Link to="/mushaf">
            العودة إلى الفهرس <ArrowLeft />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ReadingError(refetch: () => void) {
  return (
    <div className="py-16 text-center">
      <p className="font-bold text-ink">تعذّر تحميل نص السورة</p>
      <p className="mt-2 text-sm text-muted-foreground">
        تحقق من اتصالك ثم حاول مرة أخرى.
      </p>
      <Button className="mt-5" onClick={refetch}>
        إعادة المحاولة
      </Button>
    </div>
  );
}
