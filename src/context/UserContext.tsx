import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, ResumeData, QuizResult, CareerMatch, SkillGap, RoadmapStep } from '@/lib/types';

interface UserContextType {
  profile: UserProfile;
  setResumeData: (data: ResumeData) => void;
  setQuizResult: (result: QuizResult) => void;
  setCareerMatch: (match: CareerMatch) => void;
  setSkillGap: (gap: SkillGap) => void;
  setRoadmap: (roadmap: RoadmapStep[]) => void;
  updateRoadmapStep: (stepId: string, completed: boolean) => void;
  resetProfile: () => void;
}

const defaultProfile: UserProfile = {
  readinessScore: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const setResumeData = (data: ResumeData) => {
    setProfile(prev => ({ ...prev, resumeData: data }));
  };

  const setQuizResult = (result: QuizResult) => {
    setProfile(prev => ({ ...prev, quizResult: result }));
  };

  const setCareerMatch = (match: CareerMatch) => {
    setProfile(prev => ({ ...prev, careerMatch: match }));
  };

  const setSkillGap = (gap: SkillGap) => {
    setProfile(prev => ({ 
      ...prev, 
      skillGap: gap,
      readinessScore: gap.readinessScore,
    }));
  };

  const setRoadmap = (roadmap: RoadmapStep[]) => {
    setProfile(prev => ({ ...prev, roadmap }));
  };

  const updateRoadmapStep = (stepId: string, completed: boolean) => {
    setProfile(prev => ({
      ...prev,
      roadmap: prev.roadmap?.map(step =>
        step.id === stepId ? { ...step, completed } : step
      ),
    }));
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setResumeData,
        setQuizResult,
        setCareerMatch,
        setSkillGap,
        setRoadmap,
        updateRoadmapStep,
        resetProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
