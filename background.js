/**
 * Monitors the browser tabs and checks if the tab url includes "sports.iqiyi.com/resource/pcw/live"
 * Typicl iQIYI game livestream url: https://sports.iqiyi.com/resource/pcw/live/1z60gfxqf47
 * https://sports.iqiyi.com/resource/pcw/live/17xnnqzz8pn
 */
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    // A typical iQIYI livestream url: https://sports.iqiyi.com/resource/pcw/live/1z60gfxqf47
    if (tab.url && tab.url.includes("sports.iqiyi.com/resource/pcw/live")) {
        const matchId = tab.url.split("/").pop();

        // Tells the extension that a new match livestream is loaded
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            matchId
        });
    }
});
