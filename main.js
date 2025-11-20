const newWorker = document.getElementById("add-btn");
const form = document.querySelector(".form");
const addList = document.getElementById("addList");
const assignList = document.getElementById("assignList");
const plus = document.querySelectorAll(".plus");
const remove = document.getElementById("remove");
const canceled = document.getElementById("canceled");
const submit = document.getElementById("submit");

const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputPhone = document.getElementById("inputPhone");
const inputRole = document.getElementById("role");
const inputPhoto = document.getElementById("photo");
const inputexp = document.getElementById("experience");
const inputJob = document.getElementById("expTitle");
const inputCompany = document.getElementById("expCompany");
const inputStart = document.getElementById("expStart");
const inputEnd = document.getElementById("expEnd");

const waitList = document.getElementById("list");
const details = document.getElementById("details");
const detailsBtn = document.getElementById("detailsBtn");
const globalInfo = document.getElementById("globalInfo");
const closeInfo = document.getElementById("closeInfo");

let storedData = [];

canceled.addEventListener("click", () => {
  form.style.display = "none";
});

remove.addEventListener("click", () => {
  addList.style.display = "none";
});

newWorker.addEventListener("click", () => {
  form.style.display = "flex";
});

closeInfo.addEventListener("click", () => {
  globalInfo.style.display = "none";
});

plus.forEach((btn) => {
  btn.addEventListener("click", () => {
    assignList.innerHTML = "";

    const zoneName = btn.getAttribute("data-zone");
    zoneToAssign = zoneName;

    addList.style.display = "flex";

    const selectedWorkers = storedData.filter((worker) => {
      if (worker.zone !== null) {
        return false;
      }

      const role = worker.role.toLowerCase();
      const zone = zoneName.toLowerCase();

      if (role === "manager") {
        return true;
      }

      if (role === "netoyage") {
        return zone !== "archive";
      }

      switch (zoneName) {
        case "Server":
          return role === "techniciens";

        case "Reception":
          return role === "réceptionnistes";
        case "Security":
          return role === "security";

        case "Archive":
          return true;

        case "Conference room":
        case "Staff room":
        default:
          return true;
      }
    });

    selectedWorkers.forEach((worker) => {
      const listItem = document.createElement("div");
      listItem.className = "assignable-worker-item";
      listItem.style.borderRadius = "5px";
      listItem.style.padding = "5px 10px";
      listItem.style.marginBottom = "5px";
      listItem.style.display = "flex";
      listItem.style.alignItems = "center";
      listItem.style.cursor = "pointer";

      const image = document.createElement("img");
      image.src = worker.photo;
      image.style.borderRadius = "50%";
      image.style.width = "30px";
      image.style.height = "30px";
      image.style.objectFit = "cover";
      image.style.marginRight = "10px";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = `${worker.name} (${worker.role})`;

      listItem.appendChild(image);
      listItem.appendChild(nameSpan);
      assignList.appendChild(listItem);
    });
  });
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9+-\s()]{10,}$/.test(phone);
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputName.value === "" ||
    inputEmail.value === "" ||
    inputPhone.value === "" ||
    inputRole.value === ""
  ) {
    alert("Submission refused: Please fill all fields");
    return;
  }

if (!validateEmail(inputEmail.value)) {
        inputEmail.style.border='2px solid red'
    return;
}

if (!validatePhone(inputPhone.value)) {
        inputPhone.style.border='2px solid red'
    return;
}

  const newUser = {
    name: inputName.value,
    role: inputRole.value,
    email: inputEmail.value,
    phone: inputPhone.value,
    job: inputJob.value,
    company: inputCompany.value,
    startDate: inputStart.value,
    endDate: inputEnd.value,
    photo: inputPhoto.value,
    zone: null,
  };

  storedData.push(newUser);

  form.reset();
  form.style.display = "none";
  alert("Submission accepted!");

  display();
});

detailsBtn.addEventListener("click", () => {
  details.style.display = "block";
});

function display() {
  waitList.innerHTML = " ";
  if (storedData.length === 0) {
    waitList.textContent = "No workers yet";
    return;
  }

  storedData.forEach((person) => {
    const card = document.createElement("div");

    card.style.position = "relative";
    card.style.border = "1px solid #e11d74";
    card.style.borderRadius = "10px";
    card.style.padding = "10px 25px";
    card.style.marginBottom = "10px";

    const removeCardBtn = document.createElement("button");
    removeCardBtn.textContent = "X";

    removeCardBtn.style.position = "absolute";
    removeCardBtn.style.marginLeft = "40px";
    removeCardBtn.style.top = "5px";
    removeCardBtn.style.left = "15px";
    removeCardBtn.style.background = "none";
    removeCardBtn.style.border = "none";
    removeCardBtn.style.color = "red";
    removeCardBtn.style.cursor = "pointer";
    removeCardBtn.style.fontWeight = "bold";

    card.style.paddingLeft = "30px";

    const image = document.createElement("img");
    image.style.borderRadius = "50%";
    image.style.width = "30px";
    image.style.height = "30px";
    image.style.objectFit = "cover";
    image.src = person.photo;

    image.style.marginLeft = "10px";

    const info = document.createElement("p");
    info.textContent = `Name: ${person.name}`;

    const description = document.createElement("p");
    description.textContent = `Role: ${person.role}`;

    card.appendChild(removeCardBtn);
    card.appendChild(image);
    card.appendChild(info);
    card.appendChild(description);
    waitList.appendChild(card);

    card.addEventListener("click", () => {
      showInfo(person);
    });

    removeCardBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const indexToRemove = storedData.findIndex(
        (worker) => worker.email === person.email
      );

      if (indexToRemove > -1) {
        storedData.splice(indexToRemove, 1);

        display();
      }
    });
  });
}

display();

function showInfo(person) {
  globalInfo.style.display = "block";

  document.getElementById("viewphoto").src = person.photo;
  document.getElementById("viewName").textContent = `Name: ${person.name}`;
  document.getElementById("viewRole").textContent = `Role: ${person.role}`;
  document.getElementById("viewEmail").textContent = `Email: ${person.email}`;
  document.getElementById("viewPhone").textContent = `Phone: ${person.phone}`;
  document.getElementById(
    "viewCompany"
  ).textContent = `Company: ${person.company}`;
  document.getElementById(
    "viewStart"
  ).textContent = `Start Date: ${person.startDate}`;
  document.getElementById(
    "viewEnd"
  ).textContent = `End Date: ${person.endDate}`;
  document.getElementById("viewTitle").textContent = `Job Title: ${person.job}`;
}
display();
