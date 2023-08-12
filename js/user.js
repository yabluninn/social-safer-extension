let user = {
  user_id: "",
  user_name: "",
  socail_medias: [],
};

function loadUser() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return storedUser;
}

function saveUser(_user) {
  localStorage.setItem("user", JSON.stringify(_user));
}
