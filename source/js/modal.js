const MODAL_VISIBLE_CLASS = 'modal--visible';

class Modal {
  constructor (button) {
    this.button = button;
    this.modal = document.querySelector('[data-modal]');
    this.modalContent = this.modal.querySelector('[data-modal-content]')
    this.modalCloseButton = this.modal.querySelector('[data-modal-close]');
    this.modalHeading = this.modal.querySelector('[data-modal-heading]');
    this.modalYear = this.modal.querySelector('[data-modal-year]');

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.closeModalOnEsc = this.closeModalOnEsc.bind(this);
    this.closeModalOnClickOutside = this.closeModalOnClickOutside.bind(this);
    this.addSpecialCloseListeners = this.addSpecialCloseListeners.bind(this);
  }

  init() {
    this.button.addEventListener('click', this.showModal);
    this.modalCloseButton.addEventListener('click', this.hideModal);
  }

  showModal () {
    this.modal.classList.add(MODAL_VISIBLE_CLASS);
    this.addSpecialCloseListeners();

    const orderType = this.button.dataset.modalTrigger;
    this.modalHeading.textContent = `Заказать ${orderType}`;
    this.modalYear.textContent = `${new Date().getFullYear()}`;
  }

  addSpecialCloseListeners () {
    document.addEventListener('keydown', this.closeModalOnEsc);
  }

  hideModal () {
    this.modal.classList.remove(MODAL_VISIBLE_CLASS);
  }

  closeModalOnEsc (evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      this.hideModal()
    }
  }

  closeModalOnClickOutside (evt) {
    if (!this.modalContent.contains(evt.target)) {
      this.hideModal()
    }
  }
}

const buttons = [...document.querySelectorAll('[data-modal-trigger]')];
buttons.forEach(button => {
  const buttonController = new Modal(button);
  buttonController.init();
})
