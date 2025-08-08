import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import RegistrationForm from './RegistrationForm';

const RegistrationList = () => {
  const { registrations, courseOfferings, setRegistrations } = useContext(AppContext);

  const handleDelete = (id) => {
    setRegistrations(registrations.filter(r => r.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all registrations?')) {
      setRegistrations([]);
    }
  };

  const getOfferingName = (offeringId) => {
    const offering = courseOfferings.find(o => o.id === offeringId);
    return offering ? offering.name : 'Unknown';
  };

  return (
    <div className="registration-list">
      <h2>Student Registrations</h2>
      <RegistrationForm />
      
      {registrations.length === 0 ? (
        <p className="no-registrations">No registrations yet. Add your first registration above.</p>
      ) : (
        <>
          <div className="registration-actions">
            <button 
              onClick={handleClearAll}
              className="clear-all-btn"
            >
              Clear All Registrations
            </button>
            <span className="count">{registrations.length} registration(s)</span>
          </div>
          <ul>
            {registrations.map(registration => (
              <li key={registration.id}>
                <div>
                  <strong>{registration.studentName}</strong> - {getOfferingName(registration.offeringId)}
                </div>
                <button 
                  onClick={() => handleDelete(registration.id)}
                  className="delete-btn"
                  aria-label={`Delete registration for ${registration.studentName}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RegistrationList;