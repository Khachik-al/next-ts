const useMemoizeQueryParams = () => {
  let params
  let path
  
  if (typeof window !== 'undefined') {
    params = window.location.search
    path = window.location.pathname
  }

  return [path, params]
}

export default useMemoizeQueryParams