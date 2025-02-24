import Chart from 'react-apexcharts'
import { useGetUsersQuery } from '../../redux/api/UsersApi.js'
import { useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from '../../redux/api/OrdersApi.js'
import { useState, useEffect } from 'react'
import { AdminMenu } from './AdminMenu'
// import OrderList from './OrderList'
import { Loader } from '../../components/Loader'

import { FaDollarSign } from "react-icons/fa6";

export const Dashboard = () => {
    const { data: sales, isLoading } = useGetTotalSalesQuery()
    const { data: customers } = useGetUsersQuery()
    const { data: orders } = useGetTotalOrdersQuery()
    const { data: salesDetail } = useGetTotalSalesByDateQuery()

    const [state, setState] = useState({
        options: {
            chart: {
                type: 'line',
            },
            tooltip: {
                theme: 'dark',
            },
            colors: ['#080'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth',
            },
            title: {
                text: 'Sales Trend',
                align: 'left',
                colors: '#fff',
            },
            grid: {
                borderColor: '#060',
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Date',
                },
            },
            yaxis: {
                title: {
                    text: 'Sales',
                },
                min: 0,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
        series: [{ name: 'Sales', data: [] }],
    })

    useEffect(() => {
        if (salesDetail) {
            const formattedSalesDate = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }))

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x),
                    },
                },
                series: [
                    { name: 'Sales', data: formattedSalesDate.map((item) => item.y) },
                ],
            }))
        }
    }, [salesDetail])

    return (
        <>
            <section className='relative min-h-screen bg-transparent items-center justify-center sm:mx-auto py-10 sm:px-20 md:px-[12rem]'>
                <div className='absolute inset-0 bg-black bg-opacity-50'></div>
                <div className='relative md:w-full grid grid-cols-3 gap-12 sm:gap-5 xsm:flex xsm:flex-cols-1 md:mx-[2rem] shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] p-10'>
                    <AdminMenu />
                    <article className='rounded-lg bg-gray-900 text-gray-100 p-5 w-full mt-5'>
                        <div className='flex justify-center font-bold rounded-full bg-[#060] text-center p-3'>
                            <FaDollarSign size={32} />
                        </div>
                        <p className='mt-5'>Sales</p>
                        <h1 className='text-xl font-bold'>
                            $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
                        </h1>
                    </article>
                    <article className='rounded-lg bg-gray-900 text-gray-100 p-5 w-full mt-5'>
                        <div className='flex justify-center font-bold rounded-full bg-[#060] text-center p-3'>
                            <FaDollarSign size={32} />
                        </div>
                        <p className='mt-5'>Customers</p>
                        <h1 className='text-xl font-bold'>
                            {isLoading ? <Loader /> : customers?.length}
                        </h1>
                    </article>
                    <article className='rounded-lg bg-gray-900 text-gray-100 p-5 w-full mt-5'>
                        <div className='flex justify-center font-bold rounded-full bg-[#060] text-center p-3'>
                            <FaDollarSign size={32} />
                        </div>
                        <p className='mt-5'>All Orders</p>
                        <h1 className='text-xl font-bold'>
                             {isLoading ? <Loader /> : orders?.totalOrders}
                        </h1>
                    </article>
                </div>

                <div className='relative w-full p-3 bg-gray-900 items-center mx-[2rem] mt-[4rem]'>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type='bar'
                        width='90%'
                    />
                </div>

                <div className='mt-[4rem]'>
                    {/* <OrderList /> */}
                </div>
            </section>
        </>
    )
}