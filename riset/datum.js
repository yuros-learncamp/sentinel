// Initialize Feather icons
feather.replace();

// Handle datum section navigation with smooth scroll
document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;
        const targetElement = document.getElementById(`${section}-section`);
        
        if (targetElement) {
            // Remove active from all nav items
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active to clicked item
            item.classList.add('active');
            
            // Smooth scroll to section
            targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Re-initialize feather icons
            feather.replace();
        }
    });
});

// Download ZIP function
function downloadDatumZip(type) {
    alert(`Download ${type} ZIP akan segera tersedia!`);
}

// Initialize feather icons after page load
window.addEventListener('load', () => {
    feather.replace();
});