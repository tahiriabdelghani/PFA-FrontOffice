import { useSelector } from 'react-redux'
import Initiative from './Initiative.js'


function Initiatives() {

  const data = useSelector((state) => state.strategicObjectives)
  const { strategicObjectives } = data

  return (
    <div className="flex flex-col items-center justify-around">
      {strategicObjectives.map((element) => (
        <Initiative title={element.obj + ' score : ' + element.scoreTotal} />
      ))}
    </div>
  )
}
export default Initiatives
