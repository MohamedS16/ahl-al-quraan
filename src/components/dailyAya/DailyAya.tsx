import changeNumbersToArabic from "../../utils/changeNumbersToArabic"
import { useAyaForYou } from "../../api/ayaForYou/ayaForYou.queries"

export const DailyAya = () => {

    const {data: ayah, isLoading, error} = useAyaForYou();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching daily aya.</p>;
    }

  return (
    <section className="border-b border-border/60 bg-secondary/50">
         <div className="mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
        <h2 className="text-lg font-extrabold tracking-[0.3em] text-primary">آيةٌ لك</h2>
        <div className="rule-gold mx-auto mt-6 w-40" />

        {
            ayah?.data?.verse.arabic ?
            <>
            <p className="quran mt-10 text-3xl text-ink sm:text-4xl">{ayah?.data?.verse.arabic}</p>
            
                <p className="mt-10 text-sm font-semibold text-muted-foreground">{"سورة " + ayah?.data?.surah?.name_arabic + " الاية رقم " + changeNumbersToArabic(`${ayah?.data?.verse.ayah}`)}</p>

            </> : <p>يتم اختيار اية لك...</p>
        }
        </div>
    </section>
  )
}
