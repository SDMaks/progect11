export default class Validation {
  constructor(form, button, arr) {
    this.form = form;
    this.button = button;
    this.arr = arr;
  }

  setError(input) {
    const span = input.nextElementSibling;
    span.innerText = input.validationMessage;
  }

  checkValidity(item) {
    const validity = item.validity;
    /** REVIEW: Можно лучше:
     *
     * Использовать объект .validity вместе со специальными HTML5-атрибутами
     */
    if (
      item.getAttribute("type") !== "url" &&
      (item.value.length > 30 || item.value.length === 1)
    ) {
      item.setCustomValidity(`Должно быть от 2 до 30 символов`);
      this.setError(item);
      return false;
    }

    if (validity.valueMissing) {
      item.setCustomValidity(`Это обязательное поле`);
      this.setError(item);

      return false;
    }
    /** REVIEW: Можно лучше:
     *
     * if(validity.typeMismatch && input.type === 'url')
     */
    if (validity.patternMismatch) {
      item.setCustomValidity(`Здесь должна быть ссылка`);
      this.setError(item);
      return false;
    }

    item.setCustomValidity("");
    this.setError(item);

    return true;
  }

  setEventListeners = (popUp, inputs, formProfile, inputTitle) => {
    this.form.addEventListener("input", (event) => {
      this.button = event.currentTarget.querySelector("button");
      const inputs = event.currentTarget.querySelectorAll("input");
      const inputsArr = Array.from(inputs);
      inputsArr.forEach((item) => {
        if (event.target === item) {
          this.checkValidity(item);
        } else {
          item.textContent = "";
        }
      });

      if (inputsArr.every((item) => item.validity.valid)) {
        this.setSubmitButtonState(this.button, true);
      } else {
        this.setSubmitButtonState(this.button, false);
      }
    });

    this.button.addEventListener("click", () => {
      this.arr.forEach((button) => {
        this.setSubmitButtonState(button, false);
      });
      this.resetInputs(popUp, inputs, formProfile);
      inputTitle();
    });
  };

  resetInputs(popUp, inputs, formProfile) {
    if (popUp.classList.contains("popup_is-opened")) {
      inputs.forEach(function (item) {
        item.innerText = "";
        formProfile.reset();
      });
    }
  }

  setSubmitButtonState(button, isValid) {
    if (isValid) {
      button.removeAttribute("disabled");
      button.classList.add("popup__button_abled");
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("popup__button_abled");
    }
  }
}
