export default function Navigation() {
  return (
    <div className="mt-6 mx-64 border h-16 flex flex-row justify-around items-center rounded-full">
      <span
        className="cursor-pointer"
        onClick={() => { window.location.href = "/chat" }}>
        Chats
      </span>
      <span
        className="cursor-pointer"
        onClick={() => { window.location.href = "/friends" }}>
        Friends
      </span>
      <span
        className="cursor-pointer"
        onClick={() => { window.location.href = "/settings" }}>
        Settings
      </span>
    </div>
  );
}