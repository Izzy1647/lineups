(() => {
    // DOM element of youtube left control, and youtube player.
    let youtubeLeftControls, youtubePlayer;

    /**
     * The id of the current youtube video.
     */
    let currentVideo = "";

    let currentVideoBookmarks = [];

    // Adds a listener to monitor the msg sent by background.js
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    /**
     * Retrieves stored bookmarks from Chrome storage.
     * @returns void
     */
    const fetchBookMarks = () => {
        return new Promise(resolve => {
            chrome.storage.sync.get([currentVideo], obj => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    /**
     * Inserts add bookmark button when new youtube video is loaded.
     */
    const newVideoLoaded = async () => {
        // Checks if the bookmark button already exists.
        const bookmarkBtnExists =
            document.getElementsByClassName("bookmark-btn")[0];
        console.log("bookmark button exists?", bookmarkBtnExists);

        // Gets current VideoBookmarks from chrome storage.
        currentVideoBookmarks = await fetchBookMarks();

        if (!bookmarkBtnExists) {
            // Creates an <img> element.
            const bookmarkBtn = document.createElement("img");

            // Sets icon, styles, etc.
            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            // Appends the bookmark icon into the youtube video control bar.
            youtubeLeftControls =
                document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            youtubeLeftControls.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    };

    /**
     * Handles add bookmark button click event.
     */
    const addNewBookmarkEventHandler = async () => {
        // Gets the time in the video and creates a newBookMark object.
        const currentTime = youtubePlayer.currentTime;

        // Each bookmark has a time parameter and a description parameter.
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime)
        };
        console.log("newBookMark:", newBookmark);

        // Gets current VideoBookmarks from chrome storage.
        currentVideoBookmarks = await fetchBookMarks();

        // Sync the bookmark to chrome storage.
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify(
                // Sorts all bookmarks in time order.
                [...currentVideoBookmarks, newBookmark].sort(
                    (a, b) => a.time - b.time
                )
            )
        }, () => {
            console.log("Chrome storage sync set.")
        });

    };

    newVideoLoaded();
})();

/**
 * @param {Number} t in seconds format
 * @returns String in hh:mm:ss format
 */
const getTime = t => {
    return new Date(1000 * t).toISOString().substr(11, 8);
};
