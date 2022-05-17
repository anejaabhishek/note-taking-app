// Global query selectors

const noteContainer = document.querySelector(".note-container");
const modalContainer = document.querySelector(".modal-container");
const form = document.querySelector("form");

// Class for note

class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Math.random();
  }
}

// Event : Note form submit

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title");
  const noteInput = document.querySelector("#note");

  if (titleInput.value.length > 0 && noteInput.value.length > 0) {
    const newNote = new Note(titleInput.value, noteInput.value);
    addNote(newNote);
    addNoteToLocalStorage(newNote);

    titleInput.value = "";
    noteInput.value = "";
    showAlertMessage("Note added successfully", "success-message");
    titleInput.focus();
  } else showAlertMessage("Please add both title and note", "alert-message");
});

// Function : create a new note in the  UI

function addNote(note) {
  const newUINote = document.createElement("div");
  newUINote.classList.add("note");
  newUINote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class="note-title">${note.title}</h2>
    <p class="note-body">${note.body}</p>
    <div class="note-btns">
        <button class="note-btn note-view">View Detail                                                                             </button>
        <button class="note-btn note-delete">Delete Note</button>
    </div>
    `;

  noteContainer.appendChild(newUINote);
}

// Function : Activate Note Modal

function activateNoteModal(title, body) {
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");

  modalTitle.textContent = title;
  modalBody.textContent = body;

  modalContainer.classList.add("active");
}

// Event : Note buttons

noteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("note-view")) {
    const currentNote = e.target.closest(".note");
    const currentTitle = currentNote.querySelector(".note-title").textContent;
    const currentBody = currentNote.querySelector(".note-body").textContent;

    activateNoteModal(currentTitle, currentBody);
  }

  if (e.target.classList.contains("note-delete")) {
    const currentNote = e.target.closest(".note");
    currentNote.remove();
    showAlertMessage("Note deleted successfully", "remove-message");

    const id = currentNote.querySelector("span").textContent;

    removeNoteFromLocalStorage(Number(id));
  }
});

// Function : Close Modal

const modalBtn = document.querySelector(".modal-btn");

modalBtn.addEventListener("click", () => {
  modalContainer.classList.remove("active");
});

// Function : Show Alert Message

function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", alertDiv);

  //   titleInput.focus();
  setTimeout(() => alertDiv.remove(), 3000);
}

// Local Storage

// Function to retreive notes

function getNotes() {
  let notes;

  if (localStorage.getItem("noteApp.notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("noteApp.notes"));
  }
  return notes;
}

// Function to add note to local storage

function addNoteToLocalStorage(note) {
  const notes = getNotes();

  notes.push(note);

  localStorage.setItem("noteApp.notes", JSON.stringify(notes));
}

// Function to display notes

function displayNotes() {
  const notes = getNotes();
  notes.forEach((note) => {
    addNote(note);
  });
}

// Event listener to display notes

document.addEventListener("DOMContentLoaded", displayNotes);

// Function to remove note from local storage

function removeNoteFromLocalStorage(id) {
  const notes = getNotes();
  notes.forEach((note, index) => {
    if (note.id === id) {
      notes.splice(index, 1);
    }
    localStorage.setItem("noteApp.notes", JSON.stringify(notes));
  });
}
