import { BaseResult } from ".";

export interface StudentLoginInput {
    email: string;
    password: string;
}
export interface StudentLoginResult extends BaseResult{
    profile: StudentProfile
    token: string
}
export interface StudentProfile {
    AccountId: number
    name: string
    email: string
    phone: string
    account_type: string
    verification_status: number
    flag: string
    schoolName: string
    studentClass: string
    referral_code: string;
    studentClassArm: string
    subjectsCount: number
    term: string
    status: string
    token?: string
    school?: boolean
    independent: string | null;
    metadata?: any;
}