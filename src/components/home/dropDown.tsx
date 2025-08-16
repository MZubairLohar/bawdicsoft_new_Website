"use client"
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSolidRightArrow } from "react-icons/bi";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DropDown: React.FC = () => {
  const router = useRouter()
  const clickHandlerFunc = (route: string) => {
    router.push(`/${route}`)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Blockchain',
      children: [{
        key: '1-2',
        label: 'NFT',
        children: [
          {
            key: '1-3-1',
            label: 'NFT Development',
            onClick: () => clickHandlerFunc("nft-development")
          },
          {
            key: '1-3-2',
            label: 'NFT Marketplace Development',
            onClick: () => clickHandlerFunc("nft-marketplace-development")
          }
        ]

      },
      {
        key: '2-1',
        label: 'DeFI',
        onClick: () => clickHandlerFunc("defi")
      },
      {
        key: '2-2',
        label: 'Cryptocurrency Exchange',
        onClick: () => clickHandlerFunc("cryptocurrency-exchange")
      },
      {
        key: '2-3',
        label: 'Token Development',
        onClick: () => clickHandlerFunc("token-development")
      },
      ],
    },
    {
      key: '2',
      label: 'Web application',
      onClick: () => clickHandlerFunc("web-application")
    },
    {
      key: '3',
      label: 'E-commerce solution',
      onClick: () => clickHandlerFunc("e-commerce-solution")

    },
    {
      key: '4',
      label: 'Artificial Intelligence',
      onClick: () => clickHandlerFunc("artificial-intelligence")

    },
  ];
  return (
    <Dropdown menu={{ items }} className='text-sm font-bold leading-6 text-sky-600 hover:text-black text-[17px]'>
      <Link href=''>
        <Space className='text-sm font-bold leading-6 text-sky-600 hover:text-black text-[17px]'>
          Services
          <TiArrowSortedDown className='font-extrabold text-sky-600  text-[20px]' />
        </Space>
      </Link>
    </Dropdown>
  );
}


export default DropDown;