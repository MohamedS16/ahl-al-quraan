import { ArrowLeft, Headphones } from "lucide-react";
import { Button } from "../../components/ui/button";
import heroImage from "../../assets/hero-quran.jpg";

export function Landing() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <img
            src={heroImage}
            alt="مصحف مفتوح وسبحة زرقاء"
            width={1600}
            height={1200}
            className="w-full rounded-3xl object-cover shadow-(--shadow-lift) md:aspect-4/3"
          />
        </div>

        <div className="order-1 text-center md:order-2 md:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
            <span className="size-1.5 rounded-full bg-gold" />
            تلاوة · حفظ · تدبّر
          </span>

          <h1 className="quran mt-5 text-4xl leading-[1.6] text-ink sm:text-5xl md:text-6xl">
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-8 text-muted-foreground md:mx-0">
            المصحف كاملًا، تلاواتٍ بأصوات كبار القُرّاء، إذاعات مباشرة، ومواقيت الصلاة —
            في مكانٍ واحد هادئ وخفيف.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-end">
            <Button size="lg" className="gap-2 font-bold">
              تصفّح الموقع
              <ArrowLeft className="size-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 font-bold">
              <Headphones className="size-4" />
              استمع الآن
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
