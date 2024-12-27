const authors = document.getElementById("authors");
const committee = document.getElementById("committee");
const past = document.getElementById("past");
const attendies = document.getElementById("attendies");

function check() {
  if (
    (authors.checked && committee.checked) ||
    (authors.checked && past.checked) ||
    (authors.checked && attendies.checked) ||
    (committee.checked && past.checked) ||
    (committee.checked && attendies.checked) ||
    (past.checked && attendies.checked)
  ) {
    //set all checkboxes to false
    authors.checked = false;
    committee.checked = false;
    past.checked = false;
    attendies.checked = false;
  }
}

//if more than one checkbox is checked
//listen for cheking any checkbox
authors.addEventListener("click", () => {
  check();
});
committee.addEventListener("click", () => {
  check();
});
past.addEventListener("click", () => {
  check();
});
attendies.addEventListener("click", () => {
  check();
});


// define a function
