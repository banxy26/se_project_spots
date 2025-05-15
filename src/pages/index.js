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
const avatarCloseButton = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Delete Form Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

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
    profileAvatarElement.src = userInfo.avatar;
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

let selectedCard, selectedCardId;

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
  cardSubmitBtn.textContent = "Saving...";

  api
    .addNewCard({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      const cardEl = getCardElement(data);
      cardList.prepend(cardEl);
      closeModal(cardModal);
      cardForm.reset();
      cardSubmitBtn.textContent = "Create";
    })
    .catch((err) => {
      console.error("Error:", err);
      cardSubmitBtn.textContent = "Create";
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatarElement.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLikeBtn(evt, id) {
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

  // if the card is liked, set the active class on the card

  cardTitle.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", (evt) => handleLikeBtn(evt, data._id));
  cardTrashBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );
  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

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
    closeModal(modal);
  });
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

cardForm.addEventListener("submit", handleAddCardSubmit);

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(validationConfig);
