import React from 'react'
import { usePrefersReducedMotion, keyframes, Container } from '@chakra-ui/react'

interface Touch {
  top: string
  toLeft: string
  swipe: string
  nextTutorial?: () => void
}

export const TouchButton = ({ top, toLeft, swipe, nextTutorial }: Touch) => {
  const up = keyframes`
    from { transform: translateX(0px) translateY(0px); opacity: 0.4 }
    to { transform: translateX(0px) translateY(-70px); opacity: 1 }
  `
  const down = keyframes`
    from { transform: translateX(0px) translateY(0px) }
    to { transform: translateX(0px) translateY(70px) }
  `
  const left = keyframes`
    from { transform: translateX(0px) translateY(0px) }
    to { transform: translateX(70px) translateY(0px) }
  `
  const right = keyframes`
    from { transform: translateX(0px) translateY(0px) }
    to { transform: translateX(-70px) translateY(0px) }
  `
  const animating = usePrefersReducedMotion()

  const animatingFn = (type: string) => {
    switch (type) {
      case 'NULL' || 'NONE' || '':
        return undefined
      case 'UP':
        return animating ? undefined : `${up} infinite 1s linear`
      case 'DOWN':
        return animating ? undefined : `${down} infinite 1s linear`
      case 'LEFT':
        return animating ? undefined : `${left} infinite 1s linear`
      case 'RIGHT':
        return animating ? undefined : `${right} infinite 1s linear`
      default:
        break
    }
  }

  const boxShadowAnimation = (type: string) => {
    switch (type) {
      case 'NULL' || 'NONE' || '':
        return 'none'
      case 'UP':
        return 'rgba(0, 0, 0, 0.8) 0px 10px 20px 0px, rgba(0, 0, 0, 0.8) 0px 30px 20px 0px, rgba(0, 0, 0, 0.8) 0px 50px 20px 0px, rgba(0, 0, 0, 0.8) 0px 70px 20px 0px'
      case 'DOWN':
        return 'rgba(0, 0, 0, 0.8) 0px -10px 20px 0px, rgba(0, 0, 0, 0.8) 0px -30px 20px 0px, rgba(0, 0, 0, 0.8) 0px -50px 20px 0px, rgba#000000cc -70px 20px 0px'
      case 'RIGHT':
        return 'rgba(0, 0, 0, 0.8) 10px 0px 20px 0px, rgba(0, 0, 0, 0.8) 30px 0px 20px 0px, rgba(0, 0, 0, 0.8) 50px 0px 20px 0px, rgba(0, 0, 0, 0.8) 70px 0px 20px 0px'
      case 'LEFT':
        return 'rgba(0, 0, 0, 0.8) -10px 0px 20px 0px, rgba(0, 0, 0, 0.8) -30px 0px 20px 0px, rgba(0, 0, 0, 0.8) -50px 0px 20px 0px, rgba#000000ccpx 0px 20px 0px'
      default:
        break
    }
  }
  return (
    <Container
      variant='touchItem'
      width={5}
      transition={'0.4s all ease'}
      height={8}
      top={top}
      left={toLeft}
      cursor='pointer'
      animation={animatingFn(swipe)}
      onClick={nextTutorial}
      boxShadow={boxShadowAnimation(swipe)}
    />
  )
}
