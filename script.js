// Global variables for autocomplete
let pickupAutocomplete;
let dropoffAutocomplete;

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('close-menu');
const rideForm = document.getElementById('rideForm');
const pickupInput = document.getElementById('pickup');
const dropoffInput = document.getElementById('dropoff');

// Make this function reusable for both pages
function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('close-menu');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.add('sidebar-open');
        });

        closeMenu.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });

        overlay.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });

        // Close sidebar when clicking on menu items (mobile only)
        if (window.matchMedia("(max-width: 991px)").matches) {
            document.querySelectorAll('#sidebar a').forEach(item => {
                item.addEventListener('click', () => {
                    document.body.classList.remove('sidebar-open');
                });
            });
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();

        });
    });
}

// Initialize Google Maps and Autocomplete
function initMap() {
    try {
        // Initialize the map
        const map = new google.maps.Map(document.getElementById('map-container'), {
            center: { lat: -33.922, lng: 18.4231 },
            zoom: 13,
            gestureHandling: 'cooperative'
        });

        // Initialize autocomplete for pickup and dropoff
        pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
            fields: ['address_components', 'geometry', 'name'],
            types: ['geocode'],
        });

        dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, {
            fields: ['address_components', 'geometry', 'name'],
            types: ['geocode'],
        });

        // Bind autocomplete fields to the map
        pickupAutocomplete.bindTo('bounds', map);
        dropoffAutocomplete.bindTo('bounds', map);

        // Optional: Add place changed listeners
        pickupAutocomplete.addListener('place_changed', () => {
            const place = pickupAutocomplete.getPlace();
            console.log('Pickup place:', place);
        });

        dropoffAutocomplete.addListener('place_changed', () => {
            const place = dropoffAutocomplete.getPlace();
            console.log('Dropoff place:', place);
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        alert('Map loading failed. Please check your connection.');
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const pickup = pickupInput.value;
    const dropoff = dropoffInput.value;
    const time = document.getElementById('time').value;
    const passengers = document.getElementById('passengers').value;
    
    if (!pickup || !dropoff || !time) {
        alert('Please fill in all required fields');
        return;
    }
    
    console.log('Booking details:', { pickup, dropoff, time, passengers });
    alert(`Booking confirmed!\nFrom: ${pickup}\nTo: ${dropoff}\nTime: ${time}\nPassengers: ${passengers}`);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    
    rideForm.addEventListener('submit', handleFormSubmit);
    
    // If Google Maps API is already loaded (might happen with cached resources)
    if (window.google && window.google.maps) {
        initMap();
    }
});

//-33.9777610284874, 18.695671167342816
