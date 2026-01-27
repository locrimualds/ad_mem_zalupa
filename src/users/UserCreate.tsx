import { Create } from "react-admin";
import UserForm from "./UserForm.tsx";

const UserCreate = () => {
  return (
    <Create>
      <UserForm />
    </Create>
  );
};

export default UserCreate;
