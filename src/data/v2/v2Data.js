/*
 * CyberOps Defense Trainer V2
 * Expanded learning data
 */

export const v2Topics = [
  ["Network Security","Networks, protocols, segmentation and secure communication"],
  ["Network Attacks","Common attacks against enterprise networks"],
  ["Firewalls","Traffic filtering and firewall policy design"],
  ["IDS and IPS","Detecting and blocking suspicious traffic"],
  ["SIEM","Collecting and investigating security events"],
  ["Log Analysis","Reading logs and finding useful evidence"],
  ["Incident Response","Responding to security incidents"],
  ["Digital Forensics","Collecting and examining digital evidence"],
  ["Malware","Understanding malicious software"],
  ["Ransomware","Understanding ransomware attacks and defenses"],
  ["Phishing","Recognizing and preventing phishing attacks"],
  ["Social Engineering","Human-focused attack techniques"],
  ["Password Security","Passwords, authentication and credential attacks"],
  ["Multi-Factor Authentication","Using multiple authentication factors"],
  ["Identity Security","Managing accounts and permissions"],
  ["Access Control","Controlling access to systems and data"],
  ["Least Privilege","Reducing unnecessary permissions"],
  ["Endpoint Security","Protecting computers and workstations"],
  ["Windows Security","Important Windows security concepts"],
  ["Linux Security","Important Linux security concepts"],
  ["Active Directory","Identity and administration in Windows domains"],
  ["Cloud Security","Security principles for cloud environments"],
  ["AWS Security","Security concepts for AWS environments"],
  ["Azure Security","Security concepts for Azure environments"],
  ["Container Security","Protecting containers and images"],
  ["Web Security","Protecting web applications"],
  ["OWASP Concepts","Common web application security weaknesses"],
  ["API Security","Protecting APIs and service interfaces"],
  ["SQL Injection","Understanding injection risks and defenses"],
  ["Cross-Site Scripting","Understanding XSS and defensive controls"],
  ["Secure Coding","Building safer software"],
  ["Vulnerability Management","Finding, prioritizing and fixing weaknesses"],
  ["Patch Management","Keeping systems updated"],
  ["Threat Intelligence","Using threat information for defense"],
  ["Security Monitoring","Building useful security monitoring"],
  ["Security Operations","SOC processes and daily operations"],
  ["Security Policies","Creating and maintaining security rules"],
  ["Risk Management","Understanding and reducing security risk"],
  ["Security Architecture","Designing layered security"],
  ["Zero Trust","Identity and access based security"],
  ["Encryption","Protecting information with cryptography"],
  ["PKI","Certificates, trust and public key infrastructure"],
  ["Secure Email","Protecting email systems and users"],
  ["DNS Security","Understanding DNS risks and protection"],
  ["VPN Security","Secure remote connectivity"],
  ["Wireless Security","Protecting wireless networks"],
  ["Mobile Security","Protecting mobile devices"],
  ["Backup Security","Protecting backups and recovery"],
  ["Business Continuity","Keeping services available during incidents"],
  ["Security Awareness","Building safer user behavior"],
  ["Cybersecurity Careers","SOC, blue team and security roles"],
  ["Security Testing","Testing controls and finding weaknesses"]
];

const phase1Templates = [
  {
    name: "Learn the basics",
    body: "Start with the main ideas, terminology and purpose of this security area. Focus on what the technology protects, what can go wrong and where defenders normally place controls.",
    example: "Example: A security team first identifies the system, its users, its data and the trust boundaries before choosing controls.",
    defense: "Defensive focus: know the normal design before trying to detect abnormal behavior.",
    takeaways: ["Know the purpose", "Know common risks", "Know the main controls"]
  },
  {
    name: "Understand the attack path",
    body: "Study how an attacker may move from an initial weakness to a useful result. Break the path into entry, execution, access, movement and impact.",
    example: "Example: A stolen account may allow initial access, followed by privilege abuse and access to sensitive resources.",
    defense: "Defensive focus: create controls at several points so one failed control does not expose the whole environment.",
    takeaways: ["Identify entry points", "Understand attacker movement", "Use layered controls"]
  },
  {
    name: "Detection and response",
    body: "Learn which events defenders should monitor and what evidence can help confirm suspicious activity.",
    example: "Example: An unusual login followed by permission changes and access to many files may require investigation.",
    defense: "Defensive focus: collect useful logs, create sensible alerts and document response steps.",
    takeaways: ["Collect evidence", "Reduce false positives", "Respond consistently"]
  }
];

const phase2Templates = [
  ["What is the main purpose of this security area?","Its purpose is to reduce risk by protecting systems, users, services or information from misuse and failure."],
  ["What should a defender understand first?","The defender should understand the normal architecture, users, data flows and expected behavior."],
  ["What is a common security mistake?","A common mistake is relying on one control instead of using multiple layers of protection."],
  ["Why are logs important?","Logs provide evidence about authentication, system activity, configuration changes and possible attacks."],
  ["What should happen after suspicious activity is detected?","The event should be validated, its scope should be determined, evidence should be preserved and appropriate response actions should follow."],
  ["How can risk be reduced?","Risk can be reduced through prevention, detection, response, recovery and regular improvement."],
  ["Why is least privilege useful?","It limits what an account can do if the account is misused or compromised."],
  ["Why should security controls be tested?","Testing shows whether controls actually work under expected and unexpected conditions."],
  ["What is defense in depth?","Defense in depth means using multiple independent controls so one failure does not cause complete compromise."],
  ["Why is documentation important?","Documentation gives defenders a consistent reference for configuration, investigation and response."]
];

const quizTemplates = [
  ["Which approach provides stronger protection?","Using several security controls together","Using one security product","Ignoring low-risk systems","Only monitoring after an incident",0],
  ["What should a defender compare suspicious activity against?","Known normal behavior","Random activity","Old passwords","User opinions",0],
  ["What is the safest permission model?","Least privilege","Everyone is administrator","Shared administrator account","No authentication",0],
  ["What is useful during an investigation?","Reliable logs and evidence","Deleted logs","Unverified rumors","Changing evidence",0],
  ["What is defense in depth?","Multiple layers of protection","One firewall only","One password","No monitoring",0]
];

function buildTopic(id, pair) {
  const [name, description] = pair;

  return {
    id,
    name,
    description,

    phase1: phase1Templates.map((p, i) => ({
      title: `${p.name}: ${name}`,
      content: `${p.body} This lesson applies these ideas to ${name}. ${description}`,
      example: `${p.example} In ${name}, the same principle should be applied to real systems and documented workflows.`,
      defense: p.defense,
      takeaways: p.takeaways
    })),

    phase2: phase2Templates.map((q, i) => ({
      question: q[0].replace("this security area", name.toLowerCase()),
      answer: `${q[1]} For ${name}, apply this by understanding the system design, monitoring important events and reviewing controls regularly.`
    })),

    phase3: [
      ...quizTemplates.map((q, i) => ({
        question: `${q[0]} (${name})`,
        options: q.slice(1,5),
        answer: q[5],
        explanation: `The correct approach is the one that improves prevention, detection or response without creating unnecessary risk.`
      })),
      {
        question: `Which defensive action is most useful when working with ${name}?`,
        options: [
          "Understand normal behavior and monitor important changes",
          "Disable all logging",
          "Give every user administrator access",
          "Ignore unusual events"
        ],
        answer: 0,
        explanation: "Defenders need visibility into normal and abnormal behavior."
      },
      {
        question: `What should be reviewed regularly for ${name}?`,
        options: [
          "Security controls and evidence",
          "Only the application logo",
          "Only the computer wallpaper",
          "Nothing after deployment"
        ],
        answer: 0,
        explanation: "Security controls must be reviewed because systems, threats and business requirements change."
      }
    ]
  };
}

export const curriculumV2 = v2Topics.map((topic, i) => buildTopic(i + 1, topic));

/* ---------------------------------------------------------
   BOOKS
--------------------------------------------------------- */

const bookSubjects = [
  ["Network Defense","Network architecture, protocols, segmentation, firewalls and monitoring"],
  ["SOC Operations","SOC processes, alerts, investigations, escalation and reporting"],
  ["Incident Response","Preparation, detection, containment, recovery and lessons learned"],
  ["Digital Forensics","Evidence handling, timelines, artifacts and investigation methods"],
  ["Malware Defense","Malware behavior, prevention, detection and response"],
  ["Identity and Access","Authentication, authorization, MFA, roles and least privilege"],
  ["Cloud Security","Cloud identity, logging, configuration and workload protection"],
  ["Web and API Security","Web applications, APIs, common weaknesses and secure development"],
  ["Security Monitoring","Logs, SIEM, detection rules, alert quality and investigation"],
  ["Security Fundamentals","Core defensive principles, risk, policies and security architecture"]
];

const chapterNames = [
  "Foundations",
  "Architecture",
  "Core Concepts",
  "Common Attacks",
  "Detection",
  "Defense",
  "Monitoring",
  "Incident Example",
  "Practical Review",
  "Final Assessment"
];

export const booksV2 = bookSubjects.map((book, bookIndex) => {
  const [title, subject] = book;

  return {
    id: bookIndex + 1,
    title,
    description: subject,
    chapters: chapterNames.map((chapter, chapterIndex) => ({
      number: chapterIndex + 1,
      title: `${chapter}: ${title}`,
      content: `This chapter explains ${subject}. It focuses on ${chapter.toLowerCase()} and shows how defenders can apply the ideas in a real security environment. A good study approach is to identify the asset, understand the normal behavior, identify likely abuse and then choose prevention, detection and response controls.`,
      example: `Practical example: A security team reviews a ${title.toLowerCase()} process after an unusual event. The team records what happened, identifies the affected systems, checks available evidence and improves the relevant controls.`,
      defense: `Defensive considerations: use least privilege, maintain useful logs, keep systems updated, review configuration, test controls and document response procedures.`,
      review: [
        `What is the main purpose of ${chapter.toLowerCase()} in ${title}?`,
        `Which evidence would help investigate a problem?`,
        `Which control could reduce the risk?`
      ],
      keyTakeaways: [
        "Understand the normal state",
        "Identify realistic attack paths",
        "Use layered controls",
        "Monitor important events",
        "Review and improve security"
      ]
    }))
  };
});

/* ---------------------------------------------------------
   REVISION DECK
--------------------------------------------------------- */

export const revisionV2 = [];

curriculumV2.forEach(topic => {
  topic.phase2.forEach(item => {
    revisionV2.push({
      topic: topic.name,
      question: item.question,
      answer: item.answer,
      source: "Curriculum"
    });
  });
});

booksV2.forEach(book => {
  book.chapters.forEach(chapter => {
    chapter.review.forEach(question => {
      revisionV2.push({
        topic: book.title,
        question,
        answer: chapter.defense,
        source: "Knowledge Book"
      });
    });
  });
});

/* ---------------------------------------------------------
   THREAT INTELLIGENCE
--------------------------------------------------------- */

const threatNames = [
  "Credential theft campaigns",
  "Ransomware activity",
  "Malicious email attachments",
  "Remote access abuse",
  "Web application attacks",
  "Cloud account compromise",
  "Supply-chain compromise",
  "Data theft activity",
  "Exposed remote services",
  "Malicious PowerShell activity",
  "Browser credential theft",
  "Phishing login pages",
  "API abuse",
  "Vulnerable internet-facing services",
  "Malicious scheduled tasks",
  "Endpoint malware",
  "Identity abuse",
  "Suspicious DNS activity",
  "Unauthorized privilege changes",
  "Backup targeting",
  "Lateral movement",
  "Command-and-control traffic",
  "Malicious scripts",
  "Insider misuse indicators",
  "Unusual cloud administration",
  "Exposed secrets",
  "Weak authentication",
  "Unauthorized software",
  "Security control tampering",
  "Large outbound transfers"
];

export const threatsV2 = threatNames.map((name, i) => ({
  id: i + 1,
  title: name,
  severity: i % 4 === 0 ? "High" : i % 3 === 0 ? "Medium" : "Low",
  summary: `${name} can indicate an attempt to gain access, maintain access, steal information or disrupt systems. Security teams should investigate the surrounding activity rather than relying on one event alone.`,
  affected: ["Endpoints", "User accounts", "Servers", "Cloud services"].slice(0, 2 + (i % 3)),
  attackMethod: [
    "Credential abuse",
    "Malicious files",
    "Exploitation",
    "Social engineering",
    "Unauthorized access"
  ][i % 5],
  impact: [
    "Account compromise",
    "Data exposure",
    "Service disruption",
    "Privilege abuse",
    "Unauthorized access"
  ][i % 5],
  defense: [
    "Use MFA and least privilege",
    "Keep systems patched",
    "Monitor authentication events",
    "Review endpoint alerts",
    "Maintain tested backups"
  ][i % 5]
}));

/* ---------------------------------------------------------
   LABS
--------------------------------------------------------- */

const labNames = [
  "Read a Security Log",
  "Find a Suspicious Login",
  "Build a Firewall Rule",
  "Investigate a Phishing Email",
  "Review User Permissions",
  "Identify a Malware Indicator",
  "Analyze DNS Activity",
  "Investigate a Web Alert",
  "Review Endpoint Events",
  "Create a Simple Detection Rule",
  "Plan Incident Containment",
  "Check Backup Readiness"
];

export const labsV2 = labNames.map((name, i) => ({
  id: i + 1,
  title: name,
  level: i < 4 ? "Beginner" : i < 8 ? "Intermediate" : "Advanced",
  objective: `Practice ${name.toLowerCase()} using a simple defensive workflow.`,
  scenario: `You are working as a defender. A security event related to ${name.toLowerCase()} has been reported. Review the available information, identify the important evidence and decide what should happen next.`,
  steps: [
    "Identify the affected system or account.",
    "Separate normal activity from unusual activity.",
    "Record useful evidence.",
    "Choose an appropriate defensive action.",
    "Document the result."
  ],
  expected: "The learner should identify the important evidence, explain the risk and choose a reasonable defensive action."
}));

/* ---------------------------------------------------------
   MISSIONS
--------------------------------------------------------- */

const missionNames = [
  "Protect a Small Office",
  "Improve Account Security",
  "Build a Basic SOC Process",
  "Respond to a Phishing Report",
  "Investigate a Suspicious Login",
  "Prepare for Ransomware",
  "Improve Endpoint Monitoring",
  "Secure a Cloud Account",
  "Review a Web Application",
  "Prepare an Incident Response Plan",
  "Improve Backup Protection",
  "Complete a Security Review"
];

export const missionsV2 = missionNames.map((name, i) => ({
  id: i + 1,
  title: name,
  description: `Complete a defensive security task focused on ${name.toLowerCase()}.`,
  objectives: [
    "Understand the situation",
    "Identify important risks",
    "Choose defensive controls",
    "Verify the controls",
    "Write a short security conclusion"
  ],
  reward: 50 + i * 10
}));

export const v2Stats = {
  topics: curriculumV2.length,
  books: booksV2.length,
  chapters: booksV2.reduce((n, b) => n + b.chapters.length, 0),
  revisionQuestions: revisionV2.length,
  threats: threatsV2.length,
  labs: labsV2.length,
  missions: missionsV2.length
};
