import { LoaderCircle, type LucideProps } from "lucide-react"
import cn from "@/lib/cn"
const Loader = (props: LucideProps) => {
  const { className, ...otherProps } = props
  return (
    <LoaderCircle className={cn("animate-spin", className)} {...otherProps} />
  )
}

export default Loader
