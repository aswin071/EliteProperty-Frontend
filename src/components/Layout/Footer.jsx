import React from 'react';
import footerimage from '../../Images/footer.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center p-4 lg:p-8">
        <div className="mb-4 lg:mb-0 text-center lg:text-left"> {/* Center align on small screens */}
          <h1 className="text-xl lg:text-2xl font-semibold">EliteProperty</h1>
          <img
            src={footerimage}
            alt="End of Footer"
            className="w-40 lg:w-60"
          />
        </div>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="pt-4 lg:pt-0"> {/* Added padding to this container */}
            <h2 className="text-lg font-semibold">Location</h2>
            <p className="text-gray-600">123 Main St, City</p>
            <p className="text-gray-600">Country, ZIP</p>
          </div>
          <div className="pt-4 lg:pt-0"> {/* Added padding to this container */}
            <h2 className="text-lg font-semibold">Sitemap</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li><a href="#">Home</a></li>
              <li><a href="#">Properties</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="pt-4 lg:pt-0"> {/* Added padding to this container */}
            <h2 className="text-lg font-semibold">Blog</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li><a href="#">Latest Posts</a></li>
              <li><a href="#">Featured News</a></li>
              <li><a href="#">Archive</a></li>
            </ul>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 lg:mt-0"> {/* Added margin-top on small screens */}
          <a href="#" className="text-2xl text-gray-500 hover:text-blue-600 transition-colors">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-2xl text-gray-500 hover:text-blue-600 transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-2xl text-gray-500 hover:text-blue-600 transition-colors">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-2xl text-gray-500 hover:text-blue-600 transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <p className="text-center mt-6 text-gray-500">
        &copy; {currentYear} EliteProperty. All Rights Reserved.
      </p>
    </footer>
  );
}
