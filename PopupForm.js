export default class PopupForm extends Popup {
  constructor(popUp, popupButton, addButton, form) {
    super(popUp, popupButton);
    this.addButton = addButton;
    this.form = form;
  }

  setEventListeners() {
    this.addButton.addEventListener("click", () => {
      super.openEvent();
      this.removeEventListeners();
    });
  }

  closeForm() {
    super.close();
  }

  removeEventListeners() {
    this.addButton.removeEventListener("click", super.openEvent);
  }
}
