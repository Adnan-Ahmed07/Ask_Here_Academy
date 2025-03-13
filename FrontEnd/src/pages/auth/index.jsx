import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage=()=>{ 
  return( 
    <div className="flex flex-col min-h-screen">
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link to={"/"} className="flex items-center justify-center">
        <GraduationCap className="h-8 w-8 mr-4" />
        <span className="font-extrabold text-xl">Ask Here Academy</span>
      </Link>
    </header>
    </div>
  );
}
export default AuthPage;