export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Interviewer?
        <br />
        <p className="text-xl mt-2 text-slate-400">
          Upload <i>your candidate&apos;s resume</i> to generate professional
          interview questions to ask.
        </p>
        <br />
        Candidate?
        <br />
        <p className="text-xl mt-2 text-slate-400">
          Upload <i>your own resume</i> to generate professional interview
          questions to prepare.
        </p>
        <br />
      </div>
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-0" /> */}
    </div>
  );
}
