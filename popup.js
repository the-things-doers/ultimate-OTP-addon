//listen to see if button is pressed
document.getElementById("mybutton").addEventListener("click", async () => {
    //get current tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    //executes scripts on tab
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: writeToForm,
    });
});

function writeToForm() {
    //find all password forms (this should work for both loggin and account creation)
    const passwordFields = document.querySelectorAll('input[type="password"]');
    if (passwordFields.length === 0) {
        alert("No password fields found on this page.");
    } else {
        passwordFields.forEach(field => {
        field.value = "password";
        // Trigger input events if needed (for React/Vue forms)
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
}