import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import Step from '../../../public/assets/rightStep.png'
import { exportableLoader } from '../../image-loader'

export const Breadcrumbs: FC<{ list: { name: string; link?: string }[] }> = ({
  list,
}) => (
  <Breadcrumb
    spacing={2}
    separator={
      <Image unoptimized loader={exportableLoader} src={Step} alt='Step' />
    }
  >
    {list.map((el, i, arr) => (
      <BreadcrumbItem key={i}>
        <BreadcrumbLink
          _focus={{ boxShadow: 'none', opacity: 0.7 }}
          isCurrentPage={i === arr.length - 1}
          fontWeight={i === arr.length - 1 ? 'bold' : 'medium'}
          fontSize={12}
          _hover={{
            textDecor: 'none',
            opacity: 0.7,
          }}
        >
          {el.link ? <Link href={el.link}>{el.name}</Link> : el.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
)
