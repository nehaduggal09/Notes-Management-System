const form = document.getElementById("noteForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    if (!name || !date || !note) {
        message.innerText = "❌ Please fill all fields!";
        message.style.color = "red";
        return;
    }

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.push({
        name,
        date,
        note
    });

    localStorage.setItem("notes", JSON.stringify(notes));

    message.innerText = "✅ Note Added Successfully!";
    message.style.color = "green";

    form.reset();
});