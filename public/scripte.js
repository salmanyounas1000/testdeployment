async function loadNotes() {
  const response = await fetch("/notes");
  const notes = await response.json();

  const list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach(note => {
    const li = document.createElement("li");

    li.innerHTML =
      note.text +
      " <button onclick='deleteNote(" + note.id + ")'>Delete</button>";

    list.appendChild(li);
  });
}

async function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if (!text) {
    return;
  }

  await fetch("/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: text
    })
  });

  input.value = "";
  loadNotes();
}

async function deleteNote(id) {
  await fetch("/notes/" + id, {
    method: "DELETE"
  });

  loadNotes();
}

// load notes when page opens
loadNotes();
