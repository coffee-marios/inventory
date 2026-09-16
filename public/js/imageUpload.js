const chooseImages = document.getElementById("chooseImages");
const imageInput = document.getElementById("imageInput");
const imageNames = document.getElementById("imageNames");
const form = imageInput.closest("form");
let selectedFiles = [];

chooseImages.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  selectedFiles.push(...imageInput.files);

  imageNames.innerHTML = selectedFiles
    .map((file) => `<div>${file.name}</div>`)
    .join("");

  imageInput.value = "";
});

form.addEventListener("submit", () => {
  const dataTransfer = new DataTransfer();

  selectedFiles.forEach((file) => {
    dataTransfer.items.add(file);
  });

  imageInput.files = dataTransfer.files;
});
