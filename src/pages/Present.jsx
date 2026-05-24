import { useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";

export default function Present() {

  const location = useLocation();

  const hymn = location.state;

  const lyricsRef = useRef(null);

  const containerRef = useRef(null);

  // FULLSCREEN

  const toggleFullscreen = () => {

    if (!document.fullscreenElement) {

      containerRef.current.requestFullscreen();

    } else {

      document.exitFullscreen();

    }

  };

  // AUTO SCROLL

useEffect(() => {

  if (!lyricsRef.current) return;

  const container = lyricsRef.current;

  let scrollAmount = 0;

  let interval;

  // ⏳ ESPERAR INTRO MUSICAL

  const timeout = setTimeout(() => {

    interval = setInterval(() => {

      scrollAmount += 0.8;

      container.scrollTo({

        top: scrollAmount,
        behavior: "smooth"

      });

    }, 80);

  }, 10000); // 12 segundos intro

  return () => {

    clearTimeout(timeout);

    clearInterval(interval);

  };

}, []);

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

        <div
          ref={lyricsRef}
          className="mt-14 flex-1 overflow-hidden w-full px-10"
        >

          <div className="max-w-5xl mx-auto text-center space-y-20 pb-96">

            {/* ESTROFAS */}

            {hymn.estrofas?.map((estrofa, index) => (

              <div
                key={index}
                className="animate-fade"
              >

                <p className="text-5xl leading-[2.2] font-bold text-zinc-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">

                  {estrofa}

                </p>

              </div>

            ))}

            {/* CORO */}

            {hymn.coro && (

              <div className="rounded-[40px] border border-violet-500/20 bg-violet-500/10 p-12 shadow-[0_0_60px_rgba(168,85,247,0.18)]">

                <div className="text-violet-300 uppercase tracking-[0.35em] text-lg font-black mb-8">

                  Coro

                </div>

                <p className="text-5xl leading-[2.2] font-black text-white">

                  {hymn.coro}

                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}