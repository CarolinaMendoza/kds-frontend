import { motion, AnimatePresence } from "framer-motion";
import Typography from "@mui/material/Typography";
import { useUIStore } from "../../store/uiStore"; 
import styles from "./GlobalLoadingOverlay.module.css";

function GlobalLoadingOverlay() {
  const isGlobalLoading = useUIStore((s) => s.isGlobalLoading);

  return (
    <AnimatePresence>
      {isGlobalLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.backdrop}
        >
          <div className={styles.box}>
            <div className={styles.spinner} />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mt: 3, color: "#fff", textAlign: "center" }}
            >
              Preparando la cocina…
            </Typography>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GlobalLoadingOverlay;
