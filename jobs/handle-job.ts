import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const host = process.env.HOST!;
const port = process.env.PORT! || 80;
const token = process.env.JOBS_API_TOKEN!;

export default function handleJob(name: string): void {
  axios.get(`${host}:${port}/api/jobs/${name}?token=${token}`)
    .catch((error) => {
      const hasErrorTextInResponse = axios.isAxiosError(error)
        && error.response
        && error.response.data
        && error.response.data.message;

      if (hasErrorTextInResponse) {
        console.log((error as AxiosError).response!.data!.message!);
      }

      const hasOtherErrorText = error instanceof Error && error.message;

      console.log(hasOtherErrorText ? (error as Error).message : 'Something went wrong. Try again.');
    });
}
