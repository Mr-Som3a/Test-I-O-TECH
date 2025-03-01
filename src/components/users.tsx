import { useEffect, useState } from "react";
import { User } from "../model/interfaces";
import { deleteUser, getUsers} from "../services/api";
import UserModal from "./utility/user-modal";
import Pen from "../assets/pen.svg"
import Trash from "../assets/trash.svg"

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLength, setUsersLength] = useState(0);
  const [editUser,setEditUser]=useState<User|null>(null)
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        console.log(res);
        setUsers(res);
        setUsersLength(res.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSort = (field: keyof User) => {
    console.log(field);
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedUsers = [...users].sort((x, y) => {
      if (x[field] < y[field]) return order === "asc" ? -1 : 1;
      if (x[field] > y[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  // Filtering Function
  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleUpdate = async (user: User) => {
    setEditUser(user)
    setUpdate(true);
    setOpen(true);
  };
  const handleDelete = async (id: number) => {
    const updatedlist = users.filter((ele) => ele.id !== id);

    try {
      const res = await deleteUser(id);
      setUsers(updatedlist);
      setUsersLength(updatedlist.length);
      console.log("deleted successfuly", res);
    } catch (error) {
      console.log(error);
      setUsers(users);
    }
  };

  return (
    <>
      <section className="flex justify-between">
        <h1 className="">All Users</h1>
        <button onClick={handleOpen}>Add User</button>
      </section>

      <UserModal
        users={users}
        setUsers={setUsers}
        usersLength={usersLength}
        editUser={editUser}
        isOpen={open}
        onClose={handleClose}
        title={update ? "Update User" : "Add User"}
        update={update}
      />

      <div className="relative w-[80%] mx-auto mt-16 rounded-2xl overflow-x-auto">
        <input
        className="bg-gray-50 rounded-sm p-2.5"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs  uppercase bg-gray-50">
            <tr>
              <th className=""></th>
              <th onClick={() => handleSort("name")} className="px-3 py-3">
                {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                name
              </th>
              <th className="px-3 py-3">username</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="bg-white border-b  border-gray-300">
                <td className="px-3 py-4">{user.id}</td>
                <td className="px-3 py-4">{user.name}</td>
                <td className="px-3 py-4">{user.username}</td>
                <td className="px-3 py-4">
                  <button className="text-red-800" onClick={() => handleDelete(user.id)}>
                   Delete
                  </button>
                  <button className="text-cyan-500" onClick={() => handleUpdate(user)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
