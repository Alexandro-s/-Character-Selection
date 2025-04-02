function preloadImages() {
    const personagens = ['thor', 'homem-de-ferro', 'viuva-negra', 'hulk', 
                        'capitao-america', 'ultron', 'doutor-doom', 'nova', 'fenix'];
    
    personagens.forEach(personagem => {
        const img = new Image();
        img.src = `imagens/${personagem}.png`;
        img.onerror = () => console.error(`Erro ao carregar: ${personagem}`);
    });
}

window.addEventListener('load', preloadImages);

document.addEventListener('DOMContentLoaded', function() {
    const personagens = document.querySelectorAll('.lista-de-personagens .personagem');
    
    personagens.forEach(personagem => {
        personagem.addEventListener('click', function() {
            const isJogador2 = this.classList.contains('jogador-2-selecionado');
            const jogadorNumero = isJogador2 ? 2 : 1;
            const selector = isJogador2 ? '.jogador-2-selecionado' : ':not(.jogador-2-selecionado)';
            
            // Remove seleções anteriores
            document.querySelectorAll(`.lista-de-personagens .personagem${selector}`).forEach(p => {
                p.classList.remove('selecionado');
                p.style.animation = 'none';
            });
            
            // Adiciona seleção ao novo personagem
            this.classList.add('selecionado');
            
            // Atualiza visualização
            const personagemId = this.id;
            const nomePersonagem = this.getAttribute('data-name');
            
            document.querySelector(`#personagem-jogador-${jogadorNumero}`).src = `imagens/${personagemId}.png`;
            
            const nomeElemento = document.querySelector(`#nome-jogador-${jogadorNumero}`);
            if (nomeElemento) nomeElemento.textContent = nomePersonagem;
            
            // Animações
            this.style.animation = `c-glowing-${isJogador2 ? 'red' : 'blue'} 0.3s ease-in-out infinite alternate`;
            
            // Efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = 'scale(1.07)', 100);
        });
    });
});