export default function SellText() {
  return (
    <section className="flex h-[225px] w-full flex-col items-center justify-center overflow-clip px-[46px] py-[21px]">
      <div className="w-[1001px] max-w-full whitespace-pre-wrap text-white">
        <p className="text-[40px] leading-tight">
          Donnez du{" "}
          <span className="font-semibold text-accent">mouvement</span>{" "}
          à vos idées.
        </p>
        <p className="text-[40px] leading-tight">
          Choisissez le format qui correspond à{" "}
          <span className="font-bold text-accent">votre priorité.</span>
        </p>
      </div>
    </section>
  );
}
