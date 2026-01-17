export type Portal = "user" | "expert" | "organisation" | "admin";

/**
 * Domain → portal mapping
 * This is the SINGLE source of truth.
 */
export const DOMAIN_PORTAL_MAP: Record<string, Portal> = {
  "digitaloffices.com.au": "user",
  "experts.digitaloffices.com.au": "expert",
  "organisations.digitaloffices.com.au": "organisation",
  "admin.digitaloffices.com.au": "admin",
};
