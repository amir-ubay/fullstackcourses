interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  dailyExerciseHours: number[],
  target: number
): ExerciseResult {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const average =
    dailyExerciseHours.reduce((sum, hours) => sum + hours) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job!";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

interface Args {
  data: number[];
  target: number;
}

function parseEnv(args: string[]): Args {
  const length = args.length;
  const data = [];
  if (isNaN(Number(args[length - 1])))
    throw new Error("Provided values were not numbers!");
  for (let i = 2; i < length - 1; i++) {
    if (isNaN(Number(args[i])))
      throw new Error("Only number arguments are allowed");
    data.push(Number(args[i]));
  }
  return {
    data,
    target: Number(args[length - 1]),
  };
}
if (require.main === module) {
  try {
    const { data, target } = parseEnv(process.argv);
    console.log(calculateExercises(data, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateExercises;
