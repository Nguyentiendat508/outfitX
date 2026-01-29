import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { FaRocketchat } from "react-icons/fa";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export default function Chat() {
  
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Xin Chào Tôi Là Gemini AI" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(genAI);

  const sendMessage = async () => {
    // dua du lieu san pham cho no => tu van dua tren san pham minh dang co 
    // noi no dong vai tu van khach hang website ten ... 
    if (!input.trim()) return;
 
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        contents: "Explain how AI works in a few words",
      });

      const result = await model.generateContent(
        newMessages.map((m) => m.content).join("\n"),
      );

      const reply = result.response.text();

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Gemini không phản hồi" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="fixed bottom-40 right-6 flex flex-col gap-3 z-50">
        <div className="relative group">
          <a
            href="https://zalo.me/0917948638"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
          >
            <img
              src="https://photo-cms-anninhthudo.zadn.vn/h600/Uploaded/2021/206/2020_03_19/zalo-4.png"
              alt="Zalo"
              className="w-full rounded-full"
            />
          </a>
        </div>
        <div className="relative group">
          <a
            href="https://www.facebook.com/nguyentiendat.000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/042/127/196/large_2x/round-square-blue-and-white-facebook-logo-with-thick-white-border-and-long-shadow-on-a-transparent-background-free-png.png"
              alt="Messenger"
              className="w-10 rounded-full"
            />
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full bg-white text-blue-700 text-2xl  flex items-center justify-center shadow-lg hover:scale-110 transition"
        >
          <FaRocketchat />
        </button>
      </div>
      {open && (
        <div className="fixed bottom-40 right-24 w-[360px] h-[460px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
            <span className="font-medium">Tư vấn trực tiếp</span>
            <button
              onClick={() => setOpen(false)}
              className="text-xl leading-none hover:opacity-70"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-4 h-367 overflow-auto bg-white">
            {messages.map((s) => (
              <div className={`flex ${ s.role == "user" ? "justify-end" : "" }`}>
                <div className="bg-gray-100 rounded-xl px-4 py-3 w-fit max-w-[80%] text-sm text-gray-800">
                  {s.content}
                </div>
              </div>
            ))}

            {loading && <div className="loading">Gemini đang trả lời...</div>}
          </div>

          <div className="flex border-t">
            <input
              type="text"
              value={input}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-3 text-sm outline-none"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white px-5 text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
