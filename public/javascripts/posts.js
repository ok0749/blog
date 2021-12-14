const deleteForm = document.querySelector(".post-delete");
const deleteAnchor = document.querySelector(".post-delete__anchor");

deleteAnchor.addEventListener("click", function (event) {
  event.preventDefault();
  if (confirm("Do you want to delete this post?")) deleteForm.submit();
  return false;
});
