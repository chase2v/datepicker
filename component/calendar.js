'use strict'

import React, { Component } from 'react';

export default class Calendar extends Component {

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

		this.jumpData = {
			month: 0,
			year: 0,
			isTyping: 0
		}
	}

	componentDidMount () {
		this.refs.jumpPanel.querySelectorAll('input').forEach( v => {
			v.addEventListener('keyup', function (e) {
				if (e.keyCode === 13 && this.jumpData.isTyping) {
					this.refs.jumpPanel.style.display = 'none';
					this.jumpData.isTyping = 0;
					let newState = {};
					if (this.jumpData.month) {
						newState.month =  this.state.month + this.jumpData.month - this.month;
					}
					if (this.jumpData.year) {
						newState.year =  this.state.year + this.jumpData.year - this.year;
					}
					this.setState(newState);
				}
			}.bind(this));
		});
	}

	/**
	 * 初始化数据
	 */
	_init() {
		// 一切数据的起源
		// 所以切换月份或者年的时候都可以在这设置 mock 数据
		let today = new Date(),
		month = today.getMonth() + this.state.month,
		year = today.getFullYear() + this.state.year;
		// 设置展示的月份
		if (month % 12 === 0)
			month = 0;
		else
			month = month % 12; 
		
		// 获取日历上 title 展示的月份和年份
		this.month = month + 1;
		this.year = year;

		let firstday = new Date(year, month, 1), // 获取日历上展示的当月一号的日期
		firstday_day = firstday.getDay(),
		daysOfMonth = this._data.month[month]; // 获取一个月的天数
		// 判断是否是闰月
		if( ( (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ) && month === 1) {
			daysOfMonth = 29;
		}

		// 判断月份天数，确定需要多少行来展示
		if (firstday_day === 6 && daysOfMonth >= 30){
			this._setDateArr(this._getDate(firstday, -firstday_day), 6, firstday_day, daysOfMonth);
		} else if (firstday_day >= 5 && daysOfMonth === 31) {
			this._setDateArr(this._getDate(firstday, -firstday_day), 6, firstday_day, daysOfMonth);
		} else if (firstday_day === 0 && daysOfMonth === 28 ) {
			this._setDateArr(this._getDate(firstday, -firstday_day), 4, firstday_day, daysOfMonth);
		} else {
			this._setDateArr(this._getDate(firstday, -firstday_day), 5, firstday_day, daysOfMonth);
		}
	}

	/**
	 * 获取日期，根据偏移量
	 * @param  date : 日期
	 * @param  d : 偏移量
	 */
	_getDate (date, d, isCurrentMonth, isCurrentDay) {
		let timeStamp = date - 0,
		rt = new Date(timeStamp + d * 86400000);

		// 判断是否是当天或者当月的日期
		if (isCurrentDay)
			rt.type = 2;
		else if (isCurrentMonth)
			rt.type = 1;
		return rt;
	}

	/**
	 * 设置展示的数据数组
	 * @param firstday : 展示视图的第一天
	 * @param arrNum  : 展示视图的行数
	 */
	_setDateArr (firstday, arrNum, offset, daysOfMonth) {
		// console.log(firstday, arrNum);
		// console.log(offset, daysOfMonth)
		this.dateArr = [];
		let currentDate = new Date().getDate();
		for(let i = 0; i < arrNum * 7; i++) {
			if (i === offset + currentDate - 1 && this.state.month === 0 && this.state.year === 0)
				this.dateArr.push(this._getDate(firstday, i, true, true));
			else if (i >= offset && i <= offset + daysOfMonth - 1)
				this.dateArr.push(this._getDate(firstday, i, true));
			else 
				this.dateArr.push(this._getDate(firstday, i));
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

	/**
	 * 回到当前日期
	 */
	returnTo () {
		this.setState({
			month: 0,
			year: 0
		});
	}

	/**
	 * 弹出快速跳转面板
	 */
	popJumpPanel () {
		this.refs.jumpPanel.style.display = 'block';
	}

	/**
	 * 获取跳转到的年份
	 */
	jumpToYear (event) {
		this.jumpData.year = event.target.value;
		this.jumpData.isTyping = 1;
	}
	/**
	 * 获取跳转到的月份
	 */
	jumpToMonth (event) {
		this.jumpData.month = event.target.value;
		this.jumpData.isTyping = 1;
	}

	render () {
		this._init();
		// console.log(this.dateArr);
		let datesArr = [], dates = [];
		dates[0] = [];

		for(let i = 0, j = 0; i < this.dateArr.length; i++) {
			dates[j].push(
				<td key={ i } 
					className={ this.dateArr[i].type === 2 ? 'date date-active date-current' : this.dateArr[i].type === 1? 'date date-active' : 'date' }
				>{ this.dateArr[i].getDate() }</td>
			);
			if ( (i + 1) % 7 === 0) {
				datesArr.push(
					<tr key={ 'tr_'+ i }>{ dates[j] }</tr>
				);
				j++;
				dates[j] = [];
			}
		}

		return (
			<div className="calendar">
				<div className="header-container">
					<div onClick={ ()=>this.switchYear(-1) }><i className="iconfont icon-d-left"></i></div>
					<div onClick={ ()=>this.switchMonth(-1) }><i className="iconfont icon-left"></i></div>
					<span className="title" onClick={ ()=>this.returnTo() }>{ this.year + '年' + this.month + '月' }</span>
					<div onClick={ ()=>this.switchYear(1) }><i className="iconfont icon-d-right"></i></div>
					<div onClick={ ()=>this.switchMonth(1) }><i className="iconfont icon-right"></i></div>
				</div>
				<table className="main-container">
					<thead>
						<tr>
							<td>Sun</td>
							<td>Mon</td>
							<td>Tue</td>
							<td>Wed</td>
							<td>Thur</td>
							<td>Fri</td>
							<td>Sat</td>
						</tr>
					</thead>
					<tbody>
						{ datesArr }
					</tbody>
				</table>
				<span className="jump-btn" onClick={ ()=>this.popJumpPanel() }>快速跳转</span>
				<div className="jump-panel" ref="jumpPanel">
					<div className="jump-input">
						<input onChange={ (event)=>this.jumpToYear(event) } defaultValue={ this.year } /> 年 <input onChange={ (event)=>this.jumpToMonth(event) } defaultValue={ this.month } /> 月
					</div>
				</div>
			</div>
		)
	}
}