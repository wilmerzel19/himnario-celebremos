import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { updateHymn } from "../firebase/hymns";

export default function EditHymn() {

  const location = useLocation();

  const navigate = useNavigate();

  const hymn = location.state;

  const [numero, setNumero] = useState(hymn.numero);

  const [titulo, setTitulo] = useState(hymn.titulo);

  const [estrofas, setEstrofas] = useState(
    hymn.estrofas?.[0] || ""
  );

  const [coro, setCoro] = useState(hymn.coro);

  const handleSubmit = async (e) => {

    e.preventDefault();

    await updateHymn(hymn.id, {

      numero,
      titulo,
      estrofas,
      coro

    });

    alert("✅ Himno actualizado");

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-[#070511] text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-black mb-10">

          ✏️ Editar Himno

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full p-5 rounded-2xl bg-[#161125]"
            placeholder="Número"
          />

          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-5 rounded-2xl bg-[#161125]"
            placeholder="Título"
          />

          <textarea
            value={estrofas}
            onChange={(e) => setEstrofas(e.target.value)}
            className="w-full p-5 rounded-2xl bg-[#161125] min-h-[200px]"
            placeholder="Estrofas"
          />

          <textarea
            value={coro}
            onChange={(e) => setCoro(e.target.value)}
            className="w-full p-5 rounded-2xl bg-[#161125] min-h-[120px]"
            placeholder="Coro"
          />

          <button
            className="w-full bg-violet-600 hover:bg-violet-700 rounded-2xl py-5 text-2xl font-black"
          >

            Guardar Cambios

          </button>

        </form>

      </div>

    </div>

  );

}