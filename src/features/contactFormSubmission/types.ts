export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormSubmissionResponse {
  success: boolean;
  message: string;
}
