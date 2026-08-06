import { computed, Injectable, signal } from '@angular/core';
import { INITIAL_STATE, SECTION_KEYS, TeacherDistributionState } from './teacher-distribution.state';
import { pickKeys } from '@utils/helpers/pickKeys.helper';

const FORM_STATE_KEY = 'teacherFormState';

@Injectable({
    providedIn: 'root'
})
export class TeacherDistributionStore {
    readonly formState = signal<TeacherDistributionState>(this.loadFromStorage());
    readonly formErrors = signal<Record<string, string[]>>({});

    readonly teacherDistributionData = computed(() => this.formState().teacherDistributionData);

    updateSection<K extends keyof TeacherDistributionState>
    (section: K, data: Partial<TeacherDistributionState[K]>): void {
        const allowedKeys = SECTION_KEYS[section] as readonly (keyof TeacherDistributionState[K])[];
        const filtered = pickKeys(data as Record<string, unknown>, allowedKeys as readonly string[]);
        this.formState.update((state) => ({
            ...state,
            [section]: {
                ...state[section],
                ...filtered
            }
        }));

        this.saveToStorage();
    }

    reset(): void {
        this.formState.set(INITIAL_STATE);
        sessionStorage.removeItem(FORM_STATE_KEY);
    }

    private saveToStorage(): void {
        sessionStorage.setItem(FORM_STATE_KEY, JSON.stringify(this.formState()));
    }

    private loadFromStorage(): TeacherDistributionState {
        const stored = sessionStorage.getItem(FORM_STATE_KEY);

        return stored ? JSON.parse(stored) : INITIAL_STATE;
    }
}
