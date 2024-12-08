// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
});

// Toggle theme and save preference
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Add event listeners to all theme toggle buttons
document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-toggle');
    themeButtons.forEach(button => button.addEventListener('click', toggleTheme));
});

// Navigate to another page while retaining the theme
function navigate(page) {
    window.location.href = page;
}
