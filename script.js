let allMemes = [];

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

    const giscusContainer = document.querySelector('.giscus');
    giscusContainer.innerHTML = "";
    giscusContainer.appendChild(script);
}

function renderGallery(memes) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = "";
    
    memes.forEach(meme => {
        const container = document.createElement('div');
        container.className = 'meme-card';
        
        const img = document.createElement('img');
        img.src = `memes/${meme.filename}`;
        img.loading = "lazy";
        
        img.onclick = function() {
            const modal = document.getElementById('modal');
            const modalImg = document.getElementById("img01");
            const captionText = document.getElementById("caption");
            
            modalImg.src = this.src;
            captionText.innerHTML = `
                <span class="caption-author">${meme.author}</span>
                <span class="caption-date">${new Date(meme.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            `;

            modal.style.display = "flex";
            document.body.classList.add('modal-open');
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);

            loadGiscus(meme.filename);
        }

        container.appendChild(img);
        gallery.appendChild(container);
    });
}

function sortMemes(criteria) {
    const sorted = [...allMemes];
    if (criteria === 'recent') {
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (criteria === 'reactions') {
        sorted.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    }
    renderGallery(sorted);
}

fetch('_data/memes.json')
    .then(response => response.json())
    .then(memes => {
        allMemes = memes;
        sortMemes('reactions');
    });

document.getElementById('sortSelect').addEventListener('change', (e) => {
    sortMemes(e.target.value);
});

document.querySelector('.close').onclick = function() { 
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}
