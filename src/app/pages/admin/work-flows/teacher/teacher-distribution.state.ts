export interface TeacherDistributionState {
    teacherDistributionData: TeacherDistributionData;

   // teacherDistribution: TeacherDistributionInterface | null;    
}

export interface TeacherDistributionData {    
    grade1: number | null;

    grade2: number | null;

    attendance: number | null;
}

export const INITIAL_STATE: TeacherDistributionState = {  
    teacherDistributionData: {
        grade1: null,

        grade2: null,

        attendance: null
    },

    
};




export interface TeacherDistributionInterface {
    id: string;

    teacher: TeacherInterface;

    schoolPeriod: SchoolPeriodInterface;

    subject: SubjectInterface;

    parallel: CatalogueInterface;

    workday: CatalogueInterface;

    hours: number;

    partialPermissions: PartialPermissionInterface[];
}

// Teacher

export interface TeacherInterface {
    id?: string;

    informationTeacher?: InformationTeacherInterface;

    user: UserInterface;

    isVisible: boolean;
}

export interface InformationTeacherInterface {
    id: string;

    academicUnit: string;

    administrativeHours: number;

    classHours: number;

    communityHours: number;

    investigationHours: number;
}

export interface UserInterface {
    id: string;

    name: string;

    lastname: string;

    email: string;

    username: string;
}

// Periodo

export interface SchoolPeriodInterface {
    id: string;

    code: string;

    name: string;

    shortName: string;

    startedAt: Date;

    endedAt: Date;
}

// Asignatura

export interface SubjectInterface {
    id: string;

    name: string;

    code: string;

    credits: number;

    curriculum: CurriculumInterface;

    academicPeriod: CatalogueInterface;
}

export interface CurriculumInterface {
    id: string;

    code: string;

    name: string;

    career: CareerInterface;
}

export interface CareerInterface {
    id: string;

    code: string;

    name: string;

    shortName: string;
}

// Catálogo

export interface CatalogueInterface {
    id: string;

    code: string;

    name: string;
}

// Permisos

export interface PartialPermissionInterface {
    id: string;

    partial: PartialInterface;

    enabled: boolean;
}

export interface PartialInterface {
    id: string;

    code: string;

    name: string;
}


export interface EnrollmentDetailStateInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;

    state: CatalogueInterface;
    enrollment: EnrollmentInterface;

    observation: string;
}

export interface EnrollmentDetailInterface {
    id?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    grades: GradeInterface[];
    enrollmentDetailStates: EnrollmentDetailStateInterface[];
    enrollmentDetailState: EnrollmentDetailStateInterface;

    //foreingkeys
    academicState: CatalogueInterface;
    enrollment: EnrollmentInterface;
    parallel: CatalogueInterface;
    subject: SubjectInterface;
    subjectId: string;
    type: CatalogueInterface;
    workday: CatalogueInterface;

    academicObservation: string;
    number: number;
    date: Date;
    finalAttendance: number;
    finalGrade: number;
    supplementaryGrade: number;
    observation: string;
}

export interface EnrollmentStateInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;

    state: CatalogueInterface;
    enrollment: EnrollmentInterface;

    observation: string;
}

export interface EnrollmentInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    career: CareerInterface;
    academicState: CatalogueInterface;
    enrollmentDetails: EnrollmentDetailInterface[];
    enrollmentStates: EnrollmentStateInterface[];
    enrollmentState: EnrollmentStateInterface;
    academicPeriod: CatalogueInterface;
    parallel: CatalogueInterface;
    state: CatalogueInterface;
    subject: SubjectInterface;
    type: CatalogueInterface;
    workday: CatalogueInterface;
    student: StudentInterface;
    schoolPeriod: SchoolPeriodInterface;

    number: number;
    date: Date;
    finalAttendance: number;
    finalGrade: number;
    observation: string;
}

export interface StudentInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    informationStudent: InformationStudentInterface;
    user: UserInterface;
}

export interface UserInterface {
    id: string;
    identificationType: CatalogueInterface;
    identificationTypeId: CatalogueInterface;
    sex: CatalogueInterface;
    gender: CatalogueInterface;
    ethnicOrigin: CatalogueInterface;
    bloodType: CatalogueInterface;
    bloodTypeId: CatalogueInterface;
    maritalStatus: CatalogueInterface;
    phones: CatalogueInterface[];
    emails: CatalogueInterface[];
    roles: RoleInterface[];
    avatar: string;
    birthdate: string;
    email: string;
    emailVerifiedAt: Date;
    identification: string;
    lastname: string;
    maxAttempts: number;
    name: string;
    password: string;
    passwordChanged: boolean;
    phone: string;
    suspendedAt: Date;
    student: StudentInterface;
    teacher: TeacherInterface;
    username: string;

    institutions: InstitutionInterface[];
    careers: CareerInterface[];
}

export interface TeacherInterface {
    id?: string;
    informationTeacher?: InformationTeacherInterface;
    user: UserInterface;
    isVisible: boolean;
}

export interface RoleInterface {
    id: string;
    name: string;
    code: string;
    permissions: PermissionInterface[];
}

export interface PermissionInterface {
    id?: number;
    name?: string;
}

export interface InformationTeacherInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isVisible: boolean;

    teacher: TeacherInterface;
    countryHigherEducation: CatalogueInterface;
    higherEducation: CatalogueInterface;
    scholarship: CatalogueInterface;
    scholarshipType: CatalogueInterface;
    teachingLadder: CatalogueInterface;
    academicUnit: string;
    administrativeHours: number;
    classHours: number;
    communityHours: number;
    degreeHigherEducation: string;
    hoursWorked: number;
    holidays: Date;
    homeVacation: Date;
    institutionHigherEducation: string;
    investigationHours: number;
    otherHours: number;
    publications: string;
    scholarshipAmount: number;
    state: boolean;
    totalSubjects: number;
    technical: string;
    technology: string;
    totalPublications: number;
}

export interface InformationStudentInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    student: StudentInterface;

    isExecutedPractice: CatalogueInterface;
    isExecutedCommunity: CatalogueInterface;
    isDisability: CatalogueInterface;
    isLostGratuity: CatalogueInterface;
    isSubjectRepeat: CatalogueInterface;

    address: string;
    community: number;
    contactEmergencyName: string;
    contactEmergencyKinship: string;
    contactEmergencyPhone: string;
    disabilityPercentage: number;
    economicAmount: number;
    educationalAmount: number;
    familyIncome: number;
    financingScholarshipType: string;
    membersHouseNumber: number;
    practiceHours: number;
    postalCode: string;
    scholarshipAmount: number;
    tariffScholarshipPercentage: number;
}

export interface SchoolPeriodInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    state: CatalogueInterface;

    code: string;
    codeSniese: string;
    name: string;
    shortName: string;
    startedAt: Date;
    endedAt: Date;
    ordinaryStartedAt: Date;
    ordinaryEndedAt: Date;
    extraOrdinaryStartedAt: Date;
    extraOrdinaryEndedAt: Date;
    especialStartedAt: Date;
    especialEndedAt: Date;
}

export interface CareerInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    institution: InstitutionInterface;
    modality: CatalogueInterface;
    state: CatalogueInterface;
    type: CatalogueInterface;
    curriculums: CurriculumInterface[];

    acronym: string;
    code: string;
    codeSniese: string;
    degree: string;
    logo: string;
    name: string;
    resolutionNumber: string;
    shortName: string;
}

export interface SubjectRequirementInterface {
    id: string;
    createAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    subject: SubjectInterface;
    subjectId: string;
    requirement: SubjectInterface;

    isEnabled: boolean;
}

export interface CurriculumInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    career: CareerInterface;
    careerId: string;
    state: CatalogueInterface;

    code: string;
    name: string;
    description: string;
    resolutionNumber: string;
    periodicAcademicNumber: number;
    weeksNumber: number;
}

export interface InstitutionInterface {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    address: CatalogueInterface;
    state: CatalogueInterface;
    careers: CareerInterface[];
    acronym: string;
    cellphone: string;
    code: string;
    codeSniese: string;
    denomination: string;
    email: string;
    logo: string;
    name: string;
    phone: string;
    shortName: string;
    slogan: string;
    web: string;
}

export interface SubjectInterface {
    id: string;
    createAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    curriculum: CurriculumInterface;
    academicPeriod: CatalogueInterface;
    type: CatalogueInterface;
    state: CatalogueInterface;
    subjectPrerequisites: SubjectRequirementInterface[];
    subjectCorequisites: SubjectRequirementInterface[];

    autonomousHour: number;
    code: string;
    credits: number;
    name: string;
    practicalHour: number;
    scale: number;
    teacherHour: number;
    isVisible: boolean;
    enabled: boolean;

    items: SubjectInterface[];

    academicState: string | undefined;
    enrollmentStates: EnrollmentDetailStateInterface[];
    enrollmentState: EnrollmentDetailStateInterface;
}

export interface GradeInterface {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    enrollmentDetailModel: EnrollmentDetailInterface;
    partial: PartialInterface;
    value: number;
}

export interface SaveGradesDto {
    grade1?: number | null;
    grade2?: number | null;
    attendance?: number | null;
    teacherDistributionId: string;
}

export interface PartialInterface {
    id: string;
    code: string;
    name: string;
}
 

export interface TeacherDistributionInterface {
    id: string;
    parallel: CatalogueInterface;
    teacher: TeacherInterface;
    schoolPeriod: SchoolPeriodInterface;
    subject: SubjectInterface;
    workday: CatalogueInterface;
    hours: number;
    partialPermissions: PartialPermissionInterface[];
}

export interface PartialPermissionInterface {
    id: string;
    teacherDistribution: TeacherDistributionInterface;
    partial: PartialInterface;
    enabled: boolean;
}

export interface CatalogueInterface {
    id: string;
    parentId: string;
    code: string;
    name: string;
    required: boolean;
    sort: number;
    type: string;
    isVisible: boolean;
}


//Cambiar principal por teacher distribution, con matusculas y minusculas 
export const TEACHER_DISTRIBUTION_DATA_KEYS = ['grade1', 'grade2', 'attendance'] as const satisfies (keyof TeacherDistributionData)[];

export type SectionKeysMap = {
    [K in keyof TeacherDistributionState]: readonly (keyof NonNullable<TeacherDistributionState[K]>)[];
};

export const SECTION_KEYS: SectionKeysMap = {
    teacherDistributionData: TEACHER_DISTRIBUTION_DATA_KEYS,

};