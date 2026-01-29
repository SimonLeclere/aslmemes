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
            }

            container.appendChild(img);
            gallery.appendChild(container);
        });
    });

// Fermeture de la modale
document.querySelector('.close').onclick = function() { 
  document.getElementById('modal').style.display = "none";
}
