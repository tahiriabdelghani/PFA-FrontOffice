import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function MyRadar({ data }) {
  const AxesData = useSelector((state) => state.digitalAxes)
  const { digitalAxes } = AxesData

  const [myData, setMyData] = useState([])
  const [maturityAverageLevel, setMaturityAverageLevel] = useState(0)

  useEffect(() => {
    let maturity = []
    let sum = 0
    for (let key in data) {
      sum += data[key].level
      maturity.push({
        subject: digitalAxes
          ? digitalAxes.filter((element) => element._id === data[key].axe_id)[0]
              .name
          : data[key].axe_id,
        A: data[key].level * 30,
        B:
          data[key].level < 5
            ? (data[key].level + 1) * 30
            : data[key].level * 30,
        fullMark: 150,
      })
    }
    setMyData(maturity)
    setMaturityAverageLevel(sum / maturity.length)
    console.log(sum / maturity.length)
  }, [data])

  return (
    <RadarChart outerRadius={150} width={600} height={400} data={myData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar
        name={'now : ' + maturityAverageLevel.toFixed(2)}
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Radar
        name={
          maturityAverageLevel < 4.01
            ? 'later : ' + (+maturityAverageLevel+1).toFixed(2)
            : 'later : ' + maturityAverageLevel.toFixed(2)
        }
        dataKey="B"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  )
}
export default MyRadar
