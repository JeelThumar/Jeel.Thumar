export const caseStudies = [
    {
        id: "guestpostlinks-admin",
        title: "GuestPostLinks Admin Panel Redesign",
        subtitle: "Streamlining daily operations for 50+ internal team members across 65,000+ publishers.",
        client: "GuestPostLinks (via Amrytt Media LLC)",
        role: "Product Designer (Sole designer collaborating with CEO & engineering)",
        period: "April 2026 – October 2026",
        scale: "50+ internal team members · 65,000+ publishers",
        liveReference: "https://guestpostlinks.net/about-us/",
        summary:
            "As GuestPostLinks scaled its publisher catalog and operational modules, the internal console grew organically without centralized design governance. I partnered directly with the CEO, engineering, and daily operators to restructure workflows, unify table and action patterns, and eliminate cognitive friction.",
        metrics: [
            {
                value: "50+",
                label: "Internal Team Users",
                detail: "Actively relying on the panel across shift rotations."
            },
            {
                value: "65,000+",
                label: "Publishers Supported",
                detail: "Comprehensive catalog of domains, pricing, and placement metrics."
            },
            {
                value: "100%",
                label: "Pattern Consistency",
                detail: "Unified table layouts, filter mechanisms, and primary action patterns across all modules."
            },
            {
                value: "Zero",
                label: "Adoption Friction",
                detail: "Rapid team transition achieved through participatory co-design."
            }
        ],
        problems: [
            {
                title: "Crowded Interfaces",
                description:
                    "Screens were heavily congested with redundant input fields, disorganized filters, and competing action buttons lacking visual priority."
            },
            {
                title: "Fragmented Task Flows",
                description:
                    "Workflows strictly mirrored the backend database schema rather than the operator's mental model, forcing team members to jump across tabs to process a single publisher order."
            },
            {
                title: "High Cognitive Load",
                description:
                    "Operators had to memorize where specific data lived and determine their next operational step through trial and error."
            }
        ],
        researchMethodology: [
            {
                step: "01",
                title: "Initial Discovery",
                description:
                    "Conducted open-ended contextual interviews with daily operators across publisher onboarding, order fulfillment, content verification, and financial payouts."
            },
            {
                step: "02",
                title: "Workflow Mapping",
                description:
                    "Deconstructed end-to-end task sequences to prioritize tasks by frequency and operator intent."
            },
            {
                step: "03",
                title: "Iterative Co-Design Reviews",
                description:
                    "Presented interactive prototypes back to the operators in weekly review cycles to validate assumptions and uncover edge cases."
            }
        ],
        designDecisions: [
            {
                number: "01",
                title: "Bring Related Steps Together",
                description:
                    "Restructured fragmented task stages into logical, linear sequences, cutting down context-switching."
            },
            {
                number: "02",
                title: "Make the Next Action Easier to Find",
                description:
                    "Established a definitive visual hierarchy—elevating primary workflow triggers while tucking away secondary configurations."
            },
            {
                number: "03",
                title: "Create Familiar Patterns Across Modules",
                description:
                    "Standardized tables, bulk selection toolbars, filter chips, and status badges so operators learn once and navigate anywhere."
            },
            {
                number: "04",
                title: "Make Busy Screens Easier to Scan",
                description:
                    "Introduced generous whitespace, clear grouping cards, and high-contrast alert indicators for pending items."
            }
        ],
        outcomes: [
            {
                title: "Faster Order Turnaround",
                description:
                    "Substantial reduction in daily task completion time across order management and publisher approvals."
            },
            {
                title: "Frictionless Onboarding",
                description:
                    "Drastically reduced training time for incoming team members."
            }
        ],
        keyTakeaway:
            "The first discussion revealed the obvious pain points; later reviews uncovered subtle dependencies that truly influenced everyday work. Simplification requires deep judgment—deciding what to group, move, or hide matters just as much as designing screens."
    }
];

export const upcomingCaseStudies = [
    {
        id: "dkc-designer-kids-club",
        title: "Designer Kids Club",
        category: "Fashion-Tech & Multi-Role Commerce",
        scope:
            "Customer buying/selling/renting/repairing mobile app, vendor portals, virtual try-on, and platform administration."
    },
    {
        id: "adani-saksham",
        title: "Adani Saksham",
        category: "EdTech & Skill Development",
        scope:
            "Triple-role portal connecting learners, trainers, and administrators with structured course catalogs and reporting."
    },
    {
        id: "group-landmark",
        title: "Group Landmark",
        category: "Automotive & Dealer Operations",
        scope:
            "Customer vehicle discovery and dealer management systems for Honda and Mercedes-Benz dealerships."
    },
    {
        id: "foodboss",
        title: "FoodBoss",
        category: "Quick Commerce & Multi-Role Operations",
        scope:
            "Consumer food delivery application integrated with role-based vendor, writer, and master administration consoles."
    }
];
