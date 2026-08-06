import {Routes} from '@angular/router';
import {MY_ROUTES} from '@routes';
import {
    CareerListComponent
} from "@modules/admin/work-flows/career/components/career-list/career-list.component";
import {CareerFormComponent} from "@modules/admin/work-flows/career/components/career-form/career-form.component";
import TeacherDistributionList from './work-flows/teacher/components/teacher-distribution-list/teacher-distribution-list';
import GradeList from './work-flows/teacher/components/grade-list/grade-list.component';



export default [
    {
        path: MY_ROUTES.adminPages.user.base,
        title: 'Listado de Carreras',
        loadComponent: () => CareerListComponent
    },
    {
        path: MY_ROUTES.adminPages.user.form.base + '/:id',
        title: 'Formulario de Carrera',
        loadComponent: () => CareerFormComponent
    }, 
    {
        path: MY_ROUTES.adminPages.teacher.distribution.base,
        title: 'Distribución Docente',
        loadComponent: () => TeacherDistributionList
    },
    {
        path: 'teacher/grades',
        title: 'Notas Docentes',
        loadComponent: () => GradeList
    }
] as Routes;
