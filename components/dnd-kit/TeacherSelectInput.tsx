const TeacherSelectInput = ({ selectedTeacherId, onChange, teachers, placeholder }) => {
    return (
      <select
        className="text-lg border border-gray-300 rounded p-1 w-40" // 幅を制限
        value={selectedTeacherId}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
    );
  };
  
  export default TeacherSelectInput;
  