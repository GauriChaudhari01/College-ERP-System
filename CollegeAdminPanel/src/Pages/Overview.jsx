import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import axios from "axios";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user || {});
  const theme = useTheme();

  const [counts, setCounts] = useState({
    Enquiry: 0,
    Student: 0,
    Employee: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/getdashboardcount",
          { CollegeId: userData._id }
        );
        const { Enquiry, Student, Employee } = response.data.data || {};
        setCounts({
          Enquiry: Enquiry || 0,
          Student: Student || 0,
          Employee: Employee || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, [userData._id]);

  const formatNumber = (num) =>
    typeof num === "number" ? num.toLocaleString() : "0";

  const chartData = [
    { name: "Enquiry", value: counts.Enquiry },
    { name: "Student", value: counts.Student },
    { name: "Employee", value: counts.Employee },
  ];

  return (
    <Box p={3} mt={10}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Welcome, {userData?.Name || "Admin"}
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
        <>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "#e0f7fa",
                  borderLeft: `8px solid #00acc1`,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <QuestionAnswerIcon fontSize="large" color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Enquiry
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {formatNumber(counts.Enquiry)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "#fff3e0",
                  borderLeft: `8px solid #fb8c00`,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <SchoolIcon fontSize="large" color="warning" />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Student
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {formatNumber(counts.Student)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "#ede7f6",
                  borderLeft: `8px solid #5e35b1`,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <WorkIcon fontSize="large" sx={{ color: "#5e35b1" }} />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Employee
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {formatNumber(counts.Employee)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chart */}
          <Card sx={{ mt: 5, boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
