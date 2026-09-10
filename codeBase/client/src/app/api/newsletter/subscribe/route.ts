import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

import { serverClient } from '@/lib/serverClient';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email is required' },
                { status: 400 }
            );
        }

        const result = await serverClient.post('/api/newsletter/subscribe', { email });

        return NextResponse.json(result.data, {
            status: result.status || 201,
        });

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.response.data?.message || 'Failed to subscribe to the newsletter',
                },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}