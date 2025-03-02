import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Eye, LogIn, LucideBaby, Mars, Menu, ShoppingCart, Tablet, Venus, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);
    // const featherScript = document.createElement("script");
    // featherScript.src = "https://unpkg.com/feather-icons";
    // featherScript.async = true;
    // document.body.appendChild(featherScript);

    // const customScript = document.createElement("script");
    // customScript.async = true;
    // document.body.appendChild(customScript);

    // featherScript.onload = () => {
    //   window.feather.replace();
    // };
  }, []);

  const handleLoginRedirect = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken = parseJwt(token);
      console.log('Decoded Token:', decodedToken);

      if (decodedToken.roles && decodedToken.roles.includes("admin")) {
        window.location.href = "/admindashboard";
      } else {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/login";
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
  };

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <header className="w-full border-b fixed z-10 bg-white">
      {/* Top Bar */}
      <div className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        {/* <div className="flex items-center gap-6">
          
          <a href="/" className="flex items-center ml-4 md:ml-20">
            <img
              src="../src/assets/images/logos.png"
              alt="Pharm"
              className="h-17 w-auto"
            />
            <img
              src="../src/assets/images/vitalflow.png"
              alt="Pharm"
              className="h-17 w-auto"
            />
          </a>
        </div> */}

        <div className="flex items-center gap-6">
          {/* Logo */}
          <a
            href={localStorage.getItem("role") === "admin" ? "/admindashboard" : "/"}
            className="flex items-center ml-4 md:ml-20"
          >
            <img
              src="../src/assets/images/logos.png"
              alt="Pharm"
              className="h-17 w-auto"
            />
            <img
              src="../src/assets/images/vitalflow.png"
              alt="Pharm"
              className="h-17 w-auto"
            />
          </a>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/SuvamKhadgi/vitalflow"><button className="hidden md:flex hover:bg-emerald-300  rounded-2xl border-3 p-3">
            <Tablet />
            Download App
          </button></a>
          <a href="/mycart"><button className=" hover:bg-blue-300  rounded-4xl p-1">
            <ShoppingCart size={32} />
            Cart
          </button></a>

          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="hover:bg-red-300 rounded-4xl p-1">
                <LogIn size={32} />
                Logout
              </button>
            </>
          ) : (
            <a href="/login">
              <button className="hover:bg-blue-300 rounded-4xl p-1">
                <LogIn size={32} />
                Login
              </button>
            </a>
          )}

          {/* Hamburger Menu Icon */}
          <button className="md:hidden bg-white" onClick={toggleMenu}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className={`${isOpen ? "block" : "hidden"} md:flex h-12  items-center justify-center px-4 md:px-6`}>
        <ul className="flex flex-col md:flex-row items-center bg-white gap-6">
          <li>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex items-center  text-sm font-medium hover:text-emerald-600">
                Personal Care<ChevronDown size={19} />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="absolute bg-white shadow-lg rounded-md mt-2 w-40 p-1" sideOffset={8}>
                  <a href="/"><DropdownMenu.Item className="px-4 py-2 text-sm flex justify-between hover:bg-gray-100">
                    Body Care<img src="https://img.icons8.com/?size=100&id=ldhSY1aQmC0a&format=png&color=000000" className="h-6" />
                  </DropdownMenu.Item></a>
                  <a href="/"><DropdownMenu.Item className="px-4 py-2 text-sm flex justify-between hover:bg-gray-100">
                    Eye Care<Eye />
                  </DropdownMenu.Item></a>
                  <a href="/"><DropdownMenu.Item className="px-4 py-2 text-sm flex justify-between hover:bg-gray-100">
                    Hair Care <img src="https://img.icons8.com/?size=100&id=7569&format=png&color=000000" className="h-6" />
                  </DropdownMenu.Item></a>
                  <a href="/"><DropdownMenu.Item className="px-4 py-2 text-sm flex justify-between hover:bg-gray-100">
                    Skin Care <img src="https://img.icons8.com/?size=100&id=ceGpdLJ2Or9e&format=png&color=000000" className="h-6" />
                  </DropdownMenu.Item></a>
                  <a href="/"><DropdownMenu.Item className="px-4 py-2 text-sm flex justify-between hover:bg-gray-100">
                    Oral Care<img src="https://img.icons8.com/?size=100&id=ryWKGVXPFtCT&format=png&color=000000" className="h-7" />
                  </DropdownMenu.Item></a>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </li>
          <li>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex items-center  text-sm font-medium hover:text-emerald-600">
                Family Care<ChevronDown size={19} />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="absolute bg-white shadow-lg rounded-md mt-2 w-40 p-1" sideOffset={8}>
                  <a href="/babycare"> <DropdownMenu.Item className="px-4 py-2 flex  justify-between text-sm hover:bg-gray-100">
                    Baby Care<LucideBaby />
                  </DropdownMenu.Item></a>
                  <a href="/mencare"> <DropdownMenu.Item className="px-4 py-2 flex justify-between text-sm hover:bg-gray-100">
                    Men's Care<Mars />
                  </DropdownMenu.Item></a>
                  <a href="/womancare"><DropdownMenu.Item className="px-4 py-2 text-sm flex justify-between hover:bg-gray-100">
                    Women's Care<Venus />
                  </DropdownMenu.Item></a>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </li>
          <li>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex items-center  text-sm font-medium hover:text-emerald-600">
                Wellness & Fitness<ChevronDown size={19} />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="absolute bg-white shadow-lg rounded-md mt-2 w-40 p-1" sideOffset={8}>
                  <a href="/"> <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    General Health
                  </DropdownMenu.Item></a>
                  <a href="/"> <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Family Nutrition
                  </DropdownMenu.Item></a>
                  <a href="/"> <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Herbal Supplements
                  </DropdownMenu.Item></a>
                  <a href="/"> <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Weight Management
                  </DropdownMenu.Item></a>
                  <a href="/"> <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Vitamins and Minerals
                  </DropdownMenu.Item></a>
                  <a href="/"> <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Gym/Sports Supplements
                  </DropdownMenu.Item></a>
                  <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">

                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>



          </li>
          <li>
            <DropdownMenu.Root>
              <a href="/devices"><DropdownMenu.Trigger className="flex    text-sm font-medium hover:text-emerald-600">
                Devices<ChevronDown size={19} />
              </DropdownMenu.Trigger></a>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="absolute bg-white shadow-lg rounded-md mt-2 w-40 p-1" sideOffset={8}>
                  <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Breath Easy
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Humidifier
                  </DropdownMenu.Item>
                  <a href="/devices"><DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Blood Glucose Monitor
                  </DropdownMenu.Item></a>
                  <a href="/devices"><DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Humidifier
                  </DropdownMenu.Item></a>
                  <a href="/devices"><DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Humidifier
                  </DropdownMenu.Item></a>
                  <a href="/devices"><DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100">
                    Measurements
                  </DropdownMenu.Item></a>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </li>

          <li>
            <a href="/first-aid" className="text-sm font-medium hover:text-emerald-600">
              First Aid
            </a>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;