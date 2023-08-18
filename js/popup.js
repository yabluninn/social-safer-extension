const welcomePage = document.querySelector(".welcome-page");
const mainPage = document.querySelector(".main-page");
const editLinkPage = document.querySelector(".edit-link-page");

const navUserButton = document.querySelector("#nav-user");
const navSettingsButton = document.querySelector("#nav-settings");

start();

function start() {
  hideAllPages();
  const user = loadUser();
  if (user != null) {
    if (user.user_name != null && user.user_name.trim() !== "") {
      // Show main page
      showMainPage(user);
    } else {
      showWelcomePage();
    }
  } else {
    showWelcomePage();
  }
}

function hideAllPages() {
  welcomePage.style.display = "none";
  mainPage.style.display = "none";
  editLinkPage.style.display = "none";

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
      newUser.social_medias = socialMedias;
      saveUser(newUser);
      hideAllPages();
      showMainPage(newUser);
    }
  });
}

function showMainPage(_user) {
  mainPage.style.display = "flex";
  const welcomeHeader = document.querySelector(".main-page-header");
  welcomeHeader.innerHTML = `Welcome, ${_user.user_name}`;
  navUserButton.classList.add("nav-current");

  const savedLinksList = document.querySelector(".saved-social-links");
  savedLinksList.innerHTML = "";

  _user.social_medias.forEach((item, index) => {
    const socialMediaBlock = document.createElement("div");
    socialMediaBlock.className = "saved-link-item";
    socialMediaBlock.id = `sli-${item.name.toLowerCase()}`;

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

    function OnShowEditPage() {
      showEditLingPage(_user, index);
      console.log(`index: ${index}`);
    }

    socialMediaBlock.addEventListener("click", OnShowEditPage);
  });
}

function showEditLingPage(user, social_media_id) {
  editLinkPage.style.display = "flex";

  const socialMediaId = social_media_id;

  const closeButton = document.querySelector(".el-close-button");
  $(closeButton).on("click", function () {
    hideEditLinkPage(user);
    console.log(socialMediaId);
  });

  let socialName = user.social_medias[socialMediaId].name;

  const iconBlock = document.querySelector(".el-icon-block");
  iconBlock.innerHTML = "";
  iconBlock.id = `sli-${user.social_medias[socialMediaId].name.toLowerCase()}`;

  const icon = document.createElement("i");
  icon.classList.add("fa-brands");
  icon.classList.add(`fa-${socialName.toLowerCase()}`);
  iconBlock.appendChild(icon);

  const iconNameText = document.createElement("p");
  iconNameText.className = "el-icon-name";
  iconNameText.innerHTML = socialName;
  iconBlock.appendChild(iconNameText);

  const linkInput = document.querySelector(".el-input");
  let link = user.social_medias[socialMediaId].link;
  linkInput.value = link;

  const saveButton = document.querySelector(".el-save-button");
  $(saveButton).on("click", function () {
    if (linkInput.value.trim() !== "") {
      user.social_medias[socialMediaId].link = linkInput.value;
      user.social_medias[socialMediaId].connected = true;
      saveUser(user);
      hideEditLinkPage(user);
    }
  });

  const copyButton = document.querySelector(".el-copy-button");
  $(copyButton).on("click", function () {
    const textToCopy = linkInput.value;
    if (textToCopy.trim() !== "") {
      navigator.clipboard.writeText(textToCopy);
    }
  });
}

function hideEditLinkPage(_user) {
  $(".el-save-button").off("click");
  $(".el-close-button").off("click");
  $(".el-copy-button").off("click");
  hideAllPages();
  showMainPage(_user);
}
