export default class Api {
  constructor(group, id) {
    this.group = group;
    this.id = id;
  }

  apiRespond = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  };

  getUser() {
    /* Можно лучше: адрес сервера https://praktikum.tk так же передавать как параметр конструктора */
    return fetch(`https://praktikum.tk/${this.group}/users/me`, {
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  }

  studentsCards() {
    return fetch(`https://praktikum.tk/cohort12/cards`, {
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  }

  profile = (profileName, profileAbout) => {
    return fetch(`https://praktikum.tk/${this.group}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profileName,
        about: profileAbout,
      }),
    }).then((res) => this.apiRespond(res));
  };

  cardSubmit = (description, image) => {
    return fetch(`https://praktikum.tk/${this.group}/cards`, {
      method: "POST",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: description,
        link: image,
      }),
    }).then((res) => this.apiRespond(res));
  };

  cardDelete = (cardId) => {
    return fetch(`https://praktikum.tk/${this.group}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  };

  likeSubmit = (cardId) => {
    return fetch(`https://praktikum.tk/${this.group}/cards/like/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  };

  likeDeleteSubmit = (cardId) => {
    return fetch(`https://praktikum.tk/${this.group}/cards/like/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  };

  avatarSubmit = (avatar) => {
    return fetch(`https://praktikum.tk/${this.group}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this.apiRespond(res));
  };
}
