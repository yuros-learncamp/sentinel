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

// Flag to prevent scroll listener from interfering after nav click
let isNavScrolling = false;
let navScrollTimer = null;

// Sidebar navigation click
document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
        // Skip if this is the nav-parent (handled separately below)
        if (item.classList.contains('nav-parent')) return;

        const section = item.dataset.section;
        const targetElement = document.getElementById(`${section}-section`);

        if (targetElement) {
            // Set flag so scroll listener doesn't interfere
            isNavScrolling = true;
            clearTimeout(navScrollTimer);
            navScrollTimer = setTimeout(() => { isNavScrolling = false; }, 1000);

            // Update active state
            document.querySelectorAll('.nav-item').forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');

            // If clicking a non-hasil top-level item, close submenu
            const hasilSections = ['hasil', 'hasil-bazzite', 'hasil-cachyos', 'hasil-nobara', 'hasil-testing', 'hasil-performa', 'hasil-stabilitas'];
            if (!hasilSections.includes(section)) {
                const submenu = document.querySelector('.nav-submenu');
                const parent = document.querySelector('.nav-parent');
                if (submenu && parent) {
                    submenu.classList.remove('show');
                    parent.classList.remove('expanded');
                }
            }

            // Scroll to section
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Toggle submenu for "hasil" + scroll to hasil section
const navParent = document.querySelector('.nav-parent');
if (navParent) {
    navParent.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('expanded');
        const submenu = document.querySelector('.nav-submenu');
        if (submenu) {
            submenu.classList.toggle('show');
        }
        feather.replace();

        // Scroll to hasil section
        const hasilSection = document.getElementById('hasil-section');
        if (hasilSection) {
            isNavScrolling = true;
            clearTimeout(navScrollTimer);
            navScrollTimer = setTimeout(() => { isNavScrolling = false; }, 1000);

            document.querySelectorAll('.nav-item').forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');

            hasilSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Scroll spy — only updates active highlight, NEVER touches submenu
let ticking = false;

function updateActiveSidebarItem() {
    if (isNavScrolling) return;

    const sections = document.querySelectorAll('[id$="-section"]');
    let currentSection = null;
    const scrollPos = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 300;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            currentSection = section.id.replace('-section', '');
        }
    });

    if (!currentSection) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 300;
            if (scrollPos >= sectionTop) {
                currentSection = section.id.replace('-section', '');
            }
        });
    }

    if (currentSection) {
        document.querySelectorAll('.nav-item[data-section]').forEach(navItem => navItem.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-section="${currentSection}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
        // NOTE: submenu is intentionally NOT touched here — only opens on click
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

window.addEventListener('load', function() {
    updateActiveSidebarItem();
    feather.replace();
});