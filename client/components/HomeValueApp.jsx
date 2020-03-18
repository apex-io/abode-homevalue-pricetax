const React = require('react');
const $ = require('jquery');

class HomeValueApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeSummary: 'request home summary',
    };
  }

  componentDidMount() {
    $.ajax({
      type: 'get',
      url: '/homeSummary/',
      success: (result) => this.setState({
        homeSummary: result,
      }),
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        homeSummary:
        {this.state.homeSummary[0].address}
      </div>
    );
  }
}

export default HomeValueApp;
