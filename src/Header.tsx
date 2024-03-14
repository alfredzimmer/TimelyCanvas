import { Link } from "@nextui-org/react";
import { GitHub } from "react-feather";

const githubLink = "https://github.com/alfredzimmer/"
export function Header() {
  return (
    <header className="px-12 py-4 flex flex-row justify-between">
      <div className="text-4xl font-Logo">Timely Canvas</div>
      <Link href={githubLink} color="foreground"><GitHub /></Link>
    </header>
  );
}
