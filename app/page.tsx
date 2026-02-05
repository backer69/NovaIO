import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-center w-full">
                    <Link
                        href="/register"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-center lg:text-left"
                    >
                        <h2 className={`mb-3 text-2xl font-bold`}>
                            Register Now{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Join our exclusive webinar.
                        </p>
                    </Link>

                    <Link
                        href="/admin/login"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-center lg:text-left"
                    >
                        <h2 className={`mb-3 text-2xl font-bold`}>
                            Admin Login{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                    </Link>
                </div>
            </div>
        </main>
    );
}
