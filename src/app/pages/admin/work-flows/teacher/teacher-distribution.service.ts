import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService, CustomMessageService } from '@utils/services';
import { HttpResponseInterface } from '@modules/auth/interfaces';

import { GradeInterface, SchoolPeriodInterface, TeacherDistributionInterface, SaveGradesDto, EnrollmentDetailInterface } from './teacher-distribution.state';

@Injectable({
    providedIn: 'root'
})
export class TeacherDistributionService {
    private readonly httpClient = inject(HttpClient);
    private readonly appService = inject(AppService);
    private readonly customMessageService = inject(CustomMessageService);

    private readonly SCHOOL_PERIODS_URL = `${environment.API_URL}/core/school-periods`;
    private readonly TEACHERS_URL = `${environment.API_URL}/core/teacher`;
    private readonly TEACHER_DISTRIBUTIONS_URL = `${environment.API_URL}/teacher-distributions`;
    private readonly GRADES_URL = `${environment.API_URL}/core/teacher/grades`;

    teacherDistribution!: TeacherDistributionInterface;

    // School Periods

    findAllSchoolPeriods(): Observable<SchoolPeriodInterface[]> {
        const url = this.SCHOOL_PERIODS_URL;

        return this.httpClient.get<HttpResponseInterface>(url).pipe(map((response) => response.data));
    }

    findOpenSchoolPeriod(): Observable<SchoolPeriodInterface> {
        const url = `${this.SCHOOL_PERIODS_URL}/states/open`;

        return this.httpClient.get<HttpResponseInterface>(url).pipe(map((response) => response.data));
    }

    // Teacher Distributions

    findTeacherDistributionsByTeacher(teacherId: string, schoolPeriodId: string): Observable<TeacherDistributionInterface[]> {
        const url = `${environment.API_URL}/core/teacher/distributions`;

        const params = new HttpParams().set('teacherId', teacherId).set('schoolPeriodId', schoolPeriodId).set('page', '1').set('limit', '10');

        return this.httpClient.get<HttpResponseInterface>(url, { params }).pipe(map((response) => response.data));
    }

    // Students

    findEnrollmentDetailsByTeacherDistribution(distributionId: string): Observable<EnrollmentDetailInterface[]> {
        const url = `${environment.API_URL}/core/teacher/grades/${distributionId}/students`;

        const params = new HttpParams().set('page', '1').set('limit', '10');

        return this.httpClient.get<HttpResponseInterface>(url, { params }).pipe(map((response) => response.data));
    }

    // Grades

    saveGrade(id: string, payload: SaveGradesDto): Observable<GradeInterface> {
        const url = `${this.GRADES_URL}/${id}`;

        this.appService.showProcessing();

        return this.httpClient.patch<HttpResponseInterface>(url, payload).pipe(
            map((response) => {
                this.appService.hideProcessing();
                this.customMessageService.showHttpSuccess(response);

                return response.data;
            })
        );
    }
}
