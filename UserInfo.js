export default class UserInfo {
  constructor(name, about, userTitle, userInfoJob, avatarNew, Api) {
    this.nameProfile = name;
    this.aboutProfile = about;
    this.title = userTitle;
    this.subtitle = userInfoJob;
    this.avatarNew = avatarNew;
    this.Api = Api;
  }

  setUserInfo = () => {
    this.Api.getUser()

      .then((result) => {
        this.name = result.name;
        this.about = result.about;
        this.avatar = result.avatar;

        this.updateUserInfo(this.name, this.about, this.avatar);
      })
      .catch((err) => {
        alert(err); // "Что-то пошло не так1: ..."
      });
  };

  updateUserInfo = (name, about, avatar) => {
    this.title.textContent = name;
    this.subtitle.textContent = about;

    this.avatarNew.avatarUpDate(avatar);
  };

  inputTitle = () => {
    this.name = this.nameProfile;
    this.about = this.aboutProfile;
    this.name.value = this.title.innerText;
    this.about.value = this.subtitle.innerText;
  };
}
