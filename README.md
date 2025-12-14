# DPR Generator - Government of Rajasthan

A comprehensive role-based web platform for managing Detailed Project Reports (DPRs) and tenders for the Government of Rajasthan.

## Features

### Role-Based Access Control
- **Junior Engineer**: Create, edit, and submit DPRs
- **Senior Engineer**: Review DPRs, approve them, and create tenders
- **Admin**: Manage users, rate master, system settings, and audit logs
- **Contractor**: View tenders, submit bids, and track awarded works

### Key Functionalities
- Multi-step DPR creation with structured forms
- DPR review and approval workflow
- Tender creation from approved DPRs
- Bid submission with document uploads
- User management and system administration
- Rate master for materials and equipment
- Comprehensive audit logging

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/          # Reusable components (Header, Footer, etc.)
├── context/            # React context (AuthContext)
├── pages/              # Page components
│   ├── Admin/         # Admin role pages
│   ├── Contractor/    # Contractor role pages
│   ├── JuniorEngineer/ # Junior Engineer role pages
│   ├── SeniorEngineer/ # Senior Engineer role pages
│   ├── LandingPage.js
│   └── Login.js
└── App.js             # Main app component with routing
```

## Login Credentials

For demo purposes, the login system includes a role selector:
- Select your role from the dropdown on the login page
- Available roles: Junior Engineer, Senior Engineer, Admin, Contractor
- Enter any username and password (all accepted for demo purposes)

## Technology Stack

- React 18
- React Router DOM 6
- CSS3 for styling

## Design

The UI follows the Government of Rajasthan design language with:
- Clean, professional government look & feel
- Consistent color scheme (blue primary, grey backgrounds)
- Card-based layouts with shadows
- Responsive design

## License

© 2024 Government of Rajasthan. All rights reserved.

