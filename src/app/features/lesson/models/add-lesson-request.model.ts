export interface AddLessonRequest {
    title: string;
    description: string;
    //fileUrl: string;
    videoFile: File | null;
    subjectId: string;
    levelOfEducationId: string;
    underLevelOfEducationId: string;
}