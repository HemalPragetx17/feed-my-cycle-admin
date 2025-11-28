import React from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router'
import { checkIsActive, KTIcon, KTSVG, WithChildren } from '../../../../helpers'
import { useLayout } from '../../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
}) => {
  const { pathname } = useLocation()

  // Check if current route is active or any child route is active
  const isActive = React.useMemo(() => {
    // If the 'to' prop is not '#', use the original checkIsActive logic
    if (to !== '#') {
      return checkIsActive(pathname, to)
    }

    // For parent menu items (to='#'), check if any child route is active
    // Extract child routes from children and check if current path matches any of them
    if (React.Children.count(children) > 0) {
      const childRoutes: string[] = []

      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props && child.props.to) {
          childRoutes.push(child.props.to)
        }
      })

      // Check if current pathname starts with any of the child routes
      return childRoutes.some(route => {
        if (route.startsWith('/')) {
          return pathname.startsWith(route) || pathname === route
        }
        return false
      })
    }

    return false
  }, [pathname, to, children])

  const { config } = useLayout()
  const { app } = config

  return (
    <div
      className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className='menu-icon'>
            <img src={icon} className='svg-icon-2' height={21} width={21} />
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
          <i className={clsx('bi fs-3', fontIcon)}></i>
        )}
        <span className='menu-title fs-14'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  )
}

export { SidebarMenuItemWithSub }
