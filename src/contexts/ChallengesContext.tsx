import { createContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/client";
import challenges from "../../challenges.json";
import Cookie from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";
import { UserGithubForm } from "../components/UserGithubForm";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: string;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  startNewChallenge: () => void;
  challengeCompleteButton: () => void;
  levelUp: () => void;
  resetChallengeValue: () => void;
  closeLevelUpModal: () => void;
  getUserGithub: () => void;
}
interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [session, loading] = useSession();
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModal, setIsLevelUpModal] = useState(false);
  const [isUserGithub, setIsUserGithub] = useState(true);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModal(true);
  }

  useEffect(() => {
    Cookie.set("level", String(level));
    Cookie.set("currentExperience", String(currentExperience));
    Cookie.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valendo ${challenge.amount}xp!!!`,
      });
    }
  }
  function getUserGithub() {
    setIsUserGithub(false);
  }
  function resetChallengeValue() {
    setActiveChallenge(null);
  }
  function closeLevelUpModal() {
    setIsLevelUpModal(false);
  }
  function challengeCompleteButton() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setActiveChallenge(null);
    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        experienceToNextLevel,
        activeChallenge,
        resetChallengeValue,
        challengeCompleteButton,
        closeLevelUpModal,
        getUserGithub,
      }}
    >
      {children}

      {!loading && !session && isUserGithub && (
        <UserGithubForm></UserGithubForm>
      )}

      {isLevelUpModal && <LevelUpModal></LevelUpModal>}
    </ChallengesContext.Provider>
  );
}
