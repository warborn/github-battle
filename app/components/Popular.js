import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from'./Loading';

function SelectLanguage({ selectedLanguage, onSelected }) {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className='languages'>
			{languages.map(lang => {
				return (
					<li style={lang === selectedLanguage ? {color: '#d0021b'} : null}
							key={lang}
					    onClick={onSelected.bind(null, lang)}>
						{lang}
					</li>
				)
			})}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelected: PropTypes.func.isRequired
}

function RepoGrid({ repos }) {
	return (
		<ul className='popular-list'>
			{repos.map((repo, index) => {
				return (
					<li key={repo.name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img 
									className='avatar'
									src={repo.owner.avatar_url}
									alt={`Avatar for ${repo.owner.login}`} />
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} starts</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		}

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	async updateLanguage(lang) {
		this.setState(() => {
			return {
				selectedLanguage: lang,
				repos: null
			}
		})

		try {
			const repos = await fetchPopularRepos(lang);
			this.setState(() => ({ repos }) );
		} catch(error) {
			console.warn('Error getting popular repositories: ', error);
		}
	}

	render() {
		const { repos } = this.state;
		return(
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelected={this.updateLanguage}/>
					{!repos
						? <Loading />
						: <RepoGrid repos={repos} />}
			</div>
		)
	}
}

export default Popular