import json
import firebase_admin

from firebase_admin import credentials
from firebase_admin import firestore


# INICIALIZAR FIREBASE
cred = credentials.Certificate("firebase-key.json")

firebase_admin.initialize_app(cred)

db = firestore.client()


# LEER JSON
with open("himnos.json", "r", encoding="utf-8") as file:

    hymns = json.load(file)


# SUBIR HIMNOS
for hymn in hymns:

    db.collection("himnos").add(hymn)

    print(f"✅ Himno subido: {hymn['titulo']}")


print("🔥 TODOS LOS HIMNOS FUERON SUBIDOS")