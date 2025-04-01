"use client"

import type React from "react"

import { useState } from "react"

type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  dismiss: () => void
}

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, action }: Omit<Toast, "id" | "dismiss">) => {
    const id = generateId()

    const dismiss = () => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id))
    }

    setToasts((toasts) => [...toasts, { id, title, description, action, dismiss }])

    return {
      id,
      dismiss,
    }
  }

  const dismiss = (toastId?: string) => {
    setToasts((toasts) => (toastId ? toasts.filter((t) => t.id !== toastId) : []))
  }

  return {
    toasts,
    toast,
    dismiss,
  }
}

