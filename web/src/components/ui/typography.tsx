// components/typography/H1.tsx
export function H1({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}

// components/typography/H2.tsx
export function H2({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}

// components/typography/H3.tsx
export function H3({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`mt-8 scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

// components/typography/H4.tsx
export function H4({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
}

// components/typography/P.tsx
export function P({
  children,
  className = "",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <p className={`leading-7 ${className}`} title={title}>
      {children}
    </p>
  );
}

// components/typography/Blockquote.tsx
export function Blockquote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
      {children}
    </blockquote>
  );
}

// components/typography/Table.tsx
export function Table({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`my-6 w-full overflow-y-auto ${className}`}>
      <table className="w-full">{children}</table>
    </div>
  );
}

// components/typography/List.tsx
export function List({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>
      {children}
    </ul>
  );
}

// components/typography/InlineCode.tsx
export function InlineCode({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
    >
      {children}
    </code>
  );
}

// components/typography/Lead.tsx
export function Lead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-xl text-muted-foreground ${className}`}>{children}</p>
  );
}

// components/typography/Large.tsx
export function Large({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
}

// components/typography/Small.tsx
export function Small({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <small className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </small>
  );
}

// components/typography/Muted.tsx
export function Muted({
  children,
  className = "",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} title={title}>
      {children}
    </p>
  );
}