/**
 * Monitors the browser tabs and checks if the tab url includes "youtube.com/watch"
 * Typicl iQIYI game livestream url: https://sports.iqiyi.com/resource/pcw/live/1z60gfxqf47
 * https://sports.iqiyi.com/resource/pcw/live/17xnnqzz8pn
 */
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    // A typical youtube video url: https://www.youtube.com/watch?v=0n809nd4Zu4
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        // Tells the extension that a new youtube video is loaded
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v")
        });
    }
});
