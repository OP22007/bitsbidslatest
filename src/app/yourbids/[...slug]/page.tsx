'use client'

import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

ChartJS.register(
    ...registerables,
    zoomPlugin
);

interface Bid {
  bidID: string,
  bidderID: string,
  price: number,
  time: Date
}

export default function App() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const productID = searchParams.get("id");
    const [chartData, setChartData] = useState({});
    const [product, setProduct] = useState<any>(null);
    const [price, setPrice] = useState<number>();
    const [bids, setBids] = useState<Bid[]>([]);
    const [filter, setFilter] = useState<string>('today');
    const chartRef = useRef(null);

    const getProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/getbids?productID=${productID}`);
            if (response.ok) {
                const data = await response.json();
                if (data.productbyID) {
                    const fetchedProduct = data.productbyID;
                    setProduct(fetchedProduct);
                    setPrice(Number(fetchedProduct.price));
                    setBids(fetchedProduct.bids.map((bid: any) => ({
                        ...bid,
                        time: new Date(bid.time)
                    })));
                } else {
                    console.error('Product data is undefined');
                }
            } else {
                console.error('Failed to fetch product data');
            }
        } catch (e) {
            console.error('Error fetching product data:', e);
        }
    };

    useEffect(() => {
        if (productID) {
            getProduct();
        }
    }, [productID]);

    useEffect(() => {
        const filteredBids = bids.filter((bid) => {
            const now = new Date();
            const bidTime = new Date(bid.time);
            switch (filter) {
                case 'today':
                    return bidTime.toDateString() === now.toDateString();
                case '1day':
                    return bidTime >= new Date(now.setDate(now.getDate() - 1));
                case '2days':
                    return bidTime >= new Date(now.setDate(now.getDate() - 2));
                case 'week':
                    return bidTime >= new Date(now.setDate(now.getDate() - 7));
                default:
                    return true;
            }
        });

        if (filteredBids.length > 0) {
            setChartData({
                labels: filteredBids.map((item: Bid) => item.time.toLocaleDateString()),
                datasets: [
                    {
                        label: "Filtered Bids",
                        data: filteredBids.map((item: Bid) => (item.price)),
                        fill: true,
                        borderColor: "rgb(255,99,132)",
                        backgroundColor: "rgba(255,99,132,0.3)",
                        hoverBackgroundColor:"green",
                        pointHitRadius:4,
                        pointHoverBackgroundColot:'green'
                    }
                ],
            });
        } else {
            setChartData({
                labels: [],
                datasets: []
            });
        }
    }, [bids, filter]);

    const resetZoom = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    return (
        <div>
            <div>
                <label>
                    Filter:
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="today">Today's Bids</option>
                        <option value="1day">1 Day Ago</option>
                        <option value="2days">2 Days Ago</option>
                        <option value="week">A Week Ago</option>
                    </select>
                </label>
                <button onClick={resetZoom}>Reset Zoom</button>
            </div>
            <div className="chart" style={{ width: '1000px' }}>
                {chartData.labels && chartData.labels.length > 0 && (
                    <Line 
                        ref={chartRef}
                        data={chartData} 
                        options={{ 
                            responsive: true, 
                            plugins: { 
                                legend: { position: "top" }, 
                                title: { display: true, text: 'Filtered Bids' },
                                zoom: {
                                    zoom: {
                                        wheel: { enabled: true },
                                        pinch: { enabled: true },
                                        mode: 'xy',
                                    },
                                    pan: {
                                        enabled: true,
                                        mode: 'xy',
                                    }
                                }
                            } 
                        }} 
                    />
                )}
            </div>
        </div>
    );
}
