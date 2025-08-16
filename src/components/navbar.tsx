"use client";
import React, { FC, Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { TiArrowSortedDown } from "react-icons/ti";

import logo from "../../public/images/logo.png";
import blockChainLogo from "../../public/images/blockChain/blockchainicon.png";
import webapplicatiniconLogo from "../../public/images/blockChain/webapplicatinicon.jpg";
import ecommerceiconLogo from "../../public/images/blockChain/ecommerceicon.jpg";
import aiIconLogo from "../../public/images/blockChain/aiIcon.jpeg";
import Image, { StaticImageData } from "next/image";
import DropDown from "./home/dropDown";
import Link from "next/link";

type data = {
  image: StaticImageData;
};
const dataList: data[] = [
  { image: blockChainLogo },
  { image: webapplicatiniconLogo },
  { image: ecommerceiconLogo },
  { image: aiIconLogo },
];
interface ServicesList {
  name: string;
  description: string;
  href: string;
  icon: FC;
}

interface BlockChaninList {
  name: string;
  href: string;
  icon: FC;
}
interface NFTList {
  name: string;
  description: string;
  href: string;
  icon: FC;
}

const servicesList: ServicesList[] = [
  {
    name: "Web Application",
    description: "Speak directly to your customers",
    href: "/web-application",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "E-Commerce",
    description: "Your customers’ data will be safe and secure",
    href: "/e-commerce-solution",
    icon: FingerPrintIcon,
  },
  {
    name: "Artificial Intelligence",
    description: "Your customers’ data will be safe and secure",
    href: "/artificial-intelligence",
    icon: FingerPrintIcon,
  },
];
const nftList: NFTList[] = [
  {
    name: "NFT Development",
    description: "Speak directly to your customers",
    href: "/nft-development",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "NFT Marketplace Development",
    description: "Your customers’ data will be safe and secure",
    href: "/nft-marketplace-development",
    icon: FingerPrintIcon,
  },
];

const blockChaninList: BlockChaninList[] = [
  { name: "DeFI", href: "/defi", icon: PhoneIcon },
  {
    name: "Cryptocurrency Exchange",
    href: "/cryptocurrency-exchange",
    icon: PhoneIcon,
  },
  { name: "Token Development", href: "/token-development", icon: PhoneIcon },
];

interface NavbarProps {}

function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

const Navbar: FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [checkClick, setCheckClick] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesHandler = () => {
    setCheckClick(!checkClick);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setCheckClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [checkClick]);

  return (
    <header className="bg-white sticky top-0 z-40">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 gap-3 items-center ">
          <div className="-m-1.5 p-1.5">
            <span className="sr-only">Your Services</span>
            <Image
              className=" w-auto hidden md:block"
              src={logo}
              alt=""
              width={40}
              height={40}
            />
          </div>
          <Link
            href="/"
            className="text-sky-600 text-[23px] -ml-2 md:m-0 md:text-[30px] font-semibold md:font-bold"
          >
            BawdicSoft
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-bold leading-6 text-sky-60 text-sky-600 hover:text-black text-[17px] focus:text-black focus:border-none"
          >
            Home
          </Link>
          {/* <DropDown /> */}
          <button
            onClick={servicesHandler}
            id="mega-menu-dropdown-button"
            data-dropdown-toggle="mega-menu-dropdown"
            className="flex items-center justify-between  w-full py-2 px-3  md:w-auto  text-sm font-bold leading-6 text-sky-600 hover:text-black text-[17px]  border-none lg:p-0   focus:border-none    "
          >
            Services{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {checkClick && (
            <div
              ref={dropdownRef}
              id="mega-menu-dropdown"
              className="absolute z-10 grid   lg:w-[950px] xl:w-[1200px] grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md  md:grid-cols-3 lg:grid-cols-3  mt-10 pb-4 left-1/2 transform -translate-x-1/2 max-w-7xl "
            >
              <div className="absolute h-4 w-4 bg-white border-t border-l  border-gray-200 transform rotate-45 top-0 left-1/2 -mt-2  xl:ml-28"></div>

              {/* Blockchain Section */}
              <div className="pt-4 pl-4  text-gray-900 md:pb-4 ">
                <div
                  className="space-y-4"
                  aria-labelledby="mega-menu-dropdown-button"
                >
                  <div className="flex-wrap flex flex-col gap-2 items-center">
                    <div className="relative px-2 flex-wrap flex-col flex">
                      <div className="px-2 font-bold leading-6 text-sky-700 py-4">
                        <h3>Blockchain</h3>
                      </div>
                      <div className="ml-6 relative">
                        <div className="flex items-start font-semibold text-sky-700">
                          <svg
                            className="pt-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="29px"
                            height="29px"
                          >
                            <path
                              fill="#90caf9"
                              d="M26.535,9.368l-13.938,8.047c-0.907,0.523-1.465,1.491-1.465,2.538l0,16.094 c0,1.047,0.558,2.014,1.465,2.538l13.938,8.047c0.907,0.523,2.024,0.523,2.93,0l13.938-8.047c0.907-0.523,1.465-1.491,1.465-2.538 V19.953c0-1.047-0.558-2.014-1.465-2.538L29.465,9.368C28.558,8.845,27.442,8.845,26.535,9.368z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M36.024,37l3.746-2.163c0.928-0.536,1.5-1.526,1.5-2.598l0-16.478c0-1.072-0.572-2.062-1.5-2.598L25.5,4.924 c-0.928-0.536-2.072-0.536-3,0l-4.962,2.865"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M11.614,11.209L8.23,13.163c-0.928,0.536-1.5,1.526-1.5,2.598l0,16.478c0,1.072,0.572,2.062,1.5,2.598l14.27,8.239 c0.928,0.536,2.072,0.536,3,0l4.163-2.404"
                            />
                            <path
                              fill="#18193f"
                              d="M26.28,19.016h-3.738c-0.688,0-1.246,0.558-1.246,1.246v7.476c0,0.688,0.558,1.246,1.246,1.246 s1.246-0.558,1.246-1.246v-2.492h1.869c0.688,0,1.246-0.558,1.246-1.246s-0.558-1.246-1.246-1.246h-1.869v-1.246h2.492 c0.688,0,1.246-0.558,1.246-1.246S26.968,19.016,26.28,19.016z"
                            />
                            <path
                              fill="#18193f"
                              d="M17.273,19.016c-0.688,0-1.246,0.558-1.246,1.246v3.361l-2.701-4.052 c-0.305-0.458-0.873-0.661-1.398-0.501c-0.526,0.159-0.885,0.644-0.885,1.193v7.476c0,0.688,0.558,1.246,1.246,1.246 s1.246-0.558,1.246-1.246v-3.361l2.701,4.052c0.235,0.353,0.628,0.555,1.037,0.555c0.12,0,0.242-0.017,0.361-0.054 c0.526-0.159,0.885-0.644,0.885-1.193v-7.476C18.519,19.574,17.961,19.016,17.273,19.016z"
                            />
                            <path
                              fill="#18193f"
                              d="M35.711,19.016h-4.984c-0.688,0-1.246,0.558-1.246,1.246s0.558,1.246,1.246,1.246h1.246v6.23 c0,0.688,0.558,1.246,1.246,1.246s1.246-0.558,1.246-1.246v-6.23h1.246c0.688,0,1.246-0.558,1.246-1.246S36.4,19.016,35.711,19.016 z"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <h3>NFT</h3>
                            <div className="flex flex-wrap xl:flex-nowrap text-gray-700  ">
                              <Link
                                href="/nft-development"
                                className="leading-4 hover:text-gray-500 text-[12px] font-medium  flex items-start"
                                onClick={servicesHandler}
                              >
                                Development,
                              </Link>
                              <Link
                                href="/nft-marketplace-development"
                                className="leading-4 hover:text-gray-500 text-[12px] font-medium pl-0 xl:pl-2 flex items-start"
                                onClick={servicesHandler}
                              >
                                Marketplace
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#90caf9"
                              d="M43.9,43.9H12.1c-2.3,0-4.1-1.8-4.1-4.1V16.2c0-2.3,1.8-4.1,4.1-4.1h31.8c2.3,0,4.1,1.8,4.1,4.1v23.6 C48,42.1,46.2,43.9,43.9,43.9z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M43.5,32.4v3.1c0,2.2-1.8,4-4,4h-31c-2.2,0-4-1.8-4-4V22.7"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M4.5,16.3v-3.8c0-2.2,1.8-4,4-4h31c2.2,0,4,1.8,4,4v14.9"
                            />
                            <circle cx="13" cy="18" r="2" fill="#18193f" />
                            <circle cx="35" cy="18" r="2" fill="#18193f" />
                            <line
                              x1="15.5"
                              x2="32.5"
                              y1="33.5"
                              y2="33.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeWidth="3"
                              d="M22.3,22l2.1,0c1.1,0,1.9-0.9,1.9-2l0,0c0-1.1-0.9-2-2-2h-0.9c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-1.9,1.9-2l1.5,0"
                            />
                            <line
                              x1="23.7"
                              x2="23.7"
                              y1="13"
                              y2="13.9"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeWidth="3"
                            />
                            <line
                              x1="23.7"
                              x2="23.7"
                              y1="23.2"
                              y2="22.2"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeWidth="3"
                            />
                            <line
                              x1="12.5"
                              x2="35.5"
                              y1="28.5"
                              y2="28.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/defi"
                              className="leading-4 font-semibold text-sky-700  hover:text-black flex items-center"
                              onClick={servicesHandler}
                            >
                              <h3>DeFI</h3>
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="26px"
                            height="26px"
                          >
                            <circle cx="89" cy="89" r="35" fill="#fff" />
                            <circle cx="39" cy="39" r="35" fill="#90caf9" />
                            <path
                              fill="#90caf9"
                              d="M39,77C18.05,77,1,59.95,1,39S18.05,1,39,1s38,17.05,38,38S59.95,77,39,77z M39,7C21.36,7,7,21.35,7,39 s14.36,32,32,32s32-14.35,32-32S56.64,7,39,7z"
                            />
                            <path
                              fill="#90caf9"
                              d="M89,127c-20.95,0-38-17.05-38-38c0-1.22,0.06-2.45,0.17-3.66c0.16-1.65,1.64-2.85,3.27-2.7 c1.65,0.16,2.86,1.62,2.7,3.27C57.05,86.93,57,87.97,57,89c0,17.65,14.36,32,32,32s32-14.35,32-32s-14.36-32-32-32 c-1.04,0-2.09,0.05-3.11,0.15c-1.64,0.16-3.12-1.05-3.27-2.7s1.05-3.12,2.7-3.27C86.53,51.06,87.77,51,89,51 c20.95,0,38,17.05,38,38S109.95,127,89,127z"
                            />
                            <path
                              fill="#18193f"
                              d="M124,3c-1.66,0-3,1.34-3,3v14.19C112.8,12.27,99.79,4,83.58,0.67C81.96,0.33,80.38,1.38,80.04,3 c-0.33,1.62,0.71,3.21,2.33,3.54C97.65,9.69,109.98,17.78,117.32,25H102c-1.66,0-3,1.34-3,3s1.34,3,3,3h22c1.66,0,3-1.34,3-3V6 C127,4.34,125.66,3,124,3z"
                            />
                            <path
                              fill="#18193f"
                              d="M45.62,121.46c-15.27-3.14-27.6-11.23-34.94-18.46H26c1.66,0,3-1.34,3-3s-1.34-3-3-3H4c-1.66,0-3,1.34-3,3v22 c0,1.66,1.34,3,3,3s3-1.34,3-3v-14.19c8.2,7.93,21.2,16.19,37.41,19.52c0.2,0.04,0.41,0.06,0.61,0.06c1.39,0,2.64-0.98,2.94-2.4 C48.29,123.38,47.25,121.79,45.62,121.46z"
                            />
                            <g>
                              <path
                                fill="#fff"
                                d="M39,52c-1.66,0-3-1.34-3-3V29c0-1.66,1.34-3,3-3s3,1.34,3,3v20C42,50.66,40.66,52,39,52z"
                              />
                            </g>
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/cryptocurrency-exchange"
                              className="leading-4  font-semibold text-sky-700 hover:text-black gap-2 flex "
                              onClick={servicesHandler}
                            >
                              <h3>Crypto Exchange</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#fff"
                              d="M59,5.69L16,30.51c-3.09,1.79-5,5.09-5,8.66v49.65c0,3.57,1.91,6.87,5,8.66l43,24.83 c3.09,1.79,6.91,1.79,10,0l43-24.83c3.09-1.79,5-5.09,5-8.66V39.17c0-3.57-1.91-6.87-5-8.66L69,5.69C65.91,3.9,62.09,3.9,59,5.69z"
                            />
                            <path
                              fill="#90caf9"
                              d="M113.5,27.92L102,21.28c-1.44-0.83-3.27-0.34-4.1,1.1c-0.83,1.44-0.34,3.27,1.1,4.1l11.5,6.64 c0.17,0.1,0.32,0.21,0.48,0.32L99,40.35c-1.43,0.83-1.93,2.66-1.1,4.1c0.56,0.96,1.56,1.5,2.6,1.5c0.51,0,1.02-0.13,1.5-0.4 l11.96-6.91c0.01,0.18,0.04,0.35,0.04,0.53v49.65c0,2.49-1.34,4.82-3.5,6.06l-43,24.83c-0.16,0.09-0.33,0.17-0.5,0.25V104.6 c0-1.66-1.34-3-3-3s-3,1.34-3,3v15.36c-0.17-0.08-0.34-0.15-0.5-0.25L49,113.07c-1.43-0.83-3.27-0.34-4.1,1.1 c-0.83,1.44-0.34,3.27,1.1,4.1l11.5,6.64c2,1.16,4.25,1.74,6.5,1.74s4.5-0.58,6.5-1.74l43-24.83c4.01-2.31,6.5-6.63,6.5-11.26 V39.17C120,34.54,117.51,30.23,113.5,27.92z"
                            />
                            <path
                              fill="#18193f"
                              d="M92,46.1L70,33.4l21.75-12.56c0.51-0.3,0.91-0.72,1.16-1.21c0.02-0.03,0.04-0.07,0.06-0.1 c0.83-1.44,0.34-3.27-1.1-4.1L70.5,3.09c-4.01-2.31-8.99-2.31-13,0l-43,24.83C10.49,30.23,8,34.54,8,39.17v49.65 c0,4.63,2.49,8.94,6.5,11.26l21.26,12.27l0.26,0.15c0.46,0.26,0.97,0.39,1.48,0.39c0.52,0,1.04-0.14,1.51-0.41 c0.92-0.54,1.49-1.52,1.49-2.59V84.5l22,12.7c0.93,0.54,2.07,0.54,3,0L92,81.9c0.93-0.54,1.5-1.53,1.5-2.6V48.7 C93.5,47.63,92.93,46.64,92,46.1z M60.5,8.29c1.08-0.62,2.29-0.94,3.5-0.94s2.42,0.31,3.5,0.94l17,9.81l-22,12.7 c-0.93,0.54-1.5,1.53-1.5,2.6s0.57,2.06,1.5,2.6l22,12.7L64,60.56L17.02,33.43c0.16-0.11,0.31-0.23,0.48-0.32L60.5,8.29z M39,76.7 c-0.93-0.54-2.07-0.54-3,0s-1.5,1.53-1.5,2.6v25.4l-17-9.81c-2.16-1.25-3.5-3.57-3.5-6.06V39.17c0-0.18,0.02-0.36,0.04-0.53 L61,65.75V89.4L39,76.7z M67,89.4V65.75L87.5,53.9v23.67L67,89.4z"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/token-development"
                              className="leading-4  font-semibold text-sky-700 hover:text-black "
                              onClick={servicesHandler}
                            >
                              <h3>Token Development</h3>
                            </Link>
                          </div>
                        </div>

                        <div className="absolute right-0 top-0 lg:left-48 xl:left-60  hidden h-[200px] min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-800 to-transparent  opacity-40  lg:block"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Web App Section */}
              <div className="pt-4 pl-4 text-gray-900 md:pb-4 ">
                <div
                  className="space-y-4"
                  aria-labelledby="mega-menu-dropdown-button"
                >
                  <div className="flex-wrap flex flex-col gap-2 items-center">
                    <div className="relative px-2 flex-wrap flex-col flex">
                      <div className="px-2 font-bold leading-6 text-sky-700 py-4">
                        <h3> Web App</h3>
                      </div>
                      <div className="ml-6 relative">
                        <div className=" flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#90caf9"
                              d="M46.8,37.3H43V16.2c0-1-0.8-1.9-1.9-1.9H12.4c-1,0-1.9,0.8-1.9,1.9v21.1H6.7c-0.5,0-0.9,0.4-0.9,0.9v0.1 c0,2.6,2.1,4.7,4.7,4.7H43c2.6,0,4.7-2.1,4.7-4.7v-0.1C47.7,37.7,47.3,37.3,46.8,37.3z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M18.7,8.5h20.8c1.1,0,2,0.9,2,2v21c0,1.1-0.9,2-2,2h-31c-1.1,0-2-0.9-2-2v-21c0-1.1,0.9-2,2-2h4"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M32,39.5H6.5c-2.8,0-5-2.2-5-5v0c0-0.6,0.4-1,1-1h43c0.6,0,1,0.4,1,1v0c0,2.8-2.2,5-5,5H38"
                            />
                            <line
                              x1="25.5"
                              x2="22.5"
                              y1="14.5"
                              y2="27.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeWidth="3"
                            />
                            <polyline
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              points="30.5,24.5 33.5,21 30.5,17.5"
                            />
                            <polyline
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              points="17.5,24.5 14.5,21 17.5,17.5"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/web-app/web-design"
                              className="leading-4  font-semibold text-sky-700 hover:text-black"
                              onClick={servicesHandler}
                            >
                              <h3>Web Design</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#90caf9"
                              d="M45,15.9v24.2c0,2.1-1.7,3.9-3.9,3.9H14.9c-2.1,0-3.9-1.7-3.9-3.9V15.9c0-2.1,1.7-3.9,3.9-3.9h26.2 C43.2,12,45,13.7,45,15.9z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M6.5,27.8V11.5c0-2.2,1.8-4,4-4h27c2.2,0,4,1.8,4,4v7.2"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M41.5,25.7v10.8c0,2.2-1.8,4-4,4h-27c-2.2,0-4-1.8-4-4v-1.6"
                            />
                            <rect
                              width="7"
                              height="14"
                              x="28.5"
                              y="20.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                            <rect
                              width="10"
                              height="8"
                              x="12.5"
                              y="20.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                            <line
                              x1="12.5"
                              x2="22.5"
                              y1="34.5"
                              y2="34.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                            <line
                              x1="7"
                              x2="42"
                              y1="13.5"
                              y2="13.5"
                              fill="none"
                              stroke="#18193f"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                            />
                            <line
                              x1="34.5"
                              x2="34.5"
                              y1="7.5"
                              y2="13.5"
                              fill="none"
                              stroke="#18193f"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                            />
                            <line
                              x1="27.5"
                              x2="27.5"
                              y1="7.5"
                              y2="13.5"
                              fill="none"
                              stroke="#18193f"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/web-app/custom-web-app"
                              className="leading-4  font-semibold text-sky-700 hover:text-black gap-2 flex "
                              onClick={servicesHandler}
                            >
                              <h3>Custom Web App</h3>
                            </Link>
                          </div>
                        </div>

                        <div className=" flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#90caf9"
                              d="M43.1,37H12.9c-1.6,0-2.9-1.3-2.9-2.9V13.9c0-1.6,1.3-2.9,2.9-2.9h30.2c1.6,0,2.9,1.3,2.9,2.9v20.2 C46,35.7,44.7,37,43.1,37z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M42.5,15.7v14.8c0,1.7-1.3,3-3,3h-31c-1.7,0-3-1.3-3-3v-2.3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5.5,22.6V9.5c0-1.7,1.3-3,3-3h31c1.7,0,3,1.3,3,3v1.6"
                            />
                            <line
                              x1="13.5"
                              x2="34.5"
                              y1="41.5"
                              y2="41.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                            <line
                              x1="29.5"
                              x2="29.5"
                              y1="33.5"
                              y2="41.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                            <line
                              x1="18.5"
                              x2="18.5"
                              y1="33.5"
                              y2="41.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M11.5,13.5h5c0.6,0,1,0.4,1,1v11c0,0.6-0.4,1-1,1h-5c-0.6,0-1-0.4-1-1v-11C10.5,13.9,10.9,13.5,11.5,13.5z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M25.8,26.5h-2.3c-0.6,0-1-0.4-1-1v-11c0-0.6,0.4-1,1-1h13c0.6,0,1,0.4,1,1v11c0,0.6-0.4,1-1,1h-6.1"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/web-app/responsive-web-app"
                              className="leading-4 font-semibold text-sky-700  hover:text-black flex items-center"
                              onClick={servicesHandler}
                            >
                              <h3>Responsive Web App</h3>
                            </Link>
                          </div>
                        </div>

                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#90caf9"
                              d="M32.5,43.1c0.2-1.9,1.6-3.5,3.5-3.9c1-0.2,2,0,2.9,0.4l1.9,0.8c0.4,0.2,0.9,0.1,1.2-0.2c1.5-1.8,2.7-3.8,3.5-6 c0.1-0.4,0-0.9-0.4-1.1l-1.6-1.2c-0.8-0.6-1.4-1.4-1.7-2.3c-0.6-1.9,0.1-3.9,1.6-5l1.8-1.3c0.4-0.3,0.5-0.7,0.4-1.1 c-0.8-2.2-2-4.3-3.5-6c-0.3-0.3-0.8-0.4-1.2-0.2L39,16.5c-0.9,0.4-1.9,0.6-2.9,0.4c-2-0.4-3.3-2-3.5-3.9l-0.2-2.2 c0-0.4-0.4-0.8-0.8-0.9c-1.1-0.2-2.3-0.3-3.5-0.3s-2.4,0.1-3.5,0.3c-0.4,0.1-0.7,0.4-0.8,0.9l-0.2,2c-0.1,1-0.5,1.9-1.1,2.7 c-1.3,1.5-3.4,1.9-5.2,1.1l-2-0.9c-0.4-0.2-0.9-0.1-1.2,0.2c-1.5,1.8-2.7,3.8-3.5,6c-0.1,0.4,0,0.9,0.4,1.1l1.6,1.2 c0.8,0.6,1.4,1.4,1.8,2.3c0.6,1.9-0.1,3.9-1.6,5L11,32.8c-0.4,0.3-0.5,0.7-0.4,1.1c0.8,2.2,2,4.3,3.5,6c0.3,0.3,0.8,0.4,1.2,0.2 l1.9-0.8c0.9-0.4,1.9-0.6,2.9-0.4c2,0.4,3.3,2,3.5,3.9l0.2,2.2c0,0.4,0.4,0.8,0.8,0.9c1.1,0.2,2.3,0.3,3.5,0.3s2.4-0.1,3.5-0.3 c0.4-0.1,0.7-0.4,0.8-0.9L32.5,43.1z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M30.8,35.7c1.2-0.7,2.8-0.8,4.1-0.2l2.7,1.2c1.9-2,3.4-4.5,4.2-7.3l-2.4-1.7c-1.2-0.8-1.8-2.2-1.8-3.6 s0.7-2.8,1.8-3.6l2.4-1.7c-0.8-2.8-2.3-5.2-4.2-7.3l-2.7,1.2c-1.3,0.6-2.8,0.5-4.1-0.2s-2.1-2-2.2-3.4L28.2,6 c-1.4-0.3-2.8-0.5-4.2-0.5S21.1,5.7,19.8,6"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M17.3,12.3c-1.2,0.7-2.8,0.8-4.1,0.2l-2.7-1.2c-1.9,2-3.4,4.5-4.2,7.3l2.4,1.7c1.2,0.8,1.8,2.2,1.8,3.6 s-0.7,2.8-1.8,3.6l-2.4,1.7c0.8,2.8,2.3,5.2,4.2,7.3l2.7-1.2c1.3-0.6,2.8-0.5,4.1,0.2s2.1,2,2.2,3.4l0.3,2.9 c1.4,0.3,2.8,0.5,4.2,0.5s2.9-0.2,4.2-0.5"
                            />
                            <line
                              x1="25.4"
                              x2="22.6"
                              y1="17.8"
                              y2="30.2"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeWidth="3"
                            />
                            <polyline
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              points="29.3,27.7 32.6,24 29.3,20.3"
                            />
                            <polyline
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              points="18.7,27.7 15.4,24 18.7,20.3"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/web-app/full-stack-development"
                              className="leading-4  font-semibold text-sky-700 hover:text-black gap-2 flex "
                              onClick={servicesHandler}
                            >
                              <h3>Fullstack development</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="absolute right-0 top-0 hidden lg:left-48 xl:left-56 h-[200px]  min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-800 to-transparent  opacity-40  lg:block"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WordPress Section */}
              {/* <div className="pt-4  pl-4 text-gray-900 md:pb-4 ">
                <div
                  className="space-y-4"
                  aria-labelledby="mega-menu-dropdown-button"
                >
                  <div className="flex-wrap flex flex-col gap-2 items-center">
                    <div className="relative px-2 flex-wrap flex-col flex">
                      <div className="px-2 font-bold leading-6 text-sky-700 py-4">
                        <h3>Word Press</h3>
                      </div>
                      <div className="ml-6 relative">
                        <div className="flex  items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="25px"
                            height="25px"
                          >
                            <circle cx="28" cy="28" r="18" fill="#90caf9" />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M20.468,42.163C11.94,40.515,5.5,33.009,5.5,24c0-6.57,3.425-12.34,8.586-15.622"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M19.577,6.032C20.994,5.684,22.476,5.5,24,5.5c10.217,0,18.5,8.283,18.5,18.5 c0,8.659-5.948,15.928-13.981,17.944"
                            />
                            <path
                              fill="#18193f"
                              d="M34.668,10.685c-0.904,0.603-1.537,1.808-1.537,2.948c0,1.507,0.848,2.826,1.79,4.334 c0.754,1.225,1.507,2.826,1.507,5.088c0,1.602-0.471,3.58-1.413,6.03l-1.884,6.218l-6.689-19.974 c1.131-0.094,2.167-0.188,2.167-0.188c0.942-0.094,0.848-1.507-0.094-1.507c0,0,0,0-0.094,0c0,0-3.015,0.283-4.993,0.283 c-1.79,0-4.899-0.283-4.899-0.283s0,0-0.094,0c-0.942,0-1.036,1.507-0.094,1.507c0,0,0.942,0.094,1.979,0.188l2.921,7.914 L19.19,35.397l-6.784-20.162c1.131-0.094,2.167-0.188,2.167-0.188c0.942-0.094,0.848-1.507-0.094-1.507c0,0,0,0-0.094,0 c0,0-2.261,0.227-4.089,0.293c-1.234,1.602-2.031,3.148-2.625,5.136L14.753,38.3c1.3,0.857,2.713,1.526,4.23,1.997l5.012-14.698 l5.351,14.566c1.564-0.509,3.034-1.222,4.353-2.164l4.993-14.474c0.744-1.884,1.238-3.806,1.407-5.276 C39.358,15.747,37.01,12.312,34.668,10.685z"
                            />
                          </svg>
                          <Link
                            href={"/word-press/custom-development"}
                            onClick={servicesHandler}
                            className="ml-1 flex flex-wrap xl:flex-nowrap flex-col hover:text-black"
                          >
                            <h3>Custom Development</h3>
                          </Link>
                        </div>

                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="20px"
                            height="20px"
                          >
                            <path
                              fill="#90caf9"
                              d="M114,124H14c-5.5,0-10-4.5-10-10V14C4,8.5,8.5,4,14,4h100c5.5,0,10,4.5,10,10v100 C124,119.5,119.5,124,114,124z"
                            />
                            <path
                              fill="#000"
                              d="M104,55H77c-1.7,0-3,1.3-3,3v30c0,1.7,1.3,3,3,3h27c1.7,0,3-1.3,3-3V58C107,56.3,105.7,55,104,55z"
                            />
                            <path
                              fill="#000"
                              d="M114,127H14c-7.2,0-13-5.8-13-13V41c0-1.7,1.3-3,3-3s3,1.3,3,3v73c0,3.9,3.1,7,7,7h100c3.9,0,7-3.1,7-7V14 c0-3.9-3.1-7-7-7H14c-3.9,0-7,3.1-7,7v11h104c1.7,0,3,1.3,3,3s-1.3,3-3,3H4c-1.7,0-3-1.3-3-3V14C1,6.8,6.8,1,14,1h100 c7.2,0,13,5.8,13,13v100C127,121.2,121.2,127,114,127z"
                            />
                            <circle cx="16" cy="16" r="3" fill="#000" />
                            <circle cx="26" cy="16" r="3" fill="#000" />
                            <circle cx="36" cy="16" r="3" fill="#000" />
                            <path
                              fill="#000"
                              d="M61,61H24c-1.7,0-3-1.3-3-3s1.3-3,3-3h37c1.7,0,3,1.3,3,3S62.7,61,61,61z"
                            />
                            <path
                              fill="#000"
                              d="M61,76H24c-1.7,0-3-1.3-3-3s1.3-3,3-3h37c1.7,0,3,1.3,3,3S62.7,76,61,76z"
                            />
                            <path
                              fill="#000"
                              d="M51,91H24c-1.7,0-3-1.3-3-3s1.3-3,3-3h27c1.7,0,3,1.3,3,3S52.7,91,51,91z"
                            />
                            <path
                              fill="#000"
                              d="M61,91c-0.2,0-0.4,0-0.6-0.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.1-0.3-0.2-0.5-0.3c-0.2-0.1-0.3-0.2-0.5-0.4 C58.3,89.6,58,88.8,58,88c0-0.2,0-0.4,0.1-0.6c0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.2,0.2-0.3,0.4-0.5 c1.1-1.1,3.1-1.1,4.2,0c0.1,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.2,0.3,0.3,0.5c0.1,0.2,0.1,0.4,0.2,0.6c0,0.2,0.1,0.4,0.1,0.6 c0,0.8-0.3,1.6-0.9,2.1C62.6,90.7,61.8,91,61,91z"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/word-press/responsive-design"
                              className="leading-4 font-semibold text-sky-700  hover:text-black flex items-center"
                              onClick={servicesHandler}
                            >
                              <h3>Responsive Design</h3>
                            </Link>
                          </div>
                        </div>

                        <div className=" flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#90caf9"
                              d="M43.098,38H12.902C11.299,38,10,36.701,10,35.098V15.902C10,14.299,11.299,13,12.902,13h30.197 C44.701,13,46,14.299,46,15.902v19.197C46,36.701,44.701,38,43.098,38z"
                            />
                            <line
                              x1="18.5"
                              x2="18.5"
                              y1="34.5"
                              y2="42.5"
                              fill="none"
                              stroke="#18193f"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                            />
                            <line
                              x1="29.5"
                              x2="29.5"
                              y1="34.5"
                              y2="42.5"
                              fill="none"
                              stroke="#18193f"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                            />
                            <line
                              x1="13.5"
                              x2="34.5"
                              y1="42.5"
                              y2="42.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                            />
                            <line
                              x1="11.5"
                              x2="36.5"
                              y1="24.5"
                              y2="24.5"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M13.052,19.53 C12.693,18.418,12.5,17.232,12.5,16c0-6.351,5.149-11.5,11.5-11.5S35.5,9.649,35.5,16c0,1.398-0.249,2.738-0.706,3.977"
                            />
                            <path
                              fill="#18193f"
                              d="M24.812,22h-1.774c-1.504,0-2.813-0.783-3.328-1.557c-0.383-0.574-0.228-1.351,0.347-1.733 c0.568-0.379,1.336-0.23,1.723,0.331c0.113,0.128,0.603,0.459,1.259,0.459h1.774c0.655,0,1.188-0.505,1.188-1.125 s-0.532-1.125-1.188-1.125h-1.375c-2.033,0-3.687-1.626-3.687-3.625S21.404,10,23.437,10h1.313c2.01,0,2.958,1.425,3.06,1.587 c0.366,0.585,0.188,1.357-0.397,1.723c-0.584,0.368-1.356,0.189-1.722-0.397c-0.015-0.018-0.313-0.413-0.94-0.413h-1.313 c-0.655,0-1.187,0.505-1.187,1.125s0.532,1.125,1.187,1.125h1.375c2.033,0,3.688,1.626,3.688,3.625S26.846,22,24.812,22z"
                            />
                            <line
                              x1="24"
                              x2="24"
                              y1="9.3"
                              y2="11"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="2.5"
                            />
                            <line
                              x1="24"
                              x2="24"
                              y1="22.7"
                              y2="21"
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="2.5"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M22.915,34.5H8.5c-1.657,0-3-1.343-3-3v-20c0-1.657,1.343-3,3-3h1.819"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M37.702,8.5H39.5c1.657,0,3,1.343,3,3v20c0,1.657-1.343,3-3,3h-10"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/word-press/woocommerce-solution"
                              className="leading-4  font-semibold text-sky-700 hover:text-black "
                              onClick={servicesHandler}
                            >
                              <h3>WooCommerce Solution</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="19px"
                            height="20px"
                          >
                            <path
                              fill="#fff"
                              d="M104,124c11.05,0,20-8.95,20-20V24c0-11.05-8.95-20-20-20H24C12.95,4,4,12.95,4,24v80c0,11.05,8.95,20,20,20 L104,124z"
                            />
                            <path
                              fill="#71c2ff"
                              d="M125.12,107.5l-28.87-50C93.91,53.43,89.7,51,85,51s-8.91,2.43-11.26,6.5l-28.87,50 c-2.35,4.07-2.35,8.93,0,13s6.56,6.5,11.26,6.5h57.73c4.7,0,8.91-2.43,11.26-6.5S127.48,111.57,125.12,107.5z"
                            />
                            <path
                              fill="#000"
                              d="M85,115c-1.66,0-3-1.34-3-3v-3c0-1.66,1.34-3,3-3s3,1.34,3,3v3C88,113.66,86.66,115,85,115z"
                            />
                            <path
                              fill="#000"
                              d="M85,97c-1.66,0-3-1.34-3-3V72c0-1.66,1.34-3,3-3s3,1.34,3,3v22C88,95.66,86.66,97,85,97z"
                            />
                            <path
                              fill="#90caf9"
                              d="M36,22H26c-1.66,0-3-1.34-3-3s1.34-3,3-3h10c1.66,0,3,1.34,3,3S37.66,22,36,22z"
                            />
                            <g>
                              <path
                                fill="#444b54"
                                d="M102,22H64c-1.66,0-3-1.34-3-3s1.34-3,3-3h38c1.66,0,3,1.34,3,3S103.66,22,102,22z"
                              />
                            </g>
                            <path
                              fill="#000"
                              d="M104,1H24C11.32,1,1,11.32,1,24v80c0,12.68,10.32,23,23,23h10c1.66,0,3-1.34,3-3s-1.34-3-3-3H24 c-9.37,0-17-7.63-17-17V37h114v37c0,1.66,1.34,3,3,3s3-1.34,3-3V24C127,11.32,116.68,1,104,1z M7,31v-7c0-9.37,7.63-17,17-17h80 c9.37,0,17,7.63,17,17v7H7z"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/word-press/support-maintenance"
                              className="leading-4  font-semibold text-sky-700 hover:text-black"
                              onClick={servicesHandler}
                            >
                              <h3>Support and Maintenance</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="absolute right-0 top-0 hidden lg:left-48 xl:left-60  h-[200px] min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-800 to-transparent  opacity-40  lg:block"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* AI Section */}
              <div className="pt-4 pl-4 text-gray-900 md:pb-4 ">
                <div
                  className="space-y-4"
                  aria-labelledby="mega-menu-dropdown-button"
                >
                  <div className="flex-wrap flex flex-col gap-2 items-center">
                    <div className="relative px-2 flex-wrap flex-col flex">
                      <div className="px-2 font-bold leading-6 text-sky-700 py-4">
                        <h3> AI</h3>
                      </div>
                      <div className="ml-6">
                        <div className="flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#90caf9"
                              d="M44.475,24.803c0.774-2.528,0.53-5.23-0.722-7.583c-2.018-3.792-6.225-5.638-10.284-5.086 c-1.802-1.935-4.265-3.074-6.929-3.166c-4.294-0.149-7.996,2.572-9.547,6.363c-2.576,0.593-4.794,2.156-6.206,4.417 c-2.275,3.643-1.771,8.21,0.737,11.449c-0.774,2.528-0.53,5.23,0.722,7.583c2.018,3.792,6.225,5.638,10.284,5.086 c1.802,1.935,4.265,3.074,6.929,3.167c4.293,0.148,7.996-2.573,9.547-6.364c2.576-0.593,4.794-2.156,6.205-4.417 C47.486,32.608,46.982,28.042,44.475,24.803z"
                            />
                            <path
                              fill="#18193f"
                              d="M38.844,17.559l-7.523-4.343c-0.493-0.284-1.1-0.285-1.594-0.003l-10.245,5.855l0.021-4.018 l7.913-4.569c3.445-1.989,7.938-1.371,10.44,1.722c0.594,0.734,1.04,1.539,1.341,2.382c0.211,0.592,0.772,0.984,1.4,0.984 c1.037,0,1.772-1.03,1.421-2.006c-0.416-1.158-1.033-2.265-1.853-3.275c-2.488-3.065-6.393-4.357-10.151-3.807 c-1.987-2.124-4.699-3.373-7.63-3.473c-4.733-0.161-8.814,2.839-10.525,7.018c-2.842,0.654-5.289,2.378-6.847,4.873 c-3.318,5.313-1.284,12.41,4.142,15.543l7.523,4.343c0.493,0.284,1.1,0.285,1.594,0.003l10.245-5.855l-0.021,4.018l-7.902,4.563 c-3.448,1.991-7.945,1.378-10.451-1.715c-0.591-0.73-1.035-1.53-1.336-2.368c-0.212-0.591-0.772-0.982-1.4-0.982h0 c-1.039,0-1.774,1.033-1.421,2.01c0.326,0.901,0.774,1.771,1.344,2.589c2.43,3.487,6.613,5.039,10.645,4.465 c1.987,2.129,4.7,3.381,7.634,3.483c4.736,0.163,8.82-2.838,10.531-7.02c2.841-0.654,5.288-2.378,6.844-4.872 C46.303,27.788,44.269,20.691,38.844,17.559z M34,33.723c0,4.324-3.313,8.077-7.633,8.269c-1.837,0.082-3.585-0.463-5.024-1.496 c0.274-0.13,0.546-0.266,0.812-0.42l7.521-4.342c0.493-0.285,0.799-0.81,0.802-1.38l0.054-9.883c0.003-0.55-0.441-0.999-0.992-1 c-0.549-0.002-0.995,0.441-0.998,0.99l-0.011,2.172L18.498,32.37l-7.918-4.571c-3.745-2.163-5.339-6.908-3.345-10.745 c0.848-1.633,2.196-2.875,3.812-3.605C11.022,13.753,11,14.058,11,14.367v8.684c0,0.569,0.302,1.095,0.794,1.382l8.73,5.055 c0.475,0.275,1.082,0.113,1.358-0.361c0.277-0.476,0.114-1.085-0.362-1.361L14,23.42v-9.143c0-4.325,3.313-8.077,7.634-8.269 c1.835-0.081,3.582,0.462,5.02,1.494c-0.264,0.127-0.526,0.259-0.782,0.407l-7.548,4.357c-0.494,0.285-0.799,0.81-0.802,1.38 l-0.054,9.797c-0.003,0.55,0.441,0.999,0.992,1c0.549,0.002,0.995-0.441,0.998-0.99l0.011-2.087l4.552-2.603L34,24.58V33.723z M40.765,30.946c-0.848,1.633-2.195,2.875-3.812,3.604C36.978,34.248,37,33.944,37,33.636v-8.687c0-0.569-0.302-1.095-0.794-1.382 l-10.191-5.943l3.487-1.994l7.918,4.571C41.165,22.364,42.759,27.109,40.765,30.946z"
                            />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/ai/custom-ai-solution"
                              className="leading-4 font-semibold text-sky-700  hover:text-black "
                              onClick={servicesHandler}
                            >
                              <h3>Custom AI Solution</h3>
                            </Link>
                          </div>
                        </div>

                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="25px"
                            height="25px"
                          >
                            <path
                              fill="#fff"
                              d="M64.1,4c0.1,0,0.2,0,0.4,0c0.1,0,0.2,0,0.4,0c21.8,0,40.4,13.9,47.3,33.4c1.8,5.2,7.7,37.1,7.7,37.1c0.7,2.1,0.1,4.4-1.4,6l-2.8,2.8c-1.1,1.1-1.7,2.6-1.7,4.2V102c0,4.4-3.6,8-8,8h-8c-5.5,0-10,4.5-10,10v7H77H64L64.1,4C64,4,64,4,64.1,4z"
                            />
                            <path
                              fill="#000"
                              d="M87.9 127c-1.7 0-3-1.3-3-3v-4c0-7.2 5.8-13 13-13h8c2.8 0 5-2.2 5-5V87.5c0-2.4.9-4.6 2.5-6.3l2.8-2.8c.8-.8 1-1.9.7-3 0-.1-.1-.2-.1-.3l-6.4-30.7c-2.9-14.1-11.7-25.8-24-32.2C80.4 9.1 73.8 7.4 67 7v102c0 1.7-1.3 3-3 3s-3-1.3-3-3V4c0-.9.4-1.7 1.1-2.3C62.7 1.2 63.4 1 64.2 1c8.7-.1 17.4 1.9 25 5.9 13.9 7.2 23.8 20.4 27.1 36.3l6.4 30.6c.9 3.1.1 6.5-2.2 8.8l-2.8 2.8c-.5.6-.8 1.3-.8 2.1V102c0 6.1-4.9 11-11 11h-8c-3.9 0-7 3.1-7 7v4C90.9 125.7 89.5 127 87.9 127zM64 4L64 4 64 4zM64 127c-.2 0-.4 0-.6-.1-.2 0-.4-.1-.6-.2-.2-.1-.3-.2-.5-.3-.2-.1-.3-.2-.5-.4-.6-.6-.9-1.3-.9-2.1 0-.2 0-.4.1-.6 0-.2.1-.4.2-.6.1-.2.2-.3.3-.5.1-.2.2-.3.4-.4s.3-.3.5-.4c.2-.1.3-.2.5-.3.2-.1.4-.1.6-.2.4-.1.8-.1 1.2 0 .2 0 .4.1.6.2.2.1.4.2.5.3.2.1.3.2.5.4.1.1.3.3.4.4.1.2.2.3.3.5.1.2.1.4.2.6 0 .2.1.4.1.6 0 .8-.3 1.6-.9 2.1-.1.1-.3.3-.5.4-.2.1-.3.2-.5.3-.2.1-.4.1-.6.2C64.4 127 64.2 127 64 127z"
                            />
                            <path
                              fill="#fff"
                              d="M47 12A7 7 0 1 0 47 26 7 7 0 1 0 47 12zM47 102A7 7 0 1 0 47 116 7 7 0 1 0 47 102zM12 57A7 7 0 1 0 12 71 7 7 0 1 0 12 57zM21 26A7 7 0 1 0 21 40 7 7 0 1 0 21 26zM21 88A7 7 0 1 0 21 102 7 7 0 1 0 21 88z"
                            />
                            <path
                              fill="#0284c7"
                              d="M47 29c-5.5 0-10-4.5-10-10S41.5 9 47 9s10 4.5 10 10S52.5 29 47 29zM47 15c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S49.2 15 47 15zM52 76H37c-.8 0-1.6.3-2.1.9l-9.3 9.3c-1.4-.7-3-1.1-4.6-1.1-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10c0-1.7-.4-3.2-1.1-4.6l8.4-8.4H52c1.7 0 3-1.3 3-3S53.7 76 52 76zM21 99c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4S23.2 99 21 99zM52 61H21.5c-1.3-4.1-5.1-7-9.5-7C6.5 54 2 58.5 2 64s4.5 10 10 10c4.5 0 8.3-2.9 9.5-7H52c1.7 0 3-1.3 3-3S53.7 61 52 61zM12 68c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4S14.2 68 12 68zM21 43c1.7 0 3.2-.4 4.6-1.1l9.3 9.3c.6.6 1.3.9 2.1.9h15c1.7 0 3-1.3 3-3s-1.3-3-3-3H38.2l-8.4-8.4c.7-1.4 1.1-3 1.1-4.6 0-5.5-4.5-10-10-10s-10 4.5-10 10S15.5 43 21 43zM21 29c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4S18.8 29 21 29z"
                            />
                            <g>
                              <path
                                fill="#0284c7"
                                d="M47,119c-5.5,0-10-4.5-10-10s4.5-10,10-10s10,4.5,10,10S52.5,119,47,119z M47,105c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S49.2,105,47,105z"
                              />
                            </g>
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/ai/machine-learning"
                              className="leading-4 font-semibold text-sky-700  hover:text-black "
                              onClick={servicesHandler}
                            >
                              <h3>Machine Learning</h3>
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="26px"
                            height="26px"
                          >
                            <path
                              fill="#fff"
                              d="M76 12A7 7 0 1 0 76 26 7 7 0 1 0 76 12zM76 102A7 7 0 1 0 76 116 7 7 0 1 0 76 102zM58 26.2c0-5-4-9-9-9-5 0-9 4-9 9 0 0 0 0 0 0-1.7-1.3-3.7-2-6-2-5.5 0-10 4.5-10 10 0 1.1.2 2.1.5 3-.2 0-.3 0-.5 0-6.1 0-11 4.9-11 11 0 2.4.7 4.5 2 6.3-4.2 2.7-7 7.3-7 12.7 0 5.3 2.8 10 6.9 12.6-1.2 2.2-1.9 4.7-1.9 7.4 0 8.3 6.7 15 15 15 .3 0 .6 0 .9 0 2 5.8 7.6 10 14.1 10 8.3 0 15-6.7 15-15C58 89 58 31.2 58 26.2z"
                            />
                            <path
                              fill="#000"
                              d="M49,14.2c-5.1,0-9.4,3.1-11.2,7.6c-1.2-0.4-2.5-0.6-3.8-0.6c-7.2,0-13,5.8-13,13c0,0,0,0,0,0.1c-6.3,1.4-11.1,7-11.1,13.7c0,2,0.4,3.9,1.2,5.7C7.3,57.1,5,62,5,67.2c0,0.6,0,1.1,0.1,1.6c0,0.1,0,0.2,0,0.3c0.1,0.5,0.1,1.1,0.2,1.6c0,0.1,0,0.1,0,0.2c0.1,0.5,0.2,1,0.4,1.5c0,0,0,0.1,0,0.1c0.2,0.5,0.4,1,0.6,1.6c0,0,0,0.1,0.1,0.1c0.4,1,1,2,1.6,2.9c0,0,0,0.1,0.1,0.1c0.6,0.9,1.3,1.7,2.1,2.5c0.1,0.1,0.1,0.1,0.2,0.2c0.4,0.3,0.7,0.7,1.1,1c0.1,0.1,0.2,0.2,0.3,0.2c0.3,0.2,0.6,0.4,0.9,0.6c0.2,0.1,0.3,0.2,0.5,0.4c0,0,0.1,0.1,0.1,0.1c0.1,0,0.1,0.1,0.2,0.1c2.8,1.7,6,2.7,9.5,2.7c9.9,0,18-8.1,18-18v-5c0-1.7-1.3-3-3-3s-3,1.3-3,3v5c0,6.6-5.4,12-12,12c-2.4,0-4.6-0.7-6.5-1.9c-0.8-0.5-1.6-1.1-2.2-1.8c-0.1-0.1-0.2-0.2-0.2-0.3c-0.2-0.2-0.4-0.5-0.6-0.8c-0.1-0.1-0.2-0.2-0.3-0.4c-0.2-0.3-0.4-0.6-0.6-0.9c0-0.1-0.1-0.1-0.1-0.2c-0.2-0.4-0.4-0.8-0.6-1.2c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.3-0.2-0.6-0.3-0.9c0-0.2-0.1-0.3-0.1-0.5c-0.1-0.3-0.1-0.6-0.2-0.9c0-0.1,0-0.3-0.1-0.4C11,68.2,11,67.7,11,67.2c0-4.1,2.1-7.9,5.6-10.1c1.1-0.7,1.6-2,1.3-3.3c-0.1-0.4-0.2-0.9-0.5-1.3c-1-1.4-1.5-2.9-1.5-4.6c0-3.9,2.8-7.1,6.5-7.9c2.2,4.2,6.5,7.1,11.6,7.1c1.7,0,3-1.3,3-3s-1.3-3-3-3c-3.1,0-5.8-2.1-6.7-4.9c-0.1-0.3-0.2-0.6-0.2-0.9c0-0.1,0-0.1,0-0.2c0-0.3-0.1-0.6-0.1-1c0-3.9,3.1-7,7-7c1.5,0,3,0.5,4.2,1.4c0.9,0.7,2.1,0.8,3.1,0.3c1-0.5,1.7-1.5,1.7-2.7c0,0,0,0,0-0.1c0-3.3,2.7-5.9,6-5.9c3.3,0,6,2.7,6,6v71c0,6.6-5.4,12-12,12c-5.1,0-9.6-3.2-11.3-8c-0.4-1.3-1.7-2.1-3-2l-0.3,0c-0.1,0-0.3,0-0.4,0c-6.6,0-12-5.4-12-12c0-1.7-1.3-3-3-3s-3,1.3-3,3c0,9.5,7.5,17.4,16.9,18c3,6.1,9.2,10,16.1,10c9.9,0,18-8.1,18-18v-71C61,19.6,55.6,14.2,49,14.2z"
                            />
                            <path
                              fill="#444b54"
                              d="M20,57.6h-5c-1.7,0-3-1.3-3-3s1.3-3,3-3h5c1.7,0,3,1.3,3,3S21.7,57.6,20,57.6z"
                            />
                            <g>
                              <path
                                fill="#fff"
                                d="M111 57A7 7 0 1 0 111 71 7 7 0 1 0 111 57zM102 26A7 7 0 1 0 102 40 7 7 0 1 0 102 26zM102 88A7 7 0 1 0 102 102 7 7 0 1 0 102 88z"
                              />
                              <path
                                fill="#0284c7"
                                d="M97 93c-.8 0-1.5-.3-2.1-.9L84.8 82H71c-1.7 0-3-1.3-3-3s1.3-3 3-3h15c.8 0 1.6.3 2.1.9l11 11c1.2 1.2 1.2 3.1 0 4.2C98.5 92.7 97.8 93 97 93zM86 52H71c-1.7 0-3-1.3-3-3s1.3-3 3-3h13.8l10.1-10.1c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2l-11 11C87.6 51.7 86.8 52 86 52zM104 67H71c-1.7 0-3-1.3-3-3s1.3-3 3-3h33c1.7 0 3 1.3 3 3S105.7 67 104 67z"
                              />
                              <path
                                fill="#0284c7"
                                d="M111 74c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S116.5 74 111 74zM111 60c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S113.2 60 111 60zM102 43c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S107.5 43 102 43zM102 29c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S104.2 29 102 29zM76 29c-5.5 0-10-4.5-10-10S70.5 9 76 9s10 4.5 10 10S81.5 29 76 29zM76 15c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S78.2 15 76 15zM102 105c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S107.5 105 102 105zM102 91c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S104.2 91 102 91zM76 119c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S81.5 119 76 119zM76 105c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S78.2 105 76 105z"
                              />
                            </g>
                          </svg>

                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/ai/natural-language-processing"
                              className="leading-4  font-semibold text-sky-700 hover:text-black  "
                              onClick={servicesHandler}
                            >
                              <h3>Natural Language Processing</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="my-6 flex items-start font-semibold text-sky-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="24px"
                            height="24px"
                          >
                            <path
                              fill="#90caf9"
                              d="M41,44H15c-1.657,0-3-1.343-3-3V15c0-1.657,1.343-3,3-3h26c1.657,0,3,1.343,3,3v26 C44,42.657,42.657,44,41,44z"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M40.5,14.5v-3c0-2.209-1.791-4-4-4h-3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M14.5,7.5h-3c-2.209,0-4,1.791-4,4v3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M33.5,40.5h3c2.209,0,4-1.791,4-4v-3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M7.5,33.5v3c0,2.209,1.791,4,4,4h3"
                            />
                            <path
                              fill="none"
                              stroke="#18193f"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="3"
                              d="M24,16.3c6.1,0,9.7,4.2,11.1,6.1c0.4,0.5,0.4,1.3,0.1,1.8c-1.2,2.2-4.9,7.5-11.1,7.5s-9.9-5.1-11.1-7.2c-0.3-0.6-0.3-1.3,0.1-1.8 c0.7-1,2-2.8,4-4.2"
                            />
                            <circle cx="24" cy="24" r="3.9" fill="#18193f" />
                          </svg>
                          <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                            <Link
                              href="/ai/computer-vision-services"
                              className="leading-4  font-semibold text-sky-700 hover:text-black "
                              onClick={servicesHandler}
                            >
                              <h3>Computer Vision Services</h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Link
            href="/portfolio"
            className="text-sm font-bold leading-6 text-sky-600 hover:text-black text-[17px] focus:text-black focus:border-none"
          >
            Portfolio
          </Link>
          <Link
            href="/about-us"
            className="text-sm font-bold leading-6 text-sky-600 hover:text-black text-[17px] focus:text-black focus:border-none"
          >
            About Us
          </Link>
          <Link
            href="/careers"
            className="text-sm font-bold leading-6 text-sky-600 hover:text-black text-[17px] focus:text-black focus:border-none"
          >
            Careers
          </Link>
          <Link
            href="/contact-us"
            className="text-sm font-bold leading-6 text-sky-600 hover:text-black text-[17px] focus:text-black focus:border-none"
          >
            Contact Us
          </Link>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Services</span>
              <Image className="h-8 w-auto" src={logo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                {/* <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-[120px] items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Services
                        <TiArrowSortedDown
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 font-black text-blue-500 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="ml-5">
                        


                        <Disclosure as="div" className="-ml-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-[120px] items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Blockchain
                                <TiArrowSortedDown
                                  className={classNames(
                                    open ? "rotate-180" : "",
                                    "h-5 w-5 font-black text-blue-500 flex-none"
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="ml-5">
                               



                                <Disclosure as="div" className="-ml-1">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-[80px] items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        NFT
                                        <TiArrowSortedDown
                                          className={classNames(
                                            open ? "rotate-180" : "",
                                            "h-5 w-5 font-black text-blue-500 flex-none"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="ml-5">
                                        {[...nftList].map((item) => (
                                          <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() =>
                                              setMobileMenuOpen(false)
                                            }
                                            className="block rounded-lg py-2 pl-2 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                          >
                                            {item.name}
                                          </Link>
                                        ))}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                                {[...blockChaninList].map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-lg py-2 pl-2 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        {[...servicesList].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg py-2 p-1 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure> */}
                {/* <DropDown /> */}

                {/* services */}
                {/* <button
                  onClick={servicesHandler}
                  id="mega-menu-dropdown-button"
                  data-dropdown-toggle="mega-menu-dropdown"
                  className="flex items-center -ml-3 justify-between w-full py-2 px-3 font-bold text-gray-900  md:w-auto   md:border-0     "
                >
                  Services{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {checkClick && (
                  <div
                    id="mega-menu-dropdown"
                    className=" grid -ml-4 w-auto grid-cols-2 text-sm bg-white  rounded-lg   md:grid-cols-3    "
                  >
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 ">
                      <ul
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <li>
                          <Link
                            href="/defi"
                            className="text-gray-500  underline  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Blockchain
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/nft-development"
                            className="text-gray-500  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            NFT
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/defi"
                            className="text-gray-500  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            DeFI
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/cryptocurrency-exchange"
                            className="text-gray-500  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Cryptocurrency Exchange
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/nft-development"
                            className="text-gray-500  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            NFT Development
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/nft-marketplace-development"
                            className="text-gray-500  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            NFT Marketplace Development
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/token-development"
                            className="text-gray-500  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Token Development
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 ">
                      <ul className="space-y-4">
                        <li>
                          <Link
                            href="/web-application"
                            className="text-gray-500  underline  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Web Application
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        <li>
                          <Link
                            href="/e-commerce-solution"
                            className="text-gray-500  underline hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            e-commerce
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        <li>
                          <Link
                            href="/artificial-intelligence"
                            className="text-gray-500  underline  hover:text-blue-600 
                    "
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Artificial Intelligence
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )} */}

                <button
                  onClick={servicesHandler}
                  id="mega-menu-dropdown-button"
                  data-dropdown-toggle="mega-menu-dropdown"
                  className="flex items-center -ml-3 justify-between w-full py-2 px-3 font-bold text-gray-900  md:w-auto   md:border-0     "
                >
                  Services{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {checkClick && (
                  <div
                    ref={dropdownRef}
                    id="mega-menu-dropdown"
                    className=" grid    grid-cols-1 text-sm bg-white   rounded-lg     mt-5 md:mt-10 pb-4  "
                  >
                    {/* Blockchain Section */}
                    <div className="   text-gray-900 md:pb-4 ">
                      <div
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <div className="flex-wrap flex flex-col gap-2 items-start">
                          <div className="relative flex-wrap flex-col flex">
                            <div className=" font-bold leading-6 text-sky-700 py-4">
                              <h3>Blockchain</h3>
                            </div>
                            <div className=" relative">
                              <div className="flex items-start font-semibold text-sky-700">
                                <svg
                                  className="pt-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="30px"
                                  height="30px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M26.535,9.368l-13.938,8.047c-0.907,0.523-1.465,1.491-1.465,2.538l0,16.094 c0,1.047,0.558,2.014,1.465,2.538l13.938,8.047c0.907,0.523,2.024,0.523,2.93,0l13.938-8.047c0.907-0.523,1.465-1.491,1.465-2.538 V19.953c0-1.047-0.558-2.014-1.465-2.538L29.465,9.368C28.558,8.845,27.442,8.845,26.535,9.368z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M36.024,37l3.746-2.163c0.928-0.536,1.5-1.526,1.5-2.598l0-16.478c0-1.072-0.572-2.062-1.5-2.598L25.5,4.924 c-0.928-0.536-2.072-0.536-3,0l-4.962,2.865"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M11.614,11.209L8.23,13.163c-0.928,0.536-1.5,1.526-1.5,2.598l0,16.478c0,1.072,0.572,2.062,1.5,2.598l14.27,8.239 c0.928,0.536,2.072,0.536,3,0l4.163-2.404"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M26.28,19.016h-3.738c-0.688,0-1.246,0.558-1.246,1.246v7.476c0,0.688,0.558,1.246,1.246,1.246 s1.246-0.558,1.246-1.246v-2.492h1.869c0.688,0,1.246-0.558,1.246-1.246s-0.558-1.246-1.246-1.246h-1.869v-1.246h2.492 c0.688,0,1.246-0.558,1.246-1.246S26.968,19.016,26.28,19.016z"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M17.273,19.016c-0.688,0-1.246,0.558-1.246,1.246v3.361l-2.701-4.052 c-0.305-0.458-0.873-0.661-1.398-0.501c-0.526,0.159-0.885,0.644-0.885,1.193v7.476c0,0.688,0.558,1.246,1.246,1.246 s1.246-0.558,1.246-1.246v-3.361l2.701,4.052c0.235,0.353,0.628,0.555,1.037,0.555c0.12,0,0.242-0.017,0.361-0.054 c0.526-0.159,0.885-0.644,0.885-1.193v-7.476C18.519,19.574,17.961,19.016,17.273,19.016z"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M35.711,19.016h-4.984c-0.688,0-1.246,0.558-1.246,1.246s0.558,1.246,1.246,1.246h1.246v6.23 c0,0.688,0.558,1.246,1.246,1.246s1.246-0.558,1.246-1.246v-6.23h1.246c0.688,0,1.246-0.558,1.246-1.246S36.4,19.016,35.711,19.016 z"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <h3>NFT</h3>
                                  <div className="flex flex-wrap xl:flex-nowrap text-gray-700  ">
                                    <Link
                                      href="/nft-development"
                                      className="leading-4 hover:text-gray-500 text-[12px] font-medium  flex items-start"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      Development,
                                    </Link>
                                    <Link
                                      href="/nft-marketplace-development"
                                      className="leading-4 hover:text-gray-500 text-[12px] font-medium pl-0 xl:pl-2 flex items-start"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      Marketplace
                                    </Link>
                                  </div>
                                </div>
                              </div>

                              <div className="my-6 flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="27px"
                                  height="27px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M43.9,43.9H12.1c-2.3,0-4.1-1.8-4.1-4.1V16.2c0-2.3,1.8-4.1,4.1-4.1h31.8c2.3,0,4.1,1.8,4.1,4.1v23.6 C48,42.1,46.2,43.9,43.9,43.9z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M43.5,32.4v3.1c0,2.2-1.8,4-4,4h-31c-2.2,0-4-1.8-4-4V22.7"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M4.5,16.3v-3.8c0-2.2,1.8-4,4-4h31c2.2,0,4,1.8,4,4v14.9"
                                  />
                                  <circle
                                    cx="13"
                                    cy="18"
                                    r="2"
                                    fill="#18193f"
                                  />
                                  <circle
                                    cx="35"
                                    cy="18"
                                    r="2"
                                    fill="#18193f"
                                  />
                                  <line
                                    x1="15.5"
                                    x2="32.5"
                                    y1="33.5"
                                    y2="33.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                    d="M22.3,22l2.1,0c1.1,0,1.9-0.9,1.9-2l0,0c0-1.1-0.9-2-2-2h-0.9c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-1.9,1.9-2l1.5,0"
                                  />
                                  <line
                                    x1="23.7"
                                    x2="23.7"
                                    y1="13"
                                    y2="13.9"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="23.7"
                                    x2="23.7"
                                    y1="23.2"
                                    y2="22.2"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="12.5"
                                    x2="35.5"
                                    y1="28.5"
                                    y2="28.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/defi"
                                    className="leading-4 font-semibold text-sky-700  hover:text-black flex items-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <h3>DeFI</h3>
                                  </Link>
                                </div>
                              </div>

                              <div className="flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                  width="28px"
                                  height="28px"
                                >
                                  <circle cx="89" cy="89" r="35" fill="#fff" />
                                  <circle
                                    cx="39"
                                    cy="39"
                                    r="35"
                                    fill="#90caf9"
                                  />
                                  <path
                                    fill="#90caf9"
                                    d="M39,77C18.05,77,1,59.95,1,39S18.05,1,39,1s38,17.05,38,38S59.95,77,39,77z M39,7C21.36,7,7,21.35,7,39 s14.36,32,32,32s32-14.35,32-32S56.64,7,39,7z"
                                  />
                                  <path
                                    fill="#90caf9"
                                    d="M89,127c-20.95,0-38-17.05-38-38c0-1.22,0.06-2.45,0.17-3.66c0.16-1.65,1.64-2.85,3.27-2.7 c1.65,0.16,2.86,1.62,2.7,3.27C57.05,86.93,57,87.97,57,89c0,17.65,14.36,32,32,32s32-14.35,32-32s-14.36-32-32-32 c-1.04,0-2.09,0.05-3.11,0.15c-1.64,0.16-3.12-1.05-3.27-2.7s1.05-3.12,2.7-3.27C86.53,51.06,87.77,51,89,51 c20.95,0,38,17.05,38,38S109.95,127,89,127z"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M124,3c-1.66,0-3,1.34-3,3v14.19C112.8,12.27,99.79,4,83.58,0.67C81.96,0.33,80.38,1.38,80.04,3 c-0.33,1.62,0.71,3.21,2.33,3.54C97.65,9.69,109.98,17.78,117.32,25H102c-1.66,0-3,1.34-3,3s1.34,3,3,3h22c1.66,0,3-1.34,3-3V6 C127,4.34,125.66,3,124,3z"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M45.62,121.46c-15.27-3.14-27.6-11.23-34.94-18.46H26c1.66,0,3-1.34,3-3s-1.34-3-3-3H4c-1.66,0-3,1.34-3,3v22 c0,1.66,1.34,3,3,3s3-1.34,3-3v-14.19c8.2,7.93,21.2,16.19,37.41,19.52c0.2,0.04,0.41,0.06,0.61,0.06c1.39,0,2.64-0.98,2.94-2.4 C48.29,123.38,47.25,121.79,45.62,121.46z"
                                  />
                                  <g>
                                    <path
                                      fill="#fff"
                                      d="M39,52c-1.66,0-3-1.34-3-3V29c0-1.66,1.34-3,3-3s3,1.34,3,3v20C42,50.66,40.66,52,39,52z"
                                    />
                                  </g>
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/cryptocurrency-exchange"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black gap-2 flex "
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <h3>Crypto Exchange</h3>
                                  </Link>
                                </div>
                              </div>
                              <div className="my-6 flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                  width="28px"
                                  height="28px"
                                >
                                  <path
                                    fill="#fff"
                                    d="M59,5.69L16,30.51c-3.09,1.79-5,5.09-5,8.66v49.65c0,3.57,1.91,6.87,5,8.66l43,24.83 c3.09,1.79,6.91,1.79,10,0l43-24.83c3.09-1.79,5-5.09,5-8.66V39.17c0-3.57-1.91-6.87-5-8.66L69,5.69C65.91,3.9,62.09,3.9,59,5.69z"
                                  />
                                  <path
                                    fill="#90caf9"
                                    d="M113.5,27.92L102,21.28c-1.44-0.83-3.27-0.34-4.1,1.1c-0.83,1.44-0.34,3.27,1.1,4.1l11.5,6.64 c0.17,0.1,0.32,0.21,0.48,0.32L99,40.35c-1.43,0.83-1.93,2.66-1.1,4.1c0.56,0.96,1.56,1.5,2.6,1.5c0.51,0,1.02-0.13,1.5-0.4 l11.96-6.91c0.01,0.18,0.04,0.35,0.04,0.53v49.65c0,2.49-1.34,4.82-3.5,6.06l-43,24.83c-0.16,0.09-0.33,0.17-0.5,0.25V104.6 c0-1.66-1.34-3-3-3s-3,1.34-3,3v15.36c-0.17-0.08-0.34-0.15-0.5-0.25L49,113.07c-1.43-0.83-3.27-0.34-4.1,1.1 c-0.83,1.44-0.34,3.27,1.1,4.1l11.5,6.64c2,1.16,4.25,1.74,6.5,1.74s4.5-0.58,6.5-1.74l43-24.83c4.01-2.31,6.5-6.63,6.5-11.26 V39.17C120,34.54,117.51,30.23,113.5,27.92z"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M92,46.1L70,33.4l21.75-12.56c0.51-0.3,0.91-0.72,1.16-1.21c0.02-0.03,0.04-0.07,0.06-0.1 c0.83-1.44,0.34-3.27-1.1-4.1L70.5,3.09c-4.01-2.31-8.99-2.31-13,0l-43,24.83C10.49,30.23,8,34.54,8,39.17v49.65 c0,4.63,2.49,8.94,6.5,11.26l21.26,12.27l0.26,0.15c0.46,0.26,0.97,0.39,1.48,0.39c0.52,0,1.04-0.14,1.51-0.41 c0.92-0.54,1.49-1.52,1.49-2.59V84.5l22,12.7c0.93,0.54,2.07,0.54,3,0L92,81.9c0.93-0.54,1.5-1.53,1.5-2.6V48.7 C93.5,47.63,92.93,46.64,92,46.1z M60.5,8.29c1.08-0.62,2.29-0.94,3.5-0.94s2.42,0.31,3.5,0.94l17,9.81l-22,12.7 c-0.93,0.54-1.5,1.53-1.5,2.6s0.57,2.06,1.5,2.6l22,12.7L64,60.56L17.02,33.43c0.16-0.11,0.31-0.23,0.48-0.32L60.5,8.29z M39,76.7 c-0.93-0.54-2.07-0.54-3,0s-1.5,1.53-1.5,2.6v25.4l-17-9.81c-2.16-1.25-3.5-3.57-3.5-6.06V39.17c0-0.18,0.02-0.36,0.04-0.53 L61,65.75V89.4L39,76.7z M67,89.4V65.75L87.5,53.9v23.67L67,89.4z"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/token-development"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black "
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <h3>Token Development</h3>
                                  </Link>
                                </div>
                              </div>
                              <hr className="my-10 h-px  border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-25 " />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Web App Section */}
                    <div className="  text-gray-900 md:pb-4 ">
                      <div
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <div className="flex-wrap flex flex-col gap-2 items-start">
                          <div className="relative  flex-wrap flex-col flex">
                            <div className=" font-bold leading-6 text-sky-700 py-4">
                              <h3> Web App</h3>
                            </div>
                            <div className=" relative">
                              <div className="mb-5 pt-1 flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="26px"
                                  height="26px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M46.8,37.3H43V16.2c0-1-0.8-1.9-1.9-1.9H12.4c-1,0-1.9,0.8-1.9,1.9v21.1H6.7c-0.5,0-0.9,0.4-0.9,0.9v0.1 c0,2.6,2.1,4.7,4.7,4.7H43c2.6,0,4.7-2.1,4.7-4.7v-0.1C47.7,37.7,47.3,37.3,46.8,37.3z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M18.7,8.5h20.8c1.1,0,2,0.9,2,2v21c0,1.1-0.9,2-2,2h-31c-1.1,0-2-0.9-2-2v-21c0-1.1,0.9-2,2-2h4"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M32,39.5H6.5c-2.8,0-5-2.2-5-5v0c0-0.6,0.4-1,1-1h43c0.6,0,1,0.4,1,1v0c0,2.8-2.2,5-5,5H38"
                                  />
                                  <line
                                    x1="25.5"
                                    x2="22.5"
                                    y1="14.5"
                                    y2="27.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                  />
                                  <polyline
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    points="30.5,24.5 33.5,21 30.5,17.5"
                                  />
                                  <polyline
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    points="17.5,24.5 14.5,21 17.5,17.5"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/web-app/web-design"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black"
                                    onClick={servicesHandler}
                                  >
                                    <h3>Web Design</h3>
                                  </Link>
                                </div>
                              </div>
                              <div className="flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="26px"
                                  height="26px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M45,15.9v24.2c0,2.1-1.7,3.9-3.9,3.9H14.9c-2.1,0-3.9-1.7-3.9-3.9V15.9c0-2.1,1.7-3.9,3.9-3.9h26.2 C43.2,12,45,13.7,45,15.9z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M6.5,27.8V11.5c0-2.2,1.8-4,4-4h27c2.2,0,4,1.8,4,4v7.2"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M41.5,25.7v10.8c0,2.2-1.8,4-4,4h-27c-2.2,0-4-1.8-4-4v-1.6"
                                  />
                                  <rect
                                    width="7"
                                    height="14"
                                    x="28.5"
                                    y="20.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                  <rect
                                    width="10"
                                    height="8"
                                    x="12.5"
                                    y="20.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="12.5"
                                    x2="22.5"
                                    y1="34.5"
                                    y2="34.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="7"
                                    x2="42"
                                    y1="13.5"
                                    y2="13.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="34.5"
                                    x2="34.5"
                                    y1="7.5"
                                    y2="13.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="27.5"
                                    x2="27.5"
                                    y1="7.5"
                                    y2="13.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/web-app/custom-web-app"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black gap-2 flex "
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <h3>Custom Web App</h3>
                                  </Link>
                                </div>
                              </div>

                              <div className="my-6 flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="26px"
                                  height="26px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M43.1,37H12.9c-1.6,0-2.9-1.3-2.9-2.9V13.9c0-1.6,1.3-2.9,2.9-2.9h30.2c1.6,0,2.9,1.3,2.9,2.9v20.2 C46,35.7,44.7,37,43.1,37z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M42.5,15.7v14.8c0,1.7-1.3,3-3,3h-31c-1.7,0-3-1.3-3-3v-2.3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5.5,22.6V9.5c0-1.7,1.3-3,3-3h31c1.7,0,3,1.3,3,3v1.6"
                                  />
                                  <line
                                    x1="13.5"
                                    x2="34.5"
                                    y1="41.5"
                                    y2="41.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="29.5"
                                    x2="29.5"
                                    y1="33.5"
                                    y2="41.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="18.5"
                                    x2="18.5"
                                    y1="33.5"
                                    y2="41.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M11.5,13.5h5c0.6,0,1,0.4,1,1v11c0,0.6-0.4,1-1,1h-5c-0.6,0-1-0.4-1-1v-11C10.5,13.9,10.9,13.5,11.5,13.5z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M25.8,26.5h-2.3c-0.6,0-1-0.4-1-1v-11c0-0.6,0.4-1,1-1h13c0.6,0,1,0.4,1,1v11c0,0.6-0.4,1-1,1h-6.1"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/web-app/responsive-web-app"
                                    className="leading-4 font-semibold text-sky-700  hover:text-black flex items-center"
                                    onClick={servicesHandler}
                                  >
                                    <h3>Responsive Web App</h3>
                                  </Link>
                                </div>
                              </div>

                              <div className="flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="26px"
                                  height="26px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M32.5,43.1c0.2-1.9,1.6-3.5,3.5-3.9c1-0.2,2,0,2.9,0.4l1.9,0.8c0.4,0.2,0.9,0.1,1.2-0.2c1.5-1.8,2.7-3.8,3.5-6 c0.1-0.4,0-0.9-0.4-1.1l-1.6-1.2c-0.8-0.6-1.4-1.4-1.7-2.3c-0.6-1.9,0.1-3.9,1.6-5l1.8-1.3c0.4-0.3,0.5-0.7,0.4-1.1 c-0.8-2.2-2-4.3-3.5-6c-0.3-0.3-0.8-0.4-1.2-0.2L39,16.5c-0.9,0.4-1.9,0.6-2.9,0.4c-2-0.4-3.3-2-3.5-3.9l-0.2-2.2 c0-0.4-0.4-0.8-0.8-0.9c-1.1-0.2-2.3-0.3-3.5-0.3s-2.4,0.1-3.5,0.3c-0.4,0.1-0.7,0.4-0.8,0.9l-0.2,2c-0.1,1-0.5,1.9-1.1,2.7 c-1.3,1.5-3.4,1.9-5.2,1.1l-2-0.9c-0.4-0.2-0.9-0.1-1.2,0.2c-1.5,1.8-2.7,3.8-3.5,6c-0.1,0.4,0,0.9,0.4,1.1l1.6,1.2 c0.8,0.6,1.4,1.4,1.8,2.3c0.6,1.9-0.1,3.9-1.6,5L11,32.8c-0.4,0.3-0.5,0.7-0.4,1.1c0.8,2.2,2,4.3,3.5,6c0.3,0.3,0.8,0.4,1.2,0.2 l1.9-0.8c0.9-0.4,1.9-0.6,2.9-0.4c2,0.4,3.3,2,3.5,3.9l0.2,2.2c0,0.4,0.4,0.8,0.8,0.9c1.1,0.2,2.3,0.3,3.5,0.3s2.4-0.1,3.5-0.3 c0.4-0.1,0.7-0.4,0.8-0.9L32.5,43.1z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M30.8,35.7c1.2-0.7,2.8-0.8,4.1-0.2l2.7,1.2c1.9-2,3.4-4.5,4.2-7.3l-2.4-1.7c-1.2-0.8-1.8-2.2-1.8-3.6 s0.7-2.8,1.8-3.6l2.4-1.7c-0.8-2.8-2.3-5.2-4.2-7.3l-2.7,1.2c-1.3,0.6-2.8,0.5-4.1-0.2s-2.1-2-2.2-3.4L28.2,6 c-1.4-0.3-2.8-0.5-4.2-0.5S21.1,5.7,19.8,6"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M17.3,12.3c-1.2,0.7-2.8,0.8-4.1,0.2l-2.7-1.2c-1.9,2-3.4,4.5-4.2,7.3l2.4,1.7c1.2,0.8,1.8,2.2,1.8,3.6 s-0.7,2.8-1.8,3.6l-2.4,1.7c0.8,2.8,2.3,5.2,4.2,7.3l2.7-1.2c1.3-0.6,2.8-0.5,4.1,0.2s2.1,2,2.2,3.4l0.3,2.9 c1.4,0.3,2.8,0.5,4.2,0.5s2.9-0.2,4.2-0.5"
                                  />
                                  <line
                                    x1="25.4"
                                    x2="22.6"
                                    y1="17.8"
                                    y2="30.2"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                  />
                                  <polyline
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    points="29.3,27.7 32.6,24 29.3,20.3"
                                  />
                                  <polyline
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    points="18.7,27.7 15.4,24 18.7,20.3"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/web-app/full-stack-development"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black gap-2 flex "
                                    onClick={servicesHandler}
                                  >
                                    <h3>Fullstack development</h3>
                                  </Link>
                                </div>
                              </div>
                              <hr className="my-10 h-px  border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-25 " />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* WordPress Section */}
                    {/* <div className="   text-gray-900 md:pb-4 ">
                      <div
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <div className="flex-wrap flex flex-col gap-2 items-start">
                          <div className="relative  flex-wrap flex-col flex">
                            <div className=" font-bold leading-6 text-sky-700 py-4">
                              <h3>Word Press</h3>
                            </div>
                            <div className=" relative">
                              <div className="flex mb-5  items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="24px"
                                  height="24px"
                                >
                                  <circle
                                    cx="28"
                                    cy="28"
                                    r="18"
                                    fill="#90caf9"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M20.468,42.163C11.94,40.515,5.5,33.009,5.5,24c0-6.57,3.425-12.34,8.586-15.622"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M19.577,6.032C20.994,5.684,22.476,5.5,24,5.5c10.217,0,18.5,8.283,18.5,18.5 c0,8.659-5.948,15.928-13.981,17.944"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M34.668,10.685c-0.904,0.603-1.537,1.808-1.537,2.948c0,1.507,0.848,2.826,1.79,4.334 c0.754,1.225,1.507,2.826,1.507,5.088c0,1.602-0.471,3.58-1.413,6.03l-1.884,6.218l-6.689-19.974 c1.131-0.094,2.167-0.188,2.167-0.188c0.942-0.094,0.848-1.507-0.094-1.507c0,0,0,0-0.094,0c0,0-3.015,0.283-4.993,0.283 c-1.79,0-4.899-0.283-4.899-0.283s0,0-0.094,0c-0.942,0-1.036,1.507-0.094,1.507c0,0,0.942,0.094,1.979,0.188l2.921,7.914 L19.19,35.397l-6.784-20.162c1.131-0.094,2.167-0.188,2.167-0.188c0.942-0.094,0.848-1.507-0.094-1.507c0,0,0,0-0.094,0 c0,0-2.261,0.227-4.089,0.293c-1.234,1.602-2.031,3.148-2.625,5.136L14.753,38.3c1.3,0.857,2.713,1.526,4.23,1.997l5.012-14.698 l5.351,14.566c1.564-0.509,3.034-1.222,4.353-2.164l4.993-14.474c0.744-1.884,1.238-3.806,1.407-5.276 C39.358,15.747,37.01,12.312,34.668,10.685z"
                                  />
                                </svg>
                                <Link
                                  href={"/word-press/custom-development"}
                                  onClick={servicesHandler}
                                  className="ml-1 flex flex-wrap xl:flex-nowrap flex-col hover:text-black"
                                >
                                  <h3>Custom Development</h3>
                                </Link>
                              </div>

                              <div className="flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                  width="20px"
                                  height="20px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M114,124H14c-5.5,0-10-4.5-10-10V14C4,8.5,8.5,4,14,4h100c5.5,0,10,4.5,10,10v100 C124,119.5,119.5,124,114,124z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M104,55H77c-1.7,0-3,1.3-3,3v30c0,1.7,1.3,3,3,3h27c1.7,0,3-1.3,3-3V58C107,56.3,105.7,55,104,55z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M114,127H14c-7.2,0-13-5.8-13-13V41c0-1.7,1.3-3,3-3s3,1.3,3,3v73c0,3.9,3.1,7,7,7h100c3.9,0,7-3.1,7-7V14 c0-3.9-3.1-7-7-7H14c-3.9,0-7,3.1-7,7v11h104c1.7,0,3,1.3,3,3s-1.3,3-3,3H4c-1.7,0-3-1.3-3-3V14C1,6.8,6.8,1,14,1h100 c7.2,0,13,5.8,13,13v100C127,121.2,121.2,127,114,127z"
                                  />
                                  <circle cx="16" cy="16" r="3" fill="#000" />
                                  <circle cx="26" cy="16" r="3" fill="#000" />
                                  <circle cx="36" cy="16" r="3" fill="#000" />
                                  <path
                                    fill="#000"
                                    d="M61,61H24c-1.7,0-3-1.3-3-3s1.3-3,3-3h37c1.7,0,3,1.3,3,3S62.7,61,61,61z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M61,76H24c-1.7,0-3-1.3-3-3s1.3-3,3-3h37c1.7,0,3,1.3,3,3S62.7,76,61,76z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M51,91H24c-1.7,0-3-1.3-3-3s1.3-3,3-3h27c1.7,0,3,1.3,3,3S52.7,91,51,91z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M61,91c-0.2,0-0.4,0-0.6-0.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.1-0.3-0.2-0.5-0.3c-0.2-0.1-0.3-0.2-0.5-0.4 C58.3,89.6,58,88.8,58,88c0-0.2,0-0.4,0.1-0.6c0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.2,0.2-0.3,0.4-0.5 c1.1-1.1,3.1-1.1,4.2,0c0.1,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.2,0.3,0.3,0.5c0.1,0.2,0.1,0.4,0.2,0.6c0,0.2,0.1,0.4,0.1,0.6 c0,0.8-0.3,1.6-0.9,2.1C62.6,90.7,61.8,91,61,91z"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/word-press/responsive-design"
                                    className="leading-4 font-semibold text-sky-700  hover:text-black flex items-center"
                                    onClick={servicesHandler}
                                  >
                                    <h3>Responsive Design</h3>
                                  </Link>
                                </div>
                              </div>

                              <div className="my-6 flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="26px"
                                  height="26px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M43.098,38H12.902C11.299,38,10,36.701,10,35.098V15.902C10,14.299,11.299,13,12.902,13h30.197 C44.701,13,46,14.299,46,15.902v19.197C46,36.701,44.701,38,43.098,38z"
                                  />
                                  <line
                                    x1="18.5"
                                    x2="18.5"
                                    y1="34.5"
                                    y2="42.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="29.5"
                                    x2="29.5"
                                    y1="34.5"
                                    y2="42.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="13.5"
                                    x2="34.5"
                                    y1="42.5"
                                    y2="42.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                  />
                                  <line
                                    x1="11.5"
                                    x2="36.5"
                                    y1="24.5"
                                    y2="24.5"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M13.052,19.53 C12.693,18.418,12.5,17.232,12.5,16c0-6.351,5.149-11.5,11.5-11.5S35.5,9.649,35.5,16c0,1.398-0.249,2.738-0.706,3.977"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M24.812,22h-1.774c-1.504,0-2.813-0.783-3.328-1.557c-0.383-0.574-0.228-1.351,0.347-1.733 c0.568-0.379,1.336-0.23,1.723,0.331c0.113,0.128,0.603,0.459,1.259,0.459h1.774c0.655,0,1.188-0.505,1.188-1.125 s-0.532-1.125-1.188-1.125h-1.375c-2.033,0-3.687-1.626-3.687-3.625S21.404,10,23.437,10h1.313c2.01,0,2.958,1.425,3.06,1.587 c0.366,0.585,0.188,1.357-0.397,1.723c-0.584,0.368-1.356,0.189-1.722-0.397c-0.015-0.018-0.313-0.413-0.94-0.413h-1.313 c-0.655,0-1.187,0.505-1.187,1.125s0.532,1.125,1.187,1.125h1.375c2.033,0,3.688,1.626,3.688,3.625S26.846,22,24.812,22z"
                                  />
                                  <line
                                    x1="24"
                                    x2="24"
                                    y1="9.3"
                                    y2="11"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="2.5"
                                  />
                                  <line
                                    x1="24"
                                    x2="24"
                                    y1="22.7"
                                    y2="21"
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="2.5"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M22.915,34.5H8.5c-1.657,0-3-1.343-3-3v-20c0-1.657,1.343-3,3-3h1.819"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M37.702,8.5H39.5c1.657,0,3,1.343,3,3v20c0,1.657-1.343,3-3,3h-10"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/word-press/woocommerce-solution"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black "
                                    onClick={servicesHandler}
                                  >
                                    <h3>WooCommerce Solution</h3>
                                  </Link>
                                </div>
                              </div>
                              <div className=" flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                  width="19px"
                                  height="20px"
                                >
                                  <path
                                    fill="#fff"
                                    d="M104,124c11.05,0,20-8.95,20-20V24c0-11.05-8.95-20-20-20H24C12.95,4,4,12.95,4,24v80c0,11.05,8.95,20,20,20 L104,124z"
                                  />
                                  <path
                                    fill="#71c2ff"
                                    d="M125.12,107.5l-28.87-50C93.91,53.43,89.7,51,85,51s-8.91,2.43-11.26,6.5l-28.87,50 c-2.35,4.07-2.35,8.93,0,13s6.56,6.5,11.26,6.5h57.73c4.7,0,8.91-2.43,11.26-6.5S127.48,111.57,125.12,107.5z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M85,115c-1.66,0-3-1.34-3-3v-3c0-1.66,1.34-3,3-3s3,1.34,3,3v3C88,113.66,86.66,115,85,115z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M85,97c-1.66,0-3-1.34-3-3V72c0-1.66,1.34-3,3-3s3,1.34,3,3v22C88,95.66,86.66,97,85,97z"
                                  />
                                  <path
                                    fill="#90caf9"
                                    d="M36,22H26c-1.66,0-3-1.34-3-3s1.34-3,3-3h10c1.66,0,3,1.34,3,3S37.66,22,36,22z"
                                  />
                                  <g>
                                    <path
                                      fill="#444b54"
                                      d="M102,22H64c-1.66,0-3-1.34-3-3s1.34-3,3-3h38c1.66,0,3,1.34,3,3S103.66,22,102,22z"
                                    />
                                  </g>
                                  <path
                                    fill="#000"
                                    d="M104,1H24C11.32,1,1,11.32,1,24v80c0,12.68,10.32,23,23,23h10c1.66,0,3-1.34,3-3s-1.34-3-3-3H24 c-9.37,0-17-7.63-17-17V37h114v37c0,1.66,1.34,3,3,3s3-1.34,3-3V24C127,11.32,116.68,1,104,1z M7,31v-7c0-9.37,7.63-17,17-17h80 c9.37,0,17,7.63,17,17v7H7z"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/word-press/support-maintenance"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black"
                                    onClick={servicesHandler}
                                  >
                                    <h3>Support and Maintenance</h3>
                                  </Link>
                                </div>
                              </div>
                              <hr className="my-10 h-px  border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-25 " />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* AI Section */}
                    <div className="  text-gray-900 md:pb-4 ">
                      <div
                        className="space-y-4"
                        aria-labelledby="mega-menu-dropdown-button"
                      >
                        <div className="flex-wrap flex flex-col gap-2 items-start">
                          <div className="relative  flex-wrap flex-col flex">
                            <div className=" font-bold leading-6 text-sky-700 py-4">
                              <h3> AI</h3>
                            </div>
                            <div className="">
                              <div className="flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="26px"
                                  height="26px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M44.475,24.803c0.774-2.528,0.53-5.23-0.722-7.583c-2.018-3.792-6.225-5.638-10.284-5.086 c-1.802-1.935-4.265-3.074-6.929-3.166c-4.294-0.149-7.996,2.572-9.547,6.363c-2.576,0.593-4.794,2.156-6.206,4.417 c-2.275,3.643-1.771,8.21,0.737,11.449c-0.774,2.528-0.53,5.23,0.722,7.583c2.018,3.792,6.225,5.638,10.284,5.086 c1.802,1.935,4.265,3.074,6.929,3.167c4.293,0.148,7.996-2.573,9.547-6.364c2.576-0.593,4.794-2.156,6.205-4.417 C47.486,32.608,46.982,28.042,44.475,24.803z"
                                  />
                                  <path
                                    fill="#18193f"
                                    d="M38.844,17.559l-7.523-4.343c-0.493-0.284-1.1-0.285-1.594-0.003l-10.245,5.855l0.021-4.018 l7.913-4.569c3.445-1.989,7.938-1.371,10.44,1.722c0.594,0.734,1.04,1.539,1.341,2.382c0.211,0.592,0.772,0.984,1.4,0.984 c1.037,0,1.772-1.03,1.421-2.006c-0.416-1.158-1.033-2.265-1.853-3.275c-2.488-3.065-6.393-4.357-10.151-3.807 c-1.987-2.124-4.699-3.373-7.63-3.473c-4.733-0.161-8.814,2.839-10.525,7.018c-2.842,0.654-5.289,2.378-6.847,4.873 c-3.318,5.313-1.284,12.41,4.142,15.543l7.523,4.343c0.493,0.284,1.1,0.285,1.594,0.003l10.245-5.855l-0.021,4.018l-7.902,4.563 c-3.448,1.991-7.945,1.378-10.451-1.715c-0.591-0.73-1.035-1.53-1.336-2.368c-0.212-0.591-0.772-0.982-1.4-0.982h0 c-1.039,0-1.774,1.033-1.421,2.01c0.326,0.901,0.774,1.771,1.344,2.589c2.43,3.487,6.613,5.039,10.645,4.465 c1.987,2.129,4.7,3.381,7.634,3.483c4.736,0.163,8.82-2.838,10.531-7.02c2.841-0.654,5.288-2.378,6.844-4.872 C46.303,27.788,44.269,20.691,38.844,17.559z M34,33.723c0,4.324-3.313,8.077-7.633,8.269c-1.837,0.082-3.585-0.463-5.024-1.496 c0.274-0.13,0.546-0.266,0.812-0.42l7.521-4.342c0.493-0.285,0.799-0.81,0.802-1.38l0.054-9.883c0.003-0.55-0.441-0.999-0.992-1 c-0.549-0.002-0.995,0.441-0.998,0.99l-0.011,2.172L18.498,32.37l-7.918-4.571c-3.745-2.163-5.339-6.908-3.345-10.745 c0.848-1.633,2.196-2.875,3.812-3.605C11.022,13.753,11,14.058,11,14.367v8.684c0,0.569,0.302,1.095,0.794,1.382l8.73,5.055 c0.475,0.275,1.082,0.113,1.358-0.361c0.277-0.476,0.114-1.085-0.362-1.361L14,23.42v-9.143c0-4.325,3.313-8.077,7.634-8.269 c1.835-0.081,3.582,0.462,5.02,1.494c-0.264,0.127-0.526,0.259-0.782,0.407l-7.548,4.357c-0.494,0.285-0.799,0.81-0.802,1.38 l-0.054,9.797c-0.003,0.55,0.441,0.999,0.992,1c0.549,0.002,0.995-0.441,0.998-0.99l0.011-2.087l4.552-2.603L34,24.58V33.723z M40.765,30.946c-0.848,1.633-2.195,2.875-3.812,3.604C36.978,34.248,37,33.944,37,33.636v-8.687c0-0.569-0.302-1.095-0.794-1.382 l-10.191-5.943l3.487-1.994l7.918,4.571C41.165,22.364,42.759,27.109,40.765,30.946z"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/ai/custom-ai-solution"
                                    className="leading-4 font-semibold text-sky-700  hover:text-black "
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <h3>Custom AI Solution</h3>
                                  </Link>
                                </div>
                              </div>

                              <div className="my-6 flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                  width="25px"
                                  height="25px"
                                >
                                  <path
                                    fill="#fff"
                                    d="M64.1,4c0.1,0,0.2,0,0.4,0c0.1,0,0.2,0,0.4,0c21.8,0,40.4,13.9,47.3,33.4c1.8,5.2,7.7,37.1,7.7,37.1c0.7,2.1,0.1,4.4-1.4,6l-2.8,2.8c-1.1,1.1-1.7,2.6-1.7,4.2V102c0,4.4-3.6,8-8,8h-8c-5.5,0-10,4.5-10,10v7H77H64L64.1,4C64,4,64,4,64.1,4z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M87.9 127c-1.7 0-3-1.3-3-3v-4c0-7.2 5.8-13 13-13h8c2.8 0 5-2.2 5-5V87.5c0-2.4.9-4.6 2.5-6.3l2.8-2.8c.8-.8 1-1.9.7-3 0-.1-.1-.2-.1-.3l-6.4-30.7c-2.9-14.1-11.7-25.8-24-32.2C80.4 9.1 73.8 7.4 67 7v102c0 1.7-1.3 3-3 3s-3-1.3-3-3V4c0-.9.4-1.7 1.1-2.3C62.7 1.2 63.4 1 64.2 1c8.7-.1 17.4 1.9 25 5.9 13.9 7.2 23.8 20.4 27.1 36.3l6.4 30.6c.9 3.1.1 6.5-2.2 8.8l-2.8 2.8c-.5.6-.8 1.3-.8 2.1V102c0 6.1-4.9 11-11 11h-8c-3.9 0-7 3.1-7 7v4C90.9 125.7 89.5 127 87.9 127zM64 4L64 4 64 4zM64 127c-.2 0-.4 0-.6-.1-.2 0-.4-.1-.6-.2-.2-.1-.3-.2-.5-.3-.2-.1-.3-.2-.5-.4-.6-.6-.9-1.3-.9-2.1 0-.2 0-.4.1-.6 0-.2.1-.4.2-.6.1-.2.2-.3.3-.5.1-.2.2-.3.4-.4s.3-.3.5-.4c.2-.1.3-.2.5-.3.2-.1.4-.1.6-.2.4-.1.8-.1 1.2 0 .2 0 .4.1.6.2.2.1.4.2.5.3.2.1.3.2.5.4.1.1.3.3.4.4.1.2.2.3.3.5.1.2.1.4.2.6 0 .2.1.4.1.6 0 .8-.3 1.6-.9 2.1-.1.1-.3.3-.5.4-.2.1-.3.2-.5.3-.2.1-.4.1-.6.2C64.4 127 64.2 127 64 127z"
                                  />
                                  <path
                                    fill="#fff"
                                    d="M47 12A7 7 0 1 0 47 26 7 7 0 1 0 47 12zM47 102A7 7 0 1 0 47 116 7 7 0 1 0 47 102zM12 57A7 7 0 1 0 12 71 7 7 0 1 0 12 57zM21 26A7 7 0 1 0 21 40 7 7 0 1 0 21 26zM21 88A7 7 0 1 0 21 102 7 7 0 1 0 21 88z"
                                  />
                                  <path
                                    fill="#0284c7"
                                    d="M47 29c-5.5 0-10-4.5-10-10S41.5 9 47 9s10 4.5 10 10S52.5 29 47 29zM47 15c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S49.2 15 47 15zM52 76H37c-.8 0-1.6.3-2.1.9l-9.3 9.3c-1.4-.7-3-1.1-4.6-1.1-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10c0-1.7-.4-3.2-1.1-4.6l8.4-8.4H52c1.7 0 3-1.3 3-3S53.7 76 52 76zM21 99c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4S23.2 99 21 99zM52 61H21.5c-1.3-4.1-5.1-7-9.5-7C6.5 54 2 58.5 2 64s4.5 10 10 10c4.5 0 8.3-2.9 9.5-7H52c1.7 0 3-1.3 3-3S53.7 61 52 61zM12 68c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4S14.2 68 12 68zM21 43c1.7 0 3.2-.4 4.6-1.1l9.3 9.3c.6.6 1.3.9 2.1.9h15c1.7 0 3-1.3 3-3s-1.3-3-3-3H38.2l-8.4-8.4c.7-1.4 1.1-3 1.1-4.6 0-5.5-4.5-10-10-10s-10 4.5-10 10S15.5 43 21 43zM21 29c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4S18.8 29 21 29z"
                                  />
                                  <g>
                                    <path
                                      fill="#0284c7"
                                      d="M47,119c-5.5,0-10-4.5-10-10s4.5-10,10-10s10,4.5,10,10S52.5,119,47,119z M47,105c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S49.2,105,47,105z"
                                    />
                                  </g>
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/ai/machine-learning"
                                    className="leading-4 font-semibold text-sky-700  hover:text-black "
                                    onClick={servicesHandler}
                                  >
                                    <h3>Machine Learning</h3>
                                  </Link>
                                </div>
                              </div>

                              <div className="flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                  width="28px"
                                  height="28px"
                                >
                                  <path
                                    fill="#fff"
                                    d="M76 12A7 7 0 1 0 76 26 7 7 0 1 0 76 12zM76 102A7 7 0 1 0 76 116 7 7 0 1 0 76 102zM58 26.2c0-5-4-9-9-9-5 0-9 4-9 9 0 0 0 0 0 0-1.7-1.3-3.7-2-6-2-5.5 0-10 4.5-10 10 0 1.1.2 2.1.5 3-.2 0-.3 0-.5 0-6.1 0-11 4.9-11 11 0 2.4.7 4.5 2 6.3-4.2 2.7-7 7.3-7 12.7 0 5.3 2.8 10 6.9 12.6-1.2 2.2-1.9 4.7-1.9 7.4 0 8.3 6.7 15 15 15 .3 0 .6 0 .9 0 2 5.8 7.6 10 14.1 10 8.3 0 15-6.7 15-15C58 89 58 31.2 58 26.2z"
                                  />
                                  <path
                                    fill="#000"
                                    d="M49,14.2c-5.1,0-9.4,3.1-11.2,7.6c-1.2-0.4-2.5-0.6-3.8-0.6c-7.2,0-13,5.8-13,13c0,0,0,0,0,0.1c-6.3,1.4-11.1,7-11.1,13.7c0,2,0.4,3.9,1.2,5.7C7.3,57.1,5,62,5,67.2c0,0.6,0,1.1,0.1,1.6c0,0.1,0,0.2,0,0.3c0.1,0.5,0.1,1.1,0.2,1.6c0,0.1,0,0.1,0,0.2c0.1,0.5,0.2,1,0.4,1.5c0,0,0,0.1,0,0.1c0.2,0.5,0.4,1,0.6,1.6c0,0,0,0.1,0.1,0.1c0.4,1,1,2,1.6,2.9c0,0,0,0.1,0.1,0.1c0.6,0.9,1.3,1.7,2.1,2.5c0.1,0.1,0.1,0.1,0.2,0.2c0.4,0.3,0.7,0.7,1.1,1c0.1,0.1,0.2,0.2,0.3,0.2c0.3,0.2,0.6,0.4,0.9,0.6c0.2,0.1,0.3,0.2,0.5,0.4c0,0,0.1,0.1,0.1,0.1c0.1,0,0.1,0.1,0.2,0.1c2.8,1.7,6,2.7,9.5,2.7c9.9,0,18-8.1,18-18v-5c0-1.7-1.3-3-3-3s-3,1.3-3,3v5c0,6.6-5.4,12-12,12c-2.4,0-4.6-0.7-6.5-1.9c-0.8-0.5-1.6-1.1-2.2-1.8c-0.1-0.1-0.2-0.2-0.2-0.3c-0.2-0.2-0.4-0.5-0.6-0.8c-0.1-0.1-0.2-0.2-0.3-0.4c-0.2-0.3-0.4-0.6-0.6-0.9c0-0.1-0.1-0.1-0.1-0.2c-0.2-0.4-0.4-0.8-0.6-1.2c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.3-0.2-0.6-0.3-0.9c0-0.2-0.1-0.3-0.1-0.5c-0.1-0.3-0.1-0.6-0.2-0.9c0-0.1,0-0.3-0.1-0.4C11,68.2,11,67.7,11,67.2c0-4.1,2.1-7.9,5.6-10.1c1.1-0.7,1.6-2,1.3-3.3c-0.1-0.4-0.2-0.9-0.5-1.3c-1-1.4-1.5-2.9-1.5-4.6c0-3.9,2.8-7.1,6.5-7.9c2.2,4.2,6.5,7.1,11.6,7.1c1.7,0,3-1.3,3-3s-1.3-3-3-3c-3.1,0-5.8-2.1-6.7-4.9c-0.1-0.3-0.2-0.6-0.2-0.9c0-0.1,0-0.1,0-0.2c0-0.3-0.1-0.6-0.1-1c0-3.9,3.1-7,7-7c1.5,0,3,0.5,4.2,1.4c0.9,0.7,2.1,0.8,3.1,0.3c1-0.5,1.7-1.5,1.7-2.7c0,0,0,0,0-0.1c0-3.3,2.7-5.9,6-5.9c3.3,0,6,2.7,6,6v71c0,6.6-5.4,12-12,12c-5.1,0-9.6-3.2-11.3-8c-0.4-1.3-1.7-2.1-3-2l-0.3,0c-0.1,0-0.3,0-0.4,0c-6.6,0-12-5.4-12-12c0-1.7-1.3-3-3-3s-3,1.3-3,3c0,9.5,7.5,17.4,16.9,18c3,6.1,9.2,10,16.1,10c9.9,0,18-8.1,18-18v-71C61,19.6,55.6,14.2,49,14.2z"
                                  />
                                  <path
                                    fill="#444b54"
                                    d="M20,57.6h-5c-1.7,0-3-1.3-3-3s1.3-3,3-3h5c1.7,0,3,1.3,3,3S21.7,57.6,20,57.6z"
                                  />
                                  <g>
                                    <path
                                      fill="#fff"
                                      d="M111 57A7 7 0 1 0 111 71 7 7 0 1 0 111 57zM102 26A7 7 0 1 0 102 40 7 7 0 1 0 102 26zM102 88A7 7 0 1 0 102 102 7 7 0 1 0 102 88z"
                                    />
                                    <path
                                      fill="#0284c7"
                                      d="M97 93c-.8 0-1.5-.3-2.1-.9L84.8 82H71c-1.7 0-3-1.3-3-3s1.3-3 3-3h15c.8 0 1.6.3 2.1.9l11 11c1.2 1.2 1.2 3.1 0 4.2C98.5 92.7 97.8 93 97 93zM86 52H71c-1.7 0-3-1.3-3-3s1.3-3 3-3h13.8l10.1-10.1c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2l-11 11C87.6 51.7 86.8 52 86 52zM104 67H71c-1.7 0-3-1.3-3-3s1.3-3 3-3h33c1.7 0 3 1.3 3 3S105.7 67 104 67z"
                                    />
                                    <path
                                      fill="#0284c7"
                                      d="M111 74c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S116.5 74 111 74zM111 60c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S113.2 60 111 60zM102 43c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S107.5 43 102 43zM102 29c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S104.2 29 102 29zM76 29c-5.5 0-10-4.5-10-10S70.5 9 76 9s10 4.5 10 10S81.5 29 76 29zM76 15c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S78.2 15 76 15zM102 105c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S107.5 105 102 105zM102 91c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S104.2 91 102 91zM76 119c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10S81.5 119 76 119zM76 105c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4S78.2 105 76 105z"
                                    />
                                  </g>
                                </svg>

                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/ai/natural-language-processing"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black  "
                                    onClick={servicesHandler}
                                  >
                                    <h3>Natural Language Processing</h3>
                                  </Link>
                                </div>
                              </div>
                              <div className="my-6 flex items-start font-semibold text-sky-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  width="25px"
                                  height="25px"
                                >
                                  <path
                                    fill="#90caf9"
                                    d="M41,44H15c-1.657,0-3-1.343-3-3V15c0-1.657,1.343-3,3-3h26c1.657,0,3,1.343,3,3v26 C44,42.657,42.657,44,41,44z"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M40.5,14.5v-3c0-2.209-1.791-4-4-4h-3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M14.5,7.5h-3c-2.209,0-4,1.791-4,4v3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M33.5,40.5h3c2.209,0,4-1.791,4-4v-3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M7.5,33.5v3c0,2.209,1.791,4,4,4h3"
                                  />
                                  <path
                                    fill="none"
                                    stroke="#18193f"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="3"
                                    d="M24,16.3c6.1,0,9.7,4.2,11.1,6.1c0.4,0.5,0.4,1.3,0.1,1.8c-1.2,2.2-4.9,7.5-11.1,7.5s-9.9-5.1-11.1-7.2c-0.3-0.6-0.3-1.3,0.1-1.8 c0.7-1,2-2.8,4-4.2"
                                  />
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r="3.9"
                                    fill="#18193f"
                                  />
                                </svg>
                                <div className="ml-1 flex flex-wrap xl:flex-nowrap flex-col">
                                  <Link
                                    href="/ai/computer-vision-services"
                                    className="leading-4  font-semibold text-sky-700 hover:text-black "
                                    onClick={servicesHandler}
                                  >
                                    <h3>Computer Vision Services</h3>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Link
                  href="/portfolio"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href="/about-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/careers"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Careers
                </Link>
                <Link
                  href="/contact-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
