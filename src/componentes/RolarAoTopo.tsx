import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

/** Volta ao topo ao trocar de página. */
export function RolarAoTopo() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return <Outlet />
}
