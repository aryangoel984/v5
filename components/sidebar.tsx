"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const SidebarDemo = ({ links, children }: { links: any[]; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "ClickRetail Pvt. Ltd.",
                href: "#",
                icon: (
                  <Image
                    src="https://ondc.org/assets/theme/images/ondc_registered_logo.svg?v=8ed3e3ae1d"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
      <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

const Logo = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <Image
      src="https://ondc.org/assets/theme/images/ondc_registered_logo.svg?v=8ed3e3ae1d"
      width={50}
      height={50}
      alt="Avatar"
    />
  </Link>
);

const LogoIcon = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <Image
      src="https://ondc.org/assets/theme/images/ondc_registered_logo.svg?v=8ed3e3ae1d"
      width={50}
      height={50}
      alt="Avatar"
    />
  </Link>
);
