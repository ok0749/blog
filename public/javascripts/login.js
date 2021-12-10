const joinBtn = document.querySelector(".login__joinBtn");
joinBtn.addEventListener("click", function (event) {
  event.preventDefault();
  location.href = "/users/join";
  return false;
});
