// Função para o carrossel de projetos
function initProjectCarousel() {
    const slider = document.querySelector('.projects-slider');
    const leftButton = document.querySelector('.arrow-left');
    const rightButton = document.querySelector('.arrow-right');
    let projectCards = document.querySelectorAll('.project-card');
    
    let currentPosition = 0;
    let autoScrollInterval;
    let isScrolling = false;

    // Duplicar os cards para criar efeito infinito
    function duplicateCardsForInfiniteEffect() {
        const cardsToDuplicate = Array.from(projectCards);
        cardsToDuplicate.forEach(card => {
            const clone = card.cloneNode(true);
            slider.appendChild(clone);
        });
        
        // Atualizar a lista de cards após duplicação
        projectCards = document.querySelectorAll('.project-card');
    }

    // Calcular a largura do card baseada no dispositivo
    function getCardWidth() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            return slider.offsetWidth + 30;
        } else if (window.innerWidth <= 1024) {
            return (slider.offsetWidth / 2) + 15;
        } else {
            return (slider.offsetWidth / 3) + 10;
        }
    }

    // Calcular quantos cards são visíveis
    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Calcular a posição máxima (final dos cards originais)
    function getMaxPosition() {
        const cardWidth = getCardWidth();
        const visibleCards = getVisibleCardsCount();
        const originalCardsCount = projectCards.length / 2; // Porque duplicamos
        return -((cardWidth - 30) * (originalCardsCount - visibleCards));
    }

    // Rolar suavemente para uma posição
    function smoothScrollTo(position) {
        isScrolling = true;
        slider.scrollTo({
            left: -position,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    // Próximo slide - sempre para a direita
    function nextSlide() {
        if (isScrolling) return;
        
        const cardWidth = getCardWidth();
        const maxPosition = getMaxPosition();
        
        // Avança para o próximo card
        currentPosition -= cardWidth;
        
        // Se chegou ao final dos cards originais, volta suavemente ao início
        if (currentPosition <= maxPosition - cardWidth) {
            // Reset suave para a posição inicial
            setTimeout(() => {
                currentPosition = 0;
                slider.scrollTo({
                    left: -currentPosition,
                    behavior: 'auto'
                });
            }, 500);
        }
        
        smoothScrollTo(currentPosition);
    }

    // Slide anterior (para navegação manual)
    function prevSlide() {
        if (isScrolling) return;
        
        const cardWidth = getCardWidth();
        const maxPosition = getMaxPosition();
        
        // Se está no início, vai para o final
        if (currentPosition >= 0) {
            currentPosition = maxPosition - cardWidth;
        } else {
            currentPosition += cardWidth;
        }
        
        smoothScrollTo(currentPosition);
        restartAutoScroll();
    }

    // Iniciar rolagem automática infinita
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 3000);
    }

    // Parar rolagem automática
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Reiniciar rolagem automática após interação
    function restartAutoScroll() {
        stopAutoScroll();
        setTimeout(startAutoScroll, 8000);
    }

    // Inicialização do carrossel
    function initCarousel() {
        // Duplicar cards para efeito infinito
        duplicateCardsForInfiniteEffect();
        
        // Configurar eventos
        rightButton.addEventListener('click', nextSlide);
        leftButton.addEventListener('click', prevSlide);

        // Pausar ao interagir
        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);

        leftButton.addEventListener('mouseenter', stopAutoScroll);
        rightButton.addEventListener('mouseenter', stopAutoScroll);
        leftButton.addEventListener('mouseleave', startAutoScroll);
        rightButton.addEventListener('mouseleave', startAutoScroll);

        // Iniciar automaticamente
        setTimeout(startAutoScroll, 1000);
    }

    // Navegação entre seções do portfólio
    function initPortfolioNavigation() {
        const navLinks = document.querySelectorAll('#div2 nav a');
        const portfolioSections = document.querySelectorAll('.portfolio-section');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover classe active de todos
                navLinks.forEach(l => l.classList.remove('active'));
                portfolioSections.forEach(s => s.classList.remove('active'));
                
                // Adicionar classe active ao link clicado
                this.classList.add('active');
                
                // Mostrar seção correspondente
                const target = this.getAttribute('data-target');
                document.getElementById(target).classList.add('active');
                
                // Se for a seção Web, reiniciar o carrossel
                if (target === 'website') {
                    stopAutoScroll();
                    currentPosition = 0;
                    smoothScrollTo(currentPosition);
                    setTimeout(startAutoScroll, 1000);
                } else {
                    stopAutoScroll();
                }
            });
        });
    }

    // Redimensionamento da janela
    function handleResize() {
        stopAutoScroll();
        currentPosition = 0;
        smoothScrollTo(currentPosition);
        
        // Limpar e recriar o carrossel para ajustar ao novo tamanho
        const originalCards = document.querySelectorAll('.project-card');
        const half = originalCards.length / 2;
        
        // Remover cards duplicados
        for (let i = half; i < originalCards.length; i++) {
            originalCards[i].remove();
        }
        
        // Recriar efeito infinito
        duplicateCardsForInfiniteEffect();
        
        // Reiniciar auto scroll
        setTimeout(startAutoScroll, 500);
    }

    // Inicializar o carrossel e a navegação
    initCarousel();
    initPortfolioNavigation();
    
    // Configurar redimensionamento
    window.addEventListener('resize', handleResize);
}

// Função para o slide 3D
function slide3d() {
    const imagens = [
        '/src/public/assets/img/1080x1080/infantil.png', 
        '/src/public/assets/img/1080x1080/d27.png', 
        '/src/public/assets/img/1080x1080/h1.png', 
        '/src/public/assets/img/1080x1080/d11.png', 
        '/src/public/assets/img/design/gta1.png', 
        '/src/public/assets/img/1080x1080/otto.png', 
        '/src/public/assets/img/design/MaiDefinitive.png', 
        '/src/public/assets/img/1080x1080/lobo.png', 
        '/src/public/assets/img/design/my.png', 
        '/src/public/assets/img/design/un.png', 
        '/src/public/assets/img/design/fg.png', 
        '/src/public/assets/img/design/nago.png', 
        "/src/public/assets/img/1080x1080/load.gif"
    ];
    
    let fotoClasses = ['foto1', 'foto2', 'foto3', 'foto4', 'foto5'];

    // Índice atual para rastrear a posição atual do slide
    let indiceAtual = 0;
    
    const fotos = document.querySelectorAll('.foto');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const mais = document.querySelector('.mais');
    const close = document.querySelector('#close');
    const image = document.querySelectorAll('.ft');

    // Guardar as classes originais das imagens
    const classesOriginais = [...fotoClasses];

    if (prev) {
        prev.addEventListener('click', () => {
            prev.classList.toggle('active');
            const firstClass = fotoClasses.shift();
            fotoClasses.push(firstClass);
            fotos.forEach((foto, index) => {
                foto.classList.remove(fotoClasses[(index + fotoClasses.length - 1) % fotoClasses.length]);
                foto.classList.add(fotoClasses[index]);
            });

            indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
            fotos.forEach((foto, index) => {
                const nextIndex = (index + 1) % imagens.length;
                foto.src = imagens[(indiceAtual + nextIndex) % imagens.length];
            });
        });
    }

    if (next) {
        next.addEventListener('click', () => {
            next.classList.toggle('active');
            const lastClass = fotoClasses.pop();
            fotoClasses.unshift(lastClass);
            fotos.forEach((foto, index) => {
                foto.classList.remove(fotoClasses[(index + 1) % fotoClasses.length]);
                foto.classList.add(fotoClasses[index]);
            });

            indiceAtual = (indiceAtual + 1) % imagens.length;
            fotos.forEach((foto, index) => {
                const nextIndex = (index + 1) % imagens.length;
                foto.src = imagens[(indiceAtual + nextIndex) % imagens.length];
            });
        });
    }

    if (image.length > 0) {
        image.forEach((ft, index) => {
            ft.addEventListener('click', () => {
                const sl = document.querySelector('#slide');
                sl.classList.add('active');
                const clickedImgSrc = ft.getAttribute('src');
                const imgIndex = imagens.findIndex(imgSrc => imgSrc === clickedImgSrc);
                indiceAtual = imgIndex;
                document.querySelector('#slide img').src = clickedImgSrc;
                fotos.forEach((foto, index) => {
                    foto.src = imagens[(indiceAtual + index) % imagens.length];
                });
            });
        });
    }

    if (mais) {
        mais.addEventListener('click', () => {
            const sl = document.querySelector('#slide');
            sl.classList.toggle('active');
        });
    }

    if (close) {
        close.addEventListener('click', () => {
            fotos.forEach((foto, index) => {
                foto.classList.remove(fotoClasses[index]);
                foto.classList.add(classesOriginais[index]);
            });
            fotoClasses = [...classesOriginais];
            indiceAtual = 0;
            fotos.forEach((foto, index) => {
                foto.src = imagens[(indiceAtual + index) % imagens.length];
            });
            // Fechar o slide removendo a classe 'active'
            const sl = document.querySelector('#slide');
            sl.classList.remove('active');
            prev.classList.remove('active');
            next.classList.remove('active');
        });
    }
}

// Função para copiar texto para a área de transferência e exibir mensagem
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        const originalText = element.innerHTML;
        element.innerHTML = "Link copiado";
        setTimeout(function() {
            element.innerHTML = originalText;
        }, 2000);
    }, function(err) {
        console.error("Erro ao copiar o texto: ", err);
    });
}

// Função para configurar a cópia de email
function setupEmailCopy() {
    const emailBotao = document.getElementById('email');
    if (emailBotao) {
        emailBotao.addEventListener('click', event => {
            const contact_email = document.querySelector('#contact-email');
            contact_email.classList.toggle('active');
        });
    }

    const contact_email = document.getElementById("contact-email");
    if (contact_email) {
        contact_email.addEventListener("click", function(event) {
            event.preventDefault();
            copyToClipboard("yale.designers@gmail.com", this);
        });
    }
}

// Função para o menu mobile
function setupMobileMenu() {
    const btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const menuL = document.querySelector('#menuL');
            menuL.classList.toggle('active');
        });
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initProjectCarousel();
    setupEmailCopy();
    setupMobileMenu();
});

// Inicialização do slide3d quando a página estiver totalmente carregada
window.addEventListener('load', slide3d);
window.addEventListener('resize', slide3d);