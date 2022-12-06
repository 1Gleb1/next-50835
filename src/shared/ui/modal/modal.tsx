import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, PropsWithChildren, useEffect } from 'react'
import Close from '@/shared/assets/icons/common/close.svg'
import { useRouter } from 'next/router'
import cn from 'classnames'

export interface ModalProps {
  isOpen: boolean
  maskClosable?: boolean
  withCloseIcon?: boolean
  className?: string
  onClose: () => void
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  maskClosable,
  withCloseIcon = true,
  className = '',
  onClose,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      router.events.on('routeChangeComplete', onClose)
      router.events.on('routeChangeError', onClose)
    }
    return () => {
      router.events.off('routeChangeComplete', onClose)
      router.events.off('routeChangeError', onClose)
    }
  }, [isOpen])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto'
        onClose={() => maskClosable && onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {/* Цвет сделал статичным, т.к. скорее всего он дожен быть одинаковым не зависимо от темы */}
          <Dialog.Overlay
            data-testid='dialog-overlay'
            className='fixed bg-[#262424] bg-opacity-70 inset-0 will-change-auto'
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-150'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='relative w-full desktop:w-fit px-small'>
            <div
              data-testid='modal-body'
              className={cn(
                'bg-background-primary p-5 rounded-large max-h-[calc(100vh-100px)] overflow-auto will-change-transform',
                className
              )}
            >
              {children}
            </div>
            {withCloseIcon && (
              <button
                data-testid='modal-close-button'
                className='absolute flex items-center justify-center w-10 h-10 right-0 desktop:right-2.5 top-0 -translate-y-full desktop:translate-x-full desktop:translate-y-0'
                onClick={onClose}
              >
                <Close className='stroke-[#fff]' />
              </button>
            )}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
