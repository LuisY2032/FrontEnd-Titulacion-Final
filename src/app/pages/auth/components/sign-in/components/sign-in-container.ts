import {Component, inject, OnInit, signal} from '@angular/core';
import {Button} from "primeng/button";
import {FormRegistryService} from "@utils/services/form-registry.service";
import {MY_ROUTES} from "@routes";
import {CustomIcons} from "@utils/icons/custom-icons";
import {AppService, CustomMessageService} from "@utils/services";
import SignInForm from "@modules/auth/components/sign-in/components/sign-in-form";
import {SignInService} from "@modules/auth/components/sign-in/sign-in.service";
import {SignInStore} from "@modules/auth/components/sign-in/sign-in.store";
import {SignInData, SignInState} from "@modules/auth/components/sign-in/sign-in.state";
import {Router, RouterLink} from "@angular/router";
import {RoleInterface} from "@modules/auth/interfaces";
import {Dialog} from "primeng/dialog";
import {AuthService} from "@modules/auth/auth.service";
import {AuthHttpService} from "@modules/auth/auth-http.service";

@Component({
    selector: 'app-sign-in-container',
    imports: [
        Button,
        SignInForm,
        Dialog,
        RouterLink
    ],
    template:
        `
            <app-sign-in-form/>

            <div class="custom-form-card">
                <div class="custom-form-grid md:grid-cols-12">
                    <div class="custom-form-field md:col-span-6 md:col-start-4">
                        <p-button
                            type="submit"
                            label="Ingresar"
                            styleClass="w-full"
                            [raised]="true"
                            [icon]="CustomIcons.ARROW_RIGHT_TO_BRACKET_SOLID"
                            [loading]="appService.loading()"
                            (onClick)="onSubmit()">
                        </p-button>
                    </div>

                    <div class="custom-form-field md:col-span-6">
                        <p-button
                            label="Crear Cuenta"
                            styleClass="w-full"
                            [icon]="CustomIcons.USER_PLUS_SOLID"
                            severity="success"
                            [outlined]="true"
                            raised="true"
                            [routerLink]="MY_ROUTES.authPages.signUp.absolute"/>
                    </div>

                    <div class="custom-form-field md:col-span-6">
                        <p-button
                            label="Recuperar Cuenta"
                            styleClass="w-full"
                            [icon]="CustomIcons.UNLOCK_KEYHOLE_SOLID"
                            severity="info"
                            [outlined]="true"
                            [raised]="true"
                            [routerLink]="MY_ROUTES.authPages.passwordReset.absolute"/>
                    </div>
                </div>
            </div>

            <p-dialog [(visible)]="isVisibleRoles"
                      [modal]="true"
                      [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
                      [style]="{ width: '25vw' }"
                      [draggable]="false"
                      [closable]="false"
                      [dismissableMask]="false"
                      (onHide)="closeRoleSelect()"
                      [resizable]="false">
                <ng-template #header>
                    <div class="custom-form-title">
                        Seleccione un Rol
                    </div>
                </ng-template>

                <div class="custom-form-card">
                    <div class="custom-form-grid md:grid-cols-12">
                        <div class="custom-form-field md:col-span-12">
                            <p class="text-muted-color">
                                Continuar como...
                            </p>
                        </div>

                        @for (role of roles; track role.id) {
                            <div class="custom-form-field md:col-span-12">
                                <p-button
                                    styleClass="w-full"
                                    [icon]="role.icon"
                                    [text]="true"
                                    [raised]="true"
                                    [label]="role.name"
                                    (onClick)="selectRole(role)"/>
                            </div>
                        }

                        <div class="custom-form-field md:col-span-12">
                            <p-button
                                label="Cerrar Sesión"
                                styleClass="w-full"
                                [text]="true"
                                severity="danger"
                                (onClick)="signOut()"/>
                        </div>
                    </div>
                </div>
            </p-dialog>

            <p-dialog [(visible)]="requestEmailVerificationModal"
                      [modal]="true"
                      [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
                      [style]="{ width: '25vw' }"
                      [draggable]="false"
                      [resizable]="false">
                <ng-template #header>
                    <div class="custom-form-section">
                        Solicitar enlace de verificación
                    </div>
                </ng-template>

                <div class="custom-form-card">
                    <div class="custom-form-grid md:grid-cols-12">
                        <div class="custom-form-field md:col-span-12">
                            <p-button
                                label="Solicitar nuevo enlace"
                                styleClass="w-full"
                                [icon]="CustomIcons.ENVELOPE_OPEN_SOLID"
                                [raised]="true"
                                (onClick)="resendEmailVerification()"/>
                        </div>
                    </div>
                </div>
            </p-dialog>
        `
})
export default class SignInContainer implements OnInit {
    private readonly router = inject(Router);
    private readonly formRegistryService = inject(FormRegistryService);
    private readonly customMessageService = inject(CustomMessageService);
    protected readonly store = inject(SignInStore);
    protected readonly service = inject(SignInService);
    protected readonly authHttpService = inject(AuthHttpService);
    protected readonly authService = inject(AuthService);
    protected readonly appService = inject(AppService);
    protected readonly CustomIcons = CustomIcons;
    protected readonly MY_ROUTES = MY_ROUTES;

    protected roles: RoleInterface[] = [];
    protected isVisibleRoles = false;
    protected requestEmailVerificationModal: boolean = false;
    protected username = signal('');

    constructor() {

    }

    ngOnInit() {

    }

    onSubmit() {
        if (this.formRegistryService.hasErrors()) {
            this.customMessageService.showFormErrors(this.formRegistryService.errors());
            return;
        }

        const payload: SignInState = {
            signInData: this.store.signInData(),
        }

        this.signIn(payload);
    }

    private signIn(payload: SignInState) {
        console.log('singin form')
        this.service.signIn(payload).subscribe({
            next: (data) => {
                if (data.roles.length === 1) {
                this.authService.role = data.roles[0];
                    this.router.navigate([MY_ROUTES.dashboards.absolute]);
                    return;
                }

                this.isVisibleRoles = true;
                this.roles = data.roles;
                // this.roleControl.setValidators([Validators.required]);
            },
            error: (err) => {
                if (err.error.error === 'ACCOUNT_UNVERIFIED_EMAIL') {
                    this.requestEmailVerificationModal = true;
                }
            }
        });
    }

    protected signOut() {
        this.authHttpService.signOut().subscribe({
            next: () => {
                this.isVisibleRoles = false;
            }
        });
    }

    protected selectRole(value: RoleInterface) {
        this.authService.role = value;
        this.router.navigate([MY_ROUTES.dashboards.absolute]);
    }

    protected closeRoleSelect() {
        this.authHttpService.signOut().subscribe();
    }

    protected resendEmailVerification() {
        this.authHttpService.requestVerifyEmail(this.username()).subscribe({
            next: () => {
                this.requestEmailVerificationModal = false;

                this.customMessageService.showModalInfo({
                    summary: `¡Solicitud recibida!`,
                    detail: 'Si la identificación está registrada en nuestro sistema, se enviará un correo con el nuevo enlace'
                });
            }
        });
    }
}
