import z from "zod";
import { newEntrySchema } from "../utils";

// export type Weather = "rainy" | "sunny" | "cloudy" | "windy" | "stormy";
export enum Weather {
  Rainy = "rainy",
  Sunny = "sunny",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}

// export type Visibility = "great" | "good" | "ok" | "poor";
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

// export interface DiaryEntry {
//   id: number;
//   date: string;
//   weather: Weather;
//   visibility: Visibility;
//   comment?: string;
// }

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;
// epxport type NoCommentDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>

export type NewDiaryEntry = z.infer<typeof newEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}
