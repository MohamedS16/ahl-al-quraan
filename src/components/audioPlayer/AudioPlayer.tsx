import {
  ChevronDown,
  ChevronUp,
  Download,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {useAudio} from "./audioContext"
import axios from "axios";
import fileDownload from "js-file-download";


export const AudioPlayer = () => {
    const { audioDetails } = useAudio();

    const handleDownload = (link : string,name : string)=>{
      if(!link) return;
      if(!name) name = "ahl-al-quran.mp3";
      axios.get(link,{
            responseType : 'blob'
        }).then(res=>fileDownload(res.data,name))
    }

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playerHidden, setPlayerHidden] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
      if (!audioDetails) return;
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });

      setCurrentTime(0);
      setPlaying(true);
    
  }, [audioDetails]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play();
    else audio.pause();
  };

  const fmtTime = (sec: number) => {
    if (!Number.isFinite(sec)) return "٠:٠٠";
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
    const ss = String(s).padStart(2, "0");
    const plain = h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
    return plain.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)] ?? d);
  };

  return (
    <>
      {audioDetails?.url && (
        <>
          <audio
            ref={audioRef}
            key={`${audioDetails?.name}`}
            src={audioDetails.url}
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          />

          {playerHidden ? (
            <button
              type="button"
              onClick={() => setPlayerHidden(false)}
              aria-label="إظهار المشغل"
              className="fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-full border border-primary/30 bg-card py-2 pl-4 pr-2 shadow-(--shadow-lift)"
            >
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                {playing ? <Pause className="size-4" /> : <Play className="size-4 -scale-x-100" />}
              </span>
              <span className="max-w-40 truncate text-sm font-bold text-ink">
                {audioDetails?.name}
              </span>
              <ChevronUp className="size-4 text-muted-foreground" />
            </button>
          ) : (
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 shadow-(--shadow-lift) backdrop-blur-md">
              <div className="mx-auto max-w-6xl px-5 py-3">
                {/* seek bar */}
                <div className="flex items-center gap-3" dir="ltr">
                  <span className="w-14 shrink-0 text-center text-xs font-semibold tabular-nums text-muted-foreground">
                    {fmtTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={Math.min(currentTime, duration || 0)}
                    onChange={(e) => {
                      const t = Number(e.target.value);
                      if (audioRef.current) audioRef.current.currentTime = t;
                      setCurrentTime(t);
                    }}
                    aria-label="شريط التقدم"
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                  />
                  <span className="w-14 shrink-0 text-center text-xs font-semibold tabular-nums text-muted-foreground">
                    {fmtTime(duration)}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3">
                  {/* title */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-quran text-lg text-ink leading-loose">
                      {audioDetails?.name}
                    </p>
                  </div>

                  {/* transport */}
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full text-primary transition hover:bg-accent disabled:opacity-30"
                    >
                      <SkipForward className="size-5 -scale-x-100" />
                    </button>
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={playing ? "إيقاف مؤقت" : "تشغيل"}
                      className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-(--shadow-soft) transition hover:bg-primary/90"
                    >
                      {playing ? (
                        <Pause className="size-5" />
                      ) : (
                        <Play className="size-5 -scale-x-100" />
                      )}
                    </button>
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full text-primary transition hover:bg-accent disabled:opacity-30"
                    >
                      <SkipBack className="size-5 -scale-x-100" />
                    </button>
                  </div>

                  {/* volume + actions */}
                  <div className="flex shrink-0 items-center gap-1.5">
                    <div className="hidden items-center gap-2 md:flex" dir="ltr">
                      <button
                        type="button"
                        onClick={() => setMuted((m) => !m)}
                        aria-label={muted ? "إلغاء كتم الصوت" : "كتم الصوت"}
                        className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-primary"
                      >
                        {muted || volume === 0 ? (
                          <VolumeX className="size-4" />
                        ) : (
                          <Volume2 className="size-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={muted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(Number(e.target.value));
                          setMuted(false);
                        }}
                        aria-label="مستوى الصوت"
                        className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                      />
                    </div>
                    <button
                      onClick={()=>handleDownload(audioDetails.url!,`${audioDetails.name}.mp3`)}
                      aria-label="تنزيل التلاوة"
                      className="cursor-pointer grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-primary"
                    >
                      <Download className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlayerHidden(true)}
                      aria-label="إخفاء المشغل"
                      className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-primary"
                    >
                      <ChevronDown className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>

  );
}
