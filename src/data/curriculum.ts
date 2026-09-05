import { LessonContent } from '../types';

export const LESSONS: LessonContent[] = [
  {
    id: 'lesson-1',
    topicNumber: 1,
    title: 'Preparing for Installation',
    shortDesc: 'Safety guidelines, workplace preparation, ESD protection, and essential tools.',
    objectives: [
      'Identify and select appropriate tools and testing equipment for computer assembly.',
      'Explain Occupational Health and Safety (OHS) standards and ESD precautions.',
      'Prepare a secure, static-free workspace for hardware assembly.'
    ],
    contentSections: [
      {
        heading: '1. Occupational Health and Safety (OHS) Protocols',
        body: 'Prior to handling any electronic device or computer chassis, technicians must observe essential safety precautions. Always disconnect AC mains power cords and discharge residual power by holding down the chassis power button for 5 seconds.',
        keyPoints: [
          'Wear Personal Protective Equipment (PPE) suitable for laboratory assembly.',
          'Never wear loose clothing or metallic jewelry that could cause short circuits.',
          'Always ground yourself before touching sensitive CMOS components.'
        ]
      },
      {
        heading: '2. Electrostatic Discharge (ESD) Prevention',
        body: 'ESD can destroy integrated circuits without visible smoke or audible sparking. Humans can store static charges of over 3,000 volts, whereas a microchip can be ruined by as little as 30 volts.',
        keyPoints: [
          'Use an anti-static wrist strap clipped to an unpainted metal chassis surface.',
          'Place components on an anti-static mat, never on the metallic foil bags or plastic wrap.',
          'Maintain room relative humidity between 35% and 50% where feasible.'
        ]
      },
      {
        heading: '3. Essential Hand Tools & Diagnostics',
        body: 'Having proper hand tools prevents stripping screw threads and damaging fragile solder joints.',
        keyPoints: [
          'Phillips #1 and #2 screwdrivers (magnetic tips should have very low magnetic field).',
          'Anti-static wrist strap and grounding cord.',
          'Digital multimeter for measuring rail voltages (12V, 5V, 3.3V).',
          'Cable ties, wire cutters, and non-conductive thermal paste spatula.'
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Clear and Clean Work Area',
        details: 'Ensure a clean, flat, well-lit surface free from clutter, liquids, and carpets that generate static electricity.'
      },
      {
        step: 2,
        title: 'Inspect Tools & Equipment',
        details: 'Check all tools for insulated handles, ensure ESD wrist strap continuity, and organize screws in a magnetic tray.'
      },
      {
        step: 3,
        title: 'Unpack and Verify Components',
        details: 'Cross-reference packing lists with parts: Motherboard, CPU, Cooler, RAM, Storage (SSD/NVMe/HDD), PSU, Case, and thermal compound.',
        warning: 'Hold circuit boards by their edges only; never touch exposed gold contact pins.'
      }
    ],
    reminders: [
      'Always unplug the AC wall cord before working inside the computer case.',
      'Keep thermal paste away from motherboard socket pins and skin.'
    ],
    troubleshootingTips: [
      'If static wrist strap is missing, frequently touch the unpainted metal frame of the grounded case before touching components.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/BL4DCEp7blY'
  },
  {
    id: 'lesson-2',
    topicNumber: 2,
    title: 'Installing Computer Systems',
    shortDesc: 'Step-by-step physical assembly of motherboard, CPU, thermal paste, RAM, PSU, and drives.',
    objectives: [
      'Master the correct order of mounting core components into the ATX/mATX chassis.',
      'Demonstrate proper CPU zero-insertion force (ZIF) or LGA alignment and latching.',
      'Correctly route 24-pin ATX, 8-pin EPS CPU, PCIe, and SATA power cables.'
    ],
    contentSections: [
      {
        heading: '1. Bench Assembling (Pre-Chassis Test)',
        body: 'Experienced technicians often perform a "breadboard" or bench test outside the chassis by placing the motherboard on its non-conductive cardboard box to verify POST before screwing it into the case.',
        keyPoints: [
          'Install CPU, CPU cooler, and one stick of RAM first.',
          'Connect 24-pin ATX and 8-pin CPU power from the PSU.',
          'Connect monitor to GPU or motherboard output and check for display.'
        ]
      },
      {
        heading: '2. Standoffs and Motherboard Mounting',
        body: 'Brass standoffs prevent the solder traces on the back of the motherboard from touching the metallic chassis plate, preventing catastrophic short circuits.',
        keyPoints: [
          'Verify standoff positions match the motherboard screw holes exactly.',
          'Never leave an extra standoff installed where no mounting hole exists.',
          'Tighten screws gently in an X pattern until snug—do not overtighten.'
        ]
      },
      {
        heading: '3. Front Panel Headers & Cabling',
        body: 'The front panel header block connects the chassis Power Switch (PWR_SW), Reset Switch (RESET_SW), Power LED (PWR_LED), and Drive Activity LED (HDD_LED).',
        keyPoints: [
          'LED connectors are polarized (positive pin usually colored or marked with +).',
          'Switches (Power & Reset) are momentary contacts and can be plugged in either orientation.'
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Install CPU into Socket',
        details: 'Open socket retention lever. Align the gold triangle indicator on the CPU with the mark on the socket. Drop the CPU in without forcing, then latch the retention lever.'
      },
      {
        step: 2,
        title: 'Apply Thermal Compound & Mount Cooler',
        details: 'Apply a pea-sized dot of thermal paste onto the center of the CPU IHS (Integrated Heat Spreader). Fasten cooler bracket evenly.'
      },
      {
        step: 3,
        title: 'Insert RAM Modules in Dual-Channel Slots',
        details: 'Open slot clips. Align notch on the RAM stick with slot key. Press down firmly on both ends until the retention tabs snap shut with an audible click (typically slots A2 and B2).'
      },
      {
        step: 4,
        title: 'Install I/O Shield and Mount Motherboard into Case',
        details: 'Snap the I/O shield firmly into the rear case opening. Guide motherboard ports through the shield and secure into aligned brass standoffs.'
      },
      {
        step: 5,
        title: 'Install Power Supply and Connect Cables',
        details: 'Mount PSU with fan facing ventilation intake. Connect 24-pin ATX motherboard, 8-pin CPU EPS, PCIe GPU power, and SATA storage power.'
      }
    ],
    reminders: [
      'Do not apply excessive thermal paste; an overflow onto motherboard circuitry can cause short circuits.',
      'Check that motherboard standoffs are installed only where mounting holes exist.'
    ],
    troubleshootingTips: [
      'If CPU fan does not spin on initial power-on, verify it is connected to CPU_FAN and not SYS_FAN or AIO_PUMP header.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/s1HBDtz3m_A'
  },
  {
    id: 'lesson-3',
    topicNumber: 3,
    title: 'Configuring Systems',
    shortDesc: 'BIOS/UEFI setup, boot priority, AHCI/NVMe modes, XMP/DOCP memory profiles, and OS installation.',
    objectives: [
      'Navigate UEFI/BIOS setup utility using keyboard shortcuts (DEL, F2, F10, F12).',
      'Configure boot device priority for bootable USB media.',
      'Enable secure boot, TPM 2.0, and configure SATA/NVMe operating modes.'
    ],
    contentSections: [
      {
        heading: '1. UEFI / BIOS Configuration Essentials',
        body: 'Unified Extensible Firmware Interface (UEFI) replaces legacy BIOS, offering a graphical interface, mouse support, GPT partitioning, and 64-bit boot capabilities.',
        keyPoints: [
          'Access UEFI setup by pressing DEL or F2 during early power-on.',
          'Verify that CPU temperature, fan RPMs, and detected RAM capacity match installed specs.',
          'Enable XMP (Extreme Memory Profile) or EXPO/DOCP to run RAM at rated speed.'
        ]
      },
      {
        heading: '2. Storage Controllers: AHCI vs. RAID & NVMe',
        body: 'Ensure the storage controller is set to AHCI (Advanced Host Controller Interface) or native NVMe mode rather than legacy IDE mode for optimal performance and SSD TRIM support.'
      },
      {
        heading: '3. Operating System Deployment',
        body: 'Create UEFI-compliant boot media (FAT32/NTFS with GPT schema). During Windows/Linux setup, partition storage properly (EFI system partition, MSR, and Primary NTFS/EXT4).'
      }
    ],
    steps: [
      {
        step: 1,
        title: 'First Power-On & Enter BIOS',
        details: 'Turn on power switch, tap DEL or F2 repeatedly until UEFI setup appears.'
      },
      {
        step: 2,
        title: 'Set Date, Time & Hardware Recognition',
        details: 'Check that all connected storage drives, CPU model, and full RAM capacity are recognized.'
      },
      {
        step: 3,
        title: 'Set Boot Sequence Order',
        details: 'Set the Bootable USB Drive as Boot Option #1 and Internal SSD as Boot Option #2.'
      },
      {
        step: 4,
        title: 'Save & Exit (F10)',
        details: 'Press F10 to save configuration and restart system into the installation installer.'
      }
    ],
    reminders: [
      'Never interrupt or cut power during a BIOS firmware flash update.',
      'Use GPT (GUID Partition Table) partitioning for modern UEFI systems.'
    ],
    troubleshootingTips: [
      'If bootable USB is not detected, disable "Fast Boot" in BIOS and check USB format.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/hQc_Y3K7ZlU'
  },
  {
    id: 'lesson-4',
    topicNumber: 4,
    title: 'Common Problems in Installation and Configuration',
    shortDesc: 'Analysis of hardware incompatibility, improper seating, POST beep codes, and no display issues.',
    objectives: [
      'Recognize common physical errors: unseated RAM, missing CPU 8-pin power, front-panel miswiring.',
      'Interpret motherboard debug LEDs (CPU, DRAM, VGA, BOOT) and audible POST beep codes.',
      'Differentiate between physical hardware faults and configuration/firmware conflicts.'
    ],
    contentSections: [
      {
        heading: '1. "No POST / No Video" (Black Screen)',
        body: 'The most frequent issue encountered by students after assembling a computer is that fans spin up, but no video signal appears on the monitor.',
        keyPoints: [
          'Monitor cable plugged into motherboard video port instead of dedicated GPU card.',
          'Missing 4-pin/8-pin ATX12V / EPS CPU power cable near the upper left of the motherboard.',
          'RAM stick not fully seated (tabs did not click all the way in).'
        ]
      },
      {
        heading: '2. Continuous Beep Codes & Debug LEDs',
        body: 'Motherboards signal early boot progress through beep codes or four diagnostic LEDs (CPU, DRAM, VGA, BOOT).',
        keyPoints: [
          'DRAM LED solid: Faulty or improperly seated RAM module, or bent CPU socket pins.',
          'CPU LED solid: Processor power missing, cooler mounted with uneven pressure, or incompatible BIOS.',
          'VGA LED solid: Graphics card auxiliary 6-pin/8-pin power disconnected or GPU seated incorrectly.'
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Verify Display Output Connection',
        details: 'Ensure the HDMI/DisplayPort cable connects directly to the dedicated graphics card if one is installed, not the motherboard.'
      },
      {
        step: 2,
        title: 'Inspect Power Delivery Connections',
        details: 'Confirm 24-pin ATX and 8-pin CPU power connectors are clicked in with retaining latches locked.'
      },
      {
        step: 3,
        title: 'Reseat Memory in Dual-Channel Slots',
        details: 'Remove RAM sticks, blow dust with compressed air, and re-insert into slots A2 and B2.'
      }
    ],
    reminders: [
      'Always listen for audible beep codes or check motherboard diagnostic LEDs before dismantling parts.',
      'Do not force expansion cards or RAM into incompatible slots.'
    ],
    troubleshootingTips: [
      'If debug LED is stuck on DRAM, test with only ONE RAM stick in slot A2 to isolate a faulty module.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/7V3Y9uUqfWw'
  },
  {
    id: 'lesson-5',
    topicNumber: 5,
    title: 'Troubleshooting Procedures',
    shortDesc: 'Systematic 6-step troubleshooting methodology, component isolation, and diagnostic flowcharts.',
    objectives: [
      'Apply the CompTIA 6-step diagnostic methodology to computer systems.',
      'Perform CMOS resets via jumper or battery removal.',
      'Perform minimum configuration boot (Breadboarding) to isolate defective components.'
    ],
    contentSections: [
      {
        heading: '1. The 6-Step Systematic Troubleshooting Model',
        body: 'Technicians must follow a logical, documented diagnostic sequence rather than randomly replacing parts.',
        keyPoints: [
          'Step 1: Identify the problem (gather info from user/symptoms).',
          'Step 2: Establish a theory of probable cause (question the obvious).',
          'Step 3: Test the theory to determine the cause.',
          'Step 4: Establish a plan of action to resolve the problem and implement the solution.',
          'Step 5: Verify full system functionality and implement preventive measures.',
          'Step 6: Document findings, actions, and outcomes.'
        ]
      },
      {
        heading: '2. Clearing CMOS Settings (Hardware Reset)',
        body: 'When incorrect BIOS configuration (e.g. invalid memory timings or CPU overclock) prevents booting, clearing the CMOS restores factory safe defaults.',
        keyPoints: [
          'Unplug AC power, locate CLR_CMOS jumper, short pins with screwdriver for 5-10 seconds.',
          'Alternatively, remove CR2032 coin cell battery for 2-3 minutes.'
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Step 1: Interview and Observe',
        details: 'Ask what was changed recently. Observe power LEDs, fan rotation, error messages, or smell of burnt electronics.'
      },
      {
        step: 2,
        title: 'Step 2: Check Power and External Factors',
        details: 'Verify power strip switch, wall socket voltage, and PSU I/O toggle switch.'
      },
      {
        step: 3,
        title: 'Step 3: Minimum System Boot (Isolation)',
        details: 'Disconnect all peripherals, external USB drives, secondary storage drives, and extra RAM. Leave only CPU, 1 RAM stick, and Motherboard connected to PSU.'
      }
    ],
    reminders: [
      'Never open a computer power supply (PSU); capacitors store lethal high-voltage charges for hours.',
      'Change only ONE variable at a time during troubleshooting to identify the root cause.'
    ],
    troubleshootingTips: [
      'Keep a spare known-good power supply and single test RAM stick in the lab for fast verification.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/hJ8yM0Yg9qE'
  },
  {
    id: 'lesson-6',
    topicNumber: 6,
    title: 'Testing and Verification',
    shortDesc: 'Stress testing, hardware health monitoring, burn-in diagnostics, thermal checks, and sign-off.',
    objectives: [
      'Execute hardware diagnostic benchmarks (MemTest86, Prime95, FurMark).',
      'Monitor CPU and GPU core temperatures under full synthetic load using HWMonitor.',
      'Verify device manager driver installation and complete a technician verification checklist.'
    ],
    contentSections: [
      {
        heading: '1. Memory Integrity Testing (MemTest86)',
        body: 'Unstable RAM can cause silent data corruption and sporadic Blue Screens of Death (BSOD). Running a bootable MemTest86 pass ensures memory cells and address lines are free of bit flips.',
        keyPoints: [
          'Zero errors allowed on test passes.',
          'If errors appear, retest each stick individually in the primary slot.'
        ]
      },
      {
        heading: '2. Thermal Performance & Stress Testing',
        body: 'Run stress tools like Prime95 (CPU) and FurMark (GPU) for 15-30 minutes while monitoring sensor telemetry.',
        keyPoints: [
          'CPU maximum temperature should remain under 85°C for standard cooling.',
          'Check for thermal throttling where CPU clocks drop dramatically to prevent overheating.',
          'Inspect fan curves in BIOS to ensure quiet yet responsive cooling.'
        ]
      },
      {
        heading: '3. Device Manager & Driver Verification',
        body: 'Every onboard controller must have signed vendor drivers installed (Chipset, Audio, LAN, Wi-Fi, GPU).',
        keyPoints: [
          'No yellow exclamation marks or "Unknown Device" in Windows Device Manager.',
          'Verify storage SMART status using CrystalDiskInfo.'
        ]
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Inspect Device Manager',
        details: 'Open devmgmt.msc and confirm all device drivers are installed without error flags.'
      },
      {
        step: 2,
        title: 'Launch Hardware Monitor (HWMonitor)',
        details: 'Check 12V, 5V, 3.3V rail tolerances (must be within ±5%) and verify idle temperatures (30°C - 45°C).'
      },
      {
        step: 3,
        title: 'Run 15-Minute Load Test',
        details: 'Execute combined CPU/GPU load to verify power supply stability and adequate chassis airflow.'
      }
    ],
    reminders: [
      'Always run thermal stress tests with the computer case side panels fully closed to simulate realistic airflow.',
      'Document all benchmark scores and temperature maximums in the laboratory sign-off sheet.'
    ],
    troubleshootingTips: [
      'If CPU immediately hits 95°C+ within 10 seconds of starting a stress test, the cooler protective plastic peel was likely left on!'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/0X6vY1-8g68'
  }
];

export interface ActivityDefinition {
  id: string;
  name: string;
  type: string;
  iconName: string;
  description: string;
  lessonId?: string;
  lessonBadge: string;
  totalItems: number;
  items: {
    title: string;
    scenario: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hint: string;
  }[];
}

export const ACTIVITIES_DATA: ActivityDefinition[] = [
  {
    id: 'act-lesson-1',
    name: 'Lesson 1 Activity Quiz: Preparing for Installation',
    type: 'Safety & Tools Assessment',
    iconName: 'ShieldAlert',
    lessonId: 'topic-1',
    lessonBadge: 'Lesson 1 Quiz',
    description: 'Activity quiz evaluating Occupational Health and Safety (OHS), ESD grounding protocols, workplace preparation, and hand tool safety for Lesson 1.',
    totalItems: 4,
    items: [
      {
        title: 'Safety Procedure: Electrostatic Discharge (ESD) Prevention',
        scenario: 'A technician is preparing to unbox sensitive computer hardware including a modern motherboard and DDR4 memory modules. What is the essential personal protective device required to prevent ESD damage?',
        options: [
          'Anti-static wrist strap connected to an unpainted grounded metal surface',
          'Standard rubber household dishwashing gloves',
          'Heavy wool winter gloves',
          'Wearing athletic shoes on carpet'
        ],
        correctIndex: 0,
        explanation: 'An anti-static wrist strap contains a 1-Megaohm safety resistor that harmlessly bleeds static electricity to ground before voltage can destroy microscopic transistors on PCB circuitry.',
        hint: 'Which wearable safety item connects directly to the metal chassis of the computer to equalize electrical potential?'
      },
      {
        title: 'Tool Selection: Screwdriver Magnetism',
        scenario: 'When mounting delicate M.2 NVMe SSDs and motherboard standoff screws, which screwdriver recommendation complies with Occupational Health and Safety (OHS) standards?',
        options: [
          'Use a precision magnetized tip screwdriver designed specifically for electronics with low magnetic field strength',
          'Use an industrial neodymium magnet attached to a wrench',
          'Use a flathead butter knife from the cafeteria',
          'Use an electric corded drywall impact driver'
        ],
        correctIndex: 0,
        explanation: 'Low-strength magnetic precision screwdrivers hold miniature screws in place without generating strong magnetic flux that could harm magnetic media or induce unwanted currents.',
        hint: 'Select the tool that safely prevents dropped screws in the chassis while protecting delicate circuits.'
      },
      {
        title: 'Workspace Preparation: Preventing Thermal & Electrical Hazards',
        scenario: 'Before beginning computer disassembly or component installation in the BTLED-ICT laboratory, what is the mandatory first step for electrical safety?',
        options: [
          'Turn off the PSU rocker switch, disconnect the AC power cord from the wall, and press the chassis power button for 5 seconds to drain residual capacitor charge',
          'Keep the computer plugged in so you can test fans while reaching inside',
          'Spray water onto the motherboard to cool it down',
          'Wear metal jewelry and rings to dissipate heat'
        ],
        correctIndex: 0,
        explanation: 'Power supplies retain hazardous capacitor charges even after power-down. Unplugging from AC mains and holding the power button discharges remaining energy safely.',
        hint: 'How do you ensure zero electrical energy remains in the power supply before touching internal parts?'
      },
      {
        title: 'Component Handling: Physical Protection of Contact Pads',
        scenario: 'How should a student technician physically handle a processor, RAM module, or expansion card when removing it from its anti-static packaging?',
        options: [
          'Hold the component strictly by its outer PCB edges without touching gold pins, socket contacts, or surface-mount capacitors',
          'Touch the gold contact fingers to check if they are sticky',
          'Place the component on a metal foil sheet or wool blanket',
          'Clean the gold contacts with steel wool'
        ],
        correctIndex: 0,
        explanation: 'Skin oils, moisture, and static potential can corrode or short out sensitive contact pins. Components must always be handled by their non-conductive fiberglass edges.',
        hint: 'Think about which part of the PCB is safe from oils and electrostatic transfer.'
      }
    ]
  },
  {
    id: 'act-lesson-2',
    name: 'Lesson 2 Activity Quiz: Installing Computer Systems',
    type: 'Assembly & Hardware Assessment',
    iconName: 'Cpu',
    lessonId: 'topic-2',
    lessonBadge: 'Lesson 2 Quiz',
    description: 'Activity quiz evaluating hardware assembly sequence, CPU socket zero insertion force, dual-channel RAM slots, and PSU mounting for Lesson 2.',
    totalItems: 4,
    items: [
      {
        title: 'CPU Installation: LGA Socket Alignment',
        scenario: 'Which is the correct sequence when seating an LGA (Land Grid Array) desktop processor into the motherboard socket?',
        options: [
          'Release socket lever -> Align gold triangle marking -> Seat CPU with zero force -> Close retention plate and lock lever',
          'Apply paste -> Open latch -> Drop CPU in -> Lock latch -> Put fan on',
          'Screw cooler to motherboard -> Slide CPU beneath heatsink -> Lock socket lever',
          'Drop CPU into socket -> Force lever down without checking notch alignment'
        ],
        correctIndex: 0,
        explanation: 'Proper LGA socket installation requires releasing the tension arm, matching the corner alignment triangle with the socket index mark, resting the chip gently without force, and latching the retention plate.',
        hint: 'Never use force on a CPU socket. Alignment markers must match before closing the retention lever.'
      },
      {
        title: 'Dual-Channel Memory: 4-Slot Motherboard Configuration',
        scenario: 'A motherboard has four DIMM slots labeled A1, A2, B1, B2. What is the standard configuration recommended by motherboard manufacturers for installing two memory sticks?',
        options: [
          'Install into slots A2 and B2 (Slots 2 and 4 away from CPU)',
          'Install into slots A1 and A2 (Slots 1 and 2)',
          'Install into slots A1 and B1 (Slots 1 and 3)',
          'Install both sticks stacked into slot A1'
        ],
        correctIndex: 0,
        explanation: 'Utilizing slots A2 and B2 (slots 2 and 4 away from the processor) optimizes signal trace reflection and activates dual-channel memory mode, doubling available memory bandwidth.',
        hint: 'Check the standard recommendation for 2 sticks on a 4-slot board (alternating slots, usually slots 2 and 4).'
      },
      {
        title: 'Power Supply Unit: Airflow & Fan Orientation',
        scenario: 'When mounting an ATX power supply in the bottom compartment of a modern chassis equipped with a bottom dust filter, which orientation is correct?',
        options: [
          'PSU intake fan facing downwards toward the filtered chassis bottom opening',
          'PSU intake fan facing upwards directly suffocated against the GPU shroud',
          'Remove the fan guard and mount the PSU upside-down',
          'Leave the power supply hanging freely outside the chassis'
        ],
        correctIndex: 0,
        explanation: 'With a bottom intake vent and dust filter, facing the fan down creates an isolated cooling loop: drawing cool ambient air from outside the case and exhausting heat out the back without heating the internal chassis.',
        hint: 'Where can the power supply pull fresh, cool outside air from without disturbing the interior graphics card airflow?'
      },
      {
        title: 'Motherboard Mounting: Standoff Alignment',
        scenario: 'Prior to placing the motherboard inside the chassis, why is it critical to check that brass standoffs are installed ONLY where corresponding motherboard screw holes exist?',
        options: [
          'An extra standoff in an incorrect position will touch the rear PCB solder joints, causing a catastrophic short circuit',
          'Motherboard standoffs are purely decorative and can be placed anywhere',
          'Extra standoffs improve audio output quality',
          'Standoffs are only needed for liquid cooling radiators'
        ],
        correctIndex: 0,
        explanation: 'Motherboard standoffs elevate the PCB above bare chassis metal. A rogue standoff contacting live copper traces or solder balls on the back of the motherboard will short out power rails upon startup.',
        hint: 'What happens when grounded metal contacts live electrical traces on the back of a motherboard?'
      }
    ]
  },
  {
    id: 'act-lesson-3',
    name: 'Lesson 3 Activity Quiz: Configuring Computer Systems',
    type: 'Firmware & OS Configuration',
    iconName: 'Sliders',
    lessonId: 'topic-3',
    lessonBadge: 'Lesson 3 Quiz',
    description: 'Activity quiz evaluating UEFI/BIOS settings, boot device priority order, high-speed RAM XMP/EXPO profiles, and OS installation for Lesson 3.',
    totalItems: 4,
    items: [
      {
        title: 'UEFI Setup: Boot Device Priority',
        scenario: 'You need to install an operating system from a bootable USB flash drive onto a clean NVMe SSD. How should the boot priority list be arranged in UEFI firmware?',
        options: [
          '1st: UEFI USB Flash Drive, 2nd: Internal NVMe SSD, 3rd: Disabled',
          '1st: Internal NVMe SSD, 2nd: Network PXE Boot, 3rd: USB Drive',
          'Disable all boot options and let BIOS guess',
          '1st: CD-ROM, 2nd: Floppy Drive, 3rd: Hard Drive'
        ],
        correctIndex: 0,
        explanation: 'To execute the operating system setup environment, the computer must boot from the installation USB media first. Once installation is complete, the internal SSD is designated as Boot Option #1.',
        hint: 'Which device contains the installation setup wizard that needs to load first?'
      },
      {
        title: 'Memory Frequency: Enabling XMP / EXPO Profiles',
        scenario: 'A student technician installs DDR4-3600 MHz memory, but Task Manager reports it is running at the default JEDEC speed of 2133 MHz. What configuration must be enabled in UEFI/BIOS?',
        options: [
          'Enable XMP (Extreme Memory Profile) or DOCP/EXPO in BIOS overclocking settings',
          'Increase the CPU fan RPM to 100%',
          'Change the SATA controller from AHCI to IDE',
          'Turn off the TPM 2.0 security module'
        ],
        correctIndex: 0,
        explanation: 'High-speed RAM ships at standard safe JEDEC defaults. Enabling Intel XMP or AMD DOCP/EXPO activates the manufacturer tested factory timings, voltage, and advertised 3600 MHz clock speed.',
        hint: 'Look for the profile setting named for "Extreme Memory Profile".'
      },
      {
        title: 'Security Requirements: Windows 11 Firmware Prerequisites',
        scenario: 'During system configuration, the Windows 11 installer states the PC does not meet minimum system requirements. Which two firmware features must be enabled in UEFI?',
        options: [
          'TPM 2.0 (fTPM/Intel PTT) and UEFI Secure Boot',
          'Legacy BIOS CSM Mode and IDE Emulation',
          'Overclocked CPU Ratio and Disabling Windows Defender',
          'Static IP Address and RAID 0 striping'
        ],
        correctIndex: 0,
        explanation: 'Windows 11 requires a Trusted Platform Module (TPM 2.0) for hardware-rooted cryptographic security and UEFI Secure Boot to prevent bootkits and untrusted bootloaders from executing.',
        hint: 'Which security features protect encryption keys and verify digitally signed bootloaders?'
      },
      {
        title: 'Driver Installation: Post-OS Deployment Order',
        scenario: 'Immediately after Windows installation finishes, what is the best practice for installing peripheral and chipset drivers?',
        options: [
          'Install the Motherboard Chipset driver first, followed by Network/LAN, GPU Display driver, and Audio',
          'Install audio drivers first, then play music at maximum volume',
          'Never install drivers and rely solely on default basic display adapters',
          'Install third-party driver cleaners before testing hardware'
        ],
        correctIndex: 0,
        explanation: 'The chipset driver instructs the operating system on how to manage the CPU-to-chipset bus, PCIe lanes, and power states. Installing it first ensures subsequent hardware drivers configure accurately.',
        hint: 'Which foundational driver establishes communication between the operating system and the motherboard chipset architecture?'
      }
    ]
  },
  {
    id: 'act-lesson-4',
    name: 'Lesson 4 Activity Quiz: Common Problems in Computer Systems',
    type: 'Problem Identification Assessment',
    iconName: 'ClipboardCheck',
    lessonId: 'topic-4',
    lessonBadge: 'Lesson 4 Quiz',
    description: 'Activity quiz evaluating recognition of common hardware and software problems, thermal shutdowns, and storage errors for Lesson 4.',
    totalItems: 4,
    items: [
      {
        title: 'Storage Error: "INACCESSIBLE_BOOT_DEVICE" BSOD',
        scenario: 'After modifying UEFI settings, Windows fails to boot and immediately crashes with the stop code "INACCESSIBLE_BOOT_DEVICE". Prior to this, the SATA controller mode was changed.',
        options: [
          'The SATA controller mode was switched from AHCI to IDE/RAID, breaking storage driver compatibility',
          'The RAM modules are operating at an unsupported frequency',
          'The CPU cooling fan is spinning too slowly',
          'The front panel audio header is loose'
        ],
        correctIndex: 0,
        explanation: 'Changing SATA mode between AHCI and IDE/RAID changes how the storage controller communicates with the OS. Windows cannot load the appropriate storage driver at boot, throwing this stop code.',
        hint: 'Which setting directly affects how the motherboard talks to storage hard drives and SSDs?'
      },
      {
        title: 'CMOS Failure: Date and Time Reset on Power Loss',
        scenario: 'Whenever the computer is unplugged from the wall socket or the power strip is switched off, the system BIOS date and time resets to January 1, 2015, and boot settings revert to defaults.',
        options: [
          'The CMOS battery (CR2032 3V coin cell) is depleted and needs replacement',
          'The NVMe SSD is worn out',
          'The power supply 24-pin cable is defective',
          'The processor clock multiplier is broken'
        ],
        correctIndex: 0,
        explanation: 'The CR2032 lithium coin cell battery maintains the real-time clock (RTC) and volatile CMOS memory settings when mains AC power is removed. When it dies, time and settings reset.',
        hint: 'What small round component powers the motherboard memory when the PC is disconnected from the wall?'
      },
      {
        title: 'Memory Anomaly: 8 GB Usable Out of 16 GB Installed',
        scenario: 'A technician installed two 8 GB DDR4 sticks. In Windows System Properties, it displays: "Installed RAM: 16.0 GB (7.95 GB usable)" and Task Manager shows "Hardware reserved: 8.1 GB".',
        options: [
          'One RAM module is seated in an improper slot channel or not fully engaged by the memory controller',
          'The computer monitor is taking 8 GB of video memory',
          'The CPU thermal paste has leaked into the PCI slot',
          'The hard drive has run out of virtual swap memory'
        ],
        correctIndex: 0,
        explanation: 'When one stick is detected electrically by SPD but cannot be trained by the memory controller (often due to non-optimal slot population or unseated pins), Windows marks it as "Hardware Reserved".',
        hint: 'Check dual-channel slot recommendations (usually slots A2 and B2) and seating.'
      },
      {
        title: 'Mechanical Drive: Rhythmic Clicking Sound ("Click of Death")',
        scenario: 'While running lab tasks, a loud rhythmic clicking sound originates from inside the chassis, followed by an operating system freeze and the error "Disk Read Error Occurred".',
        options: [
          'Mechanical HDD read/write head actuator arm assembly failure',
          'CPU water cooler pump cavitation',
          'Graphics card fan bearing dust accumulation',
          'Power supply relay overload'
        ],
        correctIndex: 0,
        explanation: 'Rhythmic clicking in a mechanical hard drive occurs when read/write heads repeatedly try and fail to calibrate onto track sectors. This indicates imminent physical HDD failure.',
        hint: 'Which mechanical component contains spinning platters and moving magnetic actuator arms?'
      }
    ]
  },
  {
    id: 'act-lesson-5',
    name: 'Lesson 5 Activity Quiz: Troubleshooting Computer Systems',
    type: 'Diagnostic Flowchart Assessment',
    iconName: 'Wrench',
    lessonId: 'topic-5',
    lessonBadge: 'Lesson 5 Quiz',
    description: 'Activity quiz evaluating diagnostic isolation techniques, POST beep codes, debug LEDs, and systematic problem solving for Lesson 5.',
    totalItems: 4,
    items: [
      {
        title: 'Display Failure: Fans Spin, Monitor Stays Black',
        scenario: 'A student technician completed installing a new dedicated graphics card. When powering on the PC, case fans and CPU cooler spin, but the monitor displays "No Signal". The HDMI cable is currently plugged into the motherboard back I/O plate.',
        options: [
          'Connect the HDMI cable directly into the dedicated graphics card port',
          'Replace the power supply with a higher wattage model',
          'Flash the motherboard BIOS with an emergency flash drive',
          'Remove the CPU and check for bent pins'
        ],
        correctIndex: 0,
        explanation: 'When a dedicated GPU is installed, motherboards automatically disable the CPU integrated graphics on the motherboard I/O panel. The display cable must be plugged into the discrete graphics card output.',
        hint: 'Think about which component is generating the video display signal when a discrete graphics card is installed.'
      },
      {
        title: 'POST Beep Codes: Continuous Repeating Beeping',
        scenario: 'Immediately after pressing the power button, the computer produces a continuous, repeating sequence of beeps and will not complete POST. The motherboard debug LED is glowing solid amber.',
        options: [
          'Unplug the AC power cord and reseat the RAM modules firmly into slots A2 and B2',
          'Replace the SATA cable connecting the operating system SSD',
          'Reapply thermal paste to the CPU heat spreader',
          'Change the CMOS CR2032 coin cell battery'
        ],
        correctIndex: 0,
        explanation: 'Continuous repeating beeps and an amber diagnostic LED typically indicate an unseated or improperly configured RAM module. Reseating the memory until both latches click firmly resolves the issue.',
        hint: 'Which component is associated with memory channels and the amber debug indicator?'
      },
      {
        title: 'Thermal Shutdown: System Shuts Off After 30 Seconds',
        scenario: 'The freshly built computer boots into the BIOS successfully, but abruptly powers off completely after 30 to 45 seconds. Touching the CPU cooler heatsink reveals it is cool to the touch.',
        options: [
          'The CPU cooler still has its protective transparent plastic peel attached, causing instant thermal shutdown',
          'The PSU wattage is insufficient for idle BIOS operations',
          'The keyboard USB port is short-circuiting the motherboard',
          'The SATA SSD boot sector is corrupt'
        ],
        correctIndex: 0,
        explanation: 'Modern CPUs reach 100°C within seconds without proper heat conduction. If the clear plastic film was not removed from the heatsink base, heat cannot transfer, triggering emergency thermal shutdown.',
        hint: 'Look at why the processor might rapidly overheat even when the metal heatsink feels cold.'
      },
      {
        title: 'No Signs of Life: Front Power Button Does Nothing',
        scenario: 'You flip the power supply rocker switch to "I" and press the case power button on top of the chassis. Absolutely nothing happens: no fans spin, no LEDs blink.',
        options: [
          'Verify the 2-pin PWR_SW connector is plugged into the correct front panel header pins on the motherboard',
          'Replace the monitor display cable with a DisplayPort cable',
          'Reinstall the operating system using UEFI boot media',
          'Check the hard drive partition style using Disk Management'
        ],
        correctIndex: 0,
        explanation: 'If the system shows no signs of life, the momentary switch cable labeled PWR_SW is likely disconnected or misaligned on the front panel header pins (F_PANEL).',
        hint: 'What physical wiring carries the press signal from the chassis button to the motherboard?'
      }
    ]
  },
  {
    id: 'act-lesson-6',
    name: 'Lesson 6 Activity Quiz: Testing Computer Systems',
    type: 'Benchmarking & Quality Assurance',
    iconName: 'CheckCircle2',
    lessonId: 'topic-6',
    lessonBadge: 'Lesson 6 Quiz',
    description: 'Activity quiz evaluating multimeter power rail testing, memory stability (MemTest86), and thermal stress testing for Lesson 6.',
    totalItems: 3,
    items: [
      {
        title: 'Multimeter Testing: ATX DC Voltage Rail Tolerances',
        scenario: 'Using a digital multimeter to test an ATX 24-pin power connector jumped with a paperclip between Pin 16 (PS_ON Green) and Ground (Black), what are the three primary DC voltage rails to measure?',
        options: [
          '+12V (Yellow), +5V (Red), and +3.3V (Orange)',
          '+24V (Blue), +10V (Green), and -10V (White)',
          '+120V AC, +220V AC, and 0V Ground',
          '+9V Battery, +1.5V Cell, and +50V DC'
        ],
        correctIndex: 0,
        explanation: 'Standard ATX specifications supply +12V DC (Yellow wires for CPU/GPU/motors), +5V DC (Red wires for logic/USB/drives), and +3.3V DC (Orange wires for memory/chipset). All must be within ±5% tolerance.',
        hint: 'Identify the three standard ATX low-voltage direct current rails.'
      },
      {
        title: 'Memory Stability Testing: Standalone Boot Verification',
        scenario: 'Which dedicated diagnostic tool should be booted from a USB drive before installing production software to verify that the memory contains zero parity or bit-flip errors?',
        options: [
          'MemTest86',
          'Windows Media Player',
          'Adobe Photoshop Benchmark',
          'Disk Defragmenter'
        ],
        correctIndex: 0,
        explanation: 'MemTest86 runs standalone outside any OS, writing and reading alternating bit patterns across every memory address byte to ensure memory chips and timings are 100% stable.',
        hint: 'What classic memory testing utility runs directly from USB before booting an OS?'
      },
      {
        title: 'Thermal Throttling Verification Under Heavy Load',
        scenario: 'During a 15-minute Prime95 stress test on a freshly built workstation, the CPU clock drops from 4.2 GHz down to 1.8 GHz, and HWMonitor shows core temps at 98°C. What does this test reveal?',
        options: [
          'Thermal throttling: the cooling solution is inadequate or improperly mounted',
          'The power supply is supplying too much clean voltage',
          'The operating system has finished indexing files',
          'The monitor resolution is configured too high'
        ],
        correctIndex: 0,
        explanation: 'When a CPU reaches its thermal maximum (Tjunction, typically 95-100°C), thermal throttling reduces clock speeds to prevent physical destruction, signaling inadequate heat dissipation.',
        hint: 'Why does a processor drop its operating frequency when temperatures approach 100°C?'
      }
    ]
  },
  {
    id: 'act-lesson-7',
    name: 'Capstone Quiz: Practical Case Studies',
    type: 'Practical Case Scenarios',
    iconName: 'BookOpen',
    lessonBadge: 'Case Studies',
    description: 'Activity quiz analyzing realistic laboratory renovation upgrades, rogue standoff short circuits, and environmental maintenance challenges.',
    totalItems: 2,
    items: [
      {
        title: 'Case Study 1: Laboratory Renovation Upgrades',
        scenario: 'BTLED-ICT students are upgrading 30 legacy desktop systems by replacing old HDDs with SATA SSDs and adding a second RAM module. After installing on PC #12, the PC will not boot and emits a burning smell. Inspection shows a standoff was screwed into a position where no motherboard mounting hole existed.',
        options: [
          'The rogue standoff created a dead short circuit between the chassis and live motherboard power traces; remove it immediately and inspect PCB for damage',
          'Add a second standoff next to it to balance the weight',
          'Replace the monitor cable and ignore the smell',
          'Increase the fan speed to blow away the smoke'
        ],
        correctIndex: 0,
        explanation: 'Brass standoffs must strictly match motherboard screw locations. An extra standoff contacts live solder pins on the underside of the PCB, grounding power rails directly to chassis metal and causing severe short circuits.',
        hint: 'What happens when a metal brass standoff touches live circuit traces on the back of a motherboard?'
      },
      {
        title: 'Case Study 2: Intermittent Freezing in Humid Climate',
        scenario: 'During monsoon season, a laboratory computer lab reports intermittent freeze-ups and memory corruption. Inspection shows excessive dust caked across the RAM slots and PCIe lanes, absorbing moisture from the air.',
        options: [
          'Perform preventive maintenance: safely blow dust away using dry compressed air / ESD-safe vacuum and clean contacts with 99% isopropyl alcohol',
          'Spray water on the components to clean them',
          'Wrap the computer case in aluminum foil',
          'Disable memory error checking in Windows'
        ],
        correctIndex: 0,
        explanation: 'Dust combined with atmospheric humidity becomes conductive, creating resistive leakage paths across high-frequency memory bus traces. Thorough cleaning with isopropyl alcohol and dry air restores signal integrity.',
        hint: 'What is the standard professional cleaning agent for electronics and slot contacts?'
      }
    ]
  },
  {
    id: 'act-lesson-8',
    name: 'Final Assessment: Comprehensive Certification Quiz',
    type: 'Summative Assessment Quiz',
    iconName: 'HelpCircle',
    lessonBadge: 'Summative Quiz',
    description: 'Comprehensive multiple-choice assessment covering all lessons from preparation and installation to configuration, troubleshooting, and testing.',
    totalItems: 5,
    items: [
      {
        title: 'Question 1: Thermal Conduction Interface',
        scenario: 'What is the primary technical function of thermal paste between the CPU integrated heat spreader (IHS) and the heatsink base?',
        options: [
          'To fill microscopic air gaps between the metal surfaces for optimal heat conduction',
          'To glue the CPU permanently to the motherboard so it cannot fall out',
          'To insulate the CPU electrically so voltage cannot escape into the cooler',
          'To provide a pleasant scent inside the computer case'
        ],
        correctIndex: 0,
        explanation: 'Air is an extremely poor conductor of heat (thermal insulator). Thermal compound fills microscopic imperfections between the CPU heat spreader and copper cooler base.',
        hint: 'Think about microscopic roughness on metal surfaces and how air pockets block heat transfer.'
      },
      {
        title: 'Question 2: Electrostatic Discharge Safety',
        scenario: 'Which device is used to safely ground a technician and prevent electrostatic discharge (ESD) during sensitive motherboard handling?',
        options: [
          'Anti-static wrist strap with alligator clip attached to chassis ground',
          'Rubber dishwashing gloves',
          'Cotton gardening gloves',
          'Plastic apron'
        ],
        correctIndex: 0,
        explanation: 'An anti-static wrist strap contains a 1-megaohm resistor and grounding cord that safely drains static electricity from the technician to the grounded chassis metal.',
        hint: 'What personal safety device attaches to your wrist and clips to unpainted chassis metal?'
      },
      {
        title: 'Question 3: Firmware POST Routine',
        scenario: 'What does the acronym POST stand for in computer startup terminology?',
        options: [
          'Power-On Self-Test',
          'Primary Operating System Transfer',
          'Programmable Output System Terminal',
          'Peripheral Operation Standard Timing'
        ],
        correctIndex: 0,
        explanation: 'POST stands for Power-On Self-Test, the built-in diagnostic routine performed by the BIOS/UEFI firmware immediately upon receiving power.',
        hint: 'P-O-S-T: The self-test conducted immediately when power is turned on.'
      },
      {
        title: 'Question 4: High-Performance Storage Bus',
        scenario: 'Which storage connection interface protocol provides the highest data transfer bandwidth for modern M.2 solid-state drives?',
        options: [
          'PCIe NVMe (Non-Volatile Memory Express)',
          'SATA III (6 Gbps)',
          'IDE / PATA ribbon cable',
          'Floppy Disk Controller'
        ],
        correctIndex: 0,
        explanation: 'NVMe utilizes direct PCI Express lanes (PCIe 4.0/5.0), reaching speeds over 7,000 MB/s, compared to legacy SATA III which caps out at ~550 MB/s.',
        hint: 'Which protocol communicates directly over PCI Express lanes rather than SATA cables?'
      },
      {
        title: 'Question 5: Fundamental Troubleshooting First Step',
        scenario: 'If a computer does not power on at all, what is the very first logical step in the troubleshooting sequence?',
        options: [
          'Verify the power cable is firmly connected and the PSU rocker switch is set to "I" (On)',
          'Immediately purchase a new processor and motherboard',
          'Format the primary storage drive using command prompt',
          'Desolder the BIOS chip from the motherboard'
        ],
        correctIndex: 0,
        explanation: 'In the CompTIA diagnostic model, always "question the obvious" first: check power plugs, wall outlets, surge protectors, and the PSU power toggle switch before disassembling hardware.',
        hint: 'Always check the simplest, most obvious power source connections first.'
      }
    ]
  }
];

export const LESSONS_DATA: LessonContent[] = LESSONS.map(lesson => ({
  ...lesson,
  description: lesson.shortDesc,
  duration: '12:45'
}));
