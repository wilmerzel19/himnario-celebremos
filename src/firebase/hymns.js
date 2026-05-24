const API_URL = "https://himnario-celebremos1.onrender.com";


// OBTENER HIMNOS

export async function getHymns() {

  const response = await fetch(`${API_URL}/hymns`);

  return await response.json();

}


// CREAR HIMNO

export async function addHymn(data) {

  const formData = new FormData();

  formData.append("numero", data.numero);

  formData.append("titulo", data.titulo);

  formData.append("estrofas", data.estrofas);

  formData.append("coro", data.coro);

  if (data.audio) {

    formData.append("audio", data.audio);

  }

  const response = await fetch(`${API_URL}/hymns`, {

    method: "POST",
    body: formData

  });

  return await response.json();

}

// ELIMINAR

export async function deleteHymn(id) {

  await fetch(`${API_URL}/hymns/${id}`, {

    method: "DELETE"

  });

}


// EDITAR

export async function updateHymn(id, data) {

  const formData = new FormData();

  formData.append("numero", data.numero);

  formData.append("titulo", data.titulo);

  formData.append("estrofas", data.estrofas);

  formData.append("coro", data.coro);

  await fetch(`${API_URL}/hymns/${id}`, {

    method: "PUT",
    body: formData

  });

}