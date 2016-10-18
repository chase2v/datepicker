import React, { Component } from 'react';

export default class Container extends Component {

	constructor () {
		super();

		this._data = {
			// day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		}
		this.state = {
			month: 0,
			year: 0
		}
		this.dateArr = [];
		this.month = 0;
		this.year = 0;
	}


	/**
	 * 初始化数据
	 */
	_init() {
		// 一切数据的起源
		// 所以切换月份或者年的时候都可以在这设置 mock 数据
		let today = new Date(),
		month = today.getMonth() + this.state.month;
		this.year = today.getFullYear() + this.state.year; // 设置展示的年份
		let firstday = new Date(this.year, month, 1),
		firstday_day = firstday.getDay(),
		daysOfMonth = this._data.month[month];
		// 设置展示的月份
		if (month % 12 === 0)
			this.month = 1;
		else
			this.month = month % 12 + 1; 

		if( ( (this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0) ) && month === 2) {
			daysOfMonth = 29;
		}

		// 判断月份天数，确定需要多少行来展示
		if (firstday_day === 6 && ( (daysOfMonth !== 29) || (daysOfMonth !== 28) ) ){
			this._setDateArr(this._getDate(firstday, -firstday_day), 6);
		} else if (firstday_day >= 5 && daysOfMonth === 31) {
			this._setDateArr(this._getDate(firstday, -firstday_day), 6);
		} else if (firstday_day === 7 && daysOfMonth === 28 ) {
			this._setDateArr(this._getDate(firstday, -firstday_day), 4);
		} else {
			this._setDateArr(this._getDate(firstday, -firstday_day), 5);
		}
	}

	/**
	 * 获取日期，根据偏移量
	 * @param  date : 日期
	 * @param  d : 偏移量
	 */
	_getDate (date, d) {
		let timeStamp = date - 0,
		rt = new Date(timeStamp + d * 86400000);
		return rt;
	}

	/**
	 * 设置展示的数据数组
	 * @param firstday : 展示视图的第一天
	 * @param arrNum  : 展示视图的行数
	 */
	_setDateArr (firstday, arrNum) {
		console.log(firstday, arrNum);
		let d = 0;
		this.dateArr = [];
		for(let i = 0; i < arrNum; i++) {
			this.dateArr[i] = [];
			for (let j = 0; j < 7; j++) {
				this.dateArr[i].push(this._getDate(firstday, d));
				d++;
			}
		}
	}

	/**
	 * 切换月份
	 * @param  i : 月份偏移量
	 */
	switchMonth (i) {
		if(this.month === 12 && i === 1) {
			this.setState({
				month: this.state.month + i,
				year: this.state.year + 1
			});	
		} else if (this.month === 1&& i === -1) {
			this.setState({
				month: this.state.month + i,
				year: this.state.year - 1
			});
		} else {
			this.setState({
				month: this.state.month + i
			});
		}
	}

	/**
	 * 切换年份
	 * @param  i : 年份偏移量
	 */
	switchYear (i) {
		this.setState({
			year: this.state.year + i
		});
	}

	render () {
		this._init();
		// console.log(this.dateArr);
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
			<div className="container">
				<div className="button-group">
					<div onClick={ ()=>this.switchYear(-1) }><i className="iconfont icon-d-left"></i></div>
					<div onClick={ ()=>this.switchMonth(-1) }><i className="iconfont icon-left"></i></div>
					{ this.month + ' / ' + this.year }
					<div onClick={ ()=>this.switchMonth(1) }><i className="iconfont icon-right"></i></div>
					<div onClick={ ()=>this.switchYear(1) }><i className="iconfont icon-d-right"></i></div>
				</div>
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