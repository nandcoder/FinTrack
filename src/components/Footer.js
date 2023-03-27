import React from "react";
import { Navbar } from "react-bootstrap";

function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <Navbar>

            <footer>
                <p>Copyright © {currentYear} FinTrack</p>
                <p>Made with 💖 in India</p>
            </footer>
        </Navbar>
    );
}

export default Footer;