export interface ResumeExperience {
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string;
}

export interface ResumeData {
  experiences: ResumeExperience[];
}
