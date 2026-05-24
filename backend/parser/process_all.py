import subprocess

print("🔥 OCR DEL PDF...")
subprocess.run(["python", "ocr_reader.py"])

print("🔥 LIMPIANDO HIMNOS...")
subprocess.run(["python", "clean_hymns.py"])

print("🔥 SUBIENDO A FIREBASE...")
subprocess.run(["python", "uploader.py"])

print("✅ PROCESO COMPLETADO")