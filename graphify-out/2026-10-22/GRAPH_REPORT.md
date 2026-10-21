# Graph Report - dintists  (2026-10-21)

## Corpus Check
- 199 files · ~693,465 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 3, .css 2, .example 1)

## Summary
- 1464 nodes · 2948 edges · 81 communities (69 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2bdd326c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- routeTree.gen.ts
- Core UI Dependencies
- Input and Separator Components
- cn
- Package Metadata Configuration
- TypeScript Compiler Configuration
- Code Quality and Linting Setup
- assets.mjs
- Routing Error Capture System
- Command Palette Dialogs
- Shadcn Component Config
- draw.mjs
- Form Management and Validation
- menubar.tsx
- pagination.tsx
- useI18n
- navigation-menu.tsx
- Recharts Visualization Setup
- repository.ts
- breadcrumb.tsx
- Cookies
- Build and Dev NPM Scripts
- Running Custom Playwright Code
- Select Dropdown Controls
- react
- ESLint Configuration
- lucide-react
- Browser Automation with playwright-cli
- @tanstack/react-router
- utils.ts
- cdp.mjs
- carousel.tsx
- Trace Output Files
- Clinic Launch and Demo Gating
- Package Overrides Configuration
- Vite TanStack Integration
- Aspect Ratio Layouts
- Collapsible Disclosure Panels
- Jest DOM Testing Setup
- Lovable Git Sync Requirements
- i18n.tsx
- 3. Heal
- inspect.mjs
- Routes
- PageHero
- 4. Recipes
- gallery.tsx
- The run
- navigation-menu.tsx
- Imagery
- The study
- playwright-cli/SKILL.md
- Component Catalog & Categories
- Tracing
- Colour
- Layout
- lint.mjs
- Browser Session Management
- Tells — the dated registry
- Type
- Page
- Lenis Smooth Scroll
- Video Recording
- Words
- Advanced Mocking with run-code
- Critique — judging the render
- react
- Core Concepts & Cheatsheet
- tasteskill v2 (`design-taste-frontend`)
- Browser
- rules.mjs
- Attaching Screenshots and Videos to Pull Requests
- drawer.tsx
- input-otp.tsx
- services.index.tsx
- images.ts
- CREDITS.md
- 21st-dev
- lovable-error-reporting.ts
- Best Practices

## God Nodes (most connected - your core abstractions)
1. `cn()` - 220 edges
2. `react` - 92 edges
3. `lucide-react` - 71 edges
4. `useI18n()` - 63 edges
5. `@tanstack/react-router` - 32 edges
6. `getOne()` - 31 edges
7. `PageHero()` - 28 edges
8. `getSupabase()` - 25 edges
9. `DubaiDentalV2()` - 24 edges
10. `search()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `Syntax` --references--> `fetch()`  [INFERRED]
  .agents/skills/playwright-cli/references/running-code.md → src/server.ts
- `TreatmentConsultationPlanner()` --calls--> `useI18n()`  [EXTRACTED]
  src/components/TreatmentConsultationPlanner.tsx → src/lib/i18n.tsx
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogTitle` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (81 total, 12 thin omitted)

### Community 0 - "routeTree.gen.ts"
Cohesion: 0.05
Nodes (55): getRouter(), Route, Route, Route, Route, Route, Route, Route (+47 more)

### Community 1 - "Core UI Dependencies"
Cohesion: 0.03
Nodes (60): dependencies, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, @google/model-viewer, gsap (+52 more)

### Community 2 - "Input and Separator Components"
Cohesion: 0.06
Nodes (40): Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay (+32 more)

### Community 3 - "cn"
Cohesion: 0.07
Nodes (47): @radix-ui/react-accordion, @radix-ui/react-avatar, @radix-ui/react-context-menu, @radix-ui/react-dropdown-menu, @radix-ui/react-tabs, AccordionContent, AccordionItem, AccordionTrigger (+39 more)

### Community 4 - "Package Metadata Configuration"
Cohesion: 0.06
Nodes (33): name, private, sideEffects, type, clsx, date-fns, eslint, eslint-config-prettier (+25 more)

### Community 5 - "TypeScript Compiler Configuration"
Cohesion: 0.08
Nodes (23): compilerOptions, allowImportingTsExtensions, exactOptionalPropertyTypes, jsx, lib, module, moduleResolution, noEmit (+15 more)

### Community 6 - "Code Quality and Linting Setup"
Cohesion: 0.09
Nodes (22): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+14 more)

### Community 7 - "assets.mjs"
Cohesion: 0.07
Nodes (85): AIC_FIELDS, AIC_HEADERS, applyThumb(), ARCHIVE_LICENCE, args, argv, base(), clock() (+77 more)

### Community 8 - "Routing Error Capture System"
Cohesion: 0.16
Nodes (14): @tanstack/react-start, consumeLastCapturedError(), describeError(), describeStatus(), originalConsoleError, safeStringify(), renderErrorPage(), fetch() (+6 more)

### Community 9 - "Command Palette Dialogs"
Cohesion: 0.13
Nodes (17): cmdk, @radix-ui/react-dialog, Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem (+9 more)

### Community 10 - "Shadcn Component Config"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 11 - "draw.mjs"
Cohesion: 0.09
Nodes (39): adjustments(), argv, assetQueries(), ASSETS_PATH, briefStop(), briefWords(), deal(), dealHero() (+31 more)

### Community 12 - "Form Management and Validation"
Cohesion: 0.18
Nodes (14): @radix-ui/react-label, react-hook-form, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+6 more)

### Community 13 - "menubar.tsx"
Cohesion: 0.11
Nodes (12): @radix-ui/react-menubar, Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator (+4 more)

### Community 14 - "pagination.tsx"
Cohesion: 0.12
Nodes (23): @radix-ui/react-alert-dialog, react-day-picker, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader() (+15 more)

### Community 15 - "useI18n"
Cohesion: 0.16
Nodes (18): three, AnatomyPart, partDetails, PartInfo, RealDental3DViewer(), ContactList(), Footer(), Header() (+10 more)

### Community 16 - "navigation-menu.tsx"
Cohesion: 0.14
Nodes (15): class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group, Alert, AlertDescription, AlertTitle, alertVariants, Badge() (+7 more)

### Community 17 - "Recharts Visualization Setup"
Cohesion: 0.24
Nodes (11): recharts, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartStyle(), ChartTooltipContent (+3 more)

### Community 18 - "repository.ts"
Cohesion: 0.12
Nodes (27): ServiceIcon(), doctorsData, galleryData, postsData, processStepsData, reviewsData, servicesData, BlogPost (+19 more)

### Community 19 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (8): @radix-ui/react-slot, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 20 - "Cookies"
Cohesion: 0.06
Nodes (35): Advanced: Multiple Cookies or Custom Options, Advanced: Multiple Operations, Authentication State Reuse, Clear All Cookies, Clear All localStorage, Clear sessionStorage, Common Patterns, Cookies (+27 more)

### Community 21 - "Build and Dev NPM Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, build:dev, dev, format, lint, preview, test (+1 more)

### Community 22 - "Running Custom Playwright Code"
Cohesion: 0.15
Nodes (13): Clipboard, Complex Workflows, Error Handling, File Downloads, Frames and Iframes, Geolocation, JavaScript Execution, Media Emulation (+5 more)

### Community 23 - "Select Dropdown Controls"
Cohesion: 0.28
Nodes (8): @radix-ui/react-select, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 24 - "react"
Cohesion: 0.08
Nodes (28): gsap, sonner, OrisAppointmentForm(), CARE_CARDS, CareCardItem, OrisCareCards(), OrisDentalTemplate(), TEAM_INITIALS (+20 more)

### Community 25 - "ESLint Configuration"
Cohesion: 0.29
Nodes (6): @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 26 - "lucide-react"
Cohesion: 0.25
Nodes (7): lucide-react, clinicData, faqsData, ClinicData, FaqItem, PatientsPage(), TermsPage()

### Community 27 - "Browser Automation with playwright-cli"
Cohesion: 0.07
Nodes (27): Attaching screenshots and videos to pull requests, Browser Automation with playwright-cli, Browser Sessions, Commands, Core, DevTools, Emulation, Example: Debugging with DevTools (+19 more)

### Community 28 - "@tanstack/react-router"
Cohesion: 0.25
Nodes (8): @tanstack/react-router, CustomCursor(), DesktopFloatingWhatsApp(), MobileBottomBar(), ScrollProgress(), TopInfoBar(), SiteSwitcher(), RootComponent()

### Community 29 - "utils.ts"
Cohesion: 0.06
Nodes (22): @radix-ui/react-checkbox, @radix-ui/react-hover-card, @radix-ui/react-popover, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-slider, @radix-ui/react-switch (+14 more)

### Community 31 - "carousel.tsx"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext (+6 more)

### Community 32 - "Trace Output Files"
Cohesion: 0.50
Nodes (4): `resources/`, Trace Output Files, `trace-{timestamp}.network`, `trace-{timestamp}.trace`

### Community 33 - "Clinic Launch and Demo Gating"
Cohesion: 0.67
Nodes (3): Clinic Approval Checklist, Demo Mode, Site Content Config

### Community 40 - "i18n.tsx"
Cohesion: 0.10
Nodes (28): ProcessStep, steps, HeroSearchSection(), HeroSearchSectionProps, symptomQuickChips, TreatmentConsultationPlanner(), quickQueries, UniversalSearchModalProps (+20 more)

### Community 41 - "3. Heal"
Cohesion: 0.09
Nodes (23): 0. How generation works, 1.1 Prerequisite: workspace, 1.2 Prerequisite: seed test, 1.3 Explore the app, 1.4 Write the spec file, 1. Planning, 2.1 Inputs, 2.2 Generate one scenario (+15 more)

### Community 42 - "inspect.mjs"
Cohesion: 0.10
Nodes (12): allow, args, asJson, fails, HEIGHT, merged, outDir, report (+4 more)

### Community 44 - "PageHero"
Cohesion: 0.18
Nodes (18): @tanstack/react-query, ClinicalProcessWorkflow(), DoctorCapsuleCard(), DoctorCapsuleCardProps, PageHero(), Doctor, PostItem, getClinic() (+10 more)

### Community 45 - "4. Recipes"
Cohesion: 0.10
Nodes (19): 1. The budget, 2. Four questions before any animation, 3. Tokens, 4. Recipes, 5. Signature moves, 6. Reduced motion and performance, 7. What gives generated motion away, Accordion (+11 more)

### Community 46 - "gallery.tsx"
Cohesion: 0.31
Nodes (6): cases, SmileComparisonSlider(), TransformationCase, getGalleryCases(), t, GalleryPage()

### Community 47 - "The run"
Cohesion: 0.12
Nodes (16): 10. Report, 1. Read the brief and the project, 2. Write the argument, 3. Draw the direction, 4. Find the idea, 5. Write the words, 6. Build it, still, 7. Gate (+8 more)

### Community 48 - "navigation-menu.tsx"
Cohesion: 0.28
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 49 - "Imagery"
Cohesion: 0.14
Nodes (13): 10. Markup and credits, 11. Video, 1. What the study measured, 2. Decide what imagery exists, 3. Real pictures from the open collections, 4. The dealt photographs, 5. Cropping and placing, 6. Treatment (+5 more)

### Community 50 - "The study"
Cohesion: 0.14
Nodes (13): 10. The 25 highest-scored sites and their ideas, 11. How the skill was tested, 1. Method and its limits, 2. Scores, 3. Where the idea comes from, 4. Headlines, 5. Type, 6. Devices: what separates strong from weak, and what does not (+5 more)

### Community 51 - "playwright-cli/SKILL.md"
Cohesion: 0.21
Nodes (4): Examples, Inspecting Element Attributes, Debugging Playwright Tests, Running Playwright Tests

### Community 52 - "Component Catalog & Categories"
Cohesion: 0.15
Nodes (12): 1. Text Animations, 2. Animated & Shader Backgrounds, 3. Interactive Animations & Micro-interactions, 4. Interactive Components & Cards, Component Catalog & Categories, Configuration & Setup, Installation via shadcn CLI, Integration Guidelines (+4 more)

### Community 53 - "Tracing"
Cohesion: 0.15
Nodes (12): 1. Start Tracing Before the Problem, 2. Clean Up Old Traces, Analyzing Performance, Basic Usage, Best Practices, Capturing Evidence, Debugging Failed Actions, Limitations (+4 more)

### Community 54 - "Colour"
Cohesion: 0.17
Nodes (11): 1. What the study measured, 2. The roles, 3. Proportion, 4. Surfaces without lines or shadows, 5. Colour fields, 6. Dark pages, 7. Colour and photographs, 8. Contrast (+3 more)

### Community 55 - "Layout"
Cohesion: 0.17
Nodes (11): 1. What strong pages do, 2. Margins and the grid, 3. Where text sits, 4. Empty space, 5. Sections: carry the idea, vary the arrangement, 6. Navigation, 7. Endings, 8. The phone is a second composition (+3 more)

### Community 56 - "lint.mjs"
Cohesion: 0.17
Nodes (11): args, asJson, byId, EXT, files, findings, R, roots (+3 more)

### Community 57 - "Browser Session Management"
Cohesion: 0.12
Nodes (16): A/B Testing Sessions, Attach by channel name, Attach via browser extension, Attach via CDP endpoint, Attaching to a Running Browser, Browser Session Commands, Browser Session Configuration, Browser Session Isolation Properties (+8 more)

### Community 58 - "Tells — the dated registry"
Cohesion: 0.18
Nodes (10): 1. First wave (2023–2024), 2. Second wave (2025), 3. Third wave (2025–2026): the "fix" that became the look, 4. Gallery fashion, banned as house style, 5. Structural tells, 6. Copy tells, 7. Motion tells, 8. Why removal is not enough (+2 more)

### Community 59 - "Type"
Cohesion: 0.18
Nodes (10): 1. What the study measured, 2. The scale: few sizes, far apart, 3. Setting display type, 4. Setting text, 5. Loading the fonts properly, 6. One family or two, 7. Details that separate set type from typed text, 8. Mistakes the inspector cannot see (+2 more)

### Community 61 - "Lenis Smooth Scroll"
Cohesion: 0.20
Nodes (9): 1. Scroll to Anchor or Target, 2. Lock Scroll for Modals / Drawers, 3. Exclude Specific Elements (e.g., Inner Scrollable Containers), Basic Setup (Vanilla / Script), Installation, Lenis Smooth Scroll, Perfect Sync with GSAP ScrollTrigger, React / TanStack Start Integration (+1 more)

### Community 62 - "Video Recording"
Cohesion: 0.20
Nodes (10): 1. Use Descriptive Filenames, 2. Record entire hero scripts., 3. Attach the recording to the pull request, Basic Recording, Best Practices, Cursor, Target Highlight and Click Point, Limitations, Overlay API Summary (+2 more)

### Community 63 - "Words"
Cohesion: 0.20
Nodes (9): 1. Write the argument first, 2. The two-line headline, 3. Headline shapes that work, 4. Supporting line, body, buttons, 5. Proof without inventing it, 6. Things that read as generated, 7. Micro-typography, Contents (+1 more)

### Community 64 - "Advanced Mocking with run-code"
Cohesion: 0.25
Nodes (8): Advanced Mocking with run-code, CLI Route Commands, Conditional Response Based on Request, Delayed Response, Modify Real Response, Request Mocking, Simulate Network Failures, URL Patterns

### Community 65 - "Critique — judging the render"
Cohesion: 0.22
Nodes (8): 1. How to look, 2. The score, 3. Caps, 4. Writing the critique, 5. What to fix first, 6. When to stop, Contents, Critique — judging the render

### Community 66 - "react"
Cohesion: 0.05
Nodes (87): react, DubaiDentalV2(), BlogPost, DentalService, DoctorProfile, EVIA_BLOG, EVIA_DOCTORS, EVIA_FAQS (+79 more)

### Community 67 - "Core Concepts & Cheatsheet"
Cohesion: 0.25
Nodes (7): 1. Basic Tweens, 2. Timelines, 3. ScrollTrigger Plugin, 4. Integration in React & TanStack Start, 5. Performance Best Practices, Core Concepts & Cheatsheet, GSAP (GreenSock Animation Platform)

### Community 68 - "tasteskill v2 (`design-taste-frontend`)"
Cohesion: 0.29
Nodes (6): Contents, How it works, Install, Notes, Requirements, tasteskill v2 (`design-taste-frontend`)

### Community 70 - "rules.mjs"
Cohesion: 0.53
Nodes (5): colourFamily(), hexToHsl(), inRange(), judge(), RULE_IDS

### Community 71 - "Attaching Screenshots and Videos to Pull Requests"
Cohesion: 0.40
Nodes (5): Attaching Screenshots and Videos to Pull Requests, From a local session, From CI, Limits, When to attach

### Community 72 - "drawer.tsx"
Cohesion: 0.25
Nodes (7): vaul, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 73 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 74 - "services.index.tsx"
Cohesion: 0.53
Nodes (4): ServiceArchCard(), ServiceArchCardProps, Service, ServicesIndexPage()

### Community 75 - "images.ts"
Cohesion: 0.50
Nodes (3): imagesData, ImageSlot, ImageStatus

### Community 78 - "21st-dev"
Cohesion: 0.40
Nodes (4): API_KEY, npx, 21st-dev, @21st-dev/mcp-server

### Community 79 - "lovable-error-reporting.ts"
Cohesion: 0.33
Nodes (6): describeThrown(), LovableErrorOptions, LovableEvents, reportLovableError(), Window, ErrorComponent()

### Community 80 - "Best Practices"
Cohesion: 0.50
Nodes (4): 1. Name Browser Sessions Semantically, 2. Always Clean Up, 3. Delete Stale Browser Data, Best Practices

## Knowledge Gaps
- **29 isolated node(s):** `npx`, `@21st-dev/mcp-server`, `API_KEY`, `@google/model-viewer`, `@hookform/resolvers` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 661 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Input and Separator Components`, `cn`, `Package Metadata Configuration`, `Command Palette Dialogs`, `Form Management and Validation`, `menubar.tsx`, `pagination.tsx`, `useI18n`, `navigation-menu.tsx`, `Recharts Visualization Setup`, `repository.ts`, `breadcrumb.tsx`, `Select Dropdown Controls`, `react`, `lucide-react`, `@tanstack/react-router`, `utils.ts`, `carousel.tsx`, `i18n.tsx`, `gallery.tsx`, `navigation-menu.tsx`, `drawer.tsx`, `input-otp.tsx`, `services.index.tsx`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **What connects `npx`, `@21st-dev/mcp-server`, `API_KEY` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `routeTree.gen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050816696914700546 - nodes in this community are weakly interconnected._
- **Why does `Running Custom Playwright Code` connect `Running Custom Playwright Code` to `playwright-cli/SKILL.md`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `Core UI Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.03333333333333333 - nodes in this community are weakly interconnected._
- **Why does `fetch()` connect `Routing Error Capture System` to `Running Custom Playwright Code`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `Input and Separator Components` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._