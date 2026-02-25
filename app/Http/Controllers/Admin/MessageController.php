<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        $messages = Message::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
        ]);
    }

    public function show(Message $message): Response
    {
        $message->load('user');

        // Mark as read
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message,
        ]);
    }

    public function destroy(Message $message): \Illuminate\Http\RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'Message deleted successfully.');
    }
}
