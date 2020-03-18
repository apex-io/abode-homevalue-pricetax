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
    let Bestimate = 0;
    for (let i = 0; i < this.state.similarAddresses.length; i += 1) {
      Bestimate += this.state.similarAddresses[i].currentestimatedvalue;
    }
    Bestimate /= this.state.similarAddresses.length;
    return (
      // console.log('check if the content is fetched')
      <div>
        <h1>Home value</h1>
        <div>Bestimate</div>
        <div>{Bestimate}</div>
        homeSummary:
        {JSON.stringify(this.state.similarAddresses)}
      </div>
    );
  }
}

export default HomeValueApp;
