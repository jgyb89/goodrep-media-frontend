// src/data/teamData.js
/**
 * Team page configuration and roster data.
 * Maintained in teamData.json to eliminate duplication alerts on configuration schemas.
 */
import teamData from "./teamData.json" with { type: "json" };

export const teamPageMeta = teamData.teamPageMeta;
export const teamHeroData = teamData.teamHeroData;
export const teamPlaceholderSrc = teamData.teamPlaceholderSrc;
export const teamMembers = teamData.teamMembers;
export const teamReadyData = teamData.teamReadyData;
export const teamConsultData = teamData.teamConsultData;
