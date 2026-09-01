// ==========================================
// 1. ROLAGEM SUAVE DO MENU
// ==========================================
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 2. MODAL (LIGHTBOX) PARA IMAGENS DO CARROSSEL
// ==========================================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgExpanded");
const fecharModal = document.querySelector(".close-modal");

// Pega apenas as imagens de dentro do carrossel e adiciona o clique
const imagensCarrossel = document.querySelectorAll(".carousel-slide img");

imagensCarrossel.forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = "flex"; 
        modalImg.src = this.src;      
    });
});

// Fecha o modal ao clicar no 'X'
fecharModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Fecha o modal ao clicar fora da imagem (no fundo escuro)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// ==========================================
// 3. LÓGICA DO CARROSSEL DE IMAGENS
// ==========================================
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const btnNext = document.querySelector('.carousel-btn.next');
const btnPrev = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

const moveCarousel = (index) => {
    // Loop infinito nas bordas
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    // Move o carrossel (100% de largura por slide)
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
};

// Botão Próximo
btnNext.addEventListener('click', () => {
    moveCarousel(currentIndex + 1);
});

// Botão Anterior
btnPrev.addEventListener('click', () => {
    moveCarousel(currentIndex - 1);
});