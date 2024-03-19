import { Link } from "@nextui-org/react";
import { GitHub } from "react-feather";

const githubLink = "https://github.com/alfredzimmer/TimelyCanvas/";

export function Header() {
  return (
    <header className="px-12 py-4 flex flex-row justify-between">
      <a href="/" className="text-4xl font-Logo select-none">
        Timely Canvas
      </a>
      <Link href={githubLink} color="foreground">
        <GitHub />
      </Link>
    </header>
  );
}
