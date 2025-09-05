import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import KDSButton from "../../../shared/components/ui/KDSButton";
import TypewriterText from "../../../shared/components/ui/TypewriterText";
import { useUIStore } from "../../../shared/store/uiStore";
import styles from "./HomePage.module.css";

// Animaciones
const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatVariants: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [0, -6, 0],
    rotate: [0, 1.5, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const underlineVariants: Variants = {
  initial: { width: "0%" },
  animate: {
    width: ["0%", "100%"],
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

export default function HomePage() {
  const navigate = useNavigate();
  const withLoadingMin = useUIStore((s) => s.withLoadingMin);
const goToOrders = async () => {
  await withLoadingMin(
    new Promise<void>((resolve) => {
      setTimeout(() => {
        navigate("/orders");
        resolve();
      }, 1200); 
    }),
    1200
  );
};

  return (
    <motion.div
      className={styles.hero}
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Container maxWidth="sm">
        <motion.div variants={cardVariants}>
          <Paper elevation={8} className={styles.card}>
            {/* Logo con animación flotante */}
            <motion.div variants={floatVariants} initial="initial" animate="animate">
              <Box className={styles.logo}>
                <RestaurantIcon fontSize="large" />
              </Box>
            </motion.div>

            <Stack spacing={1} textAlign="center" sx={{ mb: 2 }}>
         
              <TypewriterText text="Sistema de Cocina (KDS)" speedMs={50} />

              <motion.div
                variants={underlineVariants}
                initial="initial"
                animate="animate"
                className={styles.underline}
              />

              <Typography variant="body1" color="text.secondary">
                Visualiza y gestiona pedidos de cocina en tiempo real.
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2} alignItems="center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <KDSButton
                  size="large"
                  variant="primary"
                  onClick={goToOrders}
                  sx={{ px: 4 }}
                >
                  Revisar pedidos en cocina
                </KDSButton>
              </motion.div>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </motion.div>
  );
}
