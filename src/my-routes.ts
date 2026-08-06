export const MY_ROUTES = {
    main: 'main',
    home: '',
    layout: {
        base: 'layout'
    },
    errorPages: {
        base: 'errors',
        unauthorized: {
            absolute: '/errors/401',
            base: '401'
        },
        forbidden: {
            absolute: '/errors/403',
            base: '403'
        },
        notFound: {
            absolute: '/errors/404',
            base: '404'
        },
        unavailable: {
            absolute: '/errors/503',
            base: '503'
        }
    },
    corePages: {
        base: 'core',
        absolute: '/main/core',
        shared: {
            base: 'shared',
            absolute: '/main/core/shared',
            simulator: {
                base: 'simulators',
                absolute: '/main/core/shared/simulators'
            }
        },
        dac: {
            base: 'dac',
            absolute: '/main/core/dac',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/dac/dashboard'
            },
            simulator: {
                base: 'simulators',
                absolute: '/main/core/dac/simulators'
            },
            cadastre: {
                base: 'cadastres',
                absolute: '/main/core/dac/cadastres'
            },
            processLog: {
                base: 'process-logs',
                absolute: '/main/core/dac/process-logs'
            }
        },
        specialist: {
            base: 'specialist',
            absolute: '/main/core/specialist',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/specialist/dashboard'
            },
            simulator: {
                base: 'simulators',
                absolute: '/main/core/specialist/simulators'
            },
            process: {
                base: 'processes',
                absolute: '/main/core/specialist/processes'
            },
            cadastre: {
                base: 'cadastres',
                absolute: '/main/core/specialist/cadastres'
            },
            processLog: {
                base: 'process-logs',
                absolute: '/main/core/specialist/process-logs'
            }
        },
        gad: {
            base: 'gad',
            absolute: '/main/core/gad',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/gad/dashboard'
            },
            simulator: {
                base: 'simulators',
                absolute: '/main/core/gad/simulators'
            },
            cadastre: {
                base: 'cadastres',
                absolute: '/main/core/gad/cadastres'
            },
            processLog: {
                base: 'process-logs',
                absolute: '/main/core/gad/process-logs'
            }
        },
        external: {
            base: 'external',
            absolute: '/main/core/external',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/external/dashboard'
            },
            simulator: {
                base: 'simulators',
                absolute: '/main/core/external/simulators'
            },
            accreditation: {
                base: 'accreditations',
                absolute: '/main/core/external/accreditations'
            },
            guideAccreditation: {
                base: 'guide-accreditations',
                absolute: '/main/core/external/guide-accreditations'
            },
            establishment: {
                base: 'establishments',
                absolute: '/main/core/external/establishments'
            },
            guideEstablishment: {
                base: 'guide-establishments',
                absolute: '/main/core/external/guide-establishments'
            }
        },
        technician: {
            base: 'technician',
            absolute: '/main/core/technician',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/technician/dashboard'
            },
            simulator: {
                base: 'simulators',
                absolute: '/main/core/technician/simulators'
            },
            process: {
                base: 'processes',
                absolute: '/main/core/technician/processes'
            },
            cadastre: {
                base: 'cadastres',
                absolute: '/main/core/technician/cadastres'
            },
            processLog: {
                base: 'process-logs',
                absolute: '/main/core/technician/process-logs'
            }
        },
        student: {
            base: 'students',
            absolute: '/main/core/students',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/students/dashboard'
            },
            grade: {
                base: 'grades',
                absolute: '/main/core/student/grades'
            },
            enrollment: {
                base: 'enrollments',
                absolute: '/main/core/student/enrollments'
            },
        },
    },
    publicPages: {
        base: 'public',
        absolute: '/public',
        emailVerification: {
            base: 'email-verifications',
            absolute: '/public/email-verifications'
        },
        simulator: {
            base: 'simulators',
            absolute: '/public/simulators'
        },
        icons: {
            base: 'icons',
            absolute: '/public/icons'
        },
        terms: {
            base: 'terms',
            absolute: '/public/terms'
        },
        passwordChanged: {
            base: 'password-changed',
            absolute: '/public/password-changed'
        },
        securityQuestions: {
            base: 'security-questions',
            absolute: '/public/security-questions'
        }
    },
    authPages: {
        base: 'auth',
        dashboard: {
            base: 'dashboard',
            absolute: '/auth/dashboard'
        },
        signIn: {
            base: 'sign-in',
            absolute: '/auth/sign-in'
        },
        signUp: {
            base: 'sign-up',
            absolute: '/auth/sign-up'
        },
        passwordReset: {
            base: 'password-reset',
            absolute: '/auth/password-reset'
        },
        passwordChanged: {
            base: 'password-changed',
            absolute: '/auth/password-changed'
        },
        securityQuestions: {
            base: 'security-questions',
            absolute: '/auth/security-questions'
        }
    },
    adminPages: {
        base: 'admin',
        user: {
            base: 'users',
            absolute: '/main/admin/users',
            form: {
                base: 'users/form',
                absolute: '/main/admin/users/form'
            },
            otro: {
                base: 'users/otro',
                absolute: '/main/admin/users/otro'
            },
            profile: {
                base: 'users/profile',
                absolute: '/main/admin/users/profile'
            }
        },
        teacher: {
        base: 'teacher',
        absolute: '/main/admin/teacher',

        distribution: {
            base: 'teacher-distribution',
            absolute: '/main/admin/teacher-distribution'
        },

        grades: {
        base: 'grades',
        absolute: '/main/admin/teacher/grades'
    }
    }
    },

    dashboards: {
        base: 'dashboards',
        absolute: '/main/dashboards'
    }
};
