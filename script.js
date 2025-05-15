document.addEventListener('DOMContentLoaded', () => {
    const lootForm = document.getElementById('lootForm');
    const announcementsList = document.getElementById('announcementsList');

    // Load existing announcements when the page loads
    loadAnnouncements();

    // Handle form submission
    lootForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const itemName = document.getElementById('itemName').value;
        const itemRarity = document.getElementById('itemRarity').value;
        const itemDescription = document.getElementById('itemDescription').value;

        const announcement = {
            name: itemName,
            rarity: itemRarity,
            description: itemDescription,
            timestamp: new Date().toISOString()
        };

        try {
            // In a real application, this would be an API call to your backend
            // For now, we'll just add it to the local storage
            saveAnnouncement(announcement);
            displayAnnouncement(announcement);
            lootForm.reset();
        } catch (error) {
            console.error('Error saving announcement:', error);
            alert('Failed to save announcement. Please try again.');
        }
    });

    function saveAnnouncement(announcement) {
        const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        announcements.unshift(announcement); // Add to beginning of array
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }

    function loadAnnouncements() {
        const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        announcements.forEach(announcement => displayAnnouncement(announcement));
    }

    function displayAnnouncement(announcement) {
        const announcementElement = document.createElement('div');
        announcementElement.className = 'announcement-card';
        
        const timestamp = new Date(announcement.timestamp).toLocaleString();
        
        announcementElement.innerHTML = `
            <h3>${announcement.name}</h3>
            <div class="rarity rarity-${announcement.rarity}">${announcement.rarity.toUpperCase()}</div>
            <div class="description">${announcement.description}</div>
            <div class="timestamp">${timestamp}</div>
        `;

        announcementsList.insertBefore(announcementElement, announcementsList.firstChild);
    }
}); 