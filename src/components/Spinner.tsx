'use client'
import { Bars } from 'react-loader-spinner'
interface Props {
  height: string
  width: string
  color: string
  label?: string
}
const Spinner = ({ height, width, color, label }: Props) => {
  return (
    <div className="p-3 rounded-full bg-white flex justify-center w-fit">
      <Bars height={height} width={width} color={color} ariaLabel={label} />
    </div>
  )
}
export default Spinner
