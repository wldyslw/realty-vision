window.themeMatcher = window.matchMedia('(prefers-color-scheme: dark)');

const updateClass = (value) => {
    if (value === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (value === 'light') {
        document.documentElement.classList.remove('dark');
    } else if (window.themeMatcher.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

window.themeMatcher.addEventListener('change', (e) => {
    if (
        (e.matches || localStorage.theme === 'dark') &&
        localStorage.theme !== 'light'
    ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

updateClass(localStorage.theme);
