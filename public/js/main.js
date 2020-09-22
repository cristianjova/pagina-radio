class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Indice de palabra actual
    const current = this.wordIndex % this.words.length;
    // Palabra completa
    const fullTxt =  this.words[current];

    // Comprobar si se esta "borrando"
    if(this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length -1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length +1);
    }

    // Agrego txt en el elemento
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Veloc. de esc. inicial
    let typeSpeed = 300;

    // Veloc. en borrado
    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // Si la palabra esta completa
    if(!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    // Dispara type() segun typeSpeed
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Inicar al cargar la página
document.addEventListener('DOMContentLoaded', init);

// Función que inicia todo
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}