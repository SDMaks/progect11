export default class Avatar {
  constructor(avatarImage) {
    this.avatarImage = avatarImage;
  }

  avatarUpDate = (avatar) => {
    this.avatarImage.style.backgroundImage = `url(${avatar})`;
  };
}
