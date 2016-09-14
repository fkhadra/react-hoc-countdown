import React, { Component } from 'react';
import { isDateValid, extractProps } from './utils';

export default function (options) {
  return (ClientComponent) => class extends Component {

    static propTypes = {
      end(props, propName, component) {
        const prop = props[propName];
        if (! isDateValid(prop)) {
          return new Error(`The ${propName} prop you provided to ${component} is not a valid date time`);
        }
      },
      updateInterval(props, propName, component) {
        const prop = props[propName];
        if (!Number.isInteger(prop) || prop < 0) {
          return new Error(`The ${propName} prop you provided to ${component} is not a valid number >= 0.`);
        }
      }
    };

    static defaultProps = {
      updateInterval: 1000
    };

    constructor() {
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.intervalId = null;

        this.state = this.formatTime(this.props.end.getTime());
      }

    formatTime(time){
      return {
        milliseconds: time % 1000,
        seconds: Math.floor(time / 1000) % 60,
        minutes: Math.floor(time / 1000 / 60) % 60,
        hours: Math.floor(time / 3600000) % 24,
        days: Math.floor(time / 86400000)
      };
    }

    componentDidMount() {
      this.play();
    }

    componentWillUnmount(){
      this.stop();
    }

    getElapsedTime() {
      return this.props.end.getTime() - Date.now();
    }

    play(){
      this.intervalId = setInterval(this.countDown, this.props.updateInterval);
    }

    stop() {
      clearInterval(this.intervalId);
    }

    countDown() {
      let elapsedTime = this.getElapsedTime();

      if(elapsedTime <= 0){
        this.stop();
        elapsedTime = 0;
      }

      this.setState(this.formatTime(elapsedTime));
    }

    render() {
      return <ClientComponent remaining={this.state} {...extractProps(this)} />
    }
  }
}