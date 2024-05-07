import { makeAutoObservable } from "mobx";
import { ApiError, ApplicationI, CreateJobDataI, JobI } from "types";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";
import {
  createApplication,
  createJob,
  getApplications,
  getJobs,
  getMyJobs,
} from "../services/api";

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
      this.handleApiError(error);
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
      this.handleApiError(error);
    } finally {
      this.isJobsLoading = false;
    }
  };

  createJob = async (jobData: CreateJobDataI): Promise<void> => {
    try {
      const newJob = await createJob(jobData);
      this.jobs.push(newJob);
      this.myJobs.push(newJob);
    } catch (error: unknown) {
      this.handleApiError(error);
    }
  };

  applyJob = async (jobId: string, coverLetter: string): Promise<void> => {
    this.isApplicationsLoading = true;
    try {
      const application = await createApplication(jobId, coverLetter);
      this.applications.push(application.data);
    } catch (error: unknown) {
      this.handleApiError(error);
    } finally {
      this.isApplicationsLoading = false;
    }
  };

  loadApplications = async (jobId: string): Promise<void> => {
    this.isApplicationsLoading = true;
    try {
      const response = await getApplications(jobId);
      this.applications = response;
    } catch (error: unknown) {
      this.handleApiError(error);
    } finally {
      this.isApplicationsLoading = false;
    }
  };

  handleApiError = (error: unknown) => {
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
  };
}

export const jobStore = new JobStore();
