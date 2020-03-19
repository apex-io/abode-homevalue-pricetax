const React = require('react');

class ComparableHomeModelEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    return (
      // test if the below render
      // <div>{JSON.stringify(this.props.addressSummary)}</div>
      <div>
        <div>Address: {this.props.addressSummary.address}</div>
        <div>For sale: {this.props.addressSummary.on_market}</div>
        <div>square foot: {this.props.addressSummary.sqft}</div>
        <div>bed: {this.props.addressSummary.bed}</div>
        <div>bath: {this.props.addressSummary.bath}</div>
        <div>Estimate value: ${this.props.addressSummary.currentestimatedvalue}</div>
      </div>
    );
  }
}

export default ComparableHomeModelEntry;
