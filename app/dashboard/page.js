'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'


export default function Dashboard() {
    const [bookmarks, setBookmarks] = useState([])
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const fetchBookmarks = async () => {
        const { data } = await supabase
            .from('bookmarks')
            .select('*')
            .order('created_at', { ascending: false })

        setBookmarks(data || [])
    }

    useEffect(() => {
        fetchBookmarks()

        const channel = supabase
            .channel('realtime-bookmarks')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'bookmarks' },
                fetchBookmarks
            )
            .subscribe()

        return () => supabase.removeChannel(channel)
    }, [])

    const addBookmark = async () => {
        if (!title || !url) return

        const {
            data: { user },
        } = await supabase.auth.getUser()

        const newBookmark = {
            id: crypto.randomUUID(), // temporary ID
            title,
            url,
            user_id: user.id,
            created_at: new Date().toISOString(),
        }

        // 🔥 INSTANT UI UPDATE
        setBookmarks((prev) => [newBookmark, ...prev])

        // Save to DB
        await supabase.from('bookmarks').insert({
            title,
            url,
            user_id: user.id,
        })

        setTitle('')
        setUrl('')
    }

    const deleteBookmark = async (id) => {
        await supabase.from('bookmarks').delete().eq('id', id)
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">My Bookmarks</h1>

            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 w-full"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="border p-2 w-full"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={addBookmark} className="bg-blue-500 text-white px-4">
                    Add
                </button>
            </div>

            <ul>
                {bookmarks.map((b) => (
                    <li key={b.id} className="flex justify-between mb-2">
                        <a href={b.url} target="_blank">{b.title}</a>
                        <button
                            onClick={() => deleteBookmark(b.id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
