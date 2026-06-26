console.log("SCRIPT LOADED");
const form = document.getElementById("noteForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    try {
        const response = await fetch("/add-note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, date, note })
        });

        const data = await response.json();

        message.innerText = data.message;
        message.style.color = "green";

        form.reset();

    } catch (err) {
        console.log(err);
        message.innerText = "❌ Server not responding";
        message.style.color = "red";
    }
});