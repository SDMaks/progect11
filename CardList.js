export default class CardList {
  constructor(api, createCardFunction) {
    this.api = api;
    this._createCardFunction = createCardFunction;
  }

  cardList = (body, element) => {
    this._view = document.createElement("div");
    this._view.classList.add("places-list");
    this._view.classList.add("root__section");

    body.insertBefore(this._view, element);
  };

  render() {
    this.api
      .studentsCards()

      .then((result) => {
        result.forEach((item) => {
          this.add(item.link, item.name, item.likes, item.owner._id, item._id);
        });
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так: ..."
      });
  }

  add = (image, description, likeNumber, id, idCard) => {
    this.card = this._createCardFunction(
      image,
      description,
      likeNumber,
      this.api,
      idCard
    ).create(id);
    this._view.appendChild(this.card);
  };
}
