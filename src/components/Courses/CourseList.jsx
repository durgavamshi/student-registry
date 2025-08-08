import { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseList = () => {
  const { courses, setCourses } = useContext(AppContext);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const editInputRef = useRef(null);

  // Focus the input when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditName(course.name);
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) return;
    
    setCourses(courses.map(c => 
      c.id === id ? { ...c, name: editName } : c
    ));
    setEditingId(null);
    setEditName('');
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleUpdate(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="course-list">
      <h2>Courses</h2>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (!editName.trim()) return;
          
          const newCourse = {
            id: Date.now(),
            name: editName
          };
          setCourses([...courses, newCourse]);
          setEditName('');
        }}
        className="form"
      >
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="New course name"
          required
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
        <button type="submit">Add Course</button>
      </form>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {editingId === course.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  ref={editInputRef}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, course.id)}
                />
                <button onClick={() => handleUpdate(course.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {course.name}
                <div className="actions">
                  <button 
                    onClick={() => handleEdit(course)}
                    aria-label={`Edit ${course.name}`}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(course.id)}
                    aria-label={`Delete ${course.name}`}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;