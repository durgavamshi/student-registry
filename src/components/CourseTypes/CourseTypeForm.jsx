import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseTypeForm = ({ editCourseType, setEditCourseType }) => {
  const { courseTypes, setCourseTypes } = useContext(AppContext);
  const [name, setName] = useState(editCourseType ? editCourseType.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editCourseType) {
      setCourseTypes(courseTypes.map(ct => 
        ct.id === editCourseType.id ? { ...ct, name } : ct
      ));
      setEditCourseType(null);
    } else {
      const newCourseType = {
        id: Date.now(),
        name
      };
      setCourseTypes([...courseTypes, newCourseType]);
    }
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course type name"
        required
      />
      <button type="submit">
        {editCourseType ? 'Update' : 'Add'} Course Type
      </button>
      {editCourseType && (
        <button type="button" onClick={() => {
          setEditCourseType(null);
          setName('');
        }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default CourseTypeForm;