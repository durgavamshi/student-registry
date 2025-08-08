import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const FilterOfferings = ({ filterType, setFilterType }) => {
  const { courseTypes } = useContext(AppContext);

  return (
    <div className="filter-offerings">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">All Course Types</option>
        {courseTypes.map(courseType => (
          <option key={courseType.id} value={courseType.id}>
            {courseType.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOfferings;