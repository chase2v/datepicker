import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Calendar from './calendar';

export default class Container extends Component {
	render () {
		return (
			<div className="container">
				<ReactCSSTransitionGroup
					transitionName="calendar"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					<Calendar />
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}