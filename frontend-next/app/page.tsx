"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Member, clientWeb, codeRendererWeb, type MemberType } from "../lib/member";
import { Team } from "../lib/team";
import { memberInfo } from "@/ai/frontend-team";
import { loadPrompts } from "@/utils/loadPrompts";
import { useEffectOnce } from "@/lib/useEffectOnce";
import BackgroundContainer from "@/components/backgroundContainer";
import MessageCard, { Msg } from "@/components/MessageCard";
import CodeRenderer from "@/components/CodeRenderer";
import LogViewer from "@/components/LogViewer";
import { CardBack, CardFace, CardFlipper } from "@/components/CardFlipper";
import CodeViewer from "@/components/CodeViewer";
export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [teamInstance, setTeamInstance] = useState<Team | null>(null);
  const [html, setHtml] = useState<string | null>(`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-commerce Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.7/dist/full.min.css" rel="stylesheet" type="text/css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body data-theme="light">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">E-commerce Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg font-bold mb-2">Total Revenue</h2>
          <p class="text-4xl font-bold text-primary">$10,000</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg font-bold mb-2">Total Orders</h2>
          <p class="text-4xl font-bold text-primary">500</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg font-bold mb-2">Average Order Value</h2>
          <p class="text-4xl font-bold text-primary">$20</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg font-bold mb-2">New Customer Acquisition</h2>
          <p class="text-4xl font-bold text-primary">100</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg font-bold mb-2">Top-Selling Products</h2>
          <p class="text-4xl font-bold text-primary">Product A</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-lg font-bold mb-2">Sales Trend</h2> <canvas id="salesTrendChart"></canvas>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Sales Section</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Product Sales Table</h2>
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity Sold</th>
                  <th>Revenue</th>
                  <th>Average Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product A</td>
                  <td>100</td>
                  <td>$2,000</td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td>Product B</td>
                  <td>50</td>
                  <td>$1,000</td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td>Product C</td>
                  <td>25</td>
                  <td>$500</td>
                  <td>$20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Revenue Trend</h2> <canvas id="revenueTrendChart"></canvas>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Top-Selling Products</h2> <canvas
              id="topSellingProductsChart"></canvas>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Customer Purchase History</h2>
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Order Amount</th>
                  <th>Products Purchased</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Customer A</td>
                  <td>2023-10-26</td>
                  <td>$100</td>
                  <td>Product A, Product B</td>
                </tr>
                <tr>
                  <td>Customer B</td>
                  <td>2023-10-25</td>
                  <td>$50</td>
                  <td>Product C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Customer Section</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Customer Demographics</h2>
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Age</th>
                  <th>Location</th>
                  <th>Gender</th>
                  <th>Purchase Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25-34</td>
                  <td>USA</td>
                  <td>Male</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>35-44</td>
                  <td>Canada</td>
                  <td>Female</td>
                  <td>Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Customer Segmentation</h2> <canvas
              id="customerSegmentationChart"></canvas>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Customer Retention Rate</h2> <canvas
              id="customerRetentionChart"></canvas>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Customer Satisfaction Score</h2>
            <p class="text-4xl font-bold text-primary">4.5/5</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Inventory Section</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Inventory Status</h2>
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity in Stock</th>
                  <th>Reorder Point</th>
                  <th>Expected Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product A</td>
                  <td>100</td>
                  <td>50</td>
                  <td>2023-11-01</td>
                </tr>
                <tr>
                  <td>Product B</td>
                  <td>20</td>
                  <td>10</td>
                  <td>2023-11-05</td>
                </tr>
                <tr>
                  <td>Product C</td>
                  <td>5</td>
                  <td>10</td>
                  <td>2023-11-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Low Stock Alerts</h2>
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity in Stock</th>
                  <th>Reorder Point</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product B</td>
                  <td>20</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Product C</td>
                  <td>5</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Inventory Trend</h2> <canvas
              id="inventoryTrendChart"></canvas>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Inventory Turnover Rate</h2>
            <p class="text-4xl font-bold text-primary">2.5</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Marketing Section</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Marketing Campaign Performance</h2>
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Campaign Budget</th>
                  <th>Click-Through Rate</th>
                  <th>Conversion Rate</th>
                  <th>Customer Acquisition Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Campaign A</td>
                  <td>$1,000</td>
                  <td>10%</td>
                  <td>5%</td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td>Campaign B</td>
                  <td>$500</td>
                  <td>5%</td>
                  <td>2%</td>
                  <td>$50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Campaign Performance</h2> <canvas
              id="campaignPerformanceChart"></canvas>
          </div>
        </div>
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Customer Acquisition Cost Trend</h2> <canvas
              id="customerAcquisitionCostChart"></canvas>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-lg font-bold mb-2">Top-Performing Marketing Channels</h2>
            <p class="text-4xl font-bold text-primary">Google Ads</p>
          </div>
        </div>
      </div>
    </div>
    <script> // Sales Trend Chart 
      const salesTrendChartCanvas = document.getElementById('salesTrendChart');
      const salesTrendChart = new Chart(salesTrendChartCanvas, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
       datasets: [{ label: 'Sales', data: [1000, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 3800], 
       borderColor: 'rgb(54, 162, 235)', tension: 0.4 }] } }); 
       // Revenue Trend Chart 
       const revenueTrendChartCanvas = document.getElementById('revenueTrendChart'); 
       const revenueTrendChart = new Chart(revenueTrendChartCanvas, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Revenue', data: [5000, 6000, 7500, 9000, 10000, 11000, 12500, 14000, 15000, 16000, 17500, 19000], borderColor: 'rgb(54, 162, 235)', tension: 0.4 }] } }); // Top-Selling Products Chart 
       const topSellingProductsChartCanvas = document.getElementById('topSellingProductsChart'); 
       const topSellingProductsChart = new Chart(topSellingProductsChartCanvas, { type: 'bar', data: { labels: ['Product A', 'Product B', 'Product C'], datasets: [{ label: 'Sales', data: [2000, 1000, 500], borderColor: 'rgb(54, 162, 235)', borderWidth: 1 }] } }); // Customer Segmentation Chart 
       const customerSegmentationChartCanvas = document.getElementById('customerSegmentationChart'); 
       const customerSegmentationChart = new Chart(customerSegmentationChartCanvas, { type: 'pie', data: { labels: ['Loyal Customers', 'New Customers', 'Occasional Customers'], datasets: [{ label: 'Customers', data: [50, 25, 25], backgroundColor: [ 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)' ], hoverOffset: 4 }] } }); // Customer Retention Rate Chart 
       const customerRetentionChartCanvas = document.getElementById('customerRetentionChart'); 
       const customerRetentionChart = new Chart(customerRetentionChartCanvas, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Retention Rate', data: [80, 85, 90, 92, 95, 97, 98, 99, 100, 100, 100, 100], borderColor: 'rgb(54, 162, 235)', tension: 0.4 }] } }); // Inventory Trend Chart 
       const inventoryTrendChartCanvas = document.getElementById('inventoryTrendChart'); 
       const inventoryTrendChart = new Chart(inventoryTrendChartCanvas, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Inventory Level', data: [1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450], borderColor: 'rgb(54, 162, 235)', tension: 0.4 }] } }); // Campaign Performance Chart 
       const campaignPerformanceChartCanvas = document.getElementById('campaignPerformanceChart'); const campaignPerformanceChart = new Chart(campaignPerformanceChartCanvas, { type: 'bar', data: { labels: ['Campaign A', 'Campaign B'], datasets: [{ label: 'Click-Through Rate', data: [10, 5], borderColor: 'rgb(54, 162, 235)', borderWidth: 1 }, { label: 'Conversion Rate', data: [5, 2], borderColor: 'rgb(255, 99, 132)', borderWidth: 1 }] } }); // Customer Acquisition Cost Chart 
       const customerAcquisitionCostChartCanvas = document.getElementById('customerAcquisitionCostChart'); const customerAcquisitionCostChart = new Chart(customerAcquisitionCostChartCanvas, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Customer Acquisition Cost', data: [20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, 0], borderColor: 'rgb(54, 162, 235)', tension: 0.4 }] } }); 
       </script>
  </div>
</body>

</html>`)
  const [isClientAllowedInput, setIsClientAllowedInput] = useState<boolean>(true)
  const showMsg = (from: string, to: string, msg: string) => {
    setMsgs((prev) => [...prev, { from, to, msg, timestamp: new Date().toLocaleTimeString() }]);
  };
  const sendMsg = async (msg: string) => {
    log(`client: ${msg}`);
    teamInstance?.call("client", "representative", msg);
  }
  const log = (msg: string) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  }
  useEffectOnce(() => {
    const initTeam = async () => {
      console.log("initTeam");
      const team = new Team("frontend", log, showMsg);
      setTeamInstance(team);
      memberInfo.forEach(async (member: MemberType) => {
        await team.addMember(await Member(member));
      })
      team.addMember(await clientWeb(async (msg: string) => {
        setIsClientAllowedInput(true)
      }));
      team.addMember(await codeRendererWeb(async (msg: string) => {
        setHtml(msg)
        setIsClientAllowedInput(true)
      }));
      await team.setupCommunication();
      // setTimeout(() => {
      // team.call("client", "representative", "I need a hero section");
      // }, 1000);
    }
    initTeam();


  });


  return (
    <BackgroundContainer>
      <div className="w-full h-full grid grid-cols-12 grid-rows-3  grid-flow-row gap-5 items-center px-6 py-10">
        <div className="col-span-12 row-span-3 md:col-span-8 hidden md:flex h-full">
          <CardFlipper>
            <CardFace>
              <CodeRenderer code={html || ""} />
            </CardFace>
            <CardBack>
              <CodeViewer code={html || ""} />
            </CardBack>
          </CardFlipper>
        </div>
        <div className="col-span-12 row-span-3 md:col-span-4 md:col-start-9 h-full">
          <CardFlipper>
            <CardFace>
              <MessageCard msg={msgs} onMsgSend={msg => sendMsg(msg)} setIsClientAllowedInput={state => setIsClientAllowedInput(state)} isClientAllowedInput={isClientAllowedInput} />
            </CardFace>
            <CardBack>
              <LogViewer logs={logs} />
            </CardBack>
          </CardFlipper>
          {/* <MessageCard msg={msgs} onMsgSend={msg => sendMsg(msg)} setIsClientAllowedInput={state=>setIsClientAllowedInput(state)} isClientAllowedInput={isClientAllowedInput}/> */}
          {/* <LogViewer  logs={logs}/> */}
        </div>
      </div>
    </BackgroundContainer>
  );
}
