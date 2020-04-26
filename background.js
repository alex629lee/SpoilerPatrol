const updateSettings = (tabId) => {
  chrome.storage.sync.get({
    settings: 'default'
  }, (items) => {
    chrome.tabs.insertCSS(tabId, {
      file: `css/${items.settings}.css`,
      allFrames: false, runAt: "document_start" 
    });
  });
}

const browserListener = (tabId, changeInfo, tab) => {
  const regexPage = new RegExp(/https:\/\/www.crunchyroll.com\//);
  const match = regexPage.exec(tab.url);
  if (match) {
    updateSettings(tab.id);
  }
}
chrome.tabs.onUpdated.addListener(browserListener);