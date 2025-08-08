import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load from localStorage or use defaults
  const loadData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [courseTypes, setCourseTypes] = useState(() => 
    loadData('courseTypes', [
      { id: 1, name: 'Individual' },
      { id: 2, name: 'Group' },
      { id: 3, name: 'Special' }
    ])
  );

  const [courses, setCourses] = useState(() => 
    loadData('courses', [
      { id: 1, name: 'Hindi' },
      { id: 2, name: 'English' },
      { id: 3, name: 'Urdu' }
    ])
  );

  const [courseOfferings, setCourseOfferings] = useState(() => 
    loadData('courseOfferings', [
      { id: 1, courseId: 1, courseTypeId: 1, name: 'Individual - Hindi' },
      { id: 2, courseId: 2, courseTypeId: 2, name: 'Group - English' }
    ])
  );

  const [registrations, setRegistrations] = useState(() => 
    loadData('registrations', [])
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('courseTypes', JSON.stringify(courseTypes));
  }, [courseTypes]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('courseOfferings', JSON.stringify(courseOfferings));
  }, [courseOfferings]);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }, [registrations]);

  return (
    <AppContext.Provider value={{
      courseTypes, setCourseTypes,
      courses, setCourses,
      courseOfferings, setCourseOfferings,
      registrations, setRegistrations
    }}>
      {children}
    </AppContext.Provider>
  );
};