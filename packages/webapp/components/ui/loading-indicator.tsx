'use client'
import { useLinkStatus } from 'next/link';


export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return (
   pending?  <div
      role="status"
      aria-label="Loading"
      className="w-4 h-4 border-4 border-primary/20 border-t-primary rounded-full animate-spin transition-all"
    /> : null
  )
}