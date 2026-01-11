import React, { useState, useEffect, useMemo } from 'react';


// ============================================================================
// NetNavi - Cyber Awareness Learning Game
// Version: 1.4 - Zone 7: Ambiguity & Advanced Judgment Edition
// ============================================================================
// Educational, defensive, and simulated only
// 7 zones, 30 missions, MITRE ATT&CK literacy integration
// Single-file React application - no external dependencies
// Automatic learning milestones + randomized answer order
// All missions reflect authentic workplace digital scenarios
// ============================================================================


const VisualRegistry = {
  // NetNavi Assistant Avatar - evolves by level
  NaviAvatar: ({ level }) => {
    const isExpressive = level <= 3;
    const isFocused = level > 3 && level <= 6;
    const isMinimal = level > 6;
    
    if (isMinimal) {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" aria-label="NetNavi Assistant">
          <circle cx="16" cy="16" r="14" fill="none" stroke="#00ffff" strokeWidth="2" opacity="0.6"/>
          <circle cx="16" cy="16" r="8" fill="none" stroke="#00ffff" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="16" cy="16" r="3" fill="#00ffff" opacity="0.9"/>
        </svg>
      );
    }
    
    if (isFocused) {
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-label="NetNavi Assistant">
          <polygon points="20,5 35,15 35,25 20,35 5,25 5,15" fill="none" stroke="#00ffff" strokeWidth="2"/>
          <circle cx="20" cy="20" r="8" fill="#00ffff" opacity="0.2"/>
          <circle cx="20" cy="20" r="4" fill="#00ffff"/>
          <circle cx="20" cy="20" r="12" fill="none" stroke="#00ffff" strokeWidth="1" opacity="0.3"/>
        </svg>
      );
    }
    
    // Expressive (beginner)
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" aria-label="NetNavi Assistant">
        <circle cx="24" cy="24" r="20" fill="#00ffff" opacity="0.1"/>
        <circle cx="24" cy="24" r="16" fill="none" stroke="#00ffff" strokeWidth="3"/>
        <circle cx="24" cy="24" r="8" fill="#00ffff" opacity="0.4"/>
        <circle cx="24" cy="24" r="4" fill="#00ffff"/>
        <circle cx="24" cy="24" r="22" fill="none" stroke="#00ffff" strokeWidth="1" opacity="0.2">
          <animate attributeName="r" from="22" to="24" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.2" to="0" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    );
  },
  
  // Risk Indicators
  SafeIndicator: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Safe Choice">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#00ff96" strokeWidth="2"/>
      <path d="M7 12 L10 15 L17 8" fill="none" stroke="#00ff96" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  RiskyIndicator: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Risky Choice">
      <path d="M12 2 L22 20 L2 20 Z" fill="none" stroke="#ffc800" strokeWidth="2"/>
      <line x1="12" y1="10" x2="12" y2="14" stroke="#ffc800" strokeWidth="2"/>
      <circle cx="12" cy="17" r="1" fill="#ffc800"/>
    </svg>
  ),
  
  UnsafeIndicator: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Unsafe Choice">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#ff6464" strokeWidth="2"/>
      <line x1="8" y1="8" x2="16" y2="16" stroke="#ff6464" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="8" x2="8" y2="16" stroke="#ff6464" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  // Upgrade Icons
  SignalAmplifier: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Signal Amplifier">
      <circle cx="20" cy="20" r="6" fill="none" stroke="#00ffff" strokeWidth="2"/>
      <circle cx="20" cy="20" r="12" fill="none" stroke="#00ffff" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="20" cy="20" r="17" fill="none" stroke="#00ffff" strokeWidth="1" opacity="0.3"/>
      <path d="M20 14 L20 26 M14 20 L26 20" stroke="#00ffff" strokeWidth="2"/>
    </svg>
  ),
  
  ThreatModel: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Threat Model Viewer">
      <rect x="5" y="5" width="30" height="30" fill="none" stroke="#00ffff" strokeWidth="2"/>
      <line x1="20" y1="5" x2="20" y2="35" stroke="#00ffff" strokeWidth="1" opacity="0.6"/>
      <line x1="5" y1="20" x2="35" y2="20" stroke="#00ffff" strokeWidth="1" opacity="0.6"/>
      <circle cx="12" cy="12" r="3" fill="#00ffff" opacity="0.8"/>
      <circle cx="28" cy="12" r="3" fill="#00ffff" opacity="0.8"/>
      <circle cx="12" cy="28" r="3" fill="#00ffff" opacity="0.8"/>
      <circle cx="28" cy="28" r="3" fill="#00ffff" opacity="0.8"/>
    </svg>
  ),
  
  KnowledgeCache: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Knowledge Cache">
      <rect x="8" y="6" width="24" height="28" fill="none" stroke="#00ffff" strokeWidth="2"/>
      <line x1="12" y1="14" x2="28" y2="14" stroke="#00ffff" strokeWidth="1.5" opacity="0.6"/>
      <line x1="12" y1="20" x2="28" y2="20" stroke="#00ffff" strokeWidth="1.5" opacity="0.6"/>
      <line x1="12" y1="26" x2="22" y2="26" stroke="#00ffff" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  ),
  
  ReasoningPath: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Reasoning Path Tracker">
      <path d="M8 20 L16 12 L24 20 L32 12" fill="none" stroke="#00ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="20" r="3" fill="#00ffff"/>
      <circle cx="16" cy="12" r="3" fill="#00ffff"/>
      <circle cx="24" cy="20" r="3" fill="#00ffff"/>
      <circle cx="32" cy="12" r="3" fill="#00ffff"/>
    </svg>
  ),
  
  ScenarioReplay: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Scenario Replay Module">
      <path d="M20 8 A12 12 0 1 1 8 20" fill="none" stroke="#00ffff" strokeWidth="2"/>
      <polygon points="8,20 4,16 4,24" fill="#00ffff"/>
      <circle cx="20" cy="20" r="4" fill="#00ffff" opacity="0.6"/>
    </svg>
  ),
  
  // HUD Elements
  ZoneIndicator: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-label="Zone">
      <rect x="2" y="2" width="16" height="16" fill="none" stroke="#00ffff" strokeWidth="1.5"/>
      <rect x="6" y="6" width="8" height="8" fill="#00ffff" opacity="0.3"/>
    </svg>
  ),
  
  LevelIndicator: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-label="Level">
      <polygon points="10,2 18,18 2,18" fill="none" stroke="#00ffff" strokeWidth="1.5"/>
      <polygon points="10,8 14,14 6,14" fill="#00ffff" opacity="0.4"/>
    </svg>
  ),
  
  XPIndicator: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-label="Experience Points">
      <circle cx="10" cy="10" r="8" fill="none" stroke="#00ffff" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="4" fill="#00ffff" opacity="0.5"/>
    </svg>
  ),
  // ATT&CK Literacy Icon
  AttackLiteracy: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-label="ATT&CK Literacy">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#00ffff" strokeWidth="2"/>
      <path d="M12 20 L20 12 L28 20 L20 28 Z" fill="none" stroke="#00ffff" strokeWidth="1.5"/>
      <circle cx="20" cy="20" r="4" fill="#00ffff" opacity="0.6"/>
    </svg>
  ),
};


// ============================================================================
// GAME DATA & CONFIGURATION
// Zones 1-6: Original foundation (preserved)
// Zone 7: Advanced ambiguity (new)
// ============================================================================


const MISSIONS = {
  // ZONE 1: Foundation - Existing missions preserved
  zone1: [
    {
      id: 'm1',
      title: 'Account Security Alert',
      description: 'You receive an email from "security@bankingsupport-verify.com" with your bank\'s branding.',
      scenario: 'Subject: Immediate Action Required - Unusual Activity Detected\n\n"Dear Valued Customer, We detected a login from an unrecognized device in Romania. Your account has been temporarily restricted. Click here to verify your identity within 24 hours or your account will be permanently suspended."',
      signals: ['Urgency language', 'Threat of account loss', 'External link', 'Generic greeting'],
      choices: [
        {
          id: 'c1',
          text: 'Reply to the email asking for more details about the suspicious activity',
          risk: 'risky',
          explanation: 'Engaging with a potential phishing email confirms your address is active. Real banks don\'t handle security issues via email replies.',
          reasoning: 'Attempting verification within potentially compromised channel',
          hiddenCues: ['Keeps you in attacker-controlled communication', 'Confirms active email address', 'Delays proper action']
        },
        {
          id: 'c2',
          text: 'Open my banking app directly and check for any security alerts or restrictions',
          risk: 'safe',
          explanation: 'You bypassed the suspicious email entirely and checked through the official app. No alerts existed—the email was a phishing attempt.',
          reasoning: 'Independent verification through known-trusted channel',
          hiddenCues: ['Used separate verified channel', 'Avoided clicking suspicious link', 'Direct access to official system']
        },
        {
          id: 'c3',
          text: 'Click the link to verify quickly before the deadline',
          risk: 'unsafe',
          explanation: 'The link leads to a fake login page designed to steal your credentials. The domain "bankingsupport-verify.com" mimics but isn\'t your bank\'s official domain.',
          reasoning: 'Urgency overriding domain verification',
          hiddenCues: ['Domain is not official bank URL', 'Deadline creates false urgency', 'Clicking without verification']
        }
      ]
    },
    {
      id: 'm2',
      title: 'Coffee Shop WiFi',
      description: 'At your regular coffee shop, you see "Brew_Guest" and "Brew_Free_5G" networks.',
      scenario: 'You need to join a video call in 10 minutes. "Brew_Free_5G" has full signal bars while the usual "Brew_Guest" shows only two bars. A handwritten sign says "Ask staff for WiFi password."',
      signals: ['Time pressure', 'Competing networks', 'Signal strength difference', 'Password mentioned'],
      choices: [
        {
          id: 'c1',
          text: 'Connect to "Brew_Free_5G" since it has stronger signal and I need reliability for the call',
          risk: 'unsafe',
          explanation: 'The stronger signal is actually a rogue access point. Attackers can intercept your video call, including any sensitive business information discussed.',
          reasoning: 'Urgency and convenience over security verification',
          hiddenCues: ['Unusually strong signal suspicious', 'Name mimics legitimate network', 'No password required is red flag']
        },
        {
          id: 'c2',
          text: 'Ask the staff which network is theirs and get the password',
          risk: 'safe',
          explanation: 'The staff confirm "Brew_Guest" is legitimate and provide the password. The stronger "Brew_Free_5G" network is unauthorized—they appreciate you alerting them.',
          reasoning: 'Verification despite time pressure',
          hiddenCues: ['Followed posted guidance', 'Verified with authority', 'Password requirement indicates security']
        },
        {
          id: 'c3',
          text: 'Use my phone\'s mobile hotspot for the call instead',
          risk: 'safe',
          explanation: 'Your cellular connection provides a secure, encrypted link. You avoided the risk entirely by using infrastructure you control.',
          reasoning: 'Risk avoidance through controlled alternative',
          hiddenCues: ['Own connection eliminates trust issue', 'Carrier-secured connection', 'No dependence on venue network']
        }
      ]
    },
    {
      id: 'm3',
      title: 'System Update Required',
      description: 'While reading news, a full-screen notification appears: "Windows Security Alert".',
      scenario: 'The notification states: "Your PC is infected with (3) viruses! Your files may be at risk. Call Microsoft Support: 1-888-555-0199 or Download Fix Now." There\'s a countdown: "Protection expires in 4:37"',
      signals: ['Full-screen interruption', 'Countdown timer', 'Phone number provided', 'Multiple threats claimed'],
      choices: [
        {
          id: 'c1',
          text: 'Click "Download Fix Now" to protect my files before time runs out',
          risk: 'unsafe',
          explanation: 'This is scareware—fake security alerts that install actual malware. Real Windows updates never appear this way or include countdown timers.',
          reasoning: 'Fear and urgency overriding judgment',
          hiddenCues: ['Countdown creates false urgency', 'Not from Windows Update system', 'Appeared during browsing, not from OS']
        },
        {
          id: 'c2',
          text: 'Call the support number to speak with a technician about the viruses',
          risk: 'unsafe',
          explanation: 'This leads to a tech support scam. They\'ll try to convince you to pay for unnecessary "fixes" or grant remote access to your computer.',
          reasoning: 'Seeking help from attacker-provided contact',
          hiddenCues: ['Microsoft doesn\'t provide support numbers in pop-ups', 'Phone number is part of the scam', 'Social engineering follow-up']
        },
        {
          id: 'c3',
          text: 'Close the browser completely and run Windows Defender from Settings',
          risk: 'safe',
          explanation: 'You recognized this as a browser-based scam, not a real system alert. Windows Defender found no threats—it was entirely fake.',
          reasoning: 'Distinguishing browser content from system alerts',
          hiddenCues: ['Browser-based, not OS-level', 'Used legitimate built-in security tool', 'Ignored fake urgency']
        }
      ]
    }
  ],
  zone2: [
    {
      id: 'm4',
      title: 'USB Drive Found',
      description: 'You find a USB drive in the parking lot labeled "Salary Info 2024".',
      scenario: 'It looks professionally labeled. Your curiosity is piqued.',
      signals: ['Unknown physical device', 'Tempting label', 'Found in accessible location'],
      choices: [
        {
          id: 'c1',
          text: 'Plug it into my computer to see whose it is',
          risk: 'unsafe',
          explanation: 'This is a classic attack vector. The drive could contain malware that auto-runs when connected.',
          reasoning: 'Curiosity without considering physical device risks',
          hiddenCues: ['Unknown origin', 'Could contain auto-run malware', 'Physical security breach']
        },
        {
          id: 'c2',
          text: 'Turn it in to security or reception',
          risk: 'safe',
          explanation: 'Perfect! Let trained personnel handle found devices. They have safe protocols for this.',
          reasoning: 'Delegating to appropriate authority with proper tools',
          hiddenCues: ['Recognized risk', 'Used proper channels', 'Protected systems']
        },
        {
          id: 'c3',
          text: 'Post about it on social media',
          risk: 'risky',
          explanation: 'This could help find the owner, but also alerts an attacker that their bait was found.',
          reasoning: 'Good intent but potential information disclosure',
          hiddenCues: ['Helpful intention', 'But reveals security awareness']
        }
      ]
    },
    {
      id: 'm5',
      title: 'Social Media Message',
      description: 'Someone claiming to be from tech support messages you on social media.',
      scenario: 'They say your account showed suspicious activity and need you to verify details.',
      signals: ['Unsolicited contact', 'Unofficial channel', 'Request for verification'],
      choices: [
        {
          id: 'c1',
          text: 'Provide my account details to help them',
          risk: 'unsafe',
          explanation: 'Real support never initiates contact this way or asks for credentials via social media.',
          reasoning: 'Misplaced trust in unverified authority',
          hiddenCues: ['Wrong communication channel', 'Unsolicited request', 'Credential request']
        },
        {
          id: 'c2',
          text: 'Ignore the message completely',
          risk: 'safe',
          explanation: 'Good! Legitimate companies use official channels. You can check your account directly if concerned.',
          reasoning: 'Recognizing inappropriate support channel',
          hiddenCues: ['Identified wrong channel', 'Maintained security posture']
        },
        {
          id: 'c3',
          text: 'Ask them to verify they work there first',
          risk: 'risky',
          explanation: 'They\'ll have convincing fake credentials. Better to contact the company through official channels yourself.',
          reasoning: 'Attempting verification, but within attacker-controlled channel',
          hiddenCues: ['Good instinct to verify', 'But wrong verification method']
        }
      ]
    },
    {
      id: 'm6',
      title: 'Urgent Request',
      description: 'Your "boss" emails asking you to buy gift cards urgently for a client.',
      scenario: 'The email looks like it\'s from their address. They say they\'re in a meeting and can\'t talk.',
      signals: ['Unusual request', 'Urgency claims', 'Gift cards', 'Communication restrictions'],
      choices: [
        {
          id: 'c1',
          text: 'Buy the gift cards right away',
          risk: 'unsafe',
          explanation: 'This is CEO fraud. Email addresses can be spoofed. Urgency is used to prevent verification.',
          reasoning: 'Obedience to authority without verification under pressure',
          hiddenCues: ['Address spoofing possible', 'Unusual payment method', 'Blocks verification attempts']
        },
        {
          id: 'c2',
          text: 'Call or text my boss to confirm',
          risk: 'safe',
          explanation: 'Excellent! You used an independent channel. Your boss confirmed they never sent this email.',
          reasoning: 'Multi-channel verification despite urgency claims',
          hiddenCues: ['Used separate channel', 'Verified before acting', 'Resisted pressure']
        },
        {
          id: 'c3',
          text: 'Reply asking why they need gift cards',
          risk: 'risky',
          explanation: 'Attackers have prepared stories. Better to verify through a different communication channel.',
          reasoning: 'Questioning within potentially compromised channel',
          hiddenCues: ['Good questioning instinct', 'But stayed in compromised channel']
        }
      ]
    }
  ],
  zone3: [
    {
      id: 'm7',
      title: 'Password Reset',
      description: 'A website you rarely use is asking you to reset your password.',
      scenario: 'The email says "We noticed unusual login attempts. Please reset your password immediately."',
      signals: ['Unexpected notification', 'Security alert', 'Immediate action request'],
      choices: [
        {
          id: 'c1',
          text: 'Click the reset link in the email',
          risk: 'risky',
          explanation: 'The email might be legitimate, but clicking links is risky. Better to go directly to the website.',
          reasoning: 'Taking direct action without independent verification',
          hiddenCues: ['Could be legitimate', 'But link could be malicious', 'Better method available']
        },
        {
          id: 'c2',
          text: 'Go to the website directly and reset there',
          risk: 'safe',
          explanation: 'Perfect! You avoided a potential phishing link and used the official site directly.',
          reasoning: 'Independent navigation to trusted destination',
          hiddenCues: ['Bypassed potential threat', 'Used known-good method', 'Maintained control']
        },
        {
          id: 'c3',
          text: 'Ignore it - I rarely use this site anyway',
          risk: 'risky',
          explanation: 'If the alert is real, your account could be compromised and used to attack others.',
          reasoning: 'Passive response to potential security event',
          hiddenCues: ['Low-use accounts still matter', 'Could affect others', 'Needed verification']
        }
      ]
    },
    {
      id: 'm8',
      title: 'Shared Document',
      description: 'A colleague shares a document link via chat: "Check out this funny thing!"',
      scenario: 'The link is shortened (bit.ly). Your colleague often shares jokes.',
      signals: ['Shortened URL', 'Casual context', 'Hidden destination', 'Trusted sender'],
      choices: [
        {
          id: 'c1',
          text: 'Click it immediately',
          risk: 'unsafe',
          explanation: 'Shortened links hide the destination. Your colleague\'s account might be compromised.',
          reasoning: 'Trusting appearance without verifying content destination',
          hiddenCues: ['Hidden destination', 'Account compromise possible', 'No verification']
        },
        {
          id: 'c2',
          text: 'Ask what it is before clicking',
          risk: 'safe',
          explanation: 'Smart! You learned it was supposed to be a PDF, but they sent a shortened link. You asked them to share properly.',
          reasoning: 'Verification before action, even with trusted contacts',
          hiddenCues: ['Verified with sender', 'Didn\'t assume safety', 'Request proper sharing']
        },
        {
          id: 'c3',
          text: 'Expand the shortened URL first to see where it goes',
          risk: 'safe',
          explanation: 'Great technique! URL expanders let you preview destinations safely.',
          reasoning: 'Using tools to reveal hidden information safely',
          hiddenCues: ['Technical verification', 'Revealed destination', 'Safe preview method']
        }
      ]
    },
    {
      id: 'm9',
      title: 'Browser Extension',
      description: 'An ad promises "Block all ads forever with this one simple extension!"',
      scenario: 'It has 4.5 stars and claims to be "Editor\'s Choice".',
      signals: ['Too good to be true', 'Rating badges', 'Broad permissions required'],
      choices: [
        {
          id: 'c1',
          text: 'Install it - I hate ads',
          risk: 'unsafe',
          explanation: 'Browser extensions can access all your web activity. Ratings can be fake. Research extensions carefully.',
          reasoning: 'Desire for convenience overriding security assessment',
          hiddenCues: ['Broad permissions', 'Unverified source', 'Access to all browsing']
        },
        {
          id: 'c2',
          text: 'Research it first - check reviews and permissions',
          risk: 'safe',
          explanation: 'Excellent! You discovered it was recently created and requests excessive permissions. Very suspicious.',
          reasoning: 'Thorough evaluation before granting system access',
          hiddenCues: ['Checked legitimacy', 'Reviewed permissions', 'Found red flags']
        },
        {
          id: 'c3',
          text: 'Use the browser\'s built-in ad blocking instead',
          risk: 'safe',
          explanation: 'Very wise! Built-in features are safer than third-party extensions and accomplish the same goal.',
          reasoning: 'Choosing first-party solutions over third-party access',
          hiddenCues: ['Trusted alternative', 'No extra permissions', 'Same functionality']
        }
      ]
    }
  ],
  
  // ZONE 4: Advanced Recognition - Account & Cloud Trust
  zone4: [
    {
      id: 'm10',
      title: 'Account Recovery Request',
      description: 'You receive a notification that someone is trying to reset your account password.',
      scenario: 'The message says "We received a password reset request from an unusual location. If this wasn\'t you, click here to secure your account." The link looks legitimate.',
      signals: ['Unexpected notification', 'Action requested', 'Sense of urgency', 'Link provided'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Attackers use fake security alerts to trick users into providing credentials or access.',
      choices: [
        {
          id: 'c1',
          text: 'Click the link to secure my account',
          risk: 'unsafe',
          explanation: 'This reverses psychology - making you think you\'re protecting yourself while actually compromising your account. Always use official channels.',
          reasoning: 'Fear-based decision without independent verification',
          hiddenCues: ['Reverse psychology tactic', 'Creates false urgency', 'Hijacks security instinct']
        },
        {
          id: 'c2',
          text: 'Go directly to the service and check account activity',
          risk: 'safe',
          explanation: 'Perfect! You bypassed the potential trap and checked through the official service. The notification was fake.',
          reasoning: 'Independent verification using trusted path',
          hiddenCues: ['Avoided suspicious link', 'Used known-safe method', 'Checked without panic']
        },
        {
          id: 'c3',
          text: 'Ignore it - probably spam',
          risk: 'risky',
          explanation: 'Could be legitimate or malicious. Better to verify through official channels to be certain.',
          reasoning: 'Passive dismissal without verification',
          hiddenCues: ['Might miss real security event', 'No verification attempted']
        }
      ]
    },
    {
      id: 'm11',
      title: 'Cloud Storage Share',
      description: 'A colleague shares a cloud folder with you titled "Q1 Performance Data".',
      scenario: 'The email says it\'s from your colleague, but you weren\'t expecting this. The cloud service is one your company uses.',
      signals: ['Unexpected share', 'Work-related title', 'Familiar platform', 'From known contact'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Compromised accounts can be used to distribute malicious content through trusted platforms.',
      choices: [
        {
          id: 'c1',
          text: 'Open the folder immediately',
          risk: 'unsafe',
          explanation: 'Your colleague\'s account may be compromised. The folder could contain malicious files or links.',
          reasoning: 'Trust in platform without verifying sender',
          hiddenCues: ['Account compromise possible', 'Platform trust isn\'t sender verification', 'No confirmation']
        },
        {
          id: 'c2',
          text: 'Message my colleague to confirm they sent it',
          risk: 'safe',
          explanation: 'Excellent! You verified with your colleague, who confirmed their account was compromised. You avoided the trap.',
          reasoning: 'Sender verification before accessing shared content',
          hiddenCues: ['Verified through separate channel', 'Didn\'t assume sender authenticity']
        },
        {
          id: 'c3',
          text: 'Check if others received it before opening',
          risk: 'risky',
          explanation: 'Group consensus isn\'t verification. If others open it, they may also be compromised.',
          reasoning: 'Seeking social validation over direct verification',
          hiddenCues: ['Indirect verification attempt', 'Relies on others\' judgment']
        }
      ]
    },
    {
      id: 'm12',
      title: 'Security Update Notification',
      description: 'Your phone shows a notification: "Critical Security Update Available - Install Now".',
      scenario: 'The notification appeared after you visited a news website. It has an "Install" button.',
      signals: ['Website-triggered notification', 'Critical label', 'Immediate action button'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Fake system notifications can trick users into installing malicious software.',
      choices: [
        {
          id: 'c1',
          text: 'Tap Install to update',
          risk: 'unsafe',
          explanation: 'This is a fake notification from a website, not your system. Real updates come through system settings.',
          reasoning: 'Trusting unexpected security prompt',
          hiddenCues: ['Website-generated, not system', 'Bypasses official update mechanism']
        },
        {
          id: 'c2',
          text: 'Dismiss and check system settings for updates',
          risk: 'safe',
          explanation: 'Perfect! Real system updates only appear in your device\'s official settings, not from websites.',
          reasoning: 'Recognizing proper update channels',
          hiddenCues: ['Distinguished website from system', 'Used official update path']
        },
        {
          id: 'c3',
          text: 'Search online to see if others got this notification',
          risk: 'risky',
          explanation: 'This wastes time and the notification may persist. Better to dismiss and check official sources.',
          reasoning: 'Research before action, but delays necessary dismissal',
          hiddenCues: ['Good verification instinct', 'But should dismiss first']
        }
      ]
    },
    {
      id: 'm13',
      title: 'App Permission Request',
      description: 'A new productivity app you installed is asking for access to your contacts, location, and files.',
      scenario: 'The app\'s description mentioned "seamless integration" but didn\'t specify what permissions it needs.',
      signals: ['Broad permissions', 'Vague justification', 'Post-install request'],
      attackTactic: 'Collection',
      tacticExplanation: 'Over-permissioned applications can collect far more data than necessary for their function.',
      choices: [
        {
          id: 'c1',
          text: 'Grant all permissions to use the app fully',
          risk: 'unsafe',
          explanation: 'These permissions are excessive for a productivity app. Only grant what\'s clearly necessary for core function.',
          reasoning: 'Accepting broad access without evaluation',
          hiddenCues: ['Excessive permissions', 'No clear justification', 'Potential data collection']
        },
        {
          id: 'c2',
          text: 'Deny permissions and see if the app still works',
          risk: 'safe',
          explanation: 'Smart! You found the app works fine without those permissions. They were unnecessary.',
          reasoning: 'Testing minimum necessary permissions',
          hiddenCues: ['Tested actual needs', 'Maintained control', 'Found permissions were excessive']
        },
        {
          id: 'c3',
          text: 'Grant some permissions but not all',
          risk: 'risky',
          explanation: 'Better than granting all, but still potentially giving unnecessary access. Test with none first.',
          reasoning: 'Partial restriction without full evaluation',
          hiddenCues: ['Compromise approach', 'Didn\'t test minimum needs']
        }
      ]
    }
  ],
  
  // ZONE 5: Workplace Boundaries & Social Pressure
  zone5: [
    {
      id: 'm14',
      title: 'Personal Device at Work',
      description: 'You\'re asked to quickly check a work email on your personal phone at a meeting.',
      scenario: 'Your work laptop is at your desk. A colleague says "Just log in on your phone real quick, we need that file now."',
      signals: ['Convenience request', 'Time pressure', 'Personal device mixing', 'Social expectation'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Mixing personal and work devices can expose corporate data to personal device vulnerabilities.',
      choices: [
        {
          id: 'c1',
          text: 'Log in on my personal phone to help',
          risk: 'unsafe',
          explanation: 'This violates work-personal boundaries. Your personal device may not have proper security controls for work data.',
          reasoning: 'Social pressure overriding security policy',
          hiddenCues: ['Policy violation', 'Device mixing', 'Normalized exception']
        },
        {
          id: 'c2',
          text: 'Explain I need to get my work laptop',
          risk: 'safe',
          explanation: 'Excellent boundary setting! Work data belongs on work devices with proper security controls.',
          reasoning: 'Maintaining security boundaries despite pressure',
          hiddenCues: ['Policy adherence', 'Professional boundary', 'Security over convenience']
        },
        {
          id: 'c3',
          text: 'Offer to go get the laptop while they wait',
          risk: 'safe',
          explanation: 'Good! You found a solution that maintains security while being helpful.',
          reasoning: 'Problem-solving within security constraints',
          hiddenCues: ['Alternative solution', 'Maintained boundaries', 'Stayed helpful']
        }
      ]
    },
    {
      id: 'm15',
      title: 'Shared Credentials Request',
      description: 'A team member asks for your login to a shared tool because theirs isn\'t working.',
      scenario: '"My account is locked and IT says it\'ll take an hour to fix. Can I just use yours? We have a deadline."',
      signals: ['Credential sharing request', 'Deadline pressure', 'Legitimate-sounding reason'],
      attackTactic: 'Credential Access',
      tacticExplanation: 'Shared credentials create accountability gaps and normalize poor security practices.',
      choices: [
        {
          id: 'c1',
          text: 'Share my credentials to meet the deadline',
          risk: 'unsafe',
          explanation: 'Never share credentials. Any actions taken under your account become your responsibility.',
          reasoning: 'Urgency overriding security fundamentals',
          hiddenCues: ['Accountability loss', 'Policy violation', 'Audit trail confusion']
        },
        {
          id: 'c2',
          text: 'Offer to do the task myself while they direct me',
          risk: 'safe',
          explanation: 'Perfect compromise! You helped meet the deadline while maintaining account security.',
          reasoning: 'Creative solution maintaining security principles',
          hiddenCues: ['Preserved accountability', 'Maintained boundaries', 'Collaborative solution']
        },
        {
          id: 'c3',
          text: 'Contact IT to escalate the account issue',
          risk: 'safe',
          explanation: 'Good! You engaged the proper channel. IT was able to resolve it quickly when they understood the urgency.',
          reasoning: 'Proper escalation instead of policy violation',
          hiddenCues: ['Used official channels', 'Communicated urgency appropriately']
        }
      ]
    },
    {
      id: 'm16',
      title: 'After-Hours Work Request',
      description: 'You receive a message at 11 PM from someone claiming to be a new executive asking for sensitive data.',
      scenario: '"I\'m the new VP and need the customer database for tomorrow\'s board meeting. Please send ASAP."',
      signals: ['After-hours timing', 'Unfamiliar sender', 'Authority claim', 'Urgent request', 'Sensitive data'],
      attackTactic: 'Collection',
      tacticExplanation: 'Attackers exploit off-hours when verification is harder and decision-making may be impaired.',
      choices: [
        {
          id: 'c1',
          text: 'Send the data to help the new executive',
          risk: 'unsafe',
          explanation: 'Never send sensitive data based on an unverified request, especially after hours. This could be anyone.',
          reasoning: 'Authority claim bypassing verification',
          hiddenCues: ['Unverified sender', 'Off-hours exploitation', 'No confirmation process']
        },
        {
          id: 'c2',
          text: 'Wait until morning to verify through official channels',
          risk: 'safe',
          explanation: 'Excellent! Sensitive data requests can always wait for proper verification. This turned out to be a scam.',
          reasoning: 'Time boundaries supporting security verification',
          hiddenCues: ['Recognized off-hours risk', 'Delayed for proper process', 'Security over urgency']
        },
        {
          id: 'c3',
          text: 'Reply asking for their employee ID number',
          risk: 'risky',
          explanation: 'Better than sending data, but attackers research this information. Verify through official channels instead.',
          reasoning: 'Verification attempt within attacker-controlled channel',
          hiddenCues: ['Good verification instinct', 'But insufficient method']
        }
      ]
    },
    {
      id: 'm17',
      title: 'Public WiFi Work Session',
      description: 'You\'re at a coffee shop and need to finish work on a deadline. The WiFi is open and unsecured.',
      scenario: 'You have your work laptop and VPN software installed. The deadline is in 2 hours.',
      signals: ['Public network', 'Work data', 'Time pressure', 'VPN available'],
      attackTactic: 'Collection',
      tacticExplanation: 'Public networks can be monitored or intercepted even with some protections in place.',
      choices: [
        {
          id: 'c1',
          text: 'Connect and work - I have VPN',
          risk: 'risky',
          explanation: 'VPN helps but isn\'t perfect on hostile networks. Better options exist for sensitive work.',
          reasoning: 'Partial protection treated as complete protection',
          hiddenCues: ['VPN isn\'t foolproof', 'Network still untrusted', 'Residual risk remains']
        },
        {
          id: 'c2',
          text: 'Use my phone hotspot instead',
          risk: 'safe',
          explanation: 'Excellent! Your cellular connection is much more secure than open public WiFi for work.',
          reasoning: 'Choosing secure alternative despite convenience',
          hiddenCues: ['Controlled network', 'Cellular encryption', 'Avoided untrusted infrastructure']
        },
        {
          id: 'c3',
          text: 'Work offline and sync when back at the office',
          risk: 'safe',
          explanation: 'Great solution! Offline work eliminates network risk entirely.',
          reasoning: 'Risk elimination through offline operation',
          hiddenCues: ['Zero network exposure', 'Complete control', 'Sync later safely']
        }
      ]
    },
    {
      id: 'm18',
      title: 'Device Left Behind',
      description: 'You realize you left your work laptop at a restaurant. It was there for about 30 minutes.',
      scenario: 'You go back and retrieve it. Everything looks normal. It was in sleep mode.',
      signals: ['Physical access gap', 'Unattended device', 'Uncertain exposure time'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Physical access to devices can enable attacks that persist even after the device is recovered.',
      choices: [
        {
          id: 'c1',
          text: 'Resume working - nothing seems wrong',
          risk: 'unsafe',
          explanation: 'Physical access could mean anything was installed or copied. This requires security review.',
          reasoning: 'Absence of obvious signs treated as absence of compromise',
          hiddenCues: ['Physical access occurred', 'Sleep mode not secure', 'Hidden changes possible']
        },
        {
          id: 'c2',
          text: 'Report to IT and don\'t use it until cleared',
          risk: 'safe',
          explanation: 'Perfect! IT scanned the device and found suspicious software had been installed. Crisis averted.',
          reasoning: 'Physical security incident reporting',
          hiddenCues: ['Recognized physical access risk', 'Followed security protocol', 'Prevented persistence']
        },
        {
          id: 'c3',
          text: 'Change my passwords as a precaution',
          risk: 'risky',
          explanation: 'Good instinct, but device inspection comes first. Using a potentially compromised device to change passwords is risky.',
          reasoning: 'Partial response without device verification',
          hiddenCues: ['Recognized need for action', 'But wrong order of operations']
        }
      ]
    }
  ],
  
  // ZONE 6: Advanced Judgment & Ambiguity
  zone6: [
    {
      id: 'm19',
      title: 'Trusted Source, Unusual Request',
      description: 'Your long-time collaborator sends you a file with a message: "Updated contract - needs signature today."',
      scenario: 'The message tone is slightly off, and you weren\'t expecting a contract update. But it is from their real email address.',
      signals: ['Authentic source', 'Unusual timing', 'Subtle tone difference', 'Urgency added'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Even legitimate accounts can be compromised. Behavioral changes are important signals.',
      choices: [
        {
          id: 'c1',
          text: 'Open the file and review the contract',
          risk: 'unsafe',
          explanation: 'Subtle behavioral changes matter. Their account was compromised. The file contained malware.',
          reasoning: 'Trust in source overriding behavioral anomaly detection',
          hiddenCues: ['Tone mismatch ignored', 'Timing unusual', 'Unexpected request']
        },
        {
          id: 'c2',
          text: 'Call them to confirm before opening',
          risk: 'safe',
          explanation: 'Excellent! That subtle tone difference was your instinct telling you something was off. Account was compromised.',
          reasoning: 'Behavioral anomaly detection triggering verification',
          hiddenCues: ['Noticed subtle inconsistency', 'Trusted instinct', 'Verified despite legitimate source']
        },
        {
          id: 'c3',
          text: 'Reply asking why the update is needed',
          risk: 'risky',
          explanation: 'Attackers controlling the account will have prepared responses. Phone verification is more reliable.',
          reasoning: 'Verification attempt in potentially compromised channel',
          hiddenCues: ['Questioned appropriately', 'But stayed in controlled channel']
        }
      ]
    },
    {
      id: 'm20',
      title: 'Service Downgrade Notice',
      description: 'An email says your account will be downgraded due to "suspicious activity" unless you verify within 24 hours.',
      scenario: 'The email looks professional and the company is one you actually use. It includes your account username.',
      signals: ['Real service', 'Account details included', 'Negative consequence', 'Verification link'],
      attackTactic: 'Credential Access',
      tacticExplanation: 'Attackers research targets to create convincing personalized messages.',
      choices: [
        {
          id: 'c1',
          text: 'Click the link - they have my username, it must be real',
          risk: 'unsafe',
          explanation: 'Personalization doesn\'t prove legitimacy. Usernames are often publicly visible or guessable.',
          reasoning: 'Personalization treated as authentication',
          hiddenCues: ['Personalization is researchable', 'Not proof of legitimacy', 'Classic targeting technique']
        },
        {
          id: 'c2',
          text: 'Navigate to the service independently and check account status',
          risk: 'safe',
          explanation: 'Perfect! No downgrade notice existed. The email was a sophisticated targeted phishing attempt.',
          reasoning: 'Personalization recognized as insufficient proof',
          hiddenCues: ['Didn\'t trust personalization alone', 'Used independent verification']
        },
        {
          id: 'c3',
          text: 'Check if friends using the same service got this',
          risk: 'risky',
          explanation: 'Targeted attacks are individual. Others not receiving it doesn\'t tell you if yours is real.',
          reasoning: 'Seeking external validation for targeted threat',
          hiddenCues: ['Targeted nature not considered', 'Group validation not applicable']
        }
      ]
    },
    {
      id: 'm21',
      title: 'Legitimate Alert, Suspicious Timing',
      description: 'You receive a password change confirmation for a service you actually did just change the password for.',
      scenario: 'But the confirmation email arrived 10 minutes after you changed it, and you\'re now getting another email saying "If this wasn\'t you, click here."',
      signals: ['Real recent action', 'Delayed confirmation', 'Second message', 'Verification request'],
      attackTactic: 'Persistence',
      tacticExplanation: 'Attackers may piggyback on legitimate security alerts to confuse and manipulate users.',
      choices: [
        {
          id: 'c1',
          text: 'Click to verify - I did change my password, something may be wrong',
          risk: 'unsafe',
          explanation: 'Attackers exploit the confusion of mixed legitimate and fake alerts. Always use official channels.',
          reasoning: 'Confusion exploited to bypass judgment',
          hiddenCues: ['Piggybacking on real action', 'Confusion tactic', 'Mixed signals deliberate']
        },
        {
          id: 'c2',
          text: 'Ignore the second email and check the service directly',
          risk: 'safe',
          explanation: 'Smart! The first confirmation was legitimate. The second was a scam attempting to exploit your alert state.',
          reasoning: 'Confusion recognized, official verification prioritized',
          hiddenCues: ['Didn\'t panic', 'Used direct verification', 'Ignored suspicious secondary message']
        },
        {
          id: 'c3',
          text: 'Change my password again to be safe',
          risk: 'risky',
          explanation: 'Overreaction without verification. Check the account status first to understand what\'s happening.',
          reasoning: 'Action without analysis',
          hiddenCues: ['Panic response', 'Verification skipped']
        }
      ]
    },
    {
      id: 'm22',
      title: 'Vendor Portal Access',
      description: 'A vendor you work with sends login credentials for their new "secure portal" to share files.',
      scenario: 'The email says "For security, we\'re moving everything to our new portal. Login details below." It includes a username and temporary password.',
      signals: ['Credentials in email', 'New system', 'Security justification', 'Temporary password'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Credentials should never be sent via email. Legitimate services use secure onboarding processes.',
      choices: [
        {
          id: 'c1',
          text: 'Log in with the provided credentials',
          risk: 'unsafe',
          explanation: 'Credentials in email is a red flag. Legitimate vendors use secure invite links, not emailed passwords.',
          reasoning: 'Security claims overriding security red flags',
          hiddenCues: ['Credentials via email insecure', 'Contradicts stated security purpose']
        },
        {
          id: 'c2',
          text: 'Contact the vendor through known channels to confirm',
          risk: 'safe',
          explanation: 'Excellent! The vendor confirmed this was a scam. They never send credentials via email.',
          reasoning: 'Process verification despite security claims',
          hiddenCues: ['Recognized insecure practice', 'Verified through separate channel']
        },
        {
          id: 'c3',
          text: 'Check if the portal URL matches the vendor\'s domain',
          risk: 'risky',
          explanation: 'Good instinct, but domains can be spoofed. Contacting the vendor directly is more reliable.',
          reasoning: 'Technical verification without process confirmation',
          hiddenCues: ['Good security awareness', 'But insufficient verification']
        }
      ]
    },
    {
      id: 'm23',
      title: 'Security Training Phishing Test',
      description: 'You receive an email that looks like a phishing attempt. It could be real phishing or a company training test.',
      scenario: 'The email has several suspicious signs, but you\'re unsure if reporting it will make you look foolish if it\'s just a test.',
      signals: ['Suspicious indicators', 'Social concern', 'Uncertain context', 'Reporting hesitation'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Hesitation to report due to social concerns is a common barrier to security.',
      choices: [
        {
          id: 'c1',
          text: 'Do nothing - might just be a test',
          risk: 'unsafe',
          explanation: 'Reporting suspicious messages is always correct, whether test or real. Social concern shouldn\'t override security.',
          reasoning: 'Social fear preventing security action',
          hiddenCues: ['Reporting is always appropriate', 'Tests reward reporting', 'No downside to reporting']
        },
        {
          id: 'c2',
          text: 'Report it as suspicious through official channels',
          risk: 'safe',
          explanation: 'Perfect! Whether test or real, reporting is the right action. It turned out to be a real phishing attempt.',
          reasoning: 'Security action over social concerns',
          hiddenCues: ['Reporting always correct', 'Security culture', 'No penalty for caution']
        },
        {
          id: 'c3',
          text: 'Ask colleagues if they got it before reporting',
          risk: 'risky',
          explanation: 'Delays and others may not recognize it either. Report first, discuss later if needed.',
          reasoning: 'Seeking social validation before security action',
          hiddenCues: ['Delay in reporting', 'Social validation unnecessary']
        }
      ]
    },
    {
      id: 'm24',
      title: 'Family Emergency Message',
      description: 'You receive a message claiming to be from a family member: "Emergency! My phone died, I\'m stuck and need money urgently."',
      scenario: 'The message came from an unknown number but knows your family member\'s name and some personal details.',
      signals: ['Emotional appeal', 'Urgency', 'Money request', 'Unexpected channel', 'Personal details'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Attackers use emotional manipulation and researched personal information to bypass rational judgment.',
      choices: [
        {
          id: 'c1',
          text: 'Send money immediately - it\'s an emergency',
          risk: 'unsafe',
          explanation: 'Emotional manipulation is a powerful tactic. Even with personal details, verify through alternate contact.',
          reasoning: 'Emotion overriding verification process',
          hiddenCues: ['Emotional exploitation', 'Personal info researchable', 'Emergency pressure']
        },
        {
          id: 'c2',
          text: 'Call the family member\'s known number to verify',
          risk: 'safe',
          explanation: 'Excellent emotional regulation! Your family member was fine. This was a scam using researched information.',
          reasoning: 'Emotional awareness with rational verification',
          hiddenCues: ['Managed emotional response', 'Verified independently', 'Personal details not proof']
        },
        {
          id: 'c3',
          text: 'Reply asking personal questions only they would know',
          risk: 'risky',
          explanation: 'Attackers research extensively. Better to verify through known contact methods.',
          reasoning: 'Challenge question in controlled channel',
          hiddenCues: ['Some verification attempted', 'But challenge questions defeated by research']
        }
      ]
    },
    {
      id: 'm25',
      title: 'Software License Compliance',
      description: 'An email claims your company is under audit for software license compliance and you must fill out a form.',
      scenario: 'The email looks official and mentions specific software your company uses. It threatens legal action if not completed within 48 hours.',
      signals: ['Legal threat', 'Time pressure', 'Company knowledge', 'Compliance demand'],
      attackTactic: 'Collection',
      tacticExplanation: 'Attackers impersonate legal/compliance authorities to extract information or plant malware.',
      choices: [
        {
          id: 'c1',
          text: 'Fill out the form to avoid legal issues',
          risk: 'unsafe',
          explanation: 'Legal compliance requests go through official channels, not surprise emails. This is information gathering.',
          reasoning: 'Authority and legal fear bypassing verification',
          hiddenCues: ['Official process not followed', 'Company details researchable', 'Threat tactic']
        },
        {
          id: 'c2',
          text: 'Forward to IT/legal department immediately',
          risk: 'safe',
          explanation: 'Perfect! Legal compliance is handled by specific departments, not random email responses. This was a scam.',
          reasoning: 'Proper escalation to authorized departments',
          hiddenCues: ['Recognized appropriate handlers', 'Official process', 'Departmental responsibility']
        },
        {
          id: 'c3',
          text: 'Research the sender\'s company before responding',
          risk: 'risky',
          explanation: 'Research helps but company departments should handle compliance. Forward first, they\'ll verify.',
          reasoning: 'Personal verification of organizational issue',
          hiddenCues: ['Individual taking org responsibility', 'Delay in proper escalation']
        }
      ]
    },
    {
      id: 'm26',
      title: 'Two-Factor Authentication Fatigue',
      description: 'You keep receiving 2FA approval requests on your phone but you\'re not trying to log in.',
      scenario: 'Over 30 minutes, you\'ve gotten 8 approval requests. A call comes in from "IT Support" offering to "fix the issue."',
      signals: ['Repeated unexpected requests', 'Timing coordination', 'Convenient solution offer'],
      attackTactic: 'Credential Access',
      tacticExplanation: 'MFA fatigue attacks overwhelm users with requests, then offer fake help to gain approval or credentials.',
      choices: [
        {
          id: 'c1',
          text: 'Approve one request so IT can help fix the problem',
          risk: 'unsafe',
          explanation: 'The attacker has your password and is trying to get you to approve their login. The "IT" call is part of the attack.',
          reasoning: 'Coordinated attack mistaken for help',
          hiddenCues: ['Coordinated tactics', 'Fake helper', 'Pressure through volume']
        },
        {
          id: 'c2',
          text: 'Deny all requests, hang up, and contact IT through official channels',
          risk: 'safe',
          explanation: 'Perfect! You recognized the coordinated attack. IT confirmed your password was compromised and helped you secure your account.',
          reasoning: 'Pattern recognition of coordinated attack',
          hiddenCues: ['Saw coordination', 'Verified through official channel', 'Didn\'t approve under pressure']
        },
        {
          id: 'c3',
          text: 'Ask the caller for their employee ID',
          risk: 'risky',
          explanation: 'Better than approving, but still engaged with attacker. Hang up and verify through official channels.',
          reasoning: 'Verification attempt with attacker',
          hiddenCues: ['Some skepticism', 'But engaged with threat actor']
        }
      ]
    }
  ],


  // ZONE 7: Advanced Ambiguity & Judgment Under Uncertainty
  zone7: [
    {
      id: 'm27',
      title: 'Routine Update, Subtle Anomaly',
      description: 'Your project management tool sends a notification about a new feature you\'ve been waiting for.',
      scenario: 'The email includes a "Try it now" button and mentions improved workflow automation. The sender address is support@projecttool-updates.io instead of the usual .com domain. Everything else looks identical to past legitimate emails.',
      signals: ['Expected feature', 'Familiar format', 'Subtle domain variation', 'No explicit urgency'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Attackers capitalize on anticipated legitimate communications, using minimal deviations to avoid suspicion.',
      choices: [
        {
          id: 'c1',
          text: 'Click "Try it now" to test the new feature',
          risk: 'unsafe',
          explanation: 'The domain variation (.io vs .com) was the only signal. Attackers know you expect this update and crafted a near-perfect replica.',
          reasoning: 'Expectation overriding minimal signal detection',
          hiddenCues: ['Domain discrepancy easily missed', 'Timing exploits anticipation', 'No obvious red flags']
        },
        {
          id: 'c2',
          text: 'Log into the tool directly to see if the feature is there',
          risk: 'safe',
          explanation: 'Excellent restraint. You noticed something subtle felt off, even though you couldn\'t pinpoint it immediately. The feature wasn\'t actually released yet.',
          reasoning: 'Trusting subtle unease over apparent legitimacy',
          hiddenCues: ['Honored vague instinct', 'Preferred independent verification', 'Noticed minimal inconsistency']
        },
        {
          id: 'c3',
          text: 'Forward to a colleague to see if they got it too',
          risk: 'risky',
          explanation: 'Targeted attacks vary by recipient. Their confirmation wouldn\'t validate yours, and forwarding spreads potential threat.',
          reasoning: 'Seeking validation without independent verification',
          hiddenCues: ['Distributes potential threat', 'Others\' experience not definitive']
        }
      ]
    },
    {
      id: 'm28',
      title: 'Contextual Plausibility',
      description: 'During a company-wide software migration, you receive instructions to "complete your transition" by end of day.',
      scenario: 'The email references the actual migration project, includes correct terminology, and comes from a plausible internal address. You haven\'t completed your transition yet. The link says "Finalize Migration - Action Required."',
      signals: ['Real ongoing project', 'Accurate context', 'Reasonable timeline', 'Familiar process'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Attackers monitor public company communications and exploit windows of legitimate disruption.',
      choices: [
        {
          id: 'c1',
          text: 'Click the link - this migration is actually happening',
          risk: 'unsafe',
          explanation: 'Real migrations create perfect cover for fake instructions. Attackers monitored the announcement and created parallel guidance.',
          reasoning: 'Context accuracy mistaken for sender authenticity',
          hiddenCues: ['Public project knowledge exploited', 'Timing creates plausibility', 'Legitimate chaos provides cover']
        },
        {
          id: 'c2',
          text: 'Check the official migration portal or IT announcement first',
          risk: 'safe',
          explanation: 'Smart contextual awareness. You knew the migration was real but verified the instruction source independently. No such email was sent officially.',
          reasoning: 'Separating event legitimacy from communication legitimacy',
          hiddenCues: ['Context doesn\'t authenticate sender', 'Used official information source', 'Verified despite plausibility']
        },
        {
          id: 'c3',
          text: 'Reply asking for clarification on the deadline',
          risk: 'risky',
          explanation: 'Attackers will provide convincing clarification. During disruptions, verify through established channels, not email threads.',
          reasoning: 'Engagement within potentially compromised channel',
          hiddenCues: ['Stayed in unverified channel', 'Attackers prepared for questions']
        }
      ]
    },
    {
      id: 'm29',
      title: 'Assumed Continuity',
      description: 'You receive a follow-up message: "Per our discussion yesterday, here\'s the document you requested."',
      scenario: 'You had several meetings yesterday, and the sender name looks vaguely familiar. The attached file is named something plausible for your work. You can\'t immediately recall requesting this specific document.',
      signals: ['Vague familiarity', 'Plausible but unverifiable reference', 'Memory uncertainty', 'Professional context'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Attackers exploit normal memory limitations and busy schedules to create assumed legitimacy.',
      choices: [
        {
          id: 'c1',
          text: 'Open the document - I probably did request this and forgot',
          risk: 'unsafe',
          explanation: 'Memory uncertainty is weaponized. No such discussion occurred. The sender researched your role and created a plausible scenario.',
          reasoning: 'Self-doubt overriding verification requirement',
          hiddenCues: ['Memory doubt exploited', 'Vague reference intentional', 'Assumes you\'ll self-convince']
        },
        {
          id: 'c2',
          text: 'Message the sender asking which discussion they\'re referring to',
          risk: 'safe',
          explanation: 'Good boundary setting. You required specificity despite feeling uncertain. They couldn\'t provide details because no discussion happened.',
          reasoning: 'Requiring specificity despite self-doubt',
          hiddenCues: ['Didn\'t assume your memory failed', 'Demanded clarification', 'Uncertainty doesn\'t justify risk']
        },
        {
          id: 'c3',
          text: 'Check my calendar and notes from yesterday before responding',
          risk: 'safe',
          explanation: 'Excellent process. You validated your own memory externally. No record of this request existed, confirming suspicion.',
          reasoning: 'External memory validation before action',
          hiddenCues: ['Used records over recollection', 'Systematic verification', 'Trusted documentation']
        }
      ]
    },
    {
      id: 'm30',
      title: 'Normalized Exception',
      description: 'A regular vendor contact asks you to use a new file-sharing method "because our usual system is down for maintenance."',
      scenario: 'You work with this vendor weekly. The request comes from their known email. They suggest using a third-party file share "just this once" and provide a link. No maintenance was announced, but systems do go down unexpectedly.',
      signals: ['Established relationship', 'Plausible explanation', 'Temporary deviation', 'No prior notice'],
      attackTactic: 'Initial Access',
      tacticExplanation: 'Compromised trusted accounts request process deviations that seem reasonable but bypass security controls.',
      choices: [
        {
          id: 'c1',
          text: 'Use the provided link - systems do have unexpected issues',
          risk: 'unsafe',
          explanation: 'The vendor\'s account was compromised. Real service interruptions are announced through official channels, not ad-hoc email suggestions.',
          reasoning: 'Plausibility overriding process verification',
          hiddenCues: ['Account compromise', 'No official announcement suspicious', 'Normalized deviation dangerous']
        },
        {
          id: 'c2',
          text: 'Call the vendor to confirm the system is actually down',
          risk: 'safe',
          explanation: 'Perfect verification instinct. The vendor confirmed their system was fine and their account had been compromised overnight.',
          reasoning: 'Process deviation triggering independent verification',
          hiddenCues: ['Exception required confirmation', 'Trusted relationship still requires verification', 'Out-of-band check']
        },
        {
          id: 'c3',
          text: 'Suggest waiting until their system is back up',
          risk: 'safe',
          explanation: 'Good risk avoidance. You refused to normalize the exception, protecting both organizations from the compromised workflow.',
          reasoning: 'Refusing process deviation despite inconvenience',
          hiddenCues: ['Maintained standard process', 'Delay over risk', 'Exception resistance']
        }
      ]
    }
  ]
};


const UPGRADES = {
  signalAmplifier: {
    id: 'signalAmplifier',
    name: 'Signal Amplifier',
    component: 'SignalAmplifier',
    description: 'Reveals hidden cues and patterns after decisions',
    unlockLevel: 2,
    effect: 'See subtle signals you might have missed'
  },
  threatModel: {
    id: 'threatModel',
    name: 'Threat Model Viewer',
    component: 'ThreatModel',
    description: 'Breaks down scenarios into Actor, Intent, Opportunity, Impact',
    unlockLevel: 3,
    effect: 'Understand threat structure and patterns'
  },
  knowledgeCache: {
    id: 'knowledgeCache',
    name: 'Knowledge Cache',
    component: 'KnowledgeCache',
    description: 'Access to cyber awareness glossary and concepts',
    unlockLevel: 3,
    effect: 'Reference key terminology and definitions'
  },
  reasoningPath: {
    id: 'reasoningPath',
    name: 'Reasoning Path Tracker',
    component: 'ReasoningPath',
    description: 'Shows your decision-making patterns and growth',
    unlockLevel: 4,
    effect: 'Metacognitive insight into your choices'
  },
  scenarioReplay: {
    id: 'scenarioReplay',
    name: 'Scenario Replay Module',
    component: 'ScenarioReplay',
    description: 'Future capability to replay missions with reduced hints',
    unlockLevel: 6,
    effect: 'Practice reinforcement system'
  }
};


const GLOSSARY = {
  phishing: {
    term: 'Phishing',
    definition: 'Fake messages designed to trick you into revealing sensitive information or clicking malicious links.',
    example: 'An email pretending to be from your bank asking for your password.'
  },
  spoofing: {
    term: 'Spoofing',
    definition: 'Making something appear to come from a trusted source when it actually doesn\'t.',
    example: 'An email that looks like it\'s from your boss but actually isn\'t.'
  },
  malware: {
    term: 'Malware',
    definition: 'Malicious software designed to harm your device or steal information.',
    example: 'A program hidden on a USB drive that installs when plugged in.'
  },
  socialEngineering: {
    term: 'Social Engineering',
    definition: 'Manipulating people into giving up information or taking actions they shouldn\'t.',
    example: 'Creating urgency to bypass someone\'s normal careful judgment.'
  },
  verification: {
    term: 'Verification',
    definition: 'Confirming something is legitimate through a separate, trusted channel.',
    example: 'Calling your bank using a known phone number instead of one in an email.'
  }
};


// ============================================================================
// MITRE ATT&CK LITERACY - Defensive Framework (Zones 4+)
// ============================================================================


const ATTACK_TACTICS = {
  initialAccess: {
    name: 'Initial Access',
    description: 'How adversaries try to get into your environment.',
    defensiveTakeaway: 'Recognition and verification are your first line of defense.',
    examples: ['Phishing emails', 'Fake updates', 'Compromised accounts']
  },
  credentialAccess: {
    name: 'Credential Access',
    description: 'Attempts to steal account credentials or authentication tokens.',
    defensiveTakeaway: 'Never share credentials and always verify identity through separate channels.',
    examples: ['Password requests', 'Fake login pages', 'Account sharing pressure']
  },
  collection: {
    name: 'Collection',
    description: 'Gathering data or information that adversaries want.',
    defensiveTakeaway: 'Minimize shared data and question requests for sensitive information.',
    examples: ['Over-permissioned apps', 'Data exfiltration', 'Unsecured sharing']
  },
  persistence: {
    name: 'Persistence',
    description: 'Maintaining access to systems across restarts and credential changes.',
    defensiveTakeaway: 'Report and verify any unusual activity, even if systems appear normal.',
    examples: ['Malware installation', 'Account backdoors', 'Hidden access methods']
  }
};


// ============================================================================
// MAIN APP COMPONENT
// ============================================================================


export default function NetNaviGame() {
  const [gameState, setGameState] = useState('intro');
  const [currentZone, setCurrentZone] = useState(1);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [upgrades, setUpgrades] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNetNavi, setShowNetNavi] = useState(true);
  const [showUpgradeMenu, setShowUpgradeMenu] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showAttackLiteracy, setShowAttackLiteracy] = useState(false);
  const [naviMessage, setNaviMessage] = useState('');
  const [resilienceScore, setResilienceScore] = useState(100);
  const [showThreatModel, setShowThreatModel] = useState(false);
  const [showTacticMapping, setShowTacticMapping] = useState(false);
  const [newlyUnlockedUpgrade, setNewlyUnlockedUpgrade] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [patternInsights, setPatternInsights] = useState({
    verificationCount: 0,
    urgencyResistance: 0,
    independentAction: 0,
    boundaryMaintenance: 0
  });


  // ============================================================================
  // COMPUTED STATE - Derived values
  // ============================================================================


  // Automatically compute which upgrades are unlocked based on level
  const unlockedUpgrades = useMemo(() => {
    return Object.keys(UPGRADES).filter(upgradeId => {
      const upgrade = UPGRADES[upgradeId];
      return playerLevel >= upgrade.unlockLevel;
    });
  }, [playerLevel]);


  // ============================================================================
  // HELPER FUNCTIONS - Game logic utilities
  // ============================================================================


  // Deterministic shuffle based on mission ID for consistent order per mission
  // Correctness is object-based (choice.risk), not position-based
  const shuffleChoices = (choices, missionId) => {
    const seed = missionId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...choices];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(((seed * (i + 1)) % 97) / 97 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  };


  const getCurrentMission = () => {
    const zoneKey = `zone${currentZone}`;
    const missions = MISSIONS[zoneKey];
    if (!missions || currentMissionIndex >= missions.length) {
      return null;
    }
    return missions[currentMissionIndex];
  };


  const getXPForNextLevel = (level) => level * 100;
  
  const isZoneUnlocked = (zoneNumber) => {
    if (zoneNumber === 1) return true;
    const prevZoneKey = `zone${zoneNumber - 1}`;
    const prevZoneMissions = MISSIONS[prevZoneKey];
    if (!prevZoneMissions) return false;
    const prevZoneCompleted = prevZoneMissions.every(m => completedMissions.includes(m.id));
    return prevZoneCompleted;
  };


  // ============================================================================
  // GAME STATE MANAGEMENT - Core gameplay effects
  // ============================================================================


  // Auto-unlock upgrades when level increases
  useEffect(() => {
    const newUnlocks = unlockedUpgrades.filter(upgradeId => 
      UPGRADES[upgradeId].unlockLevel === playerLevel
    );
    
    if (newUnlocks.length > 0 && playerLevel > 1) {
      const upgrade = UPGRADES[newUnlocks[0]];
      setNewlyUnlockedUpgrade(upgrade);
      
      // Clear notification after a delay
      const timer = setTimeout(() => {
        setNewlyUnlockedUpgrade(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [playerLevel, unlockedUpgrades]);


  useEffect(() => {
    if (gameState === 'intro') {
      setNaviMessage('Welcome! I\'m NetNavi, your cyber awareness guide. Together we\'ll explore the digital world and learn to make safe decisions.');
    } else if (gameState === 'playing' && !showFeedback) {
      const mission = getCurrentMission();
      if (mission && currentMissionIndex === 0 && currentZone === 1) {
        setNaviMessage('Read the scenario carefully. Think about what might go wrong with each choice.');
      } else if (mission && currentZone === 7) {
        setNaviMessage('Zone 7 scenarios rely on subtle cues and judgment. Trust your instincts and verify when uncertain.');
      } else if (mission) {
        setNaviMessage('Take your time. Consider the risks and benefits of each option.');
      }
    }
  }, [gameState, currentMissionIndex, currentZone, showFeedback]);


  // Shuffle choices when mission changes
  useEffect(() => {
    const mission = getCurrentMission();
    if (mission && gameState === 'playing') {
      const shuffled = shuffleChoices(mission.choices, mission.id);
      setShuffledChoices(shuffled);
    }
  }, [currentZone, currentMissionIndex, gameState]);


  // ============================================================================
  // GAME ACTIONS - User interaction handlers
  // ============================================================================


  const startGame = () => {
    setGameState('playing');
  };


  const updatePatternInsights = (choice) => {
    const newPatterns = {...patternInsights};
    const reasoningLower = choice.reasoning.toLowerCase();
    
    if (reasoningLower.includes('verification') || reasoningLower.includes('verified')) {
      newPatterns.verificationCount += 1;
    }
    
    if (reasoningLower.includes('pressure') || reasoningLower.includes('urgency')) {
      newPatterns.urgencyResistance += 1;
    }
    
    if (reasoningLower.includes('independent')) {
      newPatterns.independentAction += 1;
    }
    
    if (reasoningLower.includes('boundary') || reasoningLower.includes('boundaries')) {
      newPatterns.boundaryMaintenance += 1;
    }
    
    setPatternInsights(newPatterns);
  };


  const selectChoice = (choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
    updatePatternInsights(choice);
    
    let xpGain = 0;
    if (choice.risk === 'safe') {
      xpGain = 50;
      setNaviMessage('Excellent decision! ' + choice.explanation);
    } else if (choice.risk === 'risky') {
      xpGain = 30;
      setNaviMessage('You\'re learning! ' + choice.explanation);
    } else {
      xpGain = 20;
      setNaviMessage('Let\'s reflect on this. ' + choice.explanation);
      setResilienceScore(prev => Math.max(0, prev - 5));
    }
    
    // Bonus XP for having Reasoning Path Tracker active
    if (unlockedUpgrades.includes('reasoningPath')) {
      xpGain += 10;
    }
    
    const newXP = xp + xpGain;
    const currentLevelThreshold = getXPForNextLevel(playerLevel);
    
    if (newXP >= currentLevelThreshold) {
      const newLevel = playerLevel + 1;
      setPlayerLevel(newLevel);
      setXp(newXP - currentLevelThreshold);
      
      // Check if new level unlocks an upgrade
      const newlyUnlocked = Object.values(UPGRADES).find(u => u.unlockLevel === newLevel);
      if (newlyUnlocked) {
        setNaviMessage(`Level ${newLevel} reached! ${newlyUnlocked.name} unlocked: ${newlyUnlocked.effect}`);
      } else {
        setNaviMessage(prev => prev + '\n\nLevel Up! You\'re gaining mastery.');
      }
    } else {
      setXp(newXP);
    }
    
    const mission = getCurrentMission();
    if (mission && !completedMissions.includes(mission.id)) {
      setCompletedMissions(prev => [...prev, mission.id]);
    }
  };


  const nextMission = () => {
    const zoneKey = `zone${currentZone}`;
    const zoneMissions = MISSIONS[zoneKey];
    
    if (!zoneMissions) {
      console.error('Invalid zone:', currentZone);
      return;
    }
    
    setShowFeedback(false);
    setSelectedChoice(null);
    setShowThreatModel(false);
    setShowTacticMapping(false);
    
    if (currentMissionIndex < zoneMissions.length - 1) {
      setCurrentMissionIndex(prev => prev + 1);
      setGameState('playing');
    } else {
      setGameState('zoneComplete');
    }
  };


  const nextZone = () => {
    if (currentZone < 7) {
      const nextZoneNum = currentZone + 1;
      
      if (!isZoneUnlocked(nextZoneNum)) {
        setNaviMessage('Complete the current zone to unlock the next one.');
        return;
      }
      
      setCurrentZone(nextZoneNum);
      setCurrentMissionIndex(0);
      setGameState('playing');
      
      if (nextZoneNum === 4) {
        setNaviMessage('Welcome to advanced training. Scenarios become more nuanced here. Trust your developed instincts.');
      } else if (nextZoneNum === 6) {
        setNaviMessage('Zone 6. The scenarios require careful judgment and pattern recognition.');
      } else if (nextZoneNum === 7) {
        setNaviMessage('Final zone. Scenarios here involve high ambiguity and minimal explicit signals. Trust your judgment and verify independently.');
      } else {
        setNaviMessage('Welcome to a new zone. The scenarios become more subtle here.');
      }
    } else {
      setGameState('gameComplete');
      setNaviMessage('Congratulations! You\'ve completed all zones and developed expert cyber awareness!');
    }
  };


  // ============================================================================
  // VISUAL STYLE HELPERS - Zone-based visual progression
  // ============================================================================


  const getZoneVisualStyle = () => {
    const styles = {
      1: { brightness: 1.1, contrast: 1.2, hudOpacity: 1, accentColor: '#00ffff', gridDensity: '50px' },
      2: { brightness: 1, contrast: 1, hudOpacity: 0.9, accentColor: '#00ccff', gridDensity: '50px' },
      3: { brightness: 0.95, contrast: 0.95, hudOpacity: 0.85, accentColor: '#00aaff', gridDensity: '60px' },
      4: { brightness: 0.9, contrast: 0.9, hudOpacity: 0.8, accentColor: '#0099ff', gridDensity: '60px' },
      5: { brightness: 0.85, contrast: 0.85, hudOpacity: 0.75, accentColor: '#0088ff', gridDensity: '70px' },
      6: { brightness: 0.8, contrast: 0.8, hudOpacity: 0.7, accentColor: '#0077ff', gridDensity: '70px' },
      7: { brightness: 0.75, contrast: 0.75, hudOpacity: 0.65, accentColor: '#0066ff', gridDensity: '80px' }
    };
    return styles[currentZone] || styles[1];
  };


  // ============================================================================
  // RENDER FUNCTIONS - UI Components
  // ============================================================================


  const renderIntro = () => (
    <div style={styles.introContainer}>
      <div style={styles.introPanel}>
        <div style={styles.logoContainer}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={styles.logo}>
            <circle cx="40" cy="40" r="35" fill="none" stroke="url(#logoGradient)" strokeWidth="3"/>
            <circle cx="40" cy="40" r="25" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6"/>
            <circle cx="40" cy="40" r="15" fill="url(#logoGradient)" opacity="0.3"/>
            <text x="40" y="48" textAnchor="middle" fill="#00ffff" fontSize="24" fontWeight="bold">NN</text>
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff"/>
                <stop offset="100%" stopColor="#0088ff"/>
              </linearGradient>
            </defs>
          </svg>
          <h1 style={styles.title}>NetNavi</h1>
          <p style={styles.subtitle}>Cyber Awareness Training</p>
        </div>
        
        <div style={styles.introContent}>
          <p style={styles.introText}>
            Welcome to NetNavi, where you'll learn to navigate the digital world safely through scenario-based decision making.
          </p>
          <p style={styles.introText}>
            You'll face realistic situations and learn from each choice. There's no "game over" — only growth and understanding.
          </p>
          <div style={styles.introFeatures}>
            <div style={styles.featureItem}>
              <VisualRegistry.SignalAmplifier />
              <span>Pattern Recognition</span>
            </div>
            <div style={styles.featureItem}>
              <VisualRegistry.ThreatModel />
              <span>Critical Thinking</span>
            </div>
            <div style={styles.featureItem}>
              <VisualRegistry.ReasoningPath />
              <span>Safe Practices</span>
            </div>
          </div>
        </div>
        
        <button style={styles.startButton} onClick={startGame}>
          Begin Training
        </button>
      </div>
    </div>
  );


  const renderHUD = () => {
    const zoneStyle = getZoneVisualStyle();
    
    return (
      <div style={{...styles.hud, opacity: zoneStyle.hudOpacity}}>
        <div style={styles.hudLeft}>
          <div style={styles.hudItem}>
            <div style={styles.hudIconLabel}>
              <VisualRegistry.ZoneIndicator />
              <span style={styles.hudLabel}>Zone</span>
            </div>
            <span style={styles.hudValue}>{currentZone}/7</span>
          </div>
          <div style={styles.hudItem}>
            <div style={styles.hudIconLabel}>
              <VisualRegistry.LevelIndicator />
              <span style={styles.hudLabel}>Level</span>
            </div>
            <span style={styles.hudValue}>{playerLevel}</span>
          </div>
          <div style={styles.hudItem}>
            <div style={styles.hudIconLabel}>
              <VisualRegistry.XPIndicator />
              <span style={styles.hudLabel}>XP</span>
            </div>
            <span style={styles.hudValue}>{xp}</span>
          </div>
        </div>
        
        <div style={styles.hudRight}>
          <button 
            style={styles.hudButton}
            onClick={() => setShowUpgradeMenu(true)}
            aria-label="View Learning Milestones"
          >
            Learning Progress
          </button>
          {unlockedUpgrades.includes('knowledgeCache') && (
            <button 
              style={styles.hudButton}
              onClick={() => setShowGlossary(true)}
              aria-label="Open Knowledge Cache"
            >
              Knowledge Cache
            </button>
          )}
          {currentZone >= 4 && (
            <button 
              style={styles.hudButton}
              onClick={() => setShowAttackLiteracy(true)}
              aria-label="Open ATT&CK Literacy Panel"
            >
              ATT&CK Literacy
            </button>
          )}
        </div>
      </div>
    );
  };


  const renderNetNavi = () => {
    if (!showNetNavi) return null;
    
    return (
      <div style={styles.naviContainer}>
        <div style={styles.naviPanel}>
          <div style={styles.naviHeader}>
            <VisualRegistry.NaviAvatar level={playerLevel} />
            <span style={styles.naviName}>NetNavi</span>
          </div>
          <p style={styles.naviMessage}>{naviMessage}</p>
        </div>
        
        {newlyUnlockedUpgrade && (
          <div style={styles.unlockNotification}>
            <div style={styles.unlockIcon}>
              {React.createElement(VisualRegistry[newlyUnlockedUpgrade.component])}
            </div>
            <div style={styles.unlockContent}>
              <div style={styles.unlockTitle}>New Learning Tool Unlocked</div>
              <div style={styles.unlockName}>{newlyUnlockedUpgrade.name}</div>
              <div style={styles.unlockEffect}>{newlyUnlockedUpgrade.effect}</div>
            </div>
          </div>
        )}
      </div>
    );
  };


  const renderMission = () => {
    const mission = getCurrentMission();
    if (!mission) {
      console.error('No mission found for zone', currentZone, 'index', currentMissionIndex);
      return (
        <div style={styles.missionContainer}>
          <div style={styles.missionHeader}>
            <h2 style={styles.missionTitle}>Mission Not Found</h2>
            <p style={styles.missionDescription}>Unable to load this mission. Please restart or contact support.</p>
          </div>
        </div>
      );
    }


    return (
      <div style={styles.missionContainer}>
        <div style={styles.missionHeader}>
          <h2 style={styles.missionTitle}>{mission.title}</h2>
          <p style={styles.missionDescription}>{mission.description}</p>
        </div>
        
        <div style={styles.scenarioPanel}>
          <div style={styles.scanlineOverlay} />
          <div style={styles.scenarioLabel}>Scenario</div>
          <p style={styles.scenarioText}>{mission.scenario}</p>
        </div>
        
        <div style={styles.choicesContainer}>
          <div style={styles.choicesLabel}>Your Options</div>
          {shuffledChoices.map((choice, index) => {
            const isSelected = selectedChoice?.id === choice.id;
            const showRisk = showFeedback && isSelected;
            
            return (
              <button
                key={choice.id}
                style={{
                  ...styles.choiceChip,
                  ...(isSelected && !showFeedback ? styles.choiceSelected : {}),
                  ...(showRisk ? 
                      (choice.risk === 'safe' ? styles.choiceSafe : 
                       choice.risk === 'risky' ? styles.choiceRisky : 
                       styles.choiceUnsafe) : {})
                }}
                onClick={() => !showFeedback && selectChoice(choice)}
                disabled={showFeedback}
                aria-label={`Choice ${index + 1}: ${choice.text}`}
              >
                <span style={styles.choiceNumber}>{index + 1}</span>
                <span style={styles.choiceText}>{choice.text}</span>
                {showRisk && (
                  <span style={styles.choiceIndicator}>
                    {choice.risk === 'safe' && <VisualRegistry.SafeIndicator />}
                    {choice.risk === 'risky' && <VisualRegistry.RiskyIndicator />}
                    {choice.risk === 'unsafe' && <VisualRegistry.UnsafeIndicator />}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {showFeedback && selectedChoice && (
          <div style={styles.feedbackPanel}>
            <div style={styles.feedbackHeader}>
              <span style={styles.feedbackIcon}>
                {selectedChoice.risk === 'safe' && <VisualRegistry.SafeIndicator />}
                {selectedChoice.risk === 'risky' && <VisualRegistry.RiskyIndicator />}
                {selectedChoice.risk === 'unsafe' && <VisualRegistry.UnsafeIndicator />}
              </span>
              <span>
                {selectedChoice.risk === 'safe' ? 'Safe Choice' :
                 selectedChoice.risk === 'risky' ? 'Risky Choice' :
                 'Unsafe Choice'}
              </span>
            </div>
            <p style={styles.feedbackText}>{selectedChoice.explanation}</p>
            
            {unlockedUpgrades.includes('reasoningPath') && (
              <div style={styles.reasoningBox}>
                <div style={styles.reasoningLabel}>Your Reasoning Pattern:</div>
                <p style={styles.reasoningText}>{selectedChoice.reasoning}</p>
              </div>
            )}
            
            {unlockedUpgrades.includes('threatModel') && selectedChoice.risk !== 'safe' && (
              <div style={styles.threatModelBox}>
                <div style={styles.threatHeader}>
                  <span style={styles.threatLabel}>Threat Analysis</span>
                  <button 
                    style={styles.toggleButton}
                    onClick={() => setShowThreatModel(!showThreatModel)}
                    aria-label="Toggle Threat Model"
                    >
                    {showThreatModel ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showThreatModel && (
                  <div style={styles.threatGrid}>
                    <div><strong>Actor:</strong> Malicious party impersonating trusted entity</div>
                    <div><strong>Intent:</strong> Steal information or gain unauthorized access</div>
                    <div><strong>Opportunity:</strong> Exploiting trust and urgency</div>
                    <div><strong>Impact:</strong> Potential data breach or financial loss</div>
                  </div>
                )}
              </div>
            )}
            
            {unlockedUpgrades.includes('signalAmplifier') && (
              <div style={styles.signalBox}>
                <div style={styles.signalLabel}>
                  <VisualRegistry.SignalAmplifier />
                  <span>Key Signals:</span>
                </div>
                <ul style={styles.signalList}>
                  {selectedChoice.hiddenCues.map((cue, idx) => (
                    <li key={idx}>{cue}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {currentZone >= 4 && mission.attackTactic && (
              <div style={styles.tacticBox}>
                <div style={styles.tacticHeader}>
                  <span style={styles.tacticLabel}>MITRE ATT&CK Tactic</span>
                  <button 
                    style={styles.toggleButton}
                    onClick={() => setShowTacticMapping(!showTacticMapping)}
                    aria-label="Toggle Tactic Mapping"
                  >
                    {showTacticMapping ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showTacticMapping && (
                  <div style={styles.tacticContent}>
                    <p style={styles.tacticName}>{mission.attackTactic}</p>
                    <p style={styles.tacticExplanation}>{mission.tacticExplanation}</p>
                    <p style={styles.tacticTakeaway}>
                      <strong>Defensive Takeaway:</strong> Awareness reduces opportunity. Recognition is your defense.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <button style={styles.continueButton} onClick={nextMission}>
              Continue
            </button>
          </div>
        )}
      </div>
    );
  };


  const renderPatternMatrix = () => {
    if (!unlockedUpgrades.includes('reasoningPath') || completedMissions.length < 3) return null;
    
    return (
      <div style={styles.patternMatrix}>
        <h4 style={styles.patternTitle}>Your Learning Patterns</h4>
        <div style={styles.patternGrid}>
          {patternInsights.verificationCount > 2 && (
            <div style={styles.patternItem}>
              <div style={styles.patternDot} />
              <span>You consistently verify information before acting</span>
            </div>
          )}
          {patternInsights.urgencyResistance > 1 && (
            <div style={styles.patternItem}>
              <div style={styles.patternDot} />
              <span>You recognize and resist pressure tactics</span>
            </div>
          )}
          {patternInsights.independentAction > 1 && (
            <div style={styles.patternItem}>
              <div style={styles.patternDot} />
              <span>You prefer independent verification channels</span>
            </div>
          )}
          {patternInsights.boundaryMaintenance > 1 && (
            <div style={styles.patternItem}>
              <div style={styles.patternDot} />
              <span>You maintain security boundaries under pressure</span>
            </div>
          )}
        </div>
      </div>
    );
  };


  const renderZoneComplete = () => (
    <div style={styles.completeContainer}>
      <div style={styles.completePanel}>
        <h2 style={styles.completeTitle}>Zone {currentZone} Complete</h2>
        <p style={styles.completeText}>
          You've successfully navigated this zone's challenges. Your cyber awareness is growing!
        </p>
        
        {renderPatternMatrix()}
        
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Missions Completed</span>
            <span style={styles.statValue}>{MISSIONS[`zone${currentZone}`].length}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Current Level</span>
            <span style={styles.statValue}>{playerLevel}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Resilience Score</span>
            <span style={styles.statValue}>{resilienceScore}%</span>
          </div>
        </div>
        {currentZone < 7 ? (
          <button style={styles.continueButton} onClick={nextZone}>
            Enter Zone {currentZone + 1}
          </button>
        ) : (
          <div style={styles.victoryMessage}>
            <h3 style={styles.victoryTitle}>Training Complete</h3>
            <p style={styles.victoryText}>
              You've mastered all seven zones and developed expert cyber awareness skills. 
              You now understand how to recognize threats, verify information, make safe decisions under ambiguity, and maintain boundaries under pressure.
            </p>
            <button style={styles.continueButton} onClick={() => {
              setCurrentZone(1);
              setCurrentMissionIndex(0);
              setGameState('playing');
            }}>
              Replay from Beginning
            </button>
          </div>
        )}
      </div>
    </div>
  );


  const renderUpgradeMenu = () => {
    if (!showUpgradeMenu) return null;
    
    return (
      <div style={styles.modal} onClick={() => setShowUpgradeMenu(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>Learning Milestones</h3>
            <button 
              style={styles.closeButton} 
              onClick={() => setShowUpgradeMenu(false)}
              aria-label="Close learning milestones"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line x1="6" y1="6" x2="18" y2="18" stroke="#00ffff" strokeWidth="2"/>
                <line x1="18" y1="6" x2="6" y2="18" stroke="#00ffff" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          <p style={styles.modalSubtext}>
            New ways of seeing unlock as you develop mastery. Current Level: {playerLevel}
          </p>
          <div style={styles.upgradeGrid}>
            {Object.values(UPGRADES).map(upgrade => {
              const IconComponent = VisualRegistry[upgrade.component];
              const isUnlocked = unlockedUpgrades.includes(upgrade.id);
              const isAvailableSoon = playerLevel === upgrade.unlockLevel - 1;
              
              return (
                <div 
                  key={upgrade.id}
                  style={{
                    ...styles.upgradeCard,
                    ...(isUnlocked ? styles.upgradeUnlocked : {}),
                    ...(isAvailableSoon ? styles.upgradeAvailableSoon : {})
                  }}
                >
                  <div style={styles.upgradeIcon}>
                    <IconComponent />
                  </div>
                  <h4 style={styles.upgradeName}>{upgrade.name}</h4>
                  <p style={styles.upgradeDesc}>{upgrade.description}</p>
                  <p style={styles.upgradeEffect}>{upgrade.effect}</p>
                  {isUnlocked ? (
                    <div style={styles.activeBadge}>Active</div>
                  ) : (
                    <div style={styles.lockedBadge}>
                      Unlocks at Level {upgrade.unlockLevel}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };


  const renderGlossary = () => {
    if (!showGlossary) return null;
    
    return (
      <div style={styles.modal} onClick={() => setShowGlossary(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>Knowledge Cache</h3>
            <button 
              style={styles.closeButton} 
              onClick={() => setShowGlossary(false)}
              aria-label="Close glossary"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line x1="6" y1="6" x2="18" y2="18" stroke="#00ffff" strokeWidth="2"/>
                <line x1="18" y1="6" x2="6" y2="18" stroke="#00ffff" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          <div style={styles.glossaryContainer}>
            {Object.values(GLOSSARY).map(entry => (
              <div key={entry.term} style={styles.glossaryEntry}>
                <h4 style={styles.glossaryTerm}>{entry.term}</h4>
                <p style={styles.glossaryDef}>{entry.definition}</p>
                <p style={styles.glossaryExample}><em>Example:</em> {entry.example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  const renderAttackLiteracy = () => {
    if (!showAttackLiteracy) return null;
    
    return (
      <div style={styles.modal} onClick={() => setShowAttackLiteracy(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>MITRE ATT&CK Literacy</h3>
            <button 
              style={styles.closeButton} 
              onClick={() => setShowAttackLiteracy(false)}
              aria-label="Close ATT&CK literacy panel"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line x1="6" y1="6" x2="18" y2="18" stroke="#00ffff" strokeWidth="2"/>
                <line x1="18" y1="6" x2="6" y2="18" stroke="#00ffff" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          
          <div style={styles.attackIntro}>
            <p style={styles.attackIntroText}>
              MITRE ATT&CK is a framework for understanding adversary behaviors. It helps defenders recognize patterns and anticipate risks.
            </p>
            <p style={styles.attackIntroText}>
              <strong>Important:</strong> This is a defensive awareness tool, not an attack guide. We focus on recognition and protection, not replication.
            </p>
          </div>
          
          <div style={styles.glossaryContainer}>
            {Object.values(ATTACK_TACTICS).map(tactic => (
              <div key={tactic.name} style={styles.glossaryEntry}>
                <h4 style={styles.glossaryTerm}>{tactic.name}</h4>
                <p style={styles.glossaryDef}>{tactic.description}</p>
                <p style={styles.attackTakeaway}>
                  <strong>Defensive Takeaway:</strong> {tactic.defensiveTakeaway}
                </p>
                <p style={styles.glossaryExample}>
                  <em>Recognition examples:</em> {tactic.examples.join(', ')}
                </p>
              </div>
            ))}
          </div>
          
          <div style={styles.attackFooter}>
            <p style={styles.attackFooterText}>
              Understanding these tactics helps you recognize intent and risk patterns. 
              Focus on awareness and verification as your primary defenses.
            </p>
          </div>
        </div>
      </div>
    );
  };


  // ============================================================================
  // MAIN RENDER - Application root
  // ============================================================================


  return (
    <div style={styles.app}>
      <div style={styles.cyberGrid} />
      
      {gameState === 'intro' && renderIntro()}
      
      {(gameState === 'playing' || gameState === 'zoneComplete') && (
        <>
          {renderHUD()}
          {renderNetNavi()}
          {gameState === 'playing' && renderMission()}
          {gameState === 'zoneComplete' && renderZoneComplete()}
          {renderUpgradeMenu()}
          {renderGlossary()}
          {renderAttackLiteracy()}
        </>
      )}
    </div>
  );
}


// ============================================================================
// STYLES - All component styling
// ============================================================================
// Responsive, accessible design with BN-inspired cyber aesthetic
// ============================================================================


const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    color: '#e0e6ff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'auto',
  },
  
  cyberGrid: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  
  introContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    position: 'relative',
    zIndex: 1,
  },
  
  introPanel: {
    background: 'rgba(15, 20, 40, 0.95)',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '16px',
    padding: '48px',
    maxWidth: '600px',
    boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)',
    textAlign: 'center',
  },
  
  logoContainer: {
    marginBottom: '32px',
  },
  
  logo: {
    marginBottom: '16px',
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))',
  },
  
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '16px 0 8px 0',
    background: 'linear-gradient(135deg, #00ffff, #0088ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  
  subtitle: {
    fontSize: '18px',
    color: '#00ffff',
    margin: 0,
    opacity: 0.8,
  },
  
  introContent: {
    margin: '32px 0',
  },
  
  introText: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '16px',
    color: '#b0c4de',
  },
  
  introFeatures: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '32px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  
  featureItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    padding: '16px',
    background: 'rgba(0, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
    minWidth: '120px',
  },
  
  startButton: {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '16px 48px',
    background: 'linear-gradient(135deg, #00ffff, #0088ff)',
    color: '#0a0e27',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 255, 255, 0.4)',
  },
  
  hud: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: 'rgba(15, 20, 40, 0.95)',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '12px',
    margin: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  
  hudLeft: {
    display: 'flex',
    gap: '24px',
  },
  
  hudRight: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  
  hudItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  
  hudIconLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  
  hudLabel: {
    fontSize: '12px',
    color: '#00ffff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  
  hudValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: '26px',
  },
  
  hudButton: {
    padding: '8px 16px',
    background: 'rgba(0, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '6px',
    color: '#00ffff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  },
  
  naviContainer: {
    position: 'relative',
    zIndex: 10,
    padding: '0 16px 16px',
  },
  
  naviPanel: {
    background: 'rgba(15, 20, 40, 0.95)',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 20px rgba(0, 255, 255, 0.2)',
  },
  
  naviHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  
  naviName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00ffff',
  },
  
  naviMessage: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#b0c4de',
    whiteSpace: 'pre-line',
  },
  
  unlockNotification: {
    marginTop: '16px',
    display: 'flex',
    gap: '16px',
    padding: '16px',
    background: 'rgba(0, 255, 255, 0.15)',
    border: '2px solid rgba(0, 255, 255, 0.5)',
    borderRadius: '12px',
    animation: 'unlockGlow 2s ease-in-out',
  },
  
  unlockIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  
  unlockContent: {
    flex: 1,
  },
  
  unlockTitle: {
    fontSize: '12px',
    color: '#00ffff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  
  unlockName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '4px',
  },
  
  unlockEffect: {
    fontSize: '14px',
    color: '#b0c4de',
    fontStyle: 'italic',
  },
  
  missionContainer: {
    position: 'relative',
    zIndex: 10,
    padding: '0 16px 16px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  
  missionHeader: {
    marginBottom: '24px',
  },
  
  missionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#fff',
  },
  
  missionDescription: {
    fontSize: '16px',
    color: '#b0c4de',
    margin: 0,
  },
  
  scenarioPanel: {
    position: 'relative',
    background: 'rgba(15, 20, 40, 0.95)',
    border: '2px solid rgba(100, 150, 255, 0.3)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    overflow: 'hidden',
  },
  
  scanlineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03), rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 2px)',
    pointerEvents: 'none',
  },
  
  scenarioLabel: {
    position: 'relative',
    fontSize: '12px',
    color: '#6495ff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
    fontWeight: 'bold',
  },
  
  scenarioText: {
    position: 'relative',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: 0,
    color: '#e0e6ff',
  },
  
  choicesContainer: {
    marginBottom: '24px',
  },
  
  choicesLabel: {
    fontSize: '14px',
    color: '#00ffff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '16px',
    fontWeight: 'bold',
  },
  
  choiceChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    padding: '20px',
    marginBottom: '12px',
    background: 'rgba(15, 20, 40, 0.95)',
    border: '2px solid rgba(150, 150, 150, 0.3)',
    borderRadius: '12px',
    color: '#e0e6ff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    position: 'relative',
  },
  
  choiceSelected: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    background: 'rgba(25, 30, 50, 0.95)',
    transform: 'translateX(4px)',
  },
  
  choiceSafe: {
    borderColor: 'rgba(0, 255, 150, 0.7)',
    background: 'rgba(0, 50, 30, 0.5)',
    boxShadow: '0 0 20px rgba(0, 255, 150, 0.3)',
  },
  
  choiceRisky: {
    borderColor: 'rgba(255, 200, 0, 0.7)',
    background: 'rgba(50, 40, 0, 0.5)',
    boxShadow: '0 0 20px rgba(255, 200, 0, 0.3)',
  },
  
  choiceUnsafe: {
    borderColor: 'rgba(255, 100, 100, 0.7)',
    background: 'rgba(50, 20, 20, 0.5)',
    boxShadow: '0 0 20px rgba(255, 100, 100, 0.3)',
  },
  
  choiceNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    background: 'rgba(0, 255, 255, 0.2)',
    border: '1px solid rgba(0, 255, 255, 0.5)',
    borderRadius: '50%',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  
  choiceText: {
    flex: 1,
    lineHeight: '1.4',
  },
  
  choiceIndicator: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  
  feedbackPanel: {
    background: 'rgba(15, 20, 40, 0.95)',
    border: '2px solid rgba(0, 255, 255, 0.4)',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 30px rgba(0, 255, 255, 0.2)',
  },
  
  feedbackHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#00ffff',
  },
  
  feedbackIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  
  feedbackText: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#e0e6ff',
  },
  
  reasoningBox: {
    background: 'rgba(100, 150, 255, 0.1)',
    border: '1px solid rgba(100, 150, 255, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  
  reasoningLabel: {
    fontSize: '14px',
    color: '#6495ff',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  
  reasoningText: {
    fontSize: '15px',
    margin: 0,
    color: '#b0c4de',
    fontStyle: 'italic',
  },
  
  threatModelBox: {
    background: 'rgba(255, 100, 100, 0.1)',
    border: '1px solid rgba(255, 100, 100, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  
  threatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  
  threatLabel: {
    fontSize: '14px',
    color: '#ff6464',
    fontWeight: 'bold',
  },
  
  toggleButton: {
    padding: '4px 12px',
    background: 'rgba(255, 100, 100, 0.2)',
    border: '1px solid rgba(255, 100, 100, 0.4)',
    borderRadius: '4px',
    color: '#ff6464',
    cursor: 'pointer',
    fontSize: '12px',
  },
  
  threatGrid: {
    display: 'grid',
    gap: '8px',
    fontSize: '14px',
    color: '#e0e6ff',
  },
  
  signalBox: {
    background: 'rgba(0, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  
  signalLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#00ffff',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  
  signalList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#b0c4de',
    lineHeight: '1.6',
  },
  
  continueButton: {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #00ffff, #0088ff)',
    color: '#0a0e27',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '8px',
  },
  
  completeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)',
    padding: '20px',
    position: 'relative',
    zIndex: 10,
  },
  
  completePanel: {
    background: 'rgba(15, 20, 40, 0.95)',
    border: '2px solid rgba(0, 255, 255, 0.4)',
    borderRadius: '16px',
    padding: '48px',
    maxWidth: '600px',
    textAlign: 'center',
    boxShadow: '0 0 50px rgba(0, 255, 255, 0.3)',
  },
  
  completeTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0 0 16px 0',
    color: '#00ffff',
  },
  
  completeText: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '32px',
    color: '#b0c4de',
  },
  
  patternMatrix: {
    background: 'rgba(0, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '32px',
    textAlign: 'left',
  },
  
  patternTitle: {
    fontSize: '18px',
    color: '#00ffff',
    margin: '0 0 16px 0',
    fontWeight: 'bold',
  },
  
  patternGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  
  patternItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#b0c4de',
  },
  
  patternDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00ffff',
    flexShrink: 0,
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    background: 'rgba(0, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
  },
  
  statLabel: {
    fontSize: '12px',
    color: '#00ffff',
    textTransform: 'uppercase',
  },
  
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  
  victoryMessage: {
    marginTop: '24px',
  },
  
  victoryTitle: {
    fontSize: '28px',
    margin: '0 0 16px 0',
    color: '#00ffff',
  },
  
  victoryText: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '24px',
    color: '#b0c4de',
  },
  
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    padding: '20px',
    overflowY: 'auto',
  },
  
  modalContent: {
    background: 'rgba(15, 20, 40, 0.98)',
    border: '2px solid rgba(0, 255, 255, 0.4)',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 0 60px rgba(0, 255, 255, 0.4)',
  },
  
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  
  modalTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    color: '#00ffff',
  },
  
  modalSubtext: {
    fontSize: '16px',
    color: '#b0c4de',
    marginBottom: '24px',
    textAlign: 'center',
  },
  
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#00ffff',
    cursor: 'pointer',
    padding: '0',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  upgradeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  
  upgradeCard: {
    background: 'rgba(25, 30, 50, 0.8)',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  
  upgradeOwned: {
    borderColor: 'rgba(0, 255, 150, 0.5)',
    background: 'rgba(0, 50, 30, 0.3)',
  },
  
  upgradeUnlocked: {
    borderColor: 'rgba(0, 255, 150, 0.5)',
    background: 'rgba(0, 50, 30, 0.3)',
  },
  
  upgradeAvailableSoon: {
    borderColor: 'rgba(255, 200, 0, 0.4)',
    background: 'rgba(50, 40, 0, 0.2)',
  },
  
  upgradeIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
  },
  
  upgradeName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    color: '#fff',
    textAlign: 'center',
  },
  
  upgradeDesc: {
    fontSize: '14px',
    color: '#b0c4de',
    margin: 0,
    lineHeight: '1.4',
  },
  
  upgradeEffect: {
    fontSize: '13px',
    color: '#00ffff',
    margin: 0,
    fontStyle: 'italic',
  },
  
  activeBadge: {
    padding: '10px',
    background: 'rgba(0, 255, 150, 0.2)',
    border: '1px solid rgba(0, 255, 150, 0.5)',
    borderRadius: '6px',
    color: '#00ff96',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  
  lockedBadge: {
    padding: '10px',
    background: 'rgba(100, 100, 100, 0.2)',
    border: '1px solid rgba(100, 100, 100, 0.4)',
    borderRadius: '6px',
    color: '#999',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  
  glossaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  
  glossaryEntry: {
    background: 'rgba(25, 30, 50, 0.8)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '20px',
  },
  
  glossaryTerm: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#00ffff',
  },
  
  glossaryDef: {
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 12px 0',
    color: '#e0e6ff',
  },
  
  glossaryExample: {
    fontSize: '14px',
    color: '#b0c4de',
    margin: 0,
    lineHeight: '1.5',
  },
  
  tacticBox: {
    background: 'rgba(0, 200, 255, 0.1)',
    border: '1px solid rgba(0, 200, 255, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  
  tacticHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  
  tacticLabel: {
    fontSize: '14px',
    color: '#00ccff',
    fontWeight: 'bold',
  },
  
  tacticContent: {
    fontSize: '14px',
    color: '#e0e6ff',
  },
  
  tacticName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00ffff',
    margin: '0 0 8px 0',
  },
  
  tacticExplanation: {
    margin: '0 0 12px 0',
    lineHeight: '1.5',
  },
  
  tacticTakeaway: {
    margin: 0,
    fontStyle: 'italic',
    color: '#b0c4de',
  },
  
  attackIntro: {
    background: 'rgba(0, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
  },
  
  attackIntroText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#e0e6ff',
    margin: '0 0 12px 0',
  },
  
  attackTakeaway: {
    fontSize: '14px',
    color: '#00ffff',
    margin: '8px 0',
    padding: '8px 0',
    borderTop: '1px solid rgba(0, 255, 255, 0.2)',
  },
  
  attackFooter: {
    background: 'rgba(0, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '24px',
  },
  
  attackFooterText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#b0c4de',
    margin: 0,
  },
};