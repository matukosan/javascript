import type { LocalizationResource } from '@clerk/types';

const commonTexts = {
  signIn: {
    phoneCode: {
      title: 'Controlla il tuo telefono',
      subtitle: 'per accedera a {{applicationName}}',
      formTitle: 'Codice di verifica',
      formSubtitle: 'Inserisci il codice di verifica inviato al tuo numero di telefono',
      resendButton: 'Rinvia il codice',
    },
  },
} as const;

export const itIT: LocalizationResource = {
  socialButtonsBlockButton: 'Continua con {{provider|titleize}}',
  dividerText: 'oppure',
  formFieldLabel__emailAddress: 'Indirizzo email',
  formFieldLabel__emailAddresses: 'Indirizzi email',
  formFieldLabel__phoneNumber: 'Numero di telefono',
  formFieldLabel__username: 'Nome utente',
  formFieldLabel__emailAddress_phoneNumber: 'Indirizzo email o numero di telefono',
  formFieldLabel__emailAddress_username: 'Indirizzo email o nome utente',
  formFieldLabel__phoneNumber_username: 'numero di telefono o nome utente',
  formFieldLabel__emailAddress_phoneNumber_username: 'Indirizzo email, numero di telefono o nome utente',
  formFieldLabel__password: 'Password',
  formFieldLabel__currentPassword: 'Password corrente',
  formFieldLabel__newPassword: 'Nuova password',
  formFieldLabel__confirmPassword: 'Conferma password',
  formFieldLabel__signOutOfOtherSessions: 'Disconnetti tutti gli altri dispositivi',
  formFieldLabel__firstName: 'Nome',
  formFieldLabel__lastName: 'Cognome',
  formFieldLabel__backupCode: 'Codice di backup',
  formFieldLabel__organizationName: 'Nome organizzazione',
  formFieldLabel__role: 'Ruolo',
  formFieldInputPlaceholder__emailAddress: '',
  formFieldInputPlaceholder__emailAddresses:
    'Inserisci o incolla uno o piú indirizzi email, separati da spazi o virgole',
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
  formFieldAction__forgotPassword: 'Password dimenticata',
  formFieldHintText__optional: 'Opzionale',
  formButtonPrimary: 'Continua',
  signInEnterPasswordTitle: 'Inserisci la tua password',
  backButton: 'Indietro',
  footerActionLink__useAnotherMethod: 'Utilizzo un altro metodo',
  badge__primary: 'Primario',
  badge__thisDevice: 'Questo dispositivo',
  badge__userDevice: 'Dispositivo utente',
  badge__otherImpersonatorDevice: 'Altro dispositivo impersonato',
  badge__default: 'Predefinito',
  badge__unverified: 'Non verificato',
  badge__requiresAction: 'Richiede azione',
  badge__you: 'Tu',
  footerPageLink__help: 'Aiuto',
  footerPageLink__privacy: 'Privacy',
  footerPageLink__terms: 'Termini',
  paginationButton__previous: 'Precedente',
  paginationButton__next: 'Prossimo',
  paginationRowText__displaying: 'Visualizzando',
  paginationRowText__of: 'di',
  membershipRole__admin: 'Amministratore',
  membershipRole__basicMember: 'Utente',
  membershipRole__guestMember: 'Ospite',
  signUp: {
    start: {
      title: 'Crea il tuo account',
      subtitle: 'per continuare su {{applicationName}}',
      actionText: 'Hai giá un account?',
      actionLink: 'Accedi',
    },
    emailLink: {
      title: 'Verifica la tua email',
      subtitle: 'per continuare su {{applicationName}}',
      formTitle: 'Link di verifica',
      formSubtitle: 'Usa il link di verifica inviato al tuo indirizzo email',
      resendButton: 'Rinvia link',
      verified: {
        title: 'Registrato con successo',
      },
      loading: {
        title: 'Registrando...',
      },
      verifiedSwitchTab: {
        title: 'Email verificata con successo',
        subtitle: 'Ritorna alla nuova tab aperta per continuare',
        subtitleNewTab: 'Ritorna alla tab precedente per continuare',
      },
    },
    emailCode: {
      title: 'Verifica la tua email',
      subtitle: 'per continuare su {{applicationName}}',
      formTitle: 'Codice di verifica',
      formSubtitle: 'Inserisci il codice di verifica inviato alla tua email',
      resendButton: 'Rinvia codice',
    },
    phoneCode: {
      title: 'Verifica il tuo numero di telefono',
      subtitle: 'per continuare su {{applicationName}}',
      formTitle: 'Codice di verifica',
      formSubtitle: 'Inserisci il codice di verifica inviato al tuo numero di telefono',
      resendButton: 'Rinvia codice',
    },
    continue: {
      title: 'Compila i campi mancanti',
      subtitle: 'per continuare su {{applicationName}}',
      actionText: 'Hai un account?',
      actionLink: 'Accedi',
    },
  },
  signIn: {
    start: {
      title: 'Accedi',
      subtitle: 'per continuare su {{applicationName}}',
      actionText: 'Non hai un account?',
      actionLink: 'Registrati',
    },
    password: {
      title: 'Inserisci la tua password',
      subtitle: 'per continuare su {{applicationName}}',
      actionLink: 'Usa un altro metodo',
    },
    emailCode: {
      title: 'Controlla la tua email',
      subtitle: 'per continuare su {{applicationName}}',
      formTitle: 'Codice di verifica',
      formSubtitle: 'Inserisci il codice di verifica inviato al tuo indirizzo email',
      resendButton: 'Rinvia codice',
    },
    emailLink: {
      title: 'Controlla la tua email',
      subtitle: 'per continuare su {{applicationName}}',
      formTitle: 'Link di verifica',
      formSubtitle: 'Usa il link di verifica inviato al tuo indirizzo email',
      resendButton: 'Rinvia link',
      unusedTab: {
        title: 'Puoi chiudere questa scheda',
      },
      verified: {
        title: 'Accesso avvenuto con successo',
        subtitle: 'Verrai presto rediretto',
      },
      verifiedSwitchTab: {
        subtitle: 'Ritorna alla scheda originaria per continuare',
        titleNewTab: "Accedi da un'altra scheda",
        subtitleNewTab: 'Ritorna sulla nuova scheda aperta per continuare',
      },
      loading: {
        title: 'Accesso in corso...',
        subtitle: 'Verrai presto rediretto',
      },
      failed: {
        title: 'Quest link di verifica non é valido',
        subtitle: 'Ritorna alla scheda originaria per continuare',
      },
      expired: {
        title: 'This verification link has expired',
        subtitle: 'Ritorna alla scheda originaria per continuare',
      },
    },
    phoneCode: { ...commonTexts.signIn.phoneCode },
    phoneCodeMfa: { ...commonTexts.signIn.phoneCode, subtitle: '' },
    totpMfa: {
      title: 'Verifica in due passaggi',
      subtitle: '',
      formTitle: 'Codice di verifica',
      formSubtitle: 'Inserisci il codice di verifica generato dalla tua app di autenticazione',
    },
    backupCodeMfa: {
      title: 'Inserisci un codice di backup',
      subtitle: 'per continuare su {{applicationName}}',
      formTitle: '',
      formSubtitle: '',
    },
    alternativeMethods: {
      title: 'Usa un altro metodo',
      actionLink: 'Richiedi aiuto',
      blockButton__emailLink: 'Invia link a {{identifier}}',
      blockButton__emailCode: 'Invia codice a {{identifier}}',
      blockButton__phoneCode: 'Invia codice a {{identifier}}',
      blockButton__password: 'Accedi con la tua password',
      blockButton__totp: 'Usa la tua app di autenticazione',
      blockButton__backupCode: 'Usa in codice di backup',
      getHelp: {
        title: 'Richiedi aiuto',
        content: `Se stai incontrando delle difficoltá ad accedere al tuo account, inviaci una email e ti aiuteremo a ripristinare il tuo account il prima possibile.`,
        blockButton__emailSupport: 'Supporto email',
      },
    },
    noAvailableMethods: {
      title: 'Impossibile accedere',
      subtitle: 'Si é verificato un errore',
      message: "Impossibile procedere con l'accesso. Non ci sono strumenti di autenticazione disponibili.",
    },
  },
  userProfile: {
    mobileButton__menu: 'Menu',
    formButtonPrimary__continue: 'Continua',
    formButtonPrimary__finish: 'Concludi',
    formButtonReset: 'Cancella',
    start: {
      headerTitle__account: 'Account',
      headerTitle__security: 'Sicurezza',
      headerSubtitle__account: 'Gestisci le informazioni del tuo account',
      headerSubtitle__security: 'Gestisci le tue preferenze di sicurezza',
      profileSection: {
        title: 'Profilo',
      },
      usernameSection: {
        title: 'Username',
        primaryButton__changeUsername: 'Cambia username',
        primaryButton__setUsername: 'Imposta username',
      },
      emailAddressesSection: {
        title: 'Indirizzi email',
        primaryButton: 'Aggiungi un indirizzo email',
        detailsTitle__primary: 'Indirizzo email principale',
        detailsSubtitle__primary: 'Questo indirizzo email é quello principale',
        detailsAction__primary: 'Completa la verifica',
        detailsTitle__nonPrimary: 'Imposta come indirizzo email principale',
        detailsSubtitle__nonPrimary:
          'Imposta come indirizzo email principale per ricevere le comunicazioni riguardanti il tuo account.',
        detailsAction__nonPrimary: 'Imposta come principale',
        detailsTitle__unverified: 'Indirizzo email non verificato',
        detailsSubtitle__unverified:
          'Questo indirizzo email non é stato verificato e potrebbe essere limitato per funzionalitá',
        detailsAction__unverified: 'Completa la verifica',
        destructiveActionTitle: 'Rimuovi',
        destructiveActionSubtitle: 'Elimina questo indirizzo email e rimuovi dal mio account',
        destructiveAction: 'Rimuovi indirizzo email',
      },
      phoneNumbersSection: {
        title: 'Numeri di telefono',
        primaryButton: 'Aggiungi un numero di telefono',
        detailsTitle__primary: 'Numero di telefono principale',
        detailsSubtitle__primary: 'Questo numero di telefono é quello principale',
        detailsAction__primary: 'Completa la verifica',
        detailsTitle__nonPrimary: 'Imposta come numero di telefono principale',
        detailsSubtitle__nonPrimary:
          'Imposta come numero di telefono principale per ricevere le comunicazioni riguardanti il tuo account.',
        detailsAction__nonPrimary: 'Imposta come principale',
        detailsTitle__unverified: 'Numero di telefono non verificato',
        detailsSubtitle__unverified:
          'Questo numero di telefono non é stato verificato e potrebbe essere limitato per funzionalitá',
        detailsAction__unverified: 'Completa la verifica',
        destructiveActionTitle: 'Rimuovi',
        destructiveActionSubtitle: 'Elimina questo numero di telefono e rimuovi dal mio account',
        destructiveAction: 'Rimuovi numero di telefono',
      },
      connectedAccountsSection: {
        title: 'Account collegati',
        primaryButton: 'Collega account',
        title__conectionFailed: 'Riprova la connessione fallita',
        title__connectionFailed: 'Riprova la connessione fallita',
        actionLabel__conectionFailed: 'Riprova',
        actionLabel__connectionFailed: 'Riprova',
        destructiveActionTitle: 'Rimuovi',
        destructiveActionSubtitle: 'Rimuovi questo account collegato dal tuo account',
        destructiveActionAccordionSubtitle: 'Rimuovi account collegato',
      },
      passwordSection: {
        title: 'Password',
        primaryButton__changePassword: 'Cambia password',
        primaryButton__setPassword: 'Imposta password',
        primaryButton__removePassword: '',
      },
      mfaSection: {
        title: 'Verifica in 2 passaggi',
        primaryButton: 'Aggiungi verifica in 2 passaggi',
        phoneCode: {
          destructiveActionTitle: 'Rimuovi',
          destructiveActionSubtitle: 'Rimuovi questo numero di telefono dai metodi di verifica in 2 passaggi',
          destructiveActionLabel: 'Rimuovi numero di telefono',
          title__default: 'Predefinito',
          title__setDefault: 'Imposta come predefinito',
          subtitle__default:
            "Questo metodo verrá utilizzato come predefinito per l'accesso con verifica in 2 passaggi.",
          subtitle__setDefault: 'Imposta questo metodo come predefinito per la verifica in 2 passaggi.',
          actionLabel__setDefault: 'Imposta come predefinito',
        },
        backupCodes: {
          headerTitle: 'Codice di backup',
          title__regenerate: 'Rigenera codici di backup',
          subtitle__regenerate:
            'Ottieni una nuova lista di codici di sicurezza di backup. I codici di sicurezza di backup precedentemente generati saranno eliminati e non saranno utilizzabili.',
          actionLabel__regenerate: 'Rigenera codici',
        },
        totp: {
          headerTitle: 'Applicazione di autenticazione',
          title: 'Predefinito',
          subtitle: "Questo metodo sará utilizzato come predefinito per l'accesso con verifica in 2 passaggi.",
          destructiveActionTitle: 'Rimuovi',
          destructiveActionSubtitle: "Rimuovi l'app di autenticazione dai metodi per la verifica in 2 passaggi",
          destructiveActionLabel: "Rimuovi l'app di autenticazione",
        },
      },
      activeDevicesSection: {
        title: 'Dispositivi attivi',
        primaryButton: 'Dispositivi attivi',
        detailsTitle: 'Dispositivo corrente',
        detailsSubtitle: 'Questo é il dispositivo che stai attualmente utilizzando',
        destructiveActionTitle: 'Disconnetti',
        destructiveActionSubtitle: 'Disconnetti il tuo account dal dispositivo',
        destructiveAction: 'Disconnetti dal dispositivo',
      },
      web3WalletsSection: {
        title: 'Web3 wallets',
        primaryButton: 'Web3 wallets',
        destructiveActionTitle: 'Rimuovi',
        destructiveActionSubtitle: 'Rimuovi questo web3 wallet dal tuo account',
        destructiveAction: 'Rimuovi wallet',
      },
    },
    profilePage: {
      title: 'Aggiorna profilo',
      imageFormTitle: 'Immagine di profilo',
      imageFormSubtitle: 'Carica immagine',
      imageFormDestructiveActionSubtitle: 'Rimuovi immagine',
      fileDropAreaTitle: 'Trascina un file qui, oppure...',
      fileDropAreaAction: 'Selezione un file',
      fileDropAreaHint: 'Carica una immagine piú piccola di 10MB di tipo JPG, PNG, GIF, oppure WEBP',
      successMessage: 'Il tuo profile é stato aggiornato.',
    },
    usernamePage: {
      title: 'Aggiorna username',
      successMessage: 'Il tuo username é stato aggiornato.',
    },
    emailAddressPage: {
      title: 'Aggiungi un indirizzo email',
      emailCode: {
        formHint: 'Una email contenente un codice di verifica é stata inviata a questo indirizzo email.',
        formTitle: 'Codice di verifica',
        formSubtitle: 'Inserisci il codice di verifica inviato a {{identifier}}',
        resendButton: 'Rinvia codice',
        successMessage: "L'indirizzo email {{identifier}} é stato aggiunto al tuo account.",
      },
      emailLink: {
        formHint: 'Una email contenente un link di verifica sará inviata a questo indirizzo email.',
        formTitle: 'Link di verifica',
        formSubtitle: 'Clicca sul link di verifica nella email inviata a {{identifier}}',
        resendButton: 'Rinvia link',
        successMessage: "L'indirizzo email {{identifier}} é stato aggiunto al tuo account.",
      },
      removeResource: {
        title: 'Rimuovi indirizzo email',
        messageLine1: '{{identifier}} sará rimosso dal tuo account.',
        messageLine2: 'Non sarai piú in grado di accedere utilizzando questo indirizzo email.',
        successMessage: '{{emailAddress}} é stato rimosso dal tuo account.',
      },
    },
    phoneNumberPage: {
      title: 'Aggiungi numero di telefono',
      successMessage: '{{identifier}} é stato aggiunto al tuo account.',
      infoText: 'Un SMS contenente un link di verifica é stato inviato a questo numero di telefono.',
      infoText__secondary: 'Potrebbero essere applicati dei costi.',
      removeResource: {
        title: 'Rimuovi numero di telefono',
        messageLine1: '{{identifier}} sará rimosso dal tuo account.',
        messageLine2: 'Non sarai piú in grado di accedere utilizzando questo numero di telefono.',
        successMessage: '{{phoneNumber}} é stato rimosso dal tuo account.',
      },
    },
    connectedAccountPage: {
      title: 'Aggiungi account collegato',
      formHint: 'Seleziona un provider per collegare il tuo account.',
      formHint__noAccounts: 'Non ci sono provider esterni disponibili.',
      socialButtonsBlockButton: 'Collega {{provider|titleize}} account',
      successMessage: 'Il provider é stato aggiunto al tuo account',
      removeResource: {
        title: 'Rimuovi account collegato',
        messageLine1: '{{identifier}} sará rimosso dal tuo account.',
        messageLine2:
          'Non sarai piú in grado di accedere utilizzando questo account e le funzionalitá collegate smetteranno di funzionare.',
        successMessage: '{{connectedAccount}} é stato rimosso dal tuo account.',
      },
    },
    web3WalletPage: {
      title: 'Aggiungi web3 wallet',
      subtitle__availableWallets: 'Seleziona un web3 wallet da collegare al tuo account.',
      subtitle__unavailableWallets: 'Non ci sono web3 wallets disponibili.',
      successMessage: 'Il wallet é stato aggiunto al tuo account.',
      removeResource: {
        title: 'Rimuovi web3 wallet',
        messageLine1: '{{identifier}} sará rimosso dal tuo account.',
        messageLine2: 'Non sarai piú in grado di accedere utilizzando questo web3 wallet.',
        successMessage: '{{web3Wallet}} é stato rimosso dal tuo account.',
      },
    },
    passwordPage: {
      title: 'Imposta password',
      removePasswordTitle: '',
      changePasswordTitle: 'Cambia password',
      successMessage: 'La tua password é stata impostata.',
      removePasswordSuccessMessage: '',
      changePasswordSuccessMessage: 'La tua password è stata aggiornata.',
      sessionsSignedOutSuccessMessage: 'Tutti gli altri dispositivi sono stati disconnessi.',
    },
    mfaPage: {
      title: 'Aggiungi verifica in 2 passaggi',
      formHint: 'Seleziona un metodo da aggiungere.',
    },
    mfaTOTPPage: {
      title: 'Aggiungi app di autenticazione',
      verifyTitle: 'Codice di verifica',
      verifySubtitle: 'Inserisci il codice di verifica generato dalla tua app di autenticazione',
      successMessage:
        "Verifica in 2 passaggi attivata. All'accesso sará richiesto di inserire un codice di verifica generato dall'app di autenticazione come ulteriore passaggio.",
      authenticatorApp: {
        infoText__ableToScan:
          'Aggiungi un nuovo metodo di accesso nella tua app di autenticazione e scansione il seguente codice QR per associarla a questo account.',
        infoText__unableToScan:
          'Aggiungi un nuovo metodo di accesso nella tua app di autenticazione ed aggiungi la chiave di sicurezza generata sotto.',
        inputLabel__unableToScan1:
          'Assicurarsi che le password Time-based oppure One-time siano abilitate, poi continua il collegamento al tuo account.',
        inputLabel__unableToScan2:
          "Alternativamente, se il tuo autenticatore supporta TOTP URIs, puoi anche copiare l'intera URI.",
        buttonAbleToScan__nonPrimary: 'Scansiona il codice QR',
        buttonUnableToScan__nonPrimary: 'Non é possibile scansionare il codice QR?',
      },
      removeResource: {
        title: 'Rimuovi verifica in 2 passaggi',
        messageLine1: "I codici di verifica di questo autenticatore non saranno piú richiesti all'accesso.",
        messageLine2: 'Il tuo account potrebbe essere non sicuro. Sei sicuro di voler continuare?',
        successMessage: 'La verifica in 2 passaggi tramite autenticatore é stata rimossa.',
      },
    },
    mfaPhoneCodePage: {
      title: 'Aggiungi verifica tramite SMS',
      primaryButton__addPhoneNumber: 'Aggiungi un numero di telefono',
      subtitle__availablePhoneNumbers:
        'Seleziona un numero di telefono da registrare per la verifica in 2 passaggi tramite SMS.',
      subtitle__unavailablePhoneNumbers:
        'Non ci sono numeri di telefono da registrare per la verifica in 2 passaggi tramite SMS.',
      successMessage:
        "La verifica in 2 passaggi tramite SMS é stata abilitata per questo numero di telefono. All'accesso sará richiesto di inserire un codice di verifica ricevuto tramite SMS come ulteriore passaggio.",
      removeResource: {
        title: 'Rimuovi verifica in 2 passsaggi',
        messageLine1: "{{identifier}} non riceverá piú i codici di verifica all'accesso.",
        messageLine2: 'Il tuo account potrebbe essere non sicuro. Sei sicuro di voler continuare?',
        successMessage: 'La verifica in 2 passaggi tramite SMS é stata rimossa per {{mfaPhoneCode}}',
      },
    },
    backupCodePage: {
      title: 'Aggiungi verifica codici backup',
      title__codelist: 'Codici di backup',
      subtitle__codelist: 'Salvali in maniera sicura e tienili segreti.',
      infoText1: 'I codici di backup saranno abilitati per questo account.',
      infoText2:
        'Tieni segreti i codici di backup e salvali in maniera sicura. Potrai generare altri codici di backup se pensi che possano essere compromessi.',
      successSubtitle:
        'Puoi ora utilizzare questi codici di backup per accedere al tuo account, nel caso di perdita del proprio strumento di autenticazione.',
      successMessage:
        'I codici di backup sono ora abilitati. Puoi ora utilizzare questi codici di backup per accedere al tuo account, nel caso di perdita del proprio strumento di autenticazione. Ogni codice potrá essere utilizzato una sola volta.',
      actionLabel__copy: 'Copia tutti',
      actionLabel__copied: 'Copiati!',
      actionLabel__download: 'Scarica .txt',
      actionLabel__print: 'Stampa',
    },
  },
  userButton: {
    action__manageAccount: 'Gestisci account',
    action__signOut: 'Disconnetti',
    action__signOutAll: 'Disconnetti da tutti gli accounts',
    action__addAccount: 'Aggiungi account',
  },
  organizationSwitcher: {
    personalWorkspace: 'Spazio di lavoro personale',
    notSelected: 'Nessuna organizzazione selezionata',
    action__createOrganization: 'Crea Organizzazione',
    action__manageOrganization: 'Gestisci Organizzazione',
  },
  impersonationFab: {
    title: 'Accesso tramite {{identifier}}',
    action__signOut: 'Disconnetti',
  },
  organizationProfile: {
    start: {
      headerTitle__members: 'Membri',
      headerTitle__settings: 'Impostazioni',
      headerSubtitle__members: "Consulta e gestisci i membri dell'organizzazione",
      headerSubtitle__settings: "Gestisci le impostazioni dell'organizzazione",
    },
    profilePage: {
      title: "Profilo dell'organizzazione",
      subtitle: 'Gestisci profilo organizzazione',
      successMessage: "L'organizzazione é stata aggiornata.",
      dangerSection: {
        title: 'Pericolo',
        leaveOrganization: {
          title: 'Lascia organizzazione',
          messageLine1:
            'Sei sicuro di voler lasciare questa organizzazione? Perderai accesso a questa organizzazione e le sue applicazioni.',
          messageLine2: 'Questa azione é permanente ed irreversibile.',
          successMessage: "Hai lasciato l'organizzazione.",
        },
      },
    },
    invitePage: {
      title: 'Invita membri',
      subtitle: 'Invita un nuovo membro in questa organizzazione',
      successMessage: 'Invito inviato con successo',
      detailsTitle__inviteFailed: "L'invito non puó essere inviato. Correggi i seguenti e riprova:",
      formButtonPrimary__continue: 'Invia inviti',
    },
    membersPage: {
      detailsTitle__emptyRow: 'Nessun membro da visualizzare',
      action__invite: 'Invita',
      start: {
        headerTitle__active: 'Attivo',
        headerTitle__invited: 'Invitato',
      },
      activeMembersTab: {
        tableHeader__user: 'Utente',
        tableHeader__joined: 'Iscritto',
        tableHeader__role: 'Ruolo',
        tableHeader__actions: '',
        menuAction__remove: 'Rimuovi membro',
      },
      invitedMembersTab: {
        tableHeader__invited: 'Invitato',
        menuAction__revoke: 'Revoca invito',
      },
    },
  },
  createOrganization: {
    title: 'Crea organizzazione',
    formButtonSubmit: 'Crea organizzazione',
    subtitle: "Imposta il profile dell'organizzazione",
    invitePage: {
      formButtonReset: 'Salta',
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
    passwordComplexity: {
      sentencePrefix: '',
      minimumLength: '',
      maximumLength: '',
      requireNumbers: '',
      requireLowercase: '',
      requireUppercase: '',
      requireSpecialCharacter: '',
    },
  },
  dates: {
    previous6Days: "{{ date | weekday('it-IT','long') }} alle {{ date | timeString('it-IT') }}",
    lastDay: "Ieri alle {{ date | timeString('it-IT') }}",
    sameDay: "Oggi alle {{ date | timeString('it-IT') }}",
    nextDay: "Domani alle {{ date | timeString('it-IT') }}",
    next6Days: "{{ date | weekday('it-IT','long') }} alle {{ date | timeString('it-IT') }}",
    numeric: "{{ date | numeric('it-IT') }}",
  },
} as const;
