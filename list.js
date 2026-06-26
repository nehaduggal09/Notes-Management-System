const notesList = document.getElementById("notesList");
const filterDate = document.getElementById("filterDate");

let notes = [];

async function getNotes() {
    const response = await fetch("/notes");
    notes = await response.json();
    displayNotes(notes);
}

function displayNotes(data) {
    notesList.innerHTML = "";

    data.forEach((item) => {
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
                    onclick="deleteNote('${item._id}')">
                🗑 Delete Note
            </button>
        `;

        notesList.appendChild(li);
    });
}

async function deleteNote(id) {
    await fetch(`/delete-note/${id}`, {
        method: "DELETE"
    });

    getNotes();
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

    const filteredNotes = notes.filter(
        item => item.date === selectedDate
    );

    displayNotes(filteredNotes);
}

getNotes();