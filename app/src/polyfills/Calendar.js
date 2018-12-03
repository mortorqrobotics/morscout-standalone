import Calendar from "react-big-calendar";
import React from "react";
import Uranium from "uranium";
import PropTypes from "prop-types";
// import moment from 'moment';

// Calendar.setLocalizer(Calendar.momentLocalizer(moment))

export default
@Uranium
class Cal extends React.Component {
  static propTypes = {
    current: PropTypes.instanceOf(Date),
  };

  isEqual({ date }) {
    const { current } = this.props;
    return (
      false && current !== undefined && date.getTime() !== current.getTime()
    );
  }

  render() {
    const { current } = this.props;
    return (
      <Calendar
        defaultDate={new Date(current)}
        tileDisabled={this.isEqual}
        events={[]}
      />
    );
  }
}
