// Toggle sidebar
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('close-menu');

menuToggle.addEventListener('click', () => {
    document.body.classList.add('sidebar-open');
});

closeMenu.addEventListener('click', () => {
    document.body.classList.remove('sidebar-open');
});

overlay.addEventListener('click', () => {
    document.body.classList.remove('sidebar-open');
});

// Initialize Google Maps and Autocomplete
function initMap() {
    try {
        // Initialize the map
        const map = new google.maps.Map(document.getElementById('map-container'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 13,
            gestureHandling: 'cooperative' // Better touch control
        });

        // Add autocomplete to the pickup field
        const pickupInput = document.getElementById('pickup');
        const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
            fields: ['address_components', 'geometry', 'name'],
            types: ['geocode'],
        });

        // Add autocomplete to the dropoff field
        const dropoffInput = document.getElementById('dropoff');
        const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, {
            fields: ['address_components', 'geometry', 'name'],
            types: ['geocode'],
        });

        // Bind autocomplete fields to the map
        pickupAutocomplete.bindTo('bounds', map);
        dropoffAutocomplete.bindTo('bounds', map);

        // Handle form submission
        document.getElementById('rideForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pickup = document.getElementById('pickup').value;
            const dropoff = document.getElementById('dropoff').value;
            const time = document.getElementById('time').value;
            
            alert(`Booking confirmed!\nFrom: ${pickup}\nTo: ${dropoff}\nTime: ${time}`);
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        alert('Map loading failed. Please check your connection.');
    }
}

// Close sidebar when clicking on menu items
document.querySelectorAll('#sidebar a').forEach(item => {
    item.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
    });
});

//-33.9777610284874, 18.695671167342816
