import React from 'react';

import { isDefaultProfileImage } from '../../../utils/user';
import { useWizard, Wizard } from '../../common';
import { useCoreUser, useEnvironment, useOptions } from '../../contexts';
import { localizationKeys } from '../../customizables';
import { ContentPage, Form, FormButtons, SuccessPage, useCardState, withCardStateProvider } from '../../elements';
import { handleError, useFormControl } from '../../utils';
import { UserProfileAvatarUploader } from './UserProfileAvatarUploader';
import { UserProfileBreadcrumbs } from './UserProfileNavbar';

export const ProfilePage = withCardStateProvider(() => {
  const title = localizationKeys('userProfile.profilePage.title');
  const card = useCardState();
  const user = useCoreUser();
  const [avatarChanged, setAvatarChanged] = React.useState(false);
  const { first_name, last_name } = useEnvironment().userSettings.attributes;
  const showFirstName = first_name.enabled;
  const showLastName = last_name.enabled;
  const userFirstName = user.firstName || '';
  const userLastName = user.lastName || '';
  const { experimental_enableClerkImages } = useOptions();

  const wizard = useWizard({ onNextStep: () => card.setError(undefined) });

  const firstNameField = useFormControl('firstName', user.firstName || '', {
    type: 'text',
    label: localizationKeys('formFieldLabel__firstName'),
    placeholder: localizationKeys('formFieldInputPlaceholder__firstName'),
  });
  const lastNameField = useFormControl('lastName', user.lastName || '', {
    type: 'text',
    label: localizationKeys('formFieldLabel__lastName'),
    placeholder: localizationKeys('formFieldInputPlaceholder__lastName'),
  });

  const userInfoChanged =
    (showFirstName && firstNameField.value !== userFirstName) || (showLastName && lastNameField.value !== userLastName);
  const optionalFieldsChanged = userInfoChanged || avatarChanged;

  const hasRequiredFields = (showFirstName && first_name.required) || (showLastName && last_name.required);
  const requiredFieldsFilled =
    hasRequiredFields && !!lastNameField.value && !!firstNameField.value && optionalFieldsChanged;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    return (
      userInfoChanged
        ? user.update({ firstName: firstNameField.value, lastName: lastNameField.value })
        : Promise.resolve()
    )
      .then(() => {
        wizard.nextStep();
      })
      .catch(err => {
        handleError(err, [firstNameField, lastNameField], card.setError);
      });
  };

  const uploadAvatar = (file: File) => {
    return user
      .setProfileImage({ file })
      .then(() => {
        setAvatarChanged(true);
        card.setIdle();
      })
      .catch(err => handleError(err, [], card.setError));
  };

  const onAvatarRemove = () => {
    void user
      .setProfileImage({ file: null })
      .then(() => {
        setAvatarChanged(true);
        card.setIdle();
      })
      .catch(err => handleError(err, [], card.setError));
  };

  return (
    <Wizard {...wizard.props}>
      <ContentPage
        headerTitle={title}
        Breadcrumbs={UserProfileBreadcrumbs}
      >
        <Form.Root onSubmit={onSubmit}>
          <UserProfileAvatarUploader
            user={user}
            onAvatarChange={uploadAvatar}
            onAvatarRemove={
              !isDefaultProfileImage(experimental_enableClerkImages ? user.experimental_imageUrl : user.profileImageUrl)
                ? onAvatarRemove
                : null
            }
          />
          {showFirstName && (
            <Form.ControlRow elementId={firstNameField.id}>
              <Form.Control
                autoFocus
                {...firstNameField.props}
                required={first_name.required}
              />
            </Form.ControlRow>
          )}
          {showLastName && (
            <Form.ControlRow elementId={lastNameField.id}>
              <Form.Control
                {...lastNameField.props}
                required={last_name.required}
              />
            </Form.ControlRow>
          )}
          <FormButtons isDisabled={hasRequiredFields ? !requiredFieldsFilled : !optionalFieldsChanged} />
        </Form.Root>
      </ContentPage>
      <SuccessPage
        title={title}
        text={localizationKeys('userProfile.profilePage.successMessage')}
        Breadcrumbs={UserProfileBreadcrumbs}
      />
    </Wizard>
  );
});
