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


document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para o Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Alterna a visibilidade do menu
            hamburger.classList.toggle('active'); // Anima o ícone do hambúrguer para um X
        });

        // Fechar o menu quando um link é clicado (útil no mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- Lógica para o Efeito de Digitação (Typing Effect) ---
    const typingTextElement = document.getElementById('typing-text');
    const phrases = [
        "Desenvolvedor Back-end em Formação",
        "Estudante focado em Python & Dados",
        "Bem-vindo ao meu Portfólio!"
    ]; // Suas frases para animar

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Velocidade de digitação (ms por caractere)
    const deletingSpeed = 50; // Velocidade de apagamento (ms por caractere)
    const pauseBeforeDelete = 1500; // Pausa antes de apagar (ms)
    const pauseBeforeType = 500; // Pausa antes de digitar a próxima frase (ms)

    function typeEffect() {
        // Verifica se o elemento existe antes de tentar manipulá-lo
        if (!typingTextElement) {
            return;
        }

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Apagando
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Digitanto
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Terminou de digitar a frase atual, pausa e começa a apagar
            currentSpeed = pauseBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Terminou de apagar a frase atual, passa para a próxima
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Loop pelas frases
            currentSpeed = pauseBeforeType;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    // Inicia o efeito quando a página é carregada
    if (typingTextElement) {
        typeEffect();
    }
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