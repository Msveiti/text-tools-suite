export const Toast = ({ message, show }: { message: string, show: boolean }) => (
  <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-500 z-[100] ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
    <div className="flex items-center gap-3">
      <span className="bg-emerald-500 rounded-full p-1 text-[10px]">✓</span>
      {message}
    </div>
  </div>
);