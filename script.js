document.addEventListener('DOMContentLoaded', function() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const cards = alphabets.concat(alphabets.map(letter => letter.toLowerCase())); // Combine uppercase and lowercase alphabets
    let flippedCards = [];
    let matchedCards = [];
  
    // Load audio files from the "sounds" folder
    const correctSound = new Audio('sounds/correct.mp3');
    const wrongSound = new Audio('sounds/wrong.mp3');
  
    function shuffleCards() {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    }
  
    function createBoard() {
      const gameContainer = document.getElementById('game-container');
      shuffleCards();
      cards.forEach(alphabet => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.alphabet = alphabet;
        card.textContent = alphabet;
        gameContainer.appendChild(card);
      });
    }
  
    function flipCard() {
      if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        flippedCards.push(this);
        this.classList.add('flipped');
        if (flippedCards.length === 2) {
          checkMatch(); // No delay for checking match
        }
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
      const alphabet1 = card1.dataset.alphabet;
      const alphabet2 = card2.dataset.alphabet;
      if (alphabet1.toLowerCase() === alphabet2.toLowerCase()) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
          setTimeout(() => {
            alert('Congratulations! You won!');
          }, 500); // Delay victory message for better UX
        }
        card1.classList.add('correct');
        card2.classList.add('correct');
        correctSound.play(); // Play correct sound
      } else {
        card1.classList.add('incorrect');
        card2.classList.add('incorrect');
        wrongSound.play(); // Play wrong sound
        setTimeout(() => {
          card1.classList.remove('flipped', 'incorrect');
          card2.classList.remove('flipped', 'incorrect');
          card1.classList.add('wrong');
          card2.classList.add('wrong');
          flippedCards = [];
          setTimeout(() => {
            card1.classList.remove('wrong');
            card2.classList.remove('wrong');
          }, 1000); // Remove wrong class after 1 second
        }, 1000); // Delay flipping back unmatched cards
      }
    }
  
    document.getElementById('game-container').addEventListener('click', function(event) {
      if (event.target.classList.contains('card')) {
        flipCard.call(event.target);
      }
    });
  
    createBoard();
  });
  