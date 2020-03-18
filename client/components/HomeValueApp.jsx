const React = require('react');
const $ = require('jquery');

class HomeValueApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressSummary: 'request data',
      addressValues: 'request data',
      similarAddresses: 'requet data',
    };
  }

  componentDidMount() {
    $.ajax({
      type: 'get',
      url: '/exampleHomeSummary/',
      data: {
        address: '167 Rozella Villages Parker Highway, Lake Lavonneborough, Illinois, 36019',
        zipCode: 36019,
      },
      success: (result) => this.setState({
        addressSummary: result.addressSummary,
        addressValues: result.addressValues,
        similarAddresses: result.similarAddresses,
      }),
    });
  }

  render() {
    console.log(this.state);
    let bestimate = 0;
    let bestimateRangeLow = this.state.addressSummary.currentestimatedvalue;
    let bestimateRangeHigh = this.state.addressSummary.currentestimatedvalue;
    for (let i = 0; i < this.state.similarAddresses.length; i += 1) {
      bestimate += this.state.similarAddresses[i].currentestimatedvalue;
      if (this.state.similarAddresses[i].currentestimatedvalue < bestimateRangeLow) {
        bestimateRangeLow = this.state.similarAddresses[i].currentestimatedvalue;
      }
      if (this.state.similarAddresses[i].currentestimatedvalue > bestimateRangeHigh) {
        bestimateRangeHigh = this.state.similarAddresses[i].currentestimatedvalue;
      }
    }
    bestimate /= this.state.similarAddresses.length;
    return (
      // console.log('check if the content is fetched')
      <div>
        <h1>Home value</h1>
        <div>Bestimate</div>
        <div>${bestimate}</div>
        <div>Bestimate sale range</div>
        <div>${bestimateRangeLow} - ${bestimateRangeHigh}</div>
        {/* add the below portion into a test >> */}
        homeSummary:
        {JSON.stringify(this.state.similarAddresses)}
        {/* << */}
      </div>
    );
  }
}

export default HomeValueApp;
