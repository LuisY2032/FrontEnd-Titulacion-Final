import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FieldTree, form, FormField } from '@angular/forms/signals';
import { SchoolPeriodInterface, TeacherDistributionInterface, TeacherDistributionFormInterface } from '../../teacher-distribution.state';
import { BreadcrumbService } from '@layout/service/breadcrumb.service';
import { AppService, CustomMessageService } from '@utils/services';
import { BreadcrumbEnum } from '@utils/enums/breadcrumb.enum';
import { AuthService } from '@modules/auth/auth.service';
import { CustomIcons } from '@utils/icons/custom-icons';
import { Router } from '@angular/router';
import { TeacherDistributionService } from '../../teacher-distribution.service';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectModule } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SkeletonEnum } from '@utils/enums/skeleton.enum';

@Component({
    selector: 'app-teacher-distribution-list',
    templateUrl: './teacher-distribution-list.html',
    imports: [
        CommonModule, 
        ToolbarModule, 
        SelectModule, 
        DividerModule, 
        TagModule, 
        ButtonModule,
        FormField
    ]
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

    // 1. Señal con la estructura del formulario (siguiendo la convención 'form$' de tu profesor)
    protected readonly form$: WritableSignal<TeacherDistributionFormInterface> = signal({
        schoolPeriod: null
    });
    protected readonly formData: FieldTree<TeacherDistributionFormInterface> = form(this.form$);
    protected schoolPeriods: WritableSignal<SchoolPeriodInterface[]> = signal([]);
    protected teacherDistributions: WritableSignal<TeacherDistributionInterface[]> = signal([]);

    constructor() {
        this.breadcrumbService.setItems([{ label: BreadcrumbEnum.TEACHER_DISTRIBUTIONS }]);

        // Reacciona al cambio de 'schoolPeriod' dentro de la señal form$
        effect(() => {
            const period = this.form$().schoolPeriod;
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
                        // Actualización de la señal form$
                        this.form$.update(state => ({ ...state, schoolPeriod: openPeriod }));
                    }
                });
            }
        });
    }

    onSchoolPeriodChange(period: SchoolPeriodInterface): void {
        this.form$.update(state => ({ ...state, schoolPeriod: period }));
    }

    findTeacherDistributionsByTeacher(schoolPeriodId: string): void {
        const teacherId = this.authService.auth?.teacher?.id;

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
            .findTeacherDistributionsByTeacher(teacherId, schoolPeriodId)
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