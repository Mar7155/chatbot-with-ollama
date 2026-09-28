"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Bot,
  Check,
  Cpu,
  History,
  Leaf,
  Menu,
  MessageSquarePlus,
  Paperclip,
  Plus,
  Send,
  Settings2,
  Sparkles,
  User,
  Wifi,
  X,
} from "lucide-react";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const models = [
  { id: "llama3.2", name: "Llama 3.2", detail: "3B · rápido", color: "mint" },
  { id: "mistral", name: "Mistral", detail: "7B · equilibrado", color: "blue" },
  { id: "gemma2", name: "Gemma 2", detail: "9B · creativo", color: "violet" },
];

const starterMessages = [
  {
    role: "assistant",
    text: "¡Holaaa! ^^, soy un chat alojado en local en una pc con una 9070xt. ¿Qué vamos a crear hoy?",
    time: {},
  },
  {
    role: "user",
    text: "Explícame qué diferencia hay entre los modelos locales de Ollama.",
    time: "10:43",
  },
  {
    role: "assistant",
    text: "Cada modelo tiene su propia personalidad y fortalezas. Llama es veloz y versátil, Mistral destaca razonando, y Gemma es genial para respuestas con un toque creativo. Como corren en tu máquina, tus conversaciones se quedan contigo.",
    time: "10:43",
  },
];

export default function Page() {
  const [selectedModel, setSelectedModel] = useState("qwen3.6");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [menuOpen, setMenuOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelUrl, setModelUrl] = useState("http://localhost:11434");
  const [savedModels, setSavedModels] = useState(models);
  const [activeChat, setActiveChat] = useState("Conversación sobre Ollama");

  function connectModel() {
    const name = modelName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const nextModel = { id, name, detail: "conectado · local", color: "blue" };
    setSavedModels((current) => [...current, nextModel]);
    setSelectedModel(id);
    setModelName("");
    setConnectOpen(false);
  }

  function createChat() {
    setActiveChat("Nuevo chat");
    setMessages([]);
  }

  const chatHistory = [
    "Conversación sobre Ollama",
    "Ideas para una app local",
    "Notas de productividad",
  ];

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { role: "user", text, time: "ahora" },
    ]);
    setInput("");
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: `Hecho. Estoy pensando con ${models.find((model) => model.id === selectedModel)?.name ?? "tu modelo local"}…`,
          time: "ahora",
        },
      ]);
    }, 450);
  }

  const model = models.find((item) => item.id === selectedModel) ?? models[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#dff5ee] text-[#21464a]">
      <div className="frutiger-orb frutiger-orb-one" aria-hidden="true" />
      <div className="frutiger-orb frutiger-orb-two" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex min-h-screen max-w-360 flex-col p-3 sm:p-6 lg:p-8"
      >
        <motion.header
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center justify-between px-2 pb-4 sm:px-4"
        >
          <div className="flex items-center gap-3">
            <div className="logo-orb flex size-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-cyan-700/20">
              <Leaf />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-[#126b77]">
                ollama<span className="text-[#55a66f]">·local</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b9b99]">
                tu espacio privado de IA
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 rounded-full border border-white/80 bg-white/45 px-4 py-2 text-xs font-semibold text-[#4b8687] shadow-sm backdrop-blur sm:flex">
            <Wifi className="size-3.5 text-[#54b878]" /> Ollama conectado{" "}
            <span className="size-2 rounded-full bg-[#5bc477] shadow-[0_0_0_3px_rgba(91,196,119,.2)]" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#327e82] transition-colors hover:bg-white/60 sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={{
                rotate: menuOpen ? 90 : 0,
                scale: menuOpen ? 1.08 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  {menuOpen ? <X /> : <Menu />}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </Button>
        </motion.header>

        <section className="flex min-h-0 flex-1 gap-5">
          <motion.aside
            initial={{ x: -18, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className={`w-72 shrink-0 flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white/55 p-4 shadow-[0_22px_60px_rgba(35,125,133,.15)] backdrop-blur-xl ${menuOpen ? "flex" : "hidden sm:flex"}`}
          >
            <section className="sidebar-section pb-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#609091]">
                  Modelos locales
                </span>
                <Settings2 className="size-4 text-[#6aa09d]" />
              </div>
              <div className="model-list flex max-h-48 flex-col gap-2 overflow-y-auto pr-1">
                {savedModels.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedModel(item.id)}
                    className={`model-row flex items-center gap-3 rounded-2xl p-3 text-left transition-all ${selectedModel === item.id ? "active-model" : "hover:bg-white/65"}`}
                  >
                    <span className={`model-dot ${item.color}`}>
                      <Cpu />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-[#28656d]">
                        {item.name}
                      </span>
                      <span className="block text-[11px] font-medium text-[#7ba19e]">
                        {item.detail}
                      </span>
                    </span>
                    {selectedModel === item.id && (
                      <Check className="size-4 text-[#50b979]" />
                    )}
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() => setConnectOpen(!connectOpen)}
                className="mt-3 w-full justify-start gap-2 rounded-xl text-xs font-bold text-[#57908e] hover:bg-white/70"
              >
                <Plus data-icon="inline-start" /> Añadir modelo
              </Button>
              <AnimatePresence initial={false}>
                {connectOpen && (
                  <motion.form
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onSubmit={(event) => {
                      event.preventDefault();
                      connectModel();
                    }}
                    className="connect-form mt-3 flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/90 bg-white/70 p-3 shadow-inner"
                  >
                    <div>
                      <label htmlFor="model-name" className="form-label">
                        Nombre del modelo
                      </label>
                      <Input
                        id="model-name"
                        value={modelName}
                        onChange={(event) => setModelName(event.target.value)}
                        placeholder="Ej. Llama 3.2"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="model-url" className="form-label">
                        URL de Ollama
                      </label>
                      <Input
                        id="model-url"
                        value={modelUrl}
                        onChange={(event) => setModelUrl(event.target.value)}
                        className="form-input"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="h-9 rounded-xl bg-linear-to-r from-[#55b99a] to-[#398fc1] text-xs font-bold text-white"
                    >
                      <Plus data-icon="inline-start" /> Conectar modelo
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </section>
            <section className="sidebar-section flex min-h-0 flex-1 flex-col gap-3 border-t border-white/70 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#609091]">
                  Tus chats
                </span>
                <History className="size-4 text-[#6aa09d]" />
              </div>
              <Button
                onClick={createChat}
                variant="outline"
                className="h-10 justify-start gap-2 rounded-xl border-white bg-white/65 text-xs font-bold text-[#39777a] shadow-sm"
              >
                <MessageSquarePlus data-icon="inline-start" /> Nuevo chat
              </Button>
              <div className="chat-history-list min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
                {chatHistory.map((chat) => (
                  <button
                    key={chat}
                    onClick={() => setActiveChat(chat)}
                    className={`chat-history-row rounded-xl px-3 py-2.5 text-left text-xs font-semibold ${activeChat === chat ? "active-chat" : ""}`}
                  >
                    <span className="block truncate">{chat}</span>
                    <span className="mt-1 block text-[10px] font-medium opacity-70">
                      hoy · local
                    </span>
                  </button>
                ))}
              </div>
            </section>
            <div className="mt-auto pt-5">
              <div className="rounded-2xl border border-white/70 bg-linear-to-br from-[#d8f7df] to-[#d8effc] p-4">
                <Sparkles className="mb-2 size-5 text-[#56aa7c]" />
                <p className="text-xs font-bold text-[#397b7c]">
                  100% en tu equipo
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#6e9996]">
                  Sin nubes, sin cuentas, sin que tus datos salgan de casa.
                </p>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
            className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[30px] border border-white/85 bg-white/60 shadow-[0_22px_60px_rgba(35,125,133,.16)] backdrop-blur-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/75 px-5 py-4 sm:px-7">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-[#22636d]">
                  {activeChat}
                </h1>
                <p className="text-xs font-medium text-[#76a09d]">
                  Una conversación tranquila, completamente local
                </p>
              </div>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="h-10 w-45 rounded-xl border-white bg-white/75 text-[#39777a] shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {savedModels.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}{" "}
                      <span className="text-xs text-muted-foreground">
                        · {item.detail}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div
              id="chat-messages"
              aria-label="Mensajes de la conversación"
              className="chat-scroll flex min-h-0 flex-1 flex-col justify-end gap-5 overflow-y-auto overscroll-contain px-4 py-6 sm:px-10"
            >
              <MessageGroup className="gap-5">
                {messages.map((message, index) => (
                  <motion.div
                    key={`${message.time}-${index}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.24,
                      delay: Math.min(index * 0.035, 0.18),
                      ease: "easeOut",
                    }}
                  >
                    <Message align={message.role === "user" ? "end" : "start"}>
                      <MessageAvatar
                        className={
                          message.role === "user"
                            ? "size-9 bg-[#f6d9ba]"
                            : "size-9 bg-linear-to-br from-[#80dbbb] to-[#67b9dc] text-white"
                        }
                      >
                        {message.role === "user" ? (
                          <User className="size-4" />
                        ) : (
                          <Bot className="size-4" />
                        )}
                      </MessageAvatar>
                      <MessageContent className="max-w-[min(85%,620px)]">
                        <Bubble
                          align={message.role === "user" ? "end" : "start"}
                          variant={
                            message.role === "user" ? "secondary" : "tinted"
                          }
                        >
                          <BubbleContent
                            className={
                              message.role === "user"
                                ? "rounded-[18px] border border-[#f3d6b8] bg-[#fff3e5] text-[#805f4d]"
                                : "rounded-[18px] border border-white/90 bg-[#effcf6] text-[#316d6e]"
                            }
                          >
                            {message.text}
                          </BubbleContent>
                        </Bubble>
                        <span className="px-2 text-[10px] font-semibold text-[#86aaa6]">
                          {message.role === "assistant"
                            ? `Nube · ${message.time}`
                            : `Tú · ${message.time}`}
                        </span>
                      </MessageContent>
                    </Message>
                  </motion.div>
                ))}
              </MessageGroup>
            </div>
            <div className="border-t border-white/75 bg-white/30 p-4 sm:p-5">
              <div className="relative flex items-center gap-2 rounded-2xl border border-white bg-white/80 p-2 shadow-[0_8px_24px_rgba(57,140,143,.1)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 shrink-0 rounded-xl text-[#71a19e] hover:bg-[#e3f6ee]"
                  aria-label="Adjuntar archivo"
                >
                  <Paperclip />
                </Button>
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.nativeEvent.isComposing &&
                      event.keyCode !== 229
                    )
                      sendMessage();
                  }}
                  placeholder="Escribe algo para tu modelo local…"
                  className="h-10 border-0 bg-transparent px-1 text-sm text-[#376d70] shadow-none focus-visible:ring-0"
                />
                <Button
                  onClick={sendMessage}
                  size="icon"
                  className="size-10 shrink-0 rounded-xl bg-linear-to-br from-[#55b99a] to-[#398fc1] text-white shadow-md shadow-cyan-700/20 hover:from-[#46a989] hover:to-[#2f7daf]"
                  aria-label="Enviar mensaje"
                >
                  <Send />
                </Button>
              </div>
              <div className="flex items-center justify-between px-2 pt-2 text-[10px] font-semibold text-[#88aaa5]">
                <span>{model.name} · privado y local</span>
                <span>Enter para enviar</span>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
}
