/**
 * GitHub API helper to fetch user public data.
 * Since we don't have server-side token management here, 
 * this fetcher uses public endpoints.
 */

export const getGitHubUserData = async (username: string) => {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("User not found");
        return await res.json();
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
        return null;
    }
};

export const getGitHubRepos = async (username: string) => {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        if (!res.ok) throw new Error("Repos not found");
        return await res.json();
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
};

export const extractTopLanguages = (repos: any[]) => {
    const languages: Record<string, number> = {};
    repos.forEach(repo => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });
    return Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .map(([lang]) => lang);
};
