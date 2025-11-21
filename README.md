# Portfolio

This repository contains a portfolio showcasing the skills and projects of ASanthoshKumar1.

## Key Features & Benefits

*   **Showcase of Skills:** Demonstrates proficiency in JavaScript and related technologies.
*   **Project Examples:** Provides concrete examples of completed projects.
*   **Resume Access:** Includes downloadable resumes in PDF format.
*   **Contact Information:** Facilitates easy connection for potential employers or collaborators.
*   **Visually Appealing Design:** Implements a unique "Dravidian Cyber-Fusion - Peacock Edition" theme for a modern and engaging user experience.

## Prerequisites & Dependencies

*   Web browser (Chrome, Firefox, Safari, etc.)
*   Text editor or IDE (VS Code, Sublime Text, etc.)
*   (Optional) Basic understanding of HTML, CSS, and JavaScript.

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ASanthoshKumar1/portfolio.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd portfolio
    ```

3.  **Open `index.html` in your web browser.** No further installation is required as the project is client-side.

## Usage Examples & API Documentation (if applicable)

This portfolio is a static website. To view it, simply open the `index.html` file in your browser. There is no backend or API to document.

The `script.js` file contains the JavaScript logic, primarily for the typing animation effect in the hero section. The animation is triggered on page load and iterates through different phrases.

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const hero = document.getElementById('hero');
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.blinking-cursor');

    // --- Double-Loop Reveal Content (Tamil & Cybersecurity) ---
    const phases = [
        "யாதும் ஊரே யாவரும் ...
```

## Configuration Options

The portfolio's appearance is primarily controlled by the `style.css` file. You can customize the following aspects by modifying the CSS variables:

*   **Theme Colors:** `--bg-dark`, `--text-light`, `--accent-gold`, `--accent-teal`, etc.
*   **Font Family:** Modify the `font-family` property in the `:root` selector.
*   **Other Styling:** Adjust spacing, sizes, and other visual elements to your preference.

## Contributing Guidelines

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Submit a pull request.

Please ensure your code adheres to the existing style and conventions.

## License Information

No license specified. All rights reserved by ASanthoshKumar1.

## Acknowledgments

*   Font Awesome for the icons.
*   Google Fonts for the typography.
