function bmi(height: number, weight: number) {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25.0) {
    return "Normal range";
  } else if (bmi < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35.0) {
    return "Obese (Class I)";
  } else if (bmi < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
}

function processEnv(args: string[]) {
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Only number arguments are allowed");
  } else {
    return [Number(args[2]), Number(args[3])];
  }
}

if (require.main === module) {
  try {
    const [a, b] = processEnv(process.argv);
    console.log(bmi(a, b));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default bmi;
