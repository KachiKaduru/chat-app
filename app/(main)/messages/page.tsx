export default function MesagePage() {
  return (
    <section className="flex justify-center items-center h-[100dvh] bg-gray-50">
      <div className="max-w-2xl h-fit flex flex-col gap-5 p-5 text-center">
        <h1 className="text-3xl font-semibold">Chat App</h1>

        <p className="text-lg text-blue-950 px-6">
          Select one of your conversations to continue, or start a new conversations with one of
          your friends!
        </p>
      </div>
    </section>
  );
}
