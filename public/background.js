// whatever you write here runs whenever you open extension
// or you install it for the first time

chrome.runtime.onInstalled.addListener(() => {
	console.log("installed");
});
