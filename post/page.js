export default async function UsersPage() {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await data.json()
  
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  )
}