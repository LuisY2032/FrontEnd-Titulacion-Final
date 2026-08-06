import {Component, inject, input, OnInit, output} from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // 👈 IMPORTANTE
import {Button} from "primeng/button";
import {FormRegistryService} from "@utils/services/form-registry.service";
import {CustomMessageService} from "@utils/services";
import {CustomIcons} from "@utils/icons/custom-icons";
import PrincipalData from "../principal-data/principal-data";
import {TeacherDistributionStore} from "../../teacher-distribution.store";
import {TeacherDistributionService} from "../../teacher-distribution.service";
import {EnrollmentDetailInterface} from "../../teacher-distribution.state";

@Component({
    selector: 'app-grade-container',
    imports: [
        Button,
        PrincipalData
    ],
    template:
        `
            <app-principal-data/>

            <div class="custom-form-card">
                <div class="custom-form-grid md:grid-cols-12">
                    <div class="custom-form-field md:col-span-6 md:col-start-4">
                        <p-button
                            label="Guardar"
                            styleClass="w-full"
                            [raised]="true"
                            [icon]="CustomIcons.FLOPPY_DISK_REGULAR"
                            (onClick)="onSubmit()">
                        </p-button>
                    </div>
                </div>
            </div>
        `
})
export default class GradeContainer implements OnInit {
    private readonly route = inject(ActivatedRoute); 
    private readonly formRegistryService = inject(FormRegistryService);
    private readonly customMessageService = inject(CustomMessageService);
    protected readonly teacherStore = inject(TeacherDistributionStore);
    protected readonly teacherDistributionService = inject(TeacherDistributionService);
    protected readonly CustomIcons = CustomIcons;

    readonly enrollmentDetail = input.required<EnrollmentDetailInterface>();
    readonly teacherDistributionId = input<string>(); 
    readonly isModalGrades = output<boolean>();

    ngOnInit() {
        this.loadData();
    }

    private loadData(): void {
        const detail = this.enrollmentDetail();
        this.teacherStore.updateSection('teacherDistributionData', {
            grade1: detail.grades?.find(x => x.partial?.code === '1')?.value ?? null,
            grade2: detail.grades?.find(x => x.partial?.code === '2')?.value ?? null,
            attendance: detail.finalAttendance ?? null
        });
    }

    async onSubmit(): Promise<void> {
        if (this.formRegistryService.hasErrors()) {
            this.customMessageService.showFormErrors(this.formRegistryService.errors());
            return;
        }
        this.update();
    }

    private update(): void {
        const enrollmentId = this.enrollmentDetail().id;

        if (!enrollmentId) {
            this.customMessageService.showError({
                summary: 'Error',
                detail: 'No se encontró el ID de la matrícula'
            });
            return;
        }

        // Obtenemos el ID del Input o del QueryParam de la URL activa
        const distId = this.teacherDistributionId() 
            || this.route.snapshot.queryParams['distributionId'];

        if (!distId) {
            this.customMessageService.showError({
                summary: 'Error',
                detail: 'No se encontró el ID de la distribución del docente'
            });
            return;
        }

        const {grade1, grade2, attendance} = this.teacherStore.teacherDistributionData();

        const payload = {
            grade1: grade1 !== null && grade1 !== undefined ? Number(grade1) : null,
            grade2: grade2 !== null && grade2 !== undefined ? Number(grade2) : null,
            attendance: attendance !== null && attendance !== undefined ? Number(attendance) : 0,
            teacherDistributionId: distId
        };

        console.log(' Payload enviado a NestJS:', payload); // 👈 Verificación en consola

        this.teacherDistributionService.saveGrade(enrollmentId, payload).subscribe({
            next: () => {
                this.customMessageService.showSuccess({
                    summary: 'Éxito',
                    detail: 'Calificaciones guardadas correctamente'
                });
                this.teacherStore.reset();
                this.isModalGrades.emit(false);
            },
            error: (err) => {
                console.error('Error al guardar notas:', err);
                const validationErrors = err.error?.message;
                if (Array.isArray(validationErrors)) {
                    this.customMessageService.showError({
                        summary: 'Error de validación',
                        detail: validationErrors.join(', ')
                    });
                }
            }
        });
    }
}