import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SchoolPeriodInterface, TeacherDistributionInterface } from '../../teacher-distribution.state';
import { BreadcrumbService } from '@layout/service/breadcrumb.service';
import { AppService, CustomMessageService } from '@utils/services';
import { BreadcrumbEnum } from '@utils/enums/breadcrumb.enum';
import { AuthService } from '@modules/auth/auth.service';
import { CustomIcons } from '@utils/icons/custom-icons';
import { Router } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { TeacherDistributionService } from '../../teacher-distribution.service';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectModule } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SkeletonEnum } from '@utils/enums/skeleton.enum';

@Component({
    selector: 'app-teacher-distribution-list',
    templateUrl: './teacher-distribution-list.html',
    imports: [CommonModule, ToolbarModule, SelectModule, DividerModule, TagModule, ButtonModule, FormsModule]
})
export default class TeacherDistributionList implements OnInit {
    protected readonly CustomIcons = CustomIcons;
    protected readonly SkeletonEnum = SkeletonEnum;
    protected readonly authService = inject(AuthService);
    protected readonly appService = inject(AppService);
    protected readonly customMessageService = inject(CustomMessageService);
    private readonly router = inject(Router);
    private readonly teacherDistributionService = inject(TeacherDistributionService);
    private readonly breadcrumbService = inject(BreadcrumbService);

    protected selectedSchoolPeriod: WritableSignal<SchoolPeriodInterface | null> = signal(null);
    protected schoolPeriods: WritableSignal<SchoolPeriodInterface[]> = signal([]);
    protected teacherDistributions: WritableSignal<TeacherDistributionInterface[]> = signal([]);

    constructor() {
        this.breadcrumbService.setItems([{ label: BreadcrumbEnum.TEACHER_DISTRIBUTIONS }]);

        effect(() => {
            const period = this.selectedSchoolPeriod();
            if (period) {
                this.findTeacherDistributionsByTeacher(period.id);
            }
        });
    }

    ngOnInit(): void {
        this.findSchoolPeriods();
    }

    findSchoolPeriods(): void {
        this.teacherDistributionService.findAllSchoolPeriods().subscribe({
            next: (schoolPeriods) => {
                this.schoolPeriods.set(schoolPeriods);
                this.teacherDistributionService.findOpenSchoolPeriod().subscribe({
                    next: (openPeriod) => {
                        this.selectedSchoolPeriod.set(openPeriod);
                    }
                });
            }
        });
    }

    onSchoolPeriodChange(period: SchoolPeriodInterface): void {
        this.selectedSchoolPeriod.set(period);
    }

    findTeacherDistributionsByTeacher(schoolPeriodId: string): void {
        console.log('🔍 ESTRUCTURA COMPLETA DE AUTH:', this.authService.auth);

        const teacherId = this.authService.auth?.teacher?.id;

        console.log('--- ENVIANDO TEACHER ID ---:', teacherId);

        //SI NO HAY TEACHER ID O SCHOOL PERIOD, DETENEMOS LA EJECUCIÓN
        if (!teacherId) {
            console.warn('⚠️ No se puede consultar la distribución: teacherId es undefined.');
            this.teacherDistributions.set([]);
            return;
        }

        if (!schoolPeriodId) {
            console.warn('⚠️ Debe seleccionar un período lectivo.');
            return;
        }

        this.teacherDistributionService
            .findTeacherDistributionsByTeacher(
                //this.authService.auth?.teacher?.id!,
                teacherId,
                schoolPeriodId
            )
            .subscribe({
                next: (teacherDistributions) => {
                    this.teacherDistributions.set(teacherDistributions);
                }
            });
    }

    redirectTeacherDistributionGrades(teacherDistribution: TeacherDistributionInterface) {
        this.router.navigate(['/main/admin/teacher/grades'], {
            queryParams: {
                distributionId: teacherDistribution.id
            }
        });
    }
}
