import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAfter, subMinutes, isBefore, addMinutes, format } from 'date-fns';

export const dynamic = 'force-dynamic';


export async function GET(request: Request) {
  // Check authorization (Vercel Cron header)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const now = new Date();
    const fifteenMinsFromNow = addMinutes(now, 15);

    // Fetch tasks due soon
    const { data: tasks, error } = await supabase
      .from('tasks_system')
      .select('*')
      .eq('status', 'TODO')
      .not('deadline', 'is', null);

    if (error) throw error;

    const tasksToNotify = tasks.filter(task => {
      const deadline = new Date(task.deadline);
      // Notify if deadline is within the next 15 minutes
      return isAfter(deadline, now) && isBefore(deadline, fifteenMinsFromNow);
    });

    for (const task of tasksToNotify) {
      await sendLineNotification(task);
    }

    return NextResponse.json({ 
      success: true, 
      notified: tasksToNotify.length,
      timestamp: now.toISOString() 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

async function sendLineNotification(task: any) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userId = process.env.LINE_MY_USER_ID;

  if (!token || !userId) {
    console.error('LINE configuration missing');
    return;
  }

  const message = {
    to: userId,
    messages: [
      {
        type: 'text',
        text: `🔔 [URGENT] ${task.emoji || ''} ${task.title}\nDue at: ${format(new Date(task.deadline), 'HH:mm')}\nPriority: ${task.priority}`
      }
    ]
  };

  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(message)
  });
}
