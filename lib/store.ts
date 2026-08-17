"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_PATIENT, DEMO_DRUG } from "./data";
import { Drug, FillAttempt, InsuranceStatus, Patient, PreferenceKey } from "./types";

type NavigatorState = {
  drug: Drug;
  patient: Patient;
  preference: PreferenceKey | null;
  setDrug: (drug: Partial<Drug>) => void;
  setInsurance: (status: InsuranceStatus, company?: string | null, plan?: string | null) => void;
  setFillAttempt: (attempt: FillAttempt, quotedPrice?: number | null, denialReason?: string | null) => void;
  setSituation: (fields: Partial<Pick<Patient, "enrolledCommercialPlan" | "currentlyTaking" | "urgency">>) => void;
  setPreference: (preference: PreferenceKey) => void;
  reset: () => void;
};

export const useNavigatorStore = create<NavigatorState>()(
  persist(
    (set, get) => ({
      drug: DEMO_DRUG,
      patient: DEFAULT_PATIENT,
      preference: null,

      setDrug: (drug) => set({ drug: { ...get().drug, ...drug } }),

      setInsurance: (status, company = null, plan = null) =>
        set({
          patient: {
            ...get().patient,
            insuranceStatus: status,
            insuranceCompany: status === "commercial" ? company : null,
            plan: status === "commercial" ? plan : null,
          },
        }),

      setFillAttempt: (attempt, quotedPrice = null, denialReason = null) =>
        set({
          patient: {
            ...get().patient,
            previousFillAttempt: attempt,
            quotedPrice: attempt === "quoted" ? quotedPrice : null,
            denialReason: attempt === "denied" ? denialReason : null,
          },
        }),

      setSituation: (fields) => set({ patient: { ...get().patient, ...fields } }),

      setPreference: (preference) => set({ preference }),

      reset: () => set({ drug: DEMO_DRUG, patient: DEFAULT_PATIENT, preference: null }),
    }),
    { name: "prescription-navigator" },
  ),
);
