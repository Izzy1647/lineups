(() => {
    /**
     * The id of the current match.
     */
    let currentMatchId = "";

    let homeTeam = "";

    let awayTeam = "";

    let currentVideoBookmarks = [];

    // Adds a listener to monitor the msg sent by background.js
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, matchId } = obj;

        if (type === "NEW") {
            currentMatchId = matchId;
            newMatchLoaded();
        }
    });

    /**
     * Retrieves stored bookmarks from Chrome storage.
     * @returns void
     */
    // const fetchBookMarks = () => {
    //     return new Promise(resolve => {
    //         chrome.storage.sync.get([currentVideo], obj => {
    //             resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
    //         });
    //     });
    // };

    /**
     * Inserts add bookmark button when new youtube video is loaded.
     */
    const newMatchLoaded = async () => {
        console.log("loaded");
        const teamNameElements = document.querySelectorAll("[class^=style_teamInfo_]");

        console.log("elele:", document.getElementsByClassName("style_teamInfo_2wE"));

        console.log(teamNameElements);

        // if (teamNameElements.length === 2) {
        homeTeam = teamNameElements[0].innerHTML;
        awayTeam = teamNameElements[1].innerHTML;

        console.log("ht:", homeTeam, "at:", awayTeam);
        // }
    };

    /**
     * Handles add bookmark button click event.
     */
    // const addNewBookmarkEventHandler = async () => {
    //     // Gets the time in the video and creates a newBookMark object.
    //     const currentTime = youtubePlayer.currentTime;

    //     // Each bookmark has a time parameter and a description parameter.
    //     const newBookmark = {
    //         time: currentTime,
    //         desc: "Bookmark at " + getTime(currentTime)
    //     };
    //     console.log("newBookMark:", newBookmark);

    //     // Gets current VideoBookmarks from chrome storage.
    //     currentVideoBookmarks = await fetchBookMarks();

    //     // Sync the bookmark to chrome storage.
    //     chrome.storage.sync.set({
    //         [currentVideo]: JSON.stringify(
    //             // Sorts all bookmarks in time order.
    //             [...currentVideoBookmarks, newBookmark].sort(
    //                 (a, b) => a.time - b.time
    //             )
    //         )
    //     }, () => {
    //         console.log("Chrome storage sync set.")
    //     });

    // };

    newMatchLoaded();
})();

/**
 * @param {Number} t in seconds format
 * @returns String in hh:mm:ss format
 */
const getTime = t => {
    return new Date(1000 * t).toISOString().substr(11, 8);
};
