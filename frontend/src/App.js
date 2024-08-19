import './App.css';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    try {
      setIsLoading(true)
      setInput('');
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      setChat([...chat, { user: input, bot: data.response }]);
    } catch (error) {
      alert("Fail to send the message:" + error.message)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div class="flex justify-center w-100% items-center h-screen bg-slate-200">
      <div class="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05); mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[500px]">

        {/* Heading */}
        <div class="flex flex-col space-y-1.5 pb-6">
          <h2 class="font-semibold text-lg tracking-tight">AI Chatbot</h2>
          <p class="text-sm text-[#6b7280] leading-3">Powered by pretrained GPT-2 model</p>
        </div>


        {/* Chat Container */}
        <div class="pr-4 mb-4 h-[550px] min-width: 100%; display: table; overflow-y-auto">
          {chat.map((c, i) => (
            <div key={i}>

              {/*  User Chat Message */}
              <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1"><span
                class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div class="rounded-full bg-gray-100 border p-1"><svg stroke="none" fill="black" stroke-width="0"
                  viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
                  </path>
                </svg></div>
              </span>
                <p class="leading-relaxed"><span class="block font-bold text-gray-700">You </span>{c.user}</p>
              </div>

              {/* Chat Message AI */}
              <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1"><span
                class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div class="rounded-full bg-gray-100 border p-1"><svg stroke="none" fill="black" stroke-width="1.5"
                  viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                  </path>
                </svg></div>
              </span>
                <p class="leading-relaxed"><span class="block font-bold text-gray-700">AI </span>{c.bot}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <>
              <div class="flex space-x-2 animate-pulse justify-center">
                <div class="w-2 h-2 bg-gray-700 rounded-full"></div>
                <div class="w-2 h-2 bg-gray-700 rounded-full"></div>
                <div class="w-2 h-2 bg-gray-700 rounded-full"></div>
              </div>
            </>
          )}
        </div>
        {/* Input box */}
        <div class="flex items-center pt-0">
          <div class="flex items-center justify-center w-full space-x-2">
            <input
              class="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message" value={input}
              onChange={(e) => setInput(e.target.value)}></input>
            <button
              disabled={isLoading}
              onClick={sendMessage}
              class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
              Send</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
