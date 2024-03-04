import React from "react";
import { Audiowide } from "next/font/google";
import Link from "next/link";

type Props = {
  classes?: string;
};
const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });
export const Logo: React.FC<Props> = ({ classes }) => {
  return (
    <div className={`logo flex items-center ${audiowide.className}`}>
      <Link href="/" className={classes}>
        <span className="text-bold">DIY</span>
        <span className="text-xs">Creative Display</span>
      </Link>
    </div>
  );
};
