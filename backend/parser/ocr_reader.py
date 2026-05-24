import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import re

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

PDF_FILE = "himnos.pdf"

all_text = ""

for page_number in range(1, 300):

    try:

        print(f"📄 Página {page_number}")

        pages = convert_from_path(
            PDF_FILE,
            dpi=200,
            first_page=page_number,
            last_page=page_number,
            poppler_path=r"C:\Release-26.02.0-0\poppler-26.02.0\Library\bin"
        )

        if not pages:
            break

        page = pages[0]

        # CONVERTIR A BLANCO Y NEGRO
        gray = page.convert("L")

        # OCR
        text = pytesseract.image_to_string(
            gray,
            lang="spa"
        )

        print(text[:500])

        text = re.sub(r'-\n', '', text)

        text = re.sub(r'\n(?=[a-z])', ' ', text)

        all_text += text + "\n\n"

    except Exception as e:

        print("ERROR:", e)

        break


with open("himnos.txt", "w", encoding="utf-8") as file:

    file.write(all_text)

print("✅ OCR FINALIZADO")