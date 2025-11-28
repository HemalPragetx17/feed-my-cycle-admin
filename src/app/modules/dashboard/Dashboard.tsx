import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import APICallService from "../../../api/apiCallService";
import { ApexOptions } from "apexcharts";
import ReactApexChart from 'react-apexcharts';
import { DashboardString } from "../../../utils/string";
import { DASHBOARD } from "../../../api/apiEndPoints";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    subscribedUsers: 0,
    totalRevenue: 0,
  });
  const chartSeries = [
    {
      name: 'Active Users',
      data: [120, 190, 300, 500, 200, 300, 450, 280, 350, 400, 480, 520],
    },
  ];
  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#50CD89'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: 'Number of Users',
      },
    },
    title: {
      text: 'Active Users Usage Trend',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    markers: {
      size: 4,
    },
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchDashboardStats();
      setLoading(false);
    })();
  }, []);
  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      // const api = new APICallService(DASHBOARD.GET_STATISTICS);
      // const res: any = await api.callAPI();
      // const d = res?.data || res || {};
      setStats({
        totalUsers: 1250,
        subscribedUsers: 890,
        totalRevenue: 45680.50,
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const ShimmerCard = ({ bgColor }: { bgColor: string }) => (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '14px' }}>
      <div className="card-body p-3" style={{ background: bgColor }}>
        <div className="skeleton-loading mb-2" style={{ width: "60%", height: "16px", borderRadius: "4px" }} />
        <div className="skeleton-loading mb-2" style={{ width: "40%", height: "32px", borderRadius: "6px" }} />
        <div className="d-flex gap-2">
          <div className="skeleton-loading flex-grow-1" style={{ height: "28px", borderRadius: "20px" }} />
          <div className="skeleton-loading flex-grow-1" style={{ height: "28px", borderRadius: "20px" }} />
        </div>
      </div>
    </div>
  );
  const formatNumber = (num: any): string => {
    if (num >= 100000) {
      return `$ ${(num / 1000).toFixed(1)}k`;
    }
    return `$ ${num?.toLocaleString()}`;
  };
  return (
    <div>
      <div className="mb-2">
        <h1 className="fs-1 fw-bold text-dark mb-3">{DashboardString.dashBoardTitle}</h1>
      </div>
      <Row>
        <Col xs={12} sm={6} lg={4} className="mt-4">
          {loading ? (
            <ShimmerCard bgColor="#E8F5E9" />
          ) : (
            <div
              className={`card border-0 shadow-sm h-100`}
              style={{ background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)", borderRadius: '14px' }}
            >
              <div className="card-body p-3 d-flex flex-column" style={{ position: 'relative' }}>
                <h6 className="text-uppercase fw-bold mb-1 text-dark fs-6">
                  {DashboardString.totalUsersRegistered}
                </h6>
                <div className="fw-bold text-dark fs-1">
                  {stats.totalUsers}
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col xs={12} sm={6} lg={4} className="mt-4">
          {loading ? (
            <ShimmerCard bgColor="#E0F7FA" />
          ) : (
            <div
              className={`card border-0 shadow-sm h-100`}
              style={{ background: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)", borderRadius: '14px' }}
            >
              <div className="card-body p-3 d-flex flex-column" style={{ position: 'relative' }}>
                <h6 className="text-uppercase fw-bold mb-1 text-dark fs-6">
                  {DashboardString.totalSubscribedUsers}
                </h6>
                <div className="fw-bold text-dark fs-1">
                  {stats.subscribedUsers}
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col xs={12} sm={6} lg={4} className="mt-4">
          {loading ? (
            <ShimmerCard bgColor="#FFF9E6" />
          ) : (
            <div
              className={`card border-0 shadow-sm h-100`}
              style={{ background: "linear-gradient(135deg, #FFF9E6 0%, #FFF3CD 100%)", borderRadius: '14px' }}
            >
              <div className="card-body p-3 d-flex flex-column" style={{ position: 'relative' }}>
                <h6 className="text-uppercase fw-bold mb-1 text-dark fs-6">
                  {DashboardString.monthlyRevenueGenerated}
                </h6>
                <div className="fw-bold text-dark fs-1">
                  {formatNumber(stats.totalRevenue)}
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col xs={12} sm={12} lg={12} className="mt-8">
          <Card className="card-xl-stretch mb-5 mb-xl-8">
            <Card.Header className="border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">{DashboardString.activeUsersUsageTrend}</span>
                <span className="text-muted fw-semibold fs-7">{DashboardString.monthlyActiveUsersOverview}</span>
              </h3>
            </Card.Header>
            <Card.Body>
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={350}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;