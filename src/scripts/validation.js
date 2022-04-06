const showError = (inputElement, errorElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const checkInputValidity = (inputElement, formElement, config) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!isInputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
};

export const toggleButtonState = (button, isActive = false, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
};

const setEventListener = (formElement, config) => {
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const inputFormList = formElement.querySelectorAll(config.inputSelector);

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  Array.from(inputFormList).forEach((input) => {
    input.addEventListener("input", (e) => {
      checkInputValidity(input, formElement, config);
      toggleButtonState(submitButton, formElement.checkValidity(), config);
    });
  });
};

export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach((form) => {
    setEventListener(form, config);
  });
};
