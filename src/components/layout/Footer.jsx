// Footer.tsx
import { Link } from 'react-router-dom';

// Footer组件：网站底部信息
// Footer component: Website footer information
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 项目信息 / Project information */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              Chemical Reaction 3D Visualization
              <span className="block text-sm opacity-75">Chemical Reaction 3D</span>
            </h3>
            <p className="text-sm text-gray-300">
              <span className="block">An interactive 3D visualization platform for chemical reactions</span>
            </p>
          </div>

          {/* 快速链接 / Quick links */}
          <div>
            <h4 className="text-lg font-bold mb-2">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link to="/help" className="hover:text-gray-300">Help</Link></li>
            </ul>
          </div>

          {/* 联系信息 / Contact information */}
          <div>
            <h4 className="text-lg font-bold mb-2">Contact Us</h4>
            <div className="text-sm space-y-2 text-gray-300">
              <p>Email: ?????@?????.com</p>
              <p>GitHub: https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;