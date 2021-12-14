const comments = document.querySelectorAll(".post-comment");
const likeForms = document.querySelectorAll(".post-comment__buttons__form");
const deleteForms = document.querySelectorAll(".post-comment__deleteForm");
// const editForms = document.querySelectorAll(".post-comment__editForm");

const editAnchors = document.querySelectorAll(".post-comment__editAnchor");

likeForms.forEach(function (likeForm) {
  const likeAnchor = likeForm.querySelector(".post-comment__buttons__anchor");
  const icon = likeForm.querySelector(".post-comment__buttons__anchor > i");
  likeAnchor.addEventListener("click", function (event) {
    event.preventDefault();
    if (icon.classList.contains("fas")) {
      icon.classList.remove("fas");
      icon.classList.add("far");
    } else {
      icon.classList.remove("far");
      icon.classList.add("fas");
    }
    likeForm.submit();
    return false;
  });
});

deleteForms.forEach(function (deleteForm) {
  const deleteAnchor = deleteForm.querySelector("a");
  deleteAnchor.addEventListener("click", function (event) {
    event.preventDefault();
    deleteForm.submit();
    return false;
  });
});

// 전체
comments.forEach(function (comment) {
  const editAnchor = comment.querySelector(".post-comment__editAnchor");
  const cancleAnchor = comment.querySelector(".post-comment__cancleAnchor");
  // const deleteForm = comment.querySelector(".post-comment__deleteForm");
  const editForm = comment.querySelector(".post-comment__editForm");
  const contentBox = comment.querySelector(".post-comment__main");
  if (editAnchor) {
    editAnchor.addEventListener("click", function (event) {
      event.preventDefault();
      editForm.classList.remove("hidden");
      contentBox.classList.add("hidden");
      return false;
    });
  }

  cancleAnchor.addEventListener("click", function (event) {
    event.preventDefault();
    editForm.classList.add("hidden");
    contentBox.classList.remove("hidden");
    return false;
  });
});
