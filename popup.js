import { getCurrentTab } from "./utils.js";

/**
 *
 * @param {HTMLElement} bookmarksElement The container of all bookmarks.
 * @param {*} bookmark
 */
const addNewBookmark = (bookmarksElement, bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const newBookMarkElement = document.createElement("div");

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";

    newBookMarkElement.id = `bookmark${bookmark.time}`;
    newBookMarkElement.className = "bookmark";
    newBookMarkElement.setAttribute("timestamp", bookmark.time);

    // Adds title to the bookmark element and appends the bookmark element to the popup container.
    newBookMarkElement.appendChild(bookmarkTitleElement);
    bookmarksElement.appendChild(newBookMarkElement);
};

/**
 * Displays all bookmarks of the current video.
 * @param {Array} currentBookMarks
 */
const viewBookmarks = (currentBookmarks = []) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";

    if (currentBookmarks.length > 0) {
        currentBookmarks.forEach(bookmark => {
            addNewBookmark(bookmarksElement, bookmark);
        });
    } else {
        bookmarksElement.innerHTML = "<p>No bookmarks.</p>";
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes = () => {};

// Gets called when dom content is loaded.
document.addEventListener("DOMContentLoaded", async () => {

    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    // // Gets the current youtube video id.
    // const currentVideo = urlParameters.get("v");

    // console.log("Current video:", currentVideo);

    // if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    //     chrome.storage.sync.get([currentVideo], data => {
    //         console.log("chrome storage data:", data);
    //         const currentVideoBookmarks = data[currentVideo]
    //             ? JSON.parse(data[currentVideo])
    //             : [];

    //         console.log("currentVideoBookmarks:", currentVideoBookmarks);

    //         viewBookmarks(currentVideoBookmarks);
    //     });
    // } else {
    //     // Not a youtube page
    //     console.log("Not a yt page.");

    //     const container = document.getElementsByClassName("container")[0];
    //     container.innerHTML =
    //         '<div class="title">This is not a Youtube video.</div>';
    // }
});
