import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CustomIcons} from "@utils/icons/custom-icons";
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import GradeContainer from '../grade-container/grade-container';
import {BreadcrumbService} from "@layout/service/breadcrumb.service";
import {EnrollmentDetailInterface} from '../../teacher-distribution.state';
import {TeacherDistributionService} from '../../teacher-distribution.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  imports: [
    CommonModule, TableModule, ButtonModule,
    ToolbarModule, DialogModule, GradeContainer
  ]
})
export default class GradeList implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly teacherDistributionService = inject(TeacherDistributionService);
  protected readonly CustomIcons = CustomIcons;

  protected currentDistributionId = signal<string | null>(null);
  protected isModalGradesOpen = signal<boolean>(false);
  protected isLoading = signal<boolean>(false);
  protected selectedStudent = signal<EnrollmentDetailInterface | null>(null);
  protected students = signal<EnrollmentDetailInterface[]>([]);

  constructor() {
    this.breadcrumbService.setItems([
      { label: 'Distributivo Docente', routerLink: ['/main/admin/teacher-distribution'] },
      { label: 'Calificaciones de la Materia' }
    ]);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const distId = params['distributionId'];
      if (distId) {
        this.currentDistributionId.set(distId);
        this.loadStudents(distId);
      }
    });
  }

  private loadStudents(distributionId: string): void {
    this.isLoading.set(true);
    this.teacherDistributionService.findEnrollmentDetailsByTeacherDistribution(distributionId)
      .subscribe({
        next: (data) => {
          this.students.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar estudiantes', err);
          this.isLoading.set(false);
        }
      });
  }

  openGradeModal(student: EnrollmentDetailInterface): void {
    this.selectedStudent.set(student);
    this.isModalGradesOpen.set(true);
  }

  // Añade esta función dentro de la clase GradeList
getGradeByPartial(detail: EnrollmentDetailInterface, partialCode: string): string | number {
  if (!detail.grades || detail.grades.length === 0) return '-';
  const grade = detail.grades.find(g => g.partial?.code === partialCode);
  return grade?.value ?? '-';
}

  handleModalClose(isOpen: boolean): void {
    this.isModalGradesOpen.set(isOpen);
    if (!isOpen) {
      this.selectedStudent.set(null);
      const distId = this.currentDistributionId();
      if (distId) {
        this.loadStudents(distId);
      }
    }
  }
}