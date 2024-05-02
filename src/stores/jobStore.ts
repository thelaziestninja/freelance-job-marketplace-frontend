import { makeAutoObservable } from "mobx";
import { ApiError, ApplicationI, JobI } from "types";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";
import { getApplications, getJobs, getMyJobs } from "../services/api";

class JobStore {
  jobs: JobI[] = [];
  myJobs: JobI[] = [];
  applications: ApplicationI[] = [];
  isJobsLoading: boolean = false;
  isApplicationsLoading: boolean = false;
  jobStoreError: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
    // this.loadJobs(); -> if you want to load jobs on store creation you'll get 401 on first page
  }

  loadJobs = async (): Promise<void> => {
    this.isJobsLoading = true;
    try {
      const response = await getJobs();
      //   console.log("API response:", response);
      this.jobs = response.jobs;
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        this.jobStoreError = {
          message: error.message,
          statusCode: error.statusCode,
        };
      } else {
        this.jobStoreError = {
          message: "An unknown error occurred",
        };
      }
    } finally {
      this.isJobsLoading = false;
    }
  };

  loadMyJobs = async (): Promise<void> => {
    this.isJobsLoading = true;
    try {
      const response = await getMyJobs();
      console.log("API response:", response);
      this.myJobs = response;
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        this.jobStoreError = {
          message: error.message,
          statusCode: error.statusCode,
        };
      } else {
        this.jobStoreError = {
          message: "An unknown error occurred",
        };
      }
    } finally {
      this.isJobsLoading = false;
    }
  };

  loadApplications = async (jobId: string): Promise<void> => {
    this.isApplicationsLoading = true;
    try {
      const response = await getApplications(jobId);
      this.applications = response;
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        this.jobStoreError = {
          message: error.message,
          statusCode: error.statusCode,
        };
      } else {
        this.jobStoreError = {
          message: "An unknown error occurred",
        };
      }
    } finally {
      this.isApplicationsLoading = false;
    }
  };
}

export const jobStore = new JobStore();
