import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const StudentHomePage=()=> {
  const { resetCredentials } = useContext(AuthContext);
  function handleLogout() {
      resetCredentials();
      sessionStorage.clear();
     
    }
return(
  <div>Student Home
  <Button onClick={handleLogout}>LogOut</Button>
  </div>
);
}
export default StudentHomePage;