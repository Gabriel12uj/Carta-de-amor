document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const specialMessage = document.getElementById('specialMessage');
    const revealButton = document.getElementById('revealButton');
    const photoButton = document.getElementById('photoButton');
    const photoContainer = document.getElementById('photoContainer');
    const memoryButton = document.getElementById('memoryButton');
    const memoryContainer = document.getElementById('memoryContainer');
    const memoryForm = document.getElementById('memoryForm');
    const memoryInput = document.getElementById('memoryInput');
    const memoryList = document.getElementById('memoryList');
    const slideshowContainer = document.getElementById('slideshowContainer');
    const slideshow = document.getElementById('slideshow');
    const slideControls = document.getElementById('slideControls');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const bgBubbles = document.getElementById('bgBubbles');
    const envelopeDecoration = document.getElementById('envelopeDecoration');
    const heartsContainer = document.getElementById('heartsContainer');
    const petalsContainer = document.getElementById('petalsContainer');
    const confettiContainer = document.getElementById('confettiContainer');

    // Variáveis para as animações
    let isCardVisible = false;
    let isSpecialMessageVisible = false;
    let currentSlide = 0;
    let slides = []; // Armazenará as imagens do slideshow
    let isMusicPlaying = false;
    
    // Inicialização
    initLoading();
    createBubbles();
    createEnvelopeDecorations();
    
    // Função para simular carregamento inicial
    function initLoading() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 800);
        }, 2000);
    }
    
    // Criar bolhas de fundo
    function createBubbles() {
        for (let i = 0; i < 20; i++) {
            const size = Math.random() * 100 + 30;
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.top = `${Math.random() * 100}%`;
            bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            bgBubbles.appendChild(bubble);
        }
    }
    
    // Adicionar corações decorativos ao envelope
    function createEnvelopeDecorations() {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.classList.add('envelope-hearts');
            heart.innerHTML = '❤';
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.opacity = '0.3';
            heart.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
            heart.style.animationDuration = `${Math.random() * 5 + 3}s`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            envelopeDecoration.appendChild(heart);
        }
    }
    
    // Evento de clique no envelope
    envelope.addEventListener('click', function() {
        if (!isCardVisible) {
            envelope.classList.add('open');
            
            setTimeout(() => {
                envelope.style.transform = 'translateY(-1000px) scale(0.5)';
                envelope.style.opacity = '0';
                
                setTimeout(() => {
                    envelope.style.display = 'none';
                    showCard();
                }, 500);
            }, 1000);
        }
    });
    
    // Mostrar o cartão
    function showCard() {
        card.style.display = 'block';
        isCardVisible = true;
        
        setTimeout(() => {
            card.classList.add('visible');
            startHeartAnimation();
            startPetalAnimation();
        }, 100);
    }
    
    // Evento para revelar mensagem especial
    revealButton.addEventListener('click', function() {
        if (!isSpecialMessageVisible) {
            specialMessage.classList.add('show');
            revealButton.textContent = 'Ocultar mensagem';
            startConfettiAnimation();
        } else {
            specialMessage.classList.remove('show');
            revealButton.textContent = 'Mensagem especial';
        }
        isSpecialMessageVisible = !isSpecialMessageVisible;
    });
    
    // Evento para mostrar/ocultar contêiner de fotos
    photoButton.addEventListener('click', function() {
        // Esconder outros containers
        memoryContainer.classList.remove('show');
        
        if (photoContainer.classList.contains('show')) {
            photoContainer.classList.remove('show');
            slideshowContainer.classList.add('show');
        } else {
            slideshowContainer.classList.remove('show');
            photoContainer.classList.add('show');
        }
    });
    
    // Evento para mostrar/ocultar memórias
    memoryButton.addEventListener('click', function() {
        // Esconder outros containers
        photoContainer.classList.remove('show');
        slideshowContainer.classList.remove('show');
        
        memoryContainer.classList.toggle('show');
    });
    
    // Adicionar memória
    memoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (memoryInput.value.trim() !== '') {
            const memoryItem = document.createElement('div');
            memoryItem.classList.add('memory-item');
            memoryItem.textContent = memoryInput.value;
            memoryList.insertBefore(memoryItem, memoryList.firstChild);
            
            // Adicionar efeito de entrada
            memoryItem.style.opacity = '0';
            memoryItem.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                memoryItem.style.transition = 'all 0.5s ease';
                memoryItem.style.opacity = '1';
                memoryItem.style.transform = 'translateY(0)';
            }, 10);
            
            memoryInput.value = '';
        }
    });
    
    // Selecionar foto e criar slideshow
    const photoFrame = document.querySelector('.photo-frame');
    photoFrame.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = true;
        
        fileInput.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                processImages(this.files);
            }
        });
        
        fileInput.click();
    });
    
    // Processar imagens selecionadas
    function processImages(files) {
        // Limpar slideshow
        slideshow.innerHTML = '';
        slideControls.innerHTML = '';
        slides = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Criar slide
                    const slide = document.createElement('div');
                    slide.classList.add('slide');
                    
                    // Criar imagem
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    img.style.objectFit = 'contain';
                    
                    slide.appendChild(img);
                    slideshow.appendChild(slide);
                    
                    // Criar controle de slide (ponto)
                    const dot = document.createElement('div');
                    dot.classList.add('slide-dot');
                    dot.dataset.index = slides.length;
                    dot.addEventListener('click', function() {
                        goToSlide(parseInt(this.dataset.index));
                    });
                    
                    slideControls.appendChild(dot);
                    slides.push(slide);
                    
                    // Se for a primeira imagem, também atualizar o placeholder
                    if (slides.length === 1) {
                        document.querySelector('.photo-placeholder').innerHTML = '';
                        const photoImg = img.cloneNode(true);
                        document.querySelector('.photo-placeholder').appendChild(photoImg);
                    }
                    
                    // Atualizar slides
                    updateSlides();
                };
                
                reader.readAsDataURL(file);
            }
        }
    }
    
    // Atualizar slides
    function updateSlides() {
        if (slides.length > 0) {
            // Ajustar largura do slideshow
            slideshow.style.width = `${slides.length * 100}%`;
            
            // Posicionar slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.width = `${100 / slides.length}%`;
            }
            
            // Atualizar posição
            slideshow.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
            
            // Atualizar pontos de navegação
            const dots = slideControls.querySelectorAll('.slide-dot');
            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Mostrar slideshow e esconder placeholder
            photoContainer.classList.remove('show');
            slideshowContainer.classList.add('show');
        }
    }
    
    // Navegar para um slide específico
    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
            updateSlides();
        }
    }
    
    // Controle de música
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play();
            musicToggle.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Animação de corações
    function startHeartAnimation() {
        setInterval(() => {
            if (isCardVisible) {
                createFallingElement('❤', heartsContainer, 'falling-animation', '#e75a7c');
            }
        }, 2000);
    }
    
    // Animação de pétalas
    function startPetalAnimation() {
        setInterval(() => {
            if (isCardVisible) {
                createFallingElement('🌸', petalsContainer, 'falling-animation');
            }
        }, 3000);
    }
    
    // Animação de confetti (quando revelar mensagem especial)
    function startConfettiAnimation() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 100);
        }
    }
    
    // Criar elemento que cai (coração, pétala)
    function createFallingElement(symbol, container, className, color) {
        const element = document.createElement('div');
        element.innerHTML = symbol;
        element.classList.add(className);
        
        // Estilo aleatório
        element.style.left = `${Math.random() * 100}%`;
        element.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
        element.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        if (color) {
            element.style.color = color;
        }
        
        container.appendChild(element);
        
        // Remover após a animação
        setTimeout(() => {
            element.remove();
        }, 10000);
    }
    
    // Criar confetti
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('falling-animation');
        
        // Estilo do confetti
        const size = Math.random() * 10 + 5;
        const colors = ['#e75a7c', '#f18a9b', '#ffd1dc', '#88b9ff', '#9b59b6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '0';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        confettiContainer.appendChild(confetti);
        
        // Remover após a animação
        setTimeout(() => {
            if (confetti.parentNode === confettiContainer) {
                confettiContainer.removeChild(confetti);
            }
        }, 5000);
    }
    
    // Prevenção de arrastar imagens
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
    
    // Pré-carregar alguns recursos
    function preloadResources() {
        // Criar alguns confettis iniciais (invisíveis) para pré-carregar animações
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.style.opacity = '0';
            confetti.style.position = 'absolute';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 100);
        }
    }
    
    preloadResources();
});

