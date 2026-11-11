import { BookOpen, ChevronRight, Headphones, Play, Search, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useGetGallery } from '../api/gallery/gallery.queries';
import { type IslamicVideo } from "../types/gallery.types";

export const Gallery = () => {
  const {data: gallery, isLoading} = useGetGallery();
  const islamicVideos: IslamicVideo[] =
  !isLoading && gallery
    ? Object.values(gallery).flat()
    : [];

  const [query, setQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<IslamicVideo | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(10);

  useEffect(() => {
    if (islamicVideos.length > 0 && !selectedVideo) {
      const idx = Math.floor(Math.random() * islamicVideos.length);
      setSelectedVideo(islamicVideos[idx]);
    }
  }, [islamicVideos]);

  const videos = useMemo(() => {
    if(!query || query === "") return islamicVideos;
    const normalizedQuery = query.trim().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
    return islamicVideos?.filter((video) => {
      const searchable = `${video.title}`
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي");
      return (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [query, islamicVideos]);

  const selectVideo = (video: IslamicVideo) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <main>
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
            <span className="inline-flex items-center gap-2 border-b border-gold/60 pb-2 text-sm font-bold text-gold-foreground">
              <Sparkles className="size-4 text-gold" aria-hidden="true" />
              مرئيات إسلامية مختارة
            </span>
            <h1 className="mt-4 font-quran text-4xl font-bold text-ink md:text-5xl">مكتبة إسلامية</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              تلاوات، أدعية، ومعرفة إسلامية في مكان واحد.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:pt-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gold">تشغيل الآن</p>
                  <h2 className="mt-1 truncate font-quran text-2xl font-bold text-ink leading-loose">
                    {selectedVideo?.title}
                  </h2>
                </div>
                <span className="hidden shrink-0 items-center gap-2 text-xs font-semibold text-muted-foreground sm:inline-flex">
                  <Headphones className="size-4" aria-hidden="true" />
                  {selectedVideo?.reciter_name}
                </span>
              </div>
              <div className="mt-4 flex justify-center overflow-hidden rounded-md bg-none">
                <video
                  key={selectedVideo?.id}
                  src={selectedVideo?.video_url}
                  title={selectedVideo?.title}
                  controls
                  className="max-h-150 rounded-sm"
                />
              </div>
            </div>

            <aside className="border-t border-border pt-5 lg:border-r lg:border-t-0 lg:pr-6 lg:pt-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-gold">استكشف</p>
                  <h2 className="mt-1 font-quran text-2xl font-bold text-ink">الفيديوهات</h2>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">{videos.length}</span>
              </div>

              <div className="relative mt-4">
                <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ابحث في المكتبة"
                  aria-label="ابحث في مكتبة الفيديوهات"
                  className="h-10 rounded-md bg-card pr-10 pl-9"
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuery("")}
                    aria-label="مسح البحث"
                    className="absolute left-1 top-1/2 size-8 -translate-y-1/2"
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>

              <ul className="mt-5 divide-y divide-border">
                {videos.slice(0,visibleCount).map((video) => {
                  const active = video.id === selectedVideo?.id;
                  return (
                    <li key={video.id}>
                      <button
                        type="button"
                        onClick={() => selectVideo(video)}
                        aria-current={active ? "true" : undefined}
                        className={`grid w-full grid-cols-[7rem_minmax(0,1fr)_auto] items-center gap-3 py-3 text-right transition-colors hover:bg-accent/60 ${active ? "text-primary" : "text-ink"}`}
                      >
                        <span className="relative aspect-video overflow-hidden rounded-sm bg-muted">
                          <img
                            src={video.image_url}
                            alt=""
                            loading="lazy"
                            className="size-full object-cover"
                          />
                          <span className="absolute inset-0 grid place-items-center bg-foreground/25 text-background opacity-0 transition-opacity hover:opacity-100">
                            <Play className="size-5 fill-current" aria-hidden="true" />
                          </span>
                        </span>
                        <span className="min-w-0">
                          <span className="block line-clamp-2 text-sm font-bold leading-6">{video.title}</span>
                          <span className="mt-1 block truncate text-xs text-muted-foreground">{video.reciter_name}</span>
                        </span>
                        {active ? (
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Play className="size-3.5" />
                          </span>
                        ) : (
                          <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {visibleCount < videos.length && (
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="rounded-md border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    اظهر المزيد
                  </button>
                </div>
              )}

              {videos.length === 0 && (
                <div className="py-12 text-center">
                  <BookOpen className="mx-auto size-7 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-ink">لا توجد فيديوهات مطابقة</p>
                  <p className="mt-1 text-xs text-muted-foreground">جرّب كلمة بحث أخرى.</p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}