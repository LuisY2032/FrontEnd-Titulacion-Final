import {Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {FieldTree, form, FormField} from '@angular/forms/signals';
import {InputNumberModule} from 'primeng/inputnumber';
import {LabelDirective} from '@utils/directives/label.directive';
import {ErrorMessageDirective} from '@utils/directives/error-message.directive';
import {FormRegistryService} from '@utils/services/form-registry.service';
import {TeacherDistributionStore} from '../../teacher-distribution.store';
import {TeacherDistributionData} from '../../teacher-distribution.state';
import {customFormValidation} from './principal-data.validation';

const FORM_STATE_KEY = 'teacherDistributionData';

@Component({
    selector: 'app-principal-data',
    imports: [InputNumberModule, FormField, LabelDirective, ErrorMessageDirective],
    templateUrl: './principal-data.html'
})
export default class PrincipalData implements OnInit, OnDestroy {
    private readonly formRegistryService = inject(FormRegistryService);
    private readonly teacherStore = inject(TeacherDistributionStore);

    protected readonly form$: WritableSignal<TeacherDistributionData> =
        signal(this.teacherStore.teacherDistributionData());

    protected readonly formData: FieldTree<TeacherDistributionData> = this.buildForm();
    private formInitialized = false;

    constructor() {
        this.initializeData();
        this.watchFormChanges();
    }

    ngOnInit(): void {
        this.formRegistryService.register('Calificaciones', FORM_STATE_KEY, this.formData, this.form$());
    }

    ngOnDestroy(): void {
        this.formRegistryService.unregister(FORM_STATE_KEY);
    }

    private initializeData(): void {
        effect(() => {
            const data = this.teacherStore.teacherDistributionData();
            if (!this.formInitialized) {
                this.form$.set(data);
                this.formInitialized = true;
            }
        });
    }

    private watchFormChanges(): void {
        effect(() => {
            this.teacherStore.updateSection(FORM_STATE_KEY, this.form$());
        });
    }

    private buildForm(): FieldTree<TeacherDistributionData> {
        return form<TeacherDistributionData>(this.form$, (schema) => {
            customFormValidation(schema);
        });
    }
}