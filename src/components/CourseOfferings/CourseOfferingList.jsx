import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseOfferingForm from './CourseOfferingForm';
import FilterOfferings from './FilterOfferings';

const CourseOfferingList = () => {
  const { courseOfferings, setCourseOfferings, courses, courseTypes } = useContext(AppContext);
  const [editingId, setEditingId] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [editValues, setEditValues] = useState({
    courseId: '',
    courseTypeId: ''
  });

  // Update edit values when editingId changes
  useEffect(() => {
    if (editingId) {
      const offering = courseOfferings.find(o => o.id === editingId);
      if (offering) {
        setEditValues({
          courseId: offering.courseId,
          courseTypeId: offering.courseTypeId
        });
      }
    }
  }, [editingId, courseOfferings]);

  const handleUpdate = (id) => {
    const course = courses.find(c => c.id === parseInt(editValues.courseId));
    const courseType = courseTypes.find(ct => ct.id === parseInt(editValues.courseTypeId));
    
    if (!course || !courseType) return;

    setCourseOfferings(courseOfferings.map(co => 
      co.id === id ? { 
        ...co, 
        courseId: parseInt(editValues.courseId),
        courseTypeId: parseInt(editValues.courseTypeId),
        name: `${courseType.name} - ${course.name}`
      } : co
    ));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
  };

  const filteredOfferings = filterType 
    ? courseOfferings.filter(co => co.courseTypeId === parseInt(filterType))
    : courseOfferings;

  return (
    <div className="course-offering-list">
      <h2>Course Offerings</h2>
      <FilterOfferings filterType={filterType} setFilterType={setFilterType} />
      
      {!editingId && <CourseOfferingForm />}

      <ul>
        {filteredOfferings.map(offering => (
          <li key={offering.id}>
            {editingId === offering.id ? (
              <div className="edit-form">
                <select
                  value={editValues.courseId}
                  onChange={(e) => setEditValues({...editValues, courseId: e.target.value})}
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <select
                  value={editValues.courseTypeId}
                  onChange={(e) => setEditValues({...editValues, courseTypeId: e.target.value})}
                >
                  <option value="">Select Course Type</option>
                  {courseTypes.map(courseType => (
                    <option key={courseType.id} value={courseType.id}>
                      {courseType.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleUpdate(offering.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {offering.name}
                <div className="actions">
                  <button onClick={() => setEditingId(offering.id)}>Edit</button>
                  <button onClick={() => handleDelete(offering.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOfferingList;