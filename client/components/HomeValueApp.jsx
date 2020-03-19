const React = require('react');
const $ = require('jquery');
const ComparableHomeModel = require('./ComparableHomeModel.jsx').default;

class HomeValueApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressSummary: 'request data',
      addressValues: 'request data',
      similarAddresses: 'requet data',
      hasData: false,
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
        hasData: true,
      }),
    });
  }

  render() {
    if (this.state.hasData) {
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
          <div>
            <h1>Home value</h1>
            <div>Bestimate</div>
            <div>${bestimate}</div>
            <div>Bestimate sale range: ${bestimateRangeLow} - ${bestimateRangeHigh}</div>
          </div>
          <button>Show more Bestimate models</button>
          <div>
            <h1>Bestimate models</h1>
            <p>The Bestimate uses a set of data models to estimate this home's value.</p>
            {/* for test: show the component below rendered and if the error is at this level or at the child level */}
            <ComparableHomeModel similarAddresses={this.state.similarAddresses} />
            {/* add the below portion into a test >> */}
            {/* homeSummary:
            {JSON.stringify(this.state.similarAddresses)} */}
            {/* << */}
          </div>
        </div>
      );
    } else {
      return (<div>Hello World!</div>)
    }
  }
}

export default HomeValueApp;
