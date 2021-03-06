import React, { Component } from 'react';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile({ info }) {
	return (
		<PlayerPreview 
			avatar={info.avatar_url}
			username={info.login}>
			<ul className="space-list-items">
				{info.name && <li>{info.name}</li>}
				{info.location && <li>{info.location}</li>}
				{info.company && <li>{info.company}</li>}
				<li>Followers: {info.followers}</li>
				<li>Following: {info.following}</li>
				<li>Public Repos: {info.public_repos}</li>
				{info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
			</ul>
		</PlayerPreview>
	)
}

Profile.propTypes = {
	info: PropTypes.object.isRequired
}

function Player({ label, score, profile }) {
	return (
		<div>
			<h1 className="header">{label}</h1>
			<h3 className="score">Score: {score}</h3>
			<Profile info={profile} />
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Results extends Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	async componentDidMount() {
		const players = queryString.parse(this.props.location.search);
		
		try {
			const results = await battle([
				players.playerOneName, 
				players.playerTwoName
			]);

			if(results === null) {
				return this.setState(() => {
					return {
						error: 'Looks like there was an error. Check that both user exist on Github',
						loading: false,
					}
				});
			}

			this.setState(() => {
				return {
					error: null,
					winner: results[0],
					loser: results[1],
					loading: false
				}
			});
		} catch(error) {
			console.warn('There was an error getting the results: ', error);
		}
	}

	render() {
		const { error, winner, loser, loading } = this.state;

		if(loading) {
			return <Loading />
		}

		if(error) {
			return (
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (	
			<div className='row'>
				<Player
					label='Winner'
					score={winner.score}
					profile={winner.profile} 
				/>
				<Player
					label='Loser'
					score={loser.score}
					profile={loser.profile} 
				/>
			</div>
		)
	}
}

export default Results