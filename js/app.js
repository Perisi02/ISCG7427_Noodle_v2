// ── Noodle App — shared JS ─────────────────────────────

const STORAGE_KEYS = {
    USERS: 'noodle_users',
    SESSION: 'noodle_session',
    COURSES: 'noodle_courses',
    RESOURCES: 'noodle_resources',
    TEXT_SIZE: 'noodle_text_size',
    DARK_MODE: 'noodle_dark_mode',
};

// ── Seed data ──────────────────────────────────────────
function seedData() {
    const SEED_VERSION = '2';
    if (localStorage.getItem('noodle_seed_version') === SEED_VERSION) return;
    localStorage.clear();
    localStorage.setItem('noodle_seed_version', SEED_VERSION);

    const users = [
        { id: 'u1', name: 'Student User', email: 'student@noodle.ac.nz', password: 'student123', role: 'student', enrolled: ['c1', 'c2', 'c3'] },
        { id: 'u2', name: 'Lecturer User', email: 'lecturer@noodle.ac.nz', password: 'lecturer123', role: 'lecturer', courses: ['c1', 'c2'] },
        { id: 'u3', name: 'Admin User', email: 'admin@noodle.ac.nz', password: 'admin123', role: 'admin', enrolled: [] },
        { id: 'u4', name: 'Student Two', email: 'student2@noodle.ac.nz', password: 'student123', role: 'student', enrolled: ['c1', 'c3'] },
    ];

    const courses = [
        {
            id: 'c1',
            code: 'ISCG7427',
            name: 'Agile and Lean Software Delivery',
            description: 'User stories, sprint planning, stand-ups, retrospectives, and prototype evidence.',
            published: true,
            progress: 65,
            status: 'Must focus',
            statusType: 'amber',
            topics: [
                {
                    id: 't1', title: 'Topic 1: Introduction to Agile',
                    summary: 'Agile is an iterative approach to software development that emphasises collaboration, flexibility, and delivering working software frequently.',
                    resources: ['r1', 'r2']
                },
                {
                    id: 't2', title: 'Topic 2: Scrum Framework',
                    summary: 'Scrum is a lightweight framework that helps teams work together using sprints, daily stand-ups, and retrospectives.',
                    resources: ['r3', 'r4']
                },
                {
                    id: 't3', title: 'Topic 3: User Stories',
                    summary: 'User stories are short, simple descriptions of a feature from the perspective of the person who desires the new capability.',
                    resources: ['r5']
                },
                {
                    id: 't4', title: 'Topic 4: Lean Principles',
                    summary: 'Lean thinking focuses on maximising value while minimising waste across the development process.',
                    resources: []
                },
                {
                    id: 't5', title: 'Topic 5: Agile Estimation and Planning Poker',
                    summary: 'Planning poker is a consensus-based technique for estimating effort in agile development, using story points.',
                    resources: ['r6', 'r7']
                },
            ]
        },
        {
            id: 'c2',
            code: 'ISCG7420',
            name: 'Web Application Development',
            description: 'Django, templates, views, routing, databases, and deployment practice.',
            published: true,
            progress: 42,
            status: 'In progress',
            statusType: 'teal',
            topics: [
                { id: 't6', title: 'Topic 1: HTML & CSS Fundamentals', summary: 'The building blocks of the web — structuring content with HTML and styling with CSS.', resources: ['r8'] },
                { id: 't7', title: 'Topic 2: Python & Django', summary: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.', resources: ['r9', 'r10'] },
            ]
        },
        {
            id: 'c3',
            code: 'ISCG7444',
            name: 'Cloud Application Design',
            description: 'Cloud architecture, design decisions, deployment, and system planning.',
            published: true,
            progress: 28,
            status: 'In progress',
            statusType: 'teal',
            topics: [
                { id: 't8', title: 'Topic 1: Cloud Fundamentals', summary: 'An introduction to cloud computing models: IaaS, PaaS, and SaaS.', resources: ['r11'] },
            ]
        },
    ];

    const resources = [
        { id: 'r1', title: 'Agile Manifesto Overview', type: 'pdf', description: 'The original Agile Manifesto and its 12 principles explained in plain language.', important: true, courseId: 'c1', topicId: 't1', url: '#' },
        { id: 'r2', title: 'Intro to Agile slides', type: 'slides', description: 'Week 1 lecture slides covering the history and key values of agile development.', important: false, courseId: 'c1', topicId: 't1', url: '#' },
        { id: 'r3', title: 'Scrum Guide 2020', type: 'pdf', description: 'The official Scrum Guide — the definitive reference for Scrum practitioners.', important: true, courseId: 'c1', topicId: 't2', url: '#' },
        { id: 'r4', title: 'Scrum Roles Explained', type: 'video', description: 'A 12-minute video walking through the Product Owner, Scrum Master, and Dev Team roles.', important: false, courseId: 'c1', topicId: 't2', url: '#' },
        { id: 'r5', title: 'Writing Good User Stories', type: 'pdf', description: 'A practical guide to writing user stories with acceptance criteria using the INVEST criteria.', important: true, courseId: 'c1', topicId: 't3', url: '#' },
        { id: 'r6', title: 'Topic 5 slides', type: 'slides', description: 'Story points, planning poker, and task estimates. Core reading for Sprint 2.', important: true, courseId: 'c1', topicId: 't5', url: '#' },
        { id: 'r7', title: 'Planning Poker exercise', type: 'pdf', description: 'Practice sheet for the in-class estimation exercise using Fibonacci numbers.', important: false, courseId: 'c1', topicId: 't5', url: '#' },
        { id: 'r8', title: 'HTML/CSS Basics guide', type: 'pdf', description: 'A reference guide covering HTML5 elements and common CSS properties.', important: false, courseId: 'c2', topicId: 't6', url: '#' },
        { id: 'r9', title: 'Django Getting Started', type: 'link', description: 'Official Django tutorial — setting up your first project and running the dev server.', important: true, courseId: 'c2', topicId: 't7', url: 'https://docs.djangoproject.com' },
        { id: 'r10', title: 'Django Models lecture', type: 'slides', description: 'Lecture slides on defining models, migrations, and querying the ORM.', important: false, courseId: 'c2', topicId: 't7', url: '#' },
        { id: 'r11', title: 'Cloud Computing Introduction', type: 'pdf', description: 'An overview of cloud service models and major providers (AWS, Azure, GCP).', important: false, courseId: 'c3', topicId: 't8', url: '#' },
    ];

    const homework = [
        { id: 'hw1', title: 'Read Topic 5 estimation slides', courseId: 'c1', courseCode: 'ISCG7427', due: 'Due Monday', priority: 'soon', done: false },
        { id: 'hw2', title: 'Prepare stand-up progress update', courseId: 'c1', courseCode: 'ISCG7427', due: 'Due Monday', priority: 'high', done: false },
        { id: 'hw3', title: 'Review HTML/CSS basics', courseId: 'c2', courseCode: 'ISCG7420', due: 'Due Friday', priority: 'upcoming', done: false },
    ];

    const assignments = [
        { id: 'a1', title: 'Milestone 3 Sprint Planning', courseId: 'c1', courseCode: 'ISCG7427', due: 'Due this week', priority: 'high' },
        { id: 'a2', title: 'Prototype screenshots and evidence', courseId: 'c1', courseCode: 'ISCG7427', due: 'Due next week', priority: 'soon' },
    ];

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    localStorage.setItem('noodle_resources', JSON.stringify(resources));
    localStorage.setItem('noodle_homework', JSON.stringify(homework));
    localStorage.setItem('noodle_assignments', JSON.stringify(assignments));
}

// ── Auth helpers ───────────────────────────────────────
function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getSession() {
    const s = localStorage.getItem(STORAGE_KEYS.SESSION);
    return s ? JSON.parse(s) : null;
}

function setSession(user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
}

function clearSession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
}

function requireAuth(allowedRoles) {
    const session = getSession();
    if (!session) {
        window.location.href = '../index.html';
        return null;
    }
    if (allowedRoles && !allowedRoles.includes(session.role)) {
        redirectByRole(session.role);
        return null;
    }
    return session;
}

function redirectByRole(role) {
    if (role === 'student') window.location.href = 'pages/student-home.html';
    else if (role === 'lecturer') window.location.href = 'pages/lecturer-home.html';
    else if (role === 'admin') window.location.href = 'pages/admin-users.html';
}

function signOut() {
    clearSession();
    window.location.href = '../index.html';
}

// ── Data helpers ───────────────────────────────────────
function getCourses() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES) || '[]');
}

function saveCourses(courses) {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
}

function getResources() {
    return JSON.parse(localStorage.getItem('noodle_resources') || '[]');
}

function saveResources(resources) {
    localStorage.setItem('noodle_resources', JSON.stringify(resources));
}

function getHomework() {
    return JSON.parse(localStorage.getItem('noodle_homework') || '[]');
}

function getAssignments() {
    return JSON.parse(localStorage.getItem('noodle_assignments') || '[]');
}

// ── Accessibility helpers ──────────────────────────────
function applyTextSize() {
    const size = localStorage.getItem(STORAGE_KEYS.TEXT_SIZE) || '100';
    document.documentElement.style.fontSize = (parseInt(size) / 100 * 15) + 'px';
}

function applyDarkMode() {
    const dark = localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
    document.documentElement.classList.toggle('dark', dark);
}

// ── Nav builder ────────────────────────────────────────
function buildNav(activePage) {
    const session = getSession();
    if (!session) return;

    const navLinks = document.getElementById('nav-links');
    const navRight = document.getElementById('nav-right');

    if (!navLinks || !navRight) return;

    let links = [];
    const base = '../pages/';

    const soon = label => base + 'coming-soon.html?page=' + encodeURIComponent(label);

    if (session.role === 'student') {
        links = [
            { label: 'Home', href: base + 'student-home.html', key: 'home' },
            { label: 'Courses', href: soon('Courses'), key: 'courses' },
            { label: 'Assignments', href: soon('Assignments'), key: 'assignments' },
            { label: 'Resources', href: soon('Resources'), key: 'resources' },
        ];
    } else if (session.role === 'lecturer') {
        links = [
            { label: 'Dashboard', href: base + 'lecturer-home.html', key: 'home' },
            { label: 'My Courses', href: soon('My Courses'), key: 'courses' },
            { label: 'Resources', href: soon('Resources'), key: 'resources' },
        ];
    } else if (session.role === 'admin') {
        links = [
            { label: 'Users', href: base + 'admin-users.html', key: 'users' },
            { label: 'Courses', href: soon('Courses'), key: 'courses' },
        ];
    }

    navLinks.innerHTML = links.map(l =>
        `<a href="${l.href}" class="nav-link${activePage === l.key ? ' active' : ''}">${l.label}</a>`
    ).join('');

    const initials = session.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    navRight.innerHTML = `
    <span class="nav-avatar">${initials}</span>
    <span class="nav-user-name">${session.name}</span>
    <button class="nav-signout" onclick="signOut()">Sign out</button>
  `;
}

// ── Init ───────────────────────────────────────────────
seedData();
applyTextSize();
applyDarkMode();