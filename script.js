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
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

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
        "Data Science | Analista de Dados<br>em Formação",
        "Estudante focado em Python & Dados",
        "Bem-vindo ao meu Portfólio!"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 1500;
    const pauseBeforeType = 500;

    function typeEffect() {
        if (!typingTextElement) {
            return;
        }

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingTextElement.innerHTML = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.innerHTML = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentSpeed = pauseBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = pauseBeforeType;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    if (typingTextElement) {
        typeEffect();
    }

    // =================================================================
    // ANIMAÇÃO DE SCROLL (REVELAR SEÇÕES)
    // =================================================================
    const sections = document.querySelectorAll('.section-hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));


    // --- Lógica para a Seção de Posts do LinkedIn (Carrossel e Redirecionamento) ---
    const linkedinCarousel = document.querySelector('.linkedin-carousel');
    const prevLinkedinButton = document.querySelector('.prev-linkedin');
    const nextLinkedinButton = document.querySelector('.next-linkedin');
    const linkedinPostCards = document.querySelectorAll('.linkedin-post-card');

    // Mapeamento de dados dos posts do LinkedIn
    const linkedinPostsData = {
        'post-MySQL': {
            title: "🚀 Estudo de SQL com foco em MySQL",
            thumbnail: "Imagens/Capturas/Post_SQL_com_MySQL_teste.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_sql-mysql-anaerlisededados-activity-7350875540792205312-jMsn?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-Pandas': {
            title: "🚀 O que aprendi sobre Pandas com Python",
            thumbnail: "Imagens/Capturas/Post_Pandas.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-pandas-analisededados-activity-7345858768213024768-SGAY?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-POO': { // ID alterado para ser único
            title: "Estudos em Python: foco em POO 🐍",
            thumbnail: "Imagens/Capturas/Post_POO.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-poo-programacaoorientadaaobjetos-activity-7343254076383498241-diOY?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-estatistica': {
            title: "🔍 Statsmodels: Análise Estatística com Python",
            thumbnail: "Imagens/Capturas/Post_Análise_Estatística.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-datascience-estataedstica-activity-7351950622625030145-IBDE?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-APis': {
            title: "📘 Aprendizados no Bootcamp de APIs em Python",
            thumbnail: "Imagens/Capturas/Post_APis.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-apis-bootcamp-activity-7348319956662394883-psVw?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-CursoBasico': {
            title: "🚀 Python + Data Science: nível básico completo!",
            thumbnail: "Imagens/Capturas/Post_DSA_Basico.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-datascience-pandas-activity-7347987786001543169-D_sF?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-POOForca': {
            title: "💻 Python + POO: atualização no projeto Jogo da Forca!",
            thumbnail: "Imagens/Capturas/Post_Forca_POO.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-poo-projetopessoal-activity-7341517632405164036-68oS?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-QuickSort': {
            title: "🚀 QuickSort na prática: o que aprendi no capítulo 4!",
            thumbnail: "Imagens/Capturas/Post_QuickSort.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_quicksort-algoritmos-estruturadedados-activity-7333832071217397760-zx_3?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-Matplotlib': {
            title: "🚀 Visualização de Dados com Python: finalizei o capítulo 11!",
            thumbnail: "Imagens/Capturas/Post_Matplotlib.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-datascience-matplotlib-activity-7346591057616257025-RZU7?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        },
        'post-NumPy': {
            title: "📊 Estudando NumPy de forma prática",
            thumbnail: "Imagens/Capturas/Post_NumPy.png",
            link: "https://www.linkedin.com/posts/guilhrodrigues_python-numpy-datascience-activity-7343631582886338561-jvdT?utm_source=share&utm_medium=member_desktop&rcm=ACoAADga5vEB_1JGYYuLdMITd9V05P-hjoxtEDc"
        }
    };

    // --- Lógica do Carrossel de Posts - AJUSTADA ---
    if (linkedinCarousel && prevLinkedinButton && nextLinkedinButton && linkedinPostCards.length > 0) {
        let currentLinkedinIndex = 0; // Índice do primeiro card visível

        // Calcula a largura de um card + gap, de forma dinâmica
        const getLinkedinCardWidthAndGap = () => {
            if (!linkedinPostCards[0]) return 0;
            const cardWidth = linkedinPostCards[0].offsetWidth;
            const carouselComputedStyle = window.getComputedStyle(linkedinCarousel);
            // Pega o gap real do CSS. Se não houver, ou for 'normal', usa 20px.
            const gap = parseFloat(carouselComputedStyle.gap) || 20; 
            return cardWidth + gap;
        };

        // Calcula a posição de transformX para o último card visível se alinhar
        const getLastLinkedinScrollPosition = () => {
            if (linkedinPostCards.length === 0) return 0;
            const carouselContainer = linkedinCarousel.parentElement;
            if (!carouselContainer) return 0;

            const carouselContainerWidth = carouselContainer.offsetWidth;
            const cardWidthWithGap = getLinkedinCardWidthAndGap();

            // Calcule o número de cards visíveis de uma vez
            // Arredonda para baixo para ter certeza que um card não está cortado
            const visibleCards = Math.floor(carouselContainerWidth / cardWidthWithGap);

            // Se o número de cards for menor ou igual aos visíveis, não há rolagem
            if (linkedinPostCards.length <= visibleCards) {
                return 0;
            }

            // A posição de rolagem para o último set de cards
            // Subtrai a largura total visível do contêiner da largura total do conteúdo
            // Isso garante que a rolagem pare exatamente onde o último card visível se alinha.
            let totalContentWidth = 0;
            linkedinPostCards.forEach(card => {
                totalContentWidth += getLinkedinCardWidthAndGap();
            });
            return totalContentWidth - carouselContainerWidth;
        };


        nextLinkedinButton.addEventListener('click', () => {
            const cardWidthWithGap = getLinkedinCardWidthAndGap();
            const lastScrollPosition = getLastLinkedinScrollPosition();
            const currentScroll = currentLinkedinIndex * cardWidthWithGap;

            if (currentScroll < lastScrollPosition) {
                // Se ainda não atingiu a posição final exata
                // Verifica se a próxima rolagem completa ainda estaria dentro do limite
                if (currentScroll + cardWidthWithGap < lastScrollPosition) {
                     currentLinkedinIndex++;
                     linkedinCarousel.style.transform = `translateX(-${currentLinkedinIndex * cardWidthWithGap}px)`;
                } else {
                    // Se a próxima rolagem completa ultrapassar, vá para a posição final exata
                    linkedinCarousel.style.transform = `translateX(-${lastScrollPosition}px)`;
                    currentLinkedinIndex = linkedinPostCards.length - 1; // Ajusta índice para o último
                }
            } else {
                // Já está no final, volta para o início
                currentLinkedinIndex = 0;
                linkedinCarousel.style.transform = `translateX(0px)`;
            }
        });

        prevLinkedinButton.addEventListener('click', () => {
            const cardWidthWithGap = getLinkedinCardWidthAndGap();
            const lastScrollPosition = getLastLinkedinScrollPosition();
            
            if (currentLinkedinIndex > 0) {
                currentLinkedinIndex--;
                linkedinCarousel.style.transform = `translateX(-${currentLinkedinIndex * cardWidthWithGap}px)`;
            } else {
                // Já está no início, vá para o final.
                // A posição para o final deve ser exatamente o lastScrollPosition
                linkedinCarousel.style.transform = `translateX(-${lastScrollPosition}px)`;
                currentLinkedinIndex = linkedinPostCards.length - 1; // Define o índice como o último
            }
        });
    }

    // --- Lógica de Clique nos Cards de Post para Abrir o LinkedIn ---
    if (linkedinPostCards.length > 0) {
        linkedinPostCards.forEach(card => {
            card.addEventListener('click', () => {
                const postId = card.dataset.postId;
                const postInfo = linkedinPostsData[postId];

                if (postInfo && postInfo.link) {
                    window.open(postInfo.link, '_blank');
                }
            });
        });
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

    // Mapeamento de dados dos livros
    const booksData = {
        'livro-1': {
            title: "Entendendo Algoritmos",
            author: "Aditya Y. Bhargava",
            cover: "Imagens/Capa Entendendo Algoritmos.jpg",
            description: `
                <p><strong>O que aprendi com o livro:</strong></p>
                <p>Estudo prático dos principais algoritmos usados em programação, como busca binária, quicksort, recursão e algoritmos de grafos. Compreensão de como aplicá-los de forma eficiente para resolver problemas reais.</p>
                <p><strong>Por que recomendo:</strong></p>
                <p>É ideal para quem está começando na programação ou quer entender algoritmos de forma mais intuitiva e sem complicação. Ótimo para reforçar a base lógica e se preparar para entrevistas técnicas ou desafios de código.</p>
            `
        },
        'livro-2': {
            title: "Lógica de Programação e Algoritmos com JavaScript",
            author: "Edécio Fernando Iepsen",
            cover: "Imagens/Capa_JS_Algoritmos.jpg",
            description: `
                <p><strong>O que aprendi com o livro:</strong></p>
                <p>Fortalecimento da base lógica em programação por meio de exemplos práticos com JavaScript. Estruturas fundamentais como variáveis, operadores, condicionais, laços de repetição e funções são explicadas de forma clara e didática.</p>
                <p><strong>Por que recomendo:</strong></p>
                <p>Excelente leitura para quem está começando e deseja aprender lógica de programação de forma aplicada com JavaScript. O livro ajuda a desenvolver o raciocínio lógico necessário para resolver problemas de forma estruturada.</p>
            `
        }
    };

    // --- Lógica do Carrossel de Livros - AJUSTADA ---
    if (booksCarousel && prevBookButton && nextBookButton && bookCards.length > 0) {
        let currentIndex = 0; // Índice do primeiro card visível

        // Calcula a largura de um card + gap
        const getBookCardWidthAndGap = () => {
            if (!bookCards[0]) return 0;
            const cardWidth = bookCards[0].offsetWidth;
            const carouselComputedStyle = window.getComputedStyle(booksCarousel);
            const gap = parseFloat(carouselComputedStyle.gap) || 20;
            return cardWidth + gap;
        };

        // Calcula a posição de transformX para o último card visível se alinhar
        const getLastBookScrollPosition = () => {
            if (bookCards.length === 0) return 0;
            const carouselContainer = booksCarousel.parentElement;
            if (!carouselContainer) return 0;

            const carouselContainerWidth = carouselContainer.offsetWidth;
            const cardWidthWithGap = getBookCardWidthAndGap();
            
            const visibleCards = Math.floor(carouselContainerWidth / cardWidthWithGap);

            if (bookCards.length <= visibleCards) {
                return 0;
            }

            let totalContentWidth = 0;
            bookCards.forEach(card => {
                totalContentWidth += getBookCardWidthAndGap();
            });
            return totalContentWidth - carouselContainerWidth;
        };

        nextBookButton.addEventListener('click', () => {
            const cardWidthWithGap = getBookCardWidthAndGap();
            const lastScrollPosition = getLastBookScrollPosition();
            const currentScroll = currentIndex * cardWidthWithGap;

            const potentialNextScrollPosition = currentScroll + cardWidthWithGap;

            if (potentialNextScrollPosition <= lastScrollPosition) {
                 currentIndex++;
                 booksCarousel.style.transform = `translateX(-${currentIndex * cardWidthWithGap}px)`;
            } else if (currentScroll < lastScrollPosition) {
                booksCarousel.style.transform = `translateX(-${lastScrollPosition}px)`;
                currentIndex = bookCards.length - 1;
            } else {
                currentIndex = 0;
                booksCarousel.style.transform = `translateX(0px)`;
            }
        });

        prevBookButton.addEventListener('click', () => {
            const cardWidthWithGap = getBookCardWidthAndGap();
            const lastScrollPosition = getLastBookScrollPosition();

            if (currentIndex > 0) {
                currentIndex--;
                booksCarousel.style.transform = `translateX(-${currentIndex * cardWidthWithGap}px)`;
            } else {
                booksCarousel.style.transform = `translateX(-${lastScrollPosition}px)`;
                currentIndex = bookCards.length - 1;
            }
        });
    }

    // --- Lógica do Modal de Livros ---
    if (bookModal && closeButton && bookCards.length > 0) {
        bookCards.forEach(card => {
            card.addEventListener('click', () => {
                const bookId = card.dataset.bookId;
                const bookInfo = booksData[bookId];

                if (bookInfo) {
                    modalBookTitle.textContent = bookInfo.title;
                    modalBookCover.src = bookInfo.cover;
                    modalBookCover.alt = `Capa do Livro: ${bookInfo.title}`;
                    modalBookAuthor.textContent = `Autor: ${bookInfo.author}`;
                    modalBookDescription.innerHTML = bookInfo.description;
                    bookModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeButton.addEventListener('click', () => {
            bookModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (event) => {
            if (event.target == bookModal) {
                bookModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && bookModal.style.display === 'flex') {
                bookModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- Lógica para o Carrossel de Certificados (Botões + Arrasto) ---
    const certificationsCarousel = document.querySelector('.certifications-carousel');
    const prevCertButton = document.querySelector('.certifications-carousel-container .prev'); // Seleciona o botão dentro do container específico
    const nextCertButton = document.querySelector('.certifications-carousel-container .next'); // Seleciona o botão dentro do container específico
    const certificationCards = document.querySelectorAll('.certification-card');

    if (certificationsCarousel && prevCertButton && nextCertButton && certificationCards.length > 0) {
        let currentCertIndex = 0; // Índice do primeiro card visível
        let isDraggingCert = false;
        let startPosCert = 0;
        let currentTranslateCert = 0;
        let prevTranslateCert = 0;

        const getCertCardWidthAndGap = () => {
            if (!certificationCards[0]) return 0;
            const cardWidth = certificationCards[0].offsetWidth;
            const carouselComputedStyle = window.getComputedStyle(certificationsCarousel);
            const gap = parseFloat(carouselComputedStyle.gap) || 20;
            return cardWidth + gap;
        };

        const getLastCertScrollPosition = () => {
            if (certificationCards.length === 0) return 0;
            const carouselContainer = certificationsCarousel.parentElement;
            if (!carouselContainer) return 0;

            const carouselContainerWidth = carouselContainer.offsetWidth;
            let totalContentWidth = 0;
            certificationCards.forEach(card => {
                totalContentWidth += getCertCardWidthAndGap();
            });
            return Math.max(0, totalContentWidth - carouselContainerWidth);
        };

        const setCertPositionByIndex = () => {
            const cardWidthWithGap = getCertCardWidthAndGap();
            const lastScrollPos = getLastCertScrollPosition();

            let targetTranslateX = -currentCertIndex * cardWidthWithGap;

            // Ajusta para não passar do final
            if (Math.abs(targetTranslateX) > lastScrollPos) {
                 targetTranslateX = -lastScrollPos;
            }

            // Garante que não vai para uma posição positiva (fora do início)
            if (targetTranslateX > 0) {
                targetTranslateX = 0;
            }
            
            certificationsCarousel.style.transform = `translateX(${targetTranslateX}px)`;
        };

        // Lógica dos botões
        nextCertButton.addEventListener('click', () => {
            const cardWidthWithGap = getCertCardWidthAndGap();
            const lastScrollPosition = getLastCertScrollPosition();
            const currentScroll = currentCertIndex * cardWidthWithGap;

            const potentialNextScrollPosition = currentScroll + cardWidthWithGap;

            if (potentialNextScrollPosition <= lastScrollPosition + 1) {
                 currentCertIndex++;
                 setCertPositionByIndex();
            } else if (currentScroll < lastScrollPosition - 1) {
                certificationsCarousel.style.transform = `translateX(-${lastScrollPosition}px)`;
                currentCertIndex = certificationCards.length - 1;
            } else {
                currentCertIndex = 0;
                setCertPositionByIndex();
            }
        });

        prevCertButton.addEventListener('click', () => {
            const cardWidthWithGap = getCertCardWidthAndGap();
            const lastScrollPosition = getLastCertScrollPosition();
            
            if (currentCertIndex > 0) {
                currentCertIndex--;
                setCertPositionByIndex();
            } else {
                certificationsCarousel.style.transform = `translateX(-${lastScrollPosition}px)`;
                currentCertIndex = certificationCards.length - 1;
            }
        });

        // Lógica de arrastar (swipe)
        certificationsCarousel.addEventListener('touchstart', (e) => {
            isDraggingCert = true;
            startPosCert = e.touches[0].clientX;
            const transformMatrix = window.getComputedStyle(certificationsCarousel).transform;
            if (transformMatrix !== 'none') {
                const matrix = transformMatrix.split('(')[1].split(')')[0].split(',');
                prevTranslateCert = parseFloat(matrix[4]);
            } else {
                prevTranslateCert = 0;
            }
            certificationsCarousel.classList.add('grabbing');
        });

        certificationsCarousel.addEventListener('touchmove', (e) => {
            if (!isDraggingCert) return;
            const currentTouch = e.touches[0].clientX;
            const diff = currentTouch - startPosCert;
            currentTranslateCert = prevTranslateCert + diff;

            const maxScroll = getLastCertScrollPosition();
            if (currentTranslateCert > 0) {
                currentTranslateCert = currentTranslateCert * 0.5; 
            } else if (Math.abs(currentTranslateCert) > maxScroll) {
                currentTranslateCert = -(maxScroll + (Math.abs(currentTranslateCert) - maxScroll) * 0.5);
            }

            certificationsCarousel.style.transform = `translateX(${currentTranslateCert}px)`;
        });

        certificationsCarousel.addEventListener('touchend', () => {
            isDraggingCert = false;
            certificationsCarousel.classList.remove('grabbing');

            const cardWidthWithGap = getCertCardWidthAndGap();
            const movedBy = currentTranslateCert - prevTranslateCert;

            if (movedBy < -50 && currentCertIndex < certificationCards.length - 1) { 
                currentCertIndex++;
            } else if (movedBy > 50 && currentCertIndex > 0) { 
                currentCertIndex--;
            }

            const maxIndex = certificationCards.length - 1;
            currentCertIndex = Math.max(0, Math.min(currentCertIndex, maxIndex));

            setCertPositionByIndex(); 
        });

        certificationsCarousel.addEventListener('touchcancel', () => {
            isDraggingCert = false;
            certificationsCarousel.classList.remove('grabbing');
            setCertPositionByIndex();
        });
    }

    // --- Lógica para o Modal de Certificados (se houver) ---
    // Se você quiser que clicar no certificado abra um modal com a imagem em tamanho maior,
    // você precisará adicionar um modal HTML e a lógica aqui.
    // Por exemplo:
    const certModal = document.getElementById('certModal'); // Crie este modal no seu HTML
    const certModalImage = document.getElementById('certModalImage'); // Crie este elemento dentro do modal
    const certCloseButton = certModal ? certModal.querySelector('.close-button') : null;

    if (certModal && certModalImage && certificationCards.length > 0) {
        certificationCards.forEach(card => {
            const thumbnail = card.querySelector('.certification-thumbnail');
            if (thumbnail) {
                thumbnail.addEventListener('click', () => {
                    const fullsizeSrc = thumbnail.dataset.fullsizeSrc || thumbnail.src;
                    certModalImage.src = fullsizeSrc;
                    certModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Evita rolagem do fundo
                });
            }
        });

        if (certCloseButton) {
            certCloseButton.addEventListener('click', () => {
                certModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target == certModal) {
                certModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && certModal.style.display === 'flex') {
                certModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os cards de projeto
    const cardsWithReadMore = document.querySelectorAll('.project-card, .event-card'); 

    cardsWithReadMore.forEach(card => {
        const descriptionShort = card.querySelector('.description-short');
        const readMoreBtn = card.querySelector('.read-more-btn');
        const paragraph = descriptionShort.querySelector('p');

        // Clona o parágrafo para medir sua altura real sem o limite de max-height
        // Isso é necessário porque o .description-short tem overflow: hidden e max-height
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.height = 'auto'; // Garante que a altura seja a natural
        tempDiv.style.width = descriptionShort.offsetWidth + 'px'; // Mesma largura do contêiner visível
        tempDiv.style.padding = window.getComputedStyle(descriptionShort).padding; // Copia padding do pai
        tempDiv.innerHTML = paragraph.innerHTML; // Copia o conteúdo do parágrafo
        document.body.appendChild(tempDiv);

        // Compara a altura real do conteúdo com a altura máxima definida
        const isContentLong = tempDiv.offsetHeight > descriptionShort.offsetHeight;
        
        document.body.removeChild(tempDiv); // Remove o div temporário

        if (isContentLong) {
            readMoreBtn.classList.remove('hide'); // Mostra o botão "Ver mais..."
        } else {
            readMoreBtn.classList.add('hide'); // Garante que o botão esteja escondido se o texto for curto
            // Se o texto for curto, remova o gradiente para não ter um "fade" desnecessário
            descriptionShort.classList.add('expanded'); // Adiciona a classe para remover o ::after
        }

        readMoreBtn.addEventListener('click', () => {
            descriptionShort.classList.toggle('expanded'); // Alterna a classe 'expanded'

            if (descriptionShort.classList.contains('expanded')) {
                readMoreBtn.textContent = 'Ver menos...'; // Muda o texto do botão
                // Opcional: Rola para o topo do card quando o texto é expandido
                // card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                readMoreBtn.textContent = 'Ver mais...'; // Volta o texto do botão
                // Opcional: Rola para o topo do card quando o texto é recolhido
                // card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
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