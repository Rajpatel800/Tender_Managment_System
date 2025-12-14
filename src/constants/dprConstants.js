// Static data constants for DPR form auto-fill and dropdowns

// Rajasthan Districts
export const RAJASTHAN_DISTRICTS = [
  'Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara',
  'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur',
  'Ganganagar', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar',
  'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh',
  'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'
];

// Common Tehsils (can be expanded)
export const COMMON_TEHSILS = [
  'Ajmer', 'Beawar', 'Kekri', 'Nasirabad', 'Pisangan',
  'Alwar', 'Bansur', 'Behror', 'Kishangarh Bas', 'Rajgarh', 'Tijara',
  'Jaipur', 'Amber', 'Bassi', 'Chaksu', 'Chomu', 'Dudu', 'Jamwa Ramgarh', 'Kotputli', 'Phagi', 'Phulera', 'Sanganer', 'Shahpura',
  'Jodhpur', 'Bilara', 'Bhopalgarh', 'Luni', 'Osian', 'Phalodi', 'Shergarh',
  'Udaipur', 'Girwa', 'Kherwara', 'Rishabhdeo', 'Salumbar', 'Sarada', 'Vallabhnagar',
  'Kota', 'Digod', 'Itawa', 'Ladpura', 'Pipalda', 'Ramganj Mandi', 'Sangod',
  'Bharatpur', 'Bayana', 'Deeg', 'Kaman', 'Kumher', 'Nadbai', 'Nagar', 'Rupbas', 'Weir',
  'Bhilwara', 'Asind', 'Banera', 'Hurda', 'Jahazpur', 'Kotri', 'Mandal', 'Mandalgarh', 'Raipur', 'Sahada', 'Shahpura', 'Sukher'
];

// Government Departments in Rajasthan
export const DEPARTMENTS = [
  'Public Works Department (PWD)',
  'Water Resources Department',
  'Rural Development and Panchayati Raj',
  'Urban Development and Housing',
  'Public Health Engineering Department (PHED)',
  'Energy Department',
  'Transport Department',
  'Education Department',
  'Health and Family Welfare',
  'Agriculture Department',
  'Forest Department',
  'Tourism Department',
  'Information Technology and Communication',
  'Revenue Department',
  'Home Department'
];

// Project Types
export const PROJECT_TYPES = [
  'Infrastructure Development',
  'Water Supply',
  'Road Construction',
  'Building Construction',
  'Irrigation Project',
  'Power Project',
  'Telecommunication',
  'Healthcare Infrastructure',
  'Educational Infrastructure',
  'Rural Development',
  'Urban Development',
  'Environmental Project',
  'Tourism Infrastructure'
];

// Funding Sources
export const FUNDING_SOURCES = [
  'State Government Budget',
  'Central Government Scheme',
  'Centrally Sponsored Scheme',
  'World Bank',
  'Asian Development Bank',
  'JICA (Japan International Cooperation Agency)',
  'Public Private Partnership (PPP)',
  'Corporate Social Responsibility (CSR)',
  'State Plan Scheme',
  'District Mineral Foundation (DMF)',
  'MGNREGA',
  'PMGSY (Pradhan Mantri Gram Sadak Yojana)',
  'AMRUT (Atal Mission for Rejuvenation and Urban Transformation)',
  'Smart City Mission'
];

// Auto-fill static data (same every time)
export const AUTO_FILL_DATA = {
  state: 'Rajasthan',
  country: 'India',
  government: 'Government of Rajasthan',
  defaultDepartment: 'Public Works Department (PWD)',
  defaultProjectCodePrefix: 'RJ-PWD',
  currentYear: new Date().getFullYear(),
  defaultTimeline: '12', // months
  defaultCurrency: 'INR (₹)'
};

// Generate project code automatically
export const generateProjectCode = (department, projectType) => {
  const deptCode = department ? department.substring(0, 3).toUpperCase() : 'PWD';
  const typeCode = projectType ? projectType.substring(0, 2).toUpperCase() : 'PR';
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${deptCode}-${typeCode}-${year}-${random}`;
};

