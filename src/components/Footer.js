import React from "react";

function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>Copyright © {currentYear} FinTrack</p>
            <p>Made with 💖 in India</p>
        </footer>
    );
}

export default Footer;