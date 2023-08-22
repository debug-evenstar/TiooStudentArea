import { BaseResult } from ".";

export interface SubjectResult extends BaseResult {
    subjects: SubjectItem[]
}

export interface SubjectItem {
    description: string
    id: number
    image: string
    naming:string
}
