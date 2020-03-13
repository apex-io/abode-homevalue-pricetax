import React from 'react';
import { shallow } from 'enzyme';

// Components
import EstimatedHistoryEntry from '../client/components/EstimateHistoryEntry.jsx';

function setup() {
  const props = {
    imgPath: 'some/image/path/to/a/mock/image',
  };
  const wrapper = shallow(<EstimatedHistoryEntry />);
  return { wrapper, props };
}

describe('describe inner 1', () => {
  console.log('describe inner 1');
  test('test 1', () => {
    console.log('test for describe inner 1');
    expect(true).toEqual(true);
  });
});
