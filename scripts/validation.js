const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputElement, errorMsg, config) => {
  const errorMsgId = `#${inputElement.id}-error`;
  const errorElement = formEl.querySelector(errorMsgId);
  console.log(errorElement);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMsg;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputElement, config) => {
  const errorMsgId = `#${inputElement.id}-error`;
  const errorElement = formEl.querySelector(errorMsgId);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formEl, inputElement, config) => {
  console.log(inputElement.validationMessage);
  if (!inputElement.validity.valid) {
    showInputError(
      formEl,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formEl, inputElement, config);
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(".modal__button");

  //ToDo- handle initial states
  // toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  console.log(formList);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(validationConfig);
