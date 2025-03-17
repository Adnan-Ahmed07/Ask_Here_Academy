import { Outlet } from "react-router-dom";

const StudentViewCommonLayout=()=> {
return(
<div>Student View
  <Outlet/>
</div>
);
}

export default StudentViewCommonLayout;