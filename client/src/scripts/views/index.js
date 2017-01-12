import React, { Component } from 'react';
// import cx from 'classnames';
import { Button, notification, message, Modal } from 'antd';
import Ajax from '../helpers/ajax'

class Index extends Component {
	constructor() {
		super();
		this.state = {
			events: [],
			next: null,
			previous: null
		}
	}
	componentDidMount() {
		this.handleAjax()
	}
	handleAjax = (next, previous, e) => {
		let ajax = new Ajax('agent')
		console.log("'event!'", e)
		console.log("current location", this.state.next, this.state.previous)
		ajax.fetch('issues', next, previous)
			.then((data) => {
				message.success('Fetch complete.')
				console.log("success!", data)
				this.setState({
					events: data.body,
					next: data.next,
					previous: data.previous
				});
			})
			.catch((err) => {
				message.error('Fetch failed.')
				console.log("err..", err.type, err.message, err.stack)
			})
	}
	render() {
		return (
			<div className="main">
				<h1>Hello world.</h1>
				<Button onClick={this.handleAjax.bind(this, null, null)}>Request</Button>
				<Button onClick={this.handleAjax.bind(this, this.state.next, null)}>Next</Button>
				<Button onClick={this.handleAjax.bind(this, null, this.state.previous)}>Previous</Button>
				<ul>
					{this.state.events.map((evt, index) => {
						return (
							<li key={evt.title+'-'+index}>
								<h1><span>{evt.events.length} : {evt.title}</span></h1>
									{evt.events.map((e, i) => {
										return <h3 key={"e"+i}>Event {i} : {e.parsedData.url}</h3>
									})}
							</li>
						);
					})}
				</ul>
			</div>
		)
	}
}

export default Index
