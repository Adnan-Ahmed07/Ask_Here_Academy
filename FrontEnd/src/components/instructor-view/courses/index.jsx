import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const InstructorCourses=()=> {
  const navigate = useNavigate();
return(
  <Card>
  <CardHeader className="flex justify-between flex-row items-center">
    <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
    <Button
         onClick={() => {
         
          navigate("/instructor/create-new-course");
        }}
          className="p-6"
        >
          Create New Course
        </Button>
    </CardHeader>
    <CardContent>
    <div className="overflow-x-auto">
    <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            </Table>
      </div>
      </CardContent>
    </Card>
);
}

export default InstructorCourses;