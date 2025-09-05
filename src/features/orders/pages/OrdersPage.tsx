import { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import KDSButton from "../../../shared/components/ui/KDSButton";
import OrderCard from "../components/OrderCard";
import { useOrdersStore } from "../store/ordersStore";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders, loading, error, fetchOrders, changeStatus, updatingIds } =
    useOrdersStore();

  useEffect(() => {
    console.log("[OrdersPage] useEffect: llamando fetchOrders()");
    fetchOrders();
  }, [fetchOrders]);

  console.log("[OrdersPage] Render:", { loading, ordersLength: orders.length, error });

  return (
    <Container sx={{ py: 3 }}>

      <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Pedidos en Cocina
        </Typography>

        <Stack direction="row" spacing={1}>
          <KDSButton
            variant="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Inicio
          </KDSButton>
          <KDSButton
            variant="secondary"
            startIcon={<RefreshIcon />}
            onClick={() => fetchOrders()}
          >
            Actualizar
          </KDSButton>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && orders.length > 0 && (
        <Grid container spacing={2} justifyContent="center">
          {orders.map((order) => (
           <Grid item xs={12} md={6} lg={4} key={order.id} sx={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}  // suave efecto al pasar el mouse
              style={{ width: "100%", maxWidth: 420 }}
            >
              <OrderCard
                order={order}
                loading={updatingIds.includes(order.id)}
                onAdvance={() => changeStatus(order.id)}
              />
            </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && !error && orders.length === 0 && (
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: "40vh" }}>
          <Typography>No hay pedidos disponibles.</Typography>
        </Box>
      )}
    </Container>
  );
}
