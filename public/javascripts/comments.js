let commentBoxes = document.querySelectorAll(".commentBox");

// 새로운 댓글 저장
async function handleCreateSubmit(event, createForm) {
  event.preventDefault();
  await fetch(createForm.action, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      content: createForm.content.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      commentsBox.insertAdjacentHTML(
        "afterbegin",
        createCommentBox(data.comment)
      );
      createForm.content.value = "";
    });

  commentBoxes = document.querySelectorAll(".commentBox");
  handleCommentBox(commentBoxes);
}

// 좋아요 클릭
async function handleLikeClick(event, likeForm, likeNum, icon) {
  event.preventDefault();
  await fetch(likeForm.action, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      likeNum.innerHTML = data.like;
      if (icon.classList.contains("fas")) {
        icon.classList.remove("fas");
        icon.classList.add("far");
      } else {
        icon.classList.remove("far");
        icon.classList.add("fas");
      }
    });
}

// edit 버튼 클릭
async function handleEditClick(event, editForm, commentMain) {
  event.preventDefault();
  editForm.classList.remove("hidden");
  commentMain.classList.add("hidden");
  return false;
}

// 댓글 수정 후 저장
async function handleEditSubmit(event, editForm, commentMain, cancleAnchor) {
  event.preventDefault();
  await fetch(editForm.action, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      editContent: editForm.editContent.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      commentMain.querySelector("p").innerHTML = data.comment.content;
      cancleAnchor.click();
    });
}

// 댓글 삭제
async function handleDeleteClick(event, deleteForm, commentBox) {
  event.preventDefault();
  await fetch(deleteForm.action, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => commentBox.classList.add("hidden"))
    .catch(console.error);
}

// cancle 버튼 클릭
async function handleCancleClick(event, editForm, commentMain) {
  event.preventDefault();
  editForm.classList.add("hidden");
  commentMain.classList.remove("hidden");
  return false;
}

// 새로운 댓글 저장시 댓글 UI 생성
function createCommentBox(comment) {
  return `
  <li class="d-flex align-items-start mb-2 commentBox">
    <img class="avatar mr-2" src=${comment.author.avatar}/>
    <div class="comment">
      <div>name</div>
      <div class="comment__main">
      <p class="mb-2">${comment.content}</p>
      <div class="d-flex justify-content-start align-items-center">
        <a class="btn btn-outline-success btn-sm comment__main__editAnchor">edit</a>
      <form class="comment__main__deleteForm d-inline" action="/comments/${
        comment._id
      }?_method=DELETE" method="post">
        <button class="btn btn-outline-success btn-sm" href="">delete</butt>
      </form>
</div>
    </div>
    <form class="comment__editForm hidden" action="/comments/${
      comment._id
    }?_method=PUT" method="post"> 
      <div class="form-group">
        <textarea class="form-control comment__editForm__editBtn" name="editContent">${
          comment.content
        }</textarea>
      </div>
      <div class="form-group d-flex justify-content-end"><a class="btn btn-dark btn-sm mr-1 comment__editForm__cancleAnchor">cancle </a>
        <button class="btn btn-success btn-sm">save</button>
      </div>
    </form>
    <div class="d-grid comment__infos">
      <form class="d-inline comment__infos__form" action="/comments/like/${
        comment._id
      }" method="post">
      <a class="comment__infos__likeAnchor" href="">
        <i class="far fa-thumbs-up"></i>
      </a></form>
      <span> · </span>
      <a href="">답글 달기</a>
      <span> · </span>
      <span class="mr-1 comment__infos__emoji">😄 </span>
      <span class="comment__infos__likeNum">${comment.like.length}</span>
      <span> · </span>
      <span>${new Date().toLocaleDateString()}</span>
    </div>
  </div>
</li>
  `;
}

// 전체
function handleCommentBox(commentBoxes) {
  commentBoxes.forEach(async function (commentBox) {
    const editAnchor = commentBox.querySelector(".comment__main__editAnchor");
    const editForm = commentBox.querySelector(".comment__editForm");
    const deleteForm = commentBox.querySelector(".comment__main__deleteForm");
    const likeForm = commentBox.querySelector(".comment__infos__form");
    const likeAnchor = commentBox.querySelector(".comment__infos__likeAnchor");
    const likeNum = commentBox.querySelector(".comment__infos__likeNum");
    const icon = likeAnchor.querySelector("i");
    const cancleAnchor = commentBox.querySelector(
      ".comment__editForm__cancleAnchor"
    );
    const commentMain = commentBox.querySelector(".comment__main");

    // cancle 버튼 클릭시
    if (editAnchor) {
      editAnchor.addEventListener("click", async function (event) {
        await handleEditClick(event, editForm, commentMain);
      });
    }

    cancleAnchor.addEventListener("click", async function (event) {
      await handleCancleClick(event, editForm, commentMain);
    });

    // 댓글 save 버튼 클릭시
    editForm.addEventListener("submit", function (event) {
      handleEditSubmit(event, editForm, commentMain, cancleAnchor);
    });

    // 댓글 delete 버튼 클릭시
    deleteForm.addEventListener("submit", async function (event) {
      await handleDeleteClick(event, deleteForm, commentBox);
    });

    // 좋아요 클릭시
    likeAnchor.addEventListener("click", async function handleLike(event) {
      await handleLikeClick(event, likeForm, likeNum, icon);
    });
  });
}

handleCommentBox(commentBoxes);

const createForms = document.querySelectorAll(".comment-createForm");
let commentsBox = document.querySelector(".commentsBox");
createForms.forEach(function (createForm) {
  createForm.addEventListener("submit", async function (event) {
    handleCreateSubmit(event, createForm);
  });
});
