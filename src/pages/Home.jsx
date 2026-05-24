import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddHymn from "../components/AddHymn";
import {
  getHymns,
  deleteHymn
} from "../firebase/hymns";

export default function Home() {

  const [hymns, setHymns] = useState([]);

  const navigate = useNavigate();

useEffect(() => {

  async function load() {

    const data = await getHymns();

    setHymns(data);

  }

  load();

}, []);

  return (

    <div className="min-h-screen bg-[#070511] text-white pb-32">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#1E1B31] bg-[#070511]/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-700 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">

              <span className="text-3xl">🎵</span>

            </div>

            <div>

              <h1 className="text-3xl font-black">
                Himnario Celebremos Su Gloria
              </h1>

              <p className="text-zinc-500 uppercase tracking-[0.25em] text-sm">
                Karaoke
              </p>

            </div>

          </div>

          <button className="w-14 h-14 rounded-2xl bg-[#120E24] border border-[#2B2546] text-2xl">
            ☀️
          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-12">

        <div className="relative overflow-hidden rounded-[40px] border border-[#241E3E] bg-gradient-to-br from-[#120E24] to-[#0A0914] p-10 shadow-[0_0_70px_rgba(124,58,237,0.18)]">

          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-700/20 blur-3xl rounded-full" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-5 py-2 text-violet-300 mb-6">

              ✨ Himnario Inteligente

            </div>

            <h2 className="text-6xl font-black max-w-3xl leading-tight">

              Tu Himnario Digital

            </h2>

            <p className="text-zinc-400 text-xl mt-5 max-w-2xl leading-relaxed">

              Busca, reproduce y presenta himnos en modo karaoke con OCR e inteligencia artificial.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-8 py-4 text-lg font-semibold shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:scale-105 transition-all">

                🎤 Presentar Himnos

              </button>

              <button className="rounded-2xl border border-[#2B2546] bg-[#100D1E] px-8 py-4 text-lg font-medium">

                📄 Importar PDF

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ADD HYMN */}


      {/* LIST */}

      <section className="max-w-7xl mx-auto px-6 mt-12">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {hymns.map((hymn) => (

            <div
              key={hymn.id}
              className="group rounded-[32px] border border-[#241E3E] bg-gradient-to-br from-[#110D1F] to-[#0A0914] p-7 shadow-[0_0_50px_rgba(124,58,237,0.08)] hover:border-violet-500/40 transition-all"
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3 mb-5">

                    <span className="rounded-2xl bg-violet-500/10 border border-violet-500/20 px-4 py-2 text-violet-300 font-bold">

                      #{hymn.numero}

                    </span>

                    <span className="rounded-full bg-white text-violet-700 px-4 py-2 text-sm font-black">

                      ADORACIÓN

                    </span>

                  </div>

                  <h2 className="text-4xl font-black leading-tight group-hover:text-violet-300 transition-all">

                    {hymn.titulo}

                  </h2>

                </div>

                <button
                  onClick={() => navigate(`/present/${hymn.id}`, {
  state: hymn
})}

                  className="w-20 h-20 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-700 text-3xl shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:scale-110 transition-all"
                >

                  ▶

                </button>

                <button
  onClick={async () => {

    const ok = confirm("¿Eliminar himno?");

    if (!ok) return;

    await deleteHymn(hymn.id);

    const data = await getHymns();

    setHymns(data);

  }}
  className="mt-4 w-6 rounded-2xl py-4 text-lg font-bold transition-all"
>

  🗑 

</button>
<button
  onClick={() => navigate(`/edit/${hymn.id}`, {
    state: hymn
  })}
  className="mt-4 w-4 rounded-2xl py-4 text-lg font-bold transition-all"
>

  ✏️

</button>

              </div>

              {/* INFO */}

              <div className="mt-7 flex flex-wrap gap-5 text-zinc-400">

                <div className="flex items-center gap-2">

                  🎵 <span>Con pista</span>

                </div>

                <div className="flex items-center gap-2 text-emerald-400">

                  ✅ <span>Disponible offline</span>

                </div>

              </div>

              {/* PLAYER */}

              <div className="mt-8 rounded-3xl border border-[#241E3E] bg-[#0E0B19] p-5">

                <div className="flex items-center gap-5">

                  <button className="w-16 h-16 rounded-full bg-violet-500 text-2xl">

                    ▶

                  </button>

                  <div className="flex-1">

                    <div className="h-3 rounded-full bg-[#241E3E] overflow-hidden">

                      <div className="h-full w-1/3 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-full" />

                    </div>

                  </div>

                </div>

              </div>

              {/* LYRICS */}

              <div className="mt-8 rounded-[28px] border border-[#241E3E] bg-[#0C0A16] p-6">

                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-bold mb-5">

                  Letra

                </p>

                <p className="text-zinc-300 text-xl leading-[1.9] line-clamp-6">

                  {hymn.estrofas?.[0]}

                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* NAV */}

    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#1E1B31] bg-[#070511]/95 backdrop-blur-xl px-6 py-4 flex justify-around">

  <button className="flex flex-col items-center gap-2 text-sm text-violet-400">

    <span className="text-2xl">
      📚
    </span>

    <span>
      Biblioteca
    </span>

  </button>

  <button className="flex flex-col items-center gap-2 text-sm text-zinc-500">

    <span className="text-2xl">
      🎼
    </span>

    <span>
      Listas
    </span>

  </button>

  <button className="flex flex-col items-center gap-2 text-sm text-zinc-500">

    <span className="text-2xl">
      📡
    </span>

    <span>
      Offline
    </span>

  </button>

  <button
    onClick={() => navigate("/new")}
    className="flex flex-col items-center gap-2 text-sm text-zinc-500 hover:text-violet-400 transition-all"
  >

    <span className="text-2xl">
      ➕
    </span>

    <span>
      Nuevo
    </span>

  </button>

</nav>

    </div>

  );

}