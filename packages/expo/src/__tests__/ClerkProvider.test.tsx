import { render } from '@clerk/shared/testUtils';
import React from 'react';

import { ClerkProvider } from '../ClerkProvider';

jest.mock('react-native-url-polyfill/auto', () => ({}));

describe('<ClerkProvider />', () => {
  it('renders', () => {
    const provider = render(
      <ClerkProvider
        standardBrowser={false}
        publishableKey='pk_test_bmF0aW9uYWwtY293LTE0LmNsZXJrLmFjY291bnRzLmRldiQ'
      >
        <div></div>
      </ClerkProvider>,
    );
    expect(provider).toBeDefined();
  });
});
