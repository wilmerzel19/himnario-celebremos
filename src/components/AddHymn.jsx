import { useState } from "react";

import { addHymn } from "../firebase/hymns";

export default function AddHymn() {

  const [numero, setNumero] = useState("");

  const [titulo, setTitulo] = useState("");

  const [estrofas, setEstrofas] = useState("");

  const [coro, setCoro] = useState("");

  const [audioFile, setAudioFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      console.log("ENVIANDO...");

      const response = await addHymn({

        numero,
        titulo,
        estrofas,
        coro,
        audio: audioFile

      });

      console.log(response);

      alert("✅ Himno guardado");

      setNumero("");
      setTitulo("");
      setEstrofas("");
      setCoro("");
      setAudioFile(null);

    } catch (error) {

      console.error(error);

      alert("❌ Error guardando himno");

    } finally {

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* NUMERO */}

      <div>

        <label className="block mb-2 font-bold">
          Número
        </label>

        <input
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="w-full bg-[#161125] border border-[#2B2546] rounded-2xl p-4 text-white"
          placeholder="001"
          required
        />

      </div>

      {/* TITULO */}

      <div>

        <label className="block mb-2 font-bold">
          Título
        </label>

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full bg-[#161125] border border-[#2B2546] rounded-2xl p-4 text-white"
          placeholder="Celebremos su gloria"
          required
        />

      </div>

      {/* ESTROFAS */}

      <div>

        <label className="block mb-2 font-bold">
          Estrofas
        </label>

        <textarea
          value={estrofas}
          onChange={(e) => setEstrofas(e.target.value)}
          className="w-full bg-[#161125] border border-[#2B2546] rounded-2xl p-4 text-white min-h-[200px]"
          placeholder="Letra..."
          required
        />

      </div>

      {/* CORO */}

      <div>

        <label className="block mb-2 font-bold">
          Coro
        </label>

        <textarea
          value={coro}
          onChange={(e) => setCoro(e.target.value)}
          className="w-full bg-[#161125] border border-[#2B2546] rounded-2xl p-4 text-white min-h-[120px]"
          placeholder="Coro..."
        />

      </div>

      {/* AUDIO */}

      <div>

        <label className="block mb-2 font-bold">
          Pista MP3
        </label>

        <input
          type="file"
          accept="audio/mp3,audio/mpeg"
          onChange={(e) => {

            const file = e.target.files[0];

            setAudioFile(file);

          }}
          className="w-full bg-[#161125] border border-[#2B2546] rounded-2xl p-4 text-white"
        />

      </div>

      {/* BOTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-2xl p-5 text-xl font-black hover:scale-[1.02] transition-all"
      >

        {loading
          ? "Guardando..."
          : "Guardar Himno"}

      </button>

    </form>

  );

}