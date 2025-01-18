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
