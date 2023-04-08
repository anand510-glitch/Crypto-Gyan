import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CrptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';  import {Box ,CircularProgress, Container } from '@chakra-ui/react';
import {Line} from "react-chartjs-2"
import {chartDays} from"../config/data"
import Chart from 'chart.js/auto';
import SelectButton from './SelectButton';
const CoinInfo = ({coin}) => {
    const [historicData,setHistoricalData]=useState(1);
    const [flag,setflag] = useState(false);
    const [days,setDays]=useState(1);
   const{currency,symbol}= CryptoState();

const fetchHistoricalData= async()=>{
    const {data}= await axios.get(HistoricalChart(coin.id,days,currency))
    setflag(true)
    setHistoricalData(data.prices);
}

useEffect(()=>{
    fetchHistoricalData();

},[currency,days])
  return (
    <div >
    {!historicData | flag===false ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <CircularProgress isIndeterminate color='green.300' size='200px' />
</div>
    ) : (
      <>
        <Line
          data={{
            labels: historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => {setDays(day.value);
                setflag(false);
              }}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </>
    )}
  </div>
  )
}

export default CoinInfo
