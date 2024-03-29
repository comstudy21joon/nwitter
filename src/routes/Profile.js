import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      User : {userObj.email}
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
