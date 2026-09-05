export interface SortItem {
  id: string;
  name: string;
  category: 'Input Devices' | 'Output Devices' | 'Storage Devices' | 'Tools & Safety';
  iconType: string;
}

export const SORT_ITEMS: SortItem[] = [
  { id: 's1', name: 'Mechanical Keyboard', category: 'Input Devices', iconType: 'keyboard' },
  { id: 's2', name: 'Optical Mouse', category: 'Input Devices', iconType: 'mouse' },
  { id: 's3', name: 'Flatbed Scanner', category: 'Input Devices', iconType: 'scan' },
  { id: 's4', name: 'Webcam 1080p', category: 'Input Devices', iconType: 'camera' },
  { id: 's5', name: 'Bar Code Reader', category: 'Input Devices', iconType: 'barcode' },
  
  { id: 's6', name: 'LED Monitor', category: 'Output Devices', iconType: 'monitor' },
  { id: 's7', name: 'LaserJet Printer', category: 'Output Devices', iconType: 'printer' },
  { id: 's8', name: 'Studio Speakers', category: 'Output Devices', iconType: 'speaker' },
  { id: 's9', name: 'Multimedia Projector', category: 'Output Devices', iconType: 'projector' },
  { id: 's10', name: 'Headphones', category: 'Output Devices', iconType: 'headphones' },

  { id: 's11', name: 'NVMe M.2 SSD', category: 'Storage Devices', iconType: 'hard-drive' },
  { id: 's12', name: '3.5" SATA HDD', category: 'Storage Devices', iconType: 'disc' },
  { id: 's13', name: 'USB Flash Drive 64GB', category: 'Storage Devices', iconType: 'usb' },
  { id: 's14', name: 'External Backup Drive', category: 'Storage Devices', iconType: 'database' },
  { id: 's15', name: 'MicroSD Memory Card', category: 'Storage Devices', iconType: 'sd-card' },

  { id: 's16', name: 'Phillips #2 Screwdriver', category: 'Tools & Safety', iconType: 'wrench' },
  { id: 's17', name: 'Anti-Static Wrist Strap', category: 'Tools & Safety', iconType: 'shield' },
  { id: 's18', name: 'RJ45 Cable Tester', category: 'Tools & Safety', iconType: 'activity' },
  { id: 's19', name: 'Digital Multimeter', category: 'Tools & Safety', iconType: 'gauge' },
  { id: 's20', name: 'Thermal Paste Syringe', category: 'Tools & Safety', iconType: 'droplet' },
];

export const CODE_CRACKER_QUESTIONS = [
  {
    question: '1. Which storage device uses non-volatile flash memory and has no moving mechanical parts?',
    options: ['RAM', 'SSD', 'CPU', 'Power Supply'],
    correctIndex: 1, // SSD -> Code digit: 4
    digitRevealed: '4',
    hint: 'Solid State Drive provides high-speed permanent storage.'
  },
  {
    question: '2. What is the standard DC voltage supplied by the yellow wires on an ATX power connector for high-draw components?',
    options: ['+3.3V', '+5V', '+12V', '-12V'],
    correctIndex: 2, // +12V -> Code digit: 8
    digitRevealed: '8',
    hint: 'Yellow ATX wires power the CPU VRM and GPU PCIe rails.'
  },
  {
    question: '3. Which memory module type loses its stored information immediately when power is turned off?',
    options: ['ROM', 'RAM', 'NVMe SSD', 'BIOS EEPROM'],
    correctIndex: 1, // RAM -> Code digit: 2
    digitRevealed: '2',
    hint: 'Random Access Memory is volatile working memory.'
  },
  {
    question: '4. In CompTIA troubleshooting, how many standard steps are defined in the systematic diagnostic model?',
    options: ['Three', 'Four', 'Six', 'Ten'],
    correctIndex: 2, // Six -> Code digit: 6
    digitRevealed: '6',
    hint: 'Identify, Theory, Test, Plan/Action, Verify, Document (6 steps).'
  }
];

export interface SearchTarget {
  id: string;
  name: string;
  description: string;
  bbox: { x: number; y: number; width: number; height: number }; // percentage coords
}

export const WORKSPACE_OBJECTS: SearchTarget[] = [
  { id: 'ram', name: 'RAM Sticks', description: 'Dual DDR4 memory modules with gold contacts', bbox: { x: 12, y: 18, width: 14, height: 22 } },
  { id: 'cpu', name: 'CPU Processor', description: 'Square processor with integrated heat spreader', bbox: { x: 38, y: 22, width: 12, height: 16 } },
  { id: 'motherboard', name: 'Motherboard PCB', description: 'Main printed circuit board with chipset & sockets', bbox: { x: 28, y: 15, width: 44, height: 50 } },
  { id: 'sata', name: 'SATA Data Cable', description: 'Red flat 7-pin data transmission cable', bbox: { x: 74, y: 28, width: 14, height: 18 } },
  { id: 'power_cable', name: '24-Pin ATX Power Cable', description: 'Thick bundled power harness with 24 colored wires', bbox: { x: 70, y: 55, width: 16, height: 20 } },
  { id: 'screwdriver', name: 'Magnetic Screwdriver', description: 'Phillips head insulated assembly tool', bbox: { x: 8, y: 68, width: 18, height: 16 } },
  { id: 'ssd', name: '2.5" Solid State Drive', description: 'SATA SSD enclosure with serial port', bbox: { x: 32, y: 72, width: 15, height: 18 } },
  { id: 'hdd', name: '3.5" Mechanical Hard Disk', description: 'Heavy metal HDD with platter spindle', bbox: { x: 50, y: 72, width: 18, height: 20 } },
  { id: 'cooling_fan', name: 'CPU Cooler / Fan', description: 'Heatsink with radial fan blades', bbox: { x: 40, y: 38, width: 14, height: 18 } },
  { id: 'network_cable', name: 'RJ-45 Network Cable', description: 'Blue twisted-pair Ethernet patch cord', bbox: { x: 78, y: 78, width: 16, height: 16 } },
];

export const INSTALLATION_LEVELS = [
  {
    level: 1,
    title: 'Core Hardware Assembly Order',
    steps: [
      { id: 's1', text: '1. Prepare clean, ESD-safe workstation and wear anti-static wrist strap' },
      { id: 's2', text: '2. Install CPU into motherboard socket and close retention latch' },
      { id: 's3', text: '3. Apply thermal paste and mount CPU cooler firmly' },
      { id: 's4', text: '4. Insert RAM modules into dual-channel DIMM slots until clips snap' },
      { id: 's5', text: '5. Install I/O shield and secure motherboard onto case standoffs' },
      { id: 's6', text: '6. Install Power Supply Unit (PSU) and route main power cables' },
      { id: 's7', text: '7. Mount storage drives and connect SATA data/power lines' },
      { id: 's8', text: '8. Close case side panels, connect monitor/power, and run initial POST' }
    ]
  },
  {
    level: 2,
    title: 'Post-Assembly & Software Setup Order',
    steps: [
      { id: 'p1', text: '1. Power on computer and press DEL/F2 to access UEFI/BIOS Setup' },
      { id: 'p2', text: '2. Verify recognized CPU model, RAM capacity, and drive detections' },
      { id: 'p3', text: '3. Set USB installation media as primary boot device' },
      { id: 'p4', text: '4. Save settings and boot into Operating System Setup Wizard' },
      { id: 'p5', text: '5. Partition target SSD and complete OS installation' },
      { id: 'p6', text: '6. Install official Motherboard Chipset, Audio, and LAN drivers' },
      { id: 'p7', text: '7. Install Dedicated Graphics Card Display Drivers' },
      { id: 'p8', text: '8. Execute stress testing (MemTest86 / Prime95) to verify stability' }
    ]
  }
];

export const FLASHCARDS_DATA = [
  {
    id: 'f1',
    question: 'What does RAM do in a computer system?',
    answer: 'RAM (Random Access Memory) provides high-speed, volatile temporary workspace for the CPU to hold active program instructions and currently open data files.',
    category: 'Hardware'
  },
  {
    id: 'f2',
    question: 'Why is thermal paste required between the CPU and cooler?',
    answer: 'Thermal paste fills microscopic air pockets between the metal heat spreader of the CPU and the cooler baseplate, ensuring efficient thermal conductivity and preventing overheat throttling.',
    category: 'Assembly'
  },
  {
    id: 'f3',
    question: 'What is the function of the CMOS battery on the motherboard?',
    answer: 'The 3V CR2032 lithium coin cell provides continuous low-power to the Real-Time Clock (RTC) and CMOS memory, retaining system time, date, and hardware BIOS settings when the PC is unplugged.',
    category: 'Hardware'
  },
  {
    id: 'f4',
    question: 'What does a solid DRAM debug LED on the motherboard indicate?',
    answer: 'It indicates a memory initialization failure. This is commonly caused by an unseated RAM module, dirt on the gold contacts, wrong slot pairing, or bent CPU socket pins.',
    category: 'Troubleshooting'
  },
  {
    id: 'f5',
    question: 'What does the CompTIA troubleshooting rule "Question the Obvious" mean?',
    answer: 'Check the most fundamental, simple things first: verify the power cord is plugged in, the PSU switch is on, wall outlets are active, and monitor cables are connected before tearing hardware apart.',
    category: 'Troubleshooting'
  },
  {
    id: 'f6',
    question: 'Why must brass standoffs be installed between motherboard and chassis?',
    answer: 'Standoffs raise the motherboard off the metallic chassis tray, preventing electrical solder joints and traces on the bottom of the PCB from grounding out and causing catastrophic short circuits.',
    category: 'Safety & Installation'
  },
  {
    id: 'f7',
    question: 'What is the difference between SATA III and NVMe M.2 SSDs?',
    answer: 'SATA III uses the legacy storage controller protocol limited to ~550–600 MB/s, whereas NVMe connects directly to PCIe lanes, achieving speeds from 3,500 to over 7,000 MB/s.',
    category: 'Components'
  },
  {
    id: 'f8',
    question: 'What is UEFI and how does it improve over legacy BIOS?',
    answer: 'UEFI (Unified Extensible Firmware Interface) offers a modern GUI, mouse navigation, support for drives larger than 2.2 TB using GPT partition tables, Secure Boot verification, and faster boot speeds.',
    category: 'Configuration'
  }
];

export const MEMORY_CARDS = [
  { id: 'm1', pairId: 'cpu', content: 'CPU (Processor)', isConcept: true },
  { id: 'm2', pairId: 'cpu', content: 'Executes instructions & calculations', isConcept: false },
  
  { id: 'm3', pairId: 'ram', content: 'RAM Module', isConcept: true },
  { id: 'm4', pairId: 'ram', content: 'Volatile fast working memory', isConcept: false },

  { id: 'm5', pairId: 'ssd', content: 'Solid State Drive (SSD)', isConcept: true },
  { id: 'm6', pairId: 'ssd', content: 'Non-volatile flash file storage', isConcept: false },

  { id: 'm7', pairId: 'keyboard', content: 'Keyboard & Mouse', isConcept: true },
  { id: 'm8', pairId: 'keyboard', content: 'Primary User Input Devices', isConcept: false },

  { id: 'm9', pairId: 'monitor', content: 'Monitor & Display', isConcept: true },
  { id: 'm10', pairId: 'monitor', content: 'Visual Graphical Output Device', isConcept: false },

  { id: 'm11', pairId: 'sata', content: 'SATA Cable', isConcept: true },
  { id: 'm12', pairId: 'sata', content: 'Storage Drive Data Interconnect', isConcept: false }
];

export const DRAG_DROP_PARTS = [
  { id: 'cpu', label: 'CPU Socket', targetX: 42, targetY: 28, radius: 10 },
  { id: 'ram', label: 'RAM DIMM Slots', targetX: 68, targetY: 28, radius: 12 },
  { id: 'motherboard', label: 'Motherboard PCB', targetX: 50, targetY: 50, radius: 25 },
  { id: 'psu', label: 'Power Supply Unit', targetX: 20, targetY: 82, radius: 14 },
  { id: 'storage', label: 'Storage Drive Bay', targetX: 80, targetY: 75, radius: 14 },
  { id: 'cooler', label: 'CPU Cooling Fan', targetX: 42, targetY: 42, radius: 12 },
  { id: 'pcie', label: 'PCIe Expansion Slot', targetX: 45, targetY: 62, radius: 12 },
  { id: 'sata_port', label: 'SATA Ports', targetX: 78, targetY: 52, radius: 10 }
];

export const COMPREHENSIVE_QUIZ_QUESTIONS = [
  {
    question: '1. Which internal computer component is often called the "brain" of the computer system?',
    options: ['Central Processing Unit (CPU)', 'Random Access Memory (RAM)', 'Hard Disk Drive (HDD)', 'Power Supply Unit (PSU)'],
    correct: 0,
    explanation: 'The CPU performs arithmetic, logical calculations, and control functions across the entire machine.'
  },
  {
    question: '2. What is the recommended personal safety device to prevent Electrostatic Discharge (ESD)?',
    options: ['Anti-static wrist strap connected to grounded metal', 'Rubber dishwashing gloves', 'Wool socks on carpet', 'Nylon laboratory coat'],
    correct: 0,
    explanation: 'Anti-static wrist straps drain excess static electrical voltage harmlessly before damage can occur.'
  },
  {
    question: '3. What tool is specifically designed to measure DC rail voltages (+12V, +5V, +3.3V) on power supply cables?',
    options: ['Digital Multimeter', 'Crimping Plier', 'Soldering Iron', 'Torx Screwdriver'],
    correct: 0,
    explanation: 'A digital multimeter set to DC Voltage (V=) measures voltage levels and verifies power tolerances.'
  },
  {
    question: '4. Why should you avoid touching the gold contact pins on RAM and expansion cards?',
    options: ['Natural skin oils and static electricity can corrode and damage conductive gold pads', 'They are coated with wet chemical adhesive', 'They will instantly magnetize the board', 'They emit harmful ultraviolet radiation'],
    correct: 0,
    explanation: 'Skin oils leave insulating residues and ESD charges from fingertips can permanently destroy chip transistors.'
  },
  {
    question: '5. Which key is most commonly pressed immediately upon system startup to enter UEFI/BIOS?',
    options: ['DEL or F2', 'CTRL + ALT + DEL', 'Spacebar', 'Caps Lock'],
    correct: 0,
    explanation: 'Most motherboards (ASUS, MSI, Gigabyte, ASRock) utilize the DEL key or F2 key to trigger UEFI setup.'
  },
  {
    question: '6. What does the term "POST" signify in computer hardware fundamentals?',
    options: ['Power-On Self-Test', 'Primary Output System Test', 'Peripheral Operating State Tool', 'Pre-Operating System Transfer'],
    correct: 0,
    explanation: 'POST is the initial diagnostic routine that checks CPU, memory, video, and storage before booting.'
  },
  {
    question: '7. What is the primary purpose of brass standoffs inside a computer chassis?',
    options: ['To isolate the underside of the motherboard PCB from metallic chassis contact, preventing shorts', 'To provide magnetic grounding for hard drives', 'To cool the rear of the processor', 'To mount the power supply in place'],
    correct: 0,
    explanation: 'Standoffs prevent exposed solder points on the motherboard backplate from shorting out against the metal frame.'
  },
  {
    question: '8. If the computer turns on with fans spinning, but the monitor shows "No Signal", what should you check first?',
    options: ['Verify display cable is connected directly to dedicated GPU, not the motherboard output', 'Replace the processor heatsink', 'Reinstall the operating system from flash drive', 'Replace the power switch cable'],
    correct: 0,
    explanation: 'Dedicated graphics cards disable integrated motherboard video ports; the cable must be plugged into the GPU.'
  },
  {
    question: '9. What does a continuous repeating series of long beep codes during startup usually mean?',
    options: ['Unseated or defective RAM memory module', 'Monitor is turned off', 'Keyboard USB port is unplugged', 'CD-ROM drive tray is open'],
    correct: 0,
    explanation: 'Continuous long beeps indicate an issue with system RAM memory detection or seating.'
  },
  {
    question: '10. How should thermal compound (paste) be applied on a consumer desktop processor?',
    options: ['A small pea-sized dot in the center of the CPU heat spreader', 'Spread across the entire motherboard surface', 'Poured into the CPU socket pin holes', 'Applied thickly on the fan blades'],
    correct: 0,
    explanation: 'A small pea-sized dot compresses evenly when the cooler mounting pressure is tightened.'
  },
  {
    question: '11. Which storage drive technology utilizes flash chips and zero mechanical moving parts?',
    options: ['Solid State Drive (SSD)', 'Hard Disk Drive (HDD)', 'Floppy Diskette', 'Optical CD-ROM'],
    correct: 0,
    explanation: 'SSDs use solid-state NAND flash silicon, making them resilient to shock and much faster than spinning magnetic disks.'
  },
  {
    question: '12. What does an active "DRAM" debug LED on the motherboard signify?',
    options: ['The system failed memory self-test; memory is missing or unseated', 'The graphics card has overheat protection', 'The hard drive partition is full', 'The internet cable is unplugged'],
    correct: 0,
    explanation: 'Motherboard EZ Debug LEDs flag the specific subsystem failing POST: CPU, DRAM, VGA, or BOOT.'
  },
  {
    question: '13. What is the standard voltage of a motherboard CMOS battery (CR2032)?',
    options: ['3.0 Volts DC', '12.0 Volts DC', '1.5 Volts DC', '5.0 Volts DC'],
    correct: 0,
    explanation: 'The CR2032 is a 3-volt lithium manganese dioxide coin cell.'
  },
  {
    question: '14. What happens if the protective clear plastic film on the base of a CPU cooler is not removed?',
    options: ['The CPU will rapidly overheat and initiate thermal shutdown within 30–60 seconds', 'The cooler fan will spin backwards', 'The motherboard BIOS will erase itself', 'The RAM speed will double'],
    correct: 0,
    explanation: 'Plastic is a strong thermal insulator; it prevents heat transfer from the CPU to the copper heatsink.'
  },
  {
    question: '15. In modern 4-slot motherboards, which slots are normally prioritized for a dual-stick RAM kit?',
    options: ['Slots A2 and B2 (Slots 2 and 4 from the CPU)', 'Slots A1 and A2', 'Slots B1 and B2', 'Slots 1 and 2'],
    correct: 0,
    explanation: 'Populating slots A2 and B2 terminates the signal trace correctly on daisy-chain motherboard topologies.'
  },
  {
    question: '16. Which interface is currently the fastest storage protocol for internal consumer M.2 drives?',
    options: ['PCIe NVMe', 'SATA III', 'PATA IDE', 'USB 2.0'],
    correct: 0,
    explanation: 'NVMe utilizes direct PCI Express lanes to achieve speeds exceeding 7,000 MB/s.'
  },
  {
    question: '17. What does the acronym ESD stand for in hardware assembly?',
    options: ['Electrostatic Discharge', 'Electronic System Diagnostic', 'External Solid Drive', 'Emergency Shutdown Device'],
    correct: 0,
    explanation: 'Electrostatic Discharge is the sudden flow of electricity between two objects caused by contact.'
  },
  {
    question: '18. What is the first step in the 6-step CompTIA systematic troubleshooting model?',
    options: ['Identify the problem', 'Establish a theory of probable cause', 'Test the theory', 'Document findings and outcomes'],
    correct: 0,
    explanation: 'Step 1 is always to identify the problem by questioning the user, identifying symptoms, and observing error codes.'
  },
  {
    question: '19. Which front panel header connection is sensitive to positive and negative polarity?',
    options: ['LED indicators (PWR_LED, HDD_LED)', 'Power Switch (PWR_SW)', 'Reset Switch (RESET_SW)', 'Case Chassis Speaker'],
    correct: 0,
    explanation: 'Light Emitting Diodes (LEDs) are diodes that only conduct in one direction; switches are momentary and have no polarity.'
  },
  {
    question: '20. What utility software runs outside the operating system to perform exhaustive RAM error testing?',
    options: ['MemTest86', 'Adobe Acrobat', 'Google Chrome Diagnostics', 'Disk Cleanup Utility'],
    correct: 0,
    explanation: 'MemTest86 boots from USB to test every memory address bit for faults without OS interference.'
  }
];

export const SCRAMBLE_WORDS = [
  { scrambled: 'PUC', word: 'CPU', hint: 'Central Processing Unit', isFillBlank: false },
  { scrambled: 'MAR', word: 'RAM', hint: 'Volatile system memory', isFillBlank: false },
  { scrambled: 'DSS', word: 'SSD', hint: 'Fast solid state storage', isFillBlank: false },
  { scrambled: 'DRIVAR', word: 'DRIVER', hint: 'Software that allows OS to talk to hardware', isFillBlank: false },
  { scrambled: 'NITOORM', word: 'MONITOR', hint: 'Visual display output device', isFillBlank: false },
  { scrambled: 'DROAMTHBEO', word: 'MOTHERBOARD', hint: 'Main circuit board connecting all parts', isFillBlank: false },
  { scrambled: 'ATAS', word: 'SATA', hint: 'Serial Advanced Technology Attachment', isFillBlank: false },
  { scrambled: 'SEPO', word: 'POST', hint: 'Power-On Self-Test', isFillBlank: false },
  { scrambled: 'SOCM', word: 'CMOS', hint: 'Complementary Metal-Oxide Semiconductor', isFillBlank: false },
  {
    scrambled: '',
    word: 'CPU',
    hint: 'Processing core',
    isFillBlank: true,
    sentence: 'The ______ is responsible for processing computer instructions and calculations.'
  },
  {
    scrambled: '',
    word: 'RAM',
    hint: 'Volatile memory',
    isFillBlank: true,
    sentence: 'Temporary working memory that clears when power is disconnected is known as ______.'
  },
  {
    scrambled: '',
    word: 'THERMAL',
    hint: 'Heat conducting compound',
    isFillBlank: true,
    sentence: '______ paste fills microscopic air gaps between the processor and heatsink.'
  }
];
