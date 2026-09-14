export type UserLevel = 'beginner' | 'mid-level' | 'experienced';
export type TrackSpecialty = 'undetermined' | 'frontend' | 'backend' | 'devops' | 'fullstack';
export type TaskStatus = 'locked' | 'available' | 'in_progress' | 'submitted' | 'passed';

export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    experienceTier: UserLevel;
    assignedSpecialty: TrackSpecialty;
    hiddenMetrics: {
        frontendPoints: number;
        backendPoints: number;
        devopsPoints: number;
    };
}

export interface Task {
    id: string;
    title: string;
    description: string;
    targetTier: UserLevel;
    specialtyTag: TrackSpecialty;
    pointsWorth: number;
    unlockDay: number;
    status: TaskStatus;
}
