import React, { useState } from 'react';

interface UserInfo {
  name: string;
  age: number;
  job: string;
}

const UserEditForm: React.FC = () => {
  const initialUserInfo: UserInfo = { name: '山田太郎', age: 30, job: 'エンジニア' };
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    console.log('更新されたユーザー情報:', userInfo);
    // ここで例えばAPIにデータを送信する処理を追加できます
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>名前: </label>
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>年齢: </label>
        <input
          type="number"
          name="age"
          value={userInfo.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>職業: </label>
        <input
          type="text"
          name="job"
          value={userInfo.job}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">更新</button>
      </div>
    </form>
  );
};

export default UserEditForm;

