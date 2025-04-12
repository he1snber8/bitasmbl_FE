import { Category } from "@/src/interfaces/categoryTypes";
import {
  GetAppliedProjectsModel,
  GetClientProjectModel,
} from "@/src/interfaces/projects/client-specific-projects/GetClientProjectModel";
import {
  ApplyToProjectRequest,
  ApplyToProjectResponse,
  CreateProjectModel,
  CreateProjectResponse,
  GetRequirement,
  UpdateProjectRequest,
} from "@/src/interfaces/projects/projectTypes";
import {
  GetProjectApplicationModel,
  GetUserProjectModel,
  UserApplicationsByProject,
} from "@/src/interfaces/projects/user-specific-projects/GetUserProjectModel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetProjectRequirementTest } from "../interfaces/projects/projectRequirementTypes";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://a110-176-221-143-53.ngrok-free.app/projects",
    baseUrl: "http://localhost:5057/projects",
    // baseUrl: "https://bitasmbl.onrender.com/projects",
    credentials: "include",
  }),

  tagTypes: [
    "Projects",
    "Applications",
    "Project",
    "Application",
    "UserProjects",
  ],
  endpoints: (builder) => ({
    getProjects: builder.query<GetClientProjectModel[], void>({
      providesTags: ["Projects"],
      query: () => "",
    }),

    getUserProject: builder.query<GetUserProjectModel, number>({
      query: (projectId) => `${projectId}`,
    }),

    getUserProjectApplications: builder.query<
      GetProjectApplicationModel[],
      number
    >({
      query: (projectId) => `applications/project/${projectId}`,
      providesTags: (result, error, projectId) => {
        return [{ type: "Project", id: `PROJECT_${projectId}` }];
      },
    }),

    rejectApplication: builder.mutation<
      GetProjectApplicationModel,
      { applicationId: number; projectId: number }
    >({
      query: ({ applicationId }) => ({
        url: `applications/reject/${applicationId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { projectId }) => [
        // { type: "Applications", id: applicationId }, // Invalidate only the updated application
        { type: "Project", id: `PROJECT_${projectId}` }, // Invalidate all applications for this project
      ],
    }),

    approveApplication: builder.mutation<
      GetProjectApplicationModel,
      { applicationId: number; projectId: number }
    >({
      query: ({ applicationId }) => ({
        url: `applications/approve/${applicationId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { applicationId, projectId }) => [
        // { type: "Applications", id: applicationId },
        { type: "Project", id: `PROJECT_${projectId}` }, // Invalidate only the updated application
      ],
    }),

    getUserProjects: builder.query<GetUserProjectModel[], void>({
      providesTags: ["UserProjects"],
      query: () => "/profile",
    }),
    getProjectCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    getProjectRequirements: builder.query<GetRequirement[], void>({
      query: () => "/requirements",
    }),
    getAppliedProjects: builder.query<GetAppliedProjectsModel[], void>({
      query: () => "/applied",
    }),

    createProject: builder.mutation<CreateProjectResponse, CreateProjectModel>({
      invalidatesTags: ["UserProjects"],
      query: (createProjectModel) => ({
        url: "",
        method: "POST",
        body: createProjectModel,
      }),
    }),
    applyToProject: builder.mutation<
      GetProjectApplicationModel,
      ApplyToProjectRequest
    >({
      query: (projectApplicationCommand) => ({
        url: "/apply",
        method: "POST",
        body: projectApplicationCommand,
      }),
      invalidatesTags: ["Projects"],
    }),

    updateProject: builder.mutation<GetUserProjectModel, UpdateProjectRequest>({
      query: (updateProjectRequest) => ({
        url: "",
        method: "PUT",
        body: updateProjectRequest,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "UserProjects", id: `PROJECT_${id}` }, // Invalidate the specific project
      ],
    }),

    getProjectRequirementTest: builder.query<
      GetProjectRequirementTest[],
      { requirementNames: string[] }
    >({
      query: ({ requirementNames }) => ({
        url: "/requirement/tests",
        method: "GET",
        params: { requirementNames },
      }),
    }),

    uploadProjectImages: builder.mutation<
      void,
      { projectId?: number; files?: File[] }
    >({
      query: ({ projectId, files }) => {
        const formData = new FormData();

        // Append the project ID
        formData.append("projectId", projectId!.toString());

        // Append each file
        files!.forEach((file) => {
          formData.append("files", file);
        });

        return {
          url: "images/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useApproveApplicationMutation,
  useGetUserProjectApplicationsQuery,
  useRejectApplicationMutation,
  useGetUserProjectQuery,
  useGetAppliedProjectsQuery,
  useGetProjectRequirementTestQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useApplyToProjectMutation,
  useUploadProjectImagesMutation,
  useGetProjectsQuery,
  useGetProjectCategoriesQuery,
  useGetProjectRequirementsQuery,
  useGetUserProjectsQuery,
} = projectsApi; // Export the hook
