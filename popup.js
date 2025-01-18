document.getElementById("save").addEventListener("click", function () {
  const code = document.getElementById("code").value;
  const note = document.getElementById("note").value;

  if (code && note) {
    chrome.storage.sync.get(["notes"], function (result) {
      let notes = result.notes || [];
      notes.push({ code, note });
      chrome.storage.sync.set({ notes }, function () {
        alert("Note saved!");
        document.getElementById("code").value = "";
        document.getElementById("note").value = "";
      });
    });
  } else {
    alert("Please enter both code and note.");
  }
});

document.getElementById("view").addEventListener("click", function () {
  chrome.storage.sync.get(["notes"], function (result) {
    const notes = result.notes || [];
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>Note ${index + 1}:</strong><br>${
        note.code
      }<br><br>${note.note}`;
      notesList.appendChild(listItem);
    });

    document.getElementById("notes-container").style.display = "block";
  });
});
