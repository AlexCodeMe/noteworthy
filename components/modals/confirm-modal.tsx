'use client'

import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

export default function ConfirmModal({
    children,
    onConfirm,
} : {
    children: React.ReactNode
    onConfirm: () => void
}) {

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        onConfirm()
    }
    
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild
        onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
                Absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
                Confirm
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
