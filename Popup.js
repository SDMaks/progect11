export default class Popup {
  constructor(popUp, popupButton) {
    this.popupButton = popupButton;
    this.popup = popUp;
  }

  closeEvent() {
    this.popupButton.addEventListener("click", () => {
      this.close();
    });
    this.closeEsc();
  }

  openEvent() {
    this.popup.classList.toggle("popup_is-opened");
  }

  closeEsc() {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 27) {
        this.close();
      }
    });
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
    this.removeEventListeners();
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.closeEsc);
    this.popupButton.removeEventListener("click", this.close);
  }
}
