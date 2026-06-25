const notesList = document.getElementById("notesList");
const filterDate = document.getElementById("filterDate");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes(data) {
    notesList.innerHTML = "";

    data.forEach((item, index) => {
        const li = document.createElement("li");

       li.innerHTML = `
        <div class="note-name">${item.name}</div>

        <div class="note-date">
            📅 ${item.date}
        </div>

        <div class="note-text">
            📝 ${item.note}
        </div>

        <button class="delete-btn"
                onclick="deleteNote(${index})">
            🗑 Delete Note
        </button>
`;

        notesList.appendChild(li);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes(notes);
}
function showAllNotes() {
    displayNotes(notes);
}

function filterNotes() {
    const selectedDate = filterDate.value;

    if (selectedDate === "") {
        displayNotes(notes);
        return;
    }

    const filteredNotes = notes.filter(item => item.date === selectedDate);

    displayNotes(filteredNotes);
}

displayNotes(notes);