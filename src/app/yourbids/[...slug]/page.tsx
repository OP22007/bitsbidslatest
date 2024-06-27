'use client'

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from 'react-chartjs-2';
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
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

    const getProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/getbids?productID=${productID}`);
            if (response.ok) {
                const data = await response.json();
                if (data.productbyID) {
                    const fetchedProduct = data.productbyID;
                    setProduct(fetchedProduct);
                    setPrice(Number(fetchedProduct.price));
                    setBids(fetchedProduct.bids || []);
                    
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

    useEffect(()=>{
        if (bids.length > 0) {
            setChartData({
                labels: bids.map((item: Bid) => item.bidderID),
                datasets: [
                    {
                        label: "Previous Bids",
                        data: bids.map((item: Bid) => item.price),
                        fill: true,
                        borderColor: "rgb(255,99,132)",
                        backgroundColor: "rgba(255,99,132,0.3)"
                    }
                ]
            });
        } else {
            setChartData({
                labels: [],
                datasets: []
            });
        }
    }, [bids]);
    return (
        <div>
            <div className="chart" style={{ width: '1000px' }}>
            {bids.length > 0 && (
                    <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: 'Previous Bids' } } }} />
                ) }
            </div>
        </div>
    );
}
