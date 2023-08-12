const welcomePage = document.querySelector(".welcome-page");
const mainPage = document.querySelector(".main-page");

const navUserButton = document.querySelector("#nav-user");
const navSettingsButton = document.querySelector("#nav-settings");

start();

function start() {
  hideAllPages();
  const user = loadUser();
  if (user.user_name != null && user.user_name.trim() !== "") {
    // Show main page
    showMainPage(user);
  } else {
    showWelcomePage();
  }
}

function hideAllPages() {
  welcomePage.style.display = "none";
  mainPage.style.display = "none";

  if (navUserButton) {
    navUserButton.classList.remove("nav-current");
  }

  if (navSettingsButton) {
    navSettingsButton.classList.remove("nav-current");
  }
}

function showWelcomePage() {
  welcomePage.style.display = "flex";
  const createUserButton = document.querySelector(".create-user-btn");
  const userNicknameInput = document.querySelector(".user-nickname-input");
  createUserButton.addEventListener("click", () => {
    let nickname = userNicknameInput.value;
    if (nickname != "" && nickname != " ") {
      const id = getRandomNumber(0, 1000000);
      const newUser = Object.assign({}, user);
      newUser.user_id = id;
      newUser.user_name = nickname;
      newUser.socail_medias = socialMedias;
      saveUser(newUser);
      hideAllPages();
      showMainPage();
    }
  });
}

function showMainPage(_user) {
  mainPage.style.display = "flex";
  const welcomeHeader = document.querySelector(".main-page-header");
  welcomeHeader.innerHTML = `Welcome, ${_user.user_name}`;
  navUserButton.classList.add("nav-current");

  const savedLinksList = document.querySelector(".saved-social-links");

  _user.socail_medias.forEach((item) => {
    const socialMediaBlock = document.createElement("div");
    socialMediaBlock.className = "saved-link-item";

    const header = document.createElement("p");
    header.className = "saved-link-item-name";
    header.innerHTML = item.name;
    socialMediaBlock.appendChild(header);

    const icon = document.createElement("i");
    icon.classList.add("fa-brands");
    icon.classList.add(`fa-${item.name.toLowerCase()}`);
    socialMediaBlock.appendChild(icon);

    const statusLabel = document.createElement("div");
    statusLabel.classList.add("sli-label");
    const statusText = document.createElement("P");
    const statusIcon = document.createElement("i");
    statusIcon.classList.add("fa-solid");
    if (item.connected) {
      statusLabel.classList.add("sli-connected");
      statusText.innerHTML = "Connected";
      statusIcon.classList.add("fa-check");
    } else {
      statusLabel.classList.add("sli-connect");
      statusText.innerHTML = "Connect";
      statusIcon.classList.add("fa-chain");
    }
    statusLabel.appendChild(statusText);
    statusLabel.appendChild(statusIcon);
    socialMediaBlock.appendChild(statusLabel);

    savedLinksList.appendChild(socialMediaBlock);
  });
}
