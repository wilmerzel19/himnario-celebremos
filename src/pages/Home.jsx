import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getHymns,
  deleteHymn
} from "../firebase/hymns";

export default function Home() {

  const [hymns, setHymns] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    async function load() {

      const data = await getHymns();

      setHymns(data);

    }

    load();

  }, []);

  // BUSCADOR

  const filteredHymns = useMemo(() => {

    return hymns.filter((hymn) => {

      const text = `
        ${hymn.numero}
        ${hymn.titulo}
        ${hymn.coro}
        ${hymn.estrofas?.join(" ")}
      `.toLowerCase();

      return text.includes(search.toLowerCase());

    });

  }, [hymns, search]);

  return (

    <div className="min-h-screen bg-[#04010C] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-violet-700/20 blur-[180px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-fuchsia-700/20 blur-[180px] rounded-full" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#180B3A_0%,#04010C_60%)]" />

      </div>

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-3xl">

        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-[28px] bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-3xl shadow-[0_0_60px_rgba(168,85,247,0.6)]">

              🎵

            </div>

            <div>

              <h1 className="text-2xl md:text-4xl font-black">

                Himnario Live

              </h1>

              <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs mt-1">

                Celebremos Su Gloria

              </p>

            </div>

          </div>

          <button
            onClick={() => navigate("/new")}
            className="hidden md:flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-7 py-4 font-bold shadow-[0_0_40px_rgba(168,85,247,0.45)] hover:scale-105 transition-all"
          >

            ➕ Nuevo Himno

          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-5 pt-10 md:pt-16">

        <div className="relative overflow-hidden rounded-[45px] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 md:p-14 shadow-[0_0_80px_rgba(124,58,237,0.15)]">

          {/* GLOWS */}

          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-700/20 blur-[140px] rounded-full" />

          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-700/20 blur-[140px] rounded-full" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-violet-300 mb-8">

              ✨ Himnario Inteligente Karaoke

            </div>

            <h2 className="text-4xl md:text-7xl font-black leading-tight max-w-5xl">

              Presenta Himnos
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                {" "}con Letras Animadas
              </span>

            </h2>

            <p className="text-zinc-400 text-lg md:text-2xl mt-7 max-w-3xl leading-relaxed">

              Controla pistas, letras automáticas, pantalla completa y karaoke profesional desde cualquier dispositivo.

            </p>

            {/* SEARCH */}

            <div className="mt-10">

              <div className="relative">

                <input
                  type="text"
                  placeholder="Buscar himno, coro o número..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-[30px] border border-white/10 bg-black/30 backdrop-blur-xl px-8 py-6 text-xl outline-none focus:border-violet-500 transition-all placeholder:text-zinc-600 shadow-[0_0_40px_rgba(0,0,0,0.35)]"
                />

                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-violet-400">

                  🔍

                </div>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={() => navigate("/new")}
                className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-8 py-5 text-lg font-bold shadow-[0_0_45px_rgba(168,85,247,0.4)] hover:scale-105 transition-all"
              >

                🎤 Agregar Himno

              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-semibold hover:bg-white/10 transition-all">

                📄 Importar PDF

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* RESULTS */}

      <section className="max-w-7xl mx-auto px-5 mt-10">

        <div className="flex items-center justify-between mb-8">

          <h3 className="text-3xl font-black">

            📚 Biblioteca de Himnos

          </h3>

          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-zinc-400">

            {filteredHymns.length} Himnos

          </div>

        </div>

      </section>

      {/* GRID */}

      <section className="max-w-7xl mx-auto px-5 pb-40">

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredHymns.map((hymn) => (

            <div
              key={hymn.id}
              className="group relative overflow-hidden rounded-[38px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:border-violet-500/40 transition-all duration-500 hover:-translate-y-3"
            >

              {/* LIGHT */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_65%)]" />

              {/* TOP */}

              <div className="relative z-10 flex justify-between items-start gap-5">

                <div>

                  <div className="flex items-center gap-3 mb-5">

                    <span className="rounded-2xl bg-violet-500/15 border border-violet-500/20 px-4 py-2 text-violet-300 font-bold">

                      #{hymn.numero}

                    </span>

                    <span className="rounded-full bg-white text-black px-4 py-2 text-xs font-black">

                      ADORACIÓN

                    </span>

                  </div>

                  <h2 className="text-3xl font-black leading-tight group-hover:text-violet-300 transition-all">

                    {hymn.titulo}

                  </h2>

                </div>

                <button
                  onClick={() =>
                    navigate(`/present/${hymn.id}`, {
                      state: hymn
                    })
                  }
                  className="min-w-[85px] h-[85px] rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-700 flex items-center justify-center text-4xl shadow-[0_0_45px_rgba(168,85,247,0.45)] hover:scale-110 transition-all"
                >

                  ▶

                </button>

              </div>

              {/* AUDIO */}

              <div className="relative z-10 mt-7">

                {hymn.audioUrl ? (

                  <audio
                    controls
                    src={hymn.audioUrl}
                    className="w-full"
                  />

                ) : (

                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">

                    ⚠️ Este himno no tiene pista

                  </div>

                )}

              </div>

              {/* LETRA */}

              <div className="relative z-10 mt-8 rounded-[28px] border border-white/10 bg-black/20 p-6">

                <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs font-black mb-5">

                  LETRA

                </p>

                <p className="text-zinc-300 text-lg leading-[2] line-clamp-5">

                  {hymn.estrofas?.[0]}

                </p>

              </div>

              {/* ACTIONS */}

              <div className="relative z-10 mt-8 flex gap-4">

                <button
                  onClick={() =>
                    navigate(`/edit/${hymn.id}`, {
                      state: hymn
                    })
                  }
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-4 font-bold hover:bg-violet-500 hover:border-violet-500 transition-all"
                >

                  ✏️ Editar

                </button>

                <button
                  onClick={async () => {

                    const ok = confirm("¿Eliminar himno?");

                    if (!ok) return;

                    await deleteHymn(hymn.id);

                    const data = await getHymns();

                    setHymns(data);

                  }}
                  className="w-20 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >

                  🗑

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* MOBILE NAV */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/40 backdrop-blur-3xl px-4 py-4 flex justify-around md:hidden">

        <button className="flex flex-col items-center gap-2 text-violet-400">

          <span className="text-2xl">📚</span>

          <span className="text-xs">
            Biblioteca
          </span>

        </button>

        <button className="flex flex-col items-center gap-2 text-zinc-500">

          <span className="text-2xl">🎼</span>

          <span className="text-xs">
            Karaoke
          </span>

        </button>

        <button
          onClick={() => navigate("/new")}
          className="w-16 h-16 -mt-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 flex items-center justify-center text-3xl shadow-[0_0_45px_rgba(168,85,247,0.45)]"
        >

          +

        </button>

        <button className="flex flex-col items-center gap-2 text-zinc-500">

          <span className="text-2xl">📡</span>

          <span className="text-xs">
            Offline
          </span>

        </button>

        <button className="flex flex-col items-center gap-2 text-zinc-500">

          <span className="text-2xl">⚙️</span>

          <span className="text-xs">
            Ajustes
          </span>

        </button>

      </nav>

    </div>

  );

}