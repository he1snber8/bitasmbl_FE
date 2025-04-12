import {
  Button,
  Checkbox,
  ListItemPrefix,
  Progress,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { motion } from "framer-motion";

interface QuizFormProps {
  question: string;
  answers: string[];
  questionCount: number;
  correctAnswer: string;
  handleNext: () => void;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  correctAnswers: number;
}

export default function ProjectRequirementTest({
  question = "Default Question",
  answers,
  correctAnswer = "",
  questionCount,
  handleNext,
  setCorrectAnswers,
  correctAnswers,
}: QuizFormProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizProgress, setQuizProgress] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);

  let progressCounter = 100 / questionCount;

  const handleQuizProgress = () => {
    // window.setTimeout(() => {
    //   setSelectedAnswer("");
    // }, 500);
    setQuizProgress(quizProgress + progressCounter);
    setQuestionsAnswered(questionsAnswered + 1);
  };

  return (
    <form className="w-full border h-max flex flex-col content-center">
      <div>
        <h2 className="text-lg h-12 font-semibold mb-">{question}</h2>
      </div>
      <div className="gap-">
        <div className="w-full">
          <div className="flex items-center justify-between gap-2">
            <Typography color="white" variant="h6">
              Completed
            </Typography>
            <Typography color="white" variant="h6">
              {questionsAnswered}/{questionCount}
            </Typography>
          </div>
          <div className="w-full  h-2 bg-gray-300">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${quizProgress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full bg-purple-500"
            />
          </div>
        </div>
        {answers &&
          answers.map((answer, index) => (
            <ListItemPrefix
              key={index}
              className="flex items-center gap-x-2 gap-y-1"
            >
              <Radio
                name="quiz" // Ensures single selection
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => setSelectedAnswer(answer)}
                color="purple"
                label={answer}
                labelProps={{ className: "text-ash text-sm" }}
              />
            </ListItemPrefix>
          ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            if (selectedAnswer !== "") {
              if (selectedAnswer === correctAnswer) {
                setCorrectAnswers(correctAnswers + 1);
              }
              handleNext();
              handleQuizProgress();
            }
          }}
          className="border selen border-concrete normal-case rounded-none font-normal text-lg text-white px-2 py-2"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
