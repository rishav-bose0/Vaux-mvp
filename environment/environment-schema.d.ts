export interface EnvironmentSchema {
    production: boolean;
    envName: 'PRODUCTION' | 'DEVELOPMENT';
    baseURL: string;
}
