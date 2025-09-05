import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import FastForwardIcon from "@mui/icons-material/FastForward";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import type { Order } from "../types/order";
import KDSButton from "../../../shared/components/ui/KDSButton";
import styles from "./OrderCard.module.scss";
import { motion } from "framer-motion";

type Props = {
  order: Order;
  loading?: boolean;
  onAdvance: () => void;
};

export default function OrderCard({ order, loading = false, onAdvance }: Props) {
  const isFinal = order.estado === "Listo";

  return (
    <Card
      variant="outlined"
      className={styles.card}
      sx={{
        height: "100%",             
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,               
        }}
      >
     
        <Box sx={{ flexGrow: 1 }}>
          <Box className={styles.header}>
            <Typography variant="h6" fontWeight={700}>
              Pedido #{order.id}
            </Typography>
            <Chip label={order.tipo} size="small" />
          </Box>

          <Typography variant="body2">
            Cliente: <strong>{order.cliente}</strong>
          </Typography>

          <Typography variant="body2">
            Hora: {new Date(order.hora).toLocaleString()}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Estado: <strong>{order.estado}</strong>
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Productos
          </Typography>

          <List dense className={styles.products}>
            {order.productos.map((p, i) => (
               <motion.div
      key={i}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1, duration: 0.3 }}
    >
              <ListItem key={i}>
                {p.nombre} × {p.cantidad}
              </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>

        <Box mt={2} className={isFinal ? styles.final : undefined}>
          <KDSButton
            fullWidth
            onClick={onAdvance}
            loading={loading}
            startIcon={isFinal ? <DoneAllIcon /> : <FastForwardIcon />}
            disabled={isFinal}
          >
            {isFinal ? "Finalizado" : "Avanzar estado"}
          </KDSButton>
        </Box>
      </CardContent>
    </Card>
  );
}
