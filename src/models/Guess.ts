import type {Gender} from "@/models/Gender.ts";

export type Guess = {
  user_id: string | null
  gender: Gender
  name: string
  size: number | null
  weight: number | null
  time: Date | null
  username: string | null
  advice : string | null
}
