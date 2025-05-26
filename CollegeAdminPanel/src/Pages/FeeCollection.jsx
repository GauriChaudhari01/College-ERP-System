import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

// Icons
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const FeeCollection = () => {
  const [feeSummary, setFeeSummary] = useState(null);
  const [admissionsCount, setAdmissionsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFeeData = async () => {
      try {
        const summaryRes = await axios.post("http://localhost:5000/api/fetchfeesummary", {
          CollegeId: userData._id,
        });
        const admissionRes = await axios.post("http://localhost:5000/api/getfeecount", {
          CollegeId: userData._id,
        });

        setFeeSummary(summaryRes.data[0] || {});
        setAdmissionsCount(admissionRes.data.count || 0);
      } catch (err) {
        console.error("Error fetching fee data:", err);
        setError("Failed to load fee summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeeData();
  }, [userData._id]);

  const formatCurrency = (amount) =>
    typeof amount === "number" ? `₹${amount.toLocaleString()}` : "₹0";

  return (
    <Box p={3} mt={10}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Fee Collection Summary
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                backgroundColor: "#e8f5e9",
                borderLeft: `8px solid ${theme.palette.success.main}`,
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <SchoolIcon fontSize="large" color="success" />
                  <Box>
                    <Typography variant="h6">Total Admissions</Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {admissionsCount}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                backgroundColor: "#e3f2fd",
                borderLeft: `8px solid ${theme.palette.info.main}`,
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <AttachMoneyIcon fontSize="large" color="info" />
                  <Box>
                    <Typography variant="h6">Total Fee</Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {formatCurrency(feeSummary?.totalFeeSum)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                backgroundColor: "#fff3e0",
                borderLeft: `8px solid ${theme.palette.warning.main}`,
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <PaidIcon fontSize="large" color="warning" />
                  <Box>
                    <Typography variant="h6">Collected Fee</Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {formatCurrency(feeSummary?.feesPaidSum)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                backgroundColor: "#ffebee",
                borderLeft: `8px solid ${theme.palette.error.main}`,
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <HourglassEmptyIcon fontSize="large" color="error" />
                  <Box>
                    <Typography variant="h6">Remaining Fee</Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {formatCurrency(feeSummary?.remainingFeesSum)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FeeCollection;
