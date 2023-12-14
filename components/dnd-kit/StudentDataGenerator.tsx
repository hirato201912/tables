"use client";

import React, { useState } from 'react';

const StudentDataGenerator = ({ onStudentCreate }) => {
  const [name, setName] = useState('');
  const [student_id, setStudentId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('');
  const [subject_1, setSubject1] = useState('');
  const [subject_2, setSubject2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: `S${new Date().getTime()}`, // 簡単なID生成
      student_id,
      name,
      schoolName,
      grade,
      subject_1,
      subject_2,
    };
    onStudentCreate(newStudent);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-3 border border-gray-200 rounded-lg text-sm">
    <input 
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="名前"
      className="border border-gray-300 rounded p-1 text-sm"
    />
    <input
      type="text"
      value={student_id}
      onChange={(e) => setStudentId(e.target.value)}
      placeholder="生徒番号"
      className="border border-gray-300 rounded p-1 text-sm"
    />
    <input
      type="text"
      value={schoolName}
      onChange={(e) => setSchoolName(e.target.value)}
      placeholder="学校名"
      className="border border-gray-300 rounded p-1 text-sm"
    />
    <input
      type="text"
      value={grade}
      onChange={(e) => setGrade(e.target.value)}
      placeholder="学年"
      className="border border-gray-300 rounded p-1 text-sm"
    />
    <input
      type="text"
      value={subject_1}
      onChange={(e) => setSubject1(e.target.value)}
      placeholder="科目1"
      className="border border-gray-300 rounded p-1 text-sm"
    />
    <input
      type="text"
      value={subject_2}
      onChange={(e) => setSubject2(e.target.value)}
      placeholder="科目2"
      className="border border-gray-300 rounded p-1 text-sm"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600 text-sm"
    >
      生徒を追加
    </button>
  </form>
  
  
  );
};

export default StudentDataGenerator;

