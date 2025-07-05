document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

// Lógica para o Modal de Imagem
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close-button");

// Adiciona um ouvinte de clique a todas as imagens dentro de .event-images-row-smaller
document.querySelectorAll('.event-images-row-smaller img, .certification-thumbnail').forEach(img => {
    img.onclick = function(){
        modal.style.display = "block"; // Mostra o modal
        modalImg.src = this.src;       // Define a imagem clicada como a imagem do modal
        captionText.innerHTML = this.alt; // Define o texto 'alt' da imagem como legenda
    }
});

// Quando o usuário clica no <span> (x), fecha o modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Fecha o modal ao clicar fora da imagem (no fundo preto)
modal.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



// Lógica para o Carrossel de Certificações
const carousel = document.querySelector('.certifications-carousel');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let scrollAmount = 0; // Variável para controlar a posição de rolagem

// Calcula o quanto rolar a cada clique
const cardWidth = document.querySelector('.certification-card').offsetWidth;
const gap = 20; // O gap que definimos no CSS para .certifications-carousel
const scrollPerClick = cardWidth + gap;

// Obtém todos os cards do carrossel
const allCards = document.querySelectorAll('.certifications-carousel .certification-card');
const totalCards = allCards.length;

// Evento para o botão "Próximo"
nextButton.addEventListener('click', () => {
    // Calcula a posição máxima de rolagem antes do último item visível
    // Considera que um número de cards pode estar visível por vez, dependendo da largura do contêiner
    const carouselVisibleWidth = carousel.clientWidth; // Largura visível do carrossel
    // Quantos cards cabem visivelmente no contêiner
    const cardsInView = Math.floor(carouselVisibleWidth / scrollPerClick);

    // Se a rolagem atual + a largura dos cards em vista for menor que a largura total do conteúdo
    if (scrollAmount + carouselVisibleWidth < carousel.scrollWidth - (cardWidth / 2)) { // Ajuste para não cortar o último card
        scrollAmount += scrollPerClick;
    } else {
        // Se já está no final ou próximo do final, volta para o início (loop)
        scrollAmount = 0;
    }
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
});

// Evento para o botão "Anterior"
prevButton.addEventListener('click', () => {
    if (scrollAmount > 0) {
        scrollAmount -= scrollPerClick;
    } else {
        // Se já está no início, vai para o final (loop)
        // Calcula a posição para mostrar os últimos cards
        const carouselVisibleWidth = carousel.clientWidth;
        const maxScroll = carousel.scrollWidth - carouselVisibleWidth;
        scrollAmount = maxScroll;
    }
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
});

// Atualiza o ano no footer dinamicamente
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});