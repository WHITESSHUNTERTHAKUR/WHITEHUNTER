const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  'Network Forensics & Wireshark',
  'Endpoint Security & Windows Internals',
  'Linux Security & Bash Hardening',
  'Web Application Security & OWASP',
  'SOC Triage, SIEM & Log Analysis',
  'Incident Response & Malware Forensics',
  'Cloud Security & IAM Defense',
  'Cryptography & Protocol Hardening'
];

const LAB_TEMPLATES = [
  // 1. Network Forensics & Wireshark (13 labs)
  {
    cat: 'Network Forensics & Wireshark',
    title: 'Wireshark TCP 3-Way Handshake & SYN Flood Analysis',
    diff: 'Beginner',
    time: '15 min',
    xp: 150,
    briefing: 'Sensors at the enterprise edge triggered high connection alert rates. Analyze the captured PCAP trace showing thousands of SYN packets without ACK completion, identify the target service port, attack signature, and calculate packet rates.',
    telemetry: `Frame 1: 198.51.100.22:49152 -> 10.0.0.5:80 TCP 66 [SYN] Seq=0 Win=1024 Len=0
Frame 2: 198.51.100.23:49153 -> 10.0.0.5:80 TCP 66 [SYN] Seq=0 Win=1024 Len=0
Frame 3: 10.0.0.5:80 -> 198.51.100.22:49152 TCP 66 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0
Frame 4: [TCP Retransmission] 10.0.0.5:80 -> 198.51.100.22:49152 [SYN, ACK]
Status: Half-open backlog queue exhausted on target 10.0.0.5:80.`,
    tasks: [
      { prompt: 'What specific TCP flag combination initiates a normal TCP connection handshake?', expected: 'SYN', accepted: ['SYN', 'synchronize'], hint: 'First packet flag sent by client.' },
      { prompt: 'What TCP flag does the server respond with to acknowledge the initial request?', expected: 'SYN-ACK', accepted: ['SYN-ACK', 'SYN, ACK', 'SYN ACK'], hint: 'Both synchronize and acknowledgment flags combined.' },
      { prompt: 'What port on the target host (10.0.0.5) is being saturated by the SYN flood?', expected: '80', accepted: ['80', 'HTTP', 'port 80'], hint: 'Standard unencrypted web port.' },
      { prompt: 'What kernel mechanism can be enabled on Linux servers to defend against TCP SYN floods?', expected: 'SYN Cookies', accepted: ['SYN Cookies', 'syncookies', 'tcp_syncookies'], hint: 'Cryptographic hashing of initial sequence numbers without memory allocation.' },
      { prompt: 'Which command displays active half-open SYN_RECV sockets in Linux terminal?', expected: 'netstat -ant | grep SYN_RECV', accepted: ['SYN_RECV', 'netstat', 'ss'], hint: 'Search socket status for SYN_RECV.' },
      { prompt: 'What state does the TCP connection remain stuck in during this attack?', expected: 'SYN_RECV', accepted: ['SYN_RECV', 'SYN-RECEIVED', 'half-open'], hint: 'Server waiting for the final client ACK.' }
    ],
    remediation: 'Enable net.ipv4.tcp_syncookies=1 in /etc/sysctl.conf, deploy rate-limiting on edge firewall using iptables hashlimit or Cloudflare/AWS Shield DDoS protection.'
  }
];

console.log('Script initialized...');
