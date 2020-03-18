const React = require('react');
const $ = require('jquery');

class HomeValueApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressSummary: 'request data',
      addressValues: 'request data',
    };
  }

  componentDidMount() {
    $.ajax({
      type: 'get',
      url: '/exampleHomeSummary/',
      data: { address: '8050 Eudora Corner Margarett Summit, North Justontown, Virginia, 88577' },
      success: (result) => this.setState({
        addressSummary: result.addressSummary,
        addressValues: result.addressValues,
      }),
    });
  }

  render() {
    console.log(this.state);
    return (
      // console.log('check if the content is fetched')
      <div>
        homeSummary:
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default HomeValueApp;
