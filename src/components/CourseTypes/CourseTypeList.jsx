import { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseTypeList = () => {
  const { courseTypes, setCourseTypes } = useContext(AppContext);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const editInputRef = useRef(null);

  // Focus the input when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleEdit = (courseType) => {
    setEditingId(courseType.id);
    setEditName(courseType.name);
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) return;
    
    setCourseTypes(courseTypes.map(ct => 
      ct.id === id ? { ...ct, name: editName } : ct
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
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
  };

  return (
    <div className="course-type-list">
      <h2>Course Types</h2>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (!editName.trim()) return;
          
          const newCourseType = {
            id: Date.now(),
            name: editName
          };
          setCourseTypes([...courseTypes, newCourseType]);
          setEditName('');
        }}
        className="form"
      >
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="New course type name"
          required
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
        <button type="submit">Add Course Type</button>
      </form>
      <ul>
        {courseTypes.map(ct => (
          <li key={ct.id}>
            {editingId === ct.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  ref={editInputRef}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, ct.id)}
                />
                <button onClick={() => handleUpdate(ct.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {ct.name}
                <div className="actions">
                  <button 
                    onClick={() => handleEdit(ct)}
                    aria-label={`Edit ${ct.name}`}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(ct.id)}
                    aria-label={`Delete ${ct.name}`}
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

export default CourseTypeList;