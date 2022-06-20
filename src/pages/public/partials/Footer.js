import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">Déveloper par <a className="text-blue-600 hover:underline" href="https://cruip.com/">Epic Road trip</a>. Tous droits réservés</div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
