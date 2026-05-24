import AddHymn from "../components/AddHymn";
import { useNavigate } from "react-router-dom";

export default function NewHymn() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#070511] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#1E1B31] bg-[#070511]/90 backdrop-blur-xl">

        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/")}
              className="w-14 h-14 rounded-2xl bg-[#120E24] border border-[#2B2546] text-2xl hover:scale-105 transition-all"
            >

              ←

            </button>

            <div>

              <h1 className="text-4xl font-black">
                Nuevo Himno
              </h1>

              <p className="text-zinc-500 uppercase tracking-[0.25em] text-sm">

                OCR + IA

              </p>

            </div>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="rounded-[36px] border border-[#241E3E] bg-gradient-to-br from-[#120E24] to-[#0A0914] p-10 shadow-[0_0_60px_rgba(124,58,237,0.14)]">

          <div className="mb-10">

            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-5 py-2 text-violet-300 mb-6">

              ✨ Himnario Inteligente

            </div>

            <h2 className="text-5xl font-black">

              Agregar Himno

            </h2>

            <p className="text-zinc-400 text-xl mt-4 leading-relaxed">

              Guarda himnos manualmente o usando OCR desde PDF o imágenes.

            </p>

          </div>

          <AddHymn />

        </div>

      </div>

    </div>

  );

}