import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseOfferingForm = () => {
  const { courses, courseTypes, courseOfferings, setCourseOfferings } = useContext(AppContext);
  const [courseId, setCourseId] = useState('');
  const [courseTypeId, setCourseTypeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseId || !courseTypeId) return;

    const course = courses.find(c => c.id === parseInt(courseId));
    const courseType = courseTypes.find(ct => ct.id === parseInt(courseTypeId));

    if (!course || !courseType) return;

    const newOffering = {
      id: Date.now(),
      courseId: parseInt(courseId),
      courseTypeId: parseInt(courseTypeId),
      name: `${courseType.name} - ${course.name}`
    };
    
    setCourseOfferings([...courseOfferings, newOffering]);
    setCourseId('');
    setCourseTypeId('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        required
      >
        <option value="">Select Course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>
      <select
        value={courseTypeId}
        onChange={(e) => setCourseTypeId(e.target.value)}
        required
      >
        <option value="">Select Course Type</option>
        {courseTypes.map(courseType => (
          <option key={courseType.id} value={courseType.id}>
            {courseType.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Course Offering</button>
    </form>
  );
};

export default CourseOfferingForm;