import { Link } from "react-router-dom";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { Profile2User, MessageQuestion } from "iconsax-react";
function Nav() {
  return (
    <div>
      <Command>
        <CommandList className="bg-black w-48 h-screen">
          <Link to="/">
            <img
              src="logo.png"
              className="h-16 w-screen rounded-3xl mt-2 px-2"
            />
          </Link>
          <CommandGroup className="text-red-200 ">
            <CommandItem className="text-xl">
              <Profile2User size="32" color="#FF8A65" />
              <span className="ml-2">Users</span>
            </CommandItem>
            <CommandItem className="text-xl flex">
              <MessageQuestion size="32" color="#FF8A65" />
              <span className="ml-2">Questions</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default Nav;
