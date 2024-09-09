document.addEventListener('DOMContentLoaded', function() {
    console.log('Vertical Header Loaded');

    const toggleButton = document.getElementById('toggle-header');
    const header = document.querySelector('.vertical-header');
    const searchInput = document.getElementById('search');

    toggleButton.addEventListener('click', function() {
        if (header.style.left === '0px') {
            header.style.left = '-400px';
        } else {
            header.style.left = '0px';
        }
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const sections = document.querySelectorAll('.content section');

        sections.forEach(section => {
            const heading = section.querySelector('h1').textContent.toLowerCase();
            if (heading.includes(query)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});