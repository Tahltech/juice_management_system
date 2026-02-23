<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    public function index(Request $request): Response
    {
        $conversations = Conversation::with(['user', 'latestMessage'])
            ->withCount('messages as message_count')
            ->latest('last_message_at')
            ->paginate(10);

        return Inertia::render('Admin/Conversations/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation): Response
    {
        // Mark all customer messages as read
        $conversation->messages()
            ->where('type', 'customer')
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $conversation->load(['user', 'messages.sender']);

        return Inertia::render('Admin/Conversations/Show', [
            'conversation' => $conversation,
        ]);
    }

    public function storeMessage(Request $request, Conversation $conversation)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $conversation->user_id,
            'sender_id' => $request->user()->id,
            'content' => $validated['message'],
            'type' => 'admin',
            'is_read' => false,
        ]);

        // Update conversation timestamp
        $conversation->update(['last_message_at' => now()]);

        return redirect()->back();
    }
}
