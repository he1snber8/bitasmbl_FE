import { useAuthProviderContext } from "../context/ProviderContext";
import { useStandardUserContext } from "../context/StandardUserContext";
import { useGithubUserContext, useGoogleUserContext } from "../app/hooks";

export function useCurrentUser() {
  const { provider } = useAuthProviderContext();
  const { userData: standardUser } = useStandardUserContext();
  const { userData: googleUser } = useGoogleUserContext();
  const { userData: githubUser } = useGithubUserContext();
  //   if (setProvider) {
  //     setProvider("standard");
  //   }

  console.log("provider in auth:", provider);

  switch (provider) {
    case "google":
      return googleUser;

    case "github":
      return githubUser;
    case "standard":
      return standardUser;

    default:
      return null;
  }
}
