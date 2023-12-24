"use client"

import React, { useState } from 'react';



const TeacherNameInput = ({ value, onChange, placeholder }) => {

   
    return (
      <input
        type="text"
        className="text-lg border border-gray-300 rounded p-1 w-20" // 幅を制限
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  };





export default TeacherNameInput;
