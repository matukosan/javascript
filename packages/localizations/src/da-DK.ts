import type { LocalizationResource } from '@clerk/types';

const commonTexts = {
  signIn: {
    phoneCode: {
      title: 'Tjek din telefon',
      subtitle: 'gå videre til {{applicationName}}',
      formTitle: 'Bekræftelseskode',
      formSubtitle: 'Indtast bekræftelseskoden sendt til dit telefonnummer',
      resendButton: 'Send kode igen',
    },
  },
} as const;

export const daDK: LocalizationResource = {
  socialButtonsBlockButton: 'Forsæt med {{provider|titleize}}',
  dividerText: 'eller',
  formFieldLabel__emailAddress: 'E-mailadresse',
  formFieldLabel__emailAddresses: 'E-mailadresser',
  formFieldLabel__phoneNumber: 'Telefonnummer',
  formFieldLabel__username: 'Brugernavn',
  formFieldLabel__emailAddress_phoneNumber: 'E-mailadresse eller telefonnummer',
  formFieldLabel__emailAddress_username: 'E-mailadresse eller brugernavn',
  formFieldLabel__phoneNumber_username: 'telefonnummer eller brugernavn',
  formFieldLabel__emailAddress_phoneNumber_username: 'E-mailadresse, telefonnummer eller brugernavn',
  formFieldLabel__password: 'Adgangskode',
  formFieldLabel__currentPassword: 'Nuværende adgangskode',
  formFieldLabel__newPassword: 'Ny adgangskode',
  formFieldLabel__confirmPassword: 'Bekræft adgangskode',
  formFieldLabel__signOutOfOtherSessions: 'Log ud af alle andre enheder',
  formFieldLabel__firstName: 'Fornavn',
  formFieldLabel__lastName: 'Efternavn',
  formFieldLabel__backupCode: 'Sikkerhedskode',
  formFieldLabel__organizationName: 'Organisationens navn',
  formFieldLabel__organizationSlug: 'Slug URL',
  formFieldLabel__role: 'Rolle',
  formFieldInputPlaceholder__emailAddress: '',
  formFieldInputPlaceholder__emailAddresses:
    'Indtast eller indsæt en eller flere e-mailadresser, adskilt af mellemrum eller kommaer',
  formFieldInputPlaceholder__phoneNumber: '',
  formFieldInputPlaceholder__username: '',
  formFieldInputPlaceholder__emailAddress_phoneNumber: '',
  formFieldInputPlaceholder__emailAddress_username: '',
  formFieldInputPlaceholder__phoneNumber_username: '',
  formFieldInputPlaceholder__emailAddress_phoneNumber_username: '',
  formFieldInputPlaceholder__password: '',
  formFieldInputPlaceholder__firstName: '',
  formFieldInputPlaceholder__lastName: '',
  formFieldInputPlaceholder__backupCode: '',
  formFieldInputPlaceholder__organizationName: '',
  formFieldInputPlaceholder__organizationSlug: '',
  formFieldAction__forgotPassword: 'Glemt adgangskode',
  formFieldHintText__optional: 'Valgfri',
  formButtonPrimary: 'Fortsæt',
  signInEnterPasswordTitle: 'Indtast din adgangskode',
  backButton: 'Tilbage',
  footerActionLink__useAnotherMethod: 'Brug en anden metode',
  badge__primary: 'Primær',
  badge__thisDevice: 'Denne enhed',
  badge__userDevice: 'Bruger enhed',
  badge__otherImpersonatorDevice: '',
  badge__default: 'Standard',
  badge__unverified: 'Ikke verificeret',
  badge__requiresAction: 'Kræver handling',
  badge__you: 'Dig',
  footerPageLink__help: 'Hjælp',
  footerPageLink__privacy: 'Privatliv',
  footerPageLink__terms: 'Vilkår',
  paginationButton__previous: 'Forrige',
  paginationButton__next: 'Næste',
  paginationRowText__displaying: 'Viser',
  paginationRowText__of: 'af',
  membershipRole__admin: 'Administrator',
  membershipRole__basicMember: 'Medlem',
  membershipRole__guestMember: 'Gæst',
  signUp: {
    start: {
      title: 'Opret din konto',
      subtitle: 'Forsæt til {{applicationName}}',
      actionText: 'Har du en konto?',
      actionLink: 'Log ind',
    },
    emailLink: {
      title: 'Bekræft din email',
      subtitle: 'Forsæt til {{applicationName}}',
      formTitle: 'Bekræftelseslink',
      formSubtitle: 'Brug bekræftelseslinket sendt til din e-mailadresse',
      resendButton: 'Send link igen',
      verified: {
        title: 'Vellykket tilmelding',
      },
      loading: {
        title: 'Tilmelder...',
      },
      verifiedSwitchTab: {
        title: 'E-mail er bekræftet',
        subtitle: 'Vend tilbage til den nyligt åbnede fane for at fortsætte',
        subtitleNewTab: 'Vend tilbage til forrige fane for at fortsætte',
      },
    },
    emailCode: {
      title: 'Bekræft din email',
      subtitle: 'Fortsæt til {{applicationName}}',
      formTitle: 'Bekræftelseskode',
      formSubtitle: 'Indtast bekræftelseskoden sendt til din e-mailadresse',
      resendButton: 'Send kode igen',
    },
    phoneCode: {
      title: 'Bekræft din telefon',
      subtitle: 'Fortsæt til {{applicationName}}',
      formTitle: 'Bekræftelseskode',
      formSubtitle: 'Indtast bekræftelseskoden sendt til dit telefonnummer',
      resendButton: 'Send kode igen',
    },
    continue: {
      title: 'Udfyld manglende felter',
      subtitle: 'Forsæt til {{applicationName}}',
      actionText: 'Har du en konto?',
      actionLink: 'Log ind',
    },
  },
  signIn: {
    start: {
      title: 'Log ind',
      subtitle: 'Forsæt til {{applicationName}}',
      actionText: 'Ingen konto?',
      actionLink: 'Tilmeld dig',
      actionLink__use_email: 'Brug email',
      actionLink__use_phone: 'Brug telefon',
      actionLink__use_username: 'Brug brugenravn',
      actionLink__use_email_username: 'Brug email eller brugernavn',
    },
    password: {
      title: 'Indtast din adgangskode',
      subtitle: 'Fortsæt til {{applicationName}}',
      actionLink: 'Brug en anden metode',
    },
    emailCode: {
      title: 'Tjek din email',
      subtitle: 'Fortsæt til {{applicationName}}',
      formTitle: 'Bekræftelseskode',
      formSubtitle: 'Indtast bekræftelseskoden sendt til din e-mailadresse',
      resendButton: 'Send kode igen',
    },
    emailLink: {
      title: 'Tjek din email',
      subtitle: 'Fortsæt til {{applicationName}}',
      formTitle: 'Bekræftelseslink',
      formSubtitle: 'Brug bekræftelseslinket sendt til din e-mail',
      resendButton: 'Send link igen',
      unusedTab: {
        title: 'Du kan lukke denne fane',
      },
      verified: {
        title: 'Vellykket log ind forsøg',
        subtitle: 'Du vil snart blive viderestillet',
      },
      verifiedSwitchTab: {
        subtitle: 'Vend tilbage til den oprindelige fane for at fortsætte',
        titleNewTab: 'Logget ind på anden fane',
        subtitleNewTab: 'Vend tilbage til den nyligt åbnede fane for at fortsætte',
      },
      loading: {
        title: 'Logger ind...',
        subtitle: 'Du vil snart blive viderestillet',
      },
      failed: {
        title: 'Dette bekræftelseslink er ugyldigt',
        subtitle: 'Vend tilbage til den oprindelige fane for at fortsætte.',
      },
      expired: {
        title: 'Dette bekræftelseslink er udløbet',
        subtitle: 'Vend tilbage til den oprindelige fane for at fortsætte.',
      },
    },
    phoneCode: { ...commonTexts.signIn.phoneCode },
    phoneCodeMfa: { ...commonTexts.signIn.phoneCode, subtitle: '' },
    totpMfa: {
      title: 'Totrinsbekræftelse',
      subtitle: '',
      formTitle: 'Bekræftelseskode',
      formSubtitle: 'Indtast den bekræftelseskode, der er genereret af din godkendelsesapp',
    },
    backupCodeMfa: {
      title: 'Indtast en backup-kode',
      subtitle: 'Forsæt til {{applicationName}}',
      formTitle: '',
      formSubtitle: '',
    },
    alternativeMethods: {
      title: 'Brug en anden metode',
      actionLink: 'Få hjælp',
      blockButton__emailLink: 'Send link til {{identifier}}',
      blockButton__emailCode: 'Send kode til {{identifier}}',
      blockButton__phoneCode: 'Send kode til {{identifier}}',
      blockButton__password: 'Log ind med din adgangskode',
      blockButton__totp: 'Brug din godkendelsesapp',
      blockButton__backupCode: 'Brug en backup-kode',
      getHelp: {
        title: 'Få hjælp',
        content: `Hvis du har problemer med at logge ind på din konto, skal du sende en e-mail til os, og vi vil samarbejde med dig om at genoprette adgang så hurtigt som muligt.`,
        blockButton__emailSupport: 'E-mail support',
      },
    },
    noAvailableMethods: {
      title: 'Kan ikke logge ind',
      subtitle: 'En fejl opstod',
      message: "Kan ikke fortsætte med login. Der er ingen tilgængelig godkendelsesfaktor.",
    },
  },
  userProfile: {
    mobileButton__menu: 'Menu',
    formButtonPrimary__continue: 'Fortsæt',
    formButtonPrimary__finish: 'Afslut',
    formButtonReset: 'Annuller',
    start: {
      headerTitle__account: 'Konto',
      headerTitle__security: 'Sikkerhed',
      headerSubtitle__account: 'Administrere dine kontooplysninger',
      headerSubtitle__security: 'Administrere dine sikkerhedspræferencer',
      profileSection: {
        title: 'Profil',
      },
      usernameSection: {
        title: 'Brugernavn',
        primaryButton__changeUsername: 'Skift brugernavn',
        primaryButton__setUsername: 'Sæt brugernavn',
      },
      emailAddressesSection: {
        title: 'E-mailadresser',
        primaryButton: 'Tilføj en e-mailadresse',
        detailsTitle__primary: 'Primær e-mailadresse',
        detailsSubtitle__primary: 'Denne e-mailadresse er den primære e-mailadresse',
        detailsAction__primary: 'Færdiggøre bekræftelse',
        detailsTitle__nonPrimary: 'Angiv som primær e-mailadresse',
        detailsSubtitle__nonPrimary:
          'Indstil denne e-mailadresse som den primære til at modtage kommunikation vedrørende din konto.',
        detailsAction__nonPrimary: 'Sæt som primær',
        detailsTitle__unverified: 'Ubekræftet e-mailadresse',
        detailsSubtitle__unverified: 'Denne e-mailadresse er ikke blevet bekræftet, og kan være begrænset i funktionalitet',
        detailsAction__unverified: 'Færdiggøre bekræftelse',
        destructiveActionTitle: 'Fjern',
        destructiveActionSubtitle: 'Slet denne e-mailadresse og fjern den fra din konto',
        destructiveAction: 'Fjern e-mailadresse',
      },
      phoneNumbersSection: {
        title: 'Telefonnumre',
        primaryButton: 'Tilføj et telefonnummer',
        detailsTitle__primary: 'Primære telefonnummer',
        detailsSubtitle__primary: 'Dette telefonnummer er det primære telefonnummer',
        detailsAction__primary: 'Færdiggøre bekræftelse',
        detailsTitle__nonPrimary: 'Sæt som primært telefonnummer',
        detailsSubtitle__nonPrimary:
          'Indstil dette telefonnummer som det primære til at modtage kommunikation vedrørende din konto.',
        detailsAction__nonPrimary: 'Sæt som primær',
        detailsTitle__unverified: 'Ubekræftet telefonnummer',
        detailsSubtitle__unverified: 'Dette telefonnummer er ikke blevet bekræftet, og kan være begrænset i funktionalitet',
        detailsAction__unverified: 'Færdiggøre bekræftelse',
        destructiveActionTitle: 'Fjern',
        destructiveActionSubtitle: 'Slet dette telefonnummer og fjern det fra din konto',
        destructiveAction: 'Fjern telefonnummer',
      },
      connectedAccountsSection: {
        title: 'Tilknyttede konti',
        primaryButton: 'Tilknyt konto',
        title__conectionFailed: 'Forsøg mislykkedes',
        title__connectionFailed: 'Andet forsøg mislykkedes',
        title__reauthorize: 'Godkendelse mangler',
        subtitle__reauthorize:
          'De påkrævede omfang er blevet opdateret, og du oplever muligvis begrænset funktionalitet. Godkend denne applikation igen for at undgå problemer',
        actionLabel__conectionFailed: 'Prøv igen',
        actionLabel__connectionFailed: 'Prøv igen',
        actionLabel__reauthorize: 'Godkend nu',
        destructiveActionTitle: 'Fjern',
        destructiveActionSubtitle: 'Fjern denne forbundne konto fra din konto',
        destructiveActionAccordionSubtitle: 'Fjern tilsluttet konto',
      },
      passwordSection: {
        title: 'Adgangskode',
        primaryButton__changePassword: 'Skift adgangskode',
        primaryButton__setPassword: 'Indtast adgangskode',
      },
      mfaSection: {
        title: 'Totrinsbekræftelse',
        primaryButton: 'Tilføj totrinsbekræftelse',
        phoneCode: {
          destructiveActionTitle: 'Fjern',
          destructiveActionSubtitle: 'Fjern dette telefonnummer fra totrinsbekræftelse',
          destructiveActionLabel: 'Fjern telefonnummer',
          title__default: 'Standardfaktor',
          title__setDefault: 'Indstil som standardfaktor',
          subtitle__default: 'Denne faktor vil blive brugt som standard totrinsbekræftelse, når du logger ind.',
          subtitle__setDefault:
            'Indstil denne faktor som standardfaktor for at bruge den som standard totrinsbekræftelse, når du logger ind.',
          actionLabel__setDefault: 'Indstil som standard',
        },
        backupCodes: {
          headerTitle: 'Backup koder',
          title__regenerate: 'generere backup-koder',
          subtitle__regenerate:
            'Få et nyt sæt sikre backup koder. Tidligere backup koder vil blive slettet og kan ikke bruges.',
          actionLabel__regenerate: 'generere koder',
        },
        totp: {
          headerTitle: 'Autentificeringsprogram',
          title: 'Standardfaktor',
          subtitle: 'Denne faktor vil blive brugt som standard totrinsbekræftelse, når du logger ind.',
          destructiveActionTitle: 'Fjern',
          destructiveActionSubtitle: 'Fjern Autentificeringsprogram fra totrinsbekræftelse',
          destructiveActionLabel: 'Fjern autentificeringsprogram',
        },
      },
      activeDevicesSection: {
        title: 'Aktive enheder',
        primaryButton: 'Aktive enheder',
        detailsTitle: 'Nuværende enhed',
        detailsSubtitle: 'Dette er den enhed, du bruger i øjeblikket',
        destructiveActionTitle: 'Log ud',
        destructiveActionSubtitle: 'Log ud fra din konto på denne enhed',
        destructiveAction: 'Log ud af enhed',
      },
      web3WalletsSection: {
        title: 'Web3 tegnebøger',
        primaryButton: 'Web3 tegnebøger',
        destructiveActionTitle: 'Fjern',
        destructiveActionSubtitle: 'Fjern denne web3-tegnebog fra din konto',
        destructiveAction: 'Fjern tegnebog',
      },
    },
    profilePage: {
      title: 'Update profile',
      imageFormTitle: 'Profile image',
      imageFormSubtitle: 'Upload image',
      imageFormDestructiveActionSubtitle: 'Remove image',
      fileDropAreaTitle: 'Drag file here, or...',
      fileDropAreaAction: 'Select file',
      fileDropAreaHint: 'Upload a JPG, PNG, GIF, or WEBP image smaller than 10 MB',
      successMessage: 'Your profile has been updated.',
    },
    usernamePage: {
      title: 'Opdater profil',
      successMessage: 'Dit brugernavn er blevet opdateret.',
    },
    emailAddressPage: {
      title: 'Tilføj e-mailadresse',
      emailCode: {
        formHint: 'En e-mail indeholdende en bekræftelseskode vil blive sendt til denne e-mailadresse.',
        formTitle: 'Bekræftelseskode',
        formSubtitle: 'Indtast bekræftelseskoden sendt til {{identifier}}',
        resendButton: 'Send kode igen',
        successMessage: 'E-mailen {{identifier}} er blevet tilføjet til din konto.',
      },
      emailLink: {
        formHint: 'En e-mail indeholdende et bekræftelseslink vil blive sendt til denne e-mailadresse.',
        formTitle: 'Bekræftelseslink',
        formSubtitle: 'Klik på bekræftelseslinket i e-mailen sendt til {{identifier}}',
        resendButton: 'Send link igen',
        successMessage: 'E-mailen {{identifier}} er blevet tilføjet til din konto.',
      },
      removeResource: {
        title: 'Fjern e-mailadresse',
        messageLine1: '{{identifier}} vil blive fjernet fra denne konto.',
        messageLine2: 'Du vil ikke længere kunne logge ind med denne e-mailadresse.',
        successMessage: '{{emailAddress}} er blevet fjernet fra din konto.',
      },
    },
    phoneNumberPage: {
      title: 'Tilføj telefonnummer',
      successMessage: '{{identifier}} er blevet tilføjet til din konto.',
      infoText: 'En sms, der indeholder et bekræftelseslink, sendes til dette telefonnummer.',
      infoText__secondary: 'Besked- og datatakster kan være gældende.',
      removeResource: {
        title: 'Fjern telefonnummer',
        messageLine1: '{{identifier}} vil blive fjernet fra denne konto.',
        messageLine2: 'Du vil ikke længere kunne logge ind med dette telefonnummer.',
        successMessage: '{{phoneNumber}} er blevet fjernet fra din konto.',
      },
    },
    connectedAccountPage: {
      title: 'Tilføj tilsluttet konto',
      formHint: 'Vælg en udbyder for at forbinde din konto.',
      formHint__noAccounts: 'Der er ingen tilgængelige eksterne kontoudbydere.',
      socialButtonsBlockButton: 'Forbind {{provider|titleize}} konto',
      successMessage: 'Udbyderen er blevet tilføjet til din konto',
      removeResource: {
        title: 'Fjern tilsluttet konto',
        messageLine1: '{{identifier}} vil blive fjernet fra denne konto.',
        messageLine2:
          'Du vil ikke længere være i stand til at bruge denne tilsluttede konto, og eventuelle afhængige funktioner vil ikke længere virke.',
        successMessage: '{{connectedAccount}} er blevet fjernet fra din konto.',
      },
    },
    web3WalletPage: {
      title: 'Tilføj web3-tegnebog',
      subtitle__availableWallets: 'Vælg en web3-tegnebog for at oprette forbindelse til din konto.',
      subtitle__unavailableWallets: 'Der er ingen tilgængelige web3-tegnebøger.',
      successMessage: 'Tegnebogen er blevet tilføjet til din konto.',
      removeResource: {
        title: 'Fjern web3-tegnebog',
        messageLine1: '{{identifier}} vil blive fjernet fra denne konto.',
        messageLine2: 'Du vil ikke længere være i stand til at logge ind med denne web3-tegnebog.',
        successMessage: '{{web3Wallet}} er blevet fjernet fra din konto.',
      },
    },
    passwordPage: {
      title: 'Sæt adgangskode',
      changePasswordTitle: 'Skift kodeord',
      successMessage: 'Din adgangskode er blevet indstillet.',
      changePasswordSuccessMessage: 'Din adgangskode er blevet opdateret.',
      sessionsSignedOutSuccessMessage: 'Alle andre enheder er blevet logget ud.',
    },
    mfaPage: {
      title: 'Tilføj totrinsbekræftelse',
      formHint: 'Vælg en metode, der skal tilføjes.',
    },
    mfaTOTPPage: {
      title: 'Tilføj autentificeringsprogram',
      verifyTitle: 'Bekræftelseskode',
      verifySubtitle: 'Indtast bekræftelseskode, der er genereret af din autentificeringsprogram',
      successMessage:
        'Når du logger ind, skal du indtaste en bekræftelseskode fra denne autentificeringsprogram som et ekstra trin.',
      authenticatorApp: {
        infoText__ableToScan:
          'Konfigurer en ny login-metode i din autentificeringsprogram, og scan følgende QR-kode for at linke den til din konto.',
        infoText__unableToScan: 'Konfigurer en ny login-metode i din autentificering, og indtast nøglen nedenfor.',
        inputLabel__unableToScan1:
          'Sørg for, at tidsbaserede eller engangsadgangskoder er aktiveret, og slut derefter tilknytningen af din konto.',
        inputLabel__unableToScan2:
          "Alternativt, hvis din autentificeringsprogram understøtter TOTP URI'er, kan du også kopiere hele URI'en.",
        buttonAbleToScan__nonPrimary: 'Scan QR-koden i stedet',
        buttonUnableToScan__nonPrimary: 'Kan du ikke scanne QR-koden?',
      },
      removeResource: {
        title: 'Fjern totrinsbekræftelse',
        messageLine1: 'Bekræftelseskoder fra denne autentificeringsprogram kræves ikke længere, når du logger ind.',
        messageLine2: 'Din konto er muligvis ikke så sikker. Er du sikker på, at du vil fortsætte?',
        successMessage: 'Totrinsbekræftelse via autentificeringsprogram er blevet fjernet.',
      },
    },
    mfaPhoneCodePage: {
      title: 'Tilføj SMS bekræftelse',
      primaryButton__addPhoneNumber: 'Tilføj et telefonnummer',
      subtitle__availablePhoneNumbers: 'Vælg et telefonnummer for at registrere SMS bekræftelse til totrinsbekræftelse.',
      subtitle__unavailablePhoneNumbers:
        'Der er ingen tilgængelige telefonnumre til at registrere til SMS bekræftelse til totrinsbekræftelse.',
      successMessage:
        'SMS bekræftelse er nu aktiveret for dette telefonnummer. Når du logger ind, skal du indtaste en bekræftelseskode sendt til dette telefonnummer som et ekstra trin.',
      removeResource: {
        title: 'Fjern SMS bekræftelse',
        messageLine1: '{{identifier}} vil ikke længere modtage bekræftelseskoder, når du logger ind.',
        messageLine2: 'Din konto er muligvis ikke så sikker. Er du sikker på, at du vil fortsætte?',
        successMessage: 'SMS bekræftelse er blevet fjernet for {{mfaPhoneCode}}',
      },
    },
    backupCodePage: {
      title: 'Tilføj bekræftelse af backup kode',
      title__codelist: 'Backup koder',
      subtitle__codelist: 'Opbevar dem sikkert og hold dem hemmelige.',
      infoText1: 'Backup koder vil blive aktiveret for denne konto.',
      infoText2:
        'Hold backup koderne hemmelige og gem dem sikkert. Du kan genskabe backup koder, hvis du har mistanke om, at de er blevet kompromitteret.',
      successSubtitle:
        'Du kan bruge en af disse til at logge ind på din konto, hvis du mister adgangen til din totrinsbekræftelse.',
      successMessage:
        'Backup-koder er nu aktiveret. Du kan bruge en af disse til at logge ind på din konto, hvis du mister adgangen til din totrinsbekræftelse. Hver kode kan kun bruges én gang.',
      actionLabel__copy: 'Kopier alle',
      actionLabel__copied: 'Kopieret!',
      actionLabel__download: 'Download .txt',
      actionLabel__print: 'Print',
    },
  },
  userButton: {
    action__manageAccount: 'Administrer konto',
    action__signOut: 'Log ud',
    action__signOutAll: 'Log ud af alle konti',
    action__addAccount: 'Tilføj konto',
  },
  organizationSwitcher: {
    personalWorkspace: 'Personligt arbejdsområde',
    notSelected: 'Ingen organisation valgt',
    action__createOrganization: 'Opret organisation',
    action__manageOrganization: 'Administrer organisation',
  },
  impersonationFab: {
    title: 'Logget ind som {{identifier}}',
    action__signOut: 'Log ud',
  },
  organizationProfile: {
    start: {
      headerTitle__members: 'Medlemmer',
      headerTitle__settings: 'Indstillinger',
      headerSubtitle__members: 'Se og administrer organisationsmedlemmer',
      headerSubtitle__settings: 'Administrer organisationsindstillinger',
    },
    profilePage: {
      title: 'Organisationsprofil',
      subtitle: 'Administrer organisationsprofil',
      successMessage: 'Organisationen er blevet opdateret.',
      dangerSection: {
        title: 'Fare',
        leaveOrganization: {
          title: 'Forlad organisationen',
          messageLine1:
            'Er du sikker på, at du vil forlade denne organisation? Du mister adgang til denne organisation og dens applikationer.',
          messageLine2: 'Denne handling er permanent og irreversibel.',
          successMessage: 'Du har forladt organisationen.',
        },
      },
    },
    invitePage: {
      title: 'Inviter medlemmer',
      subtitle: 'Inviter nye medlemmer til denne organisation',
      successMessage: 'Invitationer blev sendt',
      detailsTitle__inviteFailed: 'Invitationerne kunne ikke sendes. Ret følgende, og prøv igen:',
      formButtonPrimary__continue: 'Send invitationer',
    },
    membersPage: {
      detailsTitle__emptyRow: 'Ingen medlemmer at vise',
      action__invite: 'Invitere',
      start: {
        headerTitle__active: 'Aktiv',
        headerTitle__invited: 'Inviteret',
      },
      activeMembersTab: {
        tableHeader__user: 'Bruger',
        tableHeader__joined: 'Sluttede sig til',
        tableHeader__role: 'Rolle',
        tableHeader__actions: '',
        menuAction__remove: 'Fjern medlem',
      },
      invitedMembersTab: {
        tableHeader__invited: 'Inviteret',
        menuAction__revoke: 'Tilbagekald invitation',
      },
    },
  },
  createOrganization: {
    title: 'Opret organisation',
    formButtonSubmit: 'Opret organisation',
    subtitle: 'Indstil organisationsprofilen',
    invitePage: {
      formButtonReset: 'Spring over',
    },
  },
  unstable__errors: {
    form_identifier_not_found: '',
    form_password_pwned: '',
    form_username_invalid_length: '',
    form_param_format_invalid: '',
    form_password_length_too_short: '',
    form_param_nil: '',
    form_code_incorrect: '',
    form_password_incorrect: '',
    not_allowed_access: '',
    form_identifier_exists: '',
  },
  dates: {
    previous6Days: "Sidst {{ date | weekday('en-US','long') }} på {{ date | timeString('en-US') }}",
    lastDay: "I går: {{ date | timeString('en-US') }}",
    sameDay: "I dag: {{ date | timeString('en-US') }}",
    nextDay: "I morgen: {{ date | timeString('en-US') }}",
    next6Days: "{{ date | weekday('en-US','long') }} på {{ date | timeString('en-US') }}",
    numeric: "{{ date | numeric('en-US') }}",
  },
} as const;
