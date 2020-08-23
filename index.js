!(function () {
  const root = document.querySelector(".root");

  const addButton = root.querySelector(".user-info__button"); //выбираем кнопку добавления карточки

  const popUpClose = root.querySelector("#close-card"); //переменная кнопки закрытия всплывающего окна
  const popUpButton = root.querySelector("#popup__button");

  const buttonAddForms = root.querySelectorAll(".popup__button");
  const formCardImage = document.forms.new; //Переменная формы

  const description = formCardImage.elements.name; // переменная для ввода названия
  const image = formCardImage.elements.link; // переменная поля ввода адреса ссылки

  /*//////////////////////*/

  const popUpCard = root.querySelector("#popup-card");
  const popUpProfile = root.querySelector("#popup-profile"); //кнопка закрытия профиля

  const editProfileButton = root.querySelector(".user-info-profile__button");
  const buttonCloseProfile = root.querySelector("#close-profile"); //кнопка закрытия профиля

  const formProfile = document.forms.newProfile;

  const nameProfile = formProfile.elements.nameprofile; // переменная для ввода имени профиля
  const aboutProfile = formProfile.elements.about; // переменная для ввода описания профиля

  const userTitle = root.querySelector(".user-info__name"); //переменная заголовка пользователя
  const userInfoJob = root.querySelector(".user-info__job"); //переменная подзаголовка  описании профессии пользователя

  const placeCardImage = root.querySelector(".place-card__image");

  const imagePopup = root.querySelector("#popup-image");
  const imagePopUpCard = root.querySelector(".image-popup__card");

  const buttonCloseImage = root.querySelector("#close-image");

  const inputs = root.querySelectorAll(".popup__input-error-message");
  const inputsArr = Array.from(inputs);

  const avatarImage = root.querySelector(".user-info__photo");

  const popUpAvatar = root.querySelector("#popup-avatar");
  const popUpCloseAvatar = root.querySelector("#close-avatar");
  const popUpButtonAvatar = root.querySelector(".user-info__photo");
  const formAvatar = document.forms.newAvatar;

  const avatarInput = formAvatar.elements.avatar;

  const api = new Api("cohort12", "ea84dadb-b713-4a58-a54d-32873592b22e");

  const avatarNew = new Avatar(avatarImage);

  const upDateProfile = new UserInfo(
    nameProfile,
    aboutProfile,
    userTitle,
    userInfoJob,
    avatarNew,
    api
  );

  upDateProfile.setUserInfo();

  // функция создания  карточки ++++++++++++++++++++++++

  const createCardFunction = (
    imageValue,
    descriptionValue,
    likeNumber,
    api,
    idCard
  ) => new Card(imageValue, descriptionValue, likeNumber, api, idCard);

  const list = new CardList(api, createCardFunction);

  list.cardList(root, popUpProfile);

  list.render();

  popUpButton.setAttribute("disabled", true);

  const placesList = document.querySelector(".places-list");

  profileSubmit = () => {
    upDateProfile.setUserInfo();
  };
  const PopImage = new PopupImage(
    imagePopup,
    buttonCloseImage,
    placesList,
    imagePopUpCard
  );
  PopImage.setEventListeners();
  PopImage.closeEvent();

  const PopCard = new PopupForm(
    popUpCard,
    popUpClose,
    addButton,
    formCardImage
  );
  PopCard.setEventListeners();
  PopCard.closeEvent();

  const PopProfile = new PopupForm(
    popUpProfile,
    buttonCloseProfile,
    editProfileButton,
    formProfile
  );
  PopProfile.setEventListeners();
  PopProfile.closeEvent();

  const PopAvatar = new PopupForm(
    popUpAvatar,
    popUpCloseAvatar,
    popUpButtonAvatar,
    formAvatar
  );
  PopAvatar.setEventListeners();
  PopAvatar.closeEvent();

  inputTitle = () => {
    upDateProfile.inputTitle();
  };

  const form = new Form(
    Validation,
    formProfile,
    editProfileButton,
    buttonAddForms,
    profileSubmit,
    inputTitle,
    popUpProfile,
    inputsArr,

    api,
    PopProfile
  );
  form.render();

  form.setEventListeners(upDateProfile, nameProfile, aboutProfile);

  const formCard = new Form(
    Validation,
    formCardImage,
    addButton,
    buttonAddForms,
    profileSubmit,
    inputTitle,
    popUpCard,
    inputsArr,
    api,
    PopCard
  );
  formCard.render();
  formCard.setEventListenersCard(list, description, image);

  const formOfAvatar = new Form(
    Validation,
    formAvatar,
    popUpButtonAvatar,
    buttonAddForms,
    profileSubmit,
    inputTitle,
    popUpAvatar,
    inputsArr,
    api,
    PopAvatar
  );
  formOfAvatar.render();
  formOfAvatar.setEventListenersAvatar(avatarInput, avatarNew);
})();

/*
  Хорошая работа, задание реализовано полность, класс Api создан, у запросов есть обработка ошибок и 
  все действия производятся только после ответа сервера
 
  Можно лучше:
  - класс Form не соответсвует принципу единственной ответсвенности
  - закрывать попап нужно если сервер ответил подтверждением - т.е в блоке then
  - адрес сервера https://praktikum.tk так же передавать как параметр конструктора
  - не хардкодить id, а использовать данные, которые возвращает сервер
  - т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/
