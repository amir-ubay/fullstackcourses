import z from "zod";

export interface CourseSchema {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export interface Note {
  id: string;
  content: string;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export const diarySchema = z.object({
  id: z.number(),
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export const newDiaryEntrySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export type NewDiaryEntry = z.infer<typeof newDiaryEntrySchema>;
