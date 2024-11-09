'use client'
import { useState, useEffect } from 'react'

export default function UsersClientPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: 'no-store'
      })
      const data = await res.json()
      setUsers(data)
    }

    getUsers()
  }, [])

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