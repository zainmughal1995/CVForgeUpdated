import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    updatePersonal: (state, action) => {
      state.personal = { ...state.personal, ...action.payload };
    },

    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action) => {
      const { id, data } = action.payload;
      const index = state.education.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.education[index] = {
          ...state.education[index],
          ...data,
        };
      }
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },

    addExperience: (state, action) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action) => {
      const { id, data } = action.payload;
      const index = state.experience.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.experience[index] = {
          ...state.experience[index],
          ...data,
        };
      }
    },
    removeExperience: (state, action) => {
      state.experience = state.experience.filter(
        (e) => e.id !== action.payload,
      );
    },

    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },

    resetCV: () => initialState,
  },
});

export const {
  updatePersonal,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addSkill,
  removeSkill,
  resetCV,
} = cvSlice.actions;

export default cvSlice.reducer;
