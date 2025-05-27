document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    chrome.storage.local.get(['extensionSettings'], function(result) {
        const settings = result.extensionSettings || {};
        document.getElementById('text').value = settings.text || '';
        document.getElementById('tagline').value = settings.tagline || '';
    });

    // Save settings on form submit
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const text = document.getElementById('text').value;
        const tagline = document.getElementById('tagline').value;

        const settings = { text, tagline };

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.runtime) {
            chrome.storage.local.set({ extensionSettings: settings }, function() {
                console.log('Settings saved successfully.');
                
            });
        } else {
            console.error('Chrome APIs are not available.');
        }
    });
});