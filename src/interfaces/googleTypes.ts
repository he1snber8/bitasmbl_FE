export interface GoogleUserResponse {
  email: string;
  family_name: string;
  given_name: string;
  hd: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface GoogleOAuthResponse {
  access_token: string | null;
  authuser?: string;
  expires_in: number;
  hd: string | undefined;
  prompt: string;
  scope: string;
  token_type: string;
}
