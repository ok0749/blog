// use tab in markdown
const textarea = document.querySelector("#markdown");
const tagGroupAnchor = document.querySelector(".tag-group__anchor");
const cancleBtn = document.querySelector(".tag-group__add__cancleBtn");
const addBtn = document.querySelector(".tag-group__add__addBtn");

textarea.addEventListener("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value =
      this.value.substring(0, start) + "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

tagGroupAnchor.addEventListener("click", function (event) {
  event.preventDefault();
  const tagGroupSelect = document.querySelector(".tag-group__select");
  const tagGroupInput = document.querySelector(".tag-group__input");
  const tagGroupAdd = document.querySelector(".tag-group__add");

  tagGroupSelect.classList.add("hidden");
  tagGroupAnchor.classList.add("hidden");
  tagGroupInput.classList.remove("hidden");
  tagGroupAdd.classList.remove("hidden");
});

cancleBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const tagGroupSelect = document.querySelector(".tag-group__select");
  const tagGroupInput = document.querySelector(".tag-group__input");
  const tagGroupAdd = document.querySelector(".tag-group__add");

  tagGroupSelect.classList.remove("hidden");
  tagGroupAnchor.classList.remove("hidden");
  tagGroupInput.classList.add("hidden");
  tagGroupAdd.classList.add("hidden");
});

addBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const input = document.querySelector(".tag-group__input");
  const name = input.value;
  await fetch(addBtn.href, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const tagGroupSelect = document.querySelector(".tag-group__select");
      input.value = "";
      const option = document.createElement("option");
      option.innerHTML = data.tag.name;
      option.setAttribute("selected", true);
      tagGroupSelect.appendChild(option);
      cancleBtn.click();
    });
});
