import { useState } from "react";
import { User} from "../../model/interfaces";
import { postUser, updateUser } from "../../services/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  update?:boolean
  usersLength:number
  editUser?:User|null
  users:User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  // setEditUser: React.Dispatch<React.SetStateAction<User|null>>
}


const UserModal = ({ isOpen, onClose, title,usersLength ,setUsers,users,update,editUser}: Props) => {
  if (!isOpen) return null;
  const [formData, setFormData] = useState<User>({id:usersLength+1,name:"",username:""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit= async(e:React.FormEvent)=>{

      console.log("Submitted Data:", formData);
    e.preventDefault();
    if(update){
      console.log(editUser)
      const index = users.indexOf(editUser!);
          try {
            users[index] = { id: editUser!.id, name: formData.name, username: formData.username };
            const res = await updateUser(editUser!.id, users[index]);
            console.log(res);
          } catch (error) {
            console.log(error);
          }
          
          onClose();
    }else{
        try {
            setUsers([...users,formData])
            const {data:newUser} = await postUser(formData)
            console.log('user added successfuly',newUser)
    
            onClose()
        } catch (error) {
            console.log(error)
            setUsers(users)
        }
    }
    
    
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <form className="space-y-4" action="#">
          <div className="mt-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                name
              </label>
              <input
                name="name"
                value={update?editUser?.name:formData.name}
                onChange={handleChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium "
              >
                username
              </label>
              <input
                name="username"
                value={update?editUser?.username:formData.username}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
          </div>
          <div className="mt-6 flex space-x-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={(e)=>handleSubmit(e)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-gray-400 rounded-lg"
            >
              {update?"Save":"Submit"}
            </button>
          </div> 
        </form>
      </div>
    </div>
  );
};

export default UserModal;
