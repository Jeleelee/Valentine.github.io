document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const titleElement = document.querySelector(".title");
  const buttonsContainer = document.querySelector(".buttons");
  const yesButton = document.querySelector(".btn--yes");
  const noButton = document.querySelector(".btn--no");
  const sealImg = document.querySelector(".seal-img");
  const letterPopup = document.querySelector(".letter-popup");
  const closeLetterButton = document.querySelector(".btn--close-letter");

  const MAX_IMAGES = 5;
  const MAX_YES_SIZE = 100;
  let play = true;
  let noCount = 0;

  const messages = [
    "Will you be my Valentine, Katrina?",
    "Sure ka na ba po....?",
    "Please po Katkat!!!",
    "SURUSE PO NABA YAN... LIKE FINAL FINAL...?",
    "ouch, aray, sakit, ahhahahahhahahah",
    "KODIE LOOK O, SI MAMA MO AYAW AKO KA-VALENTINE",
  ];

  if (yesButton && noButton) {
    yesButton.addEventListener("click", handleYesClick);
    noButton.addEventListener("click", function () {
      if (play) {
        noCount++;
        const imageIndex = Math.min(noCount, MAX_IMAGES);
        changeImage(imageIndex);
        resizeYesButton();
        updateNoButtonText();
        moveNoButton();
        updateTitleMessage();
        if (noCount === MAX_IMAGES) {
          play = false;
        }
      } else {
        moveNoButton();
      }
    });
  } else {
    console.error("Buttons not found!");
  }

  function handleYesClick() {
    titleElement.innerHTML = "Yayyy!! :3";
    buttonsContainer.innerHTML = `<button class="btn btn--letter">Letter for Katrina</button>`;
    const letterButton = document.querySelector(".btn--letter");
    letterButton.addEventListener("click", showLetterPopup);
    changeImage('yes');
  }

  function showLetterPopup() {
    letterPopup.classList.remove("hidden");
  }

  closeLetterButton.addEventListener("click", function () {
    letterPopup.classList.add("hidden");
  });

  function changeImage(image) {
    sealImg.src = `img/seal-${image}.jpg`;
    sealImg.onerror = () => {
      console.error(`Image not found: img/seal-${image}.jpg`);
      sealImg.src = "img/fallback.jpg";
    };
  }

  function resizeYesButton() {
    const computedStyle = window.getComputedStyle(yesButton);
    const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
    const newFontSize = fontSize * 1.6;
    yesButton.style.fontSize = `${Math.min(newFontSize, MAX_YES_SIZE)}px`;
  }

  function updateNoButtonText() {
    noButton.innerHTML = generateMessage(noCount);
  }

  function generateMessage(noCount) {
    const messages = [
      "No",
      "Oo, sure na",
      "nope, hindi magbabago isip ko",
      "Final na talaga",
      "hindi padin",
      "sino ang manliligaw mæm?",
    ];
    const messageIndex = Math.min(noCount, messages.length - 1);
    return messages[messageIndex];
  }

  function updateTitleMessage() {
    titleElement.innerHTML = messages[noCount % messages.length];
  }

  function moveNoButton() {
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const sealRect = sealImg.getBoundingClientRect();
    const titleRect = titleElement.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();
    const noRect = noButton.getBoundingClientRect();

    let newX, newY;
    let overlap = true;
    const buffer = 20;

    while (overlap) {
      newX = Math.random() * (containerRect.width - noRect.width);
      newY = Math.random() * (containerRect.height - noRect.height);

      if (
        newX + noRect.width < sealRect.left - buffer ||
        newX > sealRect.right + buffer ||
        newY + noRect.height < sealRect.top - buffer ||
        newY > sealRect.bottom + buffer
      ) {
        if (
          newX + noRect.width < titleRect.left - buffer ||
          newX > titleRect.right + buffer ||
          newY + noRect.height < titleRect.top - buffer ||
          newY > titleRect.bottom + buffer
        ) {
          if (
            newX + noRect.width < yesRect.left - buffer ||
            newX > yesRect.right + buffer ||
            newY + noRect.height < yesRect.top - buffer ||
            newY > yesRect.bottom + buffer
          ) {
            overlap = false;
          }
        }
      }
    }

    noButton.style.position = "absolute";
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
  }
});
