import pdfplumber
import re

PDF_FILE = "himnos.pdf"

all_text = ""

with pdfplumber.open(PDF_FILE) as pdf:

    for page in pdf.pages:

        text = page.extract_text()

        if text:

            # LIMPIAR CORTES RAROS
            text = re.sub(r'-\n', '', text)

            # UNIR PALABRAS CORTADAS
            text = re.sub(r'\n(?=[a-z])', ' ', text)

            all_text += text + "\n\n"


with open("himnos.txt", "w", encoding="utf-8") as file:

    file.write(all_text)


print("✅ PDF convertido correctamente")