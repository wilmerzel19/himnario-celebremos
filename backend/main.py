from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import shutil
import os
import json

app = FastAPI()

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CREAR CARPETA

os.makedirs("uploads", exist_ok=True)

# BASE DE DATOS SIMPLE JSON

DB_FILE = "hymns.json"

if not os.path.exists(DB_FILE):

    with open(DB_FILE, "w") as f:
        json.dump([], f)

# SERVIR ARCHIVOS

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# OBTENER HIMNOS

@app.get("/hymns")
def get_hymns():

    with open(DB_FILE, "r", encoding="utf-8") as f:

        hymns = json.load(f)

    return hymns


# CREAR HIMNO

@app.post("/hymns")
async def create_hymn(

    numero: str = Form(...),
    titulo: str = Form(...),
    estrofas: str = Form(...),
    coro: str = Form(...),
    audio: UploadFile = File(None)

):

    audio_url = ""

    # GUARDAR AUDIO

    if audio:

        audio_path = f"uploads/{audio.filename}"

        with open(audio_path, "wb") as buffer:

            shutil.copyfileobj(audio.file, buffer)

        audio_url = f"http://localhost:8000/{audio_path}"

    # NUEVO HIMNO

    new_hymn = {
        "id": numero,
        "numero": numero,
        "titulo": titulo,
        "estrofas": [estrofas],
        "coro": coro,
        "audioUrl": audio_url
    }

    # LEER DB

    with open(DB_FILE, "r", encoding="utf-8") as f:

        hymns = json.load(f)

    # AGREGAR

    hymns.append(new_hymn)

    # GUARDAR

    with open(DB_FILE, "w", encoding="utf-8") as f:

        json.dump(hymns, f, ensure_ascii=False, indent=2)

    return {
        "message": "Himno guardado",
        "hymn": new_hymn
    }

    # ELIMINAR HIMNO

@app.delete("/hymns/{hymn_id}")
def delete_hymn(hymn_id: str):

    with open(DB_FILE, "r", encoding="utf-8") as f:

        hymns = json.load(f)

    hymns = [h for h in hymns if h["id"] != hymn_id]

    with open(DB_FILE, "w", encoding="utf-8") as f:

        json.dump(hymns, f, ensure_ascii=False, indent=2)

    return {
        "message": "Himno eliminado"
    }


# EDITAR HIMNO

@app.put("/hymns/{hymn_id}")
async def update_hymn(

    hymn_id: str,

    numero: str = Form(...),
    titulo: str = Form(...),
    estrofas: str = Form(...),
    coro: str = Form(...)

):

    with open(DB_FILE, "r", encoding="utf-8") as f:

        hymns = json.load(f)

    for hymn in hymns:

        if hymn["id"] == hymn_id:

            hymn["numero"] = numero
            hymn["titulo"] = titulo
            hymn["estrofas"] = [estrofas]
            hymn["coro"] = coro

    with open(DB_FILE, "w", encoding="utf-8") as f:

        json.dump(hymns, f, ensure_ascii=False, indent=2)

    return {
        "message": "Himno actualizado"
    }