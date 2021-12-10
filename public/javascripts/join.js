const loginBtn = document.querySelector(".join__loginBtn");
loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  location.href = "/users/login";
  return false;
});
