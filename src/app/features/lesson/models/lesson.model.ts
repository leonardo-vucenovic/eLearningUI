import { LevelOfEducation } from "../../level-of-education/models/level-of-education.model";
import { Subject } from "../../subject/models/subject.model";
import { UnderLevelOfEducation } from "../../under-level-of-education/models/under-level-of-education.model";

export interface Lesson {
    id: string;
    title: string;
    description: string;
    videoFileUrl: string;
    subject: Subject;
    levelOfEducation: LevelOfEducation;
    underLevelOfEducation: UnderLevelOfEducation;
}