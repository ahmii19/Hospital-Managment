import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Theme
  theme: localStorage.getItem('hms_theme') || 'dark',
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('hms_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    set({ theme: next });
  },

  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  mobileMenuOpen: false,
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),

  // Notifications
  notificationsOpen: false,
  toggleNotifications: () => set(s => ({ notificationsOpen: !s.notificationsOpen })),
  unreadCount: 3,

  // Search
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  // Patients
  patients: [],
  setPatients: (p) => set({ patients: p }),
  selectedPatient: null,
  setSelectedPatient: (p) => set({ selectedPatient: p }),

  // Doctors
  doctors: [],
  setDoctors: (d) => set({ doctors: d }),
  selectedDoctor: null,
  setSelectedDoctor: (d) => set({ selectedDoctor: d }),

  // Appointments
  appointments: [],
  setAppointments: (a) => set({ appointments: a }),
  calendarView: 'month',
  setCalendarView: (v) => set({ calendarView: v }),

  // Modal states
  modals: {
    addPatient: false,
    addDoctor: false,
    bookAppointment: false,
    viewReport: false,
  },
  openModal: (name) => set(s => ({ modals: { ...s.modals, [name]: true } })),
  closeModal: (name) => set(s => ({ modals: { ...s.modals, [name]: false } })),
}));

// Initialize theme on load
const savedTheme = localStorage.getItem('hms_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

export default useStore;
