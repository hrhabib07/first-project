import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { adminRoutes } from "../modules/admin/admin.route";
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
        route: facultyRoutes
    },
    {
        path: "/admins",
        route: adminRoutes
    },
]
moduleRoutes.forEach(route => { router.use(route.path, route.route) })
export default router;