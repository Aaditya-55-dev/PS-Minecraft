function NavigationSigns() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'Hackfusion', href: '#' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="w-full flex justify-center px-4 relative z-[100] mt-0">
      <ul className="list-none flex flex-wrap justify-center gap-3 md:gap-6 m-0 p-0">
        {navItems.map((item) => (
          <li key={item.label} className="relative pt-[18px] md:pt-[28px]">
            <div className="absolute top-0 left-[14px] w-1 h-5 md:h-[30px] bg-[repeating-linear-gradient(to_bottom,#7B7B7B_0px,#7B7B7B_5px,#2E2E2E_5px,#2E2E2E_10px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000000] z-[1]"></div>
            <div className="absolute top-0 right-[14px] w-1 h-5 md:h-[30px] bg-[repeating-linear-gradient(to_bottom,#7B7B7B_0px,#7B7B7B_5px,#2E2E2E_5px,#2E2E2E_10px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000000] z-[1]"></div>
            <a
              href={item.href}
              className={
                item.label === 'Home'
                  ? "text-white text-xl font-bold font-['Press_Start_2P',monospace] mt-8 hover:text-gray-300 z-50 relative inline-block no-underline"
                  : "block relative bg-[#D28F47] border-[3px] border-[#3F2312] shadow-[inset_3px_3px_0px_#F5BD7D,inset_-3px_-3px_0px_#8C5224,0_6px_0px_rgba(0,0,0,0.5)] text-white [text-shadow:2px_2px_0px_#2A170A] no-underline font-['Press_Start_2P',monospace] text-[9px] md:text-[11px] px-2.5 py-2 md:px-[18px] md:py-3 transition-all duration-150 ease-out select-none hover:bg-[#E29E54] hover:text-[#FFFF55] hover:translate-y-[2px]"
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationSigns;
