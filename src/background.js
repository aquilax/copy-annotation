chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();"
    },
    function(selection) {
      doCopy(selection[0], tab.url, tab.title, tab.index);
    }
  );
});

chrome.commands.onCommand.addListener(function(command) {
  if (command === "copy-page-element") {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      chrome.tabs.executeScript(
        {
          code: "window.getSelection().toString();"
        },
        function(selection) {
          doCopy(selection[0], tabs[0].url, tabs[0].title, tabs[0].index);
        }
      );
    });
  }
});

function onClick(info, tab) {
  doCopy(info.selectionText, tab.url, tab.title, tab.index);
}

function doCopy(selection, url, title, index) {
  var sp = new URLSearchParams("");
  sp.set("selection", selection);
  sp.set("title", title);
  sp.set("url", url);
  chrome.tabs.create({ url: "/copy.html?" + sp.toString(), index: index+1 });
}

function createContextMenuItem() {
  chrome.contextMenus.create({
    id: "copy-page-element",
    title: "Copy annotation",
    contexts: ["selection"]
  });
}

chrome.runtime.onStartup.addListener(function() {
  createContextMenuItem();
});

chrome.runtime.onInstalled.addListener(function() {
  createContextMenuItem();
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "copy-page-element") {
    onClick(info, tab);
  }
});
