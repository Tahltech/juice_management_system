<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        $messages = Message::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Customer/Messages/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
        ]);

        // Create conversation
        $conversation = Conversation::create([
            'user_id' => $request->user()->id,
            'subject' => $validated['subject'],
            'last_message_at' => now(),
        ]);

        // Create initial message
        Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $request->user()->id,
            'sender_id' => $request->user()->id,
            'content' => $validated['message'],
            'type' => 'customer',
            'is_read' => false,
        ]);

        return redirect()->route('customer.dashboard')
            ->with('success', 'Message sent successfully!');
    }

    public function show(Message $message): Response
    {
        // Mark as read if it's unread
        if ($message->isUnread()) {
            $message->markAsRead();
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message->load('user'),
        ]);
    }
}
