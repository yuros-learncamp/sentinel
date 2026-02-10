// Initialize Feather icons
feather.replace();

// Team data
const teamData = [
    {
        name: "Amba",
        role: "Leader Company",
        image: "images/amba.jpg",
        bio: "Proyek dari izanagi merupakan riset untuk pengembangan sistem operasi yang berfokus pada gaming dengan distro archlinux. Pengembangan sistem operasi untuk gaming ini berfokus pada stabilitas, performa, dan stabilitas bagi pengguna dalam memainkan game dalam platform linux."
    },
    {
        name: "Sarah",
        role: "Product Designer",
        image: "images/sarah.jpg",
        bio: "Menciptakan pengalaman pengguna yang intuitif dan menarik. Fokus pada desain interface yang memudahkan interaksi antara pengguna dan sistem operasi gaming berbasis Linux."
    },
    {
        name: "David",
        role: "Backend Developer",
        image: "images/david.jpg",
        bio: "Mengembangkan infrastruktur backend yang robust dan scalable. Memastikan performa optimal untuk gaming experience dengan optimasi sistem dan resource management."
    },
    {
        name: "Maya",
        role: "Frontend Developer",
        image: "images/maya.jpg",
        bio: "Membangun interface yang responsif dan performant. Mengintegrasikan teknologi web modern untuk dashboard dan control panel sistem operasi gaming."
    },
    {
        name: "Alex",
        role: "DevOps Engineer",
        image: "images/alex.jpg",
        bio: "Mengelola deployment dan continuous integration. Memastikan stabilitas sistem dan otomasi proses untuk distribusi archlinux gaming edition."
    },
    {
        name: "Emma",
        role: "QA Specialist",
        image: "images/emma.jpg",
        bio: "Melakukan testing menyeluruh pada berbagai game dan hardware. Memastikan kompatibilitas dan performa optimal di platform Linux gaming."
    },
    {
        name: "James",
        role: "Systems Architect",
        image: "images/james.jpg",
        bio: "Merancang arsitektur sistem yang efisien dan modular. Mengoptimalkan kernel dan driver untuk performa gaming maksimal di archlinux."
    },
    {
        name: "Lisa",
        role: "Community Manager",
        image: "images/lisa.jpg",
        bio: "Membangun dan mengelola komunitas pengguna. Mengumpulkan feedback dan mendukung user dalam migrasi ke Linux gaming platform."
    }
];

let currentIndex = 0;

// Update member info
function updateMemberInfo(index) {
    const member = teamData[index];
    document.getElementById('member-image').src = member.image;
    document.getElementById('label-name').textContent = member.name;
    document.getElementById('label-role').textContent = member.role;
    // Don't change the title and bio - keep "latar belakang" static

    // Update active card
    document.querySelectorAll('.team-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-index="${index}"]`).classList.add('active');

    // Scroll to active card
    const activeCard = document.querySelector(`[data-index="${index}"]`);
    activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// Navigation buttons
document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + teamData.length) % teamData.length;
    updateMemberInfo(currentIndex);
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % teamData.length;
    updateMemberInfo(currentIndex);
});

// Click on team cards
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        currentIndex = index;
        updateMemberInfo(index);
    });
});

// Add member functionality
document.querySelector('.add-member').addEventListener('click', () => {
    alert('Fitur tambah anggota tim akan segera hadir!');
});

// Sidebar navigation scroll
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
            
            // Close submenu if clicking on non-parent items
            if (!item.classList.contains('nav-parent')) {
                const submenu = document.querySelector('.nav-submenu');
                const parent = document.querySelector('.nav-parent');
                if (submenu && parent) {
                    submenu.classList.remove('show');
                    parent.classList.remove('expanded');
                }
            }
            
            // Smooth scroll to section
            targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Toggle submenu for "hasil"
const navParent = document.querySelector('.nav-parent');
if (navParent) {
    navParent.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('expanded');
        const submenu = document.querySelector('.nav-submenu');
        if (submenu) {
            submenu.classList.toggle('show');
        }
        
        // Re-initialize feather icons for the arrow
        feather.replace();
    });
}

// Auto-scroll sidebar based on scroll position - FIXED VERSION
let ticking = false;

function updateActiveSidebarItem() {
    const sections = document.querySelectorAll('[id$="-section"]');
    let currentSection = null;
    const scrollPos = window.scrollY;
    
    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 300; // Adjust threshold
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            currentSection = section.id.replace('-section', '');
        }
    });
    
    // Fallback: if no section found, use the last passed section
    if (!currentSection) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 300;
            if (scrollPos >= sectionTop) {
                currentSection = section.id.replace('-section', '');
            }
        });
    }
    
    if (currentSection) {
        // Remove active from all nav items
        document.querySelectorAll('.nav-item[data-section]').forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // Add active to current section
        const activeNav = document.querySelector(`.nav-item[data-section="${currentSection}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
            
            // Auto-expand hasil submenu if needed
            const hasilSections = ['hasil', 'hasil-bazzite', 'hasil-cachyos', 'hasil-nobara', 'hasil-testing', 'hasil-performa', 'hasil-stabilitas'];
            const submenu = document.querySelector('.nav-submenu');
            const parent = document.querySelector('.nav-parent');
            
            if (hasilSections.includes(currentSection)) {
                if (submenu && parent) {
                    submenu.classList.add('show');
                    parent.classList.add('expanded');
                }
            }
        }
    }
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateActiveSidebarItem();
            ticking = false;
        });
        ticking = true;
    }
});

// Run once on page load
window.addEventListener('load', function() {
    updateActiveSidebarItem();
    feather.replace();
});