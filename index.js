document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const revealButton = document.getElementById('revealButton');
    const photoButton = document.getElementById('photoButton');
    const specialMessage = document.getElementById('specialMessage');
    const photoContainer = document.getElementById('photoContainer');
    const photoFrame = document.querySelector('.photo-frame');
    const heartsContainer = document.getElementById('heartsContainer');
    const petalsContainer = document.getElementById('petalsContainer');
    const musicControl = document.getElementById('musicControl');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    // Abrir envelope
    envelope.addEventListener('click', function() {
        envelope.classList.add('open');
        
        setTimeout(() => {
            envelope.style.transform = 'translateY(-100%) scale(0.5)';
            envelope.style.opacity = '0';
            
            setTimeout(() => {
                envelope.style.display = 'none';
                card.classList.add('visible');
                startFloatingAnimation();
            }, 500);
        }, 1000);
    });
    
    // Revelar mensagem especial
    revealButton.addEventListener('click', function() {
        specialMessage.classList.toggle('show');
        
        if (specialMessage.classList.contains('show')) {
            revealButton.textContent = 'Esconder mensagem';
            createHearts();
        } else {
            revealButton.textContent = 'Mensagem especial';
        }
    });
    
    // Mostrar foto
    photoButton.addEventListener('click', function() {
        photoContainer.classList.toggle('show');
        
        if (photoContainer.classList.contains('show')) {
            photoButton.textContent = 'Esconder foto';
            createPetals();
        } else {
            photoButton.textContent = 'Ver foto';
        }
    });
    
    // Adicionar foto
    photoFrame.addEventListener('click', function() {
        // Simulando um file input click
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    photoFrame.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    photoFrame.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
        
        fileInput.click();
    });
    
    // Controle de música
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
            musicToggle.textContent = '🔊';
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.textContent = '🎵';
        }
    });
    
    // Criar corações animados
    function createHearts() {
        heartsContainer.innerHTML = '';
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 200);
        }
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.color = getRandomColor();
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = (Math.random() * 40 + 60) + '%';
        
        heartsContainer.appendChild(heart);
        
        // Animar coração
        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = `translateY(${-Math.random() * 300 - 100}px) rotate(${Math.random() * 360}deg)`;
            heart.style.transition = `all ${Math.random() * 3 + 3}s ease`;
        }, 50);
        
        // Remover coração após a animação
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Criar pétalas de flores
    function createPetals() {
        petalsContainer.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createPetal();
            }, i * 300);
        }
    }
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Criando uma pétala de flor com CSS
        petal.style.width = Math.random() * 15 + 20 + 'px';
        petal.style.height = Math.random() * 10 + 15 + 'px';
        petal.style.borderRadius = '100% 0 100% 0';
        petal.style.background = getRandomPastelColor();
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '0%';
        
        petalsContainer.appendChild(petal);
        
        // Animar pétala
        setTimeout(() => {
            petal.style.opacity = '0.8';
            petal.style.transform = `translateY(${Math.random() * 500 + 200}px) translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 720}deg)`;
            petal.style.transition = `all ${Math.random() * 5 + 5}s ease`;
        }, 50);
        
        // Desvanecer pétala no final da animação
        setTimeout(() => {
            petal.style.opacity = '0';
        }, 4000);
        
        // Remover pétala após a animação
        setTimeout(() => {
            petal.remove();
        }, 10000);
    }
    
    // Efeito de flutuação suave no cartão
    function startFloatingAnimation() {
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Retornar à posição original quando o mouse sai
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
    
    // Funções auxiliares para cores
    function getRandomColor() {
        const colors = ['#e75a7c', '#f18a9b', '#f08080', '#db7093', '#ff69b4', '#ff1493'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function getRandomPastelColor() {
        const colors = ['#ffb6c1', '#ffc0cb', '#ffdab9', '#ffe4e1', '#e6e6fa', '#f0e6ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Animação de entrada para alguns elementos
    function animateElements() {
        const elements = document.querySelectorAll('.card-title, .greeting, .button, .signature');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            }, index * 300);
        });
    }
    
    // Iniciar com música desativada
    bgMusic.volume = 0.5;
});

