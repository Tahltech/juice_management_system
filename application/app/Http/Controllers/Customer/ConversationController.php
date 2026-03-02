<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    public function index(Request $request): Response
    {
        // Check if user has any conversations
        $conversations = Conversation::where('user_id', $request->user()->id)->get();
        
        // If no conversations exist, create a default one
        if ($conversations->isEmpty()) {
            $conversation = Conversation::create([
                'user_id' => $request->user()->id,
                'subject' => 'Welcome Conversation',
                'last_message_at' => now(),
            ]);
            
            // Create a welcome message from admin
            Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => $request->user()->id,
                'sender_id' => null, // Admin message
                'content' => 'Welcome! Feel free to send us a message if you have any questions about our juice products.',
                'type' => 'admin',
                'is_read' => false,
            ]);
        }
        
        // Get paginated conversations without complex relationships for now
        $conversations = Conversation::where('user_id', $request->user()->id)
            ->latest('last_message_at')
            ->paginate(10);

        return Inertia::render('Customer/Conversations/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation): Response
    {
        // Check if this conversation belongs to the current user
        if ($conversation->user_id !== request()->user()->id) {
            abort(403);
        }

        // Mark all admin messages as read
        $conversation->messages()
            ->where('type', 'admin')
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $conversation->load(['messages' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }, 'messages.sender']);

        return Inertia::render('Customer/Conversations/Show', [
            'conversation' => $conversation,
        ]);
    }

    public function storeMessage(Request $request, Conversation $conversation)
    {
        // Check if this conversation belongs to the current user
        if ($conversation->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $conversation->user_id,
            'sender_id' => $request->user()->id,
            'content' => $validated['message'],
            'type' => 'customer',
            'is_read' => false,
        ]);

        // Update conversation timestamp
        $conversation->update(['last_message_at' => now()]);

        return redirect()->back();
    }

    public function latestMessages(Conversation $conversation)
    {
        // Check if this conversation belongs to the current user
        if ($conversation->user_id !== request()->user()->id) {
            abort(403);
        }

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
        // Check if this conversation belongs to the current user
        if ($conversation->user_id !== request()->user()->id) {
            abort(403);
        }

        // Delete all messages in this conversation
        $conversation->messages()->delete();
        
        // Update conversation timestamp
        $conversation->update(['last_message_at' => now()]);

        return redirect()->back()->with('success', 'Chat cleared successfully');
    }

    public function deleteMessage(Conversation $conversation, Message $message): \Illuminate\Http\JsonResponse
    {
        // Check if this conversation belongs to the current user
        if ($conversation->user_id !== request()->user()->id) {
            abort(403);
        }

        // Verify message belongs to this conversation
        if ($message->conversation_id !== $conversation->id) {
            return response()->json(['error' => 'Message not found in this conversation'], 404);
        }

        // Delete the message
        $message->delete();

        // Update conversation timestamp
        $conversation->update(['last_message_at' => now()]);

        return response()->json(['success' => true, 'message' => 'Message deleted successfully']);
    }
}
