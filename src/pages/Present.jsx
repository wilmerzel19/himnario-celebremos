import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Present() {

  const location = useLocation();

  const hymn = location.state;

  const lyricsRef = useRef(null);

  const containerRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(1);

  // FULLSCREEN

  const toggleFullscreen = () => {

    if (!document.fullscreenElement) {

      containerRef.current.requestFullscreen();

    } else {

      document.exitFullscreen();

    }

  };

  // AUTO SCROLL

const scrollRef = useRef(0);

useEffect(() => {

  if (!lyricsRef.current) return;

  const container = lyricsRef.current;

  const interval = setInterval(() => {

    scrollRef.current += scrollSpeed;

    container.scrollTo({
      top: scrollRef.current,
      behavior: "smooth"
    });

  }, 50);

  return () => clearInterval(interval);

}, [scrollSpeed]);

  // SI NO EXISTE

  if (!hymn) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-4xl">

        Cargando Himno...

      </div>

    );

  }

  return (

    <div
      ref={containerRef}
      className="h-screen overflow-hidden bg-black text-white relative"
    >

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#120E24] via-black to-[#09070F]" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-700/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-700/20 blur-3xl rounded-full" />

      {/* BOTON FULLSCREEN */}

      <button
        onClick={toggleFullscreen}
        className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-violet-600 transition-all backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl text-xl font-bold shadow-[0_0_25px_rgba(168,85,247,0.3)]"
      >

        ⛶ Pantalla Completa

      </button>
      <div className="absolute top-24 right-6 z-50 flex items-center gap-3">

  {/* LENTO */}

  <button
    onClick={() =>
      setScrollSpeed((prev) =>
        Math.max(0.5, prev - 0.5)
      )
    }
    className="w-14 h-14 rounded-2xl bg-black/50 hover:bg-violet-600 transition-all backdrop-blur-xl border border-white/10 text-2xl font-black"
  >

    −

  </button>

  {/* VELOCIDAD */}

  <div className="px-6 py-4 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 text-xl font-black">

    ⚡ {scrollSpeed}x

  </div>

  {/* RAPIDO */}

  <button
    onClick={() =>
      setScrollSpeed((prev) =>
        Math.min(10, prev + 0.5)
      )
    }
    className="w-14 h-14 rounded-2xl bg-black/50 hover:bg-fuchsia-600 transition-all backdrop-blur-xl border border-white/10 text-2xl font-black"
  >

    +

  </button>

</div>

      {/* AUDIO */}

      {hymn.audioUrl && (

        <audio
          src={hymn.audioUrl}
          autoPlay
          controls
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50"
        />

      )}

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col items-center h-full">

        {/* TITLE */}

        <div className="pt-10 text-center">

          <div className="inline-flex items-center gap-3 rounded-full bg-violet-500/10 border border-violet-500/20 px-6 py-3 text-violet-300 mb-5">

            🎵 Himno #{hymn.numero}

          </div>

          <h1 className="text-6xl font-black max-w-4xl px-10 leading-tight">

            {hymn.titulo}

          </h1>

        </div>

        {/* LETRA */}

     {/* LYRICS */}

<div
  ref={lyricsRef}
  className="mt-14 flex-1 overflow-hidden w-full px-6 md:px-10"
>

  <div className="max-w-5xl mx-auto text-center pb-[800px]">

    {/* ESTROFAS */}

    {hymn.estrofas?.map((estrofa, index) => (

      <div
        key={index}
        className="animate-fade mb-40"
      >

        {/* NUMERO */}

        <div className="mb-10">

          <span className="inline-flex items-center gap-3 rounded-full bg-violet-500/10 border border-violet-500/20 px-7 py-3 text-violet-300 uppercase tracking-[0.3em] text-sm font-black">

            ✨ Estrofa {index + 1}

          </span>

        </div>

        {/* LETRA */}

        <div className="rounded-[45px] border border-white/10 bg-white/5 backdrop-blur-2xl px-8 md:px-14 py-14 shadow-[0_0_70px_rgba(168,85,247,0.12)]">

          <p className="text-3xl md:text-5xl leading-[2.2] font-black text-zinc-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] whitespace-pre-line">

            {estrofa}

          </p>

        </div>

        {/* CORO */}

        {hymn.coro && (

          <div className="mt-24 animate-fade">

            {/* TITULO CORO */}

            <div className="mb-10">

            
            </div>

            {/* BOX CORO */}

           

          </div>

        )}

      </div>

    ))}

  </div>

</div>

      </div>

    </div>

  );

}