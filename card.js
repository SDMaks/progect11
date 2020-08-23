export default class Card {
  constructor(imageValue, descriptionValue, likeNumber, api, idCard) {
    this.imageValue = imageValue;
    this.descriptionValue = descriptionValue;
    this.likeNumber = likeNumber;
    this.api = api;
    this.idCard = idCard;
  }

  create = (id) => {
    const placeCard = document.createElement("div"); //контейнер с карточкой
    placeCard.classList.add("place-card"); // контейнеру присваиваем класс

    const placeCardImage = document.createElement("div");
    placeCardImage.classList.add("place-card__image"); // куда добавляем путь к картинке

    placeCardImage.style.backgroundImage = `url(${this.imageValue})`;

    /*
      Можно лучше: не хардкодить id, а использовать данные, которые возвращает сервер
    */
    if (id === "8b8f8ae162d5dbf129f6bde5") {
      const buttonDelete = document.createElement("button");
      buttonDelete.classList.add("place-card__delete-icon");
      placeCardImage.appendChild(buttonDelete);
    }

    const placeCardDescription = document.createElement("div");
    placeCardDescription.classList.add("place-card__description");

    const placeCardName = document.createElement("h3");
    placeCardName.classList.add("place-card__name"); // куда вставляем описание картинки
    placeCardName.textContent = this.descriptionValue;

    const buttonLike = document.createElement("button");
    buttonLike.classList.add("place-card__like-icon");

    const likeTrue = this.likeNumber.some(function (item) {
      return item._id.includes("8b8f8ae162d5dbf129f6bde5");
    });

    if (likeTrue) {
      buttonLike.classList.add("place-card__like-icon_liked");
    }

    const containerLike = document.createElement("div");
    containerLike.classList.add("place-card__like");

    const numberLike = document.createElement("span");
    numberLike.classList.add("place-card__like-number");
    numberLike.innerText = this.likeNumber.length;

    placeCard.appendChild(placeCardImage);

    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);

    containerLike.appendChild(buttonLike);
    containerLike.appendChild(numberLike);

    placeCardDescription.appendChild(containerLike);

    this._view = placeCard;
    this.placeCardImage = placeCardImage;
    this.numberLike = numberLike;
    this.setEventListeners();
    return this._view;
  };

  setEventListeners() {
    /** Можно лучше:
     *
     * Найти элементы с классами place-card__like-icon и place-card__delete-icon один раз в методе create, вынести в константы
     * и переиспользовать в методах setEventListeners и removeEventListeners, а не искать их несколько раз
     * в каждом из методов
     */
    this._view
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    const deleteButton = this._view.querySelector(".place-card__delete-icon");
    if (deleteButton) {
      deleteButton.addEventListener("click", this.remove);
    }
  }

  like = (event) => {
    const image = event.target.closest(".place-card");
    const imageId = image.firstElementChild;

    const id = imageId.getAttribute("id");

    if (!event.target.classList.contains("place-card__like-icon_liked")) {
      this.api
        .likeSubmit(this.idCard)

        .then((result) => {
          this.numberLike.innerText = result.likes.length;
          event.target.classList.add("place-card__like-icon_liked");
        })
        .catch((err) => {
          alert(err); // "Что-то пошло не так: ..."
        });
    } else {
      this.api
        .likeDeleteSubmit(this.idCard)

        .then((result) => {
          this.numberLike.innerText = result.likes.length;
          event.target.classList.remove("place-card__like-icon_liked");
        })
        .catch((err) => {
          alert(err); // "Что-то пошло не так: ..."
        });
    }
  };

  remove = (event) => {
    if (event.target.className === "place-card__delete-icon") {
      event.stopPropagation();

      const result = window.confirm(
        "Вы действительно хотите удалить фотографию?"
      );
      if (result) {
        this.api
          .cardDelete(this.idCard)

          .then(() => {
            event.target.closest(".place-card").remove();
          })
          .catch((err) => {
            alert(err); // "Что-то пошло не так: ..."
          });
      }
    }
  };
}
