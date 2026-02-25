<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    public function index(): Response
    {
        $conversations = Conversation::with(['user', 'latestMessage'])
            ->orderBy('updated_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Conversations/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation): Response
    {
        $conversation->load(['messages' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }, 'messages.sender']);

        // Mark messages as read
        $conversation->messages()
            ->where('sender_id', '!=', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return Inertia::render('Admin/Conversations/Show', [
            'conversation' => $conversation,
        ]);
    }

    public function storeMessage(Request $request, Conversation $conversation): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $conversation->user_id, // Set the conversation owner
            'sender_id' => auth()->id(),
            'content' => $request->content,
            'type' => 'admin',
            'is_read' => false,
        ]);

        $conversation->touch();

        return back();
    }

    public function latestMessages(Conversation $conversation)
    {
        $lastMessageId = request('last_message_id', 0);
        
        $messages = $conversation->messages()
            ->with('sender')
            ->where('id', '>', $lastMessageId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function clearChat(Conversation $conversation): \Illuminate\Http\RedirectResponse
    {
        // Delete all messages in this conversation
        $conversation->messages()->delete();
        
        // Update conversation timestamp
        $conversation->touch();

        return back()->with('success', 'Chat cleared successfully');
    }

    public function deleteMessage(Conversation $conversation, Message $message): \Illuminate\Http\JsonResponse
    {
        // Verify message belongs to this conversation
        if ($message->conversation_id !== $conversation->id) {
            return response()->json(['error' => 'Message not found in this conversation'], 404);
        }

        // Delete the message
        $message->delete();

        // Update conversation timestamp
        $conversation->touch();

        return response()->json(['success' => true, 'message' => 'Message deleted successfully']);
    }
}
