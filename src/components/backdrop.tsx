type BackdropProps = {
    className?: string;
}
export const Backdrop = ({className}: BackdropProps) => {
  return (
    <div className={`${className} absolute inset-0 w-full h-full backdrop-blur-[4px] opacity-0 pointer-events-none`}></div>
  )
}
