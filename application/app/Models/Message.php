<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'content',
        'type',
        'is_read',
        'conversation_id',
        'sender_id',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function isFromCustomer()
    {
        return $this->type === 'customer';
    }

    public function isFromAdmin()
    {
        return $this->type === 'admin';
    }

    public function getTypeColorAttribute()
    {
        return $this->isFromCustomer() ? 'blue' : 'green';
    }

    // Helper methods for compatibility
    public function isUnread()
    {
        return !$this->is_read;
    }

    public function isRead()
    {
        return $this->is_read;
    }

    public function markAsRead()
    {
        $this->is_read = true;
        $this->save();
    }

    // Getter for subject (using content as subject)
    public function getSubjectAttribute()
    {
        // Take first 50 characters of content as subject
        return strlen($this->content) > 50 
            ? substr($this->content, 0, 50) . '...' 
            : $this->content;
    }

    // Getter for message content
    public function getMessageAttribute()
    {
        return $this->content;
    }
}
