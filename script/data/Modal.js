class Modal {
  constructor() {
    this.modalContainer = document.querySelector('[data-modal]');
    this.modalContentArea = this.modalContainer.querySelector('.modal-content');

    this.attachEvents();
  }

  show(content) {
    this.modalContentArea.appendChild(content);
    this.modalContainer.style.display = 'flex';
  }

  hide() {
    this.modalContentArea.innerHTML = '';
    this.modalContainer.style.display = 'none';
  }

  attachEvents() {
    this.modalContainer.addEventListener("click", () => {
      this.hide();
    }, false)
  }
}

export default Modal;