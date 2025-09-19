namespace NodeJS {
  interface ProcessEnv {
    API_KEY?: string;
    SERVICE_DOMAIN?: string;
    NEXT_PUBLIC_GA_ID?: string | undefined;
    HUBSPOT_PORTAL_ID?: string | undefined;
    HUBSPOT_FORM_GUID?: string | undefined;
    BASIC_AUTH_USER?: string | undefined;
    BASIC_AUTH_PASSWORD?: string | undefined;
  }
}
