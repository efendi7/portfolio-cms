// Sonner Toast Hook
// This is a wrapper around sonner to match shadcn/ui's useToast API

import { toast as sonnerToast } from 'sonner'

type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  action?: {
    label: string
    onClick: () => void
  }
}

export function useToast() {
  const toast = ({ title, description, variant, action }: ToastProps) => {
    const message = description || title || ''
    const heading = title && description ? title : undefined

    if (variant === 'destructive') {
      sonnerToast.error(heading || message, {
        description: heading ? message : undefined,
        action: action ? {
          label: action.label,
          onClick: action.onClick
        } : undefined
      })
    } else {
      sonnerToast.success(heading || message, {
        description: heading ? message : undefined,
        action: action ? {
          label: action.label,
          onClick: action.onClick
        } : undefined
      })
    }
  }

  return { toast }
}

// You can also export individual toast methods
export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, { description })
  },
  error: (message: string, description?: string) => {
    sonnerToast.error(message, { description })
  },
  info: (message: string, description?: string) => {
    sonnerToast.info(message, { description })
  },
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, { description })
  },
  loading: (message: string, description?: string) => {
    sonnerToast.loading(message, { description })
  },
  promise: sonnerToast.promise,
  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
}