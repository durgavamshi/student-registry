import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const RegistrationForm = () => {
  const { courseOfferings, registrations, setRegistrations } = useContext(AppContext);
  const [studentName, setStudentName] = useState('');
  const [offeringId, setOfferingId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !offeringId) return;

    const newRegistration = {
      id: Date.now(),
      studentName,
      offeringId: parseInt(offeringId)
    };
    setRegistrations([...registrations, newRegistration]);
    setStudentName('');
    setOfferingId('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student name"
        required
      />
      <select
        value={offeringId}
        onChange={(e) => setOfferingId(e.target.value)}
        required
      >
        <option value="">Select Course Offering</option>
        {courseOfferings.map(offering => (
          <option key={offering.id} value={offering.id}>
            {offering.name}
          </option>
        ))}
      </select>
      <button type="submit">Register Student</button>
    </form>
  );
};

export default RegistrationForm;