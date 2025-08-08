import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <button 
        className={activeTab === 'courseTypes' ? 'active' : ''}
        onClick={() => setActiveTab('courseTypes')}
      >
        Course Types
      </button>
      <button 
        className={activeTab === 'courses' ? 'active' : ''}
        onClick={() => setActiveTab('courses')}
      >
        Courses
      </button>
      <button 
        className={activeTab === 'courseOfferings' ? 'active' : ''}
        onClick={() => setActiveTab('courseOfferings')}
      >
        Course Offerings
      </button>
      <button 
        className={activeTab === 'registrations' ? 'active' : ''}
        onClick={() => setActiveTab('registrations')}
      >
        Registrations
      </button>
    </nav>
  );
};

export default Navbar;