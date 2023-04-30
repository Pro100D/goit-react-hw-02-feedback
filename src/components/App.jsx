import { Component } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = option => {
    // if (e === 'Good') {
    //   this.setState({ good: this.state.good + 1 });
    // } else if (e === 'Neutral') {
    //   this.setState({ neutral: this.state.neutral + 1 });
    // } else if (e === 'Bad') {
    //   this.setState({ bad: this.state.bad + 1 });
    // }
    this.setState({ [option]: this.state[option] + 1 });
  };

  countTotalFeedback = () => {
    const values = Object.values(this.state);
    const valuesMap = values.reduce((acc, value) => {
      return acc + value;
    }, 0);

    return valuesMap;
  };

  countPositiveFeedbackPercentage = () => {
    if (this.countTotalFeedback() === 0) {
      return 0;
    }
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  render() {
    const total = this.countTotalFeedback();

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total !== 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}

export default App;
