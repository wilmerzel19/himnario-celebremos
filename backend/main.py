from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import shutil
import os
import json
import uuid

app = FastAPI()

# ============================================
# CORS
# ============================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)

# ============================================
# FOLDERS
# ============================================

os.makedirs("uploads", exist_ok=True)

# ============================================
# DB
# ============================================

DB_FILE = "hymns.json"

if not os.path.exists(DB_FILE):

    with open(DB_FILE, "w", encoding="utf-8") as f:

        json.dump([], f)

# ============================================
# STATIC FILES
# ============================================

app.mount(

    "/uploads",

    StaticFiles(directory="uploads"),

    name="uploads"

)

# ============================================
# READ DB
# ============================================

def read_db():

    with open(DB_FILE, "r", encoding="utf-8") as f:

        return json.load(f)

# ============================================
# SAVE DB
# ============================================

def save_db(data):

    with open(DB_FILE, "w", encoding="utf-8") as f:

        json.dump(

            data,

            f,

            ensure_ascii=False,

            indent=2

        )

# ============================================
# ROOT
# ============================================

@app.get("/")
def root():

    return {

        "status": "online",

        "message": "🔥 API funcionando"

    }

# ============================================
# GET HYMNS
# ============================================

@app.get("/hymns")
def get_hymns():

    return read_db()

# ============================================
# CREATE HYMN
# ============================================

@app.post("/hymns")
async def create_hymn(

    request: Request,

    numero: str = Form(...),

    titulo: str = Form(...),

    estrofas: str = Form(...),

    coro: str = Form(...),

    audio: UploadFile = File(None)

):

    hymns = read_db()

    audio_url = ""

    # ========================================
    # SAVE AUDIO
    # ========================================

    if audio:

        extension = audio.filename.split(".")[-1]

        filename = f"{uuid.uuid4()}.{extension}"

        audio_path = f"uploads/{filename}"

        with open(audio_path, "wb") as buffer:

            shutil.copyfileobj(audio.file, buffer)

        base_url = str(request.base_url)

        audio_url = f"{base_url}uploads/{filename}"

    # ========================================
    # CREATE HYMN
    # ========================================

    hymn = {

        "id": str(uuid.uuid4()),

        "numero": numero,

        "titulo": titulo,

        "estrofas": [estrofas],

        "coro": coro,

        "audioUrl": audio_url

    }

    hymns.append(hymn)

    save_db(hymns)

    return {

        "message": "✅ Himno guardado",

        "hymn": hymn

    }

# ============================================
# DELETE HYMN
# ============================================

@app.delete("/hymns/{hymn_id}")
def delete_hymn(hymn_id: str):

    hymns = read_db()

    hymns = [

        h for h in hymns

        if h["id"] != hymn_id

    ]

    save_db(hymns)

    return {

        "message": "🗑 Himno eliminado"

    }

# ============================================
# UPDATE HYMN
# ============================================

@app.put("/hymns/{hymn_id}")
async def update_hymn(

    hymn_id: str,

    numero: str = Form(...),

    titulo: str = Form(...),

    estrofas: str = Form(...),

    coro: str = Form(...)

):

    hymns = read_db()

    for hymn in hymns:

        if hymn["id"] == hymn_id:

            hymn["numero"] = numero

            hymn["titulo"] = titulo

            hymn["estrofas"] = [estrofas]

            hymn["coro"] = coro

    save_db(hymns)

    return {

        "message": "✅ Himno actualizado"

    }