// background.js

// Listen for the alarm event
chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === "instagramTimeLimit") {
        // Get the active tab and close it
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                chrome.tabs.remove(tabs[0].id);
            }
        });
    }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the updated tab is the Instagram page
    if (tab.url.includes("instagram.com")) {
        // Start the timer when the Instagram page is loaded
        chrome.alarms.create("instagramTimeLimit", {
            when: Date.now() + 60000, // Replace 60000 with your desired time limit in milliseconds
            periodInMinutes: 0
        });
    }
});
