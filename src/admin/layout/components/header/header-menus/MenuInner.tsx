import { useLocation } from 'react-router-dom'

export function MenuInner() {
  const location = useLocation()

  const renderText = () => {
    const path = location.pathname
    switch (true) {
      case path.includes('/dashboard'):
        return 'Dashboard'
      case path.includes('/customer'):
        return 'Customers'
      case path.includes('/driver'):
        return 'Drivers'
      case path.includes('/delivery'):
        return 'Deliveries'
      case path.includes('/fare-payment'):
        return 'Fare & Payments'
      case path.includes('/insurance'):
        return 'Insurance'
      case path.includes('/revenue-insights-reports'):
        return 'Revenue Insights'
      case path.includes('/user-engagement-reports'):
        return 'User Engagement'
      case path.includes('/route-management'):
        return 'Route Management'
      case path.includes('/carbon-credit'):
        return 'Carbon Credit'
      case path.includes('/settings'):
        return 'Settings'
      case path.includes('/faqs'):
        return 'FAQs'
      default:
        return ''
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100">
        <div className="fs-22 fw-bolder">{renderText()}</div>
      </div>
    </>
  )
}
