export const INCIDENT_TYPES = [
  { value: 'phishing', label: 'Phishing' },
  { value: 'account-compromise', label: 'Account Compromise' },
  { value: 'fraud-scam', label: 'Fraud or Scam' },
  { value: 'malware-ransomware', label: 'Malware or Ransomware' },
  { value: 'harassment-stalking', label: 'Harassment or Stalking' },
  { value: 'data-breach', label: 'Data Breach' },
  { value: 'ddos', label: 'DDoS' },
  { value: 'crypto-scam', label: 'Crypto Scam' },
  { value: 'other', label: 'Other' },
] as const;

export const SAFETY_TIPS_BY_INCIDENT_TYPE: Record<string, string[]> = {
  'phishing': [
    'Do not click any links or download attachments from the suspicious message',
    'Change passwords on all accounts using a secure device',
    'Enable two-factor authentication (2FA) on all accounts',
    'Take screenshots of the phishing attempt',
    'Report the phishing email to your email provider',
    'Check your accounts for unauthorized activity',
  ],
  'account-compromise': [
    'Immediately change passwords on the compromised account',
    'Enable two-factor authentication (2FA) if not already active',
    'Review recent account activity and transactions',
    'Revoke access to third-party apps connected to your account',
    'Contact the service provider to report the compromise',
    'Alert your contacts if the account was used to send messages',
  ],
  'fraud-scam': [
    'Stop all communication with the suspected scammer',
    'Do not send any money or provide additional information',
    'Contact your bank immediately if you shared financial details',
    'Document all communications and transactions',
    'Change passwords if you shared login credentials',
    'Report the scam to your local authorities',
  ],
  'malware-ransomware': [
    'Disconnect your device from the internet and network immediately',
    'Do NOT pay the ransom - it does not guarantee file recovery',
    'Power off the infected device to prevent further encryption',
    'Contact IT support or a cybersecurity professional',
    'Isolate backup drives to prevent infection spread',
    'Take photos of any ransom messages displayed',
  ],
  'harassment-stalking': [
    'Ensure your physical safety - move to a safe location if needed',
    'Block the harasser on all platforms',
    'Do not engage or respond to the harasser',
    'Document all incidents with screenshots and timestamps',
    'Review and strengthen your privacy settings on all accounts',
    'Contact local law enforcement if you feel threatened',
  ],
  'data-breach': [
    'Change passwords for the affected service immediately',
    'Enable two-factor authentication on all accounts',
    'Monitor your financial accounts for suspicious activity',
    'Consider placing a fraud alert on your credit reports',
    'Watch for phishing attempts using your leaked data',
    'Document what data was potentially compromised',
  ],
  'ddos': [
    'Contact your hosting provider or IT team immediately',
    'Enable DDoS protection services if available',
    'Document the attack timeline and traffic patterns',
    'Do not attempt to handle the attack alone',
    'Backup critical data if not already done',
    'Consider switching to DDoS-resistant infrastructure',
  ],
  'crypto-scam': [
    'Stop all transactions immediately',
    'Do not send any more cryptocurrency',
    'Contact the exchange or wallet provider',
    'Document wallet addresses and transaction IDs',
    'Report to cryptocurrency fraud authorities',
    'Alert others in the crypto community about the scam',
  ],
  'other': [
    'Disconnect your device from the internet if compromised',
    'Change your passwords on a different, secure device',
    'Enable two-factor authentication (2FA) on all accounts',
    'Contact your bank if financial information is involved',
    'Document everything - take screenshots and keep records',
    'Do not delete anything - preserve evidence',
  ],
};

// Legacy export for backwards compatibility
export const IMMEDIATE_SAFETY_TIPS = SAFETY_TIPS_BY_INCIDENT_TYPE['other'];

export const FILE_TYPES = {
  SCREENSHOTS: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  DOCUMENTS: ['application/pdf'],
  EMAILS: ['.eml', 'message/rfc822'],
  LOGS: ['.log', 'text/plain'],
} as const;

