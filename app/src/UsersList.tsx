import { useEffect, useState } from "react";

interface User {
  id: number;
  Name: string;
  email: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/Users.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load users");
        }
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Fetched Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.Name}</strong> <b>:</b> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
