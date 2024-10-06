import { NewDiaryEntry, Weather, Visibility } from "./types/types";
import z from "zod";

// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// eslint-disable-next-line @typescript-eslint/unused-vars
// const parseComment = (comment: unknown): string => {
//   if (!isString(comment)) {
//     throw new Error("Incorrect or missing comment");
//   }

//   return comment;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// eslint-disable-next-line @typescript-eslint/unused-vars
// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date: " + date);
//   }

//   return date;
// };

// const isWeather = (param: string): param is Weather => {
//   return Object.values(Weather)
//     .map((w) => w.toLowerCase())
//     .includes(param.toLowerCase());
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!isString(weather) || !isWeather(weather)) {
//     throw new Error("Incorrect or missing weather: " + weather);
//   }
//   return weather;
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility)
//     .map((v) => v.toLowerCase())
//     .includes(param.toLowerCase());
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility)) {
//     throw new Error("Incorrect or missing visibility: " + visibility);
//   }
//   return visibility;
// };

export const newEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional(),
});

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return newEntrySchema.parse(object);
};

export default toNewDiaryEntry;
