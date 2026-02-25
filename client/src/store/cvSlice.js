// store/cvSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* =======================
   FETCH FULL CV
======================= */
export const fetchCV = createAsyncThunk("cv/fetchCV", async () => {
  const res = await api.get("/cv/");
  return res.data;
});

/* =======================
   PERSONAL
======================= */
export const savePersonal = createAsyncThunk(
  "cv/savePersonal",
  async (data) => {
    const res = await api.put("/cv/personal/", data);
    return res.data;
  },
);

/* =======================
   EDUCATION
======================= */
export const createEducation = createAsyncThunk(
  "cv/createEducation",
  async (data) => {
    const res = await api.post("/education/", data);
    return res.data;
  },
);

export const updateEducationAsync = createAsyncThunk(
  "cv/updateEducation",
  async ({ id, data }) => {
    const res = await api.put(`/education/${id}/`, data);
    return res.data;
  },
);

export const deleteEducationAsync = createAsyncThunk(
  "cv/deleteEducation",
  async (id) => {
    await api.delete(`/education/${id}/`);
    return id;
  },
);

/* =======================
   EXPERIENCE
======================= */
export const createExperience = createAsyncThunk(
  "cv/createExperience",
  async (data) => {
    const res = await api.post("/experience/", data);
    return res.data;
  },
);

export const updateExperienceAsync = createAsyncThunk(
  "cv/updateExperience",
  async ({ id, data }) => {
    const res = await api.put(`/experience/${id}/`, data);
    return res.data;
  },
);

export const deleteExperienceAsync = createAsyncThunk(
  "cv/deleteExperience",
  async (id) => {
    await api.delete(`/experience/${id}/`);
    return id;
  },
);

/* =======================
   SKILLS
======================= */
export const createSkill = createAsyncThunk("cv/createSkill", async (data) => {
  const res = await api.post("/skills/", data);
  return res.data;
});

export const deleteSkillAsync = createAsyncThunk(
  "cv/deleteSkill",
  async (id) => {
    await api.delete(`/skills/${id}/`);
    return id;
  },
);

/* =======================
   SLICE
======================= */
const initialState = {
  personal: {},
  education: [],
  experience: [],
  skills: [],
  loading: false,
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    // 🔥 Local instant preview update (DO NOT manually dispatch fulfilled)
    updateLocalPersonal: (state, action) => {
      state.personal = action.payload;
    },

    // Optional: reset on logout
    resetCV: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      /* ================= FETCH ================= */
      .addCase(fetchCV.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCV.fulfilled, (state, action) => {
        state.loading = false;
        state.personal = action.payload.personal || {};
        state.education = action.payload.education || [];
        state.experience = action.payload.experience || [];
        state.skills = action.payload.skills || [];
      })
      .addCase(fetchCV.rejected, (state) => {
        state.loading = false;
      })

      /* ================= PERSONAL ================= */
      .addCase(savePersonal.fulfilled, (state, action) => {
        state.personal = action.payload;
      })

      /* ================= EDUCATION ================= */
      .addCase(createEducation.fulfilled, (state, action) => {
        state.education.push(action.payload);
      })
      .addCase(updateEducationAsync.fulfilled, (state, action) => {
        const index = state.education.findIndex(
          (e) => e.id === action.payload.id,
        );
        if (index !== -1) state.education[index] = action.payload;
      })
      .addCase(deleteEducationAsync.fulfilled, (state, action) => {
        state.education = state.education.filter(
          (e) => e.id !== action.payload,
        );
      })

      /* ================= EXPERIENCE ================= */
      .addCase(createExperience.fulfilled, (state, action) => {
        state.experience.push(action.payload);
      })
      .addCase(updateExperienceAsync.fulfilled, (state, action) => {
        const index = state.experience.findIndex(
          (e) => e.id === action.payload.id,
        );
        if (index !== -1) state.experience[index] = action.payload;
      })
      .addCase(deleteExperienceAsync.fulfilled, (state, action) => {
        state.experience = state.experience.filter(
          (e) => e.id !== action.payload,
        );
      })

      /* ================= SKILLS ================= */
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(deleteSkillAsync.fulfilled, (state, action) => {
        state.skills = state.skills.filter((s) => s.id !== action.payload);
      });
  },
});

export const { updateLocalPersonal, resetCV } = cvSlice.actions;

export default cvSlice.reducer;
