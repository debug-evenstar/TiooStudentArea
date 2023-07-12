export interface BaseResult {
    error: boolean
    message: string
}

export interface ErrorResult {
    success: boolean;
    message: string;
    errors: string;
}