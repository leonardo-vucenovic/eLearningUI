export interface UpdateLessonRequest {
    title: string;
    description: string;
    //fileUrl: string;
    videoFIle: File | null;
    subjectId: string;
    levelOfEducationId: string;
    underLevelOfEducationId: string;
}