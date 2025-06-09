import React from "react";
import "./Footer.css";
import wave from '../../assets/footer.png';
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <img src={wave} alt="Onda decorativa" className="footer-wave" />
      <div className="footer-content">
        <h2 className="footer-title">Patas Unidas © 2025</h2>
        <div className="footer-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={28} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook size={28} />
          </a>
          <a href="https://wa.me/seunumero" target="_blank" rel="noreferrer">
            <FaWhatsapp size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}
