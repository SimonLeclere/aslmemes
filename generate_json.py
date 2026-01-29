import os
import json
import subprocess
from datetime import datetime

MEMES_DIR = 'memes'
OUTPUT_FILE = '_data/memes.json'

# Liste des extensions acceptées
EXTENSIONS = ('.png', '.jpg', '.jpeg', '.gif', '.webp')

data = []

# S'assurer que le dossier _data existe
os.makedirs('_data', exist_ok=True)

# Parcourir le dossier memes
for filename in os.listdir(MEMES_DIR):
    if filename.lower().endswith(EXTENSIONS):
        filepath = os.path.join(MEMES_DIR, filename)
        
        # Récupérer l'auteur et la date du dernier commit qui a touché ce fichier
        # On utilise git log pour ça
        try:
            # Récupère l'auteur (nom GitHub)
            author = subprocess.check_output(
                ['git', 'log', '-1', '--format=%an', '--', filepath]
            ).decode('utf-8').strip()
            
            # Récupère la date (ISO 8601)
            date_str = subprocess.check_output(
                ['git', 'log', '-1', '--format=%ai', '--', filepath]
            ).decode('utf-8').strip()
            
            # Si le fichier est nouveau (pas encore commit), mettre des valeurs par défaut
            if not author:
                author = "Inconnu (Nouveau)"
                date_str = datetime.now().isoformat()

            data.append({
                'filename': filename,
                'author': author,
                'date': date_str
            })
            
        except Exception as e:
            print(f"Erreur sur {filename}: {e}")

# Sauvegarde du JSON
with open(OUTPUT_FILE, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Index généré avec {len(data)} memes.")
