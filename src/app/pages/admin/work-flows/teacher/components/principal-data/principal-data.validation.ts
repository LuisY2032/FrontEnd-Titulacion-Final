import { required, SchemaPathTree } from '@angular/forms/signals';
import { TeacherDistributionData } from '../../teacher-distribution.state';

export function customFormValidation(schema: SchemaPathTree<TeacherDistributionData>): void {

    required(schema.grade1, {
        message: 'La calificación del Parcial 1 es requerida'
    });

    required(schema.grade2, {
        message: 'La calificación del Parcial 2 es requerida'
    });

    required(schema.attendance, {
        message: 'La asistencia es requerida'
    });

}