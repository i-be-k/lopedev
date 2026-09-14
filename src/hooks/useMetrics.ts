import { useState } from 'react';
import { UserProfile, TrackSpecialty } from '@/types';

export const useMetrics = (initialUser: UserProfile) => {
    const [user, setUser] = useState<UserProfile>(initialUser);

    const trackInteraction = (specialtyTag: TrackSpecialty) => {
        setUser((prevUser) => {
            const updatedMetrics = { ...prevUser.hiddenMetrics };

            if (specialtyTag === 'frontend') updatedMetrics.frontendPoints += 5;
            if (specialtyTag === 'backend') updatedMetrics.backendPoints += 5;
            if (specialtyTag === 'devops') updatedMetrics.devopsPoints += 5;

            // Determine the dominant specialty behind the scenes
            let newSpecialty = prevUser.assignedSpecialty;
            const { frontendPoints, backendPoints, devopsPoints } = updatedMetrics;

            if (frontendPoints > backendPoints && frontendPoints > devopsPoints) {
                newSpecialty = 'frontend';
            } else if (backendPoints > frontendPoints && backendPoints > devopsPoints) {
                newSpecialty = 'backend';
            } else if (devopsPoints > frontendPoints && devopsPoints > backendPoints) {
                newSpecialty = 'devops';
            }

            return {
                ...prevUser,
                hiddenMetrics: updatedMetrics,
                assignedSpecialty: newSpecialty,
            };
        });
    };

    return { user, trackInteraction };
};
