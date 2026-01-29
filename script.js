// Fonction pour charger dynamiquement Giscus pour chaque meme
function loadGiscus(filename) {

    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "simonleclere/aslmemes");
    script.setAttribute("data-repo-id", "R_kgDORD658Q");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDORD658c4C1ljw");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", filename);
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "fr");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    // On vide l'ancienne instance de Giscus et on met la nouvelle
    const giscusContainer = document.querySelector('.giscus');
    giscusContainer.innerHTML = "";
    giscusContainer.appendChild(script);
}
fetch('_data/memes.json')
    .then(response => response.json())
    .then(memes => {
        const gallery = document.getElementById('gallery');
        // Trier par date décroissante (le plus récent en haut)
        memes.sort((a, b) => new Date(b.date) - new Date(a.date));

        memes.forEach(meme => {
            const container = document.createElement('div');
            container.className = 'meme-card';
            
            const img = document.createElement('img');
            img.src = `memes/${meme.filename}`;
            img.loading = "lazy"; // Performance
            
            // Interaction au clic
            img.onclick = function() {
                const modal = document.getElementById('modal');
                const modalImg = document.getElementById("img01");
                const captionText = document.getElementById("caption");
                
                modal.style.display = "block";
                modalImg.src = this.src;
                // Affichage des infos de l'auteur
                captionText.innerHTML = `
                    <strong>Auteur :</strong> ${meme.author}<br>
                    <strong>Date :</strong> ${new Date(meme.date).toLocaleDateString()}
                `;

                // Charger le système de vote pour CE meme
                loadGiscus(meme.filename);
            }

            container.appendChild(img);
            gallery.appendChild(container);
        });
    });

// Fermeture de la modale
document.querySelector('.close').onclick = function() { 
  document.getElementById('modal').style.display = "none";
}
