const TeacherSelectInput = ({ selectedTeacherId, setSelectedTeacherId, teachers, positionLabel, updateTeacherName }) =>  {
    console.log("渡されたselectedTeacherId:", selectedTeacherId);
    const handleChange = (e) => {
      const newTeacherId = e.target.value;
      setSelectedTeacherId(newTeacherId);
      // ここでデータベースを更新する関数を呼び出す
      updateTeacherName(positionLabel, newTeacherId);
    };
  
    return (
      <select
        value={selectedTeacherId}
        onChange={handleChange}
        className="text-lg border border-gray-300 rounded p-1 w-40"
      >
         {!selectedTeacherId && <option value="">講師を選択</option>}
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
        ))}
      </select>
    );
  };
  
  
  export default TeacherSelectInput;
  