import React, { Component } from 'react';

export default class Containter extends Component {

	constructor () {
		super();

		this._data = {
			day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		}
		this.dateArr = [];
	}

	componentWillMount () {
		// 一切数据的起源
		// 所以切换月份或者年的时候都可以在这设置 mock 数据
		let today = new Date(),
		month = today.getMonth(),
		year = today.getFullYear(),
		firstday = new Date(year, month, 1),
		firstday_day = firstday.getDay(),
		daysOfMonth = this._data.month[month - 1];
		if( ( (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ) && month === 2) {
			daysOfMonth = 29;
		}

		// 判断月份天数，确定需要多少行来展示
		if (firstday_day === 6 && ( (daysOfMonth !== 29) || (daysOfMonth !== 28) ) ){
			this._setDateArr(this._getDate(firstday, -firstday_day), 6);
		} else if (firstday_day >= 5 && daysOfMonth === 31) {
			this._setDateArr(this._getDate(firstday, -firstday_day), 6);
		} else if (firstday_day === 7 && daysOfMonth === 28 ) {
			this._setDateArr(firstday, 4);
		} else {
			this._setDateArr(firstday, 5);
		}
	}

	_getDate (date, d) {
		let timeStamp = date - 0,
		rt = new Date(timeStamp + d * 86400000);
		return rt;
	}

	_setDateArr (firstday, arrNum) {
		let d = 0;
		for(let i = 0; i < arrNum; i++) {
			this.dateArr[i] = [];
			for (let j = 0; j < 7; j++) {
				this.dateArr[i].push(this._getDate(firstday, d));
				d++;
			}
		}
	}

	render () {
		console.log(this.dateArr);
		let dateArr = [], dates = [], d = 0;

		for(let i = 0; i < this.dateArr.length; i++) {
			dates[i] = [];
			for (let j = 0; j < 7; j++) {
				dates[i].push(
					<td key={ d }>{ this.dateArr[i][j].getDate() }</td>
				);
				d++;
			}
			dateArr.push(
				<tr key={ 'tr_'+ i }>{ dates[i] }</tr>
			);
		}

		return (
			<div>
				<table>
					<tbody>
						<tr>
							<td>Sun</td>
							<td>Mon</td>
							<td>Tue</td>
							<td>Wed</td>
							<td>Thur</td>
							<td>Fri</td>
							<td>Sat</td>
						</tr>
						{ dateArr }
					</tbody>
				</table>
			</div>
		)
	}
}