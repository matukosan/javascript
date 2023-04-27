import { useEffect } from 'react';

import { withRedirectToHomeSingleSessionGuard } from '../../common';
import { useCoreClerk, useSignInContext } from '../../contexts';
import { Col, descriptors, localizationKeys, Text } from '../../customizables';
import { Card, CardAlert, Header, useCardState, withCardStateProvider } from '../../elements';
import { Flex, Spinner } from '../../primitives';
import { useRouter } from '../../router';

const useSetSessionWithTimeout = () => {
  const { queryString } = useRouter();
  const { setActive } = useCoreClerk();
  const { navigateAfterSignIn } = useSignInContext();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const queryParams = new URLSearchParams(queryString);
    const createdSessionId = queryParams.get('createdSessionId');
    if (createdSessionId) {
      timeoutId = setTimeout(() => {
        void setActive({ session: createdSessionId, beforeEmit: navigateAfterSignIn });
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
};
export const _ResetPasswordSuccess = () => {
  const card = useCardState();
  useSetSessionWithTimeout();
  return (
    <Card>
      <CardAlert>{card.error}</CardAlert>
      <Header.Root>
        <Header.Title localizationKey={localizationKeys('signIn.resetPassword.title')} />
      </Header.Root>
      <Col
        elementDescriptor={descriptors.main}
        gap={8}
      >
        <Text
          localizationKey={localizationKeys('signIn.resetPassword.successMessage')}
          variant='smallRegular'
          colorScheme='inherit'
        />
        <Flex
          direction='row'
          center
        >
          <Spinner
            size='xl'
            colorScheme='primary'
          />
        </Flex>
      </Col>
    </Card>
  );
};

export const ResetPasswordSuccess = withRedirectToHomeSingleSessionGuard(withCardStateProvider(_ResetPasswordSuccess));
