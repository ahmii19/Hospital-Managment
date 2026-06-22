// ============================================================
// MOCK DATA - Hospital Management System
// ============================================================

export const DOCTORS = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', avatar: 'SJ', color: '#00B4D8', rating: 4.9, patients: 124, shift: '08:00 - 16:00', status: 'Available', experience: '12 years', phone: '+1-555-0101', email: 'sarah.j@hospital.com', bio: 'Expert in interventional cardiology with over 12 years of experience.', department: 'Cardiology' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', avatar: 'MC', color: '#7209B7', rating: 4.8, patients: 98, shift: '09:00 - 17:00', status: 'Busy', experience: '9 years', phone: '+1-555-0102', email: 'michael.c@hospital.com', bio: 'Specialized in treating complex neurological disorders.', department: 'Neurology' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', avatar: 'ER', color: '#10b981', rating: 4.9, patients: 210, shift: '07:00 - 15:00', status: 'Available', experience: '15 years', phone: '+1-555-0103', email: 'emily.r@hospital.com', bio: 'Dedicated to providing compassionate care for children.', department: 'Pediatrics' },
  { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedic', avatar: 'JW', color: '#f59e0b', rating: 4.7, patients: 87, shift: '10:00 - 18:00', status: 'Off Duty', experience: '20 years', phone: '+1-555-0104', email: 'james.w@hospital.com', bio: 'Leading orthopedic surgeon specializing in joint replacements.', department: 'Orthopedics' },
  { id: 5, name: 'Dr. Priya Patel', specialization: 'Dermatologist', avatar: 'PP', color: '#ef4444', rating: 4.6, patients: 156, shift: '09:00 - 17:00', status: 'Available', experience: '8 years', phone: '+1-555-0105', email: 'priya.p@hospital.com', bio: 'Skin specialist with expertise in cosmetic and medical dermatology.', department: 'Dermatology' },
  { id: 6, name: 'Dr. Robert Kim', specialization: 'Radiologist', avatar: 'RK', color: '#6366f1', rating: 4.8, patients: 203, shift: '08:00 - 20:00', status: 'Busy', experience: '11 years', phone: '+1-555-0106', email: 'robert.k@hospital.com', bio: 'Advanced imaging specialist with AI-assisted diagnostics expertise.', department: 'Radiology' },
];

export const PATIENTS = [
  { id: 1, name: 'Alice Thompson', age: 34, gender: 'Female', doctor: 'Dr. Sarah Johnson', status: 'Admitted', blood: 'A+', room: 'ICU-02', diagnosis: 'Hypertension', phone: '+1-555-1001', email: 'alice.t@email.com', admitDate: '2024-01-15', avatar: 'AT', healthScore: 72, vitals: { bp: '140/90', pulse: 88, temp: 37.2, oxygen: 96 } },
  { id: 2, name: 'Bob Martinez', age: 52, gender: 'Male', doctor: 'Dr. Michael Chen', status: 'Outpatient', blood: 'B+', room: 'OPD-5', diagnosis: 'Migraine', phone: '+1-555-1002', email: 'bob.m@email.com', admitDate: '2024-01-16', avatar: 'BM', healthScore: 85, vitals: { bp: '120/80', pulse: 72, temp: 36.8, oxygen: 98 } },
  { id: 3, name: 'Carol Davis', age: 28, gender: 'Female', doctor: 'Dr. Emily Rodriguez', status: 'Discharged', blood: 'O+', room: 'Ward-3', diagnosis: 'Fever', phone: '+1-555-1003', email: 'carol.d@email.com', admitDate: '2024-01-10', avatar: 'CD', healthScore: 95, vitals: { bp: '118/75', pulse: 68, temp: 36.5, oxygen: 99 } },
  { id: 4, name: 'David Lee', age: 65, gender: 'Male', doctor: 'Dr. James Wilson', status: 'Admitted', blood: 'AB+', room: 'Ward-7', diagnosis: 'Knee Replacement', phone: '+1-555-1004', email: 'david.l@email.com', admitDate: '2024-01-14', avatar: 'DL', healthScore: 68, vitals: { bp: '135/85', pulse: 80, temp: 37.0, oxygen: 97 } },
  { id: 5, name: 'Emma Wilson', age: 45, gender: 'Female', doctor: 'Dr. Priya Patel', status: 'Outpatient', blood: 'A-', room: 'OPD-2', diagnosis: 'Eczema', phone: '+1-555-1005', email: 'emma.w@email.com', admitDate: '2024-01-17', avatar: 'EW', healthScore: 88, vitals: { bp: '122/78', pulse: 70, temp: 36.9, oxygen: 98 } },
  { id: 6, name: 'Frank Brown', age: 58, gender: 'Male', doctor: 'Dr. Robert Kim', status: 'Admitted', blood: 'O-', room: 'ICU-01', diagnosis: 'Chest Pain', phone: '+1-555-1006', email: 'frank.b@email.com', admitDate: '2024-01-13', avatar: 'FB', healthScore: 55, vitals: { bp: '155/95', pulse: 95, temp: 37.5, oxygen: 94 } },
  { id: 7, name: 'Grace Kim', age: 22, gender: 'Female', doctor: 'Dr. Emily Rodriguez', status: 'Outpatient', blood: 'B-', room: 'OPD-8', diagnosis: 'Asthma', phone: '+1-555-1007', email: 'grace.k@email.com', admitDate: '2024-01-18', avatar: 'GK', healthScore: 79, vitals: { bp: '116/74', pulse: 76, temp: 36.7, oxygen: 95 } },
  { id: 8, name: 'Henry Ford', age: 71, gender: 'Male', doctor: 'Dr. Sarah Johnson', status: 'Admitted', blood: 'A+', room: 'Ward-5', diagnosis: 'Heart Failure', phone: '+1-555-1008', email: 'henry.f@email.com', admitDate: '2024-01-12', avatar: 'HF', healthScore: 48, vitals: { bp: '160/100', pulse: 102, temp: 37.8, oxygen: 92 } },
];

export const APPOINTMENTS = [
  { id: 1, patient: 'Alice Thompson', doctor: 'Dr. Sarah Johnson', date: '2024-01-25', time: '09:00', department: 'Cardiology', status: 'Confirmed', type: 'Checkup', duration: 30 },
  { id: 2, patient: 'Bob Martinez', doctor: 'Dr. Michael Chen', date: '2024-01-25', time: '10:30', department: 'Neurology', status: 'Pending', type: 'Follow-up', duration: 45 },
  { id: 3, patient: 'Carol Davis', doctor: 'Dr. Emily Rodriguez', date: '2024-01-25', time: '11:00', department: 'Pediatrics', status: 'Completed', type: 'Checkup', duration: 30 },
  { id: 4, patient: 'David Lee', doctor: 'Dr. James Wilson', date: '2024-01-26', time: '14:00', department: 'Orthopedics', status: 'Confirmed', type: 'Surgery Consult', duration: 60 },
  { id: 5, patient: 'Emma Wilson', doctor: 'Dr. Priya Patel', date: '2024-01-26', time: '09:30', department: 'Dermatology', status: 'Pending', type: 'Treatment', duration: 30 },
  { id: 6, patient: 'Frank Brown', doctor: 'Dr. Robert Kim', date: '2024-01-27', time: '08:00', department: 'Radiology', status: 'Confirmed', type: 'MRI Scan', duration: 90 },
  { id: 7, patient: 'Grace Kim', doctor: 'Dr. Emily Rodriguez', date: '2024-01-27', time: '15:00', department: 'Pediatrics', status: 'Cancelled', type: 'Checkup', duration: 30 },
  { id: 8, patient: 'Henry Ford', doctor: 'Dr. Sarah Johnson', date: '2024-01-28', time: '10:00', department: 'Cardiology', status: 'Confirmed', type: 'Emergency', duration: 60 },
  { id: 9, patient: 'Alice Thompson', doctor: 'Dr. Sarah Johnson', date: '2024-01-29', time: '11:30', department: 'Cardiology', status: 'Pending', type: 'Follow-up', duration: 30 },
  { id: 10, patient: 'Bob Martinez', doctor: 'Dr. Michael Chen', date: '2024-01-30', time: '13:00', department: 'Neurology', status: 'Confirmed', type: 'Consultation', duration: 45 },
];

export const REPORTS = [
  { id: 1, patient: 'Alice Thompson', type: 'Blood Test', date: '2024-01-20', doctor: 'Dr. Sarah Johnson', status: 'Normal', size: '1.2 MB', format: 'PDF' },
  { id: 2, patient: 'Bob Martinez', type: 'MRI Scan', date: '2024-01-19', doctor: 'Dr. Michael Chen', status: 'Review', size: '45 MB', format: 'DICOM' },
  { id: 3, patient: 'Frank Brown', type: 'ECG Report', date: '2024-01-18', doctor: 'Dr. Sarah Johnson', status: 'Critical', size: '0.8 MB', format: 'PDF' },
  { id: 4, patient: 'David Lee', type: 'X-Ray', date: '2024-01-17', doctor: 'Dr. James Wilson', status: 'Normal', size: '12 MB', format: 'JPEG' },
  { id: 5, patient: 'Emma Wilson', type: 'Skin Biopsy', date: '2024-01-16', doctor: 'Dr. Priya Patel', status: 'Pending', size: '3.5 MB', format: 'PDF' },
  { id: 6, patient: 'Grace Kim', type: 'Spirometry', date: '2024-01-15', doctor: 'Dr. Emily Rodriguez', status: 'Normal', size: '0.5 MB', format: 'PDF' },
  { id: 7, patient: 'Henry Ford', type: 'Echocardiogram', date: '2024-01-14', doctor: 'Dr. Sarah Johnson', status: 'Critical', size: '28 MB', format: 'DICOM' },
];

export const EMERGENCY_ALERTS = [
  { id: 1, patient: 'Henry Ford', type: 'Cardiac Arrest', room: 'ICU-01', time: '14:32', severity: 'Critical', status: 'Active', doctor: 'Dr. Sarah Johnson' },
  { id: 2, patient: 'Unknown Male', type: 'Trauma - Road Accident', room: 'ER-03', time: '14:45', severity: 'Critical', status: 'Active', doctor: 'Dr. James Wilson' },
  { id: 3, patient: 'Frank Brown', type: 'Respiratory Distress', room: 'ICU-02', time: '13:20', severity: 'High', status: 'Stable', doctor: 'Dr. Robert Kim' },
  { id: 4, patient: 'Alice Thompson', type: 'Hypertensive Crisis', room: 'ER-01', time: '12:55', severity: 'High', status: 'Monitoring', doctor: 'Dr. Sarah Johnson' },
  { id: 5, patient: 'Mary Johnson', type: 'Allergic Reaction', room: 'ER-05', time: '11:30', severity: 'Medium', status: 'Stable', doctor: 'Dr. Emily Rodriguez' },
];

export const AMBULANCES = [
  { id: 'AMB-01', status: 'Dispatched', destination: 'City Center Accident', eta: '8 min', driver: 'John Doe' },
  { id: 'AMB-02', status: 'Available', destination: '-', eta: '-', driver: 'Mike Smith' },
  { id: 'AMB-03', status: 'On Scene', destination: 'Highway 5 Emergency', eta: 'On Location', driver: 'Sara Lee' },
  { id: 'AMB-04', status: 'In Maintenance', destination: '-', eta: '-', driver: '-' },
  { id: 'AMB-05', status: 'Available', destination: '-', eta: '-', driver: 'Tom Brown' },
];

export const NOTIFICATIONS = [
  { id: 1, message: 'Patient Henry Ford needs immediate attention in ICU-01', time: '2 min ago', type: 'critical', read: false },
  { id: 2, message: 'New appointment booked: Alice Thompson - Dr. Sarah Johnson', time: '15 min ago', type: 'info', read: false },
  { id: 3, message: 'Lab results ready for Frank Brown', time: '1 hr ago', type: 'success', read: false },
  { id: 4, message: 'Dr. Michael Chen shift starts in 30 minutes', time: '2 hrs ago', type: 'warning', read: true },
  { id: 5, message: 'Monthly report generated successfully', time: '5 hrs ago', type: 'success', read: true },
];

export const CHART_DATA = {
  monthlyAdmissions: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    admissions: [145, 162, 178, 155, 190, 205, 220],
    discharges: [132, 148, 165, 142, 178, 195, 208],
  },
  departmentPerformance: {
    labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Radiology'],
    patients: [124, 98, 210, 87, 156, 203],
    revenue: [450, 320, 280, 390, 210, 510],
  },
  patientCategories: [35, 28, 20, 17],
  diseaseDistribution: {
    labels: ['Heart Disease', 'Diabetes', 'Hypertension', 'Neurological', 'Orthopedic', 'Others'],
    data: [22, 18, 15, 12, 10, 23],
  },
  doctorPerformance: {
    labels: ['Punctuality', 'Patient Rating', 'Success Rate', 'Active Hours', 'Research', 'Teamwork'],
    datasets: [
      { label: 'Dr. Sarah Johnson', data: [95, 98, 92, 88, 75, 90], color: '#00B4D8' },
      { label: 'Dr. Michael Chen', data: [88, 92, 87, 82, 90, 85], color: '#7209B7' },
    ],
  },
  revenue: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    data: [420000, 485000, 510000, 475000, 545000, 590000, 625000],
  },
  aiAccuracy: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    data: [78, 81, 83, 85, 87, 90, 92],
  },
};

export const AI_INSIGHTS = [
  { id: 1, icon: '🔴', severity: 'High', message: 'ICU occupancy surge expected next Tuesday — 87% capacity predicted', confidence: 92, category: 'Capacity' },
  { id: 2, icon: '🟡', severity: 'Medium', message: 'Seasonal allergy cases increasing — 23% spike in OPD visits expected', confidence: 78, category: 'Trend' },
  { id: 3, icon: '🟢', severity: 'Low', message: 'Patient recovery rates up 8% compared to last month', confidence: 95, category: 'Performance' },
  { id: 4, icon: '🔴', severity: 'High', message: 'Dr. Henry Ford shows elevated cardiac risk markers — immediate review recommended', confidence: 88, category: 'Patient' },
  { id: 5, icon: '🟡', severity: 'Medium', message: 'Staff shortage predicted in Neurology dept. on weekends', confidence: 73, category: 'Staffing' },
];

export const DISEASE_PREDICTIONS = [
  { disease: 'Diabetes Risk', patient: 'Frank Brown', risk: 78, trend: 'up', indicators: ['High Blood Sugar', 'BMI > 30', 'Family History'], recommendation: 'Immediate dietary intervention and insulin monitoring' },
  { disease: 'Hypertension', patient: 'Alice Thompson', risk: 65, trend: 'up', indicators: ['BP: 140/90', 'Stress Markers High', 'Salt intake elevated'], recommendation: 'Beta-blocker adjustment and lifestyle modifications' },
  { disease: 'Heart Disease', patient: 'Henry Ford', risk: 89, trend: 'up', indicators: ['ECG Abnormality', 'Cholesterol: 240 mg/dL', 'Age > 65'], recommendation: 'Urgent cardiology review and stent evaluation' },
];

export const DEPARTMENTS = [
  { name: 'Cardiology', head: 'Dr. Sarah Johnson', beds: 40, occupied: 32, color: '#ef4444' },
  { name: 'Neurology', head: 'Dr. Michael Chen', beds: 30, occupied: 18, color: '#7209B7' },
  { name: 'Pediatrics', head: 'Dr. Emily Rodriguez', beds: 50, occupied: 38, color: '#10b981' },
  { name: 'Orthopedics', head: 'Dr. James Wilson', beds: 35, occupied: 22, color: '#f59e0b' },
  { name: 'Dermatology', head: 'Dr. Priya Patel', beds: 20, occupied: 10, color: '#00B4D8' },
  { name: 'Radiology', head: 'Dr. Robert Kim', beds: 15, occupied: 8, color: '#6366f1' },
];
