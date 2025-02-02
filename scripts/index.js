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

const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = document.querySelector(".modal__close-btn");

function openModal() {
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

editModalCloseBtn.addEventListener("click", closeModal);

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  closeModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
console.log(cardTemplate);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  return cardElement;
}

const cardList = document.querySelector(".cards__list");
console.log(cardList);

for (let i = 0; i < initialCards.length; i++) {
  cardList.append(getCardElement(initialCards[i]));
}
