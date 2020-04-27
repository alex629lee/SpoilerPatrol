function save_options() {
  var settings = document.getElementById('hideSettings').value;
  chrome.storage.sync.set({
    settings: settings
  }, function () {
    // Update saveButton to let user know options were saved.
    var saveButton = document.getElementById('save');
    saveButton.disabled = true;
    saveButton.textContent = 'Saved!';
    setTimeout(function () {
      saveButton.textContent = 'Save';
      saveButton.disabled = false;
    }, 750);
  });
  chrome.tabs.query({ status: 'complete' }, (tabs) => {
    tabs.forEach((tab) => {
      let regexPage = new RegExp(/https:\/\/www.crunchyroll.com\//);
      let match = regexPage.exec(tab.url);
      if (match) {
        chrome.tabs.update(tab.id, { url: tab.url });
      }
    });
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    settings: 'default',
  }, function (items) {
    document.getElementById('hideSettings').value = items.settings;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);


