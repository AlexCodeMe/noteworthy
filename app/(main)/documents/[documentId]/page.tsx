'use client'

import Cover from '@/components/cover'
import dynamic  from 'next/dynamic'
import Toolbar from '@/components/toolbar'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import React, { useMemo } from 'react'

export default function DocumentIdPage({ params }: {
    params: { documentId: Id<'documents'> }
}) {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })
    const update = useMutation(api.documents.update)

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content,
        })
    }

    return document === null ? (
        <div>Not found</div>
    ) : document === undefined ? (
        <div>
            <Cover.Skeleton />
            <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
                <div className='space-y-4 pl-8 pt-4'>
                    <Skeleton className="h-14 w-[50%]" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-4 w-[60%]" />
                </div>
            </div>
        </div>
    ) : (
        <div className='pb-40'>
            <Cover url={document.coverImage} />
            <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                <Toolbar initialData={document} />
                <Editor onChange={onChange}
                    initialContent={document.content} />
            </div>
        </div>
    )
}
