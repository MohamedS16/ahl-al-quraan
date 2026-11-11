import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { tafsserTypes } from './../types/tafseer.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {toArabicNumber} from "../utils/changeNumbersToArabic";
import { useGetAyahTafseer } from "../api/ayaTafseer/ayaTafseer.queries";
import { useState } from "react";

export const TafsirDialog = ({
  surahNumber,
  surahName,
  ayahNumber,
  ayahText,
  open,
  onOpenChange,
}: {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText : string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {

  const tafsirEditions : { id: tafsserTypes; label: string }[] = [
    { id: "muyassar", label: "التفسير الميسر" },
    { id: "ibn_kathir_ar", label: "تفسير ابن كثير" },
  ];
  
  const [editionId, setEditionId] = useState<tafsserTypes>(tafsirEditions[0]!.id || "muyassar");
  const edition = tafsirEditions.find((item) => item.id === editionId) ?? tafsirEditions[0]!;

    const { data: tafsir, isLoading } = useGetAyahTafseer(
      editionId,
      surahNumber,
      ayahNumber
    );

  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-h-[85vh] overflow-y-auto rounded-md p-0"
      >
        <DialogHeader className="border-b border-border bg-secondary/45 px-6 py-5 text-right sm:text-right">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-extrabold text-gold mt-5">{edition.label}</p>
              <Select
                value={edition.label}
                onValueChange={(value) => {
                  if (value !== null) {
                    setEditionId(value as tafsserTypes);
                  }
                }}
              >              
              <SelectTrigger className="h-8 w-44 text-xs font-bold" aria-label="اختيار التفسير">
                <SelectValue placeholder="اختر التفسير" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {tafsirEditions.map((item) => (
                  <SelectItem key={item.id} value={item.id} className="text-xs font-semibold">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogTitle className="font-quran text-2xl text-ink">
            سورة {surahName} — الآية {toArabicNumber(ayahNumber)}
          </DialogTitle>
          <DialogDescription>
            شرح موجز لمعنى الآية باللغة العربية.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6">
          {ayahText && (
            <blockquote className="border-r-2 border-gold bg-gold/10 px-4 py-3 font-quran text-xl leading-loose text-ink">
              {ayahText}
            </blockquote>
          )}

          {isLoading ? (
            <div className="space-y-3 py-3" aria-label="جار تحميل التفسير">
              <div className="h-4 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-11/12 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
            </div>
          ) : tafsir.isError ? (
            <div className="py-4 text-center">
              <p className="font-bold text-ink">تعذّر تحميل التفسير</p>
              <Button className="mt-4" onClick={() => tafsir.refetch()}>
                إعادة المحاولة
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-sm font-extrabold text-primary">التفسير</h2>
              <p className="mt-3 text-base leading-8 text-foreground">
                {tafsir?.tafsir.text}
              </p>
              <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                {/* المصدر: {tafsir.data.edition.name} */}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
