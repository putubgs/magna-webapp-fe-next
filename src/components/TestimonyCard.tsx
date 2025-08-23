interface ITestimonyCard {
  name: string;
  company: string;
  text: string;
}

export default function TestimonyCard({ name, company, text }: ITestimonyCard) {
  return (
    <div className="h-fit border border-neutral-800 p-[10px] text-xs md:text-base">
      <h3 className="font-bold text-xs md:text-lg">{name}</h3>
      <p className="text-neutral-400 pt-1 pb-5">{company}</p>
      <p>&quot;{text}&quot;</p>
    </div>
  );
}
