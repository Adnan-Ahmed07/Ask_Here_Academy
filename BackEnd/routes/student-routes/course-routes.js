const express = require("express");
const {
  getStudentViewCourseDetails,
  getAllStudentViewCourses,
 
} = require("../../controllers/student-controller/course-controller");
const router = express.Router();

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCourseDetails);


module.exports = router;
