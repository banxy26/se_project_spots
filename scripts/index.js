const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");
/*const editForm = editModal.querySelector(".modal__form");
const cardForm = cardModal.querySelector(".modal__form");
const cardNameInput = cardModal.querySelector("add-card-name-input");
const cardLinkInput = cardModal.querySelector("add-card-link-input");*/

const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
console.log(editModalCloseBtn);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  console.log(modal.classList);
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closeModal(editModal);
}

/* function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(cardNameInput.value);
  console.log(cardLinkInput.value);
  // CLOSE THE MODAL
}*/

function handleCardSubmit(evt) {
  evt.preventDefault();
  const values = { name: captionInput.value, link: linkInput.value };
  const cardEl = getCardElement(values);
  cardList.prepend(cardEl);
  evt.target.reset();
  closeModal(cardModal);
}

const profileFormElement = document.querySelector("#editProfileForm");
console.log(profileFormElement);

const nameInput = document.querySelector("#name");
console.log(nameInput);
const descriptionInput = document.querySelector("#description");
console.log(descriptionInput);

const profileNameElement = document.querySelector(".profile__name");
console.log(profileNameElement);
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
console.log(profileDescriptionElement);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
console.log(cardTemplate);

const cardModal = document.querySelector("#add-card-modal");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

// editForm.addEventListener("submit", handleEditProfileSubmit);
// cardForm.addEventListener("submit", handleAddCardSubmit);

const cardList = document.querySelector(".cards__list");
console.log(cardList);

/*for (let i = 0; i < initialCards.length; i++) {
  cardList.append(getCardElement(initialCards[i]));
}*/

initialCards.forEach((item) => {
  const cardEl = getCardElement(item);
  cardList.append(cardEl);
});
