import MyRadar from '../components/finalResults/MyRadar.js'
import Initiatives from '../components/finalResults/Initiatives.js'
import Header from '../components/Header.js'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMaturityLevels } from '../store/actions/maturityLevelsAction'
import Button from "../components/Button"

function initiatives() {

  const data = useSelector((state) => state.maturityLevels)
  const { maturityLevels } = data
  const maturityAverageLevel = 0;


  return (
    <div className="flex h-full flex-col items-center justify-center ">
      <Header audit="Audit Digital"/>
      <div className="mt-10 flex w-4/5 flex-wrap justify-between rounded-lg border-2 p-4 shadow-2xl">
        {maturityLevels.length!==0 && <MyRadar data={maturityLevels}/>}
        <Initiatives />
      </div>
      <div className="mt-2 flex justify-end">
        <Button link="/culturalaudit" text="Passer à l'audit culturel" />
      </div>
    </div>
  )
}
export default initiatives
