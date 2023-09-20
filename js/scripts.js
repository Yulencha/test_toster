async function startCountdown() {
  const targetTime =
    new Date().getTime() + 4 * 60 * 60 * 1000 + 51 * 60 * 1000 + 16 * 1000;
  const timerElement = document.getElementById("timer");

  function updateTimer() {
    return new Promise((resolve) => {
      const currentTime = new Date().getTime();
      const timeRemaining = targetTime - currentTime;

      if (timeRemaining <= 0) {
        resolve("Время истекло!");
      } else {
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        resolve(formattedTime);
      }
    });
  }

  while (true) {
    const timeText = await updateTimer();
    timerElement.textContent = timeText;

    if (timeText === "finished") {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

startCountdown();

const thumbnails = document.querySelectorAll(".slider__thumbnail");
const mainImage = document.querySelector(".slider__main-image img");
const colorSelect = document.getElementById("color-select");

setThumbnailOpacity(thumbnails[0]);

thumbnails.forEach(function (thumbnail) {
  thumbnail.addEventListener("click", function () {
    const imagePath = thumbnail.getAttribute("src");
    mainImage.setAttribute("src", imagePath);
    setThumbnailOpacity(thumbnail);
    setSelectedOption(imagePath);
  });
});

colorSelect.addEventListener("change", function () {
  const selectedImage = colorSelect.value;
  mainImage.setAttribute("src", selectedImage);
  const correspondingThumbnail = document.querySelector(
    `.slider__thumbnail[src="${selectedImage}"]`
  );
  setThumbnailOpacity(correspondingThumbnail);
});

function setThumbnailOpacity(activeThumbnail) {
  thumbnails.forEach(function (thumbnail) {
    thumbnail.style.opacity = thumbnail === activeThumbnail ? "0.4" : "1";
  });
}

function setSelectedOption(imagePath) {
  const optionToSelect = colorSelect.querySelector(
    `option[value="${imagePath}"]`
  );
  if (optionToSelect) {
    colorSelect.value = imagePath;
  }
}
