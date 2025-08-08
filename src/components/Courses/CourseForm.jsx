import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseForm = ({ editCourse, setEditCourse }) => {
  const { courses, setCourses } = useContext(AppContext);
  const [name, setName] = useState(editCourse ? editCourse.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editCourse) {
      setCourses(courses.map(c => 
        c.id === editCourse.id ? { ...c, name } : c
      ));
      setEditCourse(null);
    } else {
      const newCourse = {
        id: Date.now(),
        name
      };
      setCourses([...courses, newCourse]);
    }
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course name"
        required
      />
      <button type="submit">
        {editCourse ? 'Update' : 'Add'} Course
      </button>
      {editCourse && (
        <button type="button" onClick={() => {
          setEditCourse(null);
          setName('');
        }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default CourseForm;