import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRoutes } from "../modules/course/course.route";
import { SemesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistraion.route";
import { OfferedCourseRoutes } from "../modules/offeredCourse/offeredCourse.route";
import { AuthRoutes } from "../modules/auth/auth.route";
const router = Router();
const moduleRoutes = [
    {
        path: "/students",
        route: StudentRoute,
    },
    {
        path: "/users",
        route: UserRoute,
    },
    {
        path: "/academic-semesters",
        route: AcademicSemesterRoute,
    },
    {
        path: "/academic-faculties",
        route: AcademicFacultyRoute
    },
    {
        path: "/academic-departments",
        route: AcademicDepartmentRoute
    },
    {
        path: "/faculties",
        route: FacultyRoutes
    },
    {
        path: "/admins",
        route: AdminRoutes
    },
    {
        path: "/courses",
        route: CourseRoutes
    },
    {
        path: "/semester-registration",
        route: SemesterRegistrationRoutes
    },
    {
        path: "/offered-course",
        route: OfferedCourseRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
]
moduleRoutes.forEach(route => { router.use(route.path, route.route) })
export default router;