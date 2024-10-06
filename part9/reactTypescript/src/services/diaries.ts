import axios from "axios";
import { NewDiaryEntry, Diary } from "../types";

const baseUrl = "http://localhost:3000/api";

export const getDiaries = async () => {
  return axios
    .get<Diary[]>(`${baseUrl}/diaries`)
    .then((respond) => respond.data);
};

export const createDiary = async (data: NewDiaryEntry) => {
  return axios
    .post<Diary>(`${baseUrl}/diaries`, data)
    .then((respond) => respond.data);
};
