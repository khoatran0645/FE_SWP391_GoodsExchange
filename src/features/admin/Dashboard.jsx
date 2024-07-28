import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import useStore from "../../app/store";
import dayjs from "dayjs";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF66CC",
  "#33FF66",
  "#A52A2A", // Brown
  "#5F9B9F", // Teal
  "#FF6347", // Tomato
  "#4682B4", // Steel Blue
  "#FFD700", // Gold
  "#DA70D6", // Orchid
  "#00CED1", // Dark Turquoise
  "#FF1493", // Deep Pink
  "#8A2BE2", // Blue Violet
  "#7FFF00", // Chartreuse
  "#FF4500", // Orange Red
  "#2E8B57", // Sea Green
  "#FF69B4", // Hot Pink
  "#00BFFF", // Deep Sky Blue
  "#9400D3", // Dark Violet
];

export default function Dashboard() {
  const getProductsForHomePage = useStore(
    (state) => state.getProductsForHomePage
  );
  const postListUser = useStore((state) => state.postListUser);
  const userList = useStore((state) => state.userList);
  const productList = useStore((state) => state.productList);
  const [timeRange, setTimeRange] = useState("week");
  const formatNewestDay = dayjs().format("DD/MM/YYYY");

  useEffect(() => {
    getProductsForHomePage(1, 9999);
    postListUser(1, 9999);
  }, [getProductsForHomePage, postListUser]);

  // Filter users with the role "User"
  const userRoleList =
    userList?.filter((user) => user.roleName === "User") || [];

  // Count active and inactive users
  const userStatusCount = userRoleList.reduce(
    (acc, user) => {
      if (user.status) {
        acc.active++;
      } else {
        acc.inactive++;
      }
      return acc;
    },
    { active: 0, inactive: 0 }
  );

  const categoryCount =
    productList?.data?.items?.reduce((acc, product) => {
      const category = product.categoryName;
      if (acc[category]) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {}) || {};

  const generateDateRange = (numDays) => {
    const today = dayjs();
    return Array.from({ length: numDays }, (_, i) =>
      today.subtract(i, "day").format("DD/MM/YYYY")
    ).reverse();
  };

  const generateMonthRange = () => {
    const today = dayjs();
    return Array.from({ length: 12 }, (_, i) =>
      today.subtract(i, "month").format("MM/YYYY")
    ).reverse();
  };

  const generateYearRange = () => {
    const today = dayjs();
    return Array.from({ length: 5 }, (_, i) =>
      today.subtract(i, "year").format("YYYY")
    ).reverse();
  };

  let dateRange = [];
  switch (timeRange) {
    case "week":
      dateRange = generateDateRange(7);
      break;
    case "month":
      dateRange = generateMonthRange();
      break;
    case "year":
      dateRange = generateYearRange();
      break;
    default:
      dateRange = generateDateRange(7);
  }

  const approveProductPerDayCount =
    productList?.data?.items?.reduce((acc, product) => {
      let formattedDate;
      switch (timeRange) {
        case "week":
          formattedDate = dayjs(product.approvedDate).format("DD/MM/YYYY");
          break;
        case "month":
          formattedDate = dayjs(product.approvedDate).format("MM/YYYY");
          break;
        case "year":
          formattedDate = dayjs(product.approvedDate).format("YYYY");
          break;
        default:
          formattedDate = dayjs(product.approvedDate).format("DD/MM/YYYY");
      }

      if (acc[formattedDate]) {
        acc[formattedDate]++;
      } else {
        acc[formattedDate] = 1;
      }
      return acc;
    }, {}) || {};

  const pieData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  const barData = dateRange.map((day) => ({
    day,
    product: approveProductPerDayCount[day] || 0,
  }));

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = outerRadius - (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh", p: 3 }}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Active Users
              </Typography>
              <Typography variant="h4" component="div" color={"#48AF41"}>
                {userStatusCount.active}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Inactive Users
              </Typography>
              <Typography variant="h4" component="div" color={"red"}>
                {userStatusCount.inactive}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Day
              </Typography>
              <Typography variant="h4" component="div" color={"#FFB200"}>
                {formatNewestDay}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4.5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Product Category Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  label={renderCustomizedLabel}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7.5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Product Approval Statistics
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <FormControl
                fullWidth
                sx={{
                  maxWidth: 100,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <InputLabel id="time-range-select-label">
                  Show data by
                </InputLabel>
                <Select
                  labelId="time-range-select-label"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  label="Show data by"
                  sx={{ fontSize: "1rem", height: "2rem" }}
                >
                  <MenuItem value="week">Week</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={730} height={250} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={"0.75rem"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="product" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
