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

    // --- Lógica para a Seção de Livros (Carrossel e Modal) ---
    const booksCarousel = document.querySelector('.books-carousel');
    const prevBookButton = document.querySelector('.prev-book');
    const nextBookButton = document.querySelector('.next-book');
    const bookCards = document.querySelectorAll('.book-card');

    const bookModal = document.getElementById('bookModal');
    const closeButton = bookModal ? bookModal.querySelector('.close-button') : null;
    const modalBookTitle = document.getElementById('modalBookTitle');
    const modalBookCover = document.getElementById('modalBookCover');
    const modalBookAuthor = document.getElementById('modalBookAuthor');
    const modalBookDescription = document.getElementById('modalBookDescription');

    // Mapeamento de dados dos livros (adicione seus livros aqui!)
    const booksData = {
        'livro-exemplo-1': {
            title: "Entendendo Algoritmos",
            author: "Aditya Y. Bhargava",
            cover: "Imagens/Capa Entendendo Algoritmos.jpg", // Exemplo de capa
            description: `
            <p><strong>O que aprendi com o livro:</strong></p>
            <p>Estudo prático dos principais algoritmos usados em programação, como busca binária, quicksort, recursão e algoritmos de grafos. Compreensão de como aplicá-los de forma eficiente para resolver problemas reais.</p>
            <p><strong>Por que recomendo:</strong></p>
            <p>É ideal para quem está começando na programação ou quer entender algoritmos de forma mais intuitiva e sem complicação. Ótimo para reforçar a base lógica e se preparar para entrevistas técnicas ou desafios de código.</p>
        `
        },
        // Adicione mais livros aqui com seus IDs únicos
        'livro-exemplo-2': {
            title: "Outro Livro Legal",
            author: "Um Autor Famoso",
            cover: "caminho/para/outra_capa.jpg",
            description: "Esta é a descrição do meu segundo livro. É sobre... e foi muito interessante por causa de..."
        }
    };

    // --- Lógica do Carrossel de Livros ---
    if (booksCarousel && prevBookButton && nextBookButton && bookCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = bookCards[0].offsetWidth + 20; // Largura do card + gap

        nextBookButton.addEventListener('click', () => {
            if (currentIndex < bookCards.length - 1) { // Garante que não vá além do último
                currentIndex++;
                booksCarousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            } else {
                 // Opcional: Voltar para o início ou desativar o botão
                 currentIndex = 0; // Volta para o início
                 booksCarousel.style.transform = `translateX(0px)`;
            }
        });

        prevBookButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                booksCarousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            } else {
                 // Opcional: Ir para o final ou desativar o botão
                 currentIndex = bookCards.length - 1; // Vai para o final
                 booksCarousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
        });
    }

    // --- Lógica do Modal de Livros ---
    if (bookModal && closeButton && bookCards.length > 0) {
        bookCards.forEach(card => {
            card.addEventListener('click', () => {
                const bookId = card.dataset.bookId; // Pega o ID do livro do atributo data-book-id
                const bookInfo = booksData[bookId];

                if (bookInfo) {
                    modalBookTitle.textContent = bookInfo.title;
                    modalBookCover.src = bookInfo.cover;
                    modalBookCover.alt = `Capa do Livro: ${bookInfo.title}`;
                    modalBookAuthor.textContent = `Autor: ${bookInfo.author}`;
                    modalBookDescription.innerHTML = bookInfo.description;
                    bookModal.style.display = 'flex'; // Mostra o modal (usando flex para centralização)
                    document.body.style.overflow = 'hidden'; // Evita scroll no corpo ao abrir o modal
                }
            });
        });

        closeButton.addEventListener('click', () => {
            bookModal.style.display = 'none'; // Esconde o modal
            document.body.style.overflow = 'auto'; // Restaura o scroll do corpo
        });

        // Fechar o modal clicando fora do conteúdo
        window.addEventListener('click', (event) => {
            if (event.target == bookModal) {
                bookModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Fechar o modal com a tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && bookModal.style.display === 'flex') {
                bookModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
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