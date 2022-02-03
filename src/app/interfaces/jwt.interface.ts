export interface JwtInterface {
  exp: Date;
  name: string;
  permissions?: string[];
}
