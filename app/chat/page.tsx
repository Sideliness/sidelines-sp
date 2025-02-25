import ChatComponent from "./ChatComponent";

export default function ChatPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Chat</h1>
            <p className="text-lg text-gray-500">This is the chat page.</p>
            <ChatComponent />
        </main>
    );
}
