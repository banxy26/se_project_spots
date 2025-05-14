import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.jpg";
import pencilPath from "../images/pencil.svg";
import addPath from "../images/add.svg";
import closeIconPath from "../images/closeXicon.svg";
import "./index.css";
import {
  enableValidation,
  validationConfig,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "2e661282-4906-4418-ad51-a48303cbd2a5",
  "Content-Type": "application/json",
});

// Profile Elements
const profileAvatarElement = document.querySelector(".profile__avatar");
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");
const avatarModalButton = document.querySelector(".profile__avatar-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

// Card Form Elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
const cardNameInput = cardModal.querySelector("#card-caption-input");
const cardLinkInput = cardModal.querySelector("#card-link-input");

// Avatar Form Elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseButton = avatarModal.querySelectorAll(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Delete Form Elements
const deleteModal = document.querySelector("#delete-modal");

// Edit Form Elements
const editModal = document.querySelector("#edit-modal");
const editForm = editModal.querySelector(".modal__form");
const profileFormElement = document.querySelector("#editProfileForm");
const nameInput = document.querySelector("#edit-profile-form-name");
const descriptionInput = document.querySelector(
  "#edit-profile-form-description"
);

// Card Elements
const cardList = document.querySelector(".cards__list");

// Preview Elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

// Modal Elements
const closeButtons = document.querySelectorAll(".modal__close-btn");
const modals = document.querySelectorAll(".modal");

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileAvatarElement.src = avatarPath;
    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;

    cards.forEach((cardData) => {
      const cardEl = getCardElement(cardData);
      cardList.prepend(cardEl);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", escClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", escClose);
}

function escClose(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({ name: nameInput.value, about: descriptionInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const cardEl = getCardElement(inputValues);
  cardList.prepend(cardEl);
  evt.target.reset();
  closeModal(cardModal);
  disableButton(cardSubmitBtn, validationConfig);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  console.log("Avatar URL being sent:");

  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      console.log(data.avatar);
      // make this work, set new avatar element, the src of the avatar image
    })
    .catch(console.error);
}

function handleDeleteCards(evt) {
  openModal(deleteModal);
}

document.querySelector("#delete-form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  // Add your card deletion code here
});

function handleLikeBtn(evt) {
  evt.target.classList.toggle("card__like-button_liked");
}

function getCardElement(data) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardTrashBtn = cardElement.querySelector(".card__trash-btn");

  cardTitle.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  cardTrashBtn.addEventListener("click", () => {
    openModal(document.querySelector("#delete-modal"));
  });

  cardLikeBtn.addEventListener("click", handleLikeBtn);
  return cardElement;
}

// Add Event Listeners
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(editForm, [nameInput, descriptionInput], validationConfig);
  openModal(editModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    if (modal === avatarModal) {
      closeModal(avatarModal);
      openModal(deleteModal);
    } else {
      closeModal(modal);
    }
  });
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

cardForm.addEventListener("submit", handleAddCardSubmit);

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(validationConfig);
