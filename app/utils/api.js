import axios from 'axios';

async function getProfile(username) {
	try {
		const user = await axios.get(`https://api.github.com/users/${username}`)
		return user.data;
	} catch(error) {
		handleError(error);
	}
}

function getRepos(username) {
	return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
}

function getStarCount(repos) {
	return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
	const followers = profile.followers;
	const totalStars = getStarCount(repos);

	return (followers * 3) + totalStars;
}

function handleError(error) {
	console.warn(error);
	return null;
}

async function getUserData(player) {
	try {
		const [profile, repos] = await Promise.all([
				getProfile(player),
				getRepos(player)
			]);

		return {
			profile,
			score: calculateScore(profile, repos)
		}
	} catch(error) {
		handleError(error);
	}
}

function sortPlayers(players) {
	return players.sort((a, b) => b.score - a.score);
}

export async function battle (usernames) {
	try {
		const players = await Promise.all(usernames.map(getUserData));
		return sortPlayers(players);
	} catch(error) {
		handleError(error);
	}
}

export async function fetchPopularRepos(language) {
	const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
	try {
		const response = await axios.get(encodedURI);
		return response.data.items;
	} catch(error) {
		handleError(error);
	}
}