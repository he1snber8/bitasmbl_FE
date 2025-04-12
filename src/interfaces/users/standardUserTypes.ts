import { BaseUser } from "./baseUserType";

export interface StandardUser extends BaseUser {
  provider: "standard";
}
