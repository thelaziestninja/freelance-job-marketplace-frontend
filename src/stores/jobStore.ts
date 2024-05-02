import { getJobs } from "../services/api";
import { ApiError, JobI } from "types";
import { makeAutoObservable } from "mobx";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";

class JobStore {
  jobs: JobI[] = [];
  myJobs: JobI[] = [];
  isLoading: boolean = false;
  error: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadJobs();
  }

  loadJobs = async (): Promise<void> => {
    this.isLoading = true;
    try {
      const response = await getJobs();
      console.log("API response:", response);
      this.jobs = response.jobs;
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        this.error = {
          message: error.message,
          statusCode: error.statusCode,
        };
      } else {
        this.error = {
          message: "An unknown error occurred",
        };
      }
    } finally {
      this.isLoading = false;
    }
  };
}

export const jobStore = new JobStore();
