/*
  Можно лучше: класс Form не соответсвует принципу единственной ответсвенности т.к.
  реализует поведение трех разных форм
  Нужно оставить в нем только функционал который есть во всех формах, а для 
  каждой формы сделать отдельный класс который наследуется от класса Form

*/

export default class Form {
  constructor(
    validator,
    template,
    buttonPopUp,
    buttonArr,
    profileSubmit,
    inputTitle,
    popUp,
    inputs,

    api,
    popUpForm
  ) {
    this.validator = validator;
    this.template = template;
    this.button = buttonPopUp;
    this.Arr = buttonArr;
    this.profileSubmit = profileSubmit;
    this.inputTitle = inputTitle;

    this.popUp = popUp;
    this.inputs = inputs;

    this.api = api;
    this.popUpForm = popUpForm;
  }

  render() {
    this.view = this.template;
    this.button = this.button;
    this.Arr = this.Arr;

    const validator = new this.validator(this.view, this.button, this.Arr);
    validator.setEventListeners(
      this.popUp,
      this.inputs,
      this.view,
      this.inputTitle
    );
  }
  submit = (event, upDateProfile, nameProfile, aboutProfile) => {
    event.preventDefault();

    this.profileSubmit();
    this.api
      .profile(nameProfile.value, aboutProfile.value)
      .then(this.textSubmitButton(true))
      .then((result) => {
        this.name = result.name;
        this.about = result.about;

        upDateProfile.setUserInfo();
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так: ..."
      })
      .finally(() => {
        /* Можно лучше: закрывать попап нужно если сервер ответил подтверждением - т.е в блоке then */
        this.popUpForm.closeForm();
        this.textSubmitButton(false);
      });
  };

  submitImageAvatar = (event, avatarInput, avatarNew) => {
    event.preventDefault();
    this.api
      .avatarSubmit(avatarInput.value)
      .then(this.textSubmitButton(true))

      .then((result) => {
        avatarNew.avatarUpDate(result.avatar);
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так: ..."
      })
      .finally(() => {
        /* Можно лучше: закрывать попап нужно если сервер ответил подтверждением - т.е в блоке then */
        this.popUpForm.closeForm();
        this.textSubmitButton(false);
      });
  };

  submitImage(list, description, image) {
    event.preventDefault();

    this.api
      .cardSubmit(description.value, image.value)

      .then(this.textSubmitButton(true))
      .then((result) => {
        list.add(
          result.link,
          result.name,
          result.likes,
          result.owner._id,
          result._id
        );
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так: ..."
      })
      .finally(() => {
        /* Можно лучше: закрывать попап нужно если сервер ответил подтверждением - т.е в блоке then */
        this.popUpForm.closeForm();
        this.textSubmitButton(false);
      });
  }

  textSubmitButton(isValid) {
    if (isValid) {
      this.Arr.forEach((button) => {
        button.innerText = "Загрузка...";
      });
    } else {
      this.Arr.forEach((button) => {
        button.innerText = "+";
      });
    }
  }

  setEventListeners(upDateProfile, nameProfile, aboutProfile) {
    this.template.addEventListener("submit", () => {
      this.submit(event, upDateProfile, nameProfile, aboutProfile);
      this.removeEventListeners();
    });
  }

  setEventListenersCard(list, description, image) {
    this.template.addEventListener("submit", () => {
      this.submitImage(list, description, image);
      this.removeEventListeners();
    });
  }

  setEventListenersAvatar(avatarInput, avatarNew) {
    this.template.addEventListener("submit", () => {
      this.submitImageAvatar(event, avatarInput, avatarNew);
      this.removeEventListeners();
    });
  }

  removeEventListeners() {
    this.template.removeEventListener("submit", this.submit);
  }
}
