const newWorker = document.getElementById("add-btn");
const form = document.querySelector(".form");
const addList = document.getElementById("addList");
const plus = document.querySelectorAll(".plus");
const remove = document.getElementById("remove");
const canceled = document.getElementById("canceled");

storedData = []



newWorker.addEventListener("click", () => {
  form.style.display = "flex";
});

canceled.addEventListener("click", () => {
  form.style.display = "none";
});

plus.forEach((btn) => {
  btn.addEventListener("click", () => {
    addList.style.display = "flex";
  });
});

remove.addEventListener("click", () => {
  addList.style.display = "none";
});
