import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useStore from '../../store/useStore';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
};

export default function Layout({ children }) {
  const { sidebarCollapsed } = useStore();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Navbar />
        <motion.main
          className="page-container"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={window.location.pathname}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
