import * as abodeServices from "./abodeServicesData.js";
import * as beBalanced from "./beBalancedData.js";
import * as capeCoralLawnCare from "./capeCoralLawnCareData.js";
import * as capeCoralReviewed from "./capeCoralReviewedData.js";
import * as coralBreeze from "./coralBreezeData.js";
import * as floridaSunshine from "./floridaSunshineLawnCareData.js";
import * as glowingResults from "./glowingResultsData.js";
import * as homeOwnerHelpOptions from "./homeOwnerHelpOptionsData.js";
import * as homeOwnerProExperts from "./homeOwnerProExpertsData.js";
import * as jojoJava from "./jojoJavaData.js";

/**
 * Registry of all case study data modules mapped by URL slug.
 * Supports primary slugs and legacy/plural aliases seamlessly.
 */
export const CASE_STUDIES = Object.freeze({
  "abode-services": abodeServices,
  "abode-home-services": abodeServices,
  "be-balanced-bodywork": beBalanced,
  "be-balanced-bodyworks": beBalanced,
  "cape-coral-lawn-care": capeCoralLawnCare,
  "cape-coral-reviewed": capeCoralReviewed,
  "coral-breeze-services": coralBreeze,
  "florida-sunshine-lawn-care": floridaSunshine,
  "glowing-results-skin-spa": glowingResults,
  "home-owner-help-options": homeOwnerHelpOptions,
  "home-owners-help-options": homeOwnerHelpOptions,
  "home-owner-pro-experts": homeOwnerProExperts,
  "jojo-java": jojoJava,
});
