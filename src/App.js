import { useState } from 'react';
import './App.css';
import { useAddUserMutation, useGetUsersQuery, useDeleteUserMutation } from './redux'
function App() {
  const [count, SetCount] = useState('20')
  const [DeleteUser, { error }] = useDeleteUserMutation()
  const [AddUser, { isError }] = useAddUserMutation()
  const [newUser, setNewUser] = useState('')
  const { data = [], isLoading } = useGetUsersQuery(count)

  const handleAddNewUser = async () => {
    if (newUser) {
      await AddUser({ name: newUser }).unwrap()
      setNewUser('')
    }
  }
  const handleDeleteNewUser = async (id) => {
    await DeleteUser(id).unwrap()
  }
  return (
    <div className="App">
      <input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      <button onClick={handleAddNewUser}>add new User</button>
      <div>
        <select value={count} onChange={(e) => SetCount(e.target.value)}>
          <option value="5" key="5">5</option>
          <option value="1" key="1">1</option>
          <option value="10" key="10">10</option>
        </select>
      </div>
      {isLoading && <h1>Loading....</h1>}
      {
        data.map(user => <li onClick={() => { handleDeleteNewUser(user.id) }} style={{ cursor: 'pointer', border: '1px solid black', padding: '10px'}} key={user.id}>{user.name}</li>)
      }
    </div>
  );
}

export default App;
