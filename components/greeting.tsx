import { motion } from 'framer-motion';
import { OnboardingMessage } from './onboarding-message';
import { useLifeBlueprint } from './life-blueprint-context';

export const Greeting = () => {
  const { state, setOnboardingComplete, setVisionAnswers } = useLifeBlueprint();

  // Show onboarding if not complete
  if (!state.onboardingComplete) {
    return (
      <div
        key="overview"
        className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-semibold"
        >
          Welcome!
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-zinc-500 mb-8"
        >
          I'm here to help you create your Life Blueprint. Let's start by choosing the areas of life you'd like to focus on.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.7 }}
        >
          <OnboardingMessage
            step="categories"
            onComplete={(data) => {
              setOnboardingComplete(true);
              setVisionAnswers(data.visionAnswers);
            }}
          />
        </motion.div>
      </div>
    );
  }

  // Show default greeting if onboarding is complete
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-semibold"
      >
        Hello there!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-2xl text-zinc-500"
      >
        How can I help you today?
      </motion.div>
    </div>
  );
};
