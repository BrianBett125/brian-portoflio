import GithubProvider from "next-auth/providers/github";

const hasGithubEnv = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);

export const authOptions = {
  providers: hasGithubEnv
    ? [
        GithubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string,
        }),
      ]
    : [],
  trustHost: true,
};
