import re
import json

INPUT_FILE = "himnos.txt"
OUTPUT_FILE = "himnos.json"


# LIMPIAR TEXTO
def clean_text(text):

    text = re.sub(r'\r', '', text)

    text = re.sub(r'[ \t]+', ' ', text)

    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()


# DIVIDIR HIMNOS
def split_hymns(text):

    pattern = r'(?=^\d{1,3}\.\s+)'

    hymns = re.split(
        pattern,
        text,
        flags=re.MULTILINE
    )

    return [h.strip() for h in hymns if h.strip()]


# PARSEAR HIMNO
def parse_hymn(hymn_text):

    lines = hymn_text.split("\n")

    lines = [line.strip() for line in lines if line.strip()]

    if not lines:
        return None

    first_line = lines[0]

    match = re.match(
        r'(\d{1,3})\.\s+(.*)',
        first_line
    )

    if not match:
        return None

    numero = match.group(1)

    titulo = match.group(2)

    estrofas = []

    coro = ""

    verse_lines = []

    chorus_lines = []

    is_chorus = False

    for line in lines[1:]:

        # DETECTAR CORO
        if re.search(
            r'^coro',
            line,
            re.IGNORECASE
        ):

            is_chorus = True

            continue

        if is_chorus:

            chorus_lines.append(line)

        else:

            verse_lines.append(line)

    # UNIR ESTROFAS
    if verse_lines:

        estrofas.append(
            "\n".join(verse_lines)
        )

    coro = "\n".join(chorus_lines)

    return {
        "numero": numero,
        "titulo": titulo,
        "estrofas": estrofas,
        "coro": coro
    }


# LEER TXT
with open(INPUT_FILE, "r", encoding="utf-8") as file:

    raw_text = file.read()


# LIMPIAR
cleaned = clean_text(raw_text)

# DIVIDIR
hymns_raw = split_hymns(cleaned)

print("🔥 Himnos detectados:", len(hymns_raw))

parsed_hymns = []

# PARSEAR
for hymn in hymns_raw:

    parsed = parse_hymn(hymn)

    if parsed:

        parsed_hymns.append(parsed)


# GUARDAR JSON
with open(OUTPUT_FILE, "w", encoding="utf-8") as file:

    json.dump(
        parsed_hymns,
        file,
        ensure_ascii=False,
        indent=2
    )


print(f"✅ {len(parsed_hymns)} himnos procesados")