import { BaseResult } from ".";

export interface StudentLoginInput {
    email: string;
    password: string;
  }
export interface StudentLoginResult extends BaseResult{
    profile: UserProfile
}
export interface UserProfile {
    name: string
    id: string
    schoolId: string
    status: string
    email: string
    account_type: string
    phone: string
    token: string
}