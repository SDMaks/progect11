export default class PopupImage extends Popup {
  constructor(popUp, popupButton, placesList, imagePopUpCard) {
    super(popUp, popupButton);
    this.placesList = placesList;
    this.image = imagePopUpCard;
    this.popUp = popUp;
  }

  setEventListeners() {
    this.placesList.addEventListener("click", (event) => {
      this.openImage(event);
      this.removeEventListeners();
    });
  }

  openImage = (event) => {
    if (event.target.closest(".place-card__image")) {
      this.image.src = event.target.style.backgroundImage.slice(5, -2);
      super.openEvent();
    }
  };

  removeEventListeners() {
    this.placesList.removeEventListener("click", (event) => {
      this.openImage(event);
    });
  }
}
