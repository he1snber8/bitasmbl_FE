import { Button, Card } from "@material-tailwind/react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

export default function PricingOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-3/4 mx-auto gap-6 p-6 text-white">
      <Card className="border border-dashed border-concrete bg-gradient-to-br from-gray-900 to-black">
        <div className="p-6 space-y-4 flex flex-col justify-between  h-full">
          <h2 className="text-2xl font-semibold text-white">Free pack</h2>
          <p className="text-ash">
            Get started with community-backed validation and basic exposure.
          </p>
          <div className="text-3xl font-bold text-white">0$</div>
          <ul className="text-sm text--100 space-y-1 pt-2 text-ash">
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Submit solo or squad projects
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Light automated validation
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Unverified badge shown on profile
            </li>
          </ul>
          <Button className="mt-4 w-full ">Contact Sales</Button>
        </div>
      </Card>
      <Card className="border border-dashed border-concrete bg-gradient-to-br from-gray-900 to-black">
        <div className="p-6 space-y-4 flex flex-col justify-between h-full">
          <h2 className="text-2xl font-semibold text-white">Pro</h2>
          <p className="text-ash">
            Boost credibility and unlock expert tools to showcase your work.
          </p>
          <div className="text-3xl font-bold text-white">
            $15<span className="text-sm font-normal text-ash">/mo</span>
          </div>
          <ul className="text-sm  space-y-1 pt-2 text-ash">
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Verified profile badge
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Admin & Enhanced AI project
              reviews
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Public CV page with projects
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Option to host live demos
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Get automatically added in a
              leaderboard
            </li>
          </ul>
          <Button className="mt-4 w-full">Upgrade to Pro</Button>
        </div>
      </Card>

      {/* Optional Recruiter Tier */}
      <Card className="border border-dashed border-concrete bg-gradient-to-br from-gray-900 to-black">
        <div className="p-6 space-y-4 flex flex-col justify-between h-full">
          <h2 className="text-2xl font-semibold text-white">Team Access</h2>
          <p className="text-ash">
            Built for recruiters or teams scouting verified dev talent.
          </p>
          <div className="text-3xl font-bold text-white">Custom</div>

          <ul className="text-sm text--100 space-y-1 pt-2 text-ash">
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Access to top verified devs
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Project filters by tech & skill
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Priority support and API access
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck fill="#5CB338" /> Monthly talent reports
            </li>
          </ul>
          <Button className="mt-4 w-full ">Contact Sales</Button>
        </div>
      </Card>
    </div>
  );
}
