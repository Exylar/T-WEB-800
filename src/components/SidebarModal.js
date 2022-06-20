import {X} from "react-feather";

const SidebarModal = (props) => {
  const {
    isOpen,
    toggle,
    children,
    className,
    style,
    title
  } = props;

  return (
    <div className="absolute bottom-0 rounded rounded-b-none overflow-hidden" style={{width: "calc(100% - 32px)", height: isOpen ? "auto" : 0}}>
      <div className="h-14 bg-blue-500 rounded rounded-b-none text-white flex items-center justify-between px-4">
        <span className="text-xl">{title}</span>
        <X size={32} className="cursor-pointer" onClick={() => {toggle ? toggle() : console.log("no toggle function")}}/>
      </div>
      <div className={`bg-white p-2 ${className ?? ""}`} >
        {children}
      </div>
    </div>
  )
}

export default SidebarModal;