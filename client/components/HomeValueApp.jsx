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
      showEstimateModels: { visibility: 'collapse' },
    };
    this.onClickHandler = this.onClickHandler.bind(this);
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

  // test onclick targetting the right 'this'
  onClickHandler(event) {
    if (this.state.showEstimateModels.visibility === 'collapse') {
      this.setState({ showEstimateModels: { visibility: 'visible' } });
    } else if (this.state.showEstimateModels.visibility === 'visible') {
      this.setState({ showEstimateModels: { visibility: 'collapse' } });
    }
    event.preventDefault();
  }

  render() {
    if (this.state.hasData) {
      // console.log(this.state);
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
            <div className={'module-name'}>Home value</div>
            <div>Bestimate</div>
            <div>${bestimate}</div>
            <div>Bestimate sale range: ${bestimateRangeLow} - ${bestimateRangeHigh}</div>
          </div>
          <button onClick={this.onClickHandler}>Show more estimated models</button>
          <div style={this.state.showEstimateModels}>
            <div>Bestimate models</div>
            <div>The Bestimate uses a set of data models to estimate this home's value.</div>
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
