import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistrations from './components/StudentRegistrations';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('courseTypes');

  const renderTab = () => {
    switch (activeTab) {
      case 'courseTypes':
        return <CourseTypes />;
      case 'courses':
        return <Courses />;
      case 'courseOfferings':
        return <CourseOfferings />;
      case 'registrations':
        return <StudentRegistrations />;
      default:
        return <CourseTypes />;
    }
  };

  return (
    <AppProvider>
      <div className="app">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="container">
          {renderTab()}
        </div>
      </div>
    </AppProvider>
  );
}

export default App;